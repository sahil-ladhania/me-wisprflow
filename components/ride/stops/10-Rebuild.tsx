import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[10];

/** August 2025 →: Zyntohouse, then lulu. The numbers live here. */
export function Rebuild() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Two months later, I was building again."
        lede="First an agency. Then a dating app where your voice goes first."
      />
      <StopPending />
    </Stop>
  );
}
