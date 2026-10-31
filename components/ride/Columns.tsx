import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ColumnsProps = {
  /** The story: short paragraphs, capped at the reading measure. */
  children: ReactNode;
  /** The objects placed beside it: photos, scans, cards. At most two. */
  aside?: ReactNode;
  className?: string;
};

/** A stop's body: story copy on the left, the objects beside it; stacked on phones. */
export function Columns({ children, aside, className }: ColumnsProps) {
  return (
    <div className={cx("mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] lg:gap-9", className)}>
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
      {aside ? <div className="flex min-w-0 flex-col items-start gap-8 lg:pt-2">{aside}</div> : null}
    </div>
  );
}
