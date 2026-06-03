import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatPostDate, getAllPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Updates from inside JaloGames — what we're building, what we shipped, and how. The studio's running log.",
  alternates: { canonical: "/journal" },
};

// Refresh hourly so scheduled posts appear on the listing when due.
export const revalidate = 3600;

export default function JournalIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="— Journal —"
        title="What we've been building."
        description="Updates from inside the studio — works in progress, ships, behind-the-scenes, occasional thinking out loud."
      />

      <section
        data-reveal
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        {posts.length === 0 ? (
          <p className="mx-auto max-w-md text-center text-text-muted">
            No posts yet — the first one is coming any day now.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
                >
                  {post.frontmatter.hero ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.frontmatter.hero}
                        alt={post.frontmatter.heroAlt ?? post.frontmatter.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={i === 0}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <p className="eyebrow mb-3 flex flex-wrap items-center gap-2">
                      {post.frontmatter.category && (
                        <span className="rounded-full border border-accent-warm/40 px-2 py-0.5 text-[10px] tracking-[0.2em] text-accent-warm">
                          {post.frontmatter.category}
                        </span>
                      )}
                      <span>{formatPostDate(post.frontmatter.date)}</span>
                    </p>
                    <h2 className="font-display text-xl uppercase leading-[1.1] tracking-[0.02em] text-text sm:text-2xl">
                      {post.frontmatter.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {post.frontmatter.excerpt}
                    </p>
                    <span
                      aria-hidden
                      className="mt-5 inline-flex items-center font-display text-xs uppercase tracking-[0.18em] text-accent-warm transition-transform group-hover:translate-x-1"
                    >
                      Read post →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
