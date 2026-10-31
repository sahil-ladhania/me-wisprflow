# Motion

Motion tells the story; it never decorates. Everything moves like the bike: it pulls away slowly, cruises, brakes, and settles. Durations and easings are the `timing` tokens.

## The rules

- **Only the road moves continuously.** Content does not drift, parallax or float. A stop arrives, settles, and stays still while it is read.
- **Pull away with `ease-throttle`, arrive with `ease-brake`.** Nothing bounces, nothing overshoots more than 3px (the suspension dip).
- **One thing at a time.** The bike arrives, then the milestone settles, then the stop's text appears, then its objects land. Stagger 80–120ms; the whole arrival under 900ms.
- **Objects land like paper.** A photo or scan drops 12px and rotates from its tilt ±4° to its final tilt over `dur-settle`, `ease-brake`. Tape appears last, 60ms later.
- **Red pen draws.** A strike-through draws left to right over 380ms (`stroke-dashoffset`), then the replacement word fades in 120ms later. Only when the correction scrolls into view, once.
- **Waveforms move only when sound plays.** A parked waveform is still.

## Between stops: ink and smoke

- **Ink** (default): the next stop blooms out of the point where the bike stops, through an irregular blot mask (`assets/Textures/ink-bloom.svg`). A wet `ink` front leads by ~15% and fades as the page soaks. `dur-ink`, `ease-ink`. See `InkReveal`.
- **Smoke**: used twice only, into and out of the Night stop. The same mask, but the front is `pencil` at 30% with a 12px blur, and it is slower (1200ms). Out of Night, smoke clears to day paper from the headlamp outward.
- Phones use the same mask at half resolution, no blur on the smoke front.

## The bike

- **Ignition:** headlamp flicks on (opacity 0→1→0.4→1 over 240ms), the bike shudders 2px for 300ms, a single smoke wisp leaves the exhaust. Optional 1.2s engine thump, recorded from Sahil's own bike, only after the voice or tap gesture and with a mute chip.
- **Riding:** road dashes and the lane's edge texture scroll right to left; the bike stays at its anchor. Wheels rotate with scroll velocity. A slow 1px vertical rhythm (the road) while moving.
- **Stopping:** the road decelerates over the last 40% of the segment with `ease-brake`; the front fork dips 3px and recovers in 160ms; the milestone settles beside the front wheel.
- **Idling at a stop:** 0.6px vertical jitter at about 12Hz. Off under reduced motion.
- **Scroll binding:** progress is scrubbed by scroll, but each stop is a soft snap point (CSS `scroll-snap-type: y proximity` on desktop, none on phones). If a visitor flicks fast, the bike never teleports: cap road speed and let the stop catch up.

## Reduced motion

`prefers-reduced-motion: reduce` replaces every movement with a 200ms opacity fade. The bike jumps to the next stop. The road is static. Strike-throughs are drawn from the start. Voice and content are untouched.
