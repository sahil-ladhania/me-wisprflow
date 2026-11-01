import { easeThrottle, stopAt } from "./scroll";

// The throttle and the brake: short, smooth rides between stops. The page scrolls on its own, the
// lane sees the scroll and rides the bike (and revs the engine) exactly as it does for a visitor's
// own scrolling. Any scroll of their own (wheel, touch, keys) takes over at once.

type Ride = { frame: number; target: number };

let ride: Ride | null = null;

/** How far into a stop counts as "reading it": the brake goes back to its start, not the stop before. */
const INTO_STOP = 1 / 3;

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Each stop's top, in document px, with the very bottom of the page (the mountains) last. */
function marks(): number[] {
  const tops = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]")).map(
    (section) => Math.round(section.getBoundingClientRect().top + window.scrollY),
  );
  const bottom = document.documentElement.scrollHeight - window.innerHeight;
  return [...tops.filter((top) => top < bottom - 2), bottom];
}

const INTERRUPTS = ["wheel", "touchstart", "mousedown"] as const;

function stopListening() {
  for (const type of INTERRUPTS) window.removeEventListener(type, takeOver);
  window.removeEventListener("keydown", takeOverByKey);
}

function end() {
  if (!ride) return;
  cancelAnimationFrame(ride.frame);
  ride = null;
  stopListening();
  document.documentElement.style.removeProperty("scroll-snap-type");
}

function takeOver(event: Event) {
  // Presses on the ride's own controls are handled by them.
  if (event.target instanceof Element && event.target.closest("[data-ride-control]")) return;
  end();
}

function takeOverByKey(event: KeyboardEvent) {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") end();
}

/** Ride the page to `y`: pull away, cruise, brake. About a second, a little more for long stretches. */
function rideTo(y: number) {
  end();
  const from = window.scrollY;
  const distance = y - from;
  if (Math.abs(distance) < 2) return;
  if (reduceMotion()) {
    window.scrollTo({ top: y, behavior: "instant" });
    return;
  }
  // Soft snap would tug the page back towards the stop it's leaving; it comes back at the end.
  document.documentElement.style.setProperty("scroll-snap-type", "none");
  const duration = Math.min(1800, Math.max(900, 650 + Math.abs(distance) * 0.35));
  const start = performance.now();
  const step = (now: number) => {
    if (!ride) return;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + distance * easeThrottle(t), behavior: "instant" });
    if (t < 1) ride.frame = requestAnimationFrame(step);
    else end();
  };
  ride = { frame: requestAnimationFrame(step), target: y };
  for (const type of INTERRUPTS) window.addEventListener(type, takeOver, { passive: true });
  window.addEventListener("keydown", takeOverByKey);
}

/** The throttle: on to the next stop (or, pressed again mid-ride, the one after). */
export function rideToNextStop() {
  const stops = marks();
  const from = ride ? ride.target : window.scrollY;
  const here = stopAt(stops, from + 2);
  const target = stops[Math.min(here + 1, stops.length - 1)];
  if (target > from + 2) rideTo(target);
}

/**
 * The brake. Mid-ride it stops the bike where it is. Standing at a stop it rolls back one stop;
 * a good way into a long stop, it goes back to that stop's start first.
 */
export function brake() {
  if (ride) {
    end();
    return;
  }
  const stops = marks();
  const y = window.scrollY;
  const here = stopAt(stops, y + 2);
  const into = y - stops[here];
  rideTo(into > window.innerHeight * INTO_STOP ? stops[here] : stops[Math.max(0, here - 1)]);
}

/** Whether a throttle or brake ride is under way. */
export function riding(): boolean {
  return ride !== null;
}
