import { Mark } from "@/components/ds/Correction";
import { IndexCard } from "@/components/ds/IndexCard";
import { StopHeader } from "@/components/ds/StopHeader";
import { stops, titleId } from "@/lib/ride/stops";
import { Columns, Land } from "../Columns";
import { Stop } from "../Stop";

const stop = stops[7];

const pattern = ["*", "* *", "* * *", "* * * *"];

/** 2021: a 2am Zomato order, a new dream (engineer at Zomato), and a reason to code. Stop 11 pays it off. */
export function TwoAM() {
  return (
    <Stop stop={stop}>
      <StopHeader
        milestone={stop.milestone}
        kicker={stop.kicker}
        titleId={titleId(stop)}
        title="2am, a Zomato order, and a reason to code."
        lede="You open an app and food comes to your door. Someone built that feeling for thousands of people. New dream: build it at Zomato, as an engineer."
      />
      <Columns
        aside={
          <>
            <Land turn={0} className="w-full max-w-[440px]">
            <dl className="border-t-[1.5px] border-ink">
              <div className="border-b border-rule py-4">
                <dt className="type-kicker">Zomato hires from</dt>
                <dd className="type-headline mt-2 text-balance">Top engineering colleges</dd>
              </div>
              <div className="border-b border-rule py-4">
                <dt className="type-kicker">Me, in 2021</dt>
                <dd className="type-headline mt-2 text-balance">A BBA student, learning Python on my own</dd>
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
                <p className="type-scribble mt-4 text-pencil">hard. also, addictive.</p>
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
          My school best friend was doing engineering and had come to hate coding. When I said I wanted to learn, he said, “Bro, what
          are you even saying?” He still told me: start with Python, solve pattern problems.
        </p>
        <p className="type-body">
          It was hard. <Mark>Every solved pattern was a dopamine hit.</Mark>
        </p>
      </Columns>
    </Stop>
  );
}
