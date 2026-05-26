import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Frontmatter fields a journal post MUST or MAY carry. Keep this in
 * sync with the MDX files in src/content/journal/.
 */
export type JournalFrontmatter = {
  title: string;
  /** ISO 8601 string, e.g. "2026-05-26". */
  date: string;
  /** ~120-180 character summary shown on the listing card + RSS. */
  excerpt: string;
  /** Optional hero image path (relative to /public). */
  hero?: string;
  heroAlt?: string;
  /** Defaults to "Jalo Tuomi" if absent. */
  author?: string;
  tags?: string[];
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

/** All posts, newest first. */
export function getAllPosts(): JournalPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPost)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): JournalPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
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
