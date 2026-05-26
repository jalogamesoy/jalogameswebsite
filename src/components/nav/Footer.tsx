import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav, social, studio } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand block */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link
              href="/"
              aria-label={`${studio.name} home`}
              className="inline-flex w-fit text-text transition-colors hover:text-accent-warm"
            >
              <Wordmark className="h-12 w-auto" />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              {studio.tagline}
            </p>
            <p className="eyebrow">{studio.location}</p>
          </div>

          {/* Nav repeat */}
          <div>
            <p className="eyebrow mb-4">Sitemap</p>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-display text-sm uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <a
              href={`mailto:${studio.email}`}
              className="block text-base font-medium text-text transition-colors hover:text-accent-warm"
            >
              {studio.email}
            </a>
            <p className="mt-3 text-sm text-text-muted">
              Briefs, partnerships, or just to say hi.
            </p>
            {social.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent-warm"
                    >
                      {s.label}
                      <span aria-hidden className="ml-1">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-dim sm:flex-row sm:items-center">
          <p>
            © {year} {studio.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link
                href="/faq"
                className="transition-colors hover:text-text"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/press"
                className="transition-colors hover:text-text"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-text"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-text"
              >
                Terms
              </Link>
            </li>
            <li className="text-text-dim">{studio.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
