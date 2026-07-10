import { HelsinkiClock } from "@/components/HelsinkiClock";

/** The gate mark — two posts, a seam of light between. */
function GateGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="2" width="7" height="20" fill="currentColor" />
      <rect x="14" y="2" width="7" height="20" fill="currentColor" />
      <rect x="11.25" y="2" width="1.5" height="20" fill="#C2A15E" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#top"
          data-hover
          className="flex items-center gap-3 text-ivory"
        >
          <GateGlyph />
          <span className="font-mono text-[10px] uppercase tracking-[0.42em]">
            Jalo&nbsp;Games
          </span>
        </a>

        <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/70">
          <span className="hidden tabular-nums sm:inline">
            Helsinki&ensp;
            <HelsinkiClock />
          </span>
          <a href="#contact" data-hover className="sweep pb-1 text-ivory">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
