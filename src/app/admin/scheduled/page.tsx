import type { Metadata } from "next";
import Link from "next/link";
import { listScheduled } from "@/app/admin/actions";
import { ScheduledQueue } from "@/components/admin/ScheduledQueue";

export const metadata: Metadata = {
  title: "Scheduled",
  robots: { index: false, follow: false }, // never index admin pages
};

// Always fetch fresh — the queue changes as posts fire / get cancelled.
export const dynamic = "force-dynamic";

/**
 * The scheduled-post queue, read live from upload-post. Cancel any
 * pending job here. Only reachable behind HTTP Basic Auth.
 */
export default async function ScheduledPage() {
  const posts = await listScheduled();

  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">Admin · Scheduled</p>
          <Link
            href="/admin/compose"
            className="font-display text-xs uppercase tracking-[0.18em] text-accent-warm hover:underline"
          >
            + Compose
          </Link>
        </div>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-text sm:text-4xl">
          Scheduled queue
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          {posts.length} pending {posts.length === 1 ? "post" : "posts"} across
          your socials. Times shown in your local timezone. Each platform is its
          own job — cancel them individually.
        </p>

        <div className="mt-10">
          <ScheduledQueue initial={posts} />
        </div>
      </div>
    </main>
  );
}
