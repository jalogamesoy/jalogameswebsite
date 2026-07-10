import { Label } from "@/components/Label";

const PRINCIPLES: Array<[string, string]> = [
  ["Craft over noise.", "Every surface finished"],
  ["Fewer, better.", "We ship seldom — on purpose"],
  ["Built to last.", "Worlds, not content"],
];

export function Ethos() {
  return (
    <section className="px-6 py-36 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label n="03" title="The Road" />
        </div>

        <div className="md:col-span-9">
          {PRINCIPLES.map(([line, caption], i) => (
            <div
              key={line}
              data-reveal
              data-hover
              style={{ "--d": i } as React.CSSProperties}
              className="group flex flex-col gap-2 border-t border-hairline py-9 last:border-b md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-11"
            >
              <div className="font-serif italic text-[clamp(2rem,4.8vw,4.2rem)] leading-none text-ivory/90 transition-colors duration-500 group-hover:text-ivory">
                <span
                  aria-hidden
                  className="inline-block h-px w-0 bg-gold align-middle transition-all duration-500 group-hover:mr-6 group-hover:w-12"
                />
                {line}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                {caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
