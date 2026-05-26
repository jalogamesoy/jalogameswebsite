import Link from "next/link";
import { GameCard } from "@/components/games/GameCard";
import { getGamesInOrder } from "@/content/games";
import { universesIntro } from "@/content/site";

/**
 * Homepage games section. Leads with the "Our universes are not
 * experiments. They are future franchises in motion." framing, then
 * shows the three game cards with the bespoke artwork (CSS fallback
 * for Stealin Apples until its corrected card art lands).
 */
export function GamesSection() {
  const games = getGamesInOrder();

  return (
    <section
      id="games"
      aria-labelledby="games-section-heading"
      className="border-b border-border bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">{universesIntro.eyebrow}</p>
            <h2
              id="games-section-heading"
              className="font-display text-balance text-3xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
            >
              {universesIntro.headline}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="max-w-2xl text-balance text-base leading-relaxed text-text-muted sm:text-lg">
              {universesIntro.body}
            </p>
            <Link
              href="/games"
              className="mt-6 inline-flex font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-accent-warm"
            >
              View all projects
              <span aria-hidden className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <li key={game.slug}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
