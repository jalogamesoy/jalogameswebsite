import Image from "next/image";
import Link from "next/link";
import { nav, studio } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label={`${studio.name} home`}>
              <Image
                src="/brand/wordmark.png"
                alt={studio.wordmarkAlt}
                width={92}
                height={56}
                sizes="92px"
                className="h-12 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
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
                    className="text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block */}
          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <a
              href={`mailto:${studio.email}`}
              className="text-base font-medium text-text transition-colors hover:text-accent-warm"
            >
              {studio.email}
            </a>
            <p className="mt-3 text-sm text-text-muted">
              Briefs, partnerships, or just to say hi.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-dim sm:flex-row sm:items-center">
          <p>
            © {year} {studio.name}. All rights reserved.
          </p>
          <p>{studio.location}</p>
        </div>
      </div>
    </footer>
  );
}
