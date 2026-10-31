import { BigStat } from "@/components/ds/BigStat";
import { Correction } from "@/components/ds/Correction";
import { IndexCard, IndexRow, IndexRows } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { VoiceNote } from "@/components/ds/VoiceNote";
import { photos, voice } from "@/lib/ride/media";
import { stops, titleId, voiceId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[6];

/** College: ₹20,000 of pasta and the cafe that almost happened. */
export function Pasta() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Management on paper. Pasta in practice."
        lede="At a college fest, I set up a stall and sold ₹20,000 of pasta in 4–5 hours."
        voice="voice note"
      />
      <Columns
        aside={
          <>
            <Land>
              <TapedPhoto src={photos.pastaStall} alt="The pasta stall at the college fest" caption="₹20,000 in 4–5 hours." tilt={-1.8} />
            </Land>
            <Land order={1} turn={-4} className="lg:self-end">
              <IndexCard kicker="Card 06 · The cafe that almost happened" tilt={1}>
                <IndexRows>
                  <IndexRow label="Backer">My PG owner</IndexRow>
                  <IndexRow label="Split">50/50 profit</IndexRow>
                  <IndexRow label="Mine to run">Design, menu, team, operations. All of it.</IndexRow>
                  <IndexRow label="Tastings">Weekly, for a month</IndexRow>
                  <IndexRow label="Status">
                    <Correction inline was="Go" is="cancelled" />
                  </IndexRow>
                </IndexRows>
              </IndexCard>
            </Land>
          </>
        }
      >
        <BigStat value="₹20,000" label="of pasta from one fest stall" source="Sold in 4–5 hours." />
        <p className="type-body mt-2">
          I cooked so much at my PG that the owner gave me a separate room with a proper kitchen. He loved my food and offered to fund a
          cafe with me.
        </p>
        <p className="type-body">
          Then I asked Dad. He said, “You’re there to study. You won’t manage the time.” I cancelled. I was gutted.
        </p>
        <p className="type-body">
          Finance: hated the theory. Marketing: didn’t love the theory, loved the actual work. I specialised in marketing.
        </p>
        <VoiceNote id={voiceId("cafe")} about="the cafe that almost happened" {...voice.cafe} />
      </Columns>
    </Stop>
  );
}
