import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

type ColumnsProps = {
  /** The story: short paragraphs, capped at the reading measure. */
  children: ReactNode;
  /** The objects placed beside it: photos, scans, cards, each wrapped in <Land>. At most two. */
  aside?: ReactNode;
  className?: string;
};

/** A stop's body: story copy on the left, the objects beside it; stacked on phones. */
export function Columns({ children, aside, className }: ColumnsProps) {
  return (
    <div className={cx("mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] lg:gap-9", className)}>
      <div data-arrive="" style={{ "--arrive": "200ms" } as CSSProperties} className="flex min-w-0 flex-col gap-5">
        {children}
      </div>
      {aside ? <div className="flex min-w-0 flex-col items-start gap-8 lg:pt-2">{aside}</div> : null}
    </div>
  );
}

type LandProps = {
  /** Order among the stop's objects: each lands 100 ms after the one before. */
  order?: number;
  /** Which way it turns as it lands: degrees added to its tilt, ±4. */
  turn?: number;
  className?: string;
  children: ReactNode;
};

/** An object (photo, scan, card) that drops onto the page like paper when its stop arrives. */
export function Land({ order = 0, turn = 4, className, children }: LandProps) {
  const style = { "--arrive": `${300 + order * 100}ms`, "--land-turn": `${turn}deg` } as CSSProperties;
  return (
    <div data-arrive="land" style={style} className={className}>
      {children}
    </div>
  );
}
