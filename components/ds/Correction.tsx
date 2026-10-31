import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Correction.module.css";

type CorrectionProps = {
  /** What I said, struck through and left readable. */
  was: ReactNode;
  /** What was true, written over it by hand. Five words or fewer. */
  is: ReactNode;
  /** Write the fix after the strike instead of above it (always the case on phones). */
  inline?: boolean;
};

/**
 * A red-pen strike-through: the mistake stays on the page, the truth is written over it.
 * For real wrong turns only; at most two per stop. Screen readers hear both (del and ins).
 */
export function Correction({ was, is, inline }: CorrectionProps) {
  return (
    <span className={cx(styles.fix, inline && styles.inline)} data-pen-mark="">
      <del>{was}</del>
      <ins>{is}</ins>
    </span>
  );
}

/** A block of text with corrections in it: leaves room above the lines for the handwriting. */
export function CorrectionText({ as: Tag = "p", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cx(styles.fixes, className)}>{children}</Tag>;
}

/** The haldi highlighter: one phrase per stop. */
export function Mark({ children }: { children: ReactNode }) {
  return <mark className={styles.mark}>{children}</mark>;
}
