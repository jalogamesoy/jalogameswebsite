"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  submitPost,
  type Platform,
  type ComposerInput,
} from "@/app/admin/actions";
import type { PublishResult } from "@/lib/upload-post";

const ALL_PLATFORMS: Platform[] = ["linkedin", "x", "reddit"];

export type ComposerDefaults = {
  linkedin: string;
  x: string;
  redditTitle: string;
  redditBody: string;
  subreddit: string;
};

/** Format a datetime-local value for the user's confirmation line. */
function describeLocal(value: string, tz: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: tz,
  });
}

/**
 * Shared draft → post-now-or-schedule form. Drives both the standalone
 * /admin/compose page and the per-journal-post /admin/publish/[slug]
 * page. Pre-fills platform-specific drafts, lets you tweak each one,
 * optionally pick a future time, then fires the server action.
 *
 * Scheduling: the datetime-local input is naive local time. Because the
 * admin's browser timezone IS the posting timezone (Helsinki), we get a
 * correct absolute instant — DST included — from new Date(value), and
 * send its .toISOString() (…Z) to upload-post.
 */
export function SocialComposer({
  defaults,
  context,
}: {
  defaults: ComposerDefaults;
  context?: { title: string; url: string };
}) {
  const [platforms, setPlatforms] = useState<Platform[]>([...ALL_PLATFORMS]);
  const [linkedinText, setLinkedinText] = useState(defaults.linkedin);
  const [xText, setXText] = useState(defaults.x);
  const [redditTitle, setRedditTitle] = useState(defaults.redditTitle);
  const [redditBody, setRedditBody] = useState(defaults.redditBody);
  const [subreddit, setSubreddit] = useState(defaults.subreddit);

  const [scheduleOn, setScheduleOn] = useState(false);
  const [scheduledLocal, setScheduledLocal] = useState("");
  const [minLocal, setMinLocal] = useState("");
  const [tz, setTz] = useState("UTC");

  const [result, setResult] = useState<PublishResult | null>(null);
  const [isPending, startTransition] = useTransition();

  // Compute "now" + timezone after mount to avoid SSR hydration drift.
  useEffect(() => {
    const d = new Date();
    const off = d.getTimezoneOffset() * 60000;
    setMinLocal(new Date(d.getTime() - off).toISOString().slice(0, 16));
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    } catch {
      setTz("UTC");
    }
  }, []);

  const togglePlatform = (p: Platform) =>
    setPlatforms((cur) =>
      cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]
    );

  const xCharCount = xText.length;
  const xOverLimit = xCharCount > 280;

  const scheduledPreview = useMemo(
    () => (scheduleOn ? describeLocal(scheduledLocal, tz) : ""),
    [scheduleOn, scheduledLocal, tz]
  );

  const scheduleInvalid =
    scheduleOn &&
    (!scheduledLocal ||
      Number.isNaN(new Date(scheduledLocal).getTime()) ||
      new Date(scheduledLocal).getTime() <= Date.now());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: ComposerInput = {
      platforms,
      linkedinText,
      xText,
      redditTitle,
      redditBody,
      subreddit,
    };
    if (scheduleOn && scheduledLocal) {
      // Send an ABSOLUTE UTC instant (…Z), computed from the local wall
      // clock via the browser's own timezone (Helsinki, DST included).
      // Deliberately NO timezone param: the instant is unambiguous, and
      // pairing it with a tz risks upload-post double-applying the offset.
      // Strip milliseconds to match upload-post's documented format.
      input.scheduledDate = new Date(scheduledLocal)
        .toISOString()
        .replace(/\.\d{3}Z$/, "Z");
    }
    startTransition(async () => {
      setResult(null);
      setResult(await submitPost(input));
    });
  };

  const cardClass = "rounded-2xl border border-border bg-surface p-6";
  const legendClass =
    "px-2 font-display text-xs uppercase tracking-[0.18em] text-accent-warm";
  const inputClass =
    "w-full rounded-lg border border-border bg-bg p-3 font-mono text-sm text-text focus:border-accent-warm focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Context header */}
      <header className={cardClass}>
        <p className="eyebrow mb-2">
          {context ? "Syndicate journal post" : "Compose a new post"}
        </p>
        {context ? (
          <>
            <p className="font-display text-2xl uppercase tracking-[0.02em] text-text">
              {context.title}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Source post:{" "}
              <a
                href={context.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-warm hover:underline"
              >
                {context.url}
              </a>
            </p>
          </>
        ) : (
          <p className="text-sm text-text-muted">
            A standalone post to your socials — no journal article required.
            Schedule it in advance or fire it now.
          </p>
        )}
      </header>

      {/* Platform toggles */}
      <div className={cardClass}>
        <p className="eyebrow mb-4">Send to</p>
        <div className="flex flex-wrap gap-3">
          {ALL_PLATFORMS.map((p) => {
            const active = platforms.includes(p);
            return (
              <button
                type="button"
                key={p}
                onClick={() => togglePlatform(p)}
                className={`inline-flex h-10 items-center justify-center rounded-full px-5 font-display text-xs uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? "bg-accent-warm text-bg"
                    : "border border-border-strong text-text hover:border-accent-warm"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* LinkedIn */}
      {platforms.includes("linkedin") && (
        <fieldset className={cardClass}>
          <legend className={legendClass}>LinkedIn</legend>
          <textarea
            value={linkedinText}
            onChange={(e) => setLinkedinText(e.target.value)}
            rows={12}
            className="mt-2 w-full resize-y rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-text focus:border-accent-warm focus:outline-none"
          />
          <p className="mt-2 text-xs text-text-dim">
            {linkedinText.length} chars · LinkedIn rewards the first ~120 chars
            (preview cut-off) and works up to ~3000.
          </p>
        </fieldset>
      )}

      {/* X */}
      {platforms.includes("x") && (
        <fieldset className={cardClass}>
          <legend className={legendClass}>X (Twitter)</legend>
          <textarea
            value={xText}
            onChange={(e) => setXText(e.target.value)}
            rows={6}
            className="mt-2 w-full resize-y rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-text focus:border-accent-warm focus:outline-none"
          />
          <p
            className={`mt-2 text-xs ${
              xOverLimit ? "text-red-400" : "text-text-dim"
            }`}
          >
            {xCharCount} / 280 chars · upload-post strips URLs from X — don&apos;t
            rely on a link in the body.
          </p>
        </fieldset>
      )}

      {/* Reddit */}
      {platforms.includes("reddit") && (
        <fieldset className={cardClass}>
          <legend className={legendClass}>Reddit</legend>
          <label className="mt-2 block">
            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Subreddit (no r/ prefix)
            </span>
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              placeholder="IndieDev"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Title
            </span>
            <input
              type="text"
              value={redditTitle}
              onChange={(e) => setRedditTitle(e.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Body
            </span>
            <textarea
              value={redditBody}
              onChange={(e) => setRedditBody(e.target.value)}
              rows={10}
              className="mt-1 w-full resize-y rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-text focus:border-accent-warm focus:outline-none"
            />
          </label>
          <p className="mt-2 text-xs text-text-dim">
            Many subreddits require minimum karma / account age. If Reddit
            rejects the post, the other platforms still fire.
          </p>
        </fieldset>
      )}

      {/* When */}
      <div className={cardClass}>
        <p className="eyebrow mb-4">When</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setScheduleOn(false)}
            className={`inline-flex h-10 items-center rounded-full px-5 font-display text-xs uppercase tracking-[0.18em] transition-colors ${
              !scheduleOn
                ? "bg-accent-warm text-bg"
                : "border border-border-strong text-text hover:border-accent-warm"
            }`}
          >
            Post now
          </button>
          <button
            type="button"
            onClick={() => setScheduleOn(true)}
            className={`inline-flex h-10 items-center rounded-full px-5 font-display text-xs uppercase tracking-[0.18em] transition-colors ${
              scheduleOn
                ? "bg-accent-warm text-bg"
                : "border border-border-strong text-text hover:border-accent-warm"
            }`}
          >
            Schedule
          </button>
        </div>

        {scheduleOn && (
          <div className="mt-5">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Date &amp; time ({tz})
              </span>
              <input
                type="datetime-local"
                value={scheduledLocal}
                min={minLocal}
                onChange={(e) => setScheduledLocal(e.target.value)}
                className={`mt-1 ${inputClass} max-w-xs`}
              />
            </label>
            {scheduledPreview && !scheduleInvalid && (
              <p className="mt-2 text-xs text-text-dim">
                Fires {scheduledPreview} · upload-post posts it automatically.
              </p>
            )}
            {scheduleInvalid && (
              <p className="mt-2 text-xs text-red-400">
                Pick a time in the future (up to 365 days ahead).
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={
            isPending ||
            platforms.length === 0 ||
            xOverLimit ||
            scheduleInvalid
          }
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent-warm px-7 font-display text-sm uppercase tracking-[0.18em] text-bg transition hover:bg-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? scheduleOn
              ? "Scheduling…"
              : "Publishing…"
            : scheduleOn
              ? "Schedule"
              : "Post now"}
          <span aria-hidden className="ml-2">
            →
          </span>
        </button>
        <p className="text-xs text-text-dim">
          {scheduleOn
            ? "upload-post holds each platform and fires it at the chosen time."
            : "Posts fire immediately on each selected platform."}
        </p>
      </div>

      {/* Result */}
      {result &&
        (() => {
          const entries = [
            ["linkedin", result.linkedin] as const,
            ["x", result.x] as const,
            ["reddit", result.reddit] as const,
          ].filter(([, r]) => r !== undefined);
          const anyFailure = entries.some(([, r]) => r && !r.success);
          const anyScheduled = entries.some(([, r]) => r && r.scheduled);
          return (
            <section
              aria-live="polite"
              className={`rounded-2xl border p-6 ${
                anyFailure
                  ? "border-red-500/40 bg-red-500/5"
                  : "border-accent-warm/40 bg-accent-warm/5"
              }`}
            >
              <p className="eyebrow mb-3">
                {anyFailure
                  ? "Some platforms failed"
                  : anyScheduled
                    ? "Scheduled"
                    : "Published"}
              </p>
              <ul className="space-y-3 text-sm">
                {entries.map(([platform, r]) => (
                  <li key={platform} className="flex items-baseline gap-3">
                    <span className="font-display w-20 shrink-0 text-xs uppercase tracking-[0.18em] text-accent-warm">
                      {platform}
                    </span>
                    {r && r.success ? (
                      r.scheduled ? (
                        <span className="text-text">
                          Scheduled{r.jobId ? ` · job ${r.jobId}` : ""}
                        </span>
                      ) : r.url ? (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-text hover:text-accent-warm hover:underline"
                        >
                          {r.url}
                        </a>
                      ) : (
                        <span className="text-text">posted (no url)</span>
                      )
                    ) : (
                      <span className="text-red-400">{r?.error ?? "failed"}</span>
                    )}
                  </li>
                ))}
              </ul>
              {anyScheduled && (
                <p className="mt-4 text-xs text-text-dim">
                  <Link
                    href="/admin/scheduled"
                    className="text-accent-warm hover:underline"
                  >
                    View &amp; manage the scheduled queue →
                  </Link>
                </p>
              )}
              {result.usage && (
                <p className="mt-3 text-xs text-text-dim">
                  Usage: {result.usage.count} / {result.usage.limit} this cycle.
                </p>
              )}
            </section>
          );
        })()}
    </form>
  );
}
