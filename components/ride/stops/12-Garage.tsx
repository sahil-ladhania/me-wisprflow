import type { CSSProperties } from "react";
import { Correction, Mark } from "@/components/ds/Correction";
import { Icon } from "@/components/ds/Icon";
import { Signboard } from "@/components/ds/Signboard";
import { Waveform } from "@/components/ds/Waveform";
import { peaks } from "@/lib/design-system/peaks";
import { bloopers, bloopersComplete, contact } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[12];

const row = "grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-rule py-3";

const link = "font-story text-[19px] text-ink underline decoration-wave-rest decoration-1 underline-offset-4 hover:decoration-ink";

/** A still voice mark under the garage's line: nothing's playing, so it doesn't move. */
const voiceMark = peaks(56, 9);

/**
 * Road's end: proof it was all dictated, the line that sums the site up, the real bloopers, the
 * contact, and the sign pointing past the end of the road. The last thing on the page is the green
 * sign, where the bike parks.
 */
export function Garage() {
  return (
    <Stop stop={stop} className="border-t-[1.5px] border-ink">
      <div data-arrive="" className="flex flex-col gap-5">
        <p className="type-kicker">{stop.kicker}</p>
        <h2 id={titleId(stop)} className="type-stop-title max-w-[18ch] text-balance">
          Every line of this site was dictated through Wispr Flow.
        </h2>
        <p className="type-lede max-w-measure">Mishearings included. They stay in, struck the same way as my mistakes.</p>
      </div>

      {/* The garage's centrepiece. */}
      <figure data-arrive="" style={{ "--arrive": "150ms" } as CSSProperties} className="mt-9 max-w-[52rem]">
        <blockquote className="font-story text-[clamp(30px,2.4vw+18px,52px)] leading-[1.1] font-medium tracking-[-0.015em] text-balance">
          I don’t talk much. But when I speak, I speak well. This whole site is me, speaking.
        </blockquote>
        <Waveform peaks={voiceMark} className="mt-6 max-w-[420px]" />
      </figure>

      <div
        data-arrive=""
        style={{ "--arrive": "200ms" } as CSSProperties}
        className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-9"
      >
        <div className="min-w-0">
          <p className="type-kicker">Dictation log · the bloopers</p>
          <ol className="mt-3 border-t border-rule" aria-label="Dictation bloopers">
            {bloopers.map((blooper, i) => (
              <li key={blooper.heard} className={row}>
                <span className="type-meta pt-1 text-pencil">{String(i + 1).padStart(2, "0")}</span>
                <span className="type-body">
                  <Correction inline was={blooper.heard} is={blooper.said} />
                </span>
              </li>
            ))}
            {bloopersComplete ? null : (
              <li className={row}>
                <span className="type-meta pt-1 text-pencil">{String(bloopers.length + 1).padStart(2, "0")}</span>
                <span className="type-body italic text-pencil">[Placeholder: the next real mishearing, struck the same way.]</span>
              </li>
            )}
          </ol>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <p className="type-kicker">Say hello</p>
          <ul className="flex flex-col gap-3">
            <li>
              {contact.linkedin ? (
                <a href={contact.linkedin} className={`${link} inline-flex items-center gap-2`} target="_blank" rel="noreferrer">
                  LinkedIn
                  <Icon name="link-out" size={18} />
                </a>
              ) : (
                <>
                  <span className="font-story text-[19px] text-ink">LinkedIn</span> <span className="type-meta text-pencil">[placeholder: profile link]</span>
                </>
              )}
            </li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              ) : (
                <>
                  <span className="font-story text-[19px] text-ink">Email</span> <span className="type-meta text-pencil">[placeholder: address]</span>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div data-arrive="land" style={{ "--arrive": "400ms", "--land-turn": "0deg" } as CSSProperties} className="mt-9 flex flex-col items-start gap-5">
        <p className="type-headline max-w-[36rem] text-balance">
          One day: a small boutique cafe in the mountains. Artisanal food, cooked by me, for whoever walks in. Not for money.{" "}
          <Mark>Just because I love it.</Mark>
        </p>
        <Signboard dest="Mountains" sub="A boutique cafe · someday" />
      </div>
    </Stop>
  );
}
