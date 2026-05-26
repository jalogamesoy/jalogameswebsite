import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${studio.name} website. Plain-language ground rules for visiting jalogames.fi.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-26";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="— Terms —"
        title="Ground rules for the site."
        description="The terms covering use of jalogames.fi. Commercial agreements with brand partners are separate written contracts."
      />

      <article
        data-reveal
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <p className="text-sm text-text-dim">Last updated: {LAST_UPDATED}</p>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            About these terms
          </h2>
          <p>
            By using jalogames.fi you agree to these terms. They cover the
            public marketing site only. Commercial work — brand campaigns,
            licensing, partnerships — is governed by a separate written
            agreement between {studio.name} and the client.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Our content
          </h2>
          <p>
            Everything on this site — copy, design, code, logos, game art,
            screenshots, audio, video — is owned by {studio.name} or our
            licensors. You may not republish, re-sell, or train AI models on
            this content without written permission.
          </p>
          <p>
            Journalists and press: you may use up to two screenshots, our
            wordmark, and short quotes from this site for editorial coverage
            of {studio.name} without asking, as long as you credit us. For
            anything larger, email{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>
            .
          </p>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            How to use the site
          </h2>
          <p>You agree not to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Scrape the site programmatically without permission.</li>
            <li>
              Attempt to break, probe, or overload the site or our hosting.
            </li>
            <li>Impersonate {studio.name} or its team.</li>
            <li>Use the site for anything illegal.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            No warranties
          </h2>
          <p>
            We do our best to keep the site accurate and available, but we
            provide it "as is" with no guarantees. {studio.name} isn't liable
            for losses arising from your use of the site to the extent the law
            allows.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Governing law
          </h2>
          <p>
            These terms are governed by Finnish law. Any dispute is handled by
            the courts of Finland.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Contact
          </h2>
          <p>
            Questions about these terms:{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>
            .
          </p>
        </section>

        <p className="mt-12 text-xs text-text-dim">
          These terms are a plain-language draft for clarity. They are not
          legal advice. For binding commercial agreements, please use your
          legal counsel.
        </p>
      </article>
    </>
  );
}
