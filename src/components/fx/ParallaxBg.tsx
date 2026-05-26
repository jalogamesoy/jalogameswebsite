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
    const update = () => {
      const el = ref.current;
      const parent = el?.parentElement;
      if (el && parent) {
        const rect = parent.getBoundingClientRect();
        // Counteract some of the section's scroll movement so the bg
        // appears to lag — the "further away" sensation.
        const offset = -rect.top * (1 - speed);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
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
