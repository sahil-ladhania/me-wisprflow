import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./NightStop.module.css";

type NightStopProps = {
  /** "June 2025". */
  date: string;
  /** One plain line, lightly told. No italic, no red pen. About his pain and growth only. */
  line: ReactNode;
  lineId?: string;
  /** The line is the stop's heading on the page; use "p" when it isn't. */
  lineAs?: "h2" | "p";
  /** What came after the silence. */
  children?: ReactNode;
  className?: string;
};

/** The Night stop's one highlight: the line the headlamp finds. Warm, larger, in a soft pool of lamp light. */
export function NightHighlight({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx(styles.highlight, className)}>{children}</p>;
}

/** The June 2025 stop: the only one in the night theme. Every token switches underneath it. */
export function NightStop({ date, line, lineId, lineAs: Line = "h2", children, className }: NightStopProps) {
  return (
    <div data-theme="night" className={cx(styles.night, className)}>
      {/* On arrival (motion.css): the date, then the line, then the rest, slowly. */}
      <p data-arrive="" className={styles.date}>
        {date}
      </p>
      <Line id={lineId} data-arrive="" style={{ "--arrive": "250ms" } as CSSProperties} className={styles.line}>
        {line}
      </Line>
      {children ? (
        <div data-arrive="" style={{ "--arrive": "600ms" } as CSSProperties} className={styles.after}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
