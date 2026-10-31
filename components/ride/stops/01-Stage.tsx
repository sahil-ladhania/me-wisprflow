import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[1];

/** 2016, Class 9: the cultural head wins the cooking contest. */
export function Stage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The dance guy entered the cooking contest."
        lede="About 95% of the contestants were girls. I won first prize. With a very basic dish."
      />
      <Columns
        aside={
          <>
            <TapedPhoto alt="Me dancing on the school stage" caption="cultural head. everyone knew me." tilt={-2.5} />
            <div className="lg:self-end">
              <ScannedDocument label="Scan 01 · Cooking competition certificate" alt="The first-prize certificate" note="still have it." tilt={1.2} />
            </div>
          </>
        }
      >
        <p className="type-body">
          I was my school’s cultural head. I choreographed our performances and taught dance to seniors, juniors and my own batch.
          Everyone in school knew me.
        </p>
        <p className="type-body">
          Then teachers and friends asked, “You dance, you cook. What else can you do?” <Mark>That’s when I decided to become a chef.</Mark>
        </p>
        <StatRow compact className="mt-3">
          <BigStat value="~95" unit="%" label="of the contestants were girls" />
          <BigStat value="2–3" label="boys entered" />
          <BigStat value="1st" label="prize, with a very basic dish" />
        </StatRow>
      </Columns>
    </Stop>
  );
}
