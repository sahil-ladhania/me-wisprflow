import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop, StopPending } from "../Stop";

const stop = stops[8];

/** After college: average offers, his own firm, and the cold email to Zomato's founder. */
export function NotAverage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Average offers. So I started my own thing."
        lede="Then I cold-emailed Zomato’s founder. Zomato wrote back."
      />
      <StopPending />
    </Stop>
  );
}
