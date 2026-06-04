import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SocialComposer } from "@/components/admin/SocialComposer";
import { getPostBySlugAdmin } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Publish",
  robots: { index: false, follow: false }, // never index admin pages
};

// Admin routes must be dynamic so middleware always runs before render.
export const dynamic = "force-dynamic";

/**
 * Per-post publish dashboard. Reads the journal post, generates
 * starter drafts for each platform, hands off to the client form.
 *
 * Only reachable behind HTTP Basic Auth (see middleware.ts).
 */
export default async function PublishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlugAdmin(slug);
  if (!post) notFound();

  const postUrl = `${SITE_URL}/journal/${slug}`;
  const { title, excerpt, social } = post.frontmatter;

  // Default drafts. If the article carries AI-drafted `social` frontmatter
  // (from scripts/draft.mjs), pre-fill those; otherwise fall back to simple
  // conventions:
  //  - LinkedIn: hook-first, then link, then 2-3 hashtags
  //  - X: ~200 char punchy version; upload-post strips URLs from X
  //  - Reddit: title same as post title, body = conversational expansion
  const linkedin =
    social?.linkedin ??
    `${excerpt}\n\nMore in the full post → ${postUrl}\n\n#gamedev #indiegamedev`;

  const x = social?.x ?? `${title}.\n\n${excerpt}\n\n#gamedev #indiedev`;

  const redditBody =
    social?.redditBody ??
    `${excerpt}\n\nWriting more about this on the studio journal: ${postUrl}\n\nHappy to answer questions.`;

  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="eyebrow mb-4">Admin · Publish</p>
        <h1 className="font-display text-3xl uppercase tracking-[0.02em] text-text sm:text-4xl">
          Send post to socials
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Edit any platform draft below before publishing. Each platform
          fires independently — if one fails (e.g. Reddit karma), the others
          still go through.
        </p>

        <div className="mt-10">
          <SocialComposer
            defaults={{
              linkedin,
              x,
              redditTitle: social?.redditTitle ?? title,
              redditBody,
              subreddit: social?.subreddit ?? "IndieDev",
            }}
            context={{ title, url: postUrl }}
          />
        </div>
      </div>
    </main>
  );
}
