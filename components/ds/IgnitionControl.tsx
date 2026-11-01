"use client";

import { useId, useMemo, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { peaks } from "@/lib/design-system/peaks";
import { Icon } from "./Icon";
import { Waveform } from "./Waveform";
import styles from "./IgnitionControl.module.css";

export type IgnitionState = "off" | "listening" | "heard" | "on";

type IgnitionControlProps = {
  state: IgnitionState;
  /** Polite live status for screen readers: "Listening…", "Hold on tight. Scroll to ride." Empty before the first try. */
  status: string;
  /** The small line under the key, only when there's something to say: "Didn’t catch that. Tap works too." */
  note?: string;
  /** What the recogniser heard, shown in red pen in the heard state. */
  heard?: string;
  /** Mic permission denied: the key starts the engine directly. */
  micBlocked?: boolean;
  /** The key: start listening (or start the engine when the mic is blocked). */
  onKey: () => void;
  /** "or tap to start": skips voice entirely. */
  onTap: () => void;
  /** What sits under the key once the engine is on: the scroll hint. */
  after?: ReactNode;
  className?: string;
};

/**
 * The hero's engine start: a small key, "or tap to start" under it. Presentational: the speech
 * recogniser lives with the ride and sets `state`. One per page, in the first viewport. Before the
 * first try it says nothing about the engine: the parked bike and the dark headlamp do.
 */
export function IgnitionControl({ state, status, note, heard, micBlocked, onKey, onTap, after, className }: IgnitionControlProps) {
  const statusId = useId();
  const livePeaks = useMemo(() => peaks(14, 11), []);
  let say;
  if (state === "on") say = <>Hold on tight.</>;
  else if (state === "listening") say = <>Listening…</>;
  else if (micBlocked) say = <>Mic’s shy? Tap to start.</>;
  else
    say = (
      <>
        Say <q>let’s ride</q>
      </>
    );

  return (
    <div className={cx(styles.root, className)} data-state={state}>
      <button type="button" className={styles.key} onClick={onKey} aria-pressed={state === "on"} aria-describedby={statusId}>
        <span className={styles.mic}>
          <Icon name={micBlocked && state !== "on" ? "mic-off" : "mic"} size={20} />
        </span>
        <span className={styles.text}>
          <span className={styles.say}>{say}</span>
          <span className={styles.heard}>“{heard || "let’s ride"}” ✓</span>
        </span>
        <Waveform peaks={livePeaks} live className={styles.wave} />
      </button>
      <p id={statusId} className="sr-only" aria-live="polite">
        {status}
      </p>
      <div className={styles.below}>
        {note ? (
          <p className={styles.note} aria-hidden="true">
            {note}
          </p>
        ) : null}
        {state === "off" && !micBlocked ? (
          <button type="button" className={styles.tap} onClick={onTap}>
            or tap to start
          </button>
        ) : null}
        {state === "on" ? after : null}
      </div>
    </div>
  );
}
