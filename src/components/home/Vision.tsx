import { vision } from "@/content/site";

/**
 * Vision / manifesto block — the studio's belief system. Centered
 * layout for the manifesto feel; raised surface so it reads as a
 * distinct chapter from the introduction above.
 */
export function Vision() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="relative isolate overflow-hidden border-b border-border bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
        <p className="eyebrow mb-6">{vision.eyebrow}</p>
        <h2
          id="vision-heading"
          className="font-display text-balance text-4xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-5xl md:text-6xl"
        >
          {vision.headline}
        </h2>
        <div className="mx-auto mt-10 max-w-2xl space-y-6 text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
          {vision.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
