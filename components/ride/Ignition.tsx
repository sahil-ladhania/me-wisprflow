"use client";

import { Icon } from "@/components/ds/Icon";
import { IgnitionControl } from "@/components/ds/IgnitionControl";
import { stops } from "@/lib/ride/stops";
import { useRide } from "./RideProvider";

/** The hero's display line: the engine's state, in the hero's own words. */
export function HeroTitle({ id }: { id: string }) {
  const { engine } = useRide();
  return (
    <h1 id={id} className="type-display">
      {engine === "on" ? "Engine’s on." : "Engine’s off."}
    </h1>
  );
}

/** The ignition key wired to the ride, the sound switch, and the one scroll hint after ignition. */
export function Ignition() {
  const ride = useRide();
  return (
    <div className="flex flex-col gap-3">
      <IgnitionControl
        state={ride.engine}
        status={ride.status}
        heard={ride.heard}
        micBlocked={ride.micBlocked}
        onKey={ride.pressKey}
        onTap={ride.tapStart}
      />
      <div className="flex flex-wrap items-center gap-4 sm:ml-5">
        {ride.engine === "on" ? (
          <a href={`#${stops[1].anchor}`} className="type-kicker inline-flex min-h-11 items-center gap-2 text-ink no-underline hover:text-red-pen">
            <Icon name="scroll-down" size={22} />
            Scroll to ride
          </a>
        ) : (
          <button
            type="button"
            onClick={ride.toggleMute}
            aria-pressed={!ride.muted}
            className="type-kicker inline-flex min-h-11 items-center gap-2 rounded-pill border border-rule bg-transparent px-4 text-pencil hover:text-ink"
          >
            {ride.muted ? <Icon name="mute" size={18} /> : null}
            {ride.muted ? "Sound off" : "Sound on"}
          </button>
        )}
      </div>
    </div>
  );
}
