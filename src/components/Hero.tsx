export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center"
    >
      {/* The light — a halo breaking over the page as the gate opens. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[85vh]"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 0%, rgba(194,161,94,0.22), rgba(251,247,240,0) 70%), radial-gradient(95% 70% at 50% 0%, rgba(255,255,255,0.85), rgba(251,247,240,0) 60%)",
        }}
      />
      {/* The seam continues — a thread of gold falling from the gate. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[19vh] w-px"
        style={{
          background:
            "linear-gradient(to bottom, rgba(169,132,67,0.75), rgba(169,132,67,0))",
        }}
      />

      <div className="relative">
        <div className="hero-fade mb-8 inline-flex items-center gap-3 rounded-full border border-umber/15 bg-white/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-umber/60" data-f="1">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          Helsinki, Finland — est. 2024
        </div>

        <h1 className="font-serif font-medium leading-[1.04] text-umber">
          <span className="hl-mask">
            <span className="hl text-[clamp(3.1rem,9.5vw,7.8rem)]">
              We make <em className="italic text-gold">Christian</em>
            </span>
          </span>
          <span className="hl-mask">
            <span className="hl text-[clamp(3.1rem,9.5vw,7.8rem)]" data-d="1">
              mobile games.
            </span>
          </span>
        </h1>

        <p
          className="hero-fade mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-umber/65 md:text-lg"
          data-f="2"
        >
          A founder-led studio crafting faith-rooted mobile worlds —
          premium play, honest design, and stories that point toward
          the Light.
        </p>

        <div
          className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-3"
          data-f="3"
        >
          <a
            href="#grace-run"
            className="rounded-full bg-flame px-8 py-4 text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(214,95,51,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(214,95,51,0.6)]"
          >
            See Grace Run
          </a>
          <a
            href="#contact"
            className="rounded-full border border-umber/20 bg-white/50 px-8 py-4 text-[15px] font-medium text-umber transition-colors duration-300 hover:bg-umber hover:text-bone"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2"
        data-f="4"
        aria-hidden
      >
        <div className="scroll-cue" />
      </div>
    </section>
  );
}
