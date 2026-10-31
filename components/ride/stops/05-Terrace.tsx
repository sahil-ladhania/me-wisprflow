import { Correction, Mark } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[5];

const price = "mt-3 font-road text-[clamp(40px,2vw+26px,56px)] font-bold leading-[0.95] tabular-nums";

/** The amount, with "lakh" set smaller, like a stat's unit. */
function Lakh({ range }: { range: string }) {
  return (
    <>
      {range}
      <small className="ml-1 text-[0.5em] font-semibold">lakh</small>
    </>
  );
}

/** After Class 12: the terrace talk, and the first real sacrifice. */
export function Terrace() {
  return (
    <Stop stop={stop}>
      <StopHeader milestone={stop.milestone} kicker={stop.kicker} titleId={titleId(stop)} title="The terrace talk. My first real sacrifice." />
      <Columns
        aside={
          <>
            <IndexCard kicker="Culinary school" tilt={-1}>
              <p className={price}>
                <Correction inline was={<Lakh range="₹20–25" />} />
              </p>
            </IndexCard>
            <div className="lg:self-end">
              <IndexCard kicker="Management degree" tilt={0.8}>
                <p className={price}>
                  <Lakh range="₹10–12" />
                </p>
                <p className="type-pen mt-2 -rotate-2">the one I chose</p>
              </IndexCard>
            </div>
          </>
        }
      >
        <dl className="flex flex-col gap-3 border-y border-rule py-5">
          <div className="flex gap-4">
            <dt className="type-kicker w-10 shrink-0 pt-1">Dad</dt>
            <dd className="type-body">“What do you actually want to become?”</dd>
          </div>
          <div className="flex gap-4">
            <dt className="type-kicker w-10 shrink-0 pt-1">Me</dt>
            <dd className="type-body">“Papa, I want to be a chef and open a restaurant.”</dd>
          </div>
        </dl>
        <p className="type-body">He never mentioned money. He only said:</p>
        <p className="type-lede">
          <Mark>“If you really want it, go. I’ll manage it.</Mark> If you’re confused, don’t.”
        </p>
        <p className="type-body">
          I wanted it. But we’re a middle-class family, I’m the elder son, and my younger brother’s education was next. I didn’t want
          to be a burden.
        </p>
        <p className="type-body">
          <strong className="font-semibold">I chose management at Christ University.</strong>
        </p>
      </Columns>
    </Stop>
  );
}
