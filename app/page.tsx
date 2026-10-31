import { DrawObserver } from "@/components/ds/DrawObserver";
import { ArrivalWatcher } from "@/components/ride/ArrivalWatcher";
import { Lane } from "@/components/ride/Lane";
import { RideProvider } from "@/components/ride/RideProvider";
import { Hero } from "@/components/ride/stops/00-Hero";
import { Stage } from "@/components/ride/stops/01-Stage";
import { WrongReason } from "@/components/ride/stops/02-WrongReason";
import { TheBike } from "@/components/ride/stops/03-TheBike";
import { BestTwoYears } from "@/components/ride/stops/04-BestTwoYears";
import { Terrace } from "@/components/ride/stops/05-Terrace";
import { Pasta } from "@/components/ride/stops/06-Pasta";
import { TwoAM } from "@/components/ride/stops/07-TwoAM";
import { NotAverage } from "@/components/ride/stops/08-NotAverage";
import { Night } from "@/components/ride/stops/09-Night";
import { Rebuild } from "@/components/ride/stops/10-Rebuild";
import { WisprFlow } from "@/components/ride/stops/11-WisprFlow";
import { Garage } from "@/components/ride/stops/12-Garage";

/** The ride: 2016 → 2026 on one black bike, one stop per screen, the lane pinned underneath. */
export default function Home() {
  return (
    <RideProvider>
      <main className="overflow-x-clip">
        <Hero />
        <Stage />
        <WrongReason />
        <TheBike />
        <BestTwoYears />
        <Terrace />
        <Pasta />
        <TwoAM />
        <NotAverage />
        <Night />
        <Rebuild />
        <WisprFlow />
        <Garage />
        {/* Last in the flow, so position: sticky keeps it at the bottom of the screen all the way down. */}
        <Lane />
      </main>
      <ArrivalWatcher />
      <DrawObserver />
    </RideProvider>
  );
}
