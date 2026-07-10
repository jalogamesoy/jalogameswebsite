/** What the studio stands on — the page's clearest statement of identity. */

function CrossGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M6 9h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GateGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="3" width="6" height="18" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="6" height="18" rx="1" fill="currentColor" />
      <rect x="11.3" y="3" width="1.4" height="18" fill="#A98443" />
    </svg>
  );
}

function FishGlyph() {
  return (
    <svg width="30" height="26" viewBox="0 0 28 24" fill="none" aria-hidden>
      <path
        d="M2 12c4.5-6.5 11-6.5 15.5 0C13 18.5 6.5 18.5 2 12Zm15.5 0L24 5.5M17.5 12 24 18.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PILLARS = [
  {
    glyph: <CrossGlyph />,
    title: "Scripture at the core",
    body: "Every world we build begins in the Word — not as decoration, but as the foundation the story stands on.",
  },
  {
    glyph: <GateGlyph />,
    title: "Premium, honest craft",
    body: "No manipulative ads, no dark patterns. Polished, finished games that are worth paying for — and worth your time.",
  },
  {
    glyph: <FishGlyph />,
    title: "Play you can share",
    body: "Made for families, youth groups and congregations — joyful games you can hand to anyone without a second thought.",
  },
];

export function Pillars() {
  return (
    <section className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p
            data-reveal
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold"
          >
            What we build on
          </p>
          <h2
            data-reveal
            className="mt-5 font-serif text-[clamp(2.3rem,5.5vw,4rem)] font-medium leading-[1.05] text-umber"
          >
            Built on <em className="italic text-gold">the Rock</em>.
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-umber/60"
          >
            Three promises, kept in every title that carries our name.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
              className="rounded-[28px] border border-sand-deep/60 bg-white/55 p-9 text-center transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(51,40,26,0.35)]"
            >
              {/* Arch window — the gate motif, opened */}
              <div className="mx-auto flex h-20 w-14 items-end justify-center rounded-t-full border border-sand-deep/70 bg-gradient-to-b from-sand/70 to-white/40 pb-3 text-umber/80">
                {p.glyph}
              </div>
              <h3 className="mt-6 font-serif text-[26px] font-medium text-umber">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-umber/60">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
