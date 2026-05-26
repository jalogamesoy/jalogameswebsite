import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${studio.name} collects, uses, and protects your personal data. We collect the minimum needed to reply to you, and we never sell or share it.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-26";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="— Privacy —"
        title="The short version: we don't sell your data."
        description={`A plain-language summary of how ${studio.name} handles personal information.`}
      />

      <article
        data-reveal
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 prose prose-invert"
      >
        <p className="text-sm text-text-dim">Last updated: {LAST_UPDATED}</p>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Who runs this site
          </h2>
          <p>
            {studio.name} ({studio.location}) operates this website at
            jalogames.fi. For privacy questions, email{" "}
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
            What we collect
          </h2>
          <p>We only collect data when you give it to us or visit the site:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">If you email us</strong> via{" "}
              {studio.email}: your name, email address, and the contents of
              your message. We keep this until our conversation ends, plus a
              reasonable archive period for business records.
            </li>
            <li>
              <strong className="text-text">Anonymous analytics</strong> via
              Vercel Analytics: page views, referrers, device type, country.
              No cookies, no cross-site tracking, no personally identifiable
              information — we cannot link a visit to a specific person.
            </li>
            <li>
              <strong className="text-text">Server logs</strong> (held by
              Vercel, our hosting provider) for security and abuse prevention.
              Standard IP + request data, retained per Vercel's policy.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            What we don't do
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>We don't sell your data. Ever.</li>
            <li>We don't share it with advertisers.</li>
            <li>We don't set marketing or tracking cookies on this site.</li>
            <li>
              We don't use third-party trackers beyond the privacy-respecting
              analytics described above.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Your rights (GDPR)
          </h2>
          <p>
            As a resident of the EU/EEA you can ask us to access, correct, or
            delete any personal data we hold on you, restrict its processing,
            or send it to you in a portable format. Email{" "}
            <a
              href={`mailto:${studio.email}`}
              className="text-accent-warm hover:underline"
            >
              {studio.email}
            </a>{" "}
            and we'll respond within 30 days.
          </p>
          <p>
            You can also lodge a complaint with the Finnish Data Protection
            Ombudsman (tietosuoja.fi).
          </p>
        </section>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-text-muted">
          <h2 className="font-display text-xl uppercase tracking-[0.04em] text-text">
            Changes to this policy
          </h2>
          <p>
            If we change this policy materially we'll update the date at the
            top and, when reasonable, post a notice on the homepage.
          </p>
        </section>
      </article>
    </>
  );
}
