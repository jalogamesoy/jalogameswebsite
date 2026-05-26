import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Tiny admin index — lists every journal post with a link to its
 * publish page. Sits behind the same Basic Auth as everything under
 * /admin so it's safe to surface.
 */
export default function AdminIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="eyebrow mb-4">Admin</p>
        <h1 className="font-display text-3xl uppercase tracking-[0.02em] text-text sm:text-4xl">
          Publish a journal post
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Pick the post you want to syndicate. Each publish page edits the
          per-platform drafts and fires upload-post.com on submit.
        </p>

        <ul className="mt-10 space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/admin/publish/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-warm"
              >
                <div>
                  <p className="font-display text-base uppercase tracking-[0.02em] text-text">
                    {post.frontmatter.title}
                  </p>
                  <p className="mt-1 text-xs text-text-dim">
                    /journal/{post.slug}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="font-display text-xs uppercase tracking-[0.18em] text-accent-warm transition-transform group-hover:translate-x-1"
                >
                  Publish →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
