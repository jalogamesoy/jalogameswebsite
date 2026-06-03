"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — a camera-style FOCUS RETICLE: a square frame broken at
 * each edge midpoint, crosshair ticks crossing those midpoints, and a
 * small centre square. Rendered in the brand amber. Tracks the pointer
 * crisply (tight, frame-rate-independent follow) and "locks on" (scales
 * up, full opacity) over interactive elements.
 *
 * Hidden on touch devices and prefers-reduced-motion. pointer-events:none
 * so it never blocks clicks; non-JS visitors keep the native cursor.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let rafId = 0;
    let visible = false;
    let prev = performance.now();

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        ref.current?.setAttribute("data-visible", "true");
      }
    };
    const onLeave = () => {
      visible = false;
      ref.current?.removeAttribute("data-visible");
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      if (ref.current) {
        if (interactive) ref.current.setAttribute("data-active", "true");
        else ref.current.removeAttribute("data-active");
      }
    };

    const loop = (now: number) => {
      // Tight, frame-rate-INDEPENDENT follow: smooth but crisp, like a
      // targeting reticle snapping onto the pointer — same on 60/120Hz.
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const a = 1 - Math.exp(-32 * dt);
      x += (mouseX - x) * a;
      y += (mouseY - y) * a;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="jg-reticle pointer-events-none fixed left-0 top-0 z-[100] hidden text-accent-warm opacity-80 data-[visible=true]:block data-[active=true]:opacity-100 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out data-[active=true]:[&>svg]:scale-[1.35]"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        {/* Square frame, each edge split with a gap at its midpoint */}
        <path d="M6 6 H16 M24 6 H34 M6 34 H16 M24 34 H34 M6 6 V16 M6 24 V34 M34 6 V16 M34 24 V34" />
        {/* Crosshair ticks crossing each edge midpoint (in + out) */}
        <path d="M20 2 V10 M20 30 V38 M2 20 H10 M30 20 H38" />
        {/* Centre square */}
        <rect x="16.5" y="16.5" width="7" height="7" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
