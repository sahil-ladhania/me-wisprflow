// The engine: a single-cylinder thump, made live with Web Audio until Sahil records his own bike.
// Ignition cranks it, then it idles and runs for the rest of the visit: the revs rise while the bike
// rides and settle back at each stop, and the exhaust is changed live. It plays only after the
// visitor's tap or voice, pauses while the tab is hidden, and the final park switches it off.

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

/** The exhaust the visitor picked: the engine's voice, or none at all. */
export type Exhaust = "stock" | "loud" | "silent";

/** "Change the exhaust" cycles through these, in order. */
export const exhausts: readonly Exhaust[] = ["stock", "loud", "silent"];

/** Loud is louder and lets more of the bark through the filter; revs open it further. */
const VOICE: Record<Exclude<Exhaust, "silent">, { level: number; cutoff: number; open: number }> = {
  stock: { level: 0.34, cutoff: 340, open: 520 },
  loud: { level: 0.62, cutoff: 680, open: 1000 },
};

/** A 4-stroke single fires once every two turns: idle is about six thumps a second. */
const IDLE_RPM = 720;
const QUIET_RPM = 620;
const CRUISE_RPM = 2500;
/** How far ahead the scheduler books thumps, and how often it wakes. */
const LOOKAHEAD = 0.14;
const TICK_MS = 30;

let context: AudioContext | null = null;

/** Create or resume the audio context. Call it inside the tap or click that starts things. */
export function primeAudio(): AudioContext | null {
  const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!Context) return null;
  try {
    context ??= new Context();
    if (context.state !== "running") void context.resume();
  } catch {
    return null;
  }
  return context;
}

type Graph = { master: GainNode; filter: BiquadFilterNode; noise: AudioBuffer };

let graph: Graph | null = null;
let exhaust: Exhaust = "stock";
let running = false;
let quiet = false;
/** Another sound on the page has the floor (the cooking clip, unmuted). */
let ducked = false;
/** 0 at a stop, 1 at full cruise: the ride sets it from the bike's speed. */
let revs = 0;
let rpm = IDLE_RPM;
/** Extra revs just after ignition, settling over the first couple of seconds. */
let flare = 0;
let next = 0;
let timer = 0;
let watching = false;
let waiting = false;

function build(ctx: AudioContext): Graph {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 0.7;
  filter.connect(master);
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return { master, filter, noise };
}

/** How loud the engine should be right now. */
function level(): number {
  if (exhaust === "silent" || !running) return 0;
  return VOICE[exhaust].level * (quiet ? 0.5 : 1) * (ducked ? 0.15 : 1);
}

/** One firing: a low saw thump with a little exhaust breath in it. */
function fire(ctx: AudioContext, g: Graph, t: number, strength: number) {
  const push = Math.min(1, revs + flare);
  const thump = ctx.createOscillator();
  const body = ctx.createGain();
  thump.type = "sawtooth";
  thump.frequency.setValueAtTime(52 + push * 26, t);
  thump.frequency.exponentialRampToValueAtTime(32, t + 0.09);
  const decay = 0.12 - push * 0.05;
  body.gain.setValueAtTime(0.0001, t);
  body.gain.exponentialRampToValueAtTime(strength, t + 0.008);
  body.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  thump.connect(body).connect(g.filter);
  thump.start(t);
  thump.stop(t + decay + 0.02);

  const breath = ctx.createBufferSource();
  breath.buffer = g.noise;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 170 + push * 140;
  band.Q.value = 0.9;
  const air = ctx.createGain();
  air.gain.setValueAtTime(0.0001, t);
  air.gain.exponentialRampToValueAtTime(strength * 0.4, t + 0.006);
  air.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  breath.connect(band).connect(air).connect(g.filter);
  breath.start(t, Math.random() * 0.9, 0.07);
}

function tick() {
  const ctx = context;
  const g = graph;
  if (!ctx || !g || !running) return;
  const now = ctx.currentTime;
  if (next < now) next = now + 0.02;

  // Revs climb quickly with the throttle and fall back more slowly, like a real engine.
  const goal = (quiet ? QUIET_RPM : IDLE_RPM) + (CRUISE_RPM - IDLE_RPM) * Math.min(1, revs + flare);
  rpm += (goal - rpm) * (goal > rpm ? 0.16 : 0.07);
  flare *= 0.96;

  const voice = VOICE[exhaust === "silent" ? "stock" : exhaust];
  const opening = Math.min(1, (rpm - IDLE_RPM) / (CRUISE_RPM - IDLE_RPM));
  g.filter.frequency.setTargetAtTime(voice.cutoff + voice.open * Math.max(0, opening), now, 0.08);

  while (next < now + LOOKAHEAD) {
    fire(ctx, g, next, 0.75 + Math.random() * 0.25);
    // 120 / rpm seconds per firing, give or take: no engine is a metronome.
    next += (120 / rpm) * (0.96 + Math.random() * 0.08);
  }
}

function play() {
  if (!context || !graph || timer) return;
  next = context.currentTime + 0.05;
  timer = window.setInterval(tick, TICK_MS);
}

