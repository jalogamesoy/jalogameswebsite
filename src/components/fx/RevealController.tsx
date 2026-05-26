"use client";

import { useEffect } from "react";

/**
 * Single page-wide controller that scroll-reveals any element tagged
 * with `data-reveal` (and its children tagged `data-reveal-child` for
 * staggered children, if used).
 *
 * One IntersectionObserver instance covers the whole page — cheaper
 * than wrapping every section in its own client component. The actual
 * animation lives in globals.css.
 *
 * No-op for users with prefers-reduced-motion; elements are revealed
 * immediately so nothing stays invisible.
 */
export function RevealController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      // Show everything immediately; no animation.
      for (const el of targets) {
        el.setAttribute("data-revealed", "true");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // Trigger slightly before fully in view — feels snappier than
        // waiting until the section is centered.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      }
    );

    for (const el of targets) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
