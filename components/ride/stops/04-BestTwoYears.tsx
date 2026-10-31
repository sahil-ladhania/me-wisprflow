import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[4];

/** Class 11–12: the best two years, the trio, zero IIT prep. */
export function BestTwoYears() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The best two years. Zero IIT prep."
        lede="I met my best friend in 2018. Nine years later, he still is."
      />
      <StopPending />
    </Stop>
  );
}
