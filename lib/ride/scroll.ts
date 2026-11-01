// Scroll → where the bike is on the road. A position is a stop index plus how far it has ridden
// towards the next one (2.4 = ridden 40% of the way from stop 2 to stop 3).

/** The bike waits at each milestone while the first part of the stop is read, then rides. */
export const HOLD = 0.55;

/** Where in the viewport counts as "here", from the top. */
export const READING_LINE = 0.45;

/** Road speed cap, in stops per second: a fast flick never makes the bike teleport. */
export const MAX_SPEED = 1.25;

/** When the bike is far behind (a route-card jump), it closes this share of the gap per second. */
export const CATCH_UP = 2;

/** Road dash travel per stop, in px (one dur-ride of rd-road). */
export const ROAD_PER_STOP = 640;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Pull away slowly, cruise, brake into the next milestone. */
export const easeThrottle = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Which stop a document y falls in, from each stop's top (document px). */
export function stopAt(tops: readonly number[], y: number): number {
  let index = 0;
  for (let k = 0; k < tops.length; k++) if (tops[k] <= y) index = k;
  return index;
}

/** The position the scroll asks for, from each stop's top (document px) and the reading line. */
export function targetPosition(tops: readonly number[], line: number): number {
  const index = stopAt(tops, line);
  if (index >= tops.length - 1) return index;
  const span = tops[index + 1] - tops[index];
  const read = span > 0 ? (line - tops[index]) / span : 0;
  return index + easeThrottle(clamp01((read - HOLD) / (1 - HOLD)));
}

/** Which stop the reading line is in, and how far through it (0–1, not eased). */
export function readingProgress(tops: readonly number[], line: number): { index: number; read: number } {
  const index = stopAt(tops, line);
  if (index >= tops.length - 1) return { index, read: 0 };
  const span = tops[index + 1] - tops[index];
  return { index, read: span > 0 ? clamp01((line - tops[index]) / span) : 0 };
}

/**
 * Stops per second for a given gap: the cruising cap for normal scrolling, faster in proportion
 * when far behind, so a long jump settles in about two seconds without teleporting.
 */
export function rideSpeed(gap: number): number {
  return Math.max(MAX_SPEED, Math.abs(gap) * CATCH_UP);
}

/** Moves towards the target, never faster than maxStep. */
export function approach(current: number, target: number, maxStep: number): number {
  const delta = target - current;
  return Math.abs(delta) <= maxStep ? target : current + Math.sign(delta) * maxStep;
}

/**
 * Which milestone stands on the road and where: offset 0 is just ahead of the front wheel,
 * 1 is the lane's right edge (rolling in), −1 is gone past the bike to the left.
 */
export function laneStone(position: number, last: number): { stop: number; offset: number } {
  const index = Math.floor(position);
  const ridden = position - index;
  if (index >= last) return { stop: last, offset: 0 };
  if (index === 0) return { stop: 1, offset: 1 - ridden };
  if (ridden === 0) return { stop: index, offset: 0 };
  if (ridden < 0.5) return { stop: index, offset: -ridden / 0.5 };
  return { stop: index + 1, offset: (1 - ridden) / 0.5 };
}
