"use client";

import { useEffect, useRef, useState } from "react";
import { BikeLane, type LaneState } from "@/components/ds/BikeLane";
import { Icon } from "@/components/ds/Icon";
import { toggleVoiceNote } from "@/components/ds/VoiceNote";
import { voice } from "@/lib/ride/media";
import { approach, HOLD, laneStone, READING_LINE, readingProgress, rideSpeed, ROAD_PER_STOP, targetPosition } from "@/lib/ride/scroll";
import { arrivalAnnouncement, counterLabel, lastStop, stops, voiceId } from "@/lib/ride/stops";
import { useRide } from "./RideProvider";

type View = { stop: number; stone: number; moving: boolean; mini: boolean };

/** On phones, a stop this many screens tall or more counts as long (the lane shrinks while it's read). */
const LONG_STOP = 1.4;

/** How long the fork dip lasts when the bike stops. */
const BRAKE_MS = 200;

/**
 * The road, pinned to the bottom of the viewport. Scroll is the throttle: each frame writes
 * --road-x and --stone-dx straight onto the lane, and React only hears about it when the stop,
 * the stone, or riding/idle changes.
 */
export function Lane() {
  const { engine, igniting } = useRide();
  const wrap = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ stop: 0, stone: 1, moving: false, mini: false });
  const [braking, setBraking] = useState(false);

  useEffect(() => {
    const lane = wrap.current;
    if (!lane) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 599px)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));

    let tops: number[] = [];
    let width = 0;
    let rest = 0;
    let stoneWidth = 54;
    let shown: number | null = null;
    let frame = 0;
    let last = 0;
    let current: View = { stop: 0, stone: 1, moving: false, mini: false };

    const step = (now: number) => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * READING_LINE;
      const goal = targetPosition(tops, line);
      const before = shown;
      if (shown === null || reduce) shown = reduce ? Math.round(goal) : goal;
      else shown = approach(shown, goal, (Math.min(100, now - last) / 1000) * rideSpeed(goal - shown));
      last = now;

      // On phones, shrink the lane while the reader is inside a long stop, before the bike rides on.
      const { index, read } = readingProgress(tops, line);
      const span = (tops[index + 1] ?? document.documentElement.scrollHeight) - tops[index];
      const mini = phone.matches && read > 0.08 && read < HOLD && span > window.innerHeight * LONG_STOP;

      lane.style.setProperty("--road-x", `${(-shown * ROAD_PER_STOP).toFixed(1)}px`);
      const { stop: stone, offset } = laneStone(shown, lastStop);
      const dx = offset >= 0 ? offset * (width - rest + 8) : offset * (rest + stoneWidth + 24);
      lane.style.setProperty("--stone-dx", `${dx.toFixed(1)}px`);

      const next: View = { stop: Math.round(shown), stone, moving: before !== null && Math.abs(shown - before) > 1e-4, mini };
      if (next.stop !== current.stop || next.stone !== current.stone || next.moving !== current.moving || next.mini !== current.mini) {
        current = next;
        setView(next);
      }
      if (shown !== goal) frame = requestAnimationFrame(step);
      else if (current.moving) {
        current = { ...current, moving: false };
        setView(current);
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

  const night = Boolean(stops[view.stop]?.night);
  // A stop with a recorded voice note can be heard straight from the lane.
  const voiceKey = stops[view.stop]?.voice;
  const hearable = !view.moving && !view.mini && voiceKey && voice[voiceKey].src ? voiceKey : null;
  // In the garage the bike pulls off the road onto its stand: engine off, headlamp off.
  const parkedInGarage = view.stop === lastStop && !view.moving;
  let state: LaneState = engine === "on" && !parkedInGarage ? "idle" : "parked";
  if (view.moving) state = "riding";
  else if (braking) state = "braking";

  return (
    <div ref={wrap} className="sticky bottom-0 z-20">
      <BikeLane
        scrub
        mini={view.mini}
        state={state}
        igniting={igniting}
        stone={stops[view.stone].milestone}
        stoneKey={view.stone}
        count={{ label: counterLabel(view.stop, engine === "on"), current: view.stop, total: lastStop }}
        headlamp={engine === "on" && !parkedInGarage}
        night={night}
      />
      {hearable ? (
        <button
          type="button"
          onClick={() => toggleVoiceNote(voiceId(hearable))}
          className="type-kicker absolute left-1/2 top-2 z-30 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-pill border border-ink bg-card px-4 text-ink sm:left-8 sm:top-3 sm:translate-x-0"
        >
          <Icon name="play" size={18} />
          Hear this stop
        </button>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {view.moving ? "" : arrivalAnnouncement(view.stop)}
      </p>
    </div>
  );
}
