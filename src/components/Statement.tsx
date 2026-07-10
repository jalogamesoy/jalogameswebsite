import { Label } from "@/components/Label";

const STATS: Array<{ value: React.ReactNode; caption: string }> = [
  { value: "12M+", caption: "Minutes played · published work" },
  { value: "№ 1", caption: "Creative experience in Finland" },
  { value: "MMXXIV", caption: "Founded · Helsinki" },
];

export function Statement() {
  return (
    <section className="px-6 py-36 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label n="01" title="The Studio" />
        </div>

        <div className="md:col-span-9">
          <p
            data-reveal
            className="font-serif text-[clamp(1.8rem,3.4vw,3.4rem)] leading-[1.22] text-ivory/95"
          >
            Jalo Games is an independent game studio in Helsinki —
            founder&#8209;led, and original by principle. We take{" "}
            <em className="italic text-gold">the narrow road</em>: fewer
            games, built better, made to last.
          </p>

          <div className="mt-24 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-3 sm:gap-6">
            {STATS.map((s, i) => (
              <div key={s.caption} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <div className="font-serif text-[clamp(2.6rem,4.6vw,4.4rem)] leading-none text-ivory">
                  {s.value}
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/45">
                  {s.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
