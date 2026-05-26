import Link from "next/link";
import { ctaStrip } from "@/content/site";

/**
 * Final CTA strip before the footer. The last visible conversion point
 * — pitched as an open invitation rather than a hard sell. Subtle
 * accent gradient lifts it out of the bg without feeling like an ad.
 */
export function CtaStrip() {
  return (
    <section
      aria-labelledby="cta-strip-heading"
      className="relative isolate overflow-hidden border-b border-border bg-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/[0.1] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
        <p className="eyebrow mb-4">{ctaStrip.eyebrow}</p>
        <h2
          id="cta-strip-heading"
          className="font-display text-balance text-4xl font-extrabold uppercase leading-[1.02] tracking-[0.01em] text-text sm:text-5xl md:text-6xl"
        >
          {ctaStrip.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-text-muted sm:text-lg">
          {ctaStrip.body}
        </p>
        <Link
          href={ctaStrip.cta.href}
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-accent-warm px-10 font-display text-base font-semibold uppercase tracking-[0.18em] text-bg transition hover:bg-text"
        >
          {ctaStrip.cta.label}
          <span aria-hidden className="ml-3">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
