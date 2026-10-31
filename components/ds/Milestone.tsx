import { cx } from "@/lib/cx";
import styles from "./Milestone.module.css";

export type MilestoneKind = "past" | "now" | "next";

export type MilestoneProps = {
  /** 1–2 words, uppercase, at most 10 characters. */
  cap: string;
  /** The year, or the moment when there is no year. */
  year: string;
  /** City or code, large size only. */
  place?: string;
  /** past: haldi cap (years lived) · now: ink cap (2026) · next: signboard cap (what's ahead). */
  kind?: MilestoneKind;
  size?: "lg" | "sm";
  /** Drops to the small size on phones (used by StopHeader). */
  responsive?: boolean;
  /** The lane's phone size (used by BikeLane). */
  inLane?: boolean;
  className?: string;
};

/** An Indian highway milestone stone: the system's year marker. Decorative; the kicker carries the words. */
export function Milestone({ cap, year, place, kind = "past", size = "lg", responsive, inLane, className }: MilestoneProps) {
  return (
    <div
      className={cx(styles.root, size === "sm" && styles.sm, responsive && styles.responsive, inLane && styles.lane, className)}
      data-kind={kind}
      aria-hidden="true"
    >
      <span className={styles.cap}>{cap}</span>
      <span className={styles.year}>{year}</span>
      {place ? <span className={styles.place}>{place}</span> : null}
    </div>
  );
}
