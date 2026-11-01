"use client";

import { IndexCard } from "@/components/ds/IndexCard";
import { Odometer } from "@/components/ds/Odometer";
import { RouteMap } from "@/components/ds/RouteMap";
import { numberedStops, stops } from "@/lib/ride/stops";
import { useRide } from "./RideProvider";

/** 2016 → 2026. */
const YEARS = 10;

const route = stops.slice(1).map((stop) => ({
  href: `#${stop.anchor}`,
  short: stop.short,
  name: stop.name,
  kind: stop.night ? ("night" as const) : stop.milestone.kind,
}));

/** The hero's map of the road: the odometer, then every stop, one tap away, for judges who skim. */
export function RouteCard() {
  const { engine } = useRide();
  return (
    // The lane looks for this: on phones the bike steps aside while the card passes behind the road.
    <nav aria-label="The route" data-route-card="">
      <IndexCard kicker={`Distance covered · ${YEARS} years, ${numberedStops} stops`} tilt={1}>
        <Odometer
          lit={engine === "on"}
          readings={[
            { value: YEARS, unit: "years" },
            { value: numberedStops, unit: "stops" },
          ]}
        />
        <RouteMap here="you are here" stops={route} />
      </IndexCard>
    </nav>
  );
}
