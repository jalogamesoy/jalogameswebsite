import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/games";

/**
 * Game card used on the homepage games grid and the games index. If
 * the game has a pre-composed `cardImage`, that's rendered inside a
 * fixed-aspect frame (so all three cards match in size regardless of
 * the source PNG's native dimensions). Otherwise we fall back to a
 * CSS-built card using the first screenshot + on-brand chrome.
 *
 * Stealin Apples uses the fallback path until its corrected card
 * artwork lands.
 */
export function GameCard({
  game,
  priority = false,
}: {
  game: Game;
  priority?: boolean;
}) {
  if (game.cardImage) {
    return (
      <Link
        href={`/games/${game.slug}`}
        aria-label={`${game.title} — ${game.subtitle}`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
      >
        <Image
          src={game.cardImage}
          alt={`${game.title} key art`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
    );
  }

  // CSS-built fallback — same outer dimensions and shape as the bespoke
  // cards so the grid stays visually consistent.
  const accent = game.accent.warm;
  return (
    <Link
      href={`/games/${game.slug}`}
      aria-label={`${game.title} — ${game.subtitle}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
    >
      <Image
        src={game.screenshots[0]}
        alt={`${game.title} screenshot`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* IN DEVELOPMENT pill — mirrors the bespoke cards. */}
      <span
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur"
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full"
          style={{ backgroundColor: accent }}
        />
        {game.releaseWindow}
      </span>

      {/* Title + subtitle + arrow row — bottom of card, over a gradient. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-16">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-text drop-shadow-md sm:text-3xl">
            {game.title}
          </h3>
          <p
            className="mt-1 font-display text-xs uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {game.subtitle}
          </p>
        </div>
        <span
          aria-hidden
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-text transition-transform group-hover:translate-x-1"
          style={{ borderColor: accent, color: accent }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
