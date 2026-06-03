import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { games, getGameBySlug } from "@/content/games";
import { SITE_URL } from "@/lib/site";
import { studio } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const ogImage = game.cardImage ?? game.screenshots[0];
  return {
    title: game.title,
    description: game.pitch,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} — ${game.subtitle}`,
      description: game.pitch,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} — ${game.subtitle}`,
      description: game.pitch,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function GameDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const ogImage = game.cardImage ?? game.screenshots[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.pitch,
    genre: game.subtitle,
    gamePlatform: game.platforms,
    applicationCategory: "Game",
    operatingSystem: game.platforms.join(", "),
    ...(ogImage ? { image: `${SITE_URL}${ogImage}` } : {}),
    url: `${SITE_URL}/games/${game.slug}`,
    author: { "@type": "Organization", name: studio.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: studio.name, url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow={`— ${game.subtitle.toUpperCase()} · ${game.releaseWindow.toUpperCase()} —`}
        title={game.title}
        description={game.pitch}
      />

      {/* Launch funnel — wishlist / store / press CTAs. Renders only once
          storeLinks is populated in content/games.ts (add the real URLs
          per game as they go live). First link gets the primary amber
          treatment; the rest are outlined. */}
      {game.storeLinks.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {game.storeLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "inline-flex h-12 items-center justify-center rounded-full bg-accent-warm px-7 font-display text-sm uppercase tracking-[0.18em] text-bg transition hover:bg-text"
                    : "inline-flex h-12 items-center justify-center rounded-full border border-border-strong bg-bg/40 px-7 font-display text-sm uppercase tracking-[0.18em] text-text backdrop-blur transition hover:border-accent-warm hover:text-accent-warm"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots — masonry-ish in a simple grid for v0. The full
          gallery treatment lands in Phase 2E. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="eyebrow mb-6">Screenshots</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {game.screenshots.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <Image
                src={src}
                alt={`${game.title} screenshot ${i + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Specs — minimal v0; full Specs panel + Links panel in Phase 2E. */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="eyebrow mb-4">Details</p>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-text-dim">
                Genre
              </dt>
              <dd className="mt-1 text-text">{game.subtitle}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-text-dim">
                Platforms
              </dt>
              <dd className="mt-1 text-text">
                {game.platforms.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-text-dim">
                Status
              </dt>
              <dd className="mt-1 text-text">{game.releaseWindow}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Link
            href="/games"
            className="text-sm uppercase tracking-[0.14em] text-text-muted hover:text-text"
          >
            ← All games
          </Link>
        </div>
      </section>
    </>
  );
}
