import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[3];

/** The bike: the emotional anchor, and why we're riding. */
export function TheBike() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Dad’s deal: 90% gets the bike."
        lede="I got around 80. No bike. Then one day, he bought it anyway."
      />
      <StopPending />
    </Stop>
  );
}
