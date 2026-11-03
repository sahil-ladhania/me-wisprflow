import { Correction, CorrectionText } from "@/components/ds/Correction";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { scans } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[11];

/** July 2026: the cold email to Zomato's founder, and the engineering interview invite that came back. Pays off Stop 07. */
export function Zomato() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Five years later, Zomato wrote back."
        lede="I cold-emailed Deepinder Goyal, Zomato’s founder. Their HR replied with an engineering interview invite."
      />
      <Columns
        aside={
          <>
            <Land>
              <ScannedDocument src={scans.coldEmail} label="Scan 04 · My cold email to Deepinder Goyal" alt="Screenshot of my cold email to Deepinder Goyal, Zomato’s founder" tilt={-0.8} />
            </Land>
            <Land order={1} turn={-4} className="lg:self-end">
              <ScannedDocument
                src={scans.zomatoReply}
                label="Scan 05 · Zomato HR’s reply: an engineering interview invite"
                alt="Screenshot of Zomato HR’s reply inviting me to an engineering interview"
                tilt={1}
              />
            </Land>
          </>
        }
      >
        {/* Back to Stop 07: in 2021, Zomato hired from top engineering colleges. */}
        <p className="type-body">In 2021 I was sure Zomato wouldn’t even interview me without an engineering degree. My email said it upfront:</p>
        <blockquote className="type-headline italic">
          “I never attended an engineering college, but I taught myself everything an engineer should know.”
        </blockquote>
        <p className="type-body">I didn’t take the interview.</p>
        <CorrectionText className="type-lede">
          Why: <Correction inline was="arrogance" is="running my firm, then sick" />. It got rescheduled.
        </CorrectionText>
        <p className="type-headline">The invite’s still open.</p>
      </Columns>
    </Stop>
  );
}
