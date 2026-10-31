import { NightStop } from "@/components/ds/NightStop";
import { VoiceNote } from "@/components/ds/VoiceNote";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[9];

/**
 * June 2025. The quiet stop: one honest line, about his pain and what came after.
 * Nothing about the other person. No jokes on this screen.
 */
export function Night() {
  return (
    <Stop stop={stop}>
      <NightStop date="June 2025" lineId={titleId(stop)} line="A relationship of about eight years ended. It was the lowest point of my life.">
        <VoiceNote id="voice-june-2025" about="June 2025" quiet />
      </NightStop>
    </Stop>
  );
}
