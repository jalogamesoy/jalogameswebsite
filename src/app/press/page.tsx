import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getGamesInOrder } from "@/content/games";
import { founder, press, studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Press kit",
  description: `Press resources for ${studio.name} — fact sheet, founder bio, brand assets, game screenshots, and quotable lines.`,
  alternates: { canonical: "/press" },
};

export default function PressKitPage() {
  const games = getGamesInOrder();

  return (
    <>
      <PageHeader
        eyebrow="— Press kit —"
        title="Press resources."
        description="Fact sheet, founder bio, brand assets, game screenshots. Use freely for editorial coverage with credit; write us for anything larger."
      />

      {/* Summary + receipts strip */}
      <section
        data-reveal
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— About in one paragraph —</p>
          <p className="max-w-3xl text-balance text-lg leading-relaxed text-text sm:text-xl">
            {press.summary}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {press.receipts.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border border-border bg-bg p-4"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent-warm"
                />
                <span className="text-sm leading-relaxed text-text-muted sm:text-base">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fact sheet */}
      <section
        data-reveal
        aria-labelledby="facts-heading"
        className="border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— Fact sheet —</p>
          <h2 id="facts-heading" className="sr-only">
            Studio fact sheet
          </h2>
          <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {press.facts.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-4 p-5 sm:grid-cols-4"
              >
                <dt className="font-display text-xs uppercase tracking-[0.18em] text-text-dim sm:col-span-1">
                  {row.label}
                </dt>
                <dd className="col-span-2 text-sm text-text sm:col-span-3 sm:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quotable lines */}
      <section
        data-reveal
        aria-labelledby="quotables-heading"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— Quotable lines —</p>
          <h2 id="quotables-heading" className="sr-only">
            Lines you can lift verbatim
          </h2>
          <ul className="space-y-4">
            {press.quotables.map((q) => (
              <li
                key={q}
                className="rounded-2xl border border-border bg-bg px-6 py-5"
              >
                <p className="font-display text-lg uppercase leading-snug tracking-[0.02em] text-text sm:text-xl">
                  &ldquo;{q}&rdquo;
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-text-dim">
            Attribution: &ldquo;… — Jalo Tuomi, Founder &amp; CEO,
            JaloGames&rdquo;
          </p>
        </div>
      </section>

      {/* Founder block */}
      <section
        data-reveal
        aria-labelledby="founder-heading"
        className="border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— Founder —</p>
          <h2 id="founder-heading" className="sr-only">
            Founder bio
          </h2>
          <div className="grid items-center gap-8 sm:grid-cols-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-strong">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="sm:col-span-2">
              <p className="font-display text-2xl uppercase tracking-[0.02em] text-text sm:text-3xl">
                {founder.name}
              </p>
              <p className="mt-1 font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
                {founder.role} · {studio.name}
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-muted">
                {founder.pitch}
              </p>
              <p className="mt-4 text-sm text-text-muted">
                From age 7 Minecraft servers → self-taught Python &amp;
                Pygame → Kouvola (Finland&apos;s most-played Fortnite Creative
                map, millions of plays) → JaloGames the studio. Full story{" "}
                <Link
                  href="/journal/built-on-a-minecraft-server"
                  className="text-accent-warm hover:underline"
                >
                  on the journal
                </Link>
                .
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-dim">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:text-accent-warm"
                >
                  LinkedIn ↗
                </a>
                {"   ·   "}
                <a
                  href={`mailto:${studio.email}`}
                  className="text-text hover:text-accent-warm"
                >
                  {studio.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section
        data-reveal
        aria-labelledby="assets-heading"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— Brand assets —</p>
          <h2 id="assets-heading" className="sr-only">
            Downloadable brand assets
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {press.assets.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  download
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-5 transition-colors hover:border-accent-warm"
                >
                  <div>
                    <p className="text-sm text-text">{a.label}</p>
                    <p className="mt-1 font-display text-xs uppercase tracking-[0.18em] text-text-dim">
                      {a.mime}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="font-display text-xs uppercase tracking-[0.18em] text-accent-warm transition-transform group-hover:translate-x-1"
                  >
                    Download →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-12 mb-4">— Colour palette —</p>
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {press.palette.map((c) => (
              <li
                key={c.hex}
                className="overflow-hidden rounded-xl border border-border bg-bg"
              >
                <div
                  aria-hidden
                  className="h-16 w-full"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-3">
                  <p className="text-xs text-text">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-text-muted">
                    {c.hex}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Games */}
      <section
        data-reveal
        aria-labelledby="games-press-heading"
        className="border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-6">— Games —</p>
          <h2 id="games-press-heading" className="sr-only">
            Per-game fact sheets
          </h2>
          <ul className="space-y-6">
            {games.map((g) => (
              <li
                key={g.slug}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                    <Image
                      src={g.cardImage ?? g.screenshots[0]}
                      alt={`${g.title} key art`}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 sm:col-span-2 sm:p-6">
                    <p className="font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
                      {g.subtitle} · {g.releaseWindow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-text sm:text-3xl">
                      {g.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {g.pitch}
                    </p>
                    <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                      <div>
                        <dt className="font-display uppercase tracking-[0.18em] text-text-dim">
                          Platforms
                        </dt>
                        <dd className="mt-1 text-text">
                          {g.platforms.join(" · ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-display uppercase tracking-[0.18em] text-text-dim">
                          Detail page
                        </dt>
                        <dd className="mt-1">
                          <Link
                            href={`/games/${g.slug}`}
                            className="text-accent-warm hover:underline"
                          >
                            jalogames.fi/games/{g.slug}
                          </Link>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-text-dim">
                      Screenshots: {g.screenshots.length} available on the
                      detail page
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Usage + contact */}
      <section
        data-reveal
        className="bg-bg"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-4">— Usage —</p>
          <p className="text-sm leading-relaxed text-text-muted">
            {press.usage}
          </p>
          <p className="mt-10 text-sm text-text">
            Press inquiries:{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
