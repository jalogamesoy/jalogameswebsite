import Image from "next/image";
import { founder, studio } from "@/content/site";

/**
 * Founder card on the Contact page. Styled to echo the game cards on
 * the homepage (rounded-3xl portrait, IN-DEVELOPMENT-style pill at the
 * top-left, name + role + arrow over a bottom gradient, accent
 * underline). Photo lives on the left at desktop; text/CTAs on the
 * right. Mobile stacks.
 */
export function FounderCard() {
  return (
    <article className="grid items-stretch gap-6 sm:grid-cols-2">
      {/* Portrait, card-styled */}
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
          sizes="(min-width: 640px) 50vw, 100vw"
          quality={88}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />

        {/* Top-left status pill — mirrors the game cards */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-accent-warm"
          />
          Founder &amp; CEO
        </span>

        {/* Bottom name + arrow over gradient */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-[0.02em] text-text drop-shadow-md sm:text-3xl">
              {founder.name}
            </h2>
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

      {/* Right column — pitch + actions */}
      <div className="flex flex-col justify-center gap-6 rounded-3xl border border-border bg-surface p-8">
        <p className="eyebrow">— Talk to me directly —</p>
        <h3 className="font-display text-3xl uppercase leading-[1.05] tracking-[0.02em] text-text">
          {founder.name}
          <span className="mt-1 block text-base text-accent-warm">
            {founder.role}, {studio.name}
          </span>
        </h3>
        <p className="text-base leading-relaxed text-text-muted">
          {founder.pitch}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${studio.email}?subject=Hello%20Jalo`}
            className="inline-flex h-11 items-center justify-center rounded-full bg-text px-5 font-display text-xs uppercase tracking-[0.18em] text-bg transition hover:bg-accent-warm"
          >
            Email Jalo
            <span aria-hidden className="ml-2">
              →
            </span>
          </a>
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-5 font-display text-xs uppercase tracking-[0.18em] text-text transition hover:border-accent-warm hover:text-accent-warm"
          >
            LinkedIn
            <span aria-hidden className="ml-2">
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
