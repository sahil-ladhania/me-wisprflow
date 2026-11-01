"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BikeLane, type LaneState } from "@/components/ds/BikeLane";
import { RideControls } from "@/components/ds/RideControls";
import { brake, rideToNextStop } from "@/lib/ride/drive";
import { engineRunning, parkEngine, setQuiet, setRevs, startEngine } from "@/lib/ride/engine-sound";
import { approach, HOLD, laneStone, MAX_SPEED, READING_LINE, readingProgress, rideSpeed, ROAD_PER_STOP, stopAt, targetPosition } from "@/lib/ride/scroll";
import { arrivalAnnouncement, counterLabel, lastStop, stops } from "@/lib/ride/stops";
import { useRide } from "./RideProvider";

/**
 * night: the stop showing through behind the road is the Night stop.
 * clear: on a phone, the hero's route card is passing behind the road.
 * atEnd: the very bottom of the page, the mountains sign: the bike parks there.
 */
type View = { stop: number; stone: number; moving: boolean; mini: boolean; clear: boolean; night: boolean; atEnd: boolean };

const START: View = { stop: 0, stone: 1, moving: false, mini: false, clear: false, night: false, atEnd: false };

/** On phones, a stop this many screens tall or more counts as long (the bike steps aside while it's read). */
const LONG_STOP = 1.4;

/** How far into a long stop (in screens) the reader scrolls before the bike steps aside on a phone. */
const INTO_STOP = 0.15;

/** How long the fork dip lasts when the bike stops. */
const BRAKE_MS = 200;

/** How long the lever stays pulled, or the grip twisted, after a press or an arrow key. */
const PRESS_MS = 320;

/** Where the road is, in px up from the bottom of the screen: the stop under this point shows through it. */
const ROAD_LINE = 12;

/** The bike parks this close to the bottom of the page, and rides on again once it's this far back up. */
const PARK_AT = 3;
const UNPARK_AT = 80;

/** The tyre's diameter as a share of the drawing's width (70 of 320), for turning the wheels with the road. */
const TYRE = 70 / 320;

/**
 * The road, pinned to the bottom of the viewport and see-through: the bike stands on it over
 * whichever stop is behind it, and taps go straight through to that stop (except on the controls).
 * Scroll is the throttle: each frame writes --road-x, --stone-dx and --wheel-turn straight onto the
 * lane and tells the engine how hard the bike is riding; React only hears about it when the stop,
 * the stone, riding/idle, or the ground behind the road changes.
 */
