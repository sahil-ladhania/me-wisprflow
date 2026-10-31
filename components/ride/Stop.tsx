import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { lastStop, titleId, type RideStop } from "@/lib/ride/stops";

type StopProps = {
  stop: RideStop;
  className?: string;
  children: ReactNode;
};

/**
 * One stop on the road: at least a screen tall, its content in the upper part, and enough room
 * at the bottom that nothing sits under the bike lane. The lane finds stops by data-stop.
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
        "relative box-border min-h-(--stop-min) pt-[clamp(56px,7vw,96px)]",
        // The lane takes its own space after the last stop, so only the stops before it leave room for it.
        stop.index === lastStop ? "pb-8" : "pb-[calc(var(--lane-h-mobile)+var(--space-7))] sm:pb-[calc(var(--lane-h)+var(--space-10))]",
        className,
      )}
    >
      {/* The ink (or smoke) front that blooms from the bike as the stop arrives; see app/styles/motion.css. */}
      <span data-ink="" aria-hidden="true" />
      <div className="mx-auto max-w-page px-4 xl:px-8">{children}</div>
    </section>
  );
}
