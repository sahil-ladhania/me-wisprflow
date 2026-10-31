import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[3];

/** The bike: the emotional anchor, and why we're riding. */
export function TheBike() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Dad’s deal: 90% gets the bike."
        lede={
          <>
            I got around 80. No bike. Then one day, <Mark>he bought it anyway</Mark>.
          </>
        }
      />
      <Columns
        aside={
          <Land turn={-4} className="w-full">
            <TapedPhoto src={photos.bike} alt="The black bike" caption="second love." tilt={1.6} ratio="4 / 3" tape="top" width="min(100%, 480px)" />
          </Land>
        }
      >
        <StatRow>
          <BigStat value="90" unit="%" label="The deal" struck />
          <BigStat value="~80" unit="%" label="What I got" />
        </StatRow>
        <p className="type-body mt-3">A black Royal Enfield. I still ride it. It’s my second love.</p>
        <p className="type-body">It’s also why you’re on a bike right now.</p>
      </Columns>
    </Stop>
  );
}
