import { Correction } from "@/components/ds/Correction";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[2];

/** After Class 10: science, for the wrong reason. Light, no judgement about her. */
export function WrongReason() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="I chose science for the wrong reason."
        lede={
          <>
            I chose science because <Correction inline was="I wanted to crack IIT" is="my girlfriend did" />.
          </>
        }
      />
      <StopPending />
    </Stop>
  );
}
