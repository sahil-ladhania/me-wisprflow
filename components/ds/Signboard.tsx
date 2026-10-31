import { cx } from "@/lib/cx";
import styles from "./Signboard.module.css";

const arrows = {
  /** Straight ahead: the next stop. */
  up: "M12 20.5v-16M6 10.5l6-6 6 6",
  /** Beyond the road. */
  right: "M3.5 12h16M13.5 6l6 6-6 6",
};

type SignboardProps = {
  /** Two words or fewer. */
  dest: string;
  sub?: string;
  /** Corner tag, e.g. "NEXT". */
  km?: string;
  arrow?: keyof typeof arrows;
  href?: string;
  className?: string;
};

/** A green Indian highway direction sign: only for what lies ahead. */
export function Signboard({ dest, sub, km, arrow = "right", href, className }: SignboardProps) {
  const content = (
    <>
      <svg
        className={styles.arrow}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={arrows[arrow]} />
      </svg>
      <span className={styles.dest}>{dest}</span>
      {sub ? <span className={styles.sub}>{sub}</span> : null}
      {km ? <span className={styles.km}>{km}</span> : null}
    </>
  );
  const className_ = cx(styles.sign, km && styles.withKm, className);
  return href ? (
    <a className={className_} href={href}>
      {content}
    </a>
  ) : (
    <div className={className_}>{content}</div>
  );
}
