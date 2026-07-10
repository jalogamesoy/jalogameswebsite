import { Contact } from "@/components/Contact";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Marquee } from "@/components/Marquee";
import { Pillars } from "@/components/Pillars";
import { Receipts } from "@/components/Receipts";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Marquee />
      <Pillars />
      <Work />
      <Receipts />
      <Founder />
      <Contact />
    </>
  );
}
