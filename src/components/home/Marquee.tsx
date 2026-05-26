import { mantras } from "@/content/site";

/**
 * Infinite horizontal scroll of studio mantras between the hero and the
 * Who We Are block. CSS-only — no JS — and pausable via reduced-motion.
 * The track is duplicated so the loop reads seamless.
 */
export function Marquee() {
  // Duplicate the array so the CSS translate -50% reads as a perfect loop.
  const items = [...mantras, ...mantras];

  return (
    <section
      aria-label="JaloGames principles"
      className="relative overflow-hidden border-y border-border bg-bg py-6"
    >
      <div className="marquee-track flex w-max items-center gap-12 sm:gap-16">
        {items.map((mantra, i) => (
          <div
            key={`${mantra}-${i}`}
            className="flex items-center gap-12 sm:gap-16"
          >
            <span className="font-display text-base font-semibold uppercase tracking-[0.24em] text-text sm:text-lg">
              {mantra}
            </span>
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-accent-warm"
            />
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: jg-marquee 38s linear infinite;
          will-change: transform;
        }
        @keyframes jg-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
