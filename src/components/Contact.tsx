import { Label } from "@/components/Label";
import { COMPANY, EMAIL, LINKS } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="px-6 pt-36 pb-10 md:px-10 md:pt-48">
      <div className="mx-auto max-w-[1500px]">
        <Label n="04" title="Contact" />

        <h2
          data-reveal
          className="mt-14 font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-ivory"
        >
          Begin the <em className="italic text-gold">conversation</em>.
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          data-reveal
          data-hover
          className="sweep mt-12 inline-block max-w-full break-words font-serif text-[clamp(1.6rem,6.8vw,6.4rem)] leading-tight tracking-[-0.01em] text-ivory"
          style={{ "--d": 1 } as React.CSSProperties}
        >
          {EMAIL}
        </a>

        <div
          data-reveal
          style={{ "--d": 2 } as React.CSSProperties}
          className="mt-20 flex flex-wrap gap-x-12 gap-y-5 font-mono text-[10px] uppercase tracking-[0.34em] text-ivory/60"
        >
          <a
            href={LINKS.companyLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="sweep pb-1 hover:text-ivory"
          >
            LinkedIn&ensp;↗
          </a>
          <a
            href={LINKS.founderLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="sweep pb-1 hover:text-ivory"
          >
            Founder&ensp;↗
          </a>
        </div>

        <footer className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-hairline py-7 font-mono text-[9px] uppercase tracking-[0.3em] text-ivory/35">
          <span>© MMXXVI {COMPANY}</span>
          <span>Helsinki, Finland</span>
          <span className="text-gold/70">Mt 7 : 14</span>
        </footer>
      </div>
    </section>
  );
}
