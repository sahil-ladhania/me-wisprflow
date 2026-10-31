import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { BikeSilhouette } from "./BikeSilhouette";
import { Milestone, type MilestoneKind } from "./Milestone";
import styles from "./BikeLane.module.css";

export type LaneState = "parked" | "idle" | "riding" | "braking";

type BikeLaneProps = {
  /** parked: engine off · idle: engine on at a stop · riding: between stops · braking: arriving. */
  state?: LaneState;
  /** The moment of ignition: headlamp flick and a 2px shudder. */
  igniting?: boolean;
  /** Driven by scroll: --road-x moves the dashes, --stone-dx the stone. */
  scrub?: boolean;
  /** The milestone just ahead of the front wheel. */
  stone?: { cap: string; year: string; kind?: MilestoneKind };
  /** Changing it re-rolls the stone in from the right while riding. */
  stoneKey?: string | number;
  /** The stop counter, top right: "STOP 03 / 11" and one tick per stop. */
  count?: { label: string; current: number; total: number };
  headlamp?: boolean;
  /** The Night stop: the lane turns night with the page. */
  night?: boolean;
  /** The bike: the 3D model when it lands. Defaults to the silhouette. */
  bike?: ReactNode;
  className?: string;
  /** Pass --road-x to scrub the road dashes from scroll. */
  style?: CSSProperties;
};

/** The strip at the bottom of the viewport where the bike rides and stops at each milestone. */
export function BikeLane({ state = "parked", igniting, scrub, stone, stoneKey, count, headlamp, night, bike, className, style }: BikeLaneProps) {
  return (
    <div
      className={cx(
        styles.lane,
        state === "idle" && styles.idle,
        state === "riding" && styles.riding,
        state === "braking" && styles.braking,
        igniting && styles.igniting,
        scrub && styles.scrub,
        night && styles.night,
        className,
      )}
      data-theme={night ? "night" : undefined}
      style={style}
      aria-hidden="true"
    >
      <div className={styles.road}>
        <div className={styles.dash} />
      </div>
      {stone ? (
        <div key={stoneKey} className={styles.stone} data-stone="">
          <Milestone cap={stone.cap} year={stone.year} kind={stone.kind} size="sm" inLane />
        </div>
      ) : null}
      <div className={styles.bike}>{bike ?? <BikeSilhouette headlamp={headlamp} />}</div>
      {count ? (
        <div className={styles.count}>
          <span className="type-kicker">{count.label}</span>
          <span className={styles.ticks}>
            {Array.from({ length: count.total }, (_, i) => (
              <i key={i} className={cx(styles.tick, i < count.current && styles.past)} />
            ))}
          </span>
        </div>
      ) : null}
    </div>
  );
}
