import { Barlow_Condensed, Kalam, Newsreader } from "next/font/google";
import localFont from "next/font/local";

// The design system's three voices, self-hosted by next/font. Each one sets a CSS variable that
// app/styles/tokens.css puts at the front of --font-story, --font-road and --font-hand.
// `subsets` only picks what gets preloaded: every subset stays in the CSS behind its unicode-range.
// Only latin is needed. The one character the copy uses from beyond it is ₹, and each voice gets its
// ₹ from a tiny face of its own (below), so the latin-ext files (about 180 KB together) never download.

/** The journal: titles, story copy, the italic aside. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

/** The road: milestones, signboards, kickers and every number. */
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
});

/** The hand: red-pen corrections and margin notes. */
export const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
});

// ₹ faces. Each is limited to U+20B9 and placed first in its voice's stack, so the browser uses it
// for ₹ and nothing else, and downloads it only when a ₹ appears. Not extra voices, just the sign.
// (next/font only reads literals, hence the repeated declarations.)

/** Newsreader's own ₹ (Google Fonts, OFL), both styles, with the weight and optical-size axes. */
const storyRupee = localFont({
  src: [
    { path: "./fonts/newsreader-rupee.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-italic-rupee.woff2", weight: "200 800", style: "italic" },
  ],
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

/**
 * Barlow Condensed has no ₹ at all, so the road borrows Roboto Condensed's (its latin-ext file,
 * Apache 2.0): a condensed ₹ that sits with Barlow's figures.
 */
const roadRupee = localFont({
  src: "./fonts/roboto-condensed-latin-ext.woff2",
  weight: "100 900",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

/** Kalam's own ₹ (Google Fonts, OFL), in the two weights the hand uses. */
const handRupee = localFont({
  src: [
    { path: "./fonts/kalam-400-rupee.woff2", weight: "400", style: "normal" },
    { path: "./fonts/kalam-700-rupee.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

/**
 * Just a face's family name, without next/font's Arial stand-in: placed first in the stack, the
 * stand-in would catch every letter. app/layout.tsx sets these as --font-{story,road,hand}-rupee.
 */
const family = (font: { style: { fontFamily: string } }) => font.style.fontFamily.split(",")[0].trim();

export const rupeeFamilies = {
  "--font-story-rupee": family(storyRupee),
  "--font-road-rupee": family(roadRupee),
  "--font-hand-rupee": family(handRupee),
};
