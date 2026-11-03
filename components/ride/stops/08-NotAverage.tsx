import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[8];

/** A bell curve drawn in ink: "average" at the peak, struck in red pen, and the far tail marked "here." */
function BellCurve() {
  return (
    <figure className="w-full max-w-[380px]">
      <svg
        viewBox="0 6 440 172"
        role="img"
        aria-label="A hand-drawn bell curve. The word average at its peak is crossed out in red pen. An arrow marks the far right tail: here."
        className="block h-auto w-full overflow-visible text-ink"
      >
        <path d="M10 170H430" fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-50" />
        <path
          d="M20 168C110 166 150 44 220 44C290 44 330 166 420 168"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <text x="220" y="30" textAnchor="middle" fill="currentColor" className="font-hand text-[22px]">
          average
        </text>
        <path d="M176 24C204 20 238 23 266 17" fill="none" strokeWidth="2.6" strokeLinecap="round" className="stroke-red-pen" />
        <circle cx="388" cy="164" r="5.5" fill="currentColor" />
        <text x="372" y="116" textAnchor="middle" fill="currentColor" className="font-hand text-[22px]">
          here.
        </text>
        <path
          d="M378 126C386 135 389 143 388 153M382.5 147.5L388 154L393.5 147.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <figcaption className="type-kicker mt-2">Fig. 08 · The one place I won’t park</figcaption>
    </figure>
  );
}

/** After college: decent, decent, average, so his own thing. (The Zomato email came later: Stop 11, July 2026.) */
export function NotAverage() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="Average offers. So I started my own thing."
        lede="I’m scared of being average."
      />
      <Columns
        aside={
          <Land turn={0} className="w-full max-w-[440px] border-t-[1.5px] border-ink pt-4">
            <p className="type-kicker">What I believe</p>
            <p className="type-headline mt-3">Either I need it all, or I don’t need it at all.</p>
            <p className="type-body mt-3">I want the best, and I’m willing to become the person who deserves it.</p>
          </Land>
        }
      >
        <p className="type-body">
          After college: decent money from freelancing. Six months of DSA, and I got decent at that too. Then the offers came. Average.
        </p>
        <p className="type-body">Decent was never the goal. So I didn’t join anyone. I decided to build my own thing.</p>
        <Land order={1} turn={-2} className="w-full">
          <BellCurve />
        </Land>
      </Columns>
    </Stop>
  );
}
