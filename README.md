# The Ride

Sahil Ladhania’s entry for the Wispr Flow India growth challenge: a ride through ten years, 2016 to 2026, on one black bike.

The page opens with the engine off. Say “let’s ride”, or tap, and the bike moves. Each stop is one screen: Class 9, his father’s bike, a ₹20,000 pasta stall, 2am code, June 2025, the rebuild, then Wispr Flow India. A few stops play his voice. The garage keeps the dictation mishearings, struck through.

Every prompt for this site was dictated through Wispr Flow.

## Run

Needs [pnpm](https://pnpm.io) 12.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

- `pnpm build` — production build
- `pnpm start` — serve that build
- `pnpm lint` — ESLint
- `pnpm tokens` — rebuild CSS tokens from `design-system/tokens.json`

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4. No env file.

## Where things live

- `app/page.tsx` — the ride
- `components/ride/` — ignition, the lane, the stops
- `components/ds/` — photos, voice notes, milestones
- `lib/ride/` — the stop map and voice
- `design-system/` — tokens and visual rules
- `docs/` — the brief and the story
