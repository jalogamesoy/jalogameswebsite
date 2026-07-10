import Image from "next/image";
import founder from "../../public/founder.jpg";
import { LINKS } from "@/lib/site";

export function Founder() {
  return (
    <section className="border-y border-sand-deep/40 bg-sand/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div data-reveal>
          <Image
            src={founder}
            alt="Jalo Tuomi, founder of Jalo Games"
            className="mx-auto h-24 w-24 rounded-full border-2 border-white object-cover shadow-[0_14px_30px_-12px_rgba(51,40,26,0.4)]"
            sizes="96px"
          />
        </div>

        <blockquote
          data-reveal
          style={{ "--d": 1 } as React.CSSProperties}
          className="mt-9 font-serif text-[clamp(1.5rem,3.4vw,2.3rem)] font-medium italic leading-snug text-umber"
        >
          &ldquo;I grew up on games and grew into faith. Jalo Games is
          where the two stop being separate.&rdquo;
        </blockquote>

        <div
          data-reveal
          style={{ "--d": 2 } as React.CSSProperties}
          className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-umber/55"
        >
          Jalo Tuomi — Founder&ensp;·&ensp;
          <a
            href={LINKS.founderLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="sweep pb-0.5 text-umber/80 hover:text-umber"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
