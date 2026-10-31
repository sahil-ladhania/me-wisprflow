import Link from "next/link";
import { Icon } from "@/components/ds/Icon";

// A holding page until the ride itself is built (pass 2).
export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-page flex-col justify-center gap-5 px-4 py-9 xl:px-8">
      <p className="type-kicker">The Ride · 2016 → 2026</p>
      <h1 className="type-display">Engine’s off.</h1>
      <p className="type-lede max-w-measure">The design system is in. The ride itself is being built next.</p>
      <Link
        href="/design-system"
        className="type-kicker inline-flex min-h-11 items-center gap-2 self-start text-ink underline decoration-rule underline-offset-4 hover:text-red-pen"
      >
        See the design system
        <Icon name="arrow-right" size={18} />
      </Link>
    </main>
  );
}
