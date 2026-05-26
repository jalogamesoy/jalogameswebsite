import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaStrip } from "@/components/home/CtaStrip";
import {
  craft,
  founder,
  principles,
  studio,
  studioStats,
  vision,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description: `${studio.name} is a next-generation game studio from Finland building original games, browser experiences, mobile titles, and immersive Fortnite worlds.`,
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="— The studio —"
        title="Built for the next era of games."
        description={studio.whoWeAre}
      />

      {/* About + founder inline */}
      <section
        data-reveal
        aria-labelledby="about-heading"
        className="border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">— Who runs the show —</p>
              <h2
                id="about-heading"
                className="font-display text-balance text-3xl uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
              >
                A small studio from Finland.{" "}
                <span className="text-accent-warm">
                  Built to outpunch its weight.
                </span>
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                {studio.name} was founded in {studio.foundingYear} in{" "}
                {studio.location} by {founder.name}. We build original IP and
                branded experiences with the speed of modern tools and the
                polish of studios ten times our size — and we ship.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                {founder.pitch}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-5 font-display text-xs uppercase tracking-[0.18em] text-text transition hover:border-accent-warm hover:text-accent-warm"
                >
                  {founder.name} on LinkedIn
                  <span aria-hidden className="ml-2">
                    ↗
                  </span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-text px-5 font-display text-xs uppercase tracking-[0.18em] text-bg transition hover:bg-accent-warm"
                >
                  Get in touch
                  <span aria-hidden className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Founder portrait — same visual language as the home cards */}
            <div className="lg:col-span-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-accent-warm/10 via-transparent to-accent-cool/10 blur-2xl"
              />
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
              >
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of ${studio.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={88}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-accent-warm"
                  />
                  {founder.role}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-text drop-shadow-md">
                      {founder.name}
                    </h3>
                    <p className="mt-1 font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
                      LinkedIn ↗
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent-warm text-accent-warm transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        data-reveal
        aria-label="JaloGames track record"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-10 text-center">— The receipts —</p>
          <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {studioStats.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="font-display text-5xl uppercase leading-none tracking-[0.01em] text-accent-warm sm:text-6xl md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-text-muted">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Craft showcase */}
      <section
        data-reveal
        aria-labelledby="craft-heading"
        className="border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="eyebrow mb-3">— From concept to ship —</p>
              <h2
                id="craft-heading"
                className="font-display text-balance text-3xl uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
              >
                How we actually build the games.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                Every JaloGames title is built end-to-end in-house. No
                outsourced character mills, no template engines. The work
                below is from our own pipeline, screenshotted as it was made.
              </p>
              {/* Tech stack chips */}
              <div className="mt-8 flex flex-col gap-3">
                <p className="eyebrow">Built with</p>
                <ul className="flex flex-wrap gap-2">
                  {vision.techStack.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg/40 px-4 py-1.5 font-display text-xs uppercase tracking-[0.14em] text-text backdrop-blur"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-accent-warm"
                      />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="grid gap-6 md:col-span-7 sm:grid-cols-2 lg:grid-cols-3">
              {craft.map((item, i) => (
                <li
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur">
                      <span className="font-display text-text-dim">
                        0{i + 1}
                      </span>
                      <span>{item.title}</span>
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.caption}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section
        data-reveal
        aria-labelledby="principles-heading"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">— How we operate —</p>
            <h2
              id="principles-heading"
              className="font-display text-balance text-3xl uppercase leading-[1.05] tracking-[0.01em] text-text sm:text-4xl md:text-5xl"
            >
              Principles, not slogans.
            </h2>
          </div>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[10px] uppercase tracking-[0.24em] text-text-dim">
                    0{i + 1}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-4 font-display text-xl uppercase tracking-[0.02em] text-text sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
