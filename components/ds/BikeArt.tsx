import type { CSSProperties, SVGProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./Bike.module.css";

export type BikeArtProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Prefix for the gradient ids, unique on the page. */
  idPrefix: string;
  /** Headlamp lit: warm lens, soft glow, a beam reaching ahead. Off: dark glass. */
  headlamp?: boolean;
  /** The visitor, in the haldi helmet, on the pillion seat. Hops on when this turns true. */
  pillion?: boolean;
};

// A classic black single-cylinder bike, side on, facing right: the ride's bike, with Sahil on it.
// Drawn on a 320 × 200 grid (the lane's 1.6 aspect), ground at y = 196. No logo, no wordmark,
// no number plate. Colours are the illustration's own, not tokens; the lamp is the headlamp token's
// value (the same by day and by night), written out so the link preview image can draw it too.
// The wheels turn with --wheel-turn (degrees), which the lane sets from how far the road has moved.
// No hooks and nothing that needs the stylesheet to look right (the lamp's on/off is inline), so the
// link preview image can draw it too; components/ds/Bike.tsx is the page's version.

/** The headlamp token, #f6e7bf in both themes. */
const LAMP = "#f6e7bf";

const REAR = { x: 84, y: 161 };
const FRONT = { x: 234, y: 161 };

const round = (n: number) => Math.round(n * 10) / 10;

