"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scroll mounted once at the layout level. Runs as an
 * effect, hooks into requestAnimationFrame, and tears itself down on
 * unmount.
 *
 * Importantly, Lenis caches the scrollable area at boot and during
 * window resize events — but a client-side route change in Next.js
 * doesn't fire a resize, so navigating from a long page (homepage)
 * to a shorter one and back leaves Lenis convinced the page is
 * still short. The page then refuses to scroll past the old max.
 *
 * The second effect below subscribes to pathname changes and calls
 * lenis.resize() on the next frame (after React commits the new DOM)
 * so Lenis re-measures.
 *
 * Skips entirely on prefers-reduced-motion.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Force Lenis to recalculate scrollable height on every route change.
  // Without this, navigating /games (short) → / (tall) traps scroll at
  // the games-page max because Lenis hasn't noticed the body got taller.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef.current?.resize();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
