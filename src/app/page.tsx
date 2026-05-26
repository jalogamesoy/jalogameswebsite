import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { Vision } from "@/components/home/Vision";
import { BuiltWith } from "@/components/home/BuiltWith";
import { GamesSection } from "@/components/home/GamesSection";
import { Process } from "@/components/home/Process";
import { ClosingKicker } from "@/components/home/ClosingKicker";
import { CtaStrip } from "@/components/home/CtaStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhoWeAre />
      <Vision />
      <BuiltWith />
      <GamesSection />
      <Process />
      <ClosingKicker />
      <CtaStrip />
    </>
  );
}
