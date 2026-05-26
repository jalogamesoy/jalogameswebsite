// Studio-wide copy, mantras, services. Swap freely — the components
// read from here so you don't have to chase strings across files.

export const studio = {
  name: "JaloGames",
  wordmarkAlt: "JaloGames", // Used for the logo image alt text
  location: "Helsinki, Finland",
  foundingYear: 2024, // Update if different — used in JSON-LD
  /** One sentence positioning. Used in <meta name="description"> fallback. */
  tagline:
    "An independent game studio building branded mobile games and Fortnite experiences for ambitious brands — fast, with real production quality.",
  /** Long-form studio description for the homepage Who-We-Are block. */
  whoWeAre:
    "JaloGames is a Helsinki-based game studio shipping original IP and branded campaigns. We work with brands who want a playable activation that does not look like an asset flip — and ship it fast enough to ride the season, not miss it.",
  email: "jalo@jalogames.fi",
} as const;

/**
 * Marquee values — short, all-caps, punchy. Cycles infinitely between
 * the hero and the games grid.
 */
export const mantras: string[] = [
  "BUILT FASTER",
  "POLISHED HARDER",
  "AVERAGE IS EXPENSIVE",
  "EXCELLENCE SHIPS HERE",
  "WE OUTBUILD",
];

/**
 * Hero block copy — pitched to brand marketing teams (Nocco / Celsius
 * type prospects) while keeping the editorial confidence of the visual
 * reference.
 */
export const hero = {
  eyebrow: "— BRAND-FIRST GAME STUDIO —",
  headline: "We don't follow the industry.\nWe outbuild it.",
  sub: "JaloGames builds branded mobile games and Fortnite experiences for ambitious brands. Fast turnaround. Real production quality. No asset flips.",
  primaryCta: { label: "See our games", href: "/games" },
  secondaryCta: { label: "Brief us", href: "/contact" },
} as const;

/** Mid-page declarative block between Games and Strengths. */
export const midStatement = {
  headline: "Games aren't made. They're built.",
  sub: "BIG VISION · ELITE EXECUTION · ZERO COMPROMISE",
} as const;

/**
 * Five "strengths" — these are the B2B sell to brand teams. Order matters:
 * mobile-games first because it's the most universal ask; Fortnite
 * second because it's the highest-margin niche; then production /
 * embedded model / speed.
 */
export type Strength = {
  title: string;
  description: string;
  /** Short icon hint — purely metadata for now, we'll wire icons in 2D. */
  icon: "device" | "fort" | "production" | "team" | "speed";
};

export const strengths: Strength[] = [
  {
    title: "Branded Mobile Games",
    description:
      "HTML5 and native, instant-load, monetization-ready. Drop a playable into a campaign without dragging users to the App Store.",
    icon: "device",
  },
  {
    title: "Fortnite Experiences (UEFN)",
    description:
      "Custom islands, branded events, performance built in. Not a portal, an experience — the metrics your CMO asks for.",
    icon: "fort",
  },
  {
    title: "Speed Without Compromise",
    description:
      "Concept to playable in weeks, not quarters. Briefs that arrive in March ship for summer, not next year.",
    icon: "speed",
  },
  {
    title: "Original IP Production",
    description:
      "Three games in active development. The same studio building our own worlds builds your brand's — at studio quality, not asset-flip quality.",
    icon: "production",
  },
  {
    title: "Embedded Team Model",
    description:
      "Plug into your marketing team. Brief like an agency, deliver like a studio. One Slack channel from kickoff to launch.",
    icon: "team",
  },
];

/** CTA strip near the footer — last conversion attempt before the footer. */
export const ctaStrip = {
  headline: "Got a brief? Let's see what we can build.",
  cta: { label: "Start a project", href: "/contact" },
} as const;

/** Main nav — order matches the reference. */
export const nav: { label: string; href: string }[] = [
  { label: "Games", href: "/games" },
  { label: "Studio", href: "/studio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/** Primary header CTA. */
export const headerCta = { label: "Work with us", href: "/contact" } as const;
