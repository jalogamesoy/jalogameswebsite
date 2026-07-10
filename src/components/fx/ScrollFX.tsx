"use client";

import { useEffect } from "react";

/**
 * Lightweight scroll effects — nothing per-frame, nothing that forces
 * layout on scroll:
 *  - [data-reveal] → gains .in when it enters the viewport (once, IO)
 *  - .progress    → gold thread scaleX, updated at most once per frame
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
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
