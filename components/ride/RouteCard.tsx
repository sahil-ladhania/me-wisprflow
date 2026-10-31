import { IndexCard } from "@/components/ds/IndexCard";
import { numberedStops, stops } from "@/lib/ride/stops";

/** The hero's index of the road: every stop, one tap away, for judges who skim. */
export function RouteCard() {
  return (
    <nav aria-label="The route">
      <IndexCard kicker={`Route card · ${numberedStops} stops`} tilt={1}>
        <ol className="mt-4 border-t border-rule">
          {stops.slice(1).map((stop) => (
            <li key={stop.anchor} className="border-b border-rule">
              <a
                href={`#${stop.anchor}`}
                className="flex min-h-11 items-baseline gap-4 py-2 text-ink no-underline hover:text-red-pen pointer-fine:min-h-0 pointer-fine:py-[7px]"
              >
                <span className="type-meta w-14 shrink-0 text-pencil">{stop.short}</span>{" "}
                <span className="font-story text-[17px] leading-snug">{stop.name}</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="type-scribble mt-4 text-pencil">shaped by dance, cooking and code.</p>
      </IndexCard>
    </nav>
  );
}
