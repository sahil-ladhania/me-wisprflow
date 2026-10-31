// The design system's served assets (originals in design-system/assets). Sizes are the files'
// own, for next/image. The favicon is app/icon.svg; icons are drawn by components/ds/Icon.tsx.

export const marks = {
  /** The site's mark. Use as is on paper; never recolour. */
  milestone: { src: "/brand/milestone-mark.svg", width: 84, height: 120 },
} as const;

export const textures = {
  /** Tiles over paper; page background only. Also var(--texture-paper-grain). */
  paperGrain: { src: "/textures/paper-grain.svg", width: 240, height: 240 },
  /** Masking tape for photos and scans. Also var(--texture-tape). */
  tapeStrip: { src: "/textures/tape-strip.svg", width: 92, height: 26 },
  /** Red-pen strike; stretch to fit. Also var(--texture-pen-strike). */
  penStrike: { src: "/textures/pen-strike.svg", width: 200, height: 14 },
  /** Red-pen circle around the proof on a scan; stretch to fit. Also var(--texture-pen-circle). */
  penCircle: { src: "/textures/pen-circle.svg", width: 200, height: 60 },
  /** One 64px tile of the lane road; repeat-x. Also var(--texture-road-dash). */
  roadDash: { src: "/textures/road-dash.svg", width: 64, height: 58 },
  /** The blot used as the mask for the ink and smoke transitions. Also var(--texture-ink-bloom). */
  inkBloom: { src: "/textures/ink-bloom.svg", width: 100, height: 100 },
} as const;

export const placeholders = {
  /** Stand-in bike with rider, facing right, until the 3D model lands; stays as the WebGL-off fallback. */
  bikeSilhouette: { src: "/placeholders/bike-silhouette.svg", width: 240, height: 150 },
  /** Hatched 4:5 slot for a photo not yet chosen. Development only: never ship it. */
  photoSlot: { src: "/placeholders/photo-slot.svg", width: 400, height: 500 },
} as const;
