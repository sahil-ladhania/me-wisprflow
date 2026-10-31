import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[7];

/** 2021: a 2am Zomato order, and a reason to code. */
export function TwoAM() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="2am, a Zomato order, and a reason to code."
        lede="You open an app and food comes to your door. Someone built that feeling for thousands of people. I wanted to build that."
      />
      <StopPending />
    </Stop>
  );
}
