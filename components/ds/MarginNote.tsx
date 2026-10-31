import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./MarginNote.module.css";

type MarginNoteProps = {
  /** Ten words or fewer, lowercase. */
  children: ReactNode;
  /** Quieter, in pencil. Never red: red is for corrections. */
  pencil?: boolean;
  /** Point right-to-left. */
  flip?: boolean;
  /** Degrees. */
  tilt?: number;
  className?: string;
};

/** A handwritten aside with a drawn arrow, placed beside the stat, photo or scan it points at. */
export function MarginNote({ children, pencil, flip, tilt, className }: MarginNoteProps) {
  return (
    <span
      className={cx(styles.note, pencil && styles.pencil, flip && styles.flip, className)}
      style={tilt === undefined ? undefined : ({ "--tilt": `${tilt}deg` } as CSSProperties)}
    >
      <svg
        className={styles.arrow}
        viewBox="0 0 54 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M50 6C36 4 20 10 10 30" />
        <path d="M4 22l6 9 9-5" />
      </svg>
      <span>{children}</span>
    </span>
  );
}
