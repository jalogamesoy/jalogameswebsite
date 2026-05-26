// Central place for site-wide constants. The apex domain (no www) is
// the canonical URL. If you ever need to point this at a preview /
// staging environment, set NEXT_PUBLIC_SITE_URL as an env var instead
// of editing this fallback.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jalogames.fi";

export const SITE_CONFIG = {
  name: "JaloGames",
  tagline: "Crafting unforgettable worlds, one game at a time.",
  description:
    "JaloGames is an independent game studio crafting unforgettable worlds, one game at a time.",
  locale: "en_US",
  url: SITE_URL,
} as const;