function pause() {
  clearInterval(timer);
  timer = 0;
}

/** Fades to the level the engine should be at now (silent, quiet, stock or loud). */
function settleLevel(seconds = 0.15) {
  if (!context || !graph) return;
  graph.master.gain.setTargetAtTime(level(), context.currentTime, seconds);
}

const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

/** The visitor's next tap or key press brings the sound back. */
function wake() {
  waiting = false;
  for (const type of GESTURES) window.removeEventListener(type, wake, true);
  if (!context || !running || exhaust === "silent") return;
  void context.resume();
  play();
  settleLevel();
}

/**
 * Some browsers (Safari) only let sound resume inside a gesture. If the engine is meant to be running
 * but the audio didn't come back, it wakes on the visitor's next tap or key press instead of staying silent.
 */
function resumeOrWait() {
  const ctx = context;
  if (!ctx) return;
  void ctx.resume().catch(() => {});
  window.setTimeout(() => {
    if (ctx.state === "running" || !running || exhaust === "silent" || waiting) return;
    waiting = true;
    for (const type of GESTURES) window.addEventListener(type, wake, { capture: true, passive: true });
  }, 400);
}

function onVisibility() {
  if (!context) return;
  if (document.hidden) {
    pause();
    void context.suspend();
  } else if (running && exhaust !== "silent") {
    resumeOrWait();
    play();
  }
}

/** A few slow cranks, then it catches and settles to idle. Starts the engine for the rest of the visit. */
export function startEngine(mode: Exhaust = exhaust) {
  exhaust = mode;
  const ctx = primeAudio();
  if (!ctx) return;
  graph ??= build(ctx);
  if (!watching) {
    document.addEventListener("visibilitychange", onVisibility);
    watching = true;
  }
  running = true;
  revs = 0;
  flare = 0.35;
  rpm = IDLE_RPM;
  if (exhaust === "silent") return;
  resumeOrWait();

  // The starter: three slow turns before it catches.
  const t = ctx.currentTime + 0.06;
  for (let n = 0; n < 3; n++) fire(ctx, graph, t + n * 0.24, 0.45);
  graph.master.gain.cancelScheduledValues(ctx.currentTime);
  graph.master.gain.setValueAtTime(level(), ctx.currentTime);
  pause();
  next = t + 0.72;
  timer = window.setInterval(tick, TICK_MS);
}

/** The exhaust changed: the engine's voice follows at once. Silent pauses it altogether. */
export function setExhaust(mode: Exhaust) {
  if (mode === exhaust) return;
  exhaust = mode;
  if (!context || !graph || !running) return;
  if (mode === "silent") {
    settleLevel(0.05);
    const ctx = context;
    window.setTimeout(() => {
      if (exhaust !== "silent") return;
      pause();
      void ctx.suspend();
    }, 300);
    return;
  }
  resumeOrWait();
  play();
  settleLevel();
}

/** 0 at a stop, 1 at full cruise. Called every frame the bike moves. */
export function setRevs(value: number) {
  revs = Math.max(0, Math.min(1, value));
}

/** The June 2025 stop: the lowest, quietest idle. The engine stays on; it just steps back. */
export function setQuiet(value: boolean) {
  if (value === quiet) return;
  quiet = value;
  settleLevel(0.6);
}

/** A clip with its sound on is playing: the engine all but drops out until it stops. */
export function duckEngine(value: boolean) {
  if (value === ducked) return;
  ducked = value;
  settleLevel(0.4);
}

/** The final park: the key turns with a click, the engine dies down in a few last thumps, silence. */
export function parkEngine() {
  if (!running) return;
  running = false;
  pause();
  const ctx = context;
  const g = graph;
  if (!ctx || !g || exhaust === "silent") return;

  const t = ctx.currentTime + 0.02;
  // The key: two small metal clicks.
  for (const at of [t, t + 0.09]) {
    const click = ctx.createBufferSource();
    click.buffer = g.noise;
    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 2600;
    const tap = ctx.createGain();
    tap.gain.setValueAtTime(0.0001, at);
    tap.gain.exponentialRampToValueAtTime(0.5, at + 0.002);
    tap.gain.exponentialRampToValueAtTime(0.0001, at + 0.03);
    click.connect(high).connect(tap).connect(ctx.destination);
    click.start(at, Math.random() * 0.9, 0.04);
  }
  // The last thumps, further and further apart, fading into silence.
  revs = 0;
  flare = 0;
  let at = t + 0.2;
  [0.16, 0.22, 0.3, 0.42].forEach((gap, i) => {
    fire(ctx, g, at, 0.7 - i * 0.15);
    at += gap;
  });
  g.master.gain.setTargetAtTime(0, at - 0.3, 0.25);
  window.setTimeout(() => {
    if (!running) void ctx.suspend();
  }, (at - ctx.currentTime + 1.2) * 1000);
}

/** Whether the engine is on (even when the exhaust is silent). */
export function engineRunning(): boolean {
  return running;
}
