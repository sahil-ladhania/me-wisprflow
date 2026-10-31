import { Barlow_Condensed, Kalam, Newsreader } from "next/font/google";
import localFont from "next/font/local";

// The design system's three voices, self-hosted by next/font. Each one sets a CSS variable that
// app/styles/tokens.css puts at the front of --font-story, --font-road and --font-hand.
// latin-ext carries the rupee sign (₹), which the plain latin subset doesn't.

/** The journal: titles, story copy, the italic aside. */
export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

/** The road: milestones, signboards, kickers and every number. */
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
});

/**
 * Barlow Condensed has no rupee sign, so ₹20,000 would borrow the system font's. This face is
 * Roboto Condensed's latin-ext file (Apache 2.0), limited to U+20B9 and placed first in the road
 * stack: the browser uses it for ₹ and nothing else, and downloads it only when a ₹ appears.
 * Not a fourth voice, just a condensed ₹.
 */
const roadRupee = localFont({
  src: "./fonts/roboto-condensed-latin-ext.woff2",
  weight: "100 900",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

/**
 * Just the face's family name, without next/font's Arial stand-in: placed first in the stack, the
 * stand-in would catch every letter. app/layout.tsx sets it as --font-road-rupee.
 */
export const roadRupeeFamily = roadRupee.style.fontFamily.split(",")[0].trim();

/** The hand: red-pen corrections and margin notes. */
export const kalam = Kalam({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-kalam",
});
