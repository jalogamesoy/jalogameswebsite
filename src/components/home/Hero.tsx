import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/components/games/GameCard";
import { ParallaxBg } from "@/components/fx/ParallaxBg";
import { hero } from "@/content/site";
import { getGamesInOrder } from "@/content/games";

/**
 * Hero v2 — full-bleed atmospheric background image (sky castle scene)
 * with scroll-driven parallax so the world feels further away than the
 * foreground content. Text on the left, three game cards composed on
 * the right (center forward, sides rotated back) at desktop. Collapses
 * to a stacked column on mobile.
 */
export function Hero() {
  const [first, second, third] = getGamesInOrder();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Parallax background scene — moves at 55% of scroll speed so it
          reads as a deeper layer. Overlays sit OUTSIDE the parallax
          wrapper so they stay glued to the hero for consistent contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <ParallaxBg speed={0.55}>
          <Image
            src="/home/background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </ParallaxBg>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/25 via-bg/15 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(7,11,31,0.35)_85%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-32">
        {/* Left — text block */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>

          <h1
            id="hero-heading"
            className="font-display whitespace-pre-line text-balance text-5xl uppercase leading-[0.95] tracking-[0.01em] text-text drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl lg:text-[5rem]"
          >
            {hero.headline}
          </h1>

          <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-text-muted drop-shadow sm:text-xl">
            {hero.sub}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-text px-7 font-display text-sm uppercase tracking-[0.18em] text-bg transition hover:bg-accent-warm"
            >
              {hero.primaryCta.label}
              <span aria-hidden className="ml-2">
                →
              </span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong bg-bg/40 px-7 font-display text-sm uppercase tracking-[0.18em] text-text backdrop-blur transition hover:border-accent-warm hover:text-accent-warm"
            >
              {hero.secondaryCta.label}
              <span aria-hidden className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right — game cards triptych */}
        <div className="relative lg:col-span-6">
          {/* Mobile / tablet: simple 3-up stack */}
          <div className="grid gap-4 sm:grid-cols-3 lg:hidden">
            <GameCard game={first} priority />
            <GameCard game={second} />
            <GameCard game={third} />
          </div>

          {/* Desktop: layered composition */}
          <div className="relative hidden h-[640px] lg:block">
            <div className="absolute -left-4 top-20 w-[58%] -rotate-[6deg] opacity-90 transition-transform duration-500 hover:rotate-0 hover:opacity-100">
              <GameCard game={second} />
            </div>
            <div className="absolute -right-4 top-28 w-[58%] rotate-[6deg] opacity-90 transition-transform duration-500 hover:rotate-0 hover:opacity-100">
              <GameCard game={third} />
            </div>
            <div className="absolute left-1/2 top-0 w-[78%] -translate-x-1/2 transition-transform duration-500 hover:-translate-y-2">
              <GameCard game={first} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
