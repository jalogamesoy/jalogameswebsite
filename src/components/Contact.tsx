import { COMPANY, EMAIL, LINKS } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="px-6 pb-10 pt-24 md:pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <p
          data-reveal
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold"
        >
          Contact
        </p>

        <h2
          data-reveal
          className="mt-5 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-umber"
        >
          Begin the <em className="italic text-gold">conversation</em>.
        </h2>

        <p
          data-reveal
          style={{ "--d": 1 } as React.CSSProperties}
          className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-umber/60"
        >
          Publishers, partners, press — or a congregation with an idea.
          We read every thoughtful message.
        </p>

        <div data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <a
            href={`mailto:${EMAIL}`}
            className="sweep mt-10 inline-block max-w-full break-words font-serif text-[clamp(1.8rem,5.5vw,3.8rem)] font-medium leading-tight text-umber"
          >
            {EMAIL}
          </a>
        </div>

        <div
          data-reveal
          style={{ "--d": 3 } as React.CSSProperties}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-flame px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(214,95,51,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Email us
          </a>
          <a
            href={LINKS.companyLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-umber/20 bg-white/50 px-7 py-3.5 text-[15px] font-medium text-umber transition-colors duration-300 hover:bg-umber hover:text-bone"
          >
            LinkedIn ↗
          </a>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-sand-deep/50 py-7 font-mono text-[9px] uppercase tracking-[0.26em] text-umber/40">
          <span>© MMXXVI {COMPANY}</span>
          <span>Helsinki, Finland</span>
          <span>Soli Deo Gloria</span>
          <span className="text-gold">Mt 7 : 14</span>
        </footer>
      </div>
    </section>
  );
}
