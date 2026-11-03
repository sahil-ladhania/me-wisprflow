import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos, scans } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[1];

/** 2016, Class 9: the dance guy wins the cooking contest. */
export function Stage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The dance guy entered the cooking contest."
        lede="I won first prize. With a very basic dish."
      />
      <Columns
        aside={
          <>
            <Land>
              <TapedPhoto src={photos.dance} alt="Me dancing on the school stage" caption="5, 6, 7, 8." tilt={-2.5} />
            </Land>
            <Land order={1} turn={-4} className="lg:self-end">
              <ScannedDocument
                src={scans.certificate}
                label="Scan 01 · Cooking competition certificate"
                alt="The first-prize certificate"
                note={"I knew I could cook.\nThis made it official."}
                tilt={1.2}
              />
            </Land>
          </>
        }
      >
        <p className="type-body">
          I was the guy who <Mark>led the school’s cultural events</Mark>. I choreographed our performances and taught dance to{" "}
          <strong className="font-semibold">seniors</strong>, juniors and my own batch. Most of the school knew me as the dance&nbsp;guy.
        </p>
        {/* First overall, not first among the few boys. */}
        <StatRow compact className="mt-3">
          <BigStat value="~95" unit="%" label="of the contestants were girls" />
          <BigStat value="2–3" label="boys, me included" />
          <BigStat value="1st" label="out of everyone, not just the boys" />
        </StatRow>
        <p className="type-body">
          Friends and teachers kept asking: “Sahil, you dance, you cook. What else can you do?”
        </p>
      </Columns>
    </Stop>
  );
}
