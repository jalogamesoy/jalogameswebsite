// Studio-wide copy. Re-shaped for the next-generation game studio
// positioning the user wrote — leads with belief and craft, lets the
// commercial work follow downstream. Edit freely; components read from
// here so you don't have to chase strings across files.

export const studio = {
  name: "JaloGames",
  wordmarkAlt: "JaloGames", // Used for the logo image alt text
  location: "Finland",
  foundingYear: 2024, // Update if different — used in JSON-LD
  /** One sentence positioning. Used in <meta name="description"> fallback. */
  tagline:
    "JaloGames is a next-generation game studio from Finland building original games, browser experiences, mobile titles, and immersive Fortnite worlds — fast, polished, and built to leave a mark.",
  /** Long-form studio description for the homepage Who-We-Are block. */
  whoWeAre:
    "JaloGames is a next-generation game studio from Finland building original games, browser experiences, mobile titles, and immersive Fortnite worlds. We combine creative taste, ruthless execution speed, modern production tools, and obsessive polish to create games that don't just launch — they leave a mark.",
  email: "jalo@jalogames.fi",
} as const;

/**
 * Marquee items — short, all-caps, punchy. Cycles infinitely between
 * the hero and the Who We Are block. Mixes studio mantras with hard
 * proof points (followers, playtime) so the rhythm reads "belief +
 * receipt + belief + receipt".
 */
export const mantras: string[] = [
  "BUILT FASTER",
  "5 000+ FORTNITE FOLLOWERS",
  "POLISHED HARDER",
  "4 000+ TIKTOK & YOUTUBE FOLLOWERS",
  "AVERAGE IS EXPENSIVE",
  "12M+ MINUTES PLAYED",
  "WE OUTBUILD",
  "NO BORING GAMES",
  "TASTE WINS",
  "EXECUTION IS THE FEATURE",
  "SMALL TEAM. MASSIVE OUTPUT",
  "THE FUTURE DOESN'T WAIT",
];

/** Hero block copy. */
export const hero = {
  eyebrow: "— Next-generation game studio —",
  headline: "We don't follow the industry.\nWe outbuild it.",
  sub: "JaloGames builds games with the speed of tomorrow and the polish of studios ten times our size. We create original worlds, unforgettable gameplay, and digital experiences built to dominate attention.",
  primaryCta: { label: "See our games", href: "/games" },
  secondaryCta: { label: "Get in touch", href: "/contact" },
} as const;

/** Vision / manifesto block — sits between the games section and process. */
export const vision = {
  eyebrow: "— Why we exist —",
  headline:
    "Built for a new era of game production.",
  body: [
    "JaloGames exists for one reason: to create games that feel bigger, sharper, and more memorable than anyone expects. We don't believe great games require slow teams, bloated processes, or endless waiting.",
    "We believe the future belongs to studios that move fast, think clearly, use the best tools in the world, and refuse to make average things.",
  ],
  /** Concrete tech stack — listed under the manifesto to back up the
   *  "best tools in the world" claim. Render as labelled chips. */
  techStack: ["Unreal Engine 5", "Godot", "HTML5"],
} as const;

/** Big mid-page "Built with" statement. Each builtWith line gets its
 *  own line of huge display type. */
export const builtWith = {
  headline: "Games aren't made.\nThey're built.",
  lines: [
    "Built with taste.",
    "Built with speed.",
    "Built with systems.",
    "Built with obsession.",
  ],
} as const;

/** Intro block above the games grid. */
export const universesIntro = {
  eyebrow: "— Our universes —",
  headline: "Future franchises in motion.",
  body: "Our universes are not experiments. Every JaloGames project is built with a clear identity, strong visual direction, and gameplay that can grow far beyond the first release.",
} as const;

/**
 * Process pillars — four sub-sections expanded from the new positioning
 * copy. Order matters; Speed leads because it's the studio's headline
 * promise to partners.
 */
export type ProcessPillar = {
  title: string;
  kicker: string;
  body: string;
};

export const processIntro = {
  eyebrow: "— How we build —",
  headline:
    "Move fast without looking cheap. Use advanced tools without losing taste.",
  body: "JaloGames is built for a new era of game production. We use scalable systems without killing creativity. The result is a studio that can create, test, polish, and ship at a speed most teams only talk about.",
} as const;

export const processPillars: ProcessPillar[] = [
  {
    title: "Speed",
    kicker: "Speed is not about rushing. It is about removing everything that does not matter.",
    body: "We build with clear direction, tight systems, and modern workflows that turn ideas into playable worlds faster.",
  },
  {
    title: "Identity",
    kicker:
      "A game can be technically impressive and still feel forgettable.",
    body: "We care about the feeling. The first screenshot. The first click. The first five seconds. Every project needs an identity strong enough to be remembered.",
  },
  {
    title: "Tools",
    kicker:
      "We use the newest tools, AI-assisted workflows, game engines, analytics, and production systems to build smarter.",
    body: "Not because it sounds futuristic. Because it makes the games better.",
  },
  {
    title: "Polish",
    kicker: "Players can feel polish instantly.",
    body: "Movement, menus, sounds, effects, feedback, pacing, visuals — every detail either adds to the experience or gets cut.",
  },
];

/** Closing kicker — two declarative statements before the CTA strip. */
export const kicker = {
  body: "We don't build games to sit quietly on a server. We build games that attract players, hold attention, generate reactions, and create worlds people want to return to.",
  lines: [
    "If it feels average, it doesn't ship.",
    "Good ideas are common. Execution is rare.",
  ],
} as const;

/** CTA strip near the footer — last conversion attempt. */
export const ctaStrip = {
  eyebrow: "— Want to build with us? —",
  headline: "Briefs welcome.",
  body: "Players, partners, press — if you've got something worth building, we want to hear it.",
  cta: { label: "Get in touch", href: "/contact" },
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

/**
 * Founder card data. Used on the Contact page above the email block
 * so visitors can see who they'll actually be talking to.
 */
export const founder = {
  name: "Jalo Tuomi",
  role: "Founder & CEO",
  pitch:
    "I started JaloGames to build the kind of games I wanted to play — and to ship them faster than the industry says is possible. If you've got something worth building, talk to me directly.",
  photo: "/contact/jalo-tuomi.jpg",
  linkedin: "https://www.linkedin.com/in/jalotuomi/",
} as const;

/**
 * Studio-wide social profiles. Render order matters — first one is the
 * priority pick. Used in the footer and added to JSON-LD `sameAs`.
 */
export const social: { label: string; href: string }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/jalo-games-oy",
  },
  // Add MobyGames, GitHub org, YouTube, Discord etc. as they come online.
];
