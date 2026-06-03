import { getAllPosts } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";
import { studio } from "@/content/site";

/**
 * /llms-full.txt — the full-content companion to the static /llms.txt.
 *
 * llms.txt is the structured *summary* (who we are, key pages). This is
 * the full corpus: every live journal article, complete body included,
 * so an LLM can answer deeply about our work without crawling each page.
 * Regenerates hourly, so new + scheduled posts roll in automatically.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts();

  const header = `# JaloGames — Full Content (llms-full.txt)

> ${studio.tagline}

JaloGames is a Helsinki-based independent game studio founded in 2024 by
Jalo Tuomi (Founder & CEO). This file contains the studio's full journal
corpus for language models. For the structured summary (key pages, games,
how to work with us) see ${SITE_URL}/llms.txt.

- Website: ${SITE_URL}
- Contact: ${studio.email}
- Articles below: ${posts.length}
`;

  const articles = posts
    .map((p) => {
      const url = `${SITE_URL}/journal/${p.slug}`;
      const fm = p.frontmatter;
      const meta = [
        `URL: ${url}`,
        `Published: ${fm.date}`,
        fm.dateModified ? `Updated: ${fm.dateModified}` : null,
        fm.category ? `Category: ${fm.category}` : null,
        fm.tags?.length ? `Tags: ${fm.tags.join(", ")}` : null,
        `Author: ${fm.author ?? "Jalo Tuomi"}`,
      ]
        .filter(Boolean)
        .join("\n");

      const quick = fm.quickAnswer ? `\n**Quick answer:** ${fm.quickAnswer}\n` : "";

      return `## ${fm.title}

${meta}

${fm.excerpt}
${quick}
${p.content.trim()}`;
    })
    .join("\n\n---\n\n");

  const text = `${header}
## Journal articles

${articles}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
