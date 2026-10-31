"use client";

import { useState } from "react";
import { useRide, type StartedBy } from "./RideProvider";

// A playful read of the judge: they're the user now. The fourth line knows how they started the engine.

const fourthLine = (by: StartedBy, heard: string): string => {
  if (by === "voice") return "You said “let’s ride” out loud. Possibly at your desk. Noted.";
  if (by === "close") return `You said “let’s ride” out loud, and it heard “${heard}”. Noted.`;
  if (by === "tap") return "You tapped instead of talking. Open office, or a shy mic. Noted.";
  return "You never started the engine. You pushed the bike all the way here. Respect.";
};

const replies = {
  close: "Reading people is half of growth. The other half is numbers. You’ve seen those.",
  off: "Then you’re the rare judge who reads every word. Hi.",
};

const answerButton =
  "type-kicker min-h-11 cursor-pointer border-[1.5px] border-ink bg-card px-5 text-ink hover:bg-paper aria-pressed:bg-scan";

export function ColdRead() {
  const { startedBy, heard } = useRide();
  const [answer, setAnswer] = useState<keyof typeof replies | null>(null);
  const lines = [
    "You’ve opened more portfolios today than you’d admit.",
    "You decided on most of them in the first three seconds. Fair.",
    "You’re skimming this list, not reading it. Good. I wrote it to be skimmed.",
    fourthLine(startedBy, heard),
  ];

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
          <button type="button" className={answerButton} aria-pressed={answer === "close"} onClick={() => setAnswer("close")}>
            Too close
          </button>
          <button type="button" className={answerButton} aria-pressed={answer === "off"} onClick={() => setAnswer("off")}>
            Way off
          </button>
        </div>
        <p className="type-lede mt-4 min-h-[1.38em]" aria-live="polite">
          {answer ? replies[answer] : null}
        </p>
      </div>
    </div>
  );
}
