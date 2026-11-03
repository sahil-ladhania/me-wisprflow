import { BigStat } from "@/components/ds/BigStat";
import { Correction, Mark } from "@/components/ds/Correction";
import { IndexCard, IndexRow, IndexRows } from "@/components/ds/IndexCard";
import { MarginNote } from "@/components/ds/MarginNote";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos, videos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[6];

/** College: BBA by day, a kitchen by night. The pasta stall, the cafe that almost happened, and marketing. */
export function Pasta() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="BBA by day. Kitchen by night."
        lede="At a college fest, I set up a stall and sold ₹20,000 of pasta in 4–5 hours."
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
          I cooked so much at my PG that the owner gave me a separate room with a proper kitchen. He loved my food and{" "}
          <Mark>offered to fund a cafe</Mark> with me.
        </p>
        <p className="type-body">I asked Dad. He said, “You’re there to study. You won’t manage the time.” I cancelled.</p>
        <p className="type-body">I said no to my own cafe. Politely. Still the hardest no I’ve said.</p>
      </Columns>

      <Columns
        className="mt-9"
        aside={
          // Full column width: a playing clip has no width of its own, so the print would collapse.
          <Land className="w-full">
            <TapedPhoto
              video
              src={videos.cooking.src}
              poster={videos.cooking.poster}
              sound={videos.cooking.sound}
              alt="Me cooking in the kitchen: a pan flaring on the stove"
              tilt={1.6}
              tape="top"
            />
          </Land>
        }
      >
        <p className="type-headline text-balance">Finance: hated the theory. Marketing: didn’t love the theory, loved the work.</p>
        <p className="type-body">I specialised in marketing.</p>
        <MarginNote pencil className="mt-2 ml-2">
          hello, growth.
        </MarginNote>
      </Columns>
    </Stop>
  );
}
