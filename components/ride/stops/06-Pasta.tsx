import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[6];

/** College: ₹20,000 of pasta and the cafe that almost happened. */
export function Pasta() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Management on paper. Pasta in practice."
        lede="At a college fest, I sold ₹20,000 of pasta in 4–5 hours."
      />
      <StopPending />
    </Stop>
  );
}
