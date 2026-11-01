"use client";

import { ExhaustControl } from "@/components/ds/ExhaustControl";
import { Icon } from "@/components/ds/Icon";
import { IgnitionControl } from "@/components/ds/IgnitionControl";
import { stops } from "@/lib/ride/stops";
import { useRide } from "./RideProvider";

/** The ignition key wired to the ride, the one scroll hint after ignition, and the exhaust. */
export function Ignition() {
  const ride = useRide();
  return (
    <div className="flex flex-col items-start gap-3">
      <IgnitionControl
        state={ride.engine}
        status={ride.status}
        note={ride.note}
        heard={ride.heard}
        micBlocked={ride.micBlocked}
        onKey={ride.pressKey}
        onTap={ride.tapStart}
        after={
          <a
            href={`#${stops[1].anchor}`}
            className="type-kicker inline-flex min-h-11 items-center gap-2 text-ink no-underline hover:text-red-pen pointer-fine:min-h-[32px]"
          >
            Scroll to ride
            <Icon name="scroll-down" size={18} />
          </a>
        }
      />
      <ExhaustControl mode={ride.exhaust} onChange={ride.cycleExhaust} />
    </div>
  );
}
