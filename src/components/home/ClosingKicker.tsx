import { kicker } from "@/content/site";

/**
 * Closing kicker — the gut-punch right before the CTA strip. Two
 * declarative lines that act as the studio's signature beliefs about
 * shipping. Big, declarative, asymmetric layout for impact.
 */
export function ClosingKicker() {
  return (
    <section
      aria-label="JaloGames signature beliefs"
      data-reveal
      className="relative isolate overflow-hidden border-b border-border bg-bg"
    >
      <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <p className="mx-auto max-w-2xl text-balance text-center text-lg leading-relaxed text-text-muted sm:text-xl">
          {kicker.body}
        </p>

        <div className="mt-16 space-y-10 text-center sm:space-y-14">
          {kicker.lines.map((line, i) => (
            <p
              key={line}
              className={`font-display text-balance text-3xl font-extrabold uppercase leading-[1.05] tracking-[0.01em] sm:text-4xl md:text-5xl ${
                i === 0 ? "text-text" : "text-accent-warm"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
