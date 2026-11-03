import { IndexCard, IndexRow, IndexRows } from "@/components/ds/IndexCard";
import { NightHighlight, NightStop } from "@/components/ds/NightStop";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[9];

/**
 * June 2025. A bump in the road, told lightly: the speed breaker nobody painted, then what it fixed.
 * About his pain and his growth only; nothing about the other person, no details of how it ended.
 * No red pen, no stats.
 */
export function Night() {
  return (
    <Stop stop={stop}>
      <NightStop date="June 2025" lineId={titleId(stop)} line="The biggest speed breaker of my life. Unpainted, obviously.">
        <p className="type-body max-w-measure text-balance text-pencil">A long relationship ended. The details stay with me. The lessons are below.</p>
        {/* Speed breakers break things. This one fixed a few. */}
        <IndexCard kicker="What the speed breaker fixed" className="mt-2 text-left">
          <IndexRows>
            <IndexRow label="What broke">My confidence, for a while.</IndexRow>
            <IndexRow label="Got closer to">Dad. Then my parents, my brother, my friends. Turns out they’d been there all along.</IndexRow>
            <IndexRow label="Let go of">Taking life so seriously. Exhibit A: this website.</IndexRow>
            <IndexRow label="Stopped carrying">Regrets. Every wrong turn was mine, and I own them.</IndexRow>
            <IndexRow label="Picked up">A habit of asking better questions. Ask the ~200 lulu users.</IndexRow>
            <IndexRow label="Back on the road">Two months later. August 2025.</IndexRow>
          </IndexRows>
        </IndexCard>
        <NightHighlight>A college or a course can’t give you individuality. The roads you survive do.</NightHighlight>
      </NightStop>
    </Stop>
  );
}
