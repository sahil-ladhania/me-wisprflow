import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./NightStop.module.css";

type NightStopProps = {
  /** "June 2025". */
  date: string;
  /** One straight sentence. No wit, no italic, no red pen. About his pain and growth only. */
  line: ReactNode;
  lineId?: string;
  /** The line is the stop's heading on the page; use "p" when it isn't. */
  lineAs?: "h2" | "p";
  /** Optionally a quiet VoiceNote, then anything that comes after the silence. */
  children?: ReactNode;
  className?: string;
};

/** The June 2025 stop: the only one in the night theme. Every token switches underneath it. */
export function NightStop({ date, line, lineId, lineAs: Line = "h2", children, className }: NightStopProps) {
  return (
    <div data-theme="night" className={cx(styles.night, className)}>
      <p className={styles.date}>{date}</p>
      <Line id={lineId} className={styles.line}>
        {line}
      </Line>
      {children ? <div className={styles.after}>{children}</div> : null}
    </div>
  );
}
