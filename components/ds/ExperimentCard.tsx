import { cx } from "@/lib/cx";
import styles from "./ExperimentCard.module.css";

type ExperimentCardProps = {
  /** "EXP 01". */
  id: string;
  /** Timing and cost: "Day 1–5 · ₹ small". */
  when?: string;
  /** Corner stamp. Defaults to "Placeholder" while the title is missing. */
  stamp?: string;
  /** The bet, in one line. */
  title?: string;
  /** Rooted in Indian users' behaviour. */
  insight?: string;
  move?: string;
  measure?: string;
  kill?: string;
  className?: string;
};

const TODO = "[to be written]";

/** An index card for one week-one growth experiment. Always three, each with a metric and a kill condition. */
export function ExperimentCard({ id, when, stamp, title, insight, move, measure, kill, className }: ExperimentCardProps) {
  const rows = [
    { label: "Insight", value: insight },
    { label: "The move", value: move },
    { label: "I’ll measure", value: measure },
    { label: "I kill it if", value: kill, kill: true },
  ];
  const stampText = stamp ?? (title ? undefined : "Placeholder");
  return (
    <article className={cx(styles.card, className)} aria-label={title ? undefined : `${id}, placeholder`}>
      {stampText ? <span className={styles.stamp}>{stampText}</span> : null}
      <div className={styles.head}>
        <span className={styles.id}>{id}</span>
        {when ? <span className="type-meta text-pencil">{when}</span> : null}
      </div>
      <h3 className={cx(styles.title, !title && styles.todo)}>{title ?? "[The bet, in one line. Sahil writes this.]"}</h3>
      <dl className={styles.grid}>
        {rows.map((row) => (
          <div key={row.label} className={row.kill ? styles.kill : undefined}>
            <dt>{row.label}</dt>
            <dd className={row.value ? undefined : styles.todo}>{row.value ?? TODO}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
