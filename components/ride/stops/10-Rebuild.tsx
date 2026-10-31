import type { ReactNode } from "react";
import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Correction, Mark } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { ScannedDocument } from "@/components/ds/ScannedDocument";
import { StopHeader } from "@/components/ds/StopHeader";
import { VoiceNote } from "@/components/ds/VoiceNote";
import { scans, voice } from "@/lib/ride/media";
import { stops, titleId, voiceId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[10];

/** One line of the logbook: what, when, with whom. */
function LogRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-5 gap-y-1 border-y border-rule py-4 sm:grid-cols-[150px_minmax(0,1fr)]">
      <p className="type-kicker pt-1">{label}</p>
      <p className="type-body">{children}</p>
    </div>
  );
}

/** August 2025 →: Zyntohouse, then lulu. The strongest growth proof on the page: the numbers live here. */
export function Rebuild() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Two months later, I was building again."
        lede="First an agency. Then a dating app where your voice goes first."
        voice="voice note"
      />

      <Columns
        aside={
          <>
            <Land>
              <ScannedDocument src={scans.waitlist} label="Scan 02 · The lulu waitlist" alt="Screenshot of the lulu waitlist dashboard" tilt={-1} />
            </Land>
            <Land order={1} turn={0} className="w-full">
              <VoiceNote id={voiceId("lulu")} about="lulu, and why voice" {...voice.lulu} />
            </Land>
          </>
        }
      >
        <LogRow label="Aug 2025 · Zyntohouse">
          A two-person tech agency for Indian SMBs and non-tech founders, with my co-founder Harshit.
        </LogRow>
        <h3 className="type-headline mt-4">lulu: personality first, through voice.</h3>
        <p className="type-body">
          The idea came from the voice notes I kept listening to after the breakup. I could feel every emotion in them. Voice is human
          in a way text isn’t.
        </p>
        <p className="type-body">I installed every dating app, Hinge, Tinder and more, to study what they trigger.</p>
        <p className="type-body">
          My thesis: people swipe on looks and only read prompts after liking the photo. But someone less conventionally attractive can
          still be a great partner.
        </p>
      </Columns>

      <div className="mt-9">
        <StatRow>
          <BigStat value="3,500" unit="+" label="signups on lulu’s waitlist" source="From 0, grown through my own LinkedIn content." />
          <BigStat value="37" unit="%" label="of them women" pen="on a dating app." />
          <BigStat value="~200" label="users I spoke to myself" source="Plus a working prototype I demoed on calls." />
        </StatRow>
      </div>

      <Columns
        className="mt-9"
        aside={
          <Land>
          <IndexCard kicker="Card 10 · What ~200 calls taught me" tilt={-1}>
            <div className="mt-4">
              <p className="type-kicker">What people said</p>
              <p className="type-headline mt-2 italic">“Nice idea, very unique.”</p>
            </div>
            <div className="mt-4 border-t border-rule pt-4">
              <p className="type-kicker">What people did</p>
              <p className="type-headline mt-2">Still swiped on looks.</p>
            </div>
            <p className="type-scribble mt-4 text-pencil">words are cheap. swipes aren’t.</p>
          </IndexCard>
          </Land>
        }
      >
        <h3 className="type-headline">After about six months, the signals weren’t real.</h3>
        <p className="type-body">I paused lulu in September 2026.</p>
        <p className="type-lede">
          <Mark>Knowing when to stop is a growth skill too.</Mark>
        </p>
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="type-kicker text-ink">lulu status</span>
          <span className="type-body">
            <Correction inline was="building" is="paused" />
          </span>
        </p>
      </Columns>

      <div className="mt-9">
        <LogRow label="Now · Custra">A B2B AI creative-intelligence product I’m building with my co-founder Pratik.</LogRow>
      </div>
    </Stop>
  );
}
