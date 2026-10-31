"use client";

import { useId, useMemo } from "react";
import { cx } from "@/lib/cx";
import { peaks } from "@/lib/design-system/peaks";
import { Icon } from "./Icon";
import { Waveform } from "./Waveform";
import styles from "./IgnitionControl.module.css";

export type IgnitionState = "off" | "listening" | "heard" | "on";

type IgnitionControlProps = {
  state: IgnitionState;
  /** Polite live status: "Engine off.", "Listening…", "Engine on. Scroll to ride." */
  status: string;
  /** What the recogniser heard, shown in red pen in the heard state. */
  heard?: string;
  /** Mic permission denied: the key starts the engine directly. */
  micBlocked?: boolean;
  /** The key: start listening (or start the engine when the mic is blocked). */
  onKey: () => void;
  /** "or tap to start": skips voice entirely. */
  onTap: () => void;
  className?: string;
};

/**
 * The hero's engine start. Presentational: the speech recogniser lives with the ride and sets
 * `state`. One per page, in the first viewport, under the display line.
 */
export function IgnitionControl({ state, status, heard, micBlocked, onKey, onTap, className }: IgnitionControlProps) {
  const statusId = useId();
  const livePeaks = useMemo(() => peaks(22, 11), []);
  let say;
  if (state === "on") say = <>Engine on</>;
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
          <Icon name={micBlocked ? "mic-off" : "mic"} size={26} />
        </span>
        <span className={styles.text}>
          <span className={styles.say}>{say}</span>
          <span className={styles.heard}>“{heard || "let’s ride"}” ✓</span>
        </span>
        <Waveform peaks={livePeaks} live className={styles.wave} />
      </button>
      <div className={styles.foot}>
        <p id={statusId} className={styles.status} aria-live="polite">
          {status}
        </p>
        {state === "off" && !micBlocked ? (
          <button type="button" className={styles.tap} onClick={onTap}>
            or tap to start
          </button>
        ) : null}
      </div>
    </div>
  );
}
