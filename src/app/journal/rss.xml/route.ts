import { getAllPosts } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";
import { studio } from "@/content/site";

/**
 * RSS 2.0 feed for the journal. Lives at /journal/rss.xml. Cached
 * for an hour on the edge.
 *
 * Why RSS specifically: it's still the open-protocol way to syndicate
 * to other tools (Zapier, Make, Buffer, newsletter platforms, dev
 * aggregators). When the user is ready to wire LinkedIn auto-posting,
 * this feed is the natural source-of-truth.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuild = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/journal/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.frontmatter.excerpt)}</description>
      <author>${escapeXml(studio.email)} (${escapeXml(
        post.frontmatter.author ?? "Jalo Tuomi"
      )})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(studio.name)} — Journal</title>
    <link>${SITE_URL}/journal</link>
    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml" />
    <description>Updates from inside ${escapeXml(
      studio.name
    )} — what we're building, what we shipped, and how.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
