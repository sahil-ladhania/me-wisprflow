import type { MilestoneKind } from "@/components/ds/Milestone";

// The road map: one entry per stop, in order. The lane, the route card and the stop counter read
// it; each stop's copy lives in its own component (components/ride/stops/).

export type RideStop = {
  index: number;
  /** URL fragment: /#the-bike. */
  anchor: string;
  /** Route-card and screen-reader name. */
  name: string;
  /** Route-card left column. */
  short: string;
  kicker: string;
  milestone: { cap: string; year: string; kind?: MilestoneKind };
  /** The June 2025 stop: night theme, the quietest idle, no jokes in its line. */
  night?: boolean;
  /** Arrives through smoke instead of ink: into and out of the Night stop. */
  smoke?: boolean;
};

export const stops: readonly RideStop[] = [
  { index: 0, anchor: "start", name: "Start", short: "START", kicker: "The Ride · 2016 → 2026", milestone: { cap: "START", year: "2016" } },
  { index: 1, anchor: "2016", name: "The stage and the kitchen", short: "2016", kicker: "Stop 01 · 2016 · Class 9", milestone: { cap: "CLASS 9", year: "2016" } },
  { index: 2, anchor: "the-stream", name: "The wrong reason", short: "CL 10", kicker: "Stop 02 · After Class 10 · Picking a stream", milestone: { cap: "STREAM", year: "CL 10" } },
  { index: 3, anchor: "the-bike", name: "The bike", short: "BIKE", kicker: "Stop 03 · Class 10 results · The deal", milestone: { cap: "THE BIKE", year: "80%" } },
  { index: 4, anchor: "2018", name: "Full throttle", short: "2018", kicker: "Stop 04 · 2018 · Class 11–12", milestone: { cap: "CLASS 11", year: "2018" } },
  { index: 5, anchor: "the-terrace", name: "The terrace talk", short: "CL 12", kicker: "Stop 05 · After Class 12 · Our terrace", milestone: { cap: "TERRACE", year: "CL 12" } },
  { index: 6, anchor: "college", name: "The hardest no", short: "BBA", kicker: "Stop 06 · Christ University · 2021–24", milestone: { cap: "CHRIST", year: "2021" } },
  { index: 7, anchor: "2am", name: "2am, Zomato and code", short: "2021", kicker: "Stop 07 · 2021 · 2:00 am", milestone: { cap: "2 AM", year: "2021" } },
  { index: 8, anchor: "not-average", name: "Not average", short: "2024", kicker: "Stop 08 · After college · Not average", milestone: { cap: "AFTER BBA", year: "2024" } },
  { index: 9, anchor: "june-2025", name: "June 2025", short: "JUN 25", kicker: "Stop 09 · June 2025", milestone: { cap: "JUNE", year: "2025" }, night: true, smoke: true },
  { index: 10, anchor: "the-rebuild", name: "The rebuild", short: "AUG 25", kicker: "Stop 10 · August 2025 → · The rebuild", milestone: { cap: "AUG", year: "2025" }, smoke: true },
  { index: 11, anchor: "zomato", name: "Zomato wrote back", short: "JUL 26", kicker: "Stop 11 · July 2026 · Zomato wrote back", milestone: { cap: "ZOMATO", year: "2026" } },
  { index: 12, anchor: "wispr-flow", name: "Wispr Flow India", short: "NEXT", kicker: "Stop 12 · Next · Wispr Flow India", milestone: { cap: "WISPR FLOW", year: "NEXT", kind: "next" } },
  { index: 13, anchor: "garage", name: "The garage", short: "END", kicker: "Road’s end · The garage", milestone: { cap: "GARAGE", year: "2026", kind: "now" } },
];

export const lastStop = stops.length - 1;

/** Numbered stops, between the hero and the garage. */
export const numberedStops = lastStop - 1;

export const titleId = (stop: RideStop) => `${stop.anchor}-title`;

/** The lane's counter label for a stop. The hero has none: the bike and the route card say it. */
export function counterLabel(index: number): string {
  if (index >= lastStop) return "Road’s end";
  return `Stop ${String(index).padStart(2, "0")} / ${numberedStops}`;
}

/** What a screen reader hears on arrival. */
export function arrivalAnnouncement(index: number): string {
  const stop = stops[index];
  if (index <= 0) return "";
  if (index >= lastStop) return `Road’s end: ${stop.name}.`;
  return `Stop ${index} of ${numberedStops}: ${stop.name}.`;
}
