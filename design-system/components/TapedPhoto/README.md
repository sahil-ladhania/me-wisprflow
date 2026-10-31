# TapedPhoto

A real photo, printed with a paper border and taped to the journal page at a slight angle.

**Provide:** an `<img class="rd-photo__img">` (or the `__slot` placeholder) with real alt text, an optional Kalam caption, a tilt via `--tilt` (−3deg to 3deg), aspect via `--ratio` (default 4/5), and one or two tape strips.

**Rules**
- Real photos only. Warm and unfiltered: no duotone, no black-and-white "for mood", no AI images.
- Alternate tilt direction from photo to photo; never two at the same angle. Never 0deg.
- Tape: one strip on top (`--top`) or two diagonal corners (`--tl` + `--tr`). Never four.
- Captions are lowercase observations, not descriptions: "only boy in the kitchen. won anyway.", not "Me at the cooking competition."
- At most two photos per stop. Hover straightens and lifts slightly (`shadow-lift`); on phones the photo sits full width minus 24px, tilt halved.
