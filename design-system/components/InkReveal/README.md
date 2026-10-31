# InkReveal

The transition between stops: the next page blooms out of the point where the bike stopped, like ink soaking into paper.

**Provide:** the current page, the next page (`--next`), the bloom layer, and `--x`/`--y` set (in px) to where the bike stopped; `--reach` is the final blot size, about 2× the page diagonal. Add `.is-open` to run it. `.rd-ink--smoke` is the variant for entering and leaving the Night stop.

**Rules**
- `dur-ink` with `ease-ink`; the wet ink front leads by ~15% and fades as the next page arrives.
- Ink for every stop change; smoke only into and out of Night.
- Origin is always the bike, never the page centre.
- Reduced motion: a 200ms cross-fade. Phones: same mask, no blur on smoke.
