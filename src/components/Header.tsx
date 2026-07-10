import { HelsinkiClock } from "@/components/HelsinkiClock";

/** The gate mark — two posts, a seam of light between. */
function GateGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="2" width="7" height="20" fill="currentColor" />
      <rect x="14" y="2" width="7" height="20" fill="currentColor" />
      <rect x="11.25" y="2" width="1.5" height="20" fill="#A98443" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] bg-gradient-to-b from-bone via-bone/85 to-transparent">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-center gap-2.5 text-umber">
          <GateGlyph />
          <span className="font-serif text-[19px] font-medium tracking-wide">
            Jalo Games
          </span>
        </a>

        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-umber/50 tabular-nums sm:inline">
            Helsinki&ensp;
            <HelsinkiClock />
          </span>
          <a
            href="#contact"
            className="rounded-full border border-umber/20 bg-white/50 px-4.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-umber transition-colors duration-300 hover:bg-umber hover:text-bone"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
