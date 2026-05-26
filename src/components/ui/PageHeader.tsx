/**
 * Shared header pattern used at the top of subpages. Eyebrow + big
 * Fraunces title + supporting paragraph, on the dark navy with a
 * soft accent glow behind it.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent-warm/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="font-display text-balance text-5xl font-medium leading-[1.05] text-text sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
