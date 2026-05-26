import { builtWith } from "@/content/site";

/**
 * The "Games aren't made. They're built." mid-page declaration.
 * Big, centered, ceremonial — the heart of the homepage. Sits between
 * Vision and the games grid (or wherever the rhythm needs a pause).
 */
export function BuiltWith() {
  return (
    <section
      aria-labelledby="built-with-heading"
      data-reveal
      className="relative isolate overflow-hidden border-b border-border bg-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent-warm/[0.08] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
        <h2
          id="built-with-heading"
          className="font-display whitespace-pre-line text-balance text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.01em] text-text sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {builtWith.headline}
        </h2>

        <ul className="mt-16 space-y-4 sm:space-y-6">
          {builtWith.lines.map((line, i) => (
            <li
              key={line}
              className="font-display text-2xl font-semibold uppercase tracking-[0.06em] text-text-muted sm:text-3xl md:text-4xl"
            >
              <span className="text-accent-warm">{line.split(" ")[0]}</span>{" "}
              {line.split(" ").slice(1).join(" ")}
              {i < builtWith.lines.length - 1 ? (
                <span
                  aria-hidden
                  className="mt-4 mx-auto block h-px w-12 bg-border"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
