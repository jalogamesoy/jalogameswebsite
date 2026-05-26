import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `${studio.name} is a small, focused team. We're not running a public hiring round right now — but we read every thoughtful message.`,
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="— CAREERS —"
        title="No open roles. Always reading briefs."
        description="We hire rarely and slowly. If you build games at studio quality and want to work like a team, not a department — tell us why."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 text-text-muted">
          <p className="eyebrow mb-3">How to reach us</p>
          <p className="text-base leading-relaxed">
            Send a short note + portfolio / reel to{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>
            . If your work moves us, we'll write back.
          </p>
        </div>
      </section>
    </>
  );
}
