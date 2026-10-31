import type { Metadata } from "next";
import { Milestone } from "@/components/ds/Milestone";
import { Signboard } from "@/components/ds/Signboard";

export const metadata: Metadata = {
  title: "Wrong turn",
};

/** Any address that isn't on the road. */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-page flex-col justify-center gap-6 px-4 py-9 xl:px-8">
      <div className="flex flex-wrap items-end gap-5">
        <Milestone cap="WRONG TURN" year="404" />
        <p className="type-kicker pb-1">Off the road</p>
      </div>
      <h1 className="type-display">Wrong turn.</h1>
      <p className="type-lede max-w-measure">This road doesn’t exist. The ride is the other way.</p>
      <div>
        <Signboard dest="The Ride" sub="2016 → 2026 · back on the road" href="/" />
      </div>
    </main>
  );
}
