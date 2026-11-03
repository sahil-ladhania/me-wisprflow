import { BigStat, StatRow } from "@/components/ds/BigStat";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[4];

/** A doodle of the trio's peer review: each of us sure the other two are the idiots. */
function PeerReview() {
  const pairs = [
    { d: "M90 72Q160 38 230 72", label: { x: 160, y: 40, anchor: "middle" } },
    { d: "M70 106Q78 168 132 192", label: { x: 72, y: 162, anchor: "end" } },
    { d: "M250 106Q242 168 188 192", label: { x: 248, y: 162, anchor: "start" } },
  ] as const;
  const people = [
    { x: 64, y: 82, name: "me" },
    { x: 256, y: 82, name: "#2" },
    { x: 160, y: 206, name: "#3" },
  ];
  return (
    <figure className="w-full max-w-[340px]">
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-label="A doodle of the trio, me, #2 and #3, with arrows between each pair, all labelled idiot."
        className="block h-auto w-full overflow-visible text-ink"
      >
        <defs>
          <marker id="peer-review-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1 1L8 5L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {pairs.map((pair) => (
          <g key={pair.d}>
            <path
              d={pair.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerStart="url(#peer-review-arrow)"
              markerEnd="url(#peer-review-arrow)"
            />
            <text x={pair.label.x} y={pair.label.y} textAnchor={pair.label.anchor} fill="currentColor" className="font-hand text-[19px]">
              idiot.
            </text>
          </g>
        ))}
        {people.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x={p.x} y={p.y + 7} textAnchor="middle" fill="currentColor" className="font-hand text-[20px]">
              {p.name}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="type-kicker mt-2">Fig. 04 · Peer review, since 2018</figcaption>
    </figure>
  );
}

/** Class 11–12: the best two years of his life, at full throttle. The trio, zero IIT prep. */
export function BestTwoYears() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Two years at full throttle. Zero IIT prep."
        lede="In 2018 I met my ride-or-die. Add one more, and we’ve been a trio ever since."
      />
      <Columns
        aside={
          <Land turn={-2} className="w-full">
            <PeerReview />
          </Land>
        }
      >
        <p className="type-body">I kept dancing and performing. IIT prep? Never started. Never wanted to.</p>
        <StatRow compact className="mt-3">
          <BigStat value="8" unit="+" label="years and counting" />
          {/* Each of us is sure the other two are the idiots. (And yes, a nod to the film.) */}
          <BigStat value="3" label="idiots, according to each other" />
        </StatRow>
      </Columns>
    </Stop>
  );
}
