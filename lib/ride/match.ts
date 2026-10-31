// Recognises "let's ride" loosely. Speech recognisers mishear it often enough ("let's write") that
// near-misses start the engine too, and the hero says "Close enough."

export type RideMatch = "exact" | "close" | null;

const EXACT = /\b(let'?s|lets)\s+(ride|go)\b|\bride\b|\bstart\b/;
const CLOSE = /\b(let'?s|lets)\s+(write|right|rite|rise|wide|ryde|raid|read)\b/;

export function matchRide(text: string): RideMatch {
  const said = text.toLowerCase().replace(/[‘’]/g, "'");
  if (EXACT.test(said)) return "exact";
  if (CLOSE.test(said)) return "close";
  return null;
}
