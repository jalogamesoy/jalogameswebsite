"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The opening rite. A gold seam draws itself, Matthew 7:14 rises line
 * by line, and then the gate parts to reveal the studio. Click skips.
 *
 * Phases are cumulative classes on the overlay; all motion lives in
 * globals.css. `intro-done` on <html> starts the hero entrance at the
 * exact moment the panels begin to part, so the wordmark rises through
 * the opening gate.
 */

const TIMELINE: Array<[cls: string, at: number]> = [
  ["p-seam", 150],
  ["p-quote", 1050],
  ["p-closing", 4300],
  ["p-open", 4850],
];
const UNMOUNT_AT = 6200;

export function Intro() {
  const [mounted, setMounted] = useState(true);
  const overlay = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const opened = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    const queue = timers.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion — no theatre, straight to the page.
      html.classList.add("intro-done");
      queue.push(window.setTimeout(() => setMounted(false), 0));
    } else {
      html.classList.add("intro-active");

      // The quote is the centrepiece — it must paint in Cormorant, not
      // the Georgia fallback. On a cold visit the webfont isn't ready
      // when the intro mounts, so hold the timeline until fonts load
      // (capped so a slow/failed font never stalls the show).
      let started = false;
      const start = () => {
        if (started || opened.current) return;
        started = true;

        for (const [cls, at] of TIMELINE) {
          queue.push(
            window.setTimeout(() => {
              overlay.current?.classList.add(cls);
              if (cls === "p-open") {
                opened.current = true;
                html.classList.add("intro-done");
              }
            }, at)
          );
        }
        queue.push(
          window.setTimeout(() => {
            html.classList.remove("intro-active");
            setMounted(false);
          }, UNMOUNT_AT)
        );
      };

      const cap = window.setTimeout(start, 900);
      queue.push(cap);
      document.fonts.ready.then(() => {
        clearTimeout(cap);
        start();
      });
    }

    return () => {
      queue.forEach(clearTimeout);
      queue.length = 0;
      html.classList.remove("intro-active");
      html.classList.add("intro-done");
    };
  }, []);

  const skip = () => {
    if (opened.current) return;
    opened.current = true;
    timers.current.forEach(clearTimeout);
    const html = document.documentElement;
    overlay.current?.classList.add("p-skip", "p-seam", "p-quote", "p-closing", "p-open");
    html.classList.add("intro-done");
    timers.current.push(
      window.setTimeout(() => {
        html.classList.remove("intro-active");
        setMounted(false);
      }, 1350)
    );
  };

  if (!mounted) return null;

  return (
    <div ref={overlay} className="intro" onClick={skip} aria-hidden="true">
      <div className="intro-panel left" />
      <div className="intro-panel right" />
      <div className="intro-seam" />

      <div className="intro-quote font-serif italic text-ivory text-[clamp(1.45rem,3.1vw,2.5rem)] leading-[1.4]">
        <p className="q-line">
          <span>But small is the gate</span>
        </p>
        <p className="q-line">
          <span>and narrow the road that leads to life,</span>
        </p>
        <p className="q-line">
          <span>and only a few find it.</span>
        </p>
        <p className="q-ref mt-9 font-mono not-italic text-[10px] uppercase text-gold">
          Matthew 7 : 14
        </p>
      </div>

      <p className="intro-hint font-mono text-[9px] uppercase tracking-[0.4em] text-ivory">
        Click to enter
      </p>
    </div>
  );
}
