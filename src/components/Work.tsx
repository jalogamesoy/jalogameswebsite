import { Label } from "@/components/Label";

export function Work() {
  return (
    <section className="px-6 py-36 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label n="02" title="Now Building" />
        </div>

        <div className="md:col-span-9">
          <div data-reveal className="border-y border-hairline py-10 md:py-14">
            <div className="flex items-baseline gap-6 font-mono text-[10px] uppercase tracking-[0.34em] text-ivory/45">
              <span className="whitespace-nowrap text-gold">№&nbsp;01</span>
              <span>Premium Endless Runner</span>
            </div>

            <h2
              data-reveal
              className="hollow mt-6 font-serif uppercase leading-[0.9] tracking-[-0.01em] text-[clamp(3.8rem,13.5vw,14rem)]"
            >
              Grace Run
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/55">
              <span>Mobile — iOS / Android</span>
              <span className="flex items-center gap-3">
                <span className="dot" aria-hidden />
                In development
              </span>
            </div>
          </div>

          <p
            data-reveal
            className="mt-12 font-serif italic text-[clamp(1.2rem,2vw,1.7rem)] text-ivory/55"
          >
            The rest, we build in silence.
          </p>
        </div>
      </div>
    </section>
  );
}
