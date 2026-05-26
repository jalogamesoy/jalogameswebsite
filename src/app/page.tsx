import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { GamesSection } from "@/components/home/GamesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhoWeAre />
      <GamesSection />
      {/* TODO Phase 2D: <MidStatement />, <Strengths />, <CtaStrip /> */}
    </>
  );
}
