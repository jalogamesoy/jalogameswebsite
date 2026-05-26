import Link from "next/link";
import { hero } from "@/content/site";

/**
 * Hero v0 — typographic only. Parallax world scene lands in Phase 2B
 * via a layered <ParallaxScene /> sitting behind this content.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Atmospheric background blobs — kept subtle so they read as
          texture, not decoration. Replaced by the parallax scene in 2B. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-accent-warm/15 blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full bg-accent-cool/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[480px] w-[480px] rounded-full bg-accent-warm/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="eyebrow mb-6">{hero.eyebrow}</p>

        <h1
          id="hero-heading"
          className="font-display max-w-4xl whitespace-pre-line text-balance text-5xl font-medium leading-[1.02] text-text sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {hero.headline}
        </h1>

        <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
          {hero.sub}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-text px-7 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-warm hover:text-bg"
          >
            {hero.primaryCta.label}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong px-7 text-sm font-semibold uppercase tracking-[0.14em] text-text transition hover:border-accent-warm hover:text-accent-warm"
          >
            {hero.secondaryCta.label}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
