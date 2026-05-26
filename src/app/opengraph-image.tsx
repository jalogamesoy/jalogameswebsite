import { ImageResponse } from "next/og";
import { studio } from "@/content/site";

export const runtime = "edge";

export const alt = `${studio.name} — Next-Generation Game Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph image used when someone shares the homepage or
 * any route that doesn't define its own opengraph-image. Renders the
 * wordmark + tagline on the brand-navy background with an accent glow.
 *
 * Game detail pages override this via their own metadata.openGraph
 * .images (set to the game's card.png in [slug]/page.tsx).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at top, rgba(245,148,74,0.18), transparent 55%), #070b1f",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9aa3c7",
            marginBottom: 32,
          }}
        >
          — Next-Generation Game Studio —
        </div>

        {/* Wordmark — stacked JALO / GAMES, big and confident */}
        <div
          style={{
            fontSize: 168,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 0.9,
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Jalo</span>
          <span style={{ color: "#f5944a" }}>Games</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            color: "#9aa3c7",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {studio.tagline}
        </div>

        {/* Bottom-right accent */}
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 80,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#5e6896",
          }}
        >
          jalogames.fi
        </div>
      </div>
    ),
    { ...size }
  );
}
