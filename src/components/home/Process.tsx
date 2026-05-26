import { processIntro, processPillars } from "@/content/site";

/**
 * "How we build" — four-pillar breakdown of the studio's process.
 * Intro block sits asymmetric on the left; pillar cards fill a 2x2
 * grid on desktop, single column on mobile.
 */
export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      data-reveal
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">{processIntro.eyebrow}</p>
            <h2
              id="process-heading"
              className="font-display text-balance text-3xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
            >
              {processIntro.headline}
            </h2>
            <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-text-muted sm:text-lg">
              {processIntro.body}
            </p>
          </div>

          <ul className="grid gap-5 md:col-span-7 sm:grid-cols-2">
            {processPillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className="group relative rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-text-dim">
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-border"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-[0.02em] text-text sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text">
                  {pillar.kicker}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
