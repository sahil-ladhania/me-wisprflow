import { BigStat, StatRow } from "@/components/ds/BigStat";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns } from "../Columns";
import { Stop } from "../Stop";

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
      <Columns
        aside={
          <StatRow className="w-full">
            <BigStat value="9" label="years, same best friend" />
            <BigStat value="3" label="of us. The trio." />
          </StatRow>
        }
      >
        <p className="type-body">We were a trio. I kept dancing and performing.</p>
        <p className="type-body">I never prepared for IIT, because I never wanted it.</p>
      </Columns>
    </Stop>
  );
}
