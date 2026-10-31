The Ride is the design system for Sahil's Wispr Flow application: a scroll-driven ride on a black bike through ten years of a life, 2016 to 2026, told in his own voice. It is a road-trip journal, not a portfolio. Every rule below serves one test: **in the first five seconds, a judge should know a real person lives here, and that he understands people.**

## Principles

1. **Spoken first.** Voice is the interface, not a feature. The site starts when the visitor *speaks* (`IgnitionControl`), key stops carry a real voice note (`VoiceNote`), and the garage proves every line was dictated. The waveform is the signature mark of the system.
2. **Paper, not pixels.** The page is a journal page (`paper`). Things are *placed* on it (taped photos, scans, index cards), never floated in glass cards. Corners are square because paper is cut square.
3. **Keep the mistakes visible.** Wrong turns are struck through in red pen, not deleted (`Correction`). The edit history is the honesty.
4. **Numbers do the bragging.** A claim gets a number or it doesn't get made. Claims are short, sure lines; the stat carries the weight (`BigStat`).
5. **One accent, earned.** `red-pen` only appears where a human hand would mark the page: a correction, a kill criterion, a live mic. If you can count more than three red marks on one screen, remove one.
6. **One stop per screen.** The bike moves, the page waits. Every stop must be skimmable in three seconds: kicker, title, one object. Judges skim; the lane does the pacing.
7. **The Night stop is quiet.** One stop, June 2025, drops every device: no tape, no red pen, no stats, no wit. Silence is the design.

## Voice and copy

- English only. First person, "I". Address the visitor as "you" sparingly.
- **Claims:** short, declarative, numbered. "3,500+ on the waitlist. 37% women. On a dating app." No "passionate", no "journey", no "leveraged".
- **Stories:** observant and a little cocky. Set up, then undercut in the italic `lede`: "Dad's deal: 90% gets the bike." / *"I got 80. He bought it anyway. Best deal I ever lost."*
- **Mistakes:** told with wit, shown with a strike. "I chose science because ~~I loved physics~~ *my girlfriend did*."
- **Pain:** one completely straight line, June 2025 only. About Sahil's pain and growth, never the other person. No jokes before or after it on the same screen.
- **Never:** pity, exclamation marks, emoji, corporate verbs, "humbled", a skills list.
- **Sentence case** everywhere except `kicker`, `sign` and milestone caps, which are uppercase like road paint.
- Money in rupees with Indian grouping: ₹20,000, ₹20–25 lakh. Numbers as numerals.
- Interface copy keeps the ride metaphor but stays clear: "Say “let's ride”" / "or tap to start" / "Read it instead" / "Ride on".

## Colour

The palette is taken from the story, not a trend board. Three colours do 95% of the work; two exist only on road furniture; one is the accent.

| Token | From the story | Use |
| --- | --- | --- |
| `paper` | the journal, school notebooks | page ground |
| `ink` | the black Royal Enfield's paint | text, the bike, the heaviest marks |
| `pencil` | a pencil in the margin | secondary text |
| `red-pen` | the teacher's red pen; chilli in the kitchen | corrections, kills, the live mic. **The accent.** |
| `haldi` | turmeric; the yellow cap of a national-highway milestone | milestone caps for past years, the highlighter |
| `signboard` | the green highway direction sign | only what is ahead: next year, Wispr Flow, the café |
| `headlamp` | the bike's headlamp | the only glow; the hero ignition and the Night stop |

Rules:

- Ground is `paper`; raised paper is `card`; anything scanned sits on `scan`.
- Body text `ink`; secondary `pencil`. Both pass 4.5:1 on `paper`, `card` and `scan` in both themes.
- `red-pen` as text or a stroke only, never a large fill. The only red-pen fill allowed is the listening mic disc, with `on-red-pen` on it.
- `haldi` is a fill, never text. Text on it is `on-haldi`. Use `highlight` for at most one marker swipe per stop.
- `signboard` fills carry `on-signboard` text and a 2px `on-signboard` inset border, like the real signs.
- **Night theme** is not a dark mode. It is applied with `data-theme="night"` to the June 2025 stop only (`NightStop`), and every token swaps underneath it.

## Typography

Three families, three voices. All are free on Google Fonts; load them once:

`https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Kalam:wght@400;700&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&display=swap`

