import { NightStop } from "@/components/ds/NightStop";
import { VoiceNote } from "@/components/ds/VoiceNote";
import { voice } from "@/lib/ride/media";
import { stops, titleId, voiceId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[9];

/**
 * June 2025. The quiet stop: one honest line, then what came after, in silence.
 * About his pain and his growth only. Nothing about the other person. No jokes, no red pen, no stats.
 */
export function Night() {
  return (
    <Stop stop={stop}>
      <NightStop date="June 2025" lineId={titleId(stop)} line="A relationship of about eight years ended. It was the lowest point of my life.">
        <VoiceNote id={voiceId("june2025")} about="June 2025" quiet {...voice.june2025} />
        <div className="mt-9 flex max-w-measure flex-col items-center gap-4">
          <p className="type-kicker">What came after</p>
          <p className="type-body">I grew closer to my dad, my parents, my brother and my friends.</p>
          <p className="type-body">I stopped taking life so seriously.</p>
          <p className="type-body">I don’t regret anything. Every step was me.</p>
          <p className="type-body">
            And I got deeply curious about people. I realised I didn’t truly know someone I’d been with for eight years.
          </p>
          <p className="type-night-line mt-7 max-w-[24ch] text-balance">
            Individuality doesn’t come from your college or your course. It comes from the wars you fought, and how you came out of
            them.
          </p>
        </div>
      </NightStop>
    </Stop>
  );
}
