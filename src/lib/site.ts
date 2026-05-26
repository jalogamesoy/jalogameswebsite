// Central place for site-wide constants. Update SITE_URL when the
// custom domain (jalogames.fi) is wired up in Vercel.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jalogameswebsite.vercel.app";

export const SITE_CONFIG = {
  name: "JaloGames",
  tagline: "Crafting unforgettable worlds, one game at a time.",
  description:
    "JaloGames is an independent game studio crafting unforgettable worlds, one game at a time.",
  locale: "en_US",
  url: SITE_URL,
} as const;
