"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { cancelScheduled } from "@/app/admin/actions";
import type { ScheduledPost } from "@/lib/upload-post";

function formatWhen(iso?: string): string {
  if (!iso) return "no date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Renders the upload-post scheduled-post queue with per-job cancel.
 * `initial` is fetched server-side; cancelling calls the server action
 * and optimistically drops the row on success.
 */
export function ScheduledQueue({ initial }: { initial: ScheduledPost[] }) {
  const [posts, setPosts] = useState<ScheduledPost[]>(initial);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const onCancel = (jobId: string) => {
    if (!window.confirm("Cancel this scheduled post? This can't be undone.")) {
      return;
    }
    setError(null);
    setPendingId(jobId);
    startTransition(async () => {
      const r = await cancelScheduled(jobId);
      if (r.success) {
        setPosts((cur) => cur.filter((p) => p.jobId !== jobId));
      } else {
        setError(r.error ?? "Cancel failed.");
      }
      setPendingId(null);
    });
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-text-muted">
          Nothing scheduled right now.
        </p>
        <Link
          href="/admin/compose"
          className="mt-4 inline-flex items-center font-display text-xs uppercase tracking-[0.18em] text-accent-warm hover:underline"
        >
          Compose a post →
        </Link>
      </div>
    );
  }

  const sorted = [...posts].sort((a, b) =>
    (a.scheduledDate ?? "").localeCompare(b.scheduledDate ?? "")
  );

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <ul className="space-y-3">
        {sorted.map((p) => (
          <li
            key={p.jobId}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-sm uppercase tracking-[0.02em] text-text">
                  {formatWhen(p.scheduledDate)}
                </p>
                <p className="mt-1 truncate text-sm text-text-muted">
                  {p.title || "(no title captured)"}
                </p>
                <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-text-dim">
                  {p.postType && <span>{p.postType}</span>}
                  {p.profileUsername && <span>@{p.profileUsername}</span>}
                  <span>job {p.jobId}</span>
                  {p.previewUrl && (
                    <a
                      href={p.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-warm hover:underline"
                    >
                      preview →
                    </a>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onCancel(p.jobId)}
                disabled={pendingId === p.jobId}
                className="inline-flex h-9 shrink-0 items-center rounded-full border border-red-500/40 px-4 font-display text-xs uppercase tracking-[0.18em] text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pendingId === p.jobId ? "Cancelling…" : "Cancel"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
