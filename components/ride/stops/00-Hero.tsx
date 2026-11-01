import { stops, titleId } from "@/lib/ride/stops";
import { Ignition } from "../Ignition";
import { RouteCard } from "../RouteCard";
import { Stop } from "../Stop";

const stop = stops[0];

/** Who he is, in one line, then the invitation: say "let's ride" (or tap) and the ride begins. */
export function Hero() {
  return (
    <Stop stop={stop}>
      {/* Top-aligned, so the ignition key stays in the first screen above the lane. Where the card
          stacks underneath (below lg), the first screen is all hero and the bike on its road: the
          card starts just below the screen, never behind the bike. */}
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-9">
        <div className="flex min-w-0 flex-col gap-5 max-lg:min-h-[calc(100svh_-_clamp(32px,6vh,72px)_-_var(--spacing-8)_+_8px)]">
          <p className="font-story text-[22px] leading-tight font-medium text-ink sm:text-[26px]">Sahil Ladhania</p>
          <h1 id={titleId(stop)} className="type-display text-balance">
            Obsession beats IQ.
          </h1>
          <p className="type-lede max-w-[31rem]">Whatever I love, I go all in. Dance, food, code, people. Next: growing Wispr Flow in India.</p>
          <div className="mt-3 flex flex-col gap-4 sm:mt-5">
            <p className="type-body text-ink">Whoever you are, let me take you for a ride.</p>
            <Ignition />
          </div>
        </div>
        <RouteCard />
      </div>
    </Stop>
  );
}
