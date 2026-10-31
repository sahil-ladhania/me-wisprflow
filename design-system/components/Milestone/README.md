# Milestone

An Indian highway milestone stone, the system's year marker: a white stone with a coloured dome, the year where the kilometres would be.

**Provide:** `__cap` (a label of 1–2 words, uppercase, ≤10 characters), `__year`, optional `__place` (city or code). Set `data-kind`.

**Kinds**
- `past` (default): `haldi` cap, like a national-highway stone. Every year already lived.
- `now`: `ink` cap. Only 2026.
- `next`: `signboard` cap, like a state-highway stone. Wispr Flow and the café at the end.

**Rules**
- Large (92×136) in a `StopHeader` on desktop; `--sm` (54×80) in the lane and on phones.
- The dome uses `radius-stone` on the top corners only; the outline is 1.5px `ink`; it stands with `shadow-ground`.
- One milestone per stop. Never a row of milestones as a timeline navigation: the road is the timeline.
- Don't put icons or photos on the stone.
