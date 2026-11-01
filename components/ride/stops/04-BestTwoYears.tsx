import { BigStat, StatRow } from "@/components/ds/BigStat";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
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
        lede="I met my two best friends in 2018. We’ve been a trio ever since."
      />
      <Columns
        aside={
          <Land>
            <TapedPhoto src={photos.trio} alt="The trio" caption="still the same three." tilt={1.8} />
          </Land>
        }
      >
        <p className="type-body">I kept dancing and performing. I never prepared for IIT, because I never wanted it.</p>
        <StatRow compact className="mt-3">
          <BigStat value="8" unit="+" label="years, same two friends" />
          <BigStat value="3" label="the trio" />
        </StatRow>
      </Columns>
    </Stop>
  );
}
