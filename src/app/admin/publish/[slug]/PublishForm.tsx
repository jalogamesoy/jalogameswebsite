"use client";

import { useState, useTransition } from "react";
import { publishAction, type PublishInput } from "./actions";
import type { UploadPostPlatform, UploadPostResult } from "@/lib/upload-post";

const ALL_PLATFORMS: UploadPostPlatform[] = ["linkedin", "x", "reddit"];

/**
 * Editable draft-then-publish form for a journal post. Pre-fills
 * platform-specific drafts from defaults the server generates, lets
 * you tweak each one, then fires the server action.
 */
export function PublishForm({
  slug,
  title,
  postUrl,
  defaults,
}: {
  slug: string;
  title: string;
  postUrl: string;
  defaults: {
    linkedin: string;
    x: string;
    redditTitle: string;
    redditBody: string;
    subreddit: string;
  };
}) {
  const [platforms, setPlatforms] = useState<UploadPostPlatform[]>([
    ...ALL_PLATFORMS,
  ]);
  const [linkedinText, setLinkedinText] = useState(defaults.linkedin);
  const [xText, setXText] = useState(defaults.x);
  const [redditTitle, setRedditTitle] = useState(defaults.redditTitle);
  const [redditBody, setRedditBody] = useState(defaults.redditBody);
  const [subreddit, setSubreddit] = useState(defaults.subreddit);

  const [result, setResult] = useState<UploadPostResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const togglePlatform = (p: UploadPostPlatform) => {
    setPlatforms((current) =>
      current.includes(p) ? current.filter((x) => x !== p) : [...current, p]
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: PublishInput = {
      platforms,
      redditTitle,
      redditBody,
      linkedinText,
      xText,
      subreddit,
    };
    startTransition(async () => {
      setResult(null);
      const r = await publishAction(input);
      setResult(r);
    });
  };

  const xCharCount = xText.length;
  const xOverLimit = xCharCount > 280;

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <header className="rounded-2xl border border-border bg-surface p-6">
        <p className="eyebrow mb-2">Publish journal post</p>
        <p className="font-display text-2xl uppercase tracking-[0.02em] text-text">
          {title}
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Source post:{" "}
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-warm hover:underline"
          >
            {postUrl}
          </a>
        </p>
      </header>

      {/* Platform toggles */}
      <div className="rounded-2xl border border-border bg-surface p-6">
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

      {/* LinkedIn draft */}
      {platforms.includes("linkedin") && (
        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="px-2 font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
            LinkedIn
          </legend>
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

      {/* X draft */}
      {platforms.includes("x") && (
        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="px-2 font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
            X (Twitter)
          </legend>
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
            {xCharCount} / 280 chars · upload-post strips URLs from X — don't
            rely on a link in the body.
          </p>
        </fieldset>
      )}

      {/* Reddit draft */}
      {platforms.includes("reddit") && (
        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="px-2 font-display text-xs uppercase tracking-[0.18em] text-accent-warm">
            Reddit
          </legend>
          <label className="mt-2 block">
            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Subreddit (no r/ prefix)
            </span>
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              placeholder="IndieDev"
              className="mt-1 w-full rounded-lg border border-border bg-bg p-3 font-mono text-sm text-text focus:border-accent-warm focus:outline-none"
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
              className="mt-1 w-full rounded-lg border border-border bg-bg p-3 font-mono text-sm text-text focus:border-accent-warm focus:outline-none"
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

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending || platforms.length === 0 || xOverLimit}
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent-warm px-7 font-display text-sm uppercase tracking-[0.18em] text-bg transition hover:bg-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Publishing…" : "Publish now"}
          <span aria-hidden className="ml-2">
            →
          </span>
        </button>
        <p className="text-xs text-text-dim">
          Posts fire immediately on each selected platform.
        </p>
      </div>

      {/* Result */}
      {result && (
        <section
          aria-live="polite"
          className={`rounded-2xl border p-6 ${
            result.success
              ? "border-accent-warm/40 bg-accent-warm/5"
              : "border-red-500/40 bg-red-500/5"
          }`}
        >
          <p className="eyebrow mb-3">
            {result.success ? "Published" : "Something went wrong"}
          </p>
          {result.message && (
            <p className="text-sm text-text-muted">{result.message}</p>
          )}
          {result.results && (
            <ul className="mt-4 space-y-3 text-sm">
              {Object.entries(result.results).map(([platform, r]) => (
                <li key={platform} className="flex items-baseline gap-3">
                  <span className="font-display w-20 shrink-0 text-xs uppercase tracking-[0.18em] text-accent-warm">
                    {platform}
                  </span>
                  {r.success ? (
                    r.url ? (
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
                    <span className="text-red-400">
                      {r.error ?? "failed"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {result.usage && (
            <p className="mt-4 text-xs text-text-dim">
              Usage: {result.usage.count} / {result.usage.limit} this cycle.
            </p>
          )}
        </section>
      )}
    </form>
  );
}
