import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jalo Games — Independent Game Studio · Helsinki";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetch Cormorant Garamond from Google Fonts for the OG card.
 *  Falls back to the bundled default face if the fetch fails. */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap",
      { headers: { "User-Agent": "Mozilla/4.0" } } // old UA → TTF urls
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const serif = await loadSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c0a08",
          backgroundImage:
            "radial-gradient(90% 70% at 50% 115%, rgba(194,161,94,0.14), transparent 60%)",
          color: "#ece5d8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: serif ? "Cormorant" : "serif",
          position: "relative",
        }}
      >
        {/* The seam */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 40,
            bottom: 40,
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(194,161,94,0.5) 30%, rgba(194,161,94,0.5) 70%, transparent)",
          }}
        />

        <div
          style={{
            fontSize: 20,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "rgba(236,229,216,0.55)",
            marginBottom: 44,
            background: "#0c0a08",
            padding: "0 28px",
          }}
        >
          Independent Game Studio — Helsinki
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 34,
            fontSize: 172,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: -2,
            background: "#0c0a08",
            padding: "0 36px",
          }}
        >
          <span>Jalo</span>
          <span style={{ fontStyle: "italic" }}>Games</span>
        </div>

        <div
          style={{
            marginTop: 52,
            fontSize: 26,
            fontStyle: "italic",
            color: "rgba(236,229,216,0.6)",
            background: "#0c0a08",
            padding: "0 28px",
          }}
        >
          Small is the gate, and narrow the road.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 44,
            fontSize: 18,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(194,161,94,0.9)",
          }}
        >
          jalogames.fi
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Cormorant", data: serif, style: "normal" as const }]
        : undefined,
    }
  );
}
