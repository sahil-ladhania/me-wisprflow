import { Signboard } from "@/components/ds/Signboard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[11];

/** Next: Wispr Flow India. Why, the cold emails, the cold read, three experiments. */
export function WisprFlow() {
  return (
    <Stop stop={stop}>
      <div className="flex flex-col gap-7">
        <StopHeader
          milestone={stop.milestone}
          kicker={stop.kicker}
          titleId={titleId(stop)}
          title="I barely type anymore."
          lede="I use Wispr Flow every day. After Zomato, it’s the second product that gave me that feeling."
        />
        <div>
          <Signboard dest="Wispr Flow" sub="India · Growth · Any role" km="NEXT" arrow="up" />
        </div>
      </div>
      <StopPending />
    </Stop>
  );
}
