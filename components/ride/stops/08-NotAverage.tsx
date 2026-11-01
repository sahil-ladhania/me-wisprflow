import { Correction, CorrectionText } from "@/components/ds/Correction";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { scans } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[8];

/** After college: average offers, his own firm, and the cold email to Zomato's founder (with the reply). */
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
              <ScannedDocument src={scans.coldEmail} label="Scan 02 · My cold email to Deepinder Goyal" alt="Screenshot of my cold email to Deepinder Goyal, Zomato’s founder" tilt={-0.8} />
            </Land>
            <Land order={1} turn={-4} className="lg:self-end">
              <ScannedDocument
                src={scans.zomatoReply}
                label="Scan 03 · Zomato HR’s reply: an engineering interview invite"
                alt="Screenshot of Zomato HR’s reply inviting me to an engineering interview"
                tilt={1}
              />
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
        <p className="type-headline">The invite’s still open.</p>

        <div className="mt-6 max-w-[440px] border-t-[1.5px] border-ink pt-4">
          <p className="type-kicker">What I believe</p>
          <p className="type-headline mt-3">Either I need it all, or I don’t need it at all.</p>
          <p className="type-body mt-3">I’m scared of being average, and I’m willing to become the person who deserves the best.</p>
        </div>
      </Columns>
    </Stop>
  );
}
