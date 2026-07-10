"use client";

import { useEffect, useRef } from "react";

/**
 * Gold dot + trailing ivory ring. The ring blooms over anything
 * marked [data-hover] (and links/buttons). Touch devices and
 * reduced-motion users keep the native cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const html = document.documentElement;
    html.classList.add("cursor-on");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let seen = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const HOVERABLE = "a, button, [data-hover]";
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(HOVERABLE)) {
        ring.current?.classList.add("is-hover");
      }
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(HOVERABLE)) {
        ring.current?.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      html.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
