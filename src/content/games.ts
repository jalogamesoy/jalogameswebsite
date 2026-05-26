// Single source of truth for the three games. Swap copy/URLs as you
// (the user) write the real text. Detail pages, the homepage grid, and
// the sitemap all read from this array.

export type GameSocials = {
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
};

export type GameStoreLink = {
  label: string; // "Wishlist on Steam", "Play on itch.io", etc.
  href: string;
};

export type Game = {
  slug: string;
  order: number; // 1, 2, 3 — controls homepage card order + Prev/Next nav
  title: string;
  subtitle: string; // "Action Platformer" etc.
  pitch: string; // 50-80 words, placeholder until you write real copy
  platforms: string[];
  releaseWindow: string; // "In Development" | "Q2 2026" | "Released"
  /**
   * Pre-composed card image for the homepage / games index. Beautiful
   * but heavy — has the title, "IN DEVELOPMENT" pill, and CTA baked in.
   * If null, the GameCard component falls back to a CSS-built card using
   * the first screenshot. (Stealin Apples currently falls back until
   * the corrected card art lands.)
   */
  cardImage: string | null;
  /** Screenshots paths relative to /public, in display order. */
  screenshots: string[];
  /** Optional hero video. Gitignored locally — host on Vercel Blob/Mux
   * before enabling in Phase 2C hover-preview. Leave undefined until then. */
  heroVideo?: string;
  /** Optional menu/ambient audio. Same hosting note as heroVideo. */
  ambientAudio?: string;
  /** Per-game accent colors used on the detail page only. */
  accent: { warm: string; cool: string };
  /** Per-game social handles. Only render if present. */
  socials?: GameSocials;
  /** Store / wishlist / Discord / press kit links. */
  storeLinks: GameStoreLink[];
};

export const games: Game[] = [
  {
    slug: "ramba-bull",
    order: 1,
    title: "Ramba Bull",
    subtitle: "Action Platformer",
    pitch:
      "A side-scrolling action platformer where you brawl through vikings, giants, and armored airships across Nordic mountainsides. Bright, fast, and mobile-first — built for one-handed runs between meetings.",
    platforms: ["Mobile (iOS / Android)", "Browser (HTML5)"],
    releaseWindow: "In Development",
    cardImage: "/games/ramba-bull/card.png",
    screenshots: [
      "/games/ramba-bull/screenshot-1.png",
      "/games/ramba-bull/screenshot-2.png",
      "/games/ramba-bull/screenshot-3.png",
      "/games/ramba-bull/screenshot-4.png",
    ],
    // TODO Phase 2C: host these via Vercel Blob or Mux, then re-enable
    // heroVideo: "/games/ramba-bull/hero.mp4",
    // ambientAudio: "/games/ramba-bull/menu-audio.mp3",
    accent: { warm: "#e8a14b", cool: "#5b8a2d" },
    storeLinks: [],
  },
  {
    slug: "grace-run",
    order: 2,
    title: "Grace Run",
    subtitle: "Premium Endless Runner",
    pitch:
      "A premium 3D endless runner with a robed savior, sand-blasted ruins, and a lava chasm that does not negotiate. Minimalist, modern, replayable — and aware of itself in a way the genre usually isn't.",
    platforms: ["Mobile (iOS / Android)"],
    releaseWindow: "In Development",
    cardImage: "/games/grace-run/card.png",
    screenshots: [
      "/games/grace-run/screenshot-1.png",
      "/games/grace-run/screenshot-2.png",
      "/games/grace-run/screenshot-3.png",
    ],
    accent: { warm: "#e85a2c", cool: "#d9b682" },
    storeLinks: [],
  },
  {
    slug: "stealin-apples",
    order: 3,
    title: "Stealin Apples",
    subtitle: "Puzzle Adventure",
    pitch:
      "A pixel-art stealth puzzler about an orchard, a grumpy grandpa, and the noble art of fruit theft. Quick rounds, escalating risk, designed to spread. Charm dialed to maximum.",
    platforms: ["Mobile (iOS / Android)"],
    releaseWindow: "In Development",
    cardImage: "/games/stealin-apples/card.png",
    screenshots: [
      "/games/stealin-apples/screenshot-1.png",
      "/games/stealin-apples/screenshot-2.png",
      "/games/stealin-apples/screenshot-3.png",
    ],
    // TODO Phase 2C: host this via Vercel Blob or Mux, then re-enable
    // heroVideo: "/games/stealin-apples/hero.mp4",
    accent: { warm: "#c8362a", cool: "#3b8a3d" },
    socials: {
      // Replace with your real handles when ready.
      // tiktok: "https://www.tiktok.com/@stealinapples",
      // instagram: "https://www.instagram.com/stealinapples",
      // youtube: "https://www.youtube.com/@stealinapples",
    },
    storeLinks: [],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesInOrder(): Game[] {
  return [...games].sort((a, b) => a.order - b.order);
}
