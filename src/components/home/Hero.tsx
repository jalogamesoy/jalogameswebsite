import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/components/games/GameCard";
import { hero } from "@/content/site";
import { getGamesInOrder } from "@/content/games";

/**
 * Hero v1 — full-bleed atmospheric background image (sky castle scene)
 * with text content on the left and a triptych of the three game cards
 * on the right, echoing the "monitor + phones" composition from the
 * style reference. No parallax JS yet; that lands in Phase 3A motion
 * polish on top of this layout.
 */
export function Hero() {
  const [first, second, third] = getGamesInOrder();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Background scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/home/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        {/* Darken + vignette so the foreground content reads cleanly. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(7,11,31,0.6)_75%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-32">
        {/* Left — text block */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>

          <h1
            id="hero-heading"
            className="font-display whitespace-pre-line text-balance text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.01em] text-text drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl lg:text-[5rem]"
          >
            {hero.headline}
          </h1>

          <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-text-muted drop-shadow sm:text-xl">
            {hero.sub}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-text px-7 font-display text-sm font-semibold uppercase tracking-[0.18em] text-bg transition hover:bg-accent-warm"
            >
              {hero.primaryCta.label}
              <span aria-hidden className="ml-2">
                →
              </span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong bg-bg/40 px-7 font-display text-sm font-semibold uppercase tracking-[0.18em] text-text backdrop-blur transition hover:border-accent-warm hover:text-accent-warm"
            >
              {hero.secondaryCta.label}
              <span aria-hidden className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right — game cards triptych. Center card forward, sides tucked
            behind for a "monitor + phones" feel. Collapses to a stacked
            column on small viewports. */}
        <div className="relative lg:col-span-6">
          {/* Mobile / tablet: simple 3-up stack */}
          <div className="grid gap-4 sm:grid-cols-3 lg:hidden">
            <GameCard game={first} priority />
            <GameCard game={second} />
            <GameCard game={third} />
          </div>

          {/* Desktop: layered composition */}
          <div className="relative hidden h-[560px] lg:block">
            {/* Back-left card (slightly behind, rotated) */}
            <div className="absolute left-0 top-12 w-[42%] -rotate-3 opacity-90 transition-transform duration-500 hover:rotate-0 hover:opacity-100">
              <GameCard game={second} />
            </div>
            {/* Back-right card */}
            <div className="absolute right-0 top-20 w-[42%] rotate-3 opacity-90 transition-transform duration-500 hover:rotate-0 hover:opacity-100">
              <GameCard game={third} />
            </div>
            {/* Front-center card (the hero one) */}
            <div className="absolute left-1/2 top-0 w-[60%] -translate-x-1/2 transition-transform duration-500 hover:-translate-y-2">
              <GameCard game={first} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
