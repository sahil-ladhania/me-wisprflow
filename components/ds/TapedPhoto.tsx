import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./TapedPhoto.module.css";

export type TapePosition = "tl" | "tr" | "top" | "br";

/** A strip of masking tape. Shared by photos; one on top, or two diagonal corners. Never four. */
export function Tape({ position }: { position: TapePosition }) {
  return <span className={cx(styles.tape, styles[position])} data-tape="" aria-hidden="true" />;
}

type TapedPhotoProps = {
  /** The real photo. Leave it out and the print shows a labelled placeholder. */
  src?: string | StaticImageData;
  /** Real alt text for the photo (or what the placeholder stands in for). */
  alt: string;
  /** A lowercase observation, handwritten: "only boy in the kitchen. won anyway." */
  caption?: ReactNode;
  /** −3 to 3 degrees, never 0; alternate direction from photo to photo. */
  tilt?: number;
  /** CSS aspect ratio, default 4 / 5. */
  ratio?: string;
  tape?: "corners" | "top";
  /** Overrides the default width of min(100%, 320px). */
  width?: string;
  /** next/image sizes hint for the real photo. */
  sizes?: string;
  className?: string;
};

/** A real photo, printed with a paper border and taped to the journal page at a slight angle. */
export function TapedPhoto({ src, alt, caption, tilt = -2, ratio, tape = "corners", width, sizes = "(max-width: 600px) 90vw, 320px", className }: TapedPhotoProps) {
  const style = { "--tilt": `${tilt}deg`, ...(ratio ? { "--ratio": ratio } : {}), ...(width ? { width } : {}) } as CSSProperties;
  return (
    <figure className={cx(styles.root, className)} style={style}>
      {tape === "top" ? (
        <Tape position="top" />
      ) : (
        <>
          <Tape position="tl" />
          <Tape position="tr" />
        </>
      )}
      <div className={styles.print}>
        {src ? (
          <div className={styles.frame}>
            <Image src={src} alt={alt} fill sizes={sizes} className={styles.img} />
          </div>
        ) : (
          <div className={styles.slot} role="img" aria-label={`Photo placeholder: ${alt}`}>
            <span className={styles.slotLabel}>Photo · placeholder</span>
            <span className={styles.slotNote}>{alt}</span>
          </div>
        )}
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
