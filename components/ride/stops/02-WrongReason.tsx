import { Correction } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[2];

const reasons = ["Parents said so", "Marks decided", "Everyone else did"];

/** After Class 10: science, for the wrong reason. Light, no judgement about her. */
export function WrongReason() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="I chose science for the wrong reason."
        lede={
          <>
            I chose science because <Correction inline was="I wanted to crack IIT" is="my girlfriend did" />.
          </>
        }
      />
      <Columns
        aside={
          <IndexCard kicker="Card 02 · How my class picked" tilt={-1.2}>
            <ul className="mt-4 border-t border-rule">
              {reasons.map((reason) => (
                <li key={reason} className="border-b border-rule py-3 font-story text-[19px] leading-snug">
                  {reason}
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule py-3 font-story text-[19px] leading-snug">
                <span>Wanted to become something</span>
                <span className="type-kicker">Very few</span>
              </li>
            </ul>
            <p className="type-scribble mt-4 text-pencil">me: none of the above.</p>
          </IndexCard>
        }
      >
        <p className="type-body">
          Science, commerce or arts. Most of my class picked for their parents, their marks or the herd. Very few picked to become
          something.
        </p>
        <p className="type-body">I told my parents I wanted to crack IIT. I had never even seen an IIT paper.</p>
        <p className="type-body">They never forced anything on me. That’s the funny part. And a little embarrassing.</p>
      </Columns>
    </Stop>
  );
}
