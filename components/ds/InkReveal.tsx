"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode, type TransitionEvent } from "react";
import { cx } from "@/lib/cx";
import styles from "./InkReveal.module.css";

type InkRevealProps = {
  /** Run the bloom. Until then the content is hidden (only once JavaScript has armed it). */
  open: boolean;
  /** Where the bike stopped, relative to this box: CSS lengths. The origin is always the bike. */
  x?: string;
  y?: string;
  /** Final blot size, about twice the box's diagonal. */
  reach?: string;
  /** Smoke instead of ink: into and out of the Night stop only. */
  smoke?: boolean;
  className?: string;
  children: ReactNode;
};

const noSubscription = () => () => {};

/** The transition between stops: the arriving content blooms out like ink soaking into paper. */
export function InkReveal({ open, x, y, reach, smoke, className, children }: InkRevealProps) {
  // Armed only on the client, after hydration; without JavaScript the content is simply there.
  const armed = useSyncExternalStore(noSubscription, () => true, () => false);
  const [done, setDone] = useState(false);

  // Closing again (a replay) brings the mask back.
  const [lastOpen, setLastOpen] = useState(open);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (!open) setDone(false);
  }

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (open && event.target === event.currentTarget) setDone(true);
  };

  const style = { ...(x ? { "--x": x } : {}), ...(y ? { "--y": y } : {}), ...(reach ? { "--reach": reach } : {}) } as CSSProperties;

  return (
    <div className={cx(styles.ink, smoke && styles.smoke, armed && styles.armed, open && styles.open, done && styles.done, className)} style={style}>
      <div className={styles.page} onTransitionEnd={onTransitionEnd}>
        {children}
      </div>
      <div className={styles.bloom} aria-hidden="true" />
    </div>
  );
}