- **Newsreader** (`story`): the voice of the journal. An editorial serif with optical sizes, warm and literate without being precious. Italic is the aside, the wit. Styles: `display`, `stop-title`, `headline`, `lede`, `body`, `caption`, `night-line`.
- **Barlow Condensed** (`road`): the voice of the road. Barlow was drawn from highway signage, so it is native to milestones, signboards and numbers. Styles: `stat`, `milestone`, `kicker`, `meta`, `sign`. Always `font-variant-numeric: tabular-nums` for figures.
- **Kalam** (`hand`): the voice of the hand. A handwriting face from the Indian Type Foundry, used for red-pen corrections (`pen`) and captions or margin notes (`scribble`). Never for more than seven words at once.

Every style's usage note gives its phone size; switch at 600px. Body never goes below 17px. Never set long text in Barlow or Kalam, never bold Newsreader past 600.

## Space and layout

- 4px base: `space-1` to `space-10`. Gutter `space-4` on phones, `space-8` at 1280+.
- A stop fills at least `stop-min` (one screen). Desktop: content sits in the upper ~70% of the viewport; the bike lane owns the bottom `lane-h`. Phones: content scrolls above a `lane-h-mobile` lane.
- Story copy is capped at `measure`. Objects (photos, scans) may break the column and overlap its edge by up to `space-7`, tilted, as if placed by hand.
- Between stops, `space-10` of pure road on desktop: nothing on screen but the bike moving. That emptiness is the pacing.
- **Never** the template grid: no hero/about/skills/projects/contact, no three-card rows, no icon-feature grids.

## Corners, borders, shadows

- `radius-none` is the default. `radius-pill` belongs only to voice controls, so a rounded shape always means "you can hear this". `radius-stone` is the milestone dome. `radius-soft` is signboards. `radius-hair` is tape and tags.
- Borders are 1px `rule` for hairlines, 1.5px `ink` for drawn outlines (the milestone, the ignition key).
- Shadows are contact shadows only: `shadow-contact` for paper on paper, `shadow-lift` for the one object being handled, `shadow-ground` under the bike and stones. No glows, no coloured shadows, no blur panels.
- Keyboard focus is `focus-ring` on every control: a paper gap, then a solid 2px ink ring.

## Imagery

- **Real photos only**, printed with a `card` border of 10px (12px on desktop), taped at one or two corners, tilted between −3° and 3° (`TapedPhoto`). Warm, unfiltered, no duotone, no AI imagery.
- **Scans** of real objects (certificates, emails, screenshots) on `scan`, tilted ≤1.5°, labelled with a `kicker` like "SCAN 02 · THE INTERVIEW INVITE" (`ScannedDocument`). Blur personal details of other people.
- **Red-pen marks** on scans: one circle or underline per scan, pointing at the proof.
- **The bike** is the only heavy black mass on the page. Nothing else in `ink` should be bigger than a stat.
- No stock photos, no illustrations of people, no Royal Enfield logo or wordmark anywhere.

## Iconography

- Custom set in `assets/Icons/`: 24px grid, 1.75px stroke, round caps and joins, single ink (`ink`, #17140f). Inline the SVG with `stroke="currentColor"` when the colour must change.
- Icons only on controls: mic, play, pause, transcript, arrow, scroll, link-out, mute. Never decorative icons beside text, never emoji.
- The waveform (`.rd-wave`) is the system's real icon: use it wherever voice exists.

## Voice in the product

- Hero: the engine is off until the visitor says "let's ride". Always show the tap fallback beside the mic, and if mic permission is denied, the control quietly becomes a tap button ("Mic's shy? Tap to start.").
- Voice notes are 10–25 seconds, never autoplay, always have a transcript ("Read it instead"). Six at most on the whole site.
- Recognise loosely: "let's ride", "lets ride", "let's go", "ride", "start" all start the engine.
- The garage shows real Wispr Flow mishearings struck through in red pen ("~~rolling field~~ Royal Enfield"). The bloopers are proof, not decoration.

## Accessibility

- Text 4.5:1 on its ground in both themes; marks and focus rings 3:1. Checked values are in each colour's usage note.
- Everything voice-driven has a tap or keyboard equivalent; every voice note has a transcript.
- `prefers-reduced-motion`: the bike jumps stop to stop with a 200ms fade, ink spreads become fades, idle wobble stops.
- The 3D bike is `aria-hidden`; each stop's content stands on its own as text.

## Assets

- `assets/Marks/`: the milestone mark (a stone with a waveform cut into it), the site's favicon and signature.
- `assets/Icons/`: the control icons above.
- `assets/Textures/`: paper grain, tape, the red-pen strike and circle, road dash, ink-bloom mask.
- `assets/Placeholders/`: the stand-in bike silhouette for the lane until the 3D model lands, and a photo slot.
