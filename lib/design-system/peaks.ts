// Speech-shaped waveform peaks (0–1): phrases with pauses. Ported from design-system/components/bundle.js.
// Deterministic for a given seed, so server and client draw the same bars.

function rng(seed: number) {
  let s = seed >>> 0 || 7;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };
}

export function peaks(count: number, seed = 7): number[] {
  const random = rng(seed);
  const out: number[] = [];
  let phrase = 0;
  for (let i = 0; i < count; i++) {
    if (phrase <= 0) phrase = 6 + Math.floor(random() * 12);
    phrase--;
    const gap = phrase === 0 && random() > 0.4;
    const value = gap ? 0.12 : 0.22 + 0.78 * Math.pow(random(), 0.8) * (0.55 + 0.45 * Math.sin((Math.PI * (i + 0.5)) / count));
    out.push(Math.round(value * 100) / 100);
  }
  return out;
}
