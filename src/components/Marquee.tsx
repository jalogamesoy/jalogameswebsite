const ITEMS = [
  "Faith-rooted",
  "Premium craft",
  "Mobile-first",
  "Founder-led",
  "Helsinki, Finland",
];

function Track() {
  return (
    <div className="marquee-track">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-serif italic text-[clamp(1.05rem,1.7vw,1.5rem)] text-umber/55"
        >
          <span className="px-10">{item}</span>
          <span className="text-[0.6em] not-italic text-gold" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="marquee border-y border-sand-deep/50 bg-sand/45 py-4"
      aria-hidden="true"
    >
      <Track />
      <Track />
      <Track />
    </div>
  );
}
