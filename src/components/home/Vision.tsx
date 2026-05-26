import Image from "next/image";
import { vision } from "@/content/site";

/**
 * Vision / manifesto — two-column block. Code/tool screenshot on the
 * left (visual proof of the "use the best tools in the world" claim),
 * text on the right (eyebrow, headline, two-paragraph manifesto).
 * Mobile stacks the image above the text.
 */
export function Vision() {
  return (
    <section
      aria-labelledby="vision-heading"
      data-reveal
      className="relative isolate overflow-hidden border-b border-border bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-1/3 top-1/2 h-[500px] w-[900px] -translate-y-1/2 rounded-full bg-accent-warm/[0.05] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image — first in DOM so mobile stacks image-on-top */}
          <div className="relative order-first lg:order-first lg:col-span-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-accent-cool/15 via-transparent to-accent-warm/15 blur-2xl"
            />
            <div className="group relative overflow-hidden rounded-3xl border border-border-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/home/vision-code.png"
                  alt="Unreal Engine blueprint editor showing JaloGames movement, HUD, and menu systems"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={85}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur">
                <span className="size-1.5 rounded-full bg-accent-cool" />
                In the engine
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">{vision.eyebrow}</p>
            <h2
              id="vision-heading"
              className="font-display text-balance text-4xl uppercase leading-[1.02] tracking-[0.01em] text-text sm:text-5xl md:text-6xl"
            >
              {vision.headline}
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
              {vision.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
