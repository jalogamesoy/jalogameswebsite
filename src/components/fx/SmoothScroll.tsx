"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll mounted at the layout level. Renders no DOM
 * — runs as an effect, hooks into requestAnimationFrame, and tears
 * itself down on unmount.
 *
 * Skips entirely if the user prefers reduced motion. Lenis already
 * checks once at construction time, but we ALSO short-circuit before
 * even instantiating to keep memory clean for accessibility users.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Easing tuned to feel quick at the start and settle gently —
      // gives weight without feeling sluggish on long-page scrolls.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // wheelMultiplier slightly below 1 keeps the buttery feel without
      // making short flicks feel under-responsive.
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
