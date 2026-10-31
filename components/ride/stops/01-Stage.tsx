import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[1];

/** 2016, Class 9: the cultural head wins the cooking contest. */
export function Stage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The dance guy entered the cooking contest."
        lede="About 95% of the contestants were girls. I won first prize. With a very basic dish."
      />
      <StopPending />
    </Stop>
  );
}
