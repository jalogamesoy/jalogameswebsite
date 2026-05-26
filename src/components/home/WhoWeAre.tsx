import { studio } from "@/content/site";

/**
 * "Who we are" — the studio's introduction. Sits after the marquee.
 * Asymmetric grid so the headline gets dominant visual weight while
 * the supporting paragraph reads at a comfortable measure.
 */
export function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      className="border-b border-border bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow">— Who we are —</p>
          </div>
          <div className="md:col-span-8">
            <h2
              id="who-we-are-heading"
              className="font-display text-balance text-3xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
            >
              From Finland.{" "}
              <span className="text-accent-warm">Built to leave a mark.</span>
            </h2>
            <p className="mt-8 max-w-3xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
              {studio.whoWeAre}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
