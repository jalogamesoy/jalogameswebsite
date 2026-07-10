export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-28 md:px-10"
    >
      {/* Eyebrow */}
      <div
        className="hero-fade flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.38em] text-ivory/55"
        data-f="1"
      >
        <span className="h-px w-12 bg-gold/70" aria-hidden />
        <span>Independent game studio — Helsinki, Finland</span>
      </div>

      {/* The wordmark */}
      <div className="relative z-[2] my-auto py-10" data-speed="0.08">
        <h1 className="font-serif uppercase leading-[0.82] text-ivory">
          <span className="hl-mask">
            <span className="hl text-[clamp(5rem,21vw,22rem)] tracking-[-0.015em]">
              Jalo
            </span>
          </span>
          <span className="hl-mask pl-[8vw]">
            <span
              className="hl italic text-[clamp(5rem,21vw,22rem)] tracking-[-0.015em]"
              data-d="1"
            >
              Games
            </span>
          </span>
        </h1>

        <p
          className="hero-fade mt-10 ml-auto max-w-md text-right font-serif italic text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug text-ivory/60 md:mt-6"
          data-f="2"
        >
          We don&rsquo;t follow the industry —<br />
          we outbuild it.
        </p>
      </div>

      {/* Bottom strip */}
      <div
        className="hero-fade flex items-end justify-between pb-9 font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/45"
        data-f="3"
      >
        <span>Est. MMXXIV — Founder-led</span>
        <span className="hidden sm:inline">60.1699° N&ensp;/&ensp;24.9384° E</span>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-fade absolute bottom-24 left-1/2 -translate-x-1/2"
        data-f="3"
        aria-hidden
      >
        <div className="scroll-cue" />
      </div>
    </section>
  );
}
