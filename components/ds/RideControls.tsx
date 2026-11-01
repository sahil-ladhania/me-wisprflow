import { cx } from "@/lib/cx";
import type { Exhaust } from "@/lib/ride/engine-sound";
import { Icon } from "./Icon";
import styles from "./RideControls.module.css";

type RideControlsProps = {
  /** On to the next stop. */
  onThrottle: () => void;
  /** Stop mid-ride, or back one stop. */
  onBrake: () => void;
  exhaust: Exhaust;
  onExhaust: () => void;
  /** Which control is being worked right now (by pointer or by arrow key), so it moves either way. */
  pressed?: "throttle" | "brake" | null;
  className?: string;
};

/**
 * The right-hand end of a handlebar, as the ride's controls: the brake lever, the twist grip, and a
 * compact exhaust switch. Built from the system's tokens, the parts drawn like the bike's own chrome.
 */
export function RideControls({ onThrottle, onBrake, exhaust, onExhaust, pressed, className }: RideControlsProps) {
  return (
    <div className={cx(styles.plate, className)} data-ride-control="">
      <button
        type="button"
        className={styles.control}
        data-pressed={pressed === "brake" ? "" : undefined}
        onClick={onBrake}
        aria-label="Brake: stop, or back one stop"
        aria-keyshortcuts="ArrowLeft"
        title="Brake (←): stop, or back one stop"
      >
        <svg className={styles.drawing} viewBox="0 0 46 26" width="46" height="26" aria-hidden="true" focusable="false">
          <rect x="2" y="4" width="9" height="9" rx="2.5" className={styles.chrome} />
          <g className={styles.lever}>
            <path d="M9 9.5 C19 9.5 31 10.5 41 16" className={styles.blade} />
            <circle cx="41.5" cy="16.3" r="2.6" className={styles.chrome} />
          </g>
        </svg>
        <span className={styles.label}>
          <span aria-hidden="true">← </span>Brake
        </span>
      </button>

      <button
        type="button"
        className={styles.control}
        data-pressed={pressed === "throttle" ? "" : undefined}
        onClick={onThrottle}
        aria-label="Throttle: ride to the next stop"
        aria-keyshortcuts="ArrowRight"
        title="Throttle (→): ride to the next stop"
      >
        <svg className={styles.drawing} viewBox="0 0 72 26" width="72" height="26" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="ride-controls-grip">
              <rect x="12" y="4" width="48" height="18" rx="6" />
            </clipPath>
          </defs>
          <rect x="2" y="6" width="11" height="14" rx="2" className={styles.chrome} />
          <rect x="12" y="4" width="48" height="18" rx="6" className={styles.rubber} />
          <g clipPath="url(#ride-controls-grip)">
            <path className={styles.ridges} d="M15 -6 l6 12 M21 -6 l6 12 M27 -6 l6 12 M33 -6 l6 12 M39 -6 l6 12 M45 -6 l6 12 M51 -6 l6 12 M15 6 l6 12 M21 6 l6 12 M27 6 l6 12 M33 6 l6 12 M39 6 l6 12 M45 6 l6 12 M51 6 l6 12 M15 18 l6 12 M21 18 l6 12 M27 18 l6 12 M33 18 l6 12 M39 18 l6 12 M45 18 l6 12 M51 18 l6 12" />
          </g>
          <rect x="59" y="7" width="10" height="12" rx="3.5" className={styles.chrome} />
        </svg>
        <span className={styles.label}>
          Throttle<span aria-hidden="true"> →</span>
        </span>
      </button>

      <button
        type="button"
        className={cx(styles.control, styles.exhaust)}
        data-mode={exhaust}
        onClick={onExhaust}
        aria-label={`Change the exhaust. Now: ${exhaust}.`}
        title="Change the exhaust"
      >
        <Icon name="exhaust" size={24} />
        <span className={styles.mode}>{exhaust}</span>
      </button>
    </div>
  );
}
