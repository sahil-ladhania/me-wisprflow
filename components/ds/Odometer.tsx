import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./Odometer.module.css";

type OdometerProps = {
  /** Each reading is a group of number drums with its unit: { value: 10, unit: "years" }. */
  readings: readonly { value: number; unit: string }[];
  /** The panel's lit once the engine is on: the drums turn over once and settle on the same numbers. */
  lit?: boolean;
  className?: string;
};

/**
 * A speedometer's odometer strip: cream number drums on ink. Decorative; the words beside it carry
 * the numbers. Each drum holds one full turn (its digit, round to the same digit again), so lighting
 * up is a single transform per drum.
 */
export function Odometer({ readings, lit, className }: OdometerProps) {
  const groups = readings.map(({ value, unit }) => ({ unit, digits: String(value).padStart(2, "0").split("").map(Number) }));
  // Drums turn over one after another, left to right, across every group.
  const firstDrum = groups.map((_, g) => groups.slice(0, g).reduce((n, group) => n + group.digits.length, 0));

  return (
    <div className={cx(styles.panel, lit && styles.lit, className)} aria-hidden="true">
      {groups.map(({ unit, digits }, g) => (
        <span key={unit} className={styles.reading}>
          <span className={styles.drums}>
            {digits.map((digit, i) => (
              <span key={i} className={styles.drum} style={{ "--i": firstDrum[g] + i } as CSSProperties}>
                <span className={styles.strip}>
                  {Array.from({ length: 11 }, (_, k) => (
                    <span key={k}>{(digit + k) % 10}</span>
                  ))}
                </span>
              </span>
            ))}
          </span>
          <span className={styles.unit}>{unit}</span>
        </span>
      ))}
    </div>
  );
}
