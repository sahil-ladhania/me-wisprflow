import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BikeArt } from "@/components/ds/BikeArt";

// The link preview on LinkedIn, X, WhatsApp and email: the hero, the road and the first milestone.
// It keeps "For Wispr Flow · India growth" in the corner, for context the page itself no longer needs.

export const alt = "Sahil Ladhania. Obsession beats IQ. A ride through 2016 to 2026, on a black bike, for Wispr Flow India growth.";
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
const wave = "#867d6e";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f3eee4", color: ink }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 72px 0", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "Newsreader", fontSize: 38, fontWeight: 500 }}>Sahil Ladhania</span>
            <span
              style={{
                fontFamily: "Barlow Condensed",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: pencil,
              }}
            >
              For Wispr Flow · India growth
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontFamily: "Newsreader", fontSize: 128, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
            Obsession beats IQ.
          </div>
          <div style={{ display: "flex", marginTop: 24, maxWidth: 940, fontFamily: "Newsreader", fontSize: 36, fontStyle: "italic", lineHeight: 1.3 }}>
            Whatever I love, I go all in. Dance, food, code, people. Next: growing Wispr Flow in India.
          </div>
        </div>

        {/* The road: a ground line and the dashed centre line under it, the bike parked at 21% with
            Sahil on it (lamp off: the engine waits for the visitor), the first milestone ahead. */}
        <div style={{ display: "flex", position: "relative", height: 226 }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, height: 2, background: wave }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", gap: 36 }}>
            {Array.from({ length: 22 }, (_, i) => (
              <div key={i} style={{ width: 28, height: 2, background: wave }} />
            ))}
          </div>
          <BikeArt idPrefix="og" width={304} height={190} style={{ position: "absolute", left: 250, bottom: 32 }} />
          <div
            style={{
              position: "absolute",
              left: 516,
              bottom: 36,
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
              bottom: 52,
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
