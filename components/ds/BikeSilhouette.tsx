import type { SVGProps } from "react";

type BikeSilhouetteProps = SVGProps<SVGSVGElement> & {
  /** Light the headlamp lens (engine on; the only light on the Night stop). */
  headlamp?: boolean;
};

// The flat bike with rider (design-system/assets/Placeholders/bike-silhouette.svg), facing right, drawn
// in currentColor. Now only the route map's tiny "you are here" marker; the lane's bike is BikeArt.
export function BikeSilhouette({ headlamp, ...rest }: BikeSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="50" cy="114" r="29" strokeWidth="7" />
      <circle cx="192" cy="114" r="29" strokeWidth="7" />
      <circle cx="50" cy="114" r="4" fill="currentColor" stroke="none" />
      <circle cx="192" cy="114" r="4" fill="currentColor" stroke="none" />
      <path d="M16 104a36 36 0 0 1 56-26" strokeWidth="5" />
      <path d="M166 90a36 36 0 0 1 58 14" strokeWidth="5" />
      <path d="M192 114 172 52" strokeWidth="6" />
      <path d="M50 114 104 106" strokeWidth="6" />
      <path d="M104 90 84 72l76-4-18 26" strokeWidth="5" />
      <rect x="96" y="86" width="46" height="30" rx="5" fill="currentColor" strokeWidth="2" />
      <path d="M104 120 34 128" strokeWidth="5" />
      <path d="M112 68c6-16 44-18 54-6l-6 10-48 2z" fill="currentColor" strokeWidth="2" />
      <path d="M70 70l42-2-2 8-36 2z" fill="currentColor" strokeWidth="2" />
      <circle cx="181" cy="55" r="8" fill="currentColor" strokeWidth="2" />
      {headlamp ? <circle data-headlamp="" cx="183" cy="55" r="4.5" fill="var(--headlamp)" stroke="none" /> : null}
      <path d="M164 41l11 6-13 6" strokeWidth="4" />
      <circle cx="119" cy="16" r="11" fill="currentColor" stroke="none" />
      <path d="M114 31 100 64" strokeWidth="16" />
      <path d="M112 37l28 9 23-2" strokeWidth="7" />
      <path d="M100 66l30 8-2 30" strokeWidth="10" />
    </svg>
  );
}