/** Crossed spokes, hub to rim, as one path: 16 laced each way. */
function spokes(cx: number, cy: number): string {
  const hub = 6;
  const rim = 26.5;
  const at = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${round(cx + r * Math.cos(a))} ${round(cy + r * Math.sin(a))}`;
  };
  let d = "";
  for (let k = 0; k < 16; k++) {
    const t = k * 22.5;
    d += `M${at(hub, t)}L${at(rim, t + 24)}`;
    d += `M${at(hub, t + 11.25)}L${at(rim, t + 11.25 - 24)}`;
  }
  return d;
}

/** One wheel: tyre, chrome rim, spokes and hub. The tread marks turn with the rim, so the spin reads. */
function Wheel({ at, chrome, drum }: { at: { x: number; y: number }; chrome: string; drum: number }) {
  return (
    <g>
      <circle cx={at.x} cy={at.y} r={31.5} fill="none" stroke="#1a1816" strokeWidth={7} />
      <circle cx={at.x} cy={at.y} r={28.3} fill="none" stroke="#34302c" strokeWidth={0.8} />
      <g className={styles.wheel} style={{ transformOrigin: `${at.x}px ${at.y}px` } as CSSProperties}>
        <circle cx={at.x} cy={at.y} r={34.3} fill="none" stroke="#2c2926" strokeWidth={1.1} strokeDasharray="2.2 2.6" />
        <circle cx={at.x} cy={at.y} r={27.2} fill="none" stroke={chrome} strokeWidth={2.6} />
        <path d={spokes(at.x, at.y)} stroke="#c9ccd0" strokeWidth={0.65} />
        <circle cx={at.x} cy={at.y} r={drum} fill="#2a2724" />
        <circle cx={at.x} cy={at.y} r={drum - 3} fill={chrome} />
        <circle cx={at.x + drum - 5} cy={at.y - 2} r={1.1} fill="#6f7276" />
        <circle cx={at.x} cy={at.y} r={1.8} fill="#55585c" />
      </g>
    </g>
  );
}

export function BikeArt({ idPrefix: id, headlamp, pillion, className, ...rest }: BikeArtProps) {
  const lamp = { opacity: headlamp ? 1 : 0 } satisfies CSSProperties;
  const chrome = `${id}-chrome`;
  const alloy = `${id}-alloy`;
  const tank = `${id}-tank`;
  const beam = `${id}-beam`;
  const glow = `${id}-glow`;
  const haldi = `${id}-haldi`;
  const url = (name: string) => `url(#${name})`;

  return (
    <svg
      viewBox="0 0 320 200"
      className={cx(styles.root, className)}
      data-pillion={pillion ? "" : undefined}
      focusable="false"
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id={chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f6f4" />
          <stop offset="0.35" stopColor="#a9acb0" />
          <stop offset="0.55" stopColor="#eceded" />
          <stop offset="0.8" stopColor="#74777b" />
          <stop offset="1" stopColor="#c9cbce" />
        </linearGradient>
        <linearGradient id={alloy} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe1e3" />
          <stop offset="0.5" stopColor="#a1a4a8" />
          <stop offset="1" stopColor="#c6c8cb" />
        </linearGradient>
        <linearGradient id={tank} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3834" />
          <stop offset="0.45" stopColor="#100f0e" />
          <stop offset="1" stopColor="#1d1b19" />
        </linearGradient>
        <linearGradient id={haldi} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2c867" />
          <stop offset="0.55" stopColor="#e2a532" />
          <stop offset="1" stopColor="#b9831c" />
        </linearGradient>
        <linearGradient id={beam} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={LAMP} stopOpacity="0.7" />
          <stop offset="1" stopColor={LAMP} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor={LAMP} stopOpacity="0.9" />
          <stop offset="1" stopColor={LAMP} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The beam, reaching ahead of the bike (past the drawing's edge). Lit only with the lamp. */}
      <g data-headlamp="" className={styles.lamp} style={lamp}>
        <path data-beam="" className={styles.beam} d="M236 100 L360 76 L360 140 L236 112 Z" fill={url(beam)} />
      </g>

      <g className={styles.body}>
        {/* Wheels */}
        <Wheel at={REAR} chrome={url(chrome)} drum={9} />
        <Wheel at={FRONT} chrome={url(chrome)} drum={10} />

        {/* Rear: mudguard, tail lamp, carrier stays, shock, swingarm, chain guard */}
        <path d="M44.6 167.9 A40 40 0 0 1 104 126.4" fill="none" stroke="#141312" strokeWidth={6.5} />
        <path d="M46 160 A38.5 38.5 0 0 1 98 124.5" fill="none" stroke="#3d3a36" strokeWidth={0.8} />
        <rect x={37} y={137} width={10} height={6.5} rx={2.2} fill="#b3311b" />
        <rect x={38.5} y={138.2} width={4} height={1.6} rx={0.8} fill="#ef8a72" />
        <path d="M58 132 L100 112" stroke="#151413" strokeWidth={3} strokeLinecap="round" />
        <path d="M93 156 L113 113" stroke={url(chrome)} strokeWidth={4.6} strokeLinecap="round" />
        <path d="M95.5 151 L111 117.5" stroke="#5c5f63" strokeWidth={5.4} strokeDasharray="1.3 1.7" opacity={0.55} />
        <path d="M84 161 L142 154" stroke="#1a1816" strokeWidth={5} strokeLinecap="round" />
        <path d="M88 151 L141 145 L143 153 L91 159.5 Z" fill="#151413" />

        {/* Exhaust: the header pipe, then the long peashooter silencer */}
        <path d="M191 128 C201 133 203 151 197 166 C193 176 183 181 168 182" fill="none" stroke={url(chrome)} strokeWidth={4.4} strokeLinecap="round" />
        <path d="M170 181.5 L66 172.5" stroke={url(chrome)} strokeWidth={8} strokeLinecap="round" />
        <path d="M168 185 L66 176" stroke="#6b6e72" strokeWidth={1.2} strokeLinecap="round" opacity={0.7} />
        <path d="M150 175 L149 184 M146 174.6 L145 183.6" stroke="#8e9195" strokeWidth={0.8} />
        <circle cx={60.5} cy={172} r={2.4} fill="#2d2b29" />

        {/* Frame, side panel and the battery box */}
        <path d="M211 102 L196 141" stroke="#151413" strokeWidth={5} strokeLinecap="round" />
        <path d="M118 113 L141 141" stroke="#151413" strokeWidth={3.4} strokeLinecap="round" />
        <path d="M114.5 115 L135.5 115 C137.6 115 138.8 116.2 139 118.2 L140.4 135.8 C140.6 138 139.4 139.4 137.3 139.6 L119.4 141.4 C117.3 141.6 116 140.4 115.7 138.4 L112.6 118.2 C112.3 116.3 113 115 114.5 115 Z" fill="#161514" />
        <path d="M116.6 118.5 L134.8 118.5 L136.4 135.6 L119.6 137.6 Z" fill="none" stroke="#4a4642" strokeWidth={0.7} strokeLinejoin="round" />
        <circle cx={126.5} cy={128} r={1.5} fill={url(chrome)} />

        {/* Engine: crankcase, gearbox, timing cover, finned barrel, head */}
        <path d="M132 150 C132 142 140 137 152 137 L184 138 C194 139 199 148 197 158 C195 170 185 176 170 176 L146 176 C137 176 131 168 131 160 Z" fill={url(alloy)} />
        <ellipse cx={147} cy={160} rx={13} ry={11} fill="#b4b7bb" stroke="#878a8e" strokeWidth={0.8} />
        <circle cx={184} cy={157} r={10.5} fill={url(chrome)} stroke="#7c7f83" strokeWidth={0.7} />
        <circle cx={186} cy={154} r={3} fill="#f4f4f2" opacity={0.65} />
        <path d="M160 142 L164 118 L191 118 L189 142 Z" fill="#292724" />
        {[120.5, 123.5, 126.5, 129.5, 132.5, 135.5, 138.5].map((y) => (
          <path key={y} d={`M${round(158.5 + ((142 - y) * 4) / 24)} ${y} H${round(191 - ((142 - y) * 2) / 24)}`} stroke="#a9acb0" strokeWidth={1.3} />
        ))}
        <rect x={162} y={110.5} width={31} height={8} rx={2} fill={url(alloy)} />
        <rect x={166} y={107.5} width={22} height={4} rx={2} fill={url(chrome)} />
        <path d="M142 150 L133 171 L141 171" fill="none" stroke={url(chrome)} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />

        {/* Seats: the sprung saddle and the pillion pad, in brown leather */}
        <path d="M88 104 C88 100 92 99 98 99.5 L119 101 C121 101 122 103 121 106 L91 107.5 C89 107.5 88 106 88 104 Z" fill="#5e3a22" />
        <path d="M117 105 C117 100 122 98.5 132 99.5 L146 101.5 C149 102 149 106 146 107.5 L121 110 C118 110 117 108 117 105 Z" fill="#6b4226" />
        <path d="M121 101.6 C128 100.6 138 101 145 102.6" fill="none" stroke="#8a5a36" strokeWidth={0.9} />
        <path d="M124 110 v6 M129 109.5 v6" stroke="#3a3632" strokeWidth={1.6} strokeDasharray="1 1" />

        {/* Tank: gloss black, gold pinstripe, a knee pad and the filler cap */}
        <path d="M140 112 C139 102 150 94 172 93 C194 92 208 96 212 104 C213 110 207 115 197 116 L150 116 C144 116 140 115 140 112 Z" fill={url(tank)} />
        <path d="M146 111 C146 104 156 98.6 173 98 C192 97.5 204 100.5 206 105 C207 109 202 112 195 112.5 L152 112.6 C148.5 112.6 146 112.3 146 111 Z" fill="none" stroke="#c9a24a" strokeWidth={0.8} />
        <path d="M151 99.5 C163 95.8 186 95.3 201 99.3" fill="none" stroke="#ffffff" strokeOpacity={0.42} strokeWidth={1.8} strokeLinecap="round" />
        <rect x={153} y={103.5} width={15} height={7.5} rx={3} fill="#272422" />
        <path d="M156 104.5 v5.5 M159 104.5 v5.5 M162 104.5 v5.5 M165 104.5 v5.5" stroke="#3b3733" strokeWidth={0.8} />
        <ellipse cx={177} cy={93.4} rx={4} ry={1.4} fill={url(chrome)} />

        {/* Front: mudguard, fork covers and chrome sliders */}
        <path d="M196.4 147.3 A40 40 0 0 1 268.6 141" fill="none" stroke="#141312" strokeWidth={6.5} />
        <path d="M199 143 A38.5 38.5 0 0 1 266 137.6" fill="none" stroke="#3d3a36" strokeWidth={0.8} />
        <path d="M219 124 L234 161" stroke={url(chrome)} strokeWidth={4.4} strokeLinecap="round" />
        <path d="M209.5 98 L221 128" stroke="#151413" strokeWidth={7.2} strokeLinecap="round" />

        {/* Handlebar, grip, lever, mirror, speedometer */}
        <path d="M209 98 C206 92 202 88 197 86" fill="none" stroke={url(chrome)} strokeWidth={2.6} strokeLinecap="round" />
        <path d="M197 86 L187.5 84" stroke="#1d1b19" strokeWidth={4.6} strokeLinecap="round" />
        <path d="M197.5 87.5 L188 92" stroke="#b9bcc0" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M204 90 L209 71" stroke="#2a2826" strokeWidth={1.4} />
        <ellipse cx={209.5} cy={67.5} rx={3.6} ry={5} fill={url(chrome)} />
        <ellipse cx={210.3} cy={67.5} rx={2.3} ry={3.8} fill="#3a4148" />
        <circle cx={218} cy={95.5} r={4.3} fill={url(chrome)} />
        <circle cx={218} cy={95.5} r={3.1} fill="#f1ece0" />
        <path d="M218 95.5 l1.8 -1.6" stroke="#b3311b" strokeWidth={0.6} />

        {/* Headlamp: chrome bucket, glass lens (lit or not) */}
        <ellipse cx={222} cy={106} rx={11} ry={10} fill={url(chrome)} />
        <ellipse cx={219} cy={102} rx={5} ry={2.4} fill="#ffffff" opacity={0.55} />
        <ellipse cx={232} cy={106} rx={3.6} ry={9.6} fill="#8e9195" />
        <ellipse cx={232.6} cy={106} rx={2.8} ry={8.7} fill="#3a3e44" />
        <ellipse cx={233.5} cy={102.5} rx={0.9} ry={2.4} fill="#ffffff" opacity={0.5} />
        <g data-headlamp="" className={styles.lamp} style={lamp}>
          <circle cx={234} cy={106} r={12} fill={url(glow)} />
          <ellipse cx={232.6} cy={106} rx={2.8} ry={8.7} fill="#fff6d8" />
        </g>
      </g>

      {/* The pillion: the visitor, in the haldi helmet. Hops on at ignition. */}
      {pillion ? (
        <g className={styles.pillion}>
          <path d="M106 104 L134 114" stroke="#273049" strokeWidth={13} strokeLinecap="round" />
          <path d="M134 114 L126 156" stroke="#273049" strokeWidth={10.5} strokeLinecap="round" />
          <path d="M118 155 L133 155 C136 157 138 160 137 164 L117 164 C115 164 115 161 116 159 Z" fill="#efeae0" />
          <path d="M115.5 162.5 H137.5" stroke="#a9a193" strokeWidth={2} strokeLinecap="round" />
          <path d="M98 106 C96 88 100 66 108 56 C112 50 122 50 126 56 C130 66 130 88 126 104 C122 110 104 112 98 106 Z" fill="#3d5a7a" />
          <path d="M100 100 C99 86 102 70 108 60" fill="none" stroke="#2f4762" strokeWidth={4} strokeLinecap="round" />
          <path d="M100 36 C100 25 108 18 117 18 C126 18 131 25 131 35 C131 41 128 46 122 47 L106 47 C102 46 100 42 100 36 Z" fill={url(haldi)} />
          <path d="M118 27 C124 27 130 29 131 34 L130.5 38.5 C126.5 37.4 122 37.3 118 38.4 Z" fill="#2b2f36" />
          <path d="M120 29.5 C123.5 29.4 126.5 30.2 128.5 31.8" fill="none" stroke="#9fb0bf" strokeWidth={0.9} strokeLinecap="round" />
          <path d="M104 28 C107 22 113 19.5 119 20" fill="none" stroke="#f7dc98" strokeWidth={1.6} strokeLinecap="round" />
        </g>
      ) : null}

      {/* The rider: Sahil, in a matte black open-face helmet, tan goggles, olive-brown jacket */}
      <g className={styles.rider}>
        <path d="M130 106 L166 116" stroke="#2e3a5e" strokeWidth={14} strokeLinecap="round" />
        <path d="M166 116 L159 160" stroke="#2e3a5e" strokeWidth={11} strokeLinecap="round" />
        <path d="M160 116.5 L166 116" stroke="#3b4a74" strokeWidth={3} strokeLinecap="round" />
        <path d="M151 157.5 L165 157.5 L170 165 C171 169 168.5 170.5 164 170.5 L150.5 170.5 C148.5 170.5 148 167.5 149.5 165.5 Z" fill="#6a4325" />
        <path d="M149 169 H170" stroke="#3b2616" strokeWidth={2.2} strokeLinecap="round" />
        <path d="M122 108 C120 90 124 66 132 52 C136 46 146 45 150 50 C156 60 156 84 150 104 C146 110 128 112 122 108 Z" fill="#5c5433" />
        <path d="M125 102 C123 88 126 70 132 58" fill="none" stroke="#474126" strokeWidth={4.5} strokeLinecap="round" />
        <path d="M150 54 C152 66 152 84 148 100" fill="none" stroke="#6e6540" strokeWidth={1.2} />
        <path d="M141 49.5 L149 47.5" stroke="#474126" strokeWidth={3} strokeLinecap="round" />
        <path d="M143 57 L167 74 L191 84" fill="none" stroke="#544d2f" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M187 83.5 C190 81.5 195 82 196 85 C196.8 87.6 194 89.5 190.5 88.8 C188 88.3 186.5 85.8 187 83.5 Z" fill="#3b2a1d" />
        <path d="M140 41 L146 41 L147 50 L140 50 Z" fill="#8d5f3e" />
        <path d="M147 30 C152 30 156.5 33 157.5 38 C158.3 42 155.5 46 150.5 46.2 L145.5 45.5 Z" fill="#9c6a45" />
        <path d="M129 33 C129 22 137 16 145 16 C154 16 159 23 158.3 31.5 L156.5 37 C152.5 35.4 148.5 34.8 144.5 35.8 L132.5 40 C130.3 38.3 129 36 129 33 Z" fill="#1f1d1b" />
        <path d="M133 25 C136 20 141 17.8 146 18" fill="none" stroke="#4d4a46" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M130 29.5 C138 27.5 146 26.5 151.5 26.8" fill="none" stroke="#b08a5a" strokeWidth={3} strokeLinecap="round" />
        <rect x={150} y={24.2} width={8.4} height={6.4} rx={2.6} fill="#2d3238" stroke="#b08a5a" strokeWidth={1} />
        <path d="M152 26 L156 26" stroke="#8fa3b0" strokeWidth={0.9} strokeLinecap="round" />
        <path d="M137 39 C140 43 143 45 146 45.5" fill="none" stroke="#2f2c29" strokeWidth={0.8} />
      </g>

      {/* The pillion's near arm, round the rider's waist: drawn over the rider. */}
      {pillion ? (
        <g className={styles.pillion}>
          <path d="M118 60 L127 80 L136 92" fill="none" stroke="#35506e" strokeWidth={8.5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={137.5} cy={93} r={3.6} fill="#8d5f3e" />
        </g>
      ) : null}
    </svg>
  );
}
