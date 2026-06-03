import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsAdmin, postState, type PostState } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PRIMARY_ACTIONS = [
  {
    href: "/admin/compose",
    title: "Compose a post",
    desc: "Write once and fire now — or schedule in advance — to LinkedIn, X and Reddit. The daily driver.",
    cta: "Compose →",
  },
  {
    href: "/admin/scheduled",
    title: "Scheduled queue",
    desc: "See everything queued to autopost, and cancel any job before it fires.",
    cta: "View queue →",
  },
];

const STATE_BADGE: Record<PostState, string> = {
  live: "border-accent-cool/40 text-accent-cool",
  scheduled: "border-accent-warm/40 text-accent-warm",
  draft: "border-border-strong text-text-dim",
};

/**
 * Admin home. Primary actions up top (compose + scheduled queue), then
 * the journal-post list — including drafts + scheduled (admin view), each
 * with a status badge. Behind Basic Auth (middleware.ts).
 */
export default function AdminIndexPage() {
  const posts = getAllPostsAdmin();

  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="eyebrow mb-4">Admin</p>
        <h1 className="font-display text-3xl uppercase tracking-[0.02em] text-text sm:text-4xl">
          Studio control room
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Schedule social posts to autopost in advance, or syndicate a journal
          post to all your channels at once.
        </p>

        {/* Primary actions */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {PRIMARY_ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-warm"
            >
              <p className="font-display text-base uppercase tracking-[0.02em] text-text">
                {a.title}
              </p>
              <p className="mt-2 text-sm text-text-muted">{a.desc}</p>
              <span
                aria-hidden
                className="mt-4 inline-block font-display text-xs uppercase tracking-[0.18em] text-accent-warm transition-transform group-hover:translate-x-1"
              >
                {a.cta}
              </span>
            </Link>
          ))}
        </div>

        {/* Journal posts */}
        <h2 className="mt-12 font-display text-sm uppercase tracking-[0.18em] text-text-muted">
          Journal posts
        </h2>
        <p className="mt-2 text-xs text-text-dim">
          Pre-fills per-platform drafts from an article. Drafts + scheduled
          posts are visible here but hidden from the public site.
        </p>
        <ul className="mt-4 space-y-3">
          {posts.map((post) => {
            const state = postState(post.frontmatter);
            return (
              <li key={post.slug}>
                <Link
                  href={`/admin/publish/${post.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-warm"
                >
                  <div className="min-w-0">
                    <span
                      className={`mb-2 inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] uppercase tracking-[0.2em] ${STATE_BADGE[state]}`}
                    >
                      {state}
                    </span>
                    <p className="font-display text-base uppercase tracking-[0.02em] text-text">
                      {post.frontmatter.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-text-dim">
                      /journal/{post.slug}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="font-display shrink-0 text-xs uppercase tracking-[0.18em] text-accent-warm transition-transform group-hover:translate-x-1"
                  >
                    Syndicate →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
