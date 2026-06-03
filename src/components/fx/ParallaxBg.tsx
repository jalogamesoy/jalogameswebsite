"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Background layer with scroll-driven parallax. Place inside a
 * position: relative parent (a section); this renders an absolute-
 * positioned div extending 15% above and below the parent so the
 * parallax translate has room to move without revealing edges.
 *
 * Speed is the parallax factor:
 *   1.0 = scrolls with content (no parallax)
 *   0.5 = scrolls at half speed — "further away" feel
 *   0.0 = perfectly fixed (max parallax)
 *
 * Reduced-motion users get a static background.
 */
export function ParallaxBg({
  speed = 0.55,
  children,
}: {
  speed?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let rafId = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = ref.current;
      const parent = el?.parentElement;
      if (el && parent) {
        const rect = parent.getBoundingClientRect();
        // Counteract some of the section's scroll movement so the bg
        // appears to lag — the "further away" sensation.
        const offset = -rect.top * (1 - speed);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };
    // Drive off scroll/resize, coalesced to one update per frame — instead
    // of a perpetual rAF that read layout (getBoundingClientRect) EVERY
    // frame even while idle. With multiple parallax sections that was N
    // forced reflows per frame, always. Now it only works while scrolling.
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };
    update(); // set initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-x-0 -top-[15%] -bottom-[15%] will-change-transform"
    >
      {children}
    </div>
  );
}
