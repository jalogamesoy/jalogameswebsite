import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getGamesInOrder } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Three worlds in active development at JaloGames — Ramba Bull, Grace Run, and Stealin Apples. The proof that our brand campaigns ship at studio quality.",
};

export default function GamesIndexPage() {
  const games = getGamesInOrder();

  return (
    <>
      <PageHeader
        eyebrow="— OUR UNIVERSES —"
        title="Three worlds in development."
        description="The studio's own slate. Every title here is the proof you'll see in our brand work."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <li
              key={game.slug}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <Link
                href={`/games/${game.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={game.screenshots[0]}
                    alt={`${game.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg/60 px-3 py-1 backdrop-blur">
                    <span className="size-1.5 rounded-full bg-accent-warm" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text">
                      {game.releaseWindow}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="eyebrow mb-1">{game.subtitle}</p>
                    <h2 className="font-display text-2xl font-medium text-text">
                      {game.title}
                    </h2>
                  </div>
                  <span
                    aria-hidden
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-text transition-colors group-hover:border-accent-warm group-hover:text-accent-warm"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
