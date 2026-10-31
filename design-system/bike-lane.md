# The bike lane

The lane is the reserved strip where the 3D black bike, with Sahil riding it, lives. It is the spine of the site: the visitor's scroll is the throttle. The model arrives later; this spec fixes the space, the light and the behaviour so it drops in without redesign. The component is `BikeLane`.

## Placement

- **Desktop and tablet (600+):** a `position: sticky` band pinned to the bottom of the viewport, `lane-h` tall, full bleed. The road is drawn, not photographed: two `rule` hairlines for the road edges and a dashed centre line in `wave-rest`. No asphalt fill; it is a sketch on the journal page.
- The bike faces right (forward in time) and is anchored at **22% of the lane width**, wheels on the lane baseline (24px above the lane's bottom edge). Bike length is ~2.4× lane height, capped at 560px.
- Milestones stand on the far road edge and roll in from the right; at a stop, the current milestone stops **just ahead of the front wheel**.
- Stop content sits above the lane and never overlaps the bike. Leave the lane's top 24px as a soft fade from `paper` (transparent→paper) so text scrolling down dissolves before reaching the bike.
- **Phones (<600):** the lane is `lane-h-mobile` plus `env(safe-area-inset-bottom)`, the bike ~160px long at the gutter (`space-4`) plus 8%. While the reader scrolls inside a long stop, the lane collapses to `lane-h-mini` (bike hidden, milestones and the progress ticks remain) and expands again on arrival at the next stop. Tapping the bike plays the current stop's voice note: a 44px+ target.

## Light and material (brief for the 3D model)

- **Paint:** matte-to-satin black, graded to `ink` (#17140f), never pure #000. Chrome is satin, not mirror; it should not reflect a city or a studio.
- **Key light:** one soft, warm key (~#fff4e0) from top-left at ~35°, as if from a window over the journal. A faint paper-bounce fill from below. A thin warm rim along the tank and the rider's shoulders so the black silhouette separates from the paper.
- **Background:** fully transparent; the paper shows through. Shadow is a contact ellipse (`shadow-ground`), ~70% of bike length, never a cast floor.
- **Camera:** near side-profile, 8–12° toward three-quarter, eye level slightly above the wheel hub, narrow field of view (≤25°) so it reads like an illustration placed on paper.
- **Headlamp:** off in the hero until ignition. On the Night stop it is the only light on screen: a soft cone in `headlamp` at 18% opacity, reaching about a third of the way up the page.
- **Rider:** Sahil in everyday clothes, relaxed posture, no racing tuck. No logos, no Royal Enfield badge or wordmark on the tank: the tank is plain.

## Behaviour

- **Hero, engine off:** bike parked on its side stand, headlamp off, road still.
- **Ignition:** see Motion. The `IgnitionControl` turns into the stop counter ("STOP 01 / 12") in the lane's top-right corner.
- **Between stops:** scroll drives the road. **At a stop:** bike brakes, idles, milestone settles, content arrives.
- **The Night stop:** the lane turns night with the page; road dashes fade to 20%; only the headlamp is lit.
- **The garage:** the bike pulls off the road onto a stand, engine off. The last signboard points right, past the end of the road: mountains, a small café.

## Performance and fallbacks

- Load the model after ignition starts: the "let's ride" moment hides the download. Budget ≤2.5 MB (glTF, Draco/Meshopt), textures ≤1K on phones.
- Until it loads, on low-power devices, or with WebGL off, show `assets/Placeholders/bike-silhouette.svg` (or a pre-rendered 24-frame sprite of the real model) in the same box. Content never waits for the bike.
- The lane is `aria-hidden`; a visually hidden "Stop 3 of 12, 2018" live region announces arrivals.
