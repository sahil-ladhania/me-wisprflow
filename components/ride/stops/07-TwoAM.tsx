import { Mark } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[7];

const pattern = ["*", "* *", "* * *", "* * * *"];

/** 2021: a 2am Zomato order, and a reason to code. */
export function TwoAM() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="2am, a Zomato order, and a reason to code."
        lede="You open an app and food comes to your door. Someone built that feeling for thousands of people. I wanted to build that."
      />
      <Columns
        aside={
          <>
            <Land turn={0} className="w-full max-w-[440px]">
            <dl className="border-t-[1.5px] border-ink">
              <div className="border-b border-rule py-4">
                <dt className="type-kicker">Zomato hires from</dt>
                <dd className="type-headline mt-2">Top engineering colleges</dd>
              </div>
              <div className="border-b border-rule py-4">
                <dt className="type-kicker">Me, in 2021</dt>
                <dd className="type-headline mt-2">A BBA student teaching myself Python</dd>
              </div>
            </dl>
            </Land>
            <Land order={1} className="lg:self-end">
              <IndexCard kicker="Pattern problems · where it started" tilt={-1.5}>
                <div aria-hidden="true" className="mt-4 font-road text-[28px] leading-none font-semibold tracking-[0.32em]">
                  {pattern.map((row) => (
                    <div key={row}>{row}</div>
                  ))}
                </div>
                <p className="type-scribble mt-4 text-pencil">hard. also, peace.</p>
              </IndexCard>
            </Land>
          </>
        }
      >
        <p className="type-body">
          My brother worked at Zomato in Delhi. On weekend visits I watched him run code on a black terminal and kept asking, “What’s
          that?”
        </p>
        <p className="type-body">
          My school best friend was doing engineering and had come to hate coding. When I said I wanted to learn, he was shocked. He
          still told me: start with Python, solve pattern problems.
        </p>
        <p className="type-body">
          It was hard. <Mark>It gave me peace.</Mark>
        </p>
      </Columns>
    </Stop>
  );
}
