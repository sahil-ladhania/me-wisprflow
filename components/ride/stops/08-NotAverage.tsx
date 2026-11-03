import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[8];

/** After college: average offers, so his own firm. (The Zomato email came later: Stop 11, July 2026.) */
export function NotAverage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Average offers. So I started my own thing."
        lede="I’m scared of being average."
      />
      <Columns
        aside={
          <Land turn={0} className="w-full max-w-[440px] border-t-[1.5px] border-ink pt-4">
            <p className="type-kicker">What I believe</p>
            <p className="type-headline mt-3">Either I need it all, or I don’t need it at all.</p>
            <p className="type-body mt-3">I want the best, and I’m willing to become the person who deserves it.</p>
          </Land>
        }
      >
        <p className="type-body">
          I freelanced, earned decently and studied DSA for six months. The jobs on offer weren’t great. So I started my own firm.
        </p>
      </Columns>
    </Stop>
  );
}
