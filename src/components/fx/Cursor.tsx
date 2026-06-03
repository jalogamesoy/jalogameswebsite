"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — a small dot that tracks the pointer exactly, plus a
 * larger ring that trails it with eased motion. The ring expands and
 * the dot fades on interactive elements.
 *
 * Hidden completely on touch devices and when the user prefers
 * reduced motion. Renders pointer-events: none so it never blocks
 * actual interaction.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch devices and reduced-motion preference.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reducedMotion) return;

    setEnabled(true);
    // Hide the native cursor while the custom one is active. CSS rule
    // `.cursor-custom` lives in globals.css and applies to descendants.
    document.documentElement.classList.add("cursor-custom");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.setAttribute("data-visible", "true");
        ringRef.current?.setAttribute("data-visible", "true");
      }
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.removeAttribute("data-visible");
      ringRef.current?.removeAttribute("data-visible");
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      if (ringRef.current) {
        if (interactive) ringRef.current.setAttribute("data-active", "true");
        else ringRef.current.removeAttribute("data-active");
      }
    };

    let prev = performance.now();
    const loop = (now: number) => {
      // Frame-rate-INDEPENDENT smoothing: the ring approaches the pointer
      // at a constant rate per *second* (k), so it feels identical on a
      // 60Hz and a 120Hz display. (The old fixed per-frame lerp eased
      // ~2x faster on 120Hz — part of why it felt inconsistent.) The dot
      // stays exact for responsiveness.
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const k = 16; // higher = tighter follow
      const a = 1 - Math.exp(-k * dt);
      ringX += (mouseX - ringX) * a;
      ringY += (mouseY - ringY) * a;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
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
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="jg-cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-accent-warm/50 data-[visible=true]:block transition-[width,height,border-color,background-color] duration-200 ease-out data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-accent-warm data-[active=true]:bg-accent-warm/10"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="jg-cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-accent-warm data-[visible=true]:block"
      />
    </>
  );
}
