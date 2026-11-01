import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { BikeSilhouette } from "./BikeSilhouette";
import styles from "./RouteMap.module.css";

export type RouteMapStop = {
  href: string;
  /** Left column: "2016", "CL 10", "JUN 25". */
  short: string;
  name: string;
  /** The stone's cap, as on the milestones: past haldi, now ink, next signboard green; night is a dark stone. */
  kind?: "past" | "now" | "next" | "night";
};

type RouteMapProps = {
  stops: readonly RouteMapStop[];
  /** The handwritten line beside the bike at the start of the road. */
  here?: string;
  className?: string;
};

/** Where the road sits in the gutter for stop i (the start is i = -1): a gentle serpentine. */
const roadX = (i: number) => Math.round((24 + 11 * Math.sin(i * 0.95 + 0.4)) * 10) / 10;

/** One row's stretch of road: in from halfway to the previous stone, through this one, out halfway to the next. */
function stretch(i: number, last: boolean): string {
  const x = roadX(i);
  const out = last ? "" : ` C${x} 75 ${(x + roadX(i + 1)) / 2} 75 ${(x + roadX(i + 1)) / 2} 100`;
  if (i < 0) return `M${x} 50${out}`;
  const enter = (roadX(i - 1) + x) / 2;
  return `M${enter} 0 C${enter} 25 ${x} 25 ${x} 50${out}`;
}

function Road({ i, last = false }: { i: number; last?: boolean }) {
  return (
    <svg className={styles.road} viewBox="0 0 48 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={stretch(i, last)} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * The route drawn as a winding road with a milestone stone at every stop, the bike parked at the
 * start. Every stop is a link, so it still reads (and works) as a plain list.
 */
export function RouteMap({ stops, here, className }: RouteMapProps) {
  return (
    <div className={cx(styles.map, className)}>
      <div className={styles.start} style={{ "--x": `${roadX(-1)}px` } as CSSProperties} aria-hidden="true">
        <Road i={-1} />
        <span className={styles.bike}>
          <BikeSilhouette />
        </span>
        {here ? <span className={styles.here}>{here}</span> : null}
      </div>
      <ol className={styles.route}>
        {stops.map((stop, i) => (
          <li key={stop.href} className={styles.stop} style={{ "--x": `${roadX(i)}px` } as CSSProperties}>
            <Road i={i} last={i === stops.length - 1} />
            <a href={stop.href} className={styles.link}>
              <span className={styles.stone} data-kind={stop.kind ?? "past"} aria-hidden="true" />
              <span className={styles.short}>{stop.short}</span> <span className={styles.name}>{stop.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
