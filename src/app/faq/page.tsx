import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { faq, studio } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about working with ${studio.name} — pricing, timelines, IP, NDAs, engines, and how to start a brief.`,
  alternates: { canonical: "/faq" },
};

/** FAQPage JSON-LD. AI search engines (Google AI Overviews, Perplexity,
 *  ChatGPT, Claude) lean on this schema heavily when answering "what
 *  does X studio do / charge / cover" style questions. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        eyebrow="— FAQ —"
        title="Brief questions, plain answers."
        description="Everything brands, journalists, and curious humans tend to ask before they reach out. If your question isn't here, email us — we'll add it."
      />

      <section
        data-reveal
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <dl className="space-y-4">
          {faq.map((item, i) => (
            <details
              key={item.question}
              name="faq"
              className="group rounded-2xl border border-border bg-surface px-6 py-5 transition-colors open:border-border-strong hover:border-border-strong"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <dt className="font-display text-base uppercase tracking-[0.04em] text-text sm:text-lg">
                  <span className="mr-3 font-display text-[10px] uppercase tracking-[0.24em] text-text-dim">
                    0{i + 1}
                  </span>
                  {item.question}
                </dt>
                <span
                  aria-hidden
                  className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-text transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="mt-4 text-base leading-relaxed text-text-muted">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="eyebrow mb-3">Still curious?</p>
          <p className="text-base leading-relaxed text-text-muted">
            Email us at{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>{" "}
            — or{" "}
            <Link href="/contact" className="text-accent-warm hover:underline">
              start a brief
            </Link>{" "}
            with the checklist on the contact page.
          </p>
        </div>
      </section>
    </>
  );
}
