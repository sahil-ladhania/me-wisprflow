import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Milestone, type MilestoneProps } from "./Milestone";
import styles from "./StopHeader.module.css";

type StopHeaderProps = {
  milestone: Omit<MilestoneProps, "size" | "responsive" | "inLane" | "className">;
  /** "Stop 03 · After Class 10". */
  kicker: ReactNode;
  /** The claim: a headline of nine words or fewer that works on its own. */
  title: ReactNode;
  titleId?: string;
  /** The witty aside that undercuts the title, twenty words or fewer. */
  lede?: ReactNode;
  /** The voice chip, e.g. "0:18 voice note", when the stop has one. */
  voice?: string;
  headingLevel?: 2 | 3;
  className?: string;
};

/**
 * The opening of every stop except the Night stop: milestone, kicker, claim, aside.
 * On arrival (motion.css) the milestone settles first, then the words appear.
 */
export function StopHeader({ milestone, kicker, title, titleId, lede, voice, headingLevel = 2, className }: StopHeaderProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <header className={cx(styles.root, className)}>
      <div data-arrive="settle" className="flex">
        <Milestone {...milestone} responsive />
      </div>
      <div data-arrive="" style={{ "--arrive": "100ms" } as CSSProperties}>
        <p className={styles.kicker}>
          <span className="type-kicker">{kicker}</span>
          {voice ? <span className={styles.voice}>{voice}</span> : null}
        </p>
        <Heading id={titleId} className={styles.title}>
          {title}
        </Heading>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
      </div>
    </header>
  );
}
