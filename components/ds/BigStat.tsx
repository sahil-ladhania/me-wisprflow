import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./BigStat.module.css";

type BigStatProps = {
  /** The number as true as it is: "3,500", "~200", "₹20,000". */
  value: string;
  /** Set smaller after the number: "+", "%". */
  unit?: string;
  /** Plain, six words or fewer. The number does the bragging. */
  label: ReactNode;
  /** Where the number comes from, in pencil. */
  source?: ReactNode;
  /** The witty aside, handwritten. */
  pen?: ReactNode;
  className?: string;
};

/** A number that carries a claim. Never on the Night stop. */
export function BigStat({ value, unit, label, source, pen, className }: BigStatProps) {
  return (
    <figure className={cx(styles.stat, className)}>
      <p className={styles.num}>
        {value}
        {unit ? <small className={styles.unit}>{unit}</small> : null}
      </p>
      <p className={styles.label}>{label}</p>
      {source ? <p className={styles.source}>{source}</p> : null}
      {pen ? <span className={styles.pen}>{pen}</span> : null}
    </figure>
  );
}

/** Up to three BigStats in a ledger row; two columns on phones. */
export function StatRow({ compact, className, children }: { compact?: boolean; className?: string; children: ReactNode }) {
  return <div className={cx(styles.stats, compact && styles.compact, className)}>{children}</div>;
}
