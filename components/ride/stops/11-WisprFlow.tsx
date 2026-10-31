import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Mark } from "@/components/ds/Correction";
import { ExperimentCard } from "@/components/ds/ExperimentCard";
import { IndexCard } from "@/components/ds/IndexCard";
import { Signboard } from "@/components/ds/Signboard";
import { StopHeader } from "@/components/ds/StopHeader";
import { experiments } from "@/lib/ride/media";
import { stops, titleId } from "@/lib/ride/stops";
import { ColdRead } from "../ColdRead";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[11];

const shortVersion = [
  "0 → 3,500+ signups, from my own LinkedIn content.",
  "I talk to users. Around 200 calls, by myself.",
  "I stop what isn’t working, even when it’s mine.",
  "I build. Self-taught full-stack and AI, plus a Bachelor’s in Computer Science from IGNOU.",
  "I thrive where product, growth and engineering meet.",
];

/** Next: Wispr Flow India. Why, the cold emails, the cold read, three experiments. */
export function WisprFlow() {
  return (
    <Stop stop={stop}>
      <div className="flex flex-col gap-7">
        <StopHeader
          milestone={stop.milestone}
          kicker={stop.kicker}
          titleId={titleId(stop)}
          title="I barely type anymore."
          lede="I use Wispr Flow every day. After Zomato, it’s the second product that gave me that feeling."
        />
        <Land order={-1} turn={0}>
          <Signboard dest="Wispr Flow" sub="India · Growth · Any role" km="NEXT" arrow="up" />
        </Land>
      </div>

      <Columns
        aside={
          <>
            <Land>
              <IndexCard kicker="Tanay, replying to my comment" tilt={0.8}>
                <blockquote className="type-headline mt-3 italic">“That’s a good goal to have, dude.”</blockquote>
                <p className="type-scribble mt-3 text-pencil">still working on it.</p>
              </IndexCard>
            </Land>
            <Land order={1} turn={0} className="w-full max-w-[440px] border-t-[1.5px] border-ink pt-4">
              <p className="type-kicker">The short version</p>
              <ul className="mt-2">
                {shortVersion.map((line) => (
                  <li key={line} className="border-b border-rule py-3 font-story text-[18px] leading-snug">
                    {line}
                  </li>
                ))}
              </ul>
            </Land>
          </>
        }
      >
        <p className="type-body">I’ve cold-emailed Tanay, Wispr’s co-founder, three or four times. No reply. Hence, this website.</p>
        <StatRow compact>
          <BigStat value="3–4" label="cold emails to Tanay" />
          <BigStat value="0" label="replies" />
          <BigStat value="1" label="website built instead" />
        </StatRow>
        <p className="type-body mt-2">
          I once watched a video where Tanay’s father talked about him as a curious child. I want my father to talk about me like that
          one day. I said so in the comments.
        </p>
      </Columns>

      <p className="mt-9 max-w-[46rem] font-story text-[clamp(30px,1.6vw+22px,46px)] leading-[1.12] font-medium tracking-[-0.015em] text-balance">
        <Mark>I’ll join in any role.</Mark> I believe in the mission. Without one, I get restless.
      </p>

      <div className="mt-9">
        <ColdRead />
      </div>

      <div className="mt-9">
        <p className="type-kicker">What I’d run first · India</p>
        <h3 className="type-headline mt-2">Three growth experiments for Wispr Flow India.</h3>
        {experiments.some((e) => !e.title) ? <p className="type-meta mt-2 text-pencil">Placeholders. I’m writing these myself.</p> : null}
        <div className="mt-8 flex flex-col gap-8">
          {/* Dealt, slightly offset, never a three-card row. */}
          <div className="max-w-[560px] lg:-rotate-[0.8deg]">
            <ExperimentCard id="Growth experiment 01" {...experiments[0]} />
          </div>
          <div className="max-w-[560px] lg:ml-[14%] lg:rotate-[0.6deg]">
            <ExperimentCard id="Growth experiment 02" {...experiments[1]} />
          </div>
          <div className="max-w-[560px] lg:ml-[6%] lg:-rotate-[0.4deg]">
            <ExperimentCard id="Growth experiment 03" {...experiments[2]} />
          </div>
        </div>
      </div>
    </Stop>
  );
}
