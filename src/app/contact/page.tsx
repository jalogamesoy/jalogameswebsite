import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Brief ${studio.name} on your next branded mobile game or Fortnite experience. We reply within one working day.`,
};

const briefingChecklist = [
  "Who the brand is and what audience you're reaching",
  "Format you're imagining: mobile game, Fortnite/UEFN map, browser game, or unsure",
  "Rough timeline and live dates",
  "Budget range — even a loose order of magnitude helps",
  "Any references or campaigns you love",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="— WORK WITH US —"
        title="Brief us. Fast turnarounds, real production."
        description="Branded mobile games and Fortnite experiences for ambitious brands. We reply within one working day."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {/* Primary email card */}
          <a
            href={`mailto:${studio.email}?subject=Brief%20for%20JaloGames`}
            className="group rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent-warm"
          >
            <p className="eyebrow mb-2">Email us directly</p>
            <p className="font-display text-3xl text-text transition-colors group-hover:text-accent-warm sm:text-4xl">
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
              Not sure on any of these? Send the rest anyway — we'll figure it
              out on the call.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
