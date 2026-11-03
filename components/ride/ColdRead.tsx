"use client";

import { useState } from "react";
import { useRide, type StartedBy } from "./RideProvider";

// A cold read of the judge, done the way horoscopes do it: three lines that fit almost anyone (the
// Barnum effect), then one that really is about them, from how they started the engine.

const lines = [
  "You have more tabs open than you meant to.",
  "You’re skeptical of this page, and a little curious anyway.",
  "At least once this week you thought, “there has to be a faster way to type this.”",
];

const replies = {
  spot: "Of course. Those three fit almost everyone. It’s called the Barnum effect, and it’s half of marketing.",
  off: "Then you’re rare. Those three fit almost everyone. It’s called the Barnum effect.",
};

/** The one line that really is about them. */
const realLine = (by: StartedBy, heard: string): string => {
  if (by === "voice") return "you said “let’s ride” out loud.";
  if (by === "close") return `you said “let’s ride” out loud, and the mic heard “${heard}”.`;
  if (by === "tap") return "you tapped instead of talking.";
  return "you never started the engine. You pushed the bike all the way here.";
};

const answerButton =
  "type-kicker min-h-11 cursor-pointer border-[1.5px] border-ink bg-card px-5 text-ink hover:bg-paper aria-pressed:bg-scan";

export function ColdRead() {
  const { startedBy, heard } = useRide();
  const [answer, setAnswer] = useState<keyof typeof replies | null>(null);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-9">
      <div className="flex flex-col gap-3">
        <p className="type-kicker">Meanwhile · a cold read of you</p>
        <h3 className="type-headline">You’re the user now. Let me read you.</h3>
        <p className="type-body">Growth starts with knowing who’s on the other side of the screen. Today, that’s you.</p>
      </div>
      <div className="min-w-0 bg-card p-5 shadow-contact sm:p-6">
        <ol>
          {lines.map((line, i) => (
            <li key={i} className="flex gap-4 border-b border-rule py-3">
              <span className="type-meta w-7 shrink-0 pt-1 text-pencil">{String(i + 1).padStart(2, "0")}</span>
              <span className="type-body">{line}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="type-kicker mr-1">Am I close?</p>
          <button type="button" className={answerButton} aria-pressed={answer === "spot"} onClick={() => setAnswer("spot")}>
            Spot on
          </button>
          <button type="button" className={answerButton} aria-pressed={answer === "off"} onClick={() => setAnswer("off")}>
            Way off
          </button>
        </div>
        <div className="mt-4 min-h-[1.38em]" aria-live="polite">
          {answer ? (
            <>
              <p className="type-lede">{replies[answer]}</p>
              <p className="type-body mt-3">
                Here’s one that’s actually about you: <strong className="font-semibold">{realLine(startedBy, heard)}</strong> Generic copy
                feels personal. Data actually is.
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
