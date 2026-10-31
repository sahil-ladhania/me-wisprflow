# BikeLane

The reserved strip, pinned to the bottom of the viewport, where the 3D black bike rides through the years and stops at each milestone. Full spec in the "The bike lane" section.

**Provide:** the road (`.rd-lane__road` + `.rd-lane__dash`), the bike slot (`.rd-lane__bike`: your WebGL canvas, a sprite, or `assets/Placeholders/bike-silhouette.svg`), the current stone (`.rd-lane__stone` with a small `Milestone`), and the counter. Drive `.is-riding` / `.is-idle` from scroll progress; the demo's "Ride on" button fakes one segment.

**Rules**
- Sticky, full-bleed, `lane-h` on desktop, `lane-h-mobile` + safe-area on phones, `lane-h-mini` while reading a long stop.
- Bike anchored at 22% of the width, facing right, wheels on the baseline. It never moves horizontally; the road does.
- The road is drawn (hairlines in `rule`, dashes in `wave-rest`), never an asphalt fill. The bike is the only heavy black mass on the page.
- A 24px paper fade on the lane's top edge so text dissolves before touching the bike.
- `aria-hidden` on the lane; announce arrivals in a visually hidden live region.
- Reduced motion: no road scroll, no idle jitter; the stone swaps with a fade.
