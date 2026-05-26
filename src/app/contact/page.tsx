import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FounderCard } from "@/components/contact/FounderCard";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Players, partners, press — get in touch with ${studio.name}. We reply within one working day.`,
  alternates: { canonical: "/contact" },
};

const briefingChecklist = [
  "Who you are and what brings you here",
  "What you're trying to do — collab, brand activation, press, partnership, something else",
  "Timing, if it's a deadline-driven brief",
  "References, mood boards, or anything that signals what you're imagining",
  "Optional: budget range if you have one — even a loose order of magnitude helps",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="— Get in touch —"
        title="Briefs welcome."
        description="Players, partners, press — if you've got something worth building, we want to hear it. We reply within one working day."
      />

      {/* Founder card */}
      <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <FounderCard />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {/* Primary email card */}
          <a
            href={`mailto:${studio.email}?subject=Hello%20JaloGames`}
            className="group rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent-warm"
          >
            <p className="eyebrow mb-2">Email us directly</p>
            <p className="font-display text-3xl uppercase tracking-[0.01em] text-text transition-colors group-hover:text-accent-warm sm:text-4xl">
              {studio.email}
            </p>
            <p className="mt-3 text-sm text-text-muted">
              We reply within one working day. {studio.location}.
            </p>
          </a>

          {/* What to include */}
          <div className="rounded-2xl border border-border bg-surface p-8">
            <p className="eyebrow mb-4">What to include in your first message</p>
            <ul className="space-y-3 text-text-muted">
              {briefingChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent-warm"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-dim">
              Not sure on any of these? Send the rest anyway — we&apos;ll figure
              it out on the call.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
