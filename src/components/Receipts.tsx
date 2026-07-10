const STATS = [
  { value: "12M+", caption: "Minutes played · published work" },
  { value: "№ 1", caption: "Creative experience in Finland" },
  { value: "2024", caption: "Founded · Helsinki" },
];

export function Receipts() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-4xl gap-10 text-center sm:grid-cols-3 sm:gap-6">
        {STATS.map((s, i) => (
          <div
            key={s.caption}
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
          >
            <div className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-medium leading-none text-umber">
              {s.value}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-umber/50">
              {s.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
