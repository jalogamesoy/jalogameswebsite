import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { games, getGameBySlug } from "@/content/games";

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
  return {
    title: game.title,
    description: game.pitch,
    openGraph: {
      title: `${game.title} — ${game.subtitle}`,
      description: game.pitch,
      images: game.screenshots[0] ? [game.screenshots[0]] : undefined,
    },
  };
}

export default async function GameDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`— ${game.subtitle.toUpperCase()} · ${game.releaseWindow.toUpperCase()} —`}
        title={game.title}
        description={game.pitch}
      />

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
