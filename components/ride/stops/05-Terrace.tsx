import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[5];

/** After Class 12: the terrace talk, and the first real sacrifice. */
export function Terrace() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The terrace talk. My first real sacrifice."
        lede="Dad never mentioned money. He only said: “If you really want it, go. I’ll manage it. If you’re confused, don’t.”"
      />
      <StopPending />
    </Stop>
  );
}
