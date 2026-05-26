import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ShareButtons } from "@/components/journal/ShareButtons";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";
import { studio } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { title, excerpt, hero } = post.frontmatter;
  return {
    title,
    description: excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author ?? studio.name],
      images: hero ? [hero] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: hero ? [hero] : undefined,
    },
  };
}

export default async function JournalPostPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, date, excerpt, hero, heroAlt, author } = post.frontmatter;
  const postUrl = `${SITE_URL}/journal/${slug}`;

  // Article JSON-LD — strong SEO + GEO signal for blog posts.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author ?? "Jalo Tuomi",
    },
    publisher: {
      "@type": "Organization",
      name: studio.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    image: hero ? [`${SITE_URL}${hero}`] : undefined,
  };

  // Previous / next post for footer navigation (sorted newest-first
  // already, so prev = newer, next = older).
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article data-reveal className="bg-bg">
        {/* Header */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="eyebrow mb-4">
              <Link
                href="/journal"
                className="transition-colors hover:text-text"
              >
                ← Journal
              </Link>{" "}
              · {formatPostDate(date)}
            </p>
            <h1 className="font-display text-balance text-4xl uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
              {excerpt}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-dim">
              By {author ?? "Jalo Tuomi"}
            </p>
          </div>
        </header>

        {/* Hero image */}
        {hero ? (
          <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border">
              <Image
                src={hero}
                alt={heroAlt ?? title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* MDX body */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="journal-prose">
            <MDXRemote source={post.content} />
          </div>

          {/* Share */}
          <div className="mt-16 border-t border-border pt-8">
            <p className="eyebrow mb-4">Share this post</p>
            <ShareButtons url={postUrl} title={title} />
          </div>
        </div>

        {/* Prev / next */}
        {(newer || older) && (
          <nav
            aria-label="More posts"
            className="border-t border-border bg-surface"
          >
            <div className="mx-auto grid max-w-5xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:px-8">
              {newer ? (
                <Link
                  href={`/journal/${newer.slug}`}
                  className="group rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-strong"
                >
                  <p className="eyebrow mb-2">← Newer post</p>
                  <p className="font-display text-lg uppercase tracking-[0.02em] text-text group-hover:text-accent-warm">
                    {newer.frontmatter.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {older ? (
                <Link
                  href={`/journal/${older.slug}`}
                  className="group rounded-2xl border border-border bg-bg p-6 text-right transition-colors hover:border-border-strong"
                >
                  <p className="eyebrow mb-2">Older post →</p>
                  <p className="font-display text-lg uppercase tracking-[0.02em] text-text group-hover:text-accent-warm">
                    {older.frontmatter.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>
        )}
      </article>
    </>
  );
}
