import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { IndexCard, IndexRow, IndexRows } from "@/components/ds/IndexCard";
import { MarginNote } from "@/components/ds/MarginNote";
import { StopHeader } from "@/components/ds/StopHeader";
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
          <Land className="flex w-full flex-col items-start gap-4">
            {/* Facts only, from his own account: no photo of that day yet. */}
            <IndexCard kicker="Card 01 · Class 9 me, in four lines" tilt={-1}>
              <IndexRows>
                <IndexRow label="Known for">Dance. I choreographed our school’s performances.</IndexRow>
                <IndexRow label="Secret skill">Cooking.</IndexRow>
                <IndexRow label="Winning dish">Very basic. Still won.</IndexRow>
                <IndexRow label="First person I told">Mom.</IndexRow>
              </IndexRows>
            </IndexCard>
            <MarginNote tilt={-2} className="ml-4">
              I knew I could cook. That day made it official.
            </MarginNote>
          </Land>
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
