import { Correction, CorrectionText, Mark } from "@/components/ds/Correction";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { scans } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[11];

/** July 2026: a why-not cold email at midnight to Zomato's founder, and the engineering interview invite that came back. Pays off Stop 07. */
export function Zomato() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Midnight, a cold email, and Zomato wrote back."
        lede="One random midnight, I cold-emailed Zomato’s founder. Worst case: no reply. I’m used to those."
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
        {/* Back to Stop 07: the dream started with a 2am order in 2021, when Zomato hired from top engineering colleges. */}
        <p className="type-body">
          Zomato had been the dream since that 2am order in 2021. So had the doubt: no engineering degree, no interview. My email said it
          upfront:
        </p>
        <blockquote className="type-headline italic">
          “I never attended an engineering college, but I taught myself everything an engineer should know.”
        </blockquote>
        {/* Jul 5 to Jul 28, as the two scans show. */}
        <p className="type-body">
          Twenty-three days later, Zomato HR wrote back. I’d been shortlisted for the engineering team, and they asked which role I
          preferred.
        </p>
        <p className="type-lede">
          <Mark>The dream wrote back.</Mark> I’m still proud of that&nbsp;one.
        </p>
        <p className="type-body">I didn’t take the interview.</p>
        <CorrectionText className="type-lede">
          Why: <Correction inline was="arrogance" is="running Zyntohouse, then sick" />. It got rescheduled.
        </CorrectionText>
        <p className="type-headline">The invite’s still open.</p>
      </Columns>
    </Stop>
  );
}
