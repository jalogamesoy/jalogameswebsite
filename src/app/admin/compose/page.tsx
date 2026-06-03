import type { Metadata } from "next";
import Link from "next/link";
import { SocialComposer } from "@/components/admin/SocialComposer";

export const metadata: Metadata = {
  title: "Compose",
  robots: { index: false, follow: false }, // never index admin pages
};

// Admin routes must be dynamic so middleware always runs before render.
export const dynamic = "force-dynamic";

/**
 * Standalone social composer — the daily driver. Write a post and fire
 * it now or schedule it in advance to LinkedIn / X / Reddit. No journal
 * article required (most posts won't have one).
 *
 * Only reachable behind HTTP Basic Auth (see middleware.ts).
 */
export default function ComposePage() {
  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">Admin · Compose</p>
          <Link
            href="/admin/scheduled"
            className="font-display text-xs uppercase tracking-[0.18em] text-accent-warm hover:underline"
          >
            Scheduled queue →
          </Link>
        </div>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-text sm:text-4xl">
          Schedule a social post
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          One post, every platform. Each fires independently — if one fails,
          the others still go. Schedule up to 365 days ahead; upload-post posts
          it for you at the chosen time.
        </p>

        <div className="mt-10">
          <SocialComposer
            defaults={{
              linkedin: "",
              x: "",
              redditTitle: "",
              redditBody: "",
              subreddit: "IndieDev",
            }}
          />
        </div>
      </div>
    </main>
  );
}
