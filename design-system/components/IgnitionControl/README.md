# IgnitionControl

The hero's engine start: the visitor says "let's ride" and the ride begins, with a tap fallback always visible beside the mic.

**Provide:** a button with a mic, the spoken phrase, the tap hint, the heard line, a live waveform, and a polite live-region status. Wire your speech recogniser to set `data-state`; the demo enhancer fakes the timing.

**States (`data-state`):**
- `off`: ink mic disc, a slow breathing ring in `wave-rest`. Status "Engine off."
- `listening`: mic disc turns `red-pen` (the only large red-pen fill in the system), live waveform in red pen, `shadow-lift`. Status "Listening…"
- `heard`: the transcript appears in Kalam, red pen: "“let's ride” ✓". Hold 900ms so the visitor sees they were heard.
- `on`: the key inverts to `ink`, mic disc lights in `headlamp`. Status "Engine on. Scroll to ride." Then it shrinks into the lane's stop counter.

**Rules**
- Tapping anywhere on the key starts listening; a second path, "or tap to start", skips voice entirely. Never trap a visitor behind the mic.
- Ask for mic permission only on tap, never on load. If denied: label becomes "Mic's shy? Tap to start." and the key starts the engine directly.
- Accept loose matches ("lets ride", "let's go", "ride", "start"). After 6s of silence, return to `off` with "Didn't catch that. Tap works too."
- One per page, in the first viewport, under the `display` line. Full-width on phones (68px tall).
