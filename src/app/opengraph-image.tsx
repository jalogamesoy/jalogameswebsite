import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jalo Games — Christian Mobile Games · Helsinki";
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
          background: "#fbf7f0",
          backgroundImage:
            "radial-gradient(70% 60% at 50% -8%, rgba(194,161,94,0.28), rgba(251,247,240,0) 65%), radial-gradient(85% 60% at 50% 118%, rgba(214,95,51,0.14), rgba(251,247,240,0) 60%)",
          color: "#33281a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: serif ? "Cormorant" : "serif",
          position: "relative",
        }}
      >
        {/* The seam of light */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: 150,
            width: 2,
            background:
              "linear-gradient(to bottom, rgba(169,132,67,0.85), rgba(169,132,67,0))",
          }}
        />

        <div
          style={{
            fontSize: 21,
            letterSpacing: 9,
            textTransform: "uppercase",
            color: "rgba(51,40,26,0.55)",
            marginBottom: 40,
          }}
        >
          Jalo Games — Helsinki, Finland
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 104,
            lineHeight: 1.06,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>We make</span>
            <span style={{ fontStyle: "italic", color: "#a98443" }}>
              Christian
            </span>
          </div>
          <span>mobile games.</span>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 25,
            fontStyle: "italic",
            color: "rgba(51,40,26,0.55)",
          }}
        >
          Small is the gate, and narrow the road. — Mt 7:14
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 42,
            fontSize: 17,
            letterSpacing: 7,
            textTransform: "uppercase",
            color: "rgba(169,132,67,0.95)",
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
