import { BigStat, StatRow } from "@/components/ds/BigStat";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[4];

/** Class 11–12: the best two years of his life, at full throttle. The trio, zero IIT prep. */
export function BestTwoYears() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Two years at full throttle. Zero IIT prep."
        lede="In 2018 I met my ride-or-die. Add one more, and we’ve been a trio ever since."
      />
      <Columns
        aside={
          <Land>
            <TapedPhoto src={photos.trio} alt="The trio" caption="still the same three." tilt={1.8} />
          </Land>
        }
      >
        <p className="type-body">I kept dancing and performing. IIT prep? Never started. Never wanted to.</p>
        <StatRow compact className="mt-3">
          <BigStat value="8" unit="+" label="years and counting" />
          {/* Each of us is sure the other two are the idiots. (And yes, a nod to the film.) */}
          <BigStat value="3" label="idiots, according to each other" />
        </StatRow>
      </Columns>
    </Stop>
  );
}
