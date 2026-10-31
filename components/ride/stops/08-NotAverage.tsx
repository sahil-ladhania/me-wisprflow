import { Correction, CorrectionText } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[8];

/** After college: average offers, his own firm, and the cold email to Zomato's founder. */
export function NotAverage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Average offers. So I started my own thing."
        lede="Then I cold-emailed Zomato’s founder. Zomato wrote back."
      />
      <Columns
        aside={
          <>
            <Land>
            <IndexCard kicker="To: Zomato’s founder · the gist" tilt={-0.8}>
              <p className="mt-4 font-story text-[20px] leading-normal">
                I’m a curious kid like you. I don’t have an engineering degree. I taught myself. I want to work with your team.
              </p>
              <div className="mt-4 border-t border-rule pt-4">
                <p className="type-kicker">Reply · Zomato HR</p>
                <p className="mt-2 font-story text-[19px] leading-snug">An engineering interview invite. And a question: what role do you want?</p>
              </div>
            </IndexCard>
            </Land>
            <Land order={1} turn={0} className="w-full max-w-[440px] border-t-[1.5px] border-ink pt-4 lg:self-end">
              <p className="type-kicker">What I believe</p>
              <p className="type-headline mt-3">Either I need it all, or I don’t need it at all.</p>
              <p className="type-body mt-3">I’m scared of being average. I’m willing to become the person who deserves the best.</p>
            </Land>
          </>
        }
      >
        <p className="type-body">
          I freelanced, earned decently and studied DSA for six months. The jobs on offer weren’t great. So I started my own firm.
        </p>
        <p className="type-body">Zomato’s HR replied with an engineering interview invite. I didn’t take it.</p>
        <CorrectionText className="type-lede">
          Why: <Correction inline was="arrogance" is="running my firm, then sick" />. It got rescheduled.
        </CorrectionText>
      </Columns>
    </Stop>
  );
}
