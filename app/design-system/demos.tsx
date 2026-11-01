"use client";

import { useEffect, useRef, useState } from "react";
import { BikeLane, type LaneState } from "@/components/ds/BikeLane";
import { ExhaustControl } from "@/components/ds/ExhaustControl";
import { IgnitionControl, type IgnitionState } from "@/components/ds/IgnitionControl";
import { InkReveal } from "@/components/ds/InkReveal";
import { RideControls } from "@/components/ds/RideControls";
import { durations } from "@/lib/design-system/tokens";
import { exhausts, type Exhaust } from "@/lib/ride/engine-sound";

// Interactive specimens for /design-system. The real page drives these from speech and scroll.

const demoButton =
  "type-kicker inline-flex min-h-11 items-center gap-2 rounded-pill border border-ink bg-card px-4 text-ink hover:bg-paper";

const ignitionStatus: Record<IgnitionState, string> = {
  off: "",
  listening: "Listening…",
  heard: "Heard you.",
  on: "Hold on tight. Scroll to ride.",
};

/** Fakes the recogniser: off → listening → heard → on. */
export function IgnitionDemo() {
  const [state, setState] = useState<IgnitionState>("off");
  const [blocked, setBlocked] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (ms: number, next: IgnitionState) => timers.current.push(window.setTimeout(() => setState(next), ms));
  const onKey = () => {
    if (state === "on") return setState("off");
    if (state !== "off") return;
    if (blocked) return setState("on");
    setState("listening");
    later(1700, "heard");
    later(2600, "on");
  };

  return (
    <div className="flex flex-col gap-5">
      <IgnitionControl
        state={state}
        status={ignitionStatus[state]}
        note={blocked && state === "off" ? "Mic’s shy. A tap works just as well." : ""}
        micBlocked={blocked}
        onKey={onKey}
        onTap={() => setState("on")}
        after={<span className="type-kicker inline-flex min-h-11 items-center text-ink">Scroll to ride</span>}
      />
      <label className="type-meta flex min-h-11 items-center gap-3 text-pencil">
        <input type="checkbox" className="size-5 accent-ink" checked={blocked} onChange={(e) => setBlocked(e.target.checked)} />
        Pretend the mic permission was denied
      </label>
    </div>
  );
}

const stones = [
  { cap: "CLASS 9", year: "2016" },
  { cap: "TRIO", year: "2018" },
  { cap: "COLLEGE", year: "2021" },
  { cap: "2 AM", year: "2021" },
  { cap: "JUNE", year: "2025" },
  { cap: "AUG", year: "2025" },
  { cap: "WISPR FLOW", year: "NEXT", kind: "next" as const },
];

/** "Ride on" rolls the road and brings the next stone in, the way scroll will. */
export function LaneDemo() {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<LaneState>("parked");
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const rideOn = () => {
    if (state === "riding") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIndex((i) => (i + 1) % stones.length);
    setState(reduce ? "idle" : "riding");
    timer.current = window.setTimeout(() => setState("idle"), reduce ? 0 : durations.ride);
  };
  const night = stones[index].cap === "JUNE";

  return (
    <div className="flex flex-col gap-4">
      {/* The lane is see-through; at June 2025 the stop behind it is night. */}
      <div data-theme={night ? "night" : undefined}>
        <BikeLane
          state={state}
          stone={stones[index]}
          stoneKey={index}
          count={{ label: `Stop ${String(index + 1).padStart(2, "0")} / ${String(stones.length).padStart(2, "0")}`, current: index + 1, total: stones.length }}
          headlamp={state !== "parked"}
          pillion={state !== "parked"}
          night={night}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" className={demoButton} onClick={rideOn}>
          Ride on →
        </button>
        <button type="button" className={demoButton} onClick={() => setState("parked")}>
          Park
        </button>
        <span className="type-meta text-pencil">
          {state} · {night ? "the lane turns night at June 2025" : "day"}
        </span>
      </div>
    </div>
  );
}

/** Cycles the exhaust the way the hero does. Silent here: the specimen never makes a sound. */
export function ExhaustDemo() {
  const [mode, setMode] = useState<Exhaust>("stock");
  return <ExhaustControl mode={mode} onChange={() => setMode((m) => exhausts[(exhausts.indexOf(m) + 1) % exhausts.length])} />;
}

/** The handlebar controls, working but going nowhere: the lever pulls, the grip twists, the exhaust cycles. */
export function RideControlsDemo() {
  const [mode, setMode] = useState<Exhaust>("stock");
  const [pressed, setPressed] = useState<"throttle" | "brake" | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const press = (kind: "throttle" | "brake") => {
    setPressed(kind);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPressed(null), 320);
  };
  return (
    <div className="flex flex-wrap items-center gap-6">
      <RideControls
        onThrottle={() => press("throttle")}
        onBrake={() => press("brake")}
        exhaust={mode}
        onExhaust={() => setMode((m) => exhausts[(exhausts.indexOf(m) + 1) % exhausts.length])}
        pressed={pressed}
      />
      <span className="type-meta text-pencil">→ throttle · ← brake on the real page</span>
    </div>
  );
}

/** The ink bloom from where the bike stops, and the smoke variant for the Night stop. */
export function InkDemo() {
  const [open, setOpen] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const replay = (asSmoke: boolean) => {
    setSmoke(asSmoke);
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  };
  useEffect(() => {
    const id = window.setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[260px] overflow-hidden bg-paper shadow-contact">
        <div className="absolute inset-0 grid content-center gap-2 p-6">
          <p className="type-kicker">Stop 06 · College</p>
          <p className="type-headline">₹20,000 of pasta in 4–5 hours.</p>
        </div>
        {/* Design-system modules beat Tailwind utilities, so position the reveal with a wrapper. */}
        <div className="absolute inset-0">
          <InkReveal open={open} smoke={smoke} x="22%" y="236px" reach="2400px">
            <div className="grid h-[260px] content-center gap-2 bg-paper p-6">
              <p className="type-kicker">Stop 07 · 2021 · 2:00 am</p>
              <p className="type-headline">2am, a Zomato order, and a reason to code.</p>
            </div>
          </InkReveal>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <button type="button" className={demoButton} onClick={() => replay(false)}>
          Replay ink
        </button>
        <button type="button" className={demoButton} onClick={() => replay(true)}>
          Replay smoke
        </button>
      </div>
    </div>
  );
}
