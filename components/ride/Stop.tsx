import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { lastStop, titleId, type RideStop } from "@/lib/ride/stops";

type StopProps = {
  stop: RideStop;
  className?: string;
  children: ReactNode;
};

/**
 * One stop on the road: at least a screen tall, its content in the upper part. The lane is
 * see-through, so a stop only leaves a normal gap at its bottom. The lane finds stops by data-stop.
 */
export function Stop({ stop, className, children }: StopProps) {
  return (
    <section
      id={stop.anchor}
      data-stop={stop.index}
      data-theme={stop.night ? "night" : undefined}
      data-smoke={stop.smoke ? "" : undefined}
      aria-labelledby={titleId(stop)}
      className={cx(
        "relative box-border min-h-(--stop-min)",
        // The hero sits higher, so the key and the exhaust stay clear of the parked bike on short laptop screens.
        stop.index === 0 ? "pt-[clamp(32px,6vh,72px)]" : "pt-[clamp(56px,7vw,96px)]",
        // The lane takes its own space after the last stop.
        stop.index === lastStop ? "pb-8" : "pb-8 sm:pb-9",
        className,
      )}
    >
      {/* The ink (or smoke) front that blooms from the bike as the stop arrives; see app/styles/motion.css. */}
      <span data-ink="" aria-hidden="true" />
      <div className="mx-auto max-w-page px-4 xl:px-8">{children}</div>
    </section>
  );
}
