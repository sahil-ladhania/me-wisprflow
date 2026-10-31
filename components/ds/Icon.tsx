import type { ReactNode, SVGProps } from "react";

// The design system's control icons (design-system/assets/Icons): 24px grid, 1.75px stroke,
// round caps and joins. They draw in currentColor, so they take the colour of their text.
const icons = {
  /** The ignition key. */
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
    </>
  ),
  /** The ignition key when mic permission is denied. */
  "mic-off": (
    <path d="M15 10V6a3 3 0 0 0-5.7-1.3M9 9v2a3 3 0 0 0 4.6 2.5M5.5 11a6.5 6.5 0 0 0 10.6 5M18.5 11c0 .7-.1 1.4-.3 2M12 17.5V21M8.5 21h7M3.5 3.5l17 17" />
  ),
  /** Voice notes. Filled, so it reads at 22px inside a 48px disc. */
  play: <path d="M8.5 5.8v12.4L18.5 12z" fill="currentColor" />,
  /** Voice notes. Filled, like play. */
  pause: (
    <>
      <rect x="7" y="5.5" width="3.6" height="13" rx="1" fill="currentColor" />
      <rect x="13.4" y="5.5" width="3.6" height="13" rx="1" fill="currentColor" />
    </>
  ),
  /** "Read it instead" where a text label won't fit. */
  transcript: (
    <>
      <path d="M5 6.5h14M5 11h14M5 15.5h9" />
      <path d="M16.5 15.5l1.5 3 1.5-3" />
    </>
  ),
  /** Signboards and "Ride on". */
  "arrow-right": <path d="M3.5 12h16M13.5 6l6 6-6 6" />,
  /** The one hint under the hero after the engine starts. */
  "scroll-down": (
    <>
      <rect x="7.5" y="3" width="9" height="14" rx="4.5" />
      <path d="M12 7v3M8.5 20l3.5 2 3.5-2" />
    </>
  ),
  /** External links in the garage. */
  "link-out": <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 14v4.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1H10" />,
  /** The engine-sound mute chip. */
  mute: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  /** Width and height in px. */
  size?: number;
  /** Accessible name. Leave it out when the icon sits beside a text label. */
  label?: string;
};

export function Icon({ name, size = 24, label, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {icons[name]}
    </svg>
  );
}
