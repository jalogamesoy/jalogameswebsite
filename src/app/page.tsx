import { Contact } from "@/components/Contact";
import { Ethos } from "@/components/Ethos";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Marquee } from "@/components/Marquee";
import { Statement } from "@/components/Statement";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Marquee />
      <Statement />
      <Work />
      <Ethos />
      <Contact />
    </>
  );
}