export function Lane() {
  const { engine, igniting, exhaust, cycleExhaust, tapStart } = useRide();
  const wrap = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(START);
  const [braking, setBraking] = useState(false);
  const [pressed, setPressed] = useState<"throttle" | "brake" | null>(null);
  const engineOn = engine === "on";
  // The frame loop reads this, so the engine only hears about revs while it's actually on.
  const listening = useRef(false);
  useEffect(() => {
    listening.current = engineOn && !view.atEnd;
    if (!listening.current) setRevs(0);
  }, [engineOn, view.atEnd]);

  useEffect(() => {
    const lane = wrap.current;
    if (!lane) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The compact lane (phones, and phones held sideways), and the widths where the hero's card stacks.
    const phone = window.matchMedia("(max-width: 599px), (max-height: 500px)");
    const stacked = window.matchMedia("(max-width: 1023px)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
    const card = document.querySelector<HTMLElement>("[data-route-card]");

    let tops: number[] = [];
    let width = 0;
    let rest = 0;
    let stoneWidth = 54;
    let tyre = 60;
    let cardTop = 0;
    let cardBottom = 0;
    let shown: number | null = null;
    let frame = 0;
    let last = 0;
    let current: View = START;

    const step = (now: number) => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * READING_LINE;
      const goal = targetPosition(tops, line);
      const before = shown;
      const dt = Math.min(100, now - last) / 1000;
      if (shown === null || reduce) shown = reduce ? Math.round(goal) : goal;
      else shown = approach(shown, goal, dt * rideSpeed(goal - shown));
      last = now;
      const moving = before !== null && Math.abs(shown - before) > 1e-4;

      // On phones, the bike arrives at each stop, then steps aside once the reader scrolls into a long
      // stop's words, until it rides on. Never in the hero: ignition (the lamp, the pillion hopping
      // on) has to be seen.
      const { index, read } = readingProgress(tops, line);
      const span = (tops[index + 1] ?? document.documentElement.scrollHeight) - tops[index];
      const into = window.scrollY - tops[index];
      const mini = phone.matches && index > 0 && into > window.innerHeight * INTO_STOP && read < HOLD && span > window.innerHeight * LONG_STOP;
      // And in the hero, nothing on the road may sit on the route card while it passes.
      const bottom = window.scrollY + window.innerHeight;
      const clear = stacked.matches && card !== null && cardTop < bottom && cardBottom > bottom - lane.clientHeight;

      const gap = document.documentElement.scrollHeight - bottom;
      const atEnd = current.atEnd ? gap < UNPARK_AT : gap < PARK_AT;

      lane.style.setProperty("--road-x", `${(-shown * ROAD_PER_STOP).toFixed(1)}px`);
      // The wheels turn exactly as far as the road moves under them.
      lane.style.setProperty("--wheel-turn", `${(((shown * ROAD_PER_STOP) / (Math.PI * tyre)) * 360).toFixed(1)}deg`);
      const { stop: stone, offset } = laneStone(shown, lastStop);
      const dx = offset >= 0 ? offset * (width - rest + 8) : offset * (rest + stoneWidth + 24);
      lane.style.setProperty("--stone-dx", `${dx.toFixed(1)}px`);

      if (listening.current) {
        setRevs(moving && dt > 0 ? Math.abs(shown - (before ?? shown)) / dt / MAX_SPEED : 0);
        setQuiet(Boolean(stops[Math.round(shown)]?.night));
      }

      // The road takes its colours from the stop it's drawn over, not the one being read.
      const night = Boolean(stops[stopAt(tops, bottom - ROAD_LINE)]?.night);

      const next: View = { stop: Math.round(shown), stone, moving, mini, clear, night, atEnd };
      if ((Object.keys(next) as (keyof View)[]).some((key) => next[key] !== current[key])) {
        current = next;
        setView(next);
      }
      if (shown !== goal) frame = requestAnimationFrame(step);
      else if (current.moving) {
        current = { ...current, moving: false };
        setView(current);
        if (listening.current) setRevs(0);
      }
    };

    const kick = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const measure = () => {
      tops = sections.map((section) => section.getBoundingClientRect().top + window.scrollY);
      const stoneEl = lane.querySelector<HTMLElement>("[data-stone]");
      width = lane.clientWidth;
      rest = stoneEl?.offsetLeft ?? width * 0.6;
      stoneWidth = stoneEl?.offsetWidth ?? 54;
      tyre = (lane.querySelector<HTMLElement>("[data-bike]")?.clientWidth ?? 260) * TYRE;
      if (card) {
        const box = card.getBoundingClientRect();
        cardTop = box.top + window.scrollY;
        cardBottom = box.bottom + window.scrollY;
      }
      kick();
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // The final park at the mountains: key-click, the engine dies down, the lamp fades. Back up the
  // road, it starts again.
  useEffect(() => {
    if (!engineOn) return;
    if (view.atEnd) parkEngine();
    else if (!engineRunning()) startEngine();
  }, [engineOn, view.atEnd]);

  // The fork dips when the bike comes to a stop.
  const [wasMoving, setWasMoving] = useState(false);
  if (view.moving !== wasMoving) {
    setWasMoving(view.moving);
    if (!view.moving) setBraking(true);
  }
  useEffect(() => {
    if (!braking) return;
    const id = window.setTimeout(() => setBraking(false), BRAKE_MS);
    return () => clearTimeout(id);
  }, [braking]);

  useEffect(() => {
    if (!pressed) return;
    const id = window.setTimeout(() => setPressed(null), PRESS_MS);
    return () => clearTimeout(id);
  }, [pressed]);

  const throttle = useCallback(() => {
    setPressed("throttle");
    // The throttle doubles as a kick-start: an engine that's off starts first, then rides.
    if (!engineOn) tapStart();
    rideToNextStop();
  }, [engineOn, tapStart]);

  const brakeNow = useCallback(() => {
    setPressed("brake");
    brake();
  }, []);

  // → is the throttle, ← the brake. Up, down, Page keys and Space keep scrolling as usual.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      event.preventDefault();
      if (event.key === "ArrowRight") throttle();
      else brakeNow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [throttle, brakeNow]);

  const running = engineOn && !view.atEnd;
  let state: LaneState = running ? "idle" : "parked";
  if (view.moving) state = "riding";
  else if (braking) state = "braking";

  return (
    <div ref={wrap} className="pointer-events-none sticky bottom-0 z-20">
      <BikeLane
        scrub
        mini={view.mini}
        clear={view.clear}
        state={state}
        igniting={igniting}
        stone={stops[view.stone].milestone}
        stoneKey={view.stone}
        count={view.stop > 0 ? { label: counterLabel(view.stop), current: view.stop, total: lastStop } : undefined}
        headlamp={running}
        pillion={engineOn}
        night={view.night}
        controls={
          // Before ignition the hero has one call to action; the controls join from the first stop on.
          view.stop > 0 || engineOn ? (
            <RideControls onThrottle={throttle} onBrake={brakeNow} exhaust={exhaust} onExhaust={cycleExhaust} pressed={pressed} />
          ) : null
        }
      />
      <p className="sr-only" aria-live="polite">
        {view.moving ? "" : arrivalAnnouncement(view.stop)}
      </p>
    </div>
  );
}
