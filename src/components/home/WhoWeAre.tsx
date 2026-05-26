import Image from "next/image";
import { studio } from "@/content/site";

/**
 * Who we are — two-column block. Text on the left (eyebrow, headline,
 * body paragraph) with the studio's character + airship Blender scene
 * on the right, in a rounded frame with a subtle accent glow. Mobile
 * stacks the image below the text.
 */
export function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      data-reveal
      className="border-b border-border bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">— Who we are —</p>
            <h2
              id="who-we-are-heading"
              className="font-display text-balance text-4xl uppercase leading-[1.02] tracking-[0.01em] text-text sm:text-5xl md:text-6xl"
            >
              From Finland.{" "}
              <span className="text-accent-warm">Built to leave a mark.</span>
            </h2>
            <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-text-muted sm:text-xl">
              {studio.whoWeAre}
            </p>
          </div>

          {/* Image */}
          <div className="relative lg:col-span-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-accent-warm/15 via-transparent to-accent-cool/15 blur-2xl"
            />
            <div className="group relative overflow-hidden rounded-3xl border border-border-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/home/whoweare.png"
                  alt="JaloGames characters and airship modeled in Blender"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={85}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur">
                <span className="size-1.5 rounded-full bg-accent-warm" />
                Behind the scenes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
