import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { headerCta, nav, studio } from "@/content/site";
import { MobileNav } from "./MobileNav";

/**
 * Top navigation bar. Server component. Mobile menu state lives in
 * the client-only <MobileNav /> subcomponent so the rest stays
 * statically renderable.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-bg/40 via-bg/15 to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${studio.name} home`}
          className="flex shrink-0 items-center text-text transition-colors hover:text-accent-warm"
        >
          <Wordmark className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-8"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={headerCta.href}
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full border border-border-strong bg-surface px-5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-text transition-colors hover:border-accent-warm hover:text-accent-warm"
          >
            {headerCta.label}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
