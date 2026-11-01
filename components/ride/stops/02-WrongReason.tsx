import { Correction } from "@/components/ds/Correction";
import { ScannedDocument, ScanLine, ScanRow, ScanRule } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[2];

/** A form's tick box, inked in by hand when it's ticked. */
function Box({ ticked, children }: { ticked?: boolean; children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false" className="shrink-0">
        <rect x="1.5" y="1.5" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {ticked ? <path d="M3.5 8.5l3 3.5 7-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> : null}
      </svg>
      {children}
      {ticked ? <span className="sr-only"> (ticked)</span> : null}
    </span>
  );
}

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
          <Land>
            {/* Not a scan: the real form is long gone, so this one says it's recreated. */}
            <ScannedDocument
              label="Card 02 · The form, as I filled it (recreated)"
              alt="A recreated Class 11 admission form"
              note="had never seen an IIT paper"
              tilt={-1.2}
            >
              <p className="type-kicker text-ink">Class XI · Admission form</p>
              <ScanRule />
              <div className="flex flex-col gap-2">
                <ScanRow label="Name">Sahil Ladhania</ScanRow>
                <ScanRow label="Stream">
                  <span className="flex flex-wrap gap-x-4 gap-y-1">
                    <Box ticked>Science</Box>
                    <Box>Commerce</Box>
                    <Box>Arts</Box>
                  </span>
                </ScanRow>
                <ScanRow label="Reason told to parents">“IIT”</ScanRow>
              </div>
              <ScanRule />
              <ScanLine width="46%" />
            </ScannedDocument>
          </Land>
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
