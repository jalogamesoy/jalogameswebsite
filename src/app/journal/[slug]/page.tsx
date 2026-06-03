import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ShareButtons } from "@/components/journal/ShareButtons";
import {
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/journal";
import { SITE_URL } from "@/lib/site";
import { studio } from "@/content/site";

type Params = { slug: string };

// ISR: refresh hourly so scheduled posts surface automatically once their
// publishAt passes, and dateModified / related links stay fresh.
export const revalidate = 3600;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { title, excerpt, hero, date, dateModified } = post.frontmatter;
  return {
    title,
    description: excerpt,
    keywords: [
      ...(post.frontmatter.tags ?? []),
      ...(post.frontmatter.keywords ?? []),
    ],
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      url: `${SITE_URL}/journal/${slug}`,
      publishedTime: date,
      modifiedTime: dateModified ?? date,
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

  const {
    title,
    date,
    dateModified,
    excerpt,
    hero,
    heroAlt,
    author,
    category,
    quickAnswer,
    faq,
    tags,
    keywords,
  } = post.frontmatter;
  const postUrl = `${SITE_URL}/journal/${slug}`;
  const authorName = author ?? "Jalo Tuomi";
  const allKeywords = [...(tags ?? []), ...(keywords ?? [])];

  // ── Structured data: Article + Breadcrumb + (optional) FAQ ──
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${SITE_URL}/journal`,
      },
      { "@type": "ListItem", position: 3, name: title, item: postUrl },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: dateModified ?? date,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: studio.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: hero ? [`${SITE_URL}${hero}`] : undefined,
    articleSection: category || undefined,
    keywords: allKeywords.length ? allKeywords.join(", ") : undefined,
    inLanguage: "en",
  };

  const faqJsonLd =
    faq && faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const jsonLd = [
    breadcrumbJsonLd,
    articleJsonLd,
    ...(faqJsonLd ? [faqJsonLd] : []),
  ];

  // Previous / next post for footer navigation (sorted newest-first
  // already, so prev = newer, next = older).
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx < all.length - 1 ? all[idx + 1] : null;
  const related = getRelatedPosts(slug, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            {category && (
              <span className="mb-4 inline-flex items-center rounded-full border border-accent-warm/40 px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-accent-warm">
                {category}
              </span>
            )}
            <h1 className="font-display text-balance text-4xl uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
              {excerpt}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-dim">
              By {authorName}
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

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {/* Answer-first box — concise summary AI search engines can lift */}
          {quickAnswer && (
            <aside className="mb-12 rounded-2xl border border-accent-warm/30 bg-accent-warm/5 p-6">
              <p className="eyebrow mb-2 text-accent-warm">Quick answer</p>
              <p className="text-base leading-relaxed text-text">
                {quickAnswer}
              </p>
            </aside>
          )}

          <div className="journal-prose">
            <MDXRemote source={post.content} />
          </div>

          {/* On-page FAQ — mirrors the FAQPage schema above */}
          {faq && faq.length > 0 && (
            <section className="mt-16 border-t border-border pt-10">
              <h2 className="font-display text-2xl uppercase tracking-[0.02em] text-text">
                FAQ
              </h2>
              <dl className="mt-6 space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.q}
                    name="post-faq"
                    className="group rounded-2xl border border-border bg-surface px-6 py-5 transition-colors open:border-border-strong hover:border-border-strong"
                  >
                    <summary className="flex cursor-pointer items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                      <dt className="font-display text-base uppercase tracking-[0.04em] text-text">
                        {item.q}
                      </dt>
                      <span
                        aria-hidden
                        className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-text transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <dd className="mt-4 text-base leading-relaxed text-text-muted">
                      {item.a}
                    </dd>
                  </details>
                ))}
              </dl>
            </section>
          )}

          {/* Share */}
          <div className="mt-16 border-t border-border pt-8">
            <p className="eyebrow mb-4">Share this post</p>
            <ShareButtons url={postUrl} title={title} />
          </div>
        </div>

        {/* Related reading — internal-link cluster */}
        {related.length > 0 && (
          <section
            aria-label="Related reading"
            className="border-t border-border bg-surface"
          >
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
              <p className="eyebrow mb-6">Related reading</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/journal/${r.slug}`}
                      className="group block h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-accent-warm"
                    >
                      <p className="eyebrow mb-2">
                        {formatPostDate(r.frontmatter.date)}
                      </p>
                      <p className="font-display text-lg uppercase leading-[1.1] tracking-[0.02em] text-text group-hover:text-accent-warm">
                        {r.frontmatter.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {r.frontmatter.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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
