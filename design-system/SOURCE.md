# Where this folder comes from

A verbatim copy of **The Ride** design system (namespace `TheRide`, version `1793450050-7d4f`), taken on 2026-10-31.

- `tokens.json` is the source of truth for every token. `pnpm tokens` turns it into `app/styles/tokens.css`, `app/styles/typography.css` and `lib/design-system/tokens.ts`. Edit the JSON, never the generated files.
- `README.md`, `motion.md`, `bike-lane.md`, `stops.md` and `components/*/README.md` are the rules and specs.
- `components/bundle.css`, `bundle.js`, `index.d.ts` and each `preview.html` are the reference implementation (plain HTML + CSS, `rd-` classes). The app does not load them; they are what the React components are ported from.
- `assets/` holds the 19 original SVGs. The ones the site serves are copied to `public/` (textures, placeholders, the milestone mark) and `app/icon.svg` (favicon). Icons are drawn inline by `components/ds/Icon.tsx`.

Where these docs disagree with Sahil's own story (years, example copy), his story wins.
