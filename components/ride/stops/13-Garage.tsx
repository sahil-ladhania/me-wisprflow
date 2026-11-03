import type { CSSProperties } from "react";
import { Mark } from "@/components/ds/Correction";
import { Icon } from "@/components/ds/Icon";
import { Signboard } from "@/components/ds/Signboard";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { Waveform } from "@/components/ds/Waveform";
import { peaks } from "@/lib/design-system/peaks";
import { contact, photos } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[13];

// min-h-11: each one is a 44px tap target on phones.
const link =
  "inline-flex min-h-11 items-center gap-2 font-story text-[19px] text-ink underline decoration-wave-rest decoration-1 underline-offset-4 hover:decoration-ink";

/** A still voice mark under the garage's line: nothing's playing, so it doesn't move. */
const voiceMark = peaks(56, 9);

/**
 * Road's end: the line that sums the site up, how to say hello, and the restaurant past the end of
 * the road, as he imagines it. The last thing on the page is the green sign, where the bike parks.
 */
export function Garage() {
  return (
    <Stop stop={stop} className="border-t-[1.5px] border-ink">
      {/* The line that sums the site up is the garage's heading. */}
      <div data-arrive="" className="flex flex-col gap-5">
        <p className="type-kicker">{stop.kicker}</p>
        <h2
          id={titleId(stop)}
          className="max-w-[52rem] font-story text-[clamp(30px,2.4vw+18px,52px)] leading-[1.1] font-medium tracking-[-0.015em] text-balance"
        >
          I don’t talk much. But when I speak, I speak well. This whole site is me, speaking.
        </h2>
        {/* In a block of its own: the wave is a flex: 1 row, so straight in this column it would get no height. */}
        <div className="mt-1 max-w-[420px]">
          <Waveform peaks={voiceMark} />
        </div>
      </div>

      {/* Right under the line, so the way to reach him comes first. */}
      <div data-arrive="" style={{ "--arrive": "150ms" } as CSSProperties} className="mt-9 flex flex-col gap-3">
        <p className="type-kicker">Say hello</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-1">
          <li>
            {contact.linkedin ? (
              <a href={contact.linkedin} className={link} target="_blank" rel="noreferrer">
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
          <li>
            {contact.website ? (
              <a href={contact.website} className={link} target="_blank" rel="noreferrer">
                {new URL(contact.website).hostname.replace(/^www\./, "")}
                <Icon name="link-out" size={18} />
              </a>
            ) : (
              <>
                <span className="font-story text-[19px] text-ink">Website</span> <span className="type-meta text-pencil">[placeholder: address]</span>
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Past the end of the road: the restaurant, as he imagines it. */}
      <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-9">
        <p data-arrive="" style={{ "--arrive": "300ms" } as CSSProperties} className="type-headline max-w-[36rem] text-balance">
          One day: a small boutique restaurant in the mountains. Artisanal food, cooked by me, for whoever walks in. Not for money.{" "}
          <Mark>Just because I love it.</Mark>
        </p>
        <Land order={1} className="w-full">
          <TapedPhoto
            src={photos.restaurant}
            alt="The restaurant I imagine: a wooden cabin in the mountains at dusk, a chef at the open kitchen, people at one long table, a black bike parked outside"
            caption="the plan, roughly."
            tilt={1.4}
            ratio="16 / 9"
            tape="top"
            width="100%"
            sizes="(max-width: 600px) 90vw, 560px"
          />
        </Land>
      </div>

      <div data-arrive="land" style={{ "--arrive": "400ms", "--land-turn": "0deg" } as CSSProperties} className="mt-9">
        <Signboard dest="Mountains" sub="A boutique restaurant · someday" />
      </div>
    </Stop>
  );
}
