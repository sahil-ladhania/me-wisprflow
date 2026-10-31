import { stops, titleId } from "@/lib/ride/stops";
import { HeroTitle, Ignition } from "../Ignition";
import { RouteCard } from "../RouteCard";
import { Stop } from "../Stop";

const stop = stops[0];

/** Engine off. The visitor says "let's ride" (or taps) and the ride begins. */
export function Hero() {
  return (
    <Stop stop={stop} className="pt-5">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2">
        <p className="type-kicker">The Ride · 2016 → 2026</p>
        <p className="type-kicker">For Wispr Flow · India growth</p>
      </div>
      {/* Top-aligned, so the ignition key stays in the first screen above the lane. */}
      <div className="mt-6 grid items-start gap-8 sm:mt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-9">
        <div className="flex min-w-0 flex-col gap-5">
          <p className="type-kicker">Sahil Ladhania · 25 · Bangalore, from Patna</p>
          <HeroTitle id={titleId(stop)} />
          <p className="type-lede max-w-[30rem]">Every portfolio today asked you to scroll. This one wants you to talk.</p>
          <div className="mt-2">
            <Ignition />
          </div>
        </div>
        <RouteCard />
      </div>
    </Stop>
  );
}
