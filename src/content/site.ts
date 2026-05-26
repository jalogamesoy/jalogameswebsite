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
 * Credibility stats — appear on the Studio page (and previously seeded
 * the marquee). Update freely as the numbers grow; each one is a hard
 * receipt against the "we make games people actually play" claim.
 */
export type StudioStat = {
  value: string;
  label: string;
};

export const studioStats: StudioStat[] = [
  { value: "5 000+", label: "Followers in Fortnite" },
  { value: "4 000+", label: "TikTok & YouTube followers" },
  { value: "12M+", label: "Minutes played across our games" },
];

/**
 * Production-craft showcase items on the Studio page. Each step in
 * the "concept → ship" pipeline gets a hero image (from our actual
 * Blender / Unreal work, not stock).
 */
export type CraftItem = {
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export const craft: CraftItem[] = [
  {
    title: "Characters",
    caption:
      "Original heroes and villains — modeled, textured, and rigged in-house. Every face has to read on a phone screen and a Fortnite billboard.",
    image: "/studio/blender-wolf.png",
    imageAlt:
      "Wolf enemy from Ramba Bull modeled and textured in Blender",
  },
  {
    title: "Animation",
    caption:
      "Custom rigs and keyframed animation that move with weight. We don't ship mocap libraries — we ship intention.",
    image: "/studio/blender-grace.png",
    imageAlt:
      "Grace Run protagonist rigged and posed for animation in Blender",
  },
  {
    title: "Environments",
    caption:
      "Modular world-building — props and architecture that snap into level layouts at production speed without breaking visual cohesion.",
    image: "/studio/blender-houses.png",
    imageAlt:
      "Stealin Apples orchard houses and props modeled in Blender",
  },
];

/**
 * FAQ questions and answers. Tilted at brand-marketing buyers (the
 * commercial engine) but written in plain language anyone can read.
 * Each question is rendered both as visible content AND inside a
 * FAQPage JSON-LD block — AI search engines weight FAQPage schema
 * heavily, so this is one of the strongest GEO signals on the site.
 *
 * Numbers are honest-but-illustrative defaults. Edit freely as the
 * studio's actual averages evolve.
 */
export const faq: { question: string; answer: string }[] = [
  {
    question: "What kinds of projects does JaloGames take on?",
    answer:
      "Branded mobile games, Fortnite (UEFN) experiences, and HTML5 browser games for ambitious brands — plus our own original IP titles (three currently in active development).",
  },
  {
    question: "How fast can you ship a branded campaign?",
    answer:
      "Concept to playable in weeks, not quarters. A typical HTML5 brand campaign ships in 4–8 weeks; a Fortnite UEFN experience in 6–12. Tight briefs go faster; deeper integrations take longer.",
  },
  {
    question: "What's the rough budget range?",
    answer:
      "Most brand projects land between €15K and €100K depending on scope, platform, and timeline. Send us the brief and we'll come back with concrete numbers and trade-offs within one working day.",
  },
  {
    question: "Who owns the IP at the end of a project?",
    answer:
      "You do. Brand campaigns are work-for-hire — all assets, code, and final deliverables transfer to the client on delivery. Our own original IP (Ramba Bull, Grace Run, Stealin Apples) stays with JaloGames.",
  },
  {
    question: "Do you sign NDAs and handle confidential briefs?",
    answer:
      "Yes, always. Send your NDA in your first message — we'll have it signed the same day and move into the brief immediately after.",
  },
  {
    question: "What does the workflow actually look like?",
    answer:
      "One Slack channel from kickoff to launch. Weekly check-ins, fortnightly playable builds, a public reviewer link from week one. Clear creative direction, fast iteration, no design-by-committee.",
  },
  {
    question: "Where are you based and do you work internationally?",
    answer:
      "Helsinki, Finland — fully remote-friendly. We work with brands across Europe and North America. English is our default working language.",
  },
  {
    question: "What engines and tools does the studio use?",
    answer:
      "Unreal Engine 5 (Fortnite UEFN and standalone), Godot (mobile and standalone), and HTML5 / Canvas for instant-load browser games. Production pipeline runs on Blender, Substance, and AI-assisted workflows where they genuinely make the games better.",
  },
  {
    question: "Can you maintain a game after launch?",
    answer:
      "Yes. We offer post-launch support packages — updates, live-ops, performance tuning, content drops. Scope and cost depend on platform and audience size.",
  },
  {
    question: "How do we get started?",
    answer:
      "Email jalo@jalogames.fi with the brief format on our contact page. We reply within one working day with first thoughts, initial scope, and a call invite.",
  },
];

/**
 * Belief cards on the Studio page — short principles that frame how
 * the studio actually operates day-to-day. Punchier than the homepage
 * Process pillars because they sit on a more committed page.
 */
export const principles: { title: string; body: string }[] = [
  {
    title: "Taste over template",
    body: "We design from scratch. No asset flips, no template engines, no UI kits dressed up as games.",
  },
  {
    title: "Speed without rushing",
    body: "Modern tools, lean teams, ruthless prioritisation. We ship in weeks because we removed the steps that don't matter.",
  },
  {
    title: "Polish is the product",
    body: "Movement, audio, pacing, feedback — players feel polish before they read words. Every detail earns its place.",
  },
  {
    title: "Built to spread",
    body: "Games that generate clips, reactions, and word of mouth. Designed for the moment players show their friends.",
  },
];

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
