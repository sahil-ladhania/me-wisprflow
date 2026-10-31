import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./IndexCard.module.css";

type IndexCardProps = {
  /** "Card 06 · The cafe that almost happened". */
  kicker?: ReactNode;
  /** Degrees; keep it small. */
  tilt?: number;
  className?: string;
  children: ReactNode;
};

/** A raised paper card for a small set of facts. */
export function IndexCard({ kicker, tilt, className, children }: IndexCardProps) {
  return (
    <div className={cx(styles.card, className)} style={tilt === undefined ? undefined : ({ "--tilt": `${tilt}deg` } as CSSProperties)}>
      {kicker ? <p className="type-kicker">{kicker}</p> : null}
      {children}
    </div>
  );
}

/** Label/value rows on an index card. */
export function IndexRows({ children }: { children: ReactNode }) {
  return <dl className={styles.rows}>{children}</dl>;
}

/** One row. `kill` puts the label in red pen, for where things can go wrong. */
export function IndexRow({ label, kill, children }: { label: string; kill?: boolean; children: ReactNode }) {
  return (
    <div className={cx(styles.row, kill && styles.kill)}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}
