# Portfolio Structure

## Core concept
- A journey on Sahil's black Royal Enfield, the bike his father gave him.
- One road, one day. The page scrolls through a full day, from pre-dawn to open highway.
- The bike rides down the page and stops at each section ("stop").
- Each stop has Sahil's real voice: the visitor hears him, not just reads him.
- Why voice: lulu taught him that voice carries emotion text can't. That's the thesis of the page.

## Hero options (not locked)
| Option | What happens | Verdict |
|---|---|---|
| A. Voice ignition | Dark screen, bike silent. The visitor speaks to start the engine. Tap fallback. | Recommended. Voice is inside the product. |
| B. Idle at dusk | Bike idling on the road, tap to hear the intro | Safe, less memorable |
| C. Dad's bike story | Opens with how he got the bike | Strong, but better saved for later |

## The stops
| # | Stop | Time of day | Focus | Story chapters |
|---|---|---|---|---|
| 1 | Hero | Pre-dawn dark | Ignition, the hook | 6 (bike) |
| 2 | Stage | Bright morning | Dance, leading and teaching people | 1 |
| 3 | Kitchen | Warm afternoon | Making things people love: Class 9 win, ₹20k pasta stall, the cafe offer | 2, 9 |
| 4 | The fork | Dusty dusk | Honest mistakes and sacrifices: science for her, the culinary degree, the cafe he declined | 4, 5, 8, 9 |
| 5 | 2am Zomato | Late night, one screen glowing | Curiosity, self-taught code, the Deepinder cold email | 11, 12, 14 |
| 6 | Night | Pitch black | Lowest point. Engine off, silence, only his voice. His pain and growth, nothing about her. | 15 |
| 7 | Rebuild | Dawn | Zyntohouse plus lulu: 3,500+ waitlist, 37% women, ~200 calls, prototype, the decision to pause | 16, 17 |
| 8 | Road ahead | Full daylight, open highway | Wispr India: 2–3 real growth experiments, plus why Wispr (Tanay's reply, his father) | 18, 20 |
| 9 | Garage | Neutral | How it was built by voice: dictation log, Wispr bloopers ("rolling field" for Royal Enfield) | n/a |

## Priority
- Stops 7 and 8 win the role. Stops 1–6 win attention. Give 7 and 8 the most time.
- If time runs short, merge stops 2 and 3.

## Design direction
- Not plain dark mode or light mode. The sky changes per stop, so the colour tracks the mood.
- Constants on every stop:
  - the black bike
  - one accent colour (a warm headlight yellow)
  - the same two fonts
  - Indian highway milestone stones (yellow and white) as section markers
- Light grain or texture, so it feels warm and filmic, not flat.
- In dark stops the black bike needs a headlight glow and rim light, or it disappears.
- Avoid: purple gradients, glassmorphism, neon AI-startup looks, random colours with no time-of-day logic.

## 3D plan
- One 3D element only: the bike (with Sahil on it, if it looks good).
- Everything else stays light: sky colour shifts, fog, flat props, 2D cards for photos and voice.
- Getting the model:
  1. Sahil's own bike photos (3–6 angles) → AI image-to-3D (Tripo or Rodin). Preferred.
  2. Licence-checked model from Sketchfab, crediting the creator if CC-BY. Backup.
- Rider: stylised (low-poly or clay look), never a realistic AI face.
- Clean up in Blender, export as GLB, compress to under ~5MB.
- Web: React Three Fiber with scroll-driven animation in Next.js.
- The Royal Enfield logo is not used as page branding.
- Must run smoothly on a phone.

## Voice in the product
- Hero: the visitor's voice starts the bike.
- Each stop: a short clip in Sahil's own voice.
- Garage: proof the whole build was dictated through Wispr Flow.

## Open decisions
- Hero option (A, B or C)
- Final number of stops (9, or 8 with stops 2 and 3 merged)
- Which stops already have real photos or voice clips
- Role applying for: intern or full-time