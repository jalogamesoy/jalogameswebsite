import Image from "next/image";
import cardArt from "../../public/grace-run/card.png";

export function Work() {
  return (
    <section id="grace-run" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[36px] border border-sand-deep/60"
          style={{
            background:
              "linear-gradient(165deg, #f7eedd 0%, #f1e2c6 55%, #ecd3ab 100%)",
          }}
        >
          {/* Warm flame glow rising from the chasm */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
            style={{
              background:
                "radial-gradient(80% 70% at 50% 110%, rgba(214,95,51,0.22), rgba(214,95,51,0) 65%)",
            }}
          />

          <div className="relative grid items-center gap-10 p-8 md:grid-cols-2 md:gap-14 md:p-14">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-umber/15 bg-white/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-umber/70">
                <span className="dot" aria-hidden />
                Now building
              </div>

              <h2 className="mt-6 font-serif text-[clamp(3rem,7vw,5.4rem)] font-medium leading-none text-umber">
                Grace Run
              </h2>

              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-umber/65">
                A premium endless runner: a robed pilgrim races through
                sand-blasted ruins, past wayside crosses, over a lava
                chasm that does not negotiate. Minimal, graceful — and
                unmistakably about grace.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-umber/60">
                <span className="rounded-full border border-umber/15 bg-white/50 px-3.5 py-1.5">
                  iOS
                </span>
                <span className="rounded-full border border-umber/15 bg-white/50 px-3.5 py-1.5">
                  Android
                </span>
                <span className="rounded-full border border-umber/15 bg-white/50 px-3.5 py-1.5">
                  Premium — no ads
                </span>
              </div>

              <p className="mt-9 font-serif text-[17px] italic text-umber/50">
                The rest, we build in silence.
              </p>
            </div>

            <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <Image
                src={cardArt}
                alt="Grace Run — a robed pilgrim leaping across sand-colored rooftops above a lava chasm, wooden crosses in the distance"
                placeholder="blur"
                sizes="(min-width: 768px) 44vw, 92vw"
                className="h-auto w-full drop-shadow-[0_30px_50px_rgba(51,40,26,0.28)] transition-transform duration-700 hover:scale-[1.02]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
