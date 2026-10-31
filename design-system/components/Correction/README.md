# Correction

A red-pen strike-through: what I said stays on the page, struck, with what was actually true written over it by hand. The system's way of owning mistakes.

**Provide:** `<span class="rd-fix"><del>what I said</del><ins>what was true</ins></span>` inside text. Add `.rd-fixes` to the paragraph so there's room above the line. Use `.rd-fix--inline` to put the fix after the strike instead of above it (automatic on phones). Mount with `data-rd="Correction"` to draw strikes on scroll.

**Rules**
- For real wrong turns only: decisions, assumptions, plans that changed. Never for typos or as a joke device on every line.
- At most two corrections per stop, three red marks per screen.
- The struck words stay readable: the strike sits across the x-height in `red-pen`, never a solid bar.
- Keep fixes under five words. Kalam, `red-pen`, about 1.3× the text size.
- `.rd-mark` is the haldi highlighter: one phrase per stop, for the line a skimmer must not miss.
- Screen readers hear both: `del` and `ins` are announced as deleted/inserted.
