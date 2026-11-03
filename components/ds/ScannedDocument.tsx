import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./ScannedDocument.module.css";

type ScannedDocumentProps = {
  /** Kicker label: "Scan 02 · The interview invite". */
  label: string;
  date?: string;
  /** The scan. Crop it to the line that matters. */
  src?: string | StaticImageData;
  /** Alt text for the scan, or what the placeholder stands in for. */
  alt: string;
  /** Recreated rows instead of an image, for legibility on phones. */
  children?: ReactNode;
  /** One short red-pen note, six words or fewer. */
  note?: string;
  /** Degrees, 1.5 at most. */
  tilt?: number;
  /** CSS aspect ratio for the image or placeholder. Default: an imported scan's own shape, else 4 / 3. */
  ratio?: string;
  className?: string;
};

/**
 * A scan of a real object placed on the page as proof, with at most one red-pen mark. At 440px a
 * screenshot's small print is hard to read, so the scan opens full size in a new tab.
 */
export function ScannedDocument({ label, date, src, alt, children, note, tilt = 1, ratio, className }: ScannedDocumentProps) {
  const shape = ratio ?? (src && typeof src !== "string" ? `${src.width} / ${src.height}` : undefined);
  const style = { "--tilt": `${Math.max(-1.5, Math.min(1.5, tilt))}deg`, ...(shape ? { "--ratio": shape } : {}) } as CSSProperties;
  let sheet: ReactNode;
  if (src) {
    sheet = (
      <a href={typeof src === "string" ? src : src.src} target="_blank" rel="noopener" className={styles.frame}>
        <Image src={src} alt={alt} fill sizes="(max-width: 600px) 90vw, 440px" className={styles.img} />
        <span className="sr-only"> (opens full size in a new tab)</span>
      </a>
    );
  } else if (children) {
    sheet = children;
  } else {
    sheet = (
      <div className={styles.slot} role="img" aria-label={`Scan placeholder: ${alt}`}>
        <span className={styles.slotLabel}>Scan · placeholder</span>
        <span className={styles.slotNote}>{alt}</span>
      </div>
    );
  }
  return (
    <figure className={cx(styles.root, className)} style={style}>
      <div className={styles.sheet}>
        {sheet}
        {note ? <span className={styles.note}>{note}</span> : null}
      </div>
      <figcaption className={styles.label}>
        <span className="type-kicker">{label}</span>
        {date ? <span className="type-meta text-pencil">{date}</span> : null}
        {src && !date ? (
          <span className="type-meta text-pencil" aria-hidden="true">
            Tap to read
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** A recreated line of a scanned email or record: label, then value. */
export function ScanRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <b>{label}</b>
      <span>{children}</span>
    </div>
  );
}

export function ScanRule() {
  return <div className={styles.rule} />;
}

/** A greyed-out line of text that doesn't matter. */
export function ScanLine({ width = "80%" }: { width?: string }) {
  return <div className={styles.line} style={{ width }} />;
}

/** The proof, circled once in red pen. */
export function ScanProof({ children }: { children: ReactNode }) {
  return (
    <span className={styles.proof}>
      {children}
      <svg
        className={styles.circle}
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M30 8C70 0 160 2 188 18c14 10 4 30-40 36C96 60 30 58 12 42 0 30 14 12 52 6" />
      </svg>
    </span>
  );
}
