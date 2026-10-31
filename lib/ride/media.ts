// Everything the page still needs from Sahil, in one place. Fill a field in and its labelled
// placeholder on the page is replaced by the real thing; leave it empty and the placeholder stays.
// Put files in public/media/ and write their paths here starting with /media/.

/** Real photos only: warm, unfiltered. JPG or WebP, around 1600px on the long side. */
export const photos: Record<"dance" | "bike" | "pastaStall", string | undefined> = {
  /** Stop 01: me dancing on the school stage. e.g. "/media/photos/dance.jpg" */
  dance: undefined,
  /** Stop 03: the black bike (4:3 works best). */
  bike: undefined,
  /** Stop 06: the pasta stall at the college fest. */
  pastaStall: undefined,
};

/** Scans of real objects. Crop to the line that matters; blur other people's names and details. */
export const scans: Record<"certificate" | "waitlist", string | undefined> = {
  /** Stop 01: the cooking competition's first-prize certificate. */
  certificate: undefined,
  /** Stop 10: the lulu waitlist dashboard. */
  waitlist: undefined,
};

export type VoiceMedia = {
  /** 10–25 seconds, in your own voice. M4A (AAC) or MP3, mono is fine. e.g. "/media/voice/cafe.m4a" */
  src?: string;
  /** Length in seconds, so the time shows before the file loads. */
  duration?: number;
  /** What you say, word for word: "Read it instead". */
  transcript?: string;
  /** A short handwritten line under the player: "recorded on the bike, 2026". */
  where?: string;
};

export type VoiceKey = "cafe" | "june2025" | "lulu";

/** The three voice notes from the brief. Tapping "Hear this stop" in the lane plays the current one. */
export const voice: Record<VoiceKey, VoiceMedia> = {
  /** Stop 06: the cafe that almost happened. */
  cafe: {},
  /** Stop 09: June 2025. Quiet. */
  june2025: {},
  /** Stop 10: lulu, and why voice. */
  lulu: {},
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

/** Stop 11: three growth experiments for Wispr Flow India, written by Sahil. */
export const experiments: [ExperimentText, ExperimentText, ExperimentText] = [{}, {}, {}];

/** The garage's links. */
export const contact: { linkedin?: string; email?: string } = {};

/** Real Wispr Flow mishearings from building this site, verbatim: what it typed, then what was said. */
export const bloopers: { heard: string; said: string }[] = [{ heard: "rolling field", said: "Royal Enfield" }];

/** Set to true once the list above has every blooper you want to show. */
export const bloopersComplete = false;
