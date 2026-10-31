"use client";

import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { IgnitionState } from "@/components/ds/IgnitionControl";
import { playEngineThump, primeAudio } from "@/lib/ride/engine-sound";
import { matchRide } from "@/lib/ride/match";
import { stops } from "@/lib/ride/stops";

// The ride's shared state: the engine (started by voice or tap), what the mic heard, and sound.

/** How the engine was started; the cold read at the Wispr Flow stop reads it. */
export type StartedBy = "voice" | "close" | "tap" | null;

type Ride = {
  engine: IgnitionState;
  startedBy: StartedBy;
  heard: string;
  micBlocked: boolean;
  status: string;
  muted: boolean;
  /** True for the moment of ignition: the headlamp flicks on, the bike shudders. */
  igniting: boolean;
  /** The ignition key: listen for "let's ride" (or start directly when the mic is blocked). */
  pressKey: () => void;
  /** "or tap to start". */
  tapStart: () => void;
  toggleMute: () => void;
};

const RideContext = createContext<Ride | null>(null);

export function useRide(): Ride {
  const ride = use(RideContext);
  if (!ride) throw new Error("useRide needs a <RideProvider> above it.");
  return ride;
}

// The Web Speech API, typed just as far as the ride uses it (Chrome, Edge and Safari have it as
// webkitSpeechRecognition; Firefox has none, so the tap path takes over).
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  abort(): void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};
type SpeechWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };

const STATUS = {
  off: "Engine off.",
  listening: "Listening…",
  heard: "Heard you.",
  on: "Engine on. Scroll to ride.",
  missed: "Didn’t catch that. Tap works too.",
  blocked: "Mic’s shy. A tap works just as well.",
  noMic: "No mic in this browser. A tap works just as well.",
};

/** After this much silence the key goes back to off. */
const SILENCE_MS = 6000;
/** How long "heard" holds, so the visitor sees they were heard. */
const HEARD_MS = 900;
/** After ignition, the bike pulls away to the first stop if the visitor is still in the hero. */
const PULL_AWAY_MS = 1600;

export function RideProvider({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<IgnitionState>("off");
  const [startedBy, setStartedBy] = useState<StartedBy>(null);
  const [heard, setHeard] = useState("");
  const [micBlocked, setMicBlocked] = useState(false);
  const [status, setStatus] = useState(STATUS.off);
  const [muted, setMuted] = useState(false);
  const [igniting, setIgniting] = useState(false);

  const recognition = useRef<Recognition | null>(null);
  const timers = useRef<number[]>([]);
  const mutedRef = useRef(muted);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const stopListening = useCallback(() => {
    const r = recognition.current;
    recognition.current = null;
    if (!r) return;
    r.onresult = r.onerror = r.onend = null;
    try {
      r.abort();
    } catch {}
  }, []);
  useEffect(() => stopListening, [stopListening]);

  const ignite = useCallback(
    (by: Exclude<StartedBy, null>, said = "") => {
      stopListening();
      clearTimers();
      setStartedBy(by);
      setHeard(said);
      setEngine("on");
      setStatus(by === "close" ? `Heard “${said}”. Close enough. Engine on.` : STATUS.on);
      setIgniting(true);
      later(400, () => setIgniting(false));
      if (!mutedRef.current) playEngineThump();

      // Pull away to the first stop, unless the visitor has already started scrolling.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        later(PULL_AWAY_MS, () => {
          if (window.scrollY > 120) return;
          document.getElementById(stops[1].anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    [clearTimers, later, stopListening],
  );

  const tapStart = useCallback(() => {
    primeAudio();
    ignite("tap");
  }, [ignite]);

  const pressKey = useCallback(() => {
    if (engine === "on") return;
    primeAudio(); // inside the tap, so the thump may play later when the voice is heard
    if (engine === "listening") {
      stopListening();
      clearTimers();
      setEngine("off");
      setStatus(STATUS.off);
      return;
    }
    if (micBlocked) return ignite("tap");

    const speechWindow = window as SpeechWindow;
    const Recognizer = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognizer) {
      setMicBlocked(true);
      setStatus(STATUS.noMic);
      return;
    }

    const r = new Recognizer();
    r.lang = "en-IN";
    r.interimResults = true;
    r.continuous = true;
    r.maxAlternatives = 3;

    const giveUp = (text: string) => {
      stopListening();
      clearTimers();
      setEngine("off");
      setStatus(text);
    };
    const armSilence = () => {
      clearTimers();
      later(SILENCE_MS, () => giveUp(STATUS.missed));
    };

    r.onresult = (event) => {
      armSilence();
      let best: { how: "exact" | "close"; text: string } | null = null;
      let latest = "";
      for (let i = 0; i < event.results.length; i++) {
        const alternatives = event.results[i];
        for (let a = 0; a < alternatives.length; a++) {
          const text = alternatives[a].transcript.trim();
          if (a === 0) latest = text;
          const found = matchRide(text);
          if (found === "exact" || (found === "close" && !best)) best = { how: found, text };
        }
      }
      if (!best) {
        setHeard(latest);
        return;
      }
      const { how, text } = best;
      stopListening();
      clearTimers();
      setHeard(text);
      setEngine("heard");
      setStatus(how === "close" ? `Heard “${text}”. Close enough.` : STATUS.heard);
      later(HEARD_MS, () => ignite(how === "exact" ? "voice" : "close", text));
    };
    r.onerror = (event) => {
      const blocked = event.error === "not-allowed" || event.error === "service-not-allowed" || event.error === "audio-capture";
      if (blocked) setMicBlocked(true);
      giveUp(blocked ? STATUS.blocked : STATUS.missed);
    };
    r.onend = () => giveUp(STATUS.missed);

    try {
      r.start();
    } catch {
      setMicBlocked(true);
      setStatus(STATUS.blocked);
      return;
    }
    recognition.current = r;
    setHeard("");
    setEngine("listening");
    setStatus(STATUS.listening);
    armSilence();
  }, [clearTimers, engine, ignite, later, micBlocked, stopListening]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const ride = useMemo<Ride>(
    () => ({ engine, startedBy, heard, micBlocked, status, muted, igniting, pressKey, tapStart, toggleMute }),
    [engine, startedBy, heard, micBlocked, status, muted, igniting, pressKey, tapStart, toggleMute],
  );

  return <RideContext value={ride}>{children}</RideContext>;
}
