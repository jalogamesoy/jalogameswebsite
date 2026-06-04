#!/usr/bin/env node
/**
 * scripts/draft.mjs — AI draft pipeline for the jalogames.fi journal.
 *
 * Reads docs/content-playbook.md as the (prompt-cached) system prompt, takes a
 * topic brief, calls Claude (Opus 4.8) via the Messages API with fetch (no SDK,
 * dependency-free), and writes a complete MDX article — status: draft — plus
 * per-platform social copy into src/content/journal/. You then review it in
 * /admin, set publishAt, and schedule.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/draft.mjs "<topic brief>" [--category UEFN] [--date 2026-06-10]
 *   node scripts/draft.mjs --brief briefs/discover.txt --category UEFN
 *
 * The brief can be one line ("how to get a UEFN map discovered") or a few
 * paragraphs with the angle, target query, and any real facts/numbers to use.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("Set ANTHROPIC_API_KEY (the key JaloCron uses).");
  process.exit(1);
}

const MODEL = "claude-opus-4-8";
const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content/journal");

// ── Args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let brief = "";
let category = "";
let dateStr = "";
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--category") category = args[++i] ?? "";
  else if (a === "--date") dateStr = args[++i] ?? "";
  else if (a === "--brief") brief = fs.readFileSync(args[++i], "utf8");
  else if (!a.startsWith("--")) brief += (brief ? " " : "") + a;
}
if (!brief.trim()) {
  console.error('Give a topic brief, e.g. node scripts/draft.mjs "what is UEFN" --category UEFN');
  process.exit(1);
}
if (!dateStr) {
  // Today in YYYY-MM-DD (local). Passed explicitly in CI for reproducibility.
  dateStr = new Date().toISOString().slice(0, 10);
}

const PLAYBOOK = fs.readFileSync(path.join(ROOT, "docs/content-playbook.md"), "utf8");

const SYSTEM = `${PLAYBOOK}

---
ADDITIONAL INSTRUCTIONS — SEO/GEO ARTICLE DRAFTING (jalogames.fi journal)

You are drafting a long-form, SEO- and GEO-optimised article for the
jalogames.fi journal, plus the social posts that promote it. Apply Jalo's voice
and the rules above.

ARTICLE rules:
- Answer-first: "quickAnswer" must directly and completely answer the target
  query in 2-4 sentences. This is the text AI search engines lift, so make it
  self-contained.
- Structure with clear H2/H3 sections, short paragraphs, specifics over
  vagueness. 700-1100 words in "bodyMarkdown" (markdown; ## and ### headings,
  **bold**, lists, links).
- BE FACTUAL. Only state things that are true. Attribute statistics or claims
  in-text (e.g. "Digiday reported..."). NEVER invent private numbers about
  JaloGames or its games — use only facts in the brief or widely-known public
  facts. If you don't have a number, don't fabricate one.
- First person where natural (Jalo), but an SEO explainer can be more
  instructional than a personal journal post. The differentiator is first-hand
  practitioner judgement, not hype.
- "faq": 3-4 genuinely useful questions real people ask, with concise answers.

SOCIAL rules (Jalo's voice, per the playbook):
- linkedin: hook-first, 100-200 words, line breaks like poetry, one clear
  opinion, <=3 hashtags, end without engagement bait.
- x: <=280 characters, punchy fragment of the LinkedIn take, no reliance on a
  link (URLs get stripped on X).
- reddit: genuinely useful for the chosen subreddit; redditTitle is the post
  title, redditBody is conversational and not salesy. Pick an apt "subreddit"
  (no r/ prefix), e.g. FortniteCreative, gamedev, IndieDev.

Return ONLY the structured object. No preamble, no commentary.`;

// JSON Schema for structured output. additionalProperties:false everywhere.
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: { type: "string", description: "kebab-case, no date prefix" },
    excerpt: { type: "string" },
    category: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    quickAnswer: { type: "string" },
    faq: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: { q: { type: "string" }, a: { type: "string" } },
        required: ["q", "a"],
      },
    },
    bodyMarkdown: { type: "string" },
    social: {
      type: "object",
      additionalProperties: false,
      properties: {
        linkedin: { type: "string" },
        x: { type: "string" },
        redditTitle: { type: "string" },
        redditBody: { type: "string" },
        subreddit: { type: "string" },
      },
      required: ["linkedin", "x", "redditTitle", "redditBody", "subreddit"],
    },
  },
  required: [
    "title", "slug", "excerpt", "category", "tags",
    "quickAnswer", "faq", "bodyMarkdown", "social",
  ],
};

const userBrief = category
  ? `Topic brief: ${brief}\n\nPreferred category: ${category}`
  : `Topic brief: ${brief}`;

async function main() {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 16000,
      // Adaptive thinking + high effort for stronger writing/structure.
      thinking: { type: "adaptive" },
      // System prompt cached so repeated drafts reuse the playbook prefix.
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      output_config: {
        effort: "high",
        format: { type: "json_schema", schema: SCHEMA },
      },
      messages: [{ role: "user", content: userBrief }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`API ${res.status}: ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) {
    console.error("No text block in response:", JSON.stringify(data).slice(0, 500));
    process.exit(1);
  }
  const draft = JSON.parse(textBlock.text);

  const file = path.join(CONTENT_DIR, `${dateStr}-${draft.slug}.mdx`);
  if (fs.existsSync(file)) {
    console.error(`Refusing to overwrite existing file: ${file}`);
    process.exit(1);
  }
  fs.writeFileSync(file, buildMdx(draft, dateStr));

  const u = data.usage || {};
  console.log(`✓ Wrote ${path.relative(ROOT, file)} (status: draft)`);
  console.log(
    `  tokens in/out: ${u.input_tokens ?? "?"}/${u.output_tokens ?? "?"}` +
    (u.cache_read_input_tokens ? ` (cache read ${u.cache_read_input_tokens})` : "")
  );
  console.log("  Next: review it, then publish/schedule at /admin/publish/" + draft.slug);
}

/** JSON.stringify produces a valid YAML double-quoted scalar (\\n etc.). */
function y(v) {
  return JSON.stringify(String(v ?? ""));
}

function buildMdx(d, date) {
  const fm = [];
  fm.push(`title: ${y(d.title)}`);
  fm.push(`date: ${y(date)}`);
  fm.push(`excerpt: ${y(d.excerpt)}`);
  fm.push(`author: "Jalo Tuomi"`);
  if (d.category) fm.push(`category: ${y(d.category)}`);
  fm.push(`status: "draft"`);
  if (Array.isArray(d.tags) && d.tags.length) {
    fm.push(`tags: [${d.tags.map(y).join(", ")}]`);
  }
  if (d.quickAnswer) fm.push(`quickAnswer: ${y(d.quickAnswer)}`);
  if (Array.isArray(d.faq) && d.faq.length) {
    fm.push("faq:");
    for (const item of d.faq) {
      fm.push(`  - q: ${y(item.q)}`);
      fm.push(`    a: ${y(item.a)}`);
    }
  }
  const s = d.social || {};
  fm.push("social:");
  fm.push(`  linkedin: ${y(s.linkedin)}`);
  fm.push(`  x: ${y(s.x)}`);
  fm.push(`  redditTitle: ${y(s.redditTitle)}`);
  fm.push(`  redditBody: ${y(s.redditBody)}`);
  fm.push(`  subreddit: ${y(s.subreddit)}`);
  return `---\n${fm.join("\n")}\n---\n\n${String(d.bodyMarkdown).trim()}\n`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
