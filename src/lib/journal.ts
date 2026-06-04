import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** A frontmatter FAQ entry — rendered as an accordion + FAQPage schema. */
export type JournalFaq = { q: string; a: string };

/** Lifecycle state of a post (label + the publishAt date are the gate). */
export type PostState = "live" | "draft" | "scheduled";

/**
 * Frontmatter fields a journal post MUST or MAY carry. Keep this in
 * sync with the MDX files in src/content/journal/.
 */
export type JournalFrontmatter = {
  title: string;
  /** ISO 8601 string, e.g. "2026-05-26". The display/publish date. */
  date: string;
  /** ~120-180 character summary shown on the listing card + RSS. */
  excerpt: string;
  /** Optional hero image path (relative to /public). */
  hero?: string;
  heroAlt?: string;
  /** Defaults to "Jalo Tuomi" if absent. */
  author?: string;
  tags?: string[];

  // ── SEO / GEO / scheduling (all optional; absent = published now) ──
  /** "draft" hides it everywhere public; otherwise governed by publishAt. */
  status?: PostState;
  /** ISO instant; while in the future the post is hidden from the public. */
  publishAt?: string;
  /** ISO date of last meaningful edit — feeds Article.dateModified. */
  dateModified?: string;
  /** Answer-first paragraph lifted into a "quick answer" box (GEO gold). */
  quickAnswer?: string;
  /** Topic/section, e.g. "UEFN", "Devlog" — articleSection + listing chip. */
  category?: string;
  /** Extra ranking keywords beyond tags. */
  keywords?: string[];
  /** Q&A pairs → on-page FAQ accordion + FAQPage JSON-LD. */
  faq?: JournalFaq[];
  /** Explicit related-post slugs (otherwise inferred from shared tags). */
  related?: string[];
  /** Per-platform social drafts — pre-fills the /admin publish composer. */
  social?: {
    linkedin?: string;
    x?: string;
    redditTitle?: string;
    redditBody?: string;
    subreddit?: string;
  };
};

export type JournalPost = {
  /** Slug derived from the filename, without leading date prefix. */
  slug: string;
  frontmatter: JournalFrontmatter;
  /** Raw MDX body (everything after the frontmatter). */
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/journal");

function readPost(file: string): JournalPost {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // Strip leading "YYYY-MM-DD-" prefix from the filename so the URL
  // doesn't carry the date — keeps slugs short + lets posts be
  // re-dated by editing frontmatter only.
  const slug = file
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.mdx$/, "");

  return {
    slug,
    frontmatter: data as JournalFrontmatter,
    content,
  };
}

function sortNewestFirst(posts: JournalPost[]): JournalPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/** Compute a post's lifecycle state. The publishAt date is the real gate;
 *  the status string is a label/safety flag. */
export function postState(fm: JournalFrontmatter): PostState {
  if (fm.status === "draft") return "draft";
  if (fm.publishAt) {
    const t = Date.parse(fm.publishAt);
    if (!Number.isNaN(t) && t > Date.now()) return "scheduled";
  }
  // Marked "scheduled" but missing a date → treat as not-yet-live (safe).
  if (fm.status === "scheduled" && !fm.publishAt) return "scheduled";
  return "live";
}

function isLive(fm: JournalFrontmatter): boolean {
  return postState(fm) === "live";
}

function readAll(): JournalPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map(readPost);
}

/** Live posts only (draft + future-scheduled hidden), newest first.
 *  This is the PUBLIC view — used by the listing, [slug], sitemap, RSS. */
export function getAllPosts(): JournalPost[] {
  return sortNewestFirst(readAll().filter((p) => isLive(p.frontmatter)));
}

/** Every post regardless of state, newest first. ADMIN-only. */
export function getAllPostsAdmin(): JournalPost[] {
  return sortNewestFirst(readAll());
}

/** A single LIVE post (public). Returns undefined for draft/scheduled. */
export function getPostBySlug(slug: string): JournalPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** A single post regardless of state. ADMIN-only. */
export function getPostBySlugAdmin(slug: string): JournalPost | undefined {
  return getAllPostsAdmin().find((p) => p.slug === slug);
}

/** Related posts for internal-link clustering: explicit `related` slugs
 *  first, then the most tag-overlapping live posts, then most recent. */
export function getRelatedPosts(slug: string, limit = 2): JournalPost[] {
  const all = getAllPosts();
  const self = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!self) return others.slice(0, limit);

  const explicit = (self.frontmatter.related ?? [])
    .map((s) => others.find((p) => p.slug === s))
    .filter((p): p is JournalPost => Boolean(p));

  const selfTags = new Set(self.frontmatter.tags ?? []);
  const ranked = others
    .filter((p) => !explicit.includes(p))
    .map((p) => ({
      p,
      score: (p.frontmatter.tags ?? []).filter((t) => selfTags.has(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.p.frontmatter.date).getTime() -
          new Date(a.p.frontmatter.date).getTime()
    )
    .map((x) => x.p);

  return [...explicit, ...ranked].slice(0, limit);
}

/** Human-readable date for the post header. Keep ISO in the
 *  frontmatter, format here for display so locale changes are
 *  centralised. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
