"use client";

import { useState } from "react";

/**
 * Per-post share buttons. Pre-fill LinkedIn / X share dialogs with
 * the post URL (no API auth needed — these are the official public
 * intent URLs). Copy-link uses the Clipboard API and shows brief
 * confirmation state.
 *
 * URLs must be absolute (the platforms need a public URL) — pass
 * the resolved post URL in as a prop.
 */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(
    title
  )}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail in HTTP / restricted contexts. Best-
      // effort fallback: select the URL string in a temp input.
    }
  };

  const baseBtn =
    "inline-flex h-10 items-center justify-center rounded-full border border-border-strong px-4 font-display text-[11px] uppercase tracking-[0.18em] text-text transition-colors hover:border-accent-warm hover:text-accent-warm";

  return (
    <div
      role="group"
      aria-label="Share this post"
      className="flex flex-wrap gap-2"
    >
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
      >
        Share on LinkedIn
        <span aria-hidden className="ml-2">
          ↗
        </span>
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
      >
        Share on X
        <span aria-hidden className="ml-2">
          ↗
        </span>
      </a>
      <button type="button" onClick={onCopy} className={baseBtn}>
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
