"use client";

import { useEffect } from "react";

/**
 * One rAF loop for all scroll-coupled effects:
 *  - [data-reveal]  → gains .in when it enters the viewport (once)
 *  - [data-speed]   → gentle parallax drift relative to viewport center
 *  - .progress      → gold thread scaleX across the top
 */
export function ScrollFX() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    let io: IntersectionObserver | null = null;
    if (reduced) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io!.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
      );
      revealEls.forEach((el) => io!.observe(el));
    }

    const bar = document.querySelector<HTMLElement>(".progress");
    const drifters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-speed]")
    );

    let raf = 0;
    const loop = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
      if (!reduced) {
        for (const el of drifters) {
          const speed = parseFloat(el.dataset.speed || "0");
          const r = el.getBoundingClientRect();
          const offset =
            r.top + r.height / 2 - window.innerHeight / 2;
          el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return null;
}
