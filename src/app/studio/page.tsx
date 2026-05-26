import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description: `${studio.name} is a next-generation game studio from Finland building original games, browser experiences, mobile titles, and immersive Fortnite worlds.`,
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="— The studio —"
        title="Built for the next era of games."
        description={studio.whoWeAre}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 text-text-muted">
          <p className="eyebrow mb-3">More coming soon</p>
          <p className="text-base leading-relaxed">
            The full studio story — team, process, principles, and how
            we ship — lands on this page next. In the meantime, you can{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              email us directly
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
