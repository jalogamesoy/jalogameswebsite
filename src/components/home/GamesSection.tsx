import Link from "next/link";
import { GameCard } from "@/components/games/GameCard";
import { getGamesInOrder } from "@/content/games";

/**
 * Homepage "Our Universes / Currently Working On" section. Three game
 * cards using the bespoke artwork (with the CSS fallback for Stealin
 * Apples until its card art is redone).
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">— Our universes —</p>
            <h2
              id="games-section-heading"
              className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
            >
              Currently working on
            </h2>
          </div>
          <Link
            href="/games"
            className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-accent-warm"
          >
            View all projects
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
