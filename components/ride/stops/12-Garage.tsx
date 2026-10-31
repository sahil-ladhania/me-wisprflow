import Link from "next/link";
import { Correction } from "@/components/ds/Correction";
import { Signboard } from "@/components/ds/Signboard";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[12];

const link = "font-story text-[19px] text-ink underline decoration-wave-rest decoration-1 underline-offset-4 hover:decoration-ink";

/**
 * Road's end: proof it was all dictated, the real bloopers, the contact, and the sign pointing past
 * the end of the road. The last thing on the page is the green sign.
 */
export function Garage() {
  return (
    <Stop stop={stop} className="border-t-[1.5px] border-ink">
      <div className="flex flex-col gap-5">
        <p className="type-kicker">{stop.kicker}</p>
        <h2 id={titleId(stop)} className="type-stop-title max-w-[18ch] text-balance">
          Every line of this site was dictated through Wispr Flow.
        </h2>
        <p className="type-lede max-w-measure">Mishearings included. They stay in, struck the same way as my mistakes.</p>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-9">
        <div className="min-w-0">
          <p className="type-kicker">Dictation log · the bloopers</p>
          <ol className="mt-3 border-t border-rule" aria-label="Dictation bloopers">
            <li className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-rule py-3">
              <span className="type-meta pt-1 text-pencil">01</span>
              <span className="type-body">
                <Correction inline was="rolling field" is="Royal Enfield" />
              </span>
            </li>
            <li className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-rule py-3">
              <span className="type-meta pt-1 text-pencil">02</span>
              <span className="type-body italic text-pencil">[Placeholder: the next real mishearing, struck the same way.]</span>
            </li>
          </ol>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <p className="type-body">I don’t talk much. But when I speak, I speak well. This whole site is me, speaking.</p>
          <ul className="flex flex-col gap-3">
            <li>
              <span className="font-story text-[19px] text-ink">LinkedIn</span> <span className="type-meta text-pencil">[placeholder: profile link]</span>
            </li>
            <li>
              <span className="font-story text-[19px] text-ink">Email</span> <span className="type-meta text-pencil">[placeholder: address]</span>
            </li>
            <li>
              <Link href="/design-system" className={link}>
                The design system behind this ride
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-9 flex flex-col items-start gap-5">
        <p className="type-body max-w-measure">
          One day I want to open a small, cozy cafe in the mountains and cook for people. Not for money. Just because I love it.
        </p>
        <p className="type-meta text-pencil">Sahil Ladhania · Bangalore, from Patna · 2026</p>
        <Signboard dest="Mountains" sub="A small café · someday" />
      </div>
    </Stop>
  );
}
