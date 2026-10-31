import type { SVGProps } from "react";

type MilestoneMarkProps = SVGProps<SVGSVGElement> & {
  /** Accessible name. Leave it out when the mark is decoration next to a name. */
  label?: string;
};

// The site's mark (design-system/assets/Marks/milestone-mark.svg): a milestone stone with a voice
// waveform cut into it. Multi-colour and never recoloured, so its colours are fixed, not tokens.
export function MilestoneMark({ label, ...rest }: MilestoneMarkProps) {
  return (
    <svg
      viewBox="0 0 84 120"
      width={84}
      height={120}
      focusable="false"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path d="M6 114V44A36 36 0 0 1 78 44v70z" fill="#fbf8f2" stroke="#17140f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M8 52V44a34 34 0 0 1 68 0v8z" fill="#e2a532" />
      <path d="M8 52h68" stroke="#17140f" strokeWidth="4" />
      <rect x="26" y="73" width="3.5" height="10" rx="1.75" fill="#17140f" />
      <rect x="32" y="69" width="3.5" height="18" rx="1.75" fill="#17140f" />
      <rect x="38" y="65" width="3.5" height="26" rx="1.75" fill="#17140f" />
      <rect x="44" y="71" width="3.5" height="14" rx="1.75" fill="#17140f" />
      <rect x="50" y="67" width="3.5" height="22" rx="1.75" fill="#17140f" />
      <rect x="56" y="74" width="3.5" height="8" rx="1.75" fill="#17140f" />
      <path d="M2 116h80" stroke="#17140f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
