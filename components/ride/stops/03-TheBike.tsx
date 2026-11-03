import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[3];

/** The bike: the emotional anchor, why riding matters to him, and why we're riding. */
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
            I got around 80. No bike. I was gutted. Then one day, <Mark>he bought it anyway</Mark>.
          </>
        }
      />
      <Columns
        aside={
          <>
            {/* Pirsig's line on a slip of paper, in the site's own type: one short line, the car half in our words. */}
            <Land turn={3} className="w-full max-w-[400px]">
              <figure className="-rotate-1 bg-card px-5 py-4 shadow-lift">
                <p className="type-kicker">Pirsig said it better</p>
                <p className="mt-3 font-story text-[15px] leading-snug text-pencil italic">
                  In a car, you watch the world through a window. On a bike:
                </p>
                <blockquote className="mt-2 font-story text-[24px] leading-[1.15] font-medium italic sm:text-[26px]">
                  “You’re in the scene, not just watching it anymore.”
                </blockquote>
                <figcaption className="type-kicker mt-3">Robert M. Pirsig · Zen and the Art of Motorcycle Maintenance</figcaption>
              </figure>
            </Land>
          </>
        }
      >
        <StatRow>
          <BigStat value="90" unit="%" label="The deal" struck />
          <BigStat value="~80" unit="%" label="What I got" />
        </StatRow>
        <p className="type-body mt-3">
          A black Royal Enfield, my second love. I still ride it. Work is busy. The world is busy. On the bike, the engine gets loud and my head goes
          quiet.
        </p>
        <p className="type-lede">The dream: the best roads in the world, not just India’s. On my own bike.</p>
        <p className="type-body">It’s also why you’re on a bike right now.</p>
      </Columns>
    </Stop>
  );
}
