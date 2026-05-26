"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, nav } from "@/content/site";

/**
 * Hamburger + slide-down panel for screens below the md breakpoint.
 * Closes on route change and on Escape; locks body scroll while open.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text md:hidden"
      >
        <span className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[5px] h-0.5 w-4 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[10px] h-0.5 w-4 bg-current transition-transform ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Slide-down panel */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-16 z-40 border-b border-border bg-bg transition-transform duration-300 md:hidden ${
          open ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium uppercase tracking-[0.14em] text-text-muted transition-colors hover:bg-surface hover:text-text"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={headerCta.href}
            className="mt-3 inline-flex h-12 items-center justify-center rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold uppercase tracking-[0.14em] text-text"
          >
            {headerCta.label}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}
