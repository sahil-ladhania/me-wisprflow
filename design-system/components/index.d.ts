/**
 * The Ride ships as HTML + CSS classes (components/bundle.css, prefix `rd-`) with a small
 * vanilla script (components/bundle.js) that adds behaviour. No React needed.
 * Every component is an enhancer: give it the root element that carries the classes;
 * or put data-rd="<Name>" on the root and call TheRide.mount().
 */
type Enhancer = (root: HTMLElement) => HTMLElement;

/** Root `.rd-ignition[data-state]`; state: "off" | "listening" | "heard" | "on". */
export interface IgnitionControlProps { state?: 'off' | 'listening' | 'heard' | 'on' }
export declare const IgnitionControl: Enhancer;
/** Root `.rd-lane`; holds `.rd-lane__road`, `.rd-lane__bike` (the 3D canvas or silhouette), `.rd-lane__stone`. */
export interface BikeLaneProps { anchor?: string }
export declare const BikeLane: Enhancer;
/** Root `.rd-milestone[data-kind]`; parts __cap, __year, __place; size `.rd-milestone--sm`. */
export interface MilestoneProps { kind?: 'past' | 'now' | 'next'; cap: string; year: string; place?: string }
export declare const Milestone: Enhancer;
/** Root `header.rd-stop`: a Milestone, then `.rd-stop__kicker`, `h2.rd-stop__title`, `.rd-stop__lede`. */
export interface StopHeaderProps { kicker: string; title: string; lede?: string; voiceSeconds?: number }
export declare const StopHeader: Enhancer;
/** Root `figure.rd-photo` with style `--tilt` (−3deg…3deg) and `--ratio`; tape spans `.rd-tape--tl|tr|top|br`. */
export interface TapedPhotoProps { src: string; alt: string; caption?: string; tilt?: string; ratio?: string }
export declare const TapedPhoto: Enhancer;
/** Root `figure.rd-scan` with `--tilt` (≤1.5deg); `.rd-scan__sheet` holds the scan image or rows. */
export interface ScannedDocumentProps { src?: string; alt: string; label: string; date?: string; proof?: string; note?: string }
export declare const ScannedDocument: Enhancer;
/** `span.rd-fix` with `<del>` (what I said) and `<ins>` (what was true); `.rd-fix--inline` puts the fix after. */
export interface CorrectionProps { was: string; is: string; inline?: boolean }
export declare const Correction: Enhancer;
/** `span.rd-note` with an inline arrow svg; modifiers `--pencil`, `--flip`; style `--tilt`. */
export interface MarginNoteProps { text: string; flip?: boolean }
export declare const MarginNote: Enhancer;
/** Root `figure.rd-voice[data-duration][data-seed]`, optional `<audio>` inside; `.rd-voice--quiet` on the Night stop. */
export interface VoiceNoteProps { src: string; duration: number; transcript: string; where?: string; peaks?: number[] }
export declare const VoiceNote: Enhancer;
/** `figure.rd-stat` (inside `.rd-stats` for a row): __num (with <small> unit), __label, __source, __pen. */
export interface BigStatProps { value: string; unit?: string; label: string; source?: string; pen?: string }
export declare const BigStat: Enhancer;
/** `section.rd-night[data-theme="night"]`: __date, __line, optional quiet VoiceNote. */
export interface NightStopProps { date: string; line: string }
export declare const NightStop: Enhancer;
/** `.rd-ink` with `.rd-ink__page` (current), `.rd-ink__page--next`, `.rd-ink__bloom`; `--x`/`--y` (px) = where the bike stopped; `.rd-ink--smoke`. */
export interface InkRevealProps { x?: string; y?: string; smoke?: boolean }
export declare const InkReveal: Enhancer;
/** `.rd-sign` (a div, or an `a` when it links): __arrow svg, __dest, __sub, __km. */
export interface SignboardProps { dest: string; sub?: string; km?: string; href?: string }
export declare const Signboard: Enhancer;
/** `article.rd-exp`: __head (__id, meta), __title, `dl.rd-exp__grid` rows; the kill row is `.rd-exp__kill`. */
export interface ExperimentCardProps { id: string; when: string; title: string; insight: string; move: string; measure: string; kill: string }
export declare const ExperimentCard: Enhancer;
/** `footer.rd-garage`: title, `.rd-log` of dictation lines with Corrections, counters, a Signboard, links. */
export interface GarageProps { log: { time: string; html: string }[]; words?: string }
export declare const Garage: Enhancer;

declare global { interface Window { TheRide: Record<string, Enhancer> & { mount(scope?: ParentNode): void; peaks(n: number, seed?: number): number[]; waveform(el: HTMLElement, peaks: number[]): HTMLElement } } }
