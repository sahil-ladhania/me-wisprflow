import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Bike } from "./Bike";
import { Milestone, type MilestoneKind } from "./Milestone";
import styles from "./BikeLane.module.css";

export type LaneState = "parked" | "idle" | "riding" | "braking";

type BikeLaneProps = {
  /** parked: before ignition, and at the mountains · idle: running at a stop · riding: between stops · braking: arriving. */
  state?: LaneState;
  /** The moment of ignition: headlamp flick and a 2px shudder. */
  igniting?: boolean;
  /** Driven by scroll: --road-x moves the dashes, --stone-dx the stone. */
  scrub?: boolean;
  /** Phones, while reading a long stop: bike and stone step aside; the road and the controls stay. */
  mini?: boolean;
  /** Everything but the road steps aside, controls too: the hero's route card is passing on a phone. */
  clear?: boolean;
  /** The milestone just ahead of the front wheel. */
  stone?: { cap: string; year: string; kind?: MilestoneKind };
  /** Changing it re-rolls the stone in from the right while riding. */
  stoneKey?: string | number;
  /** The stop counter, a small plate beside the controls: "STOP 03 / 11" and one tick per stop. Not on phones. */
  count?: { label: string; current: number; total: number };
  headlamp?: boolean;
  /** The visitor on the pillion seat, from ignition on. */
  pillion?: boolean;
  /** The Night stop: the lane turns night with the page. */
  night?: boolean;
  /** The bike. Defaults to the illustrated one, with Sahil on it. */
  bike?: ReactNode;
  /** The ride's controls (throttle, brake, exhaust), on the road at the right. The only part that takes taps. */
  controls?: ReactNode;
  className?: string;
  /** Pass --road-x to scrub the road dashes from scroll. */
  style?: CSSProperties;
};

/** The see-through road at the bottom of the viewport where the bike rides and stops at each milestone. */
export function BikeLane({ state = "parked", igniting, scrub, mini, clear, stone, stoneKey, count, headlamp, pillion, night, bike, controls, className, style }: BikeLaneProps) {
  return (
    <div
      className={cx(
        styles.lane,
        state === "idle" && styles.idle,
        state === "riding" && styles.riding,
        state === "braking" && styles.braking,
        igniting && styles.igniting,
        scrub && styles.scrub,
        mini && styles.mini,
        clear && styles.clear,
        headlamp && styles.lit,
        night && styles.night,
        className,
      )}
      data-theme={night ? "night" : undefined}
      style={style}
    >
      {/* Only the controls are for assistive tech; the road, the stone, the bike and the counter are scenery. */}
      <div className={styles.road} aria-hidden="true">
        <div className={styles.dash} />
      </div>
      {stone ? (
        <div key={stoneKey} className={styles.stone} data-stone="" aria-hidden="true">
          <Milestone cap={stone.cap} year={stone.year} kind={stone.kind} size="sm" inLane />
        </div>
      ) : null}
      <div className={styles.bike} data-bike="" aria-hidden="true">
        {bike ?? <Bike headlamp={headlamp} pillion={pillion} />}
      </div>
      {count || controls ? (
        <div className={styles.cockpit}>
          {count ? (
            <div className={styles.count} aria-hidden="true">
              <span className="type-kicker">{count.label}</span>
              <span className={styles.ticks}>
                {Array.from({ length: count.total }, (_, i) => (
                  <i key={i} className={cx(styles.tick, i < count.current && styles.past)} />
                ))}
              </span>
            </div>
          ) : null}
          {controls ? <div className={styles.controls}>{controls}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
