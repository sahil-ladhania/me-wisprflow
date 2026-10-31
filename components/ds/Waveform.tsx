import { cx } from "@/lib/cx";
import styles from "./Waveform.module.css";

type WaveformProps = {
  /** Bar heights from 0 to 1 (see lib/design-system/peaks.ts). */
  peaks: readonly number[];
  /** How many bars, from the left, have played (drawn in ink). */
  played?: number;
  /** The listening animation, in red pen. */
  live?: boolean;
  className?: string;
};

/** Voice bars. Wherever voice exists, this is its mark. */
export function Waveform({ peaks, played = 0, live, className }: WaveformProps) {
  return (
    <span className={cx(styles.wave, live && styles.live, className)} aria-hidden="true">
      {peaks.map((peak, i) => (
        <i key={i} className={cx(styles.bar, i < played && styles.played)} style={{ height: `${Math.max(10, peak * 100)}%` }} />
      ))}
    </span>
  );
}
