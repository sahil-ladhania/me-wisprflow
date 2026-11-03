import type { StaticImageData } from "next/image";
import coldEmail from "@/assets/media/scans/cold-email.jpg";
import tanayReply from "@/assets/media/scans/tanay-reply.jpg";
import waitlist from "@/assets/media/scans/waitlist.jpg";
import zomatoReply from "@/assets/media/scans/zomato-reply.jpg";

// Everything the page still needs from Sahil, in one place. Fill a field in and its labelled
// placeholder on the page is replaced by the real thing; leave it empty and the placeholder stays.
// Photos and videos: put files in public/media/ and write their paths here starting with /media/.
// Scans: put files in assets/media/scans/ and import them, so each one's shape comes with it.

/** Real photos only: warm, unfiltered. JPG or WebP, around 1600px on the long side. */
export const photos: Record<"dance" | "bike" | "trio" | "leCordonBleu" | "pastaStall", string | undefined> = {
  /** Stop 01: me dancing on the school stage. e.g. "/media/photos/dance.jpg" */
  dance: undefined,
  /** Stop 03: the black bike (4:3 works best). */
  bike: undefined,
  /** Stop 04: the trio, me and my two best friends. */
  trio: undefined,
  /** Stop 05: Le Cordon Bleu, Paris (4:3). Use a photo you're free to use, ideally without their logo. */
  leCordonBleu: undefined,
  /** Stop 06: the pasta stall at the college fest. */
  pastaStall: undefined,
};

/** Short silent loops: MP4 (H.264), 10–20 seconds, under about 4 MB. They play muted while on screen. */
export const videos: Record<"cooking", { src?: string; poster?: string }> = {
  /** Stop 06: me cooking in the kitchen. e.g. { src: "/media/video/cooking.mp4", poster: "/media/video/cooking.jpg" } */
  cooking: {},
};

/** Scans and screenshots of real things. Crop to the line that matters; blur email addresses and other people's names. */
export const scans: Record<"certificate" | "coldEmail" | "zomatoReply" | "waitlist" | "tanayReply", StaticImageData | undefined> = {
  /** Stop 01 · Scan 01: the cooking competition's first-prize certificate. */
  certificate: undefined,
  /** Stop 11 · Scan 03: my cold email to Deepinder Goyal (Jul 5, 2026), cropped below the search bar with his address. */
  coldEmail,
  /** Stop 11 · Scan 04: Zomato HR's reply (Jul 28, 2026), the engineering interview invite. The sender's name is blurred. */
  zomatoReply,
  /** Stop 10 · Scan 02: the lulu waitlist page. */
  waitlist,
  /** Stop 12 · Scan 05: Tanay's reply to my comment, on his YouTube video. */
  tanayReply,
};

export type ExperimentText = {
  /** Timing and cost: "Day 1–5 · ₹ small". */
  when?: string;
  /** The bet, in one line. */
  title?: string;
  /** Rooted in Indian users' behaviour. */
  insight?: string;
  move?: string;
  measure?: string;
  kill?: string;
};

/** Stop 12: three growth experiments for Wispr Flow India, written by Sahil. */
export const experiments: [ExperimentText, ExperimentText, ExperimentText] = [{}, {}, {}];

/** The garage's links. */
export const contact: { linkedin?: string; email?: string } = {};

/** Real Wispr Flow mishearings from building this site, verbatim: what it typed, then what was said. */
export const bloopers: { heard: string; said: string }[] = [{ heard: "rolling field", said: "Royal Enfield" }];

/** Set to true once the list above has every blooper you want to show. */
export const bloopersComplete = false;
