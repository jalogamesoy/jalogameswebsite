const ITEMS = [
  "Original Worlds",
  "Premium Craft",
  "Founder-led",
  "Helsinki, Finland",
  "Built to Last",
];

function Track() {
  return (
    <div className="marquee-track">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-serif italic text-[clamp(1.1rem,1.8vw,1.6rem)] text-ivory/70"
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
      className="marquee border-y border-hairline py-5"
      aria-hidden="true"
      data-reveal
    >
      <Track />
      <Track />
      <Track />
    </div>
  );
}
