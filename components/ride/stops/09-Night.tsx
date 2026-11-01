import { NightHighlight, NightStop } from "@/components/ds/NightStop";
import { stops, titleId } from "@/lib/ride/stops";
import { Stop } from "../Stop";

const stop = stops[9];

/**
 * June 2025. The quiet stop: one honest line, then what came after. About his pain and his growth
 * only; nothing about the other person. No jokes in the line itself, no red pen, no stats. What came
 * after is allowed its wit: it's the optimistic part.
 */
export function Night() {
  return (
    <Stop stop={stop}>
      <NightStop date="June 2025" lineId={titleId(stop)} line="A relationship of about eight years ended. It was the lowest point of my life.">
        <div className="mt-8 flex max-w-measure flex-col items-center gap-4">
          <p className="type-kicker">What came after</p>
          <p className="type-body">
            I got closer to my dad. And my parents, my brother, my friends. Turns out they’d been there the whole time.
          </p>
          <p className="type-body">I stopped taking life so seriously. Exhibit A: this website.</p>
          <p className="type-body">No regrets. Every wrong turn was mine.</p>
          <p className="type-body">
            And I got deeply curious about people. I realised I didn’t truly know someone I’d been with for eight years. So now I ask
            better questions. Ask the ~200 lulu users.
          </p>
        </div>
        <NightHighlight>
          Individuality doesn’t come from your college or your course. It comes from the wars you fought, and how you came out of them.
        </NightHighlight>
      </NightStop>
    </Stop>
  );
}
