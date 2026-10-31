import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The link preview on LinkedIn, X, WhatsApp and email: the hero, the road and the first milestone.

export const alt = "Engine’s off. Sahil Ladhania’s ride through 2016 to 2026, on a black bike.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The design system's fonts as TTF (the image renderer can't read the site's WOFF2 files).
// Until they're in assets/og/, the image falls back to Next.js's built-in font.
async function font(file: string) {
  try {
    return await readFile(join(process.cwd(), "assets/og", file));
  } catch {
    return null;
  }
}
const [story, storyItalic, road] = await Promise.all([
  font("Newsreader-Medium.ttf"),
  font("Newsreader-Italic.ttf"),
  font("BarlowCondensed-SemiBold.ttf"),
]);
const fonts = [
  story && { name: "Newsreader", data: story, weight: 500 as const, style: "normal" as const },
  storyItalic && { name: "Newsreader", data: storyItalic, weight: 400 as const, style: "italic" as const },
  road && { name: "Barlow Condensed", data: road, weight: 600 as const, style: "normal" as const },
].filter((f) => f !== null);

const ink = "#17140f";
const pencil = "#5c554a";
const rule = "#d6ccba";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f3eee4", color: ink }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 72px 0", flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Barlow Condensed",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: pencil,
            }}
          >
            <span>Sahil Ladhania · The Ride</span>
            {/* An en dash, not the site's →: Barlow has no arrow, and a borrowed glyph throws the line height off. */}
            <span>2016–2026 · For Wispr Flow India</span>
          </div>
          <div style={{ display: "flex", marginTop: 52, fontFamily: "Newsreader", fontSize: 132, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
            Engine’s off.
          </div>
          <div style={{ display: "flex", marginTop: 26, maxWidth: 820, fontFamily: "Newsreader", fontSize: 38, fontStyle: "italic", lineHeight: 1.3 }}>
            Every portfolio today asked you to scroll. This one wants you to talk.
          </div>
        </div>

        {/* The road: two hairlines and a dashed centre line, the bike parked at 22%, the first milestone ahead. */}
        <div style={{ display: "flex", position: "relative", height: 170 }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, height: 58, borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, display: "flex", gap: 36 }}>
            {Array.from({ length: 22 }, (_, i) => (
              <div key={i} style={{ width: 28, height: 3, background: "#867d6e" }} />
            ))}
          </div>
          <svg
            style={{ position: "absolute", left: 250, bottom: 32 }}
            width="230"
            height="144"
            viewBox="0 0 240 150"
            fill="none"
            stroke={ink}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="50" cy="114" r="29" strokeWidth="7" />
            <circle cx="192" cy="114" r="29" strokeWidth="7" />
            <path d="M16 104a36 36 0 0 1 56-26" strokeWidth="5" />
            <path d="M166 90a36 36 0 0 1 58 14" strokeWidth="5" />
            <path d="M192 114 172 52" strokeWidth="6" />
            <path d="M50 114 104 106" strokeWidth="6" />
            <path d="M104 90 84 72l76-4-18 26" strokeWidth="5" />
            <rect x="96" y="86" width="46" height="30" rx="5" fill={ink} strokeWidth="2" />
            <path d="M104 120 34 128" strokeWidth="5" />
            <path d="M112 68c6-16 44-18 54-6l-6 10-48 2z" fill={ink} strokeWidth="2" />
            <path d="M70 70l42-2-2 8-36 2z" fill={ink} strokeWidth="2" />
            <circle cx="181" cy="55" r="8" fill={ink} strokeWidth="2" />
            <path d="M164 41l11 6-13 6" strokeWidth="4" />
            <circle cx="119" cy="16" r="11" fill={ink} stroke="none" />
            <path d="M114 31 100 64" strokeWidth="16" />
            <path d="M112 37l28 9 23-2" strokeWidth="7" />
            <path d="M100 66l30 8-2 30" strokeWidth="10" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 500,
              bottom: 62,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 66,
              height: 98,
              border: `2px solid ${ink}`,
              borderRadius: "33px 33px 3px 3px",
              background: "#fbf8f2",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", width: "100%", height: 40, background: "#e2a532", borderBottom: `2px solid ${ink}` }} />
            <div style={{ display: "flex", marginTop: 12, fontFamily: "Barlow Condensed", fontSize: 26, fontWeight: 600 }}>2016</div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 72,
              bottom: 62,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px",
              borderRadius: 8,
              background: "#1d5a44",
              color: "#f7f3ea",
              border: "6px solid #1d5a44",
              outline: "2px solid #f7f3ea",
              outlineOffset: -8,
              fontFamily: "Barlow Condensed",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Say “let’s ride”
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
