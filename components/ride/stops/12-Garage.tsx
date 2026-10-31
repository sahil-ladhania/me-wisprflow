import { Signboard } from "@/components/ds/Signboard";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[12];

/** Road's end: proof it was all dictated, the bloopers, the contact, the café in the mountains. */
export function Garage() {
  return (
    <Stop stop={stop} className="border-t-[1.5px] border-ink">
      <div className="flex flex-col gap-6">
        <p className="type-kicker">{stop.kicker}</p>
        <h2 id={titleId(stop)} className="type-stop-title max-w-[18ch] text-balance">
          Every line of this site was dictated through Wispr Flow.
        </h2>
        <div>
          <Signboard dest="Mountains" sub="A small café · someday" />
        </div>
      </div>
      <StopPending />
    </Stop>
  );
}
