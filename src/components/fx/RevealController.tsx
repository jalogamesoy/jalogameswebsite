"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Single page-wide controller that scroll-reveals any element tagged
 * with `data-reveal` as it enters the viewport.
 *
 * Re-runs on every route change via the pathname dependency, because
 * client-side navigation swaps in new sections without unmounting
 * <RevealController /> (it lives in the root layout). Without that
 * dependency, the new page's sections would render with `data-reveal`
 * but never get a `data-revealed` attribute set, leaving them stuck
 * at opacity 0.
 *
 * Reduced-motion users get every element revealed immediately.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Defer one frame so the new route's DOM is committed before we
    // scan. Without this, navigating away and back can race the
    // querySelectorAll against React's render cycle.
    const id = requestAnimationFrame(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]")
      );

      if (reducedMotion) {
        for (const el of targets) el.setAttribute("data-revealed", "true");
        return;
      }

      // If a target is already in view on mount (e.g. above the fold
      // after a route change), reveal it immediately rather than
      // waiting for a scroll event to fire the observer.
      const reveal = (el: Element) => el.setAttribute("data-revealed", "true");

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
          }
        },
        {
          // Trigger slightly before fully in view — feels snappier.
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.05,
        }
      );

      for (const el of targets) {
        // If already in viewport at this moment, skip the observer
        // entirely; otherwise we'd see a flash of invisible content
        // on routes where data-reveal sections start above the fold.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(el);
        } else {
          observer.observe(el);
        }
      }

      return observer;
    });

    return () => {
      cancelAnimationFrame(id);
      // The observer (if it was created) is GC'd with the closure when
      // the next pathname change tears down this effect — by then we
      // already have a fresh one for the new route.
    };
  }, [pathname]);

  return null;
}
