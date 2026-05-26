import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/games";

/**
 * Game card used on the homepage games grid and the games index. If
 * the game has a pre-composed `cardImage`, that's rendered straight
 * (with hover lift). Otherwise we fall back to a CSS-built card with
 * the first screenshot + chrome (IN DEVELOPMENT pill, title, arrow)
 * styled to feel like the bespoke ones.
 *
 * Stealin Apples uses the fallback path until the corrected card art
 * arrives.
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
        className="group relative block overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
      >
        <Image
          src={game.cardImage}
          alt={`${game.title} key art`}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="block h-auto w-full"
        />
      </Link>
    );
  }

  // CSS-built fallback — visually echoes the pre-composed cards.
  const accent = game.accent.warm;
  return (
    <Link
      href={`/games/${game.slug}`}
      aria-label={`${game.title} — ${game.subtitle}`}
      className="group relative block overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.screenshots[0]}
          alt={`${game.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* IN DEVELOPMENT pill — top-left, mirrors the bespoke cards. */}
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-text shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur"
          style={{ borderColor: accent }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {game.releaseWindow}
        </span>

        {/* Title + subtitle + arrow row — bottom of card, over a gradient. */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-16">
          <div>
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-[0.02em] text-text drop-shadow-md sm:text-3xl">
              {game.title}
            </h3>
            <p
              className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.18em]"
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

        {/* Accent underline — bottom edge, same as bespoke cards. */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: accent }}
        />
      </div>
    </Link>
  );
}
