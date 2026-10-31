// The engine thump on ignition: a placeholder made with Web Audio until Sahil records his own bike
// (then this becomes a 1.2 s file in public/audio). Plays only after the visitor's tap or voice.

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

let context: AudioContext | null = null;

/** Create or resume the audio context. Call it inside the tap or click that starts things. */
export function primeAudio(): AudioContext | null {
  const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!Context) return null;
  try {
    context ??= new Context();
    if (context.state === "suspended") void context.resume();
  } catch {
    return null;
  }
  return context;
}

/** A few slow cranks, then a single-cylinder thump that settles. About 2.5 s. */
export function playEngineThump() {
  const ctx = primeAudio();
  if (!ctx) return;
  try {
    const out = ctx.createGain();
    out.gain.value = 0.5;
    out.connect(ctx.destination);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 380;
    lowpass.connect(out);

    let t = ctx.currentTime + 0.06;
    for (let n = 0; n < 18; n++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(n < 3 ? 52 : 74, t);
      osc.frequency.exponentialRampToValueAtTime(36, t + 0.1);
      const level = (n < 3 ? 0.5 : 0.9) * (n > 12 ? (18 - n) / 6 : 1);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(level, 0.001), t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      osc.connect(gain);
      gain.connect(lowpass);
      osc.start(t);
      osc.stop(t + 0.15);
      t += n < 3 ? 0.24 : 0.145;
    }
  } catch {
    // Sound is a nicety; the ride starts regardless.
  }
}
