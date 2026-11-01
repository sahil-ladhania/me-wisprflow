import { Correction, Mark } from "@/components/ds/Correction";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { photos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[5];

/** The price, with "lakh" set smaller, like a stat's unit. */
function Lakh({ amount }: { amount: string }) {
  return (
    <>
      {amount}
      {/* A real space, set small, so it reads and copies as "~₹80 lakh". */}
      <small className="text-[0.5em] font-semibold">{" lakh"}</small>
    </>
  );
}

/** After Class 12: the terrace talk. Paris was the dream; he chose his family instead. Never sad about it. */
export function Terrace() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="The terrace talk."
        lede="The dream was Paris. The choice was love."
      />
      <Columns
        aside={
          <Land className="w-full">
            {/* The school, with its price tag taped over the corner: struck, and the truth written under it. */}
            <div className="relative w-full max-w-[420px] pb-20">
              <TapedPhoto
                src={photos.leCordonBleu}
                alt="Le Cordon Bleu, Paris"
                tilt={-1.6}
                ratio="4 / 3"
                tape="top"
                width="100%"
                sizes="(max-width: 600px) 90vw, 420px"
              />
              <div className="absolute right-0 bottom-0 rotate-[3deg] bg-card px-4 py-3 shadow-lift sm:-right-5">
                <p className="type-kicker">Le Cordon Bleu · Paris</p>
                <p className="mt-1 font-road text-[40px] leading-none font-bold tabular-nums">
                  <Correction was={<Lakh amount="~₹80" />} />
                </p>
                <p className="type-pen mt-1 -rotate-2">chose love instead</p>
              </div>
            </div>
          </Land>
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
          Le Cordon Bleu, Paris: ~₹80 lakh. Dad’s answer: “I’ll manage it.” My answer: “Let’s not.”
        </p>
        <p className="type-body">He’d never have said no. So I did. I’m the elder son, and my brother had a turn coming.</p>
        <p className="type-body">
          <strong className="font-semibold">I took the scenic route instead: Christ University.</strong>
        </p>
      </Columns>
    </Stop>
  );
}
