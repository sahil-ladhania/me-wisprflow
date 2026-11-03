import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BigStat, StatRow } from "@/components/ds/BigStat";
import { Bike } from "@/components/ds/Bike";
import { Correction, CorrectionText, Mark } from "@/components/ds/Correction";
import { DrawObserver } from "@/components/ds/DrawObserver";
import { Icon, iconNames } from "@/components/ds/Icon";
import { IndexCard, IndexRow, IndexRows } from "@/components/ds/IndexCard";
import { MarginNote } from "@/components/ds/MarginNote";
import { Milestone } from "@/components/ds/Milestone";
import { MilestoneMark } from "@/components/ds/MilestoneMark";
import { NightStop } from "@/components/ds/NightStop";
import { ScannedDocument, ScanLine, ScanProof, ScanRule } from "@/components/ds/ScannedDocument";
import { Signboard } from "@/components/ds/Signboard";
import { StopHeader } from "@/components/ds/StopHeader";
import { TapedPhoto } from "@/components/ds/TapedPhoto";
import { Waveform } from "@/components/ds/Waveform";
import { peaks } from "@/lib/design-system/peaks";
import { Odometer } from "@/components/ds/Odometer";
import { RouteMap } from "@/components/ds/RouteMap";
import { ExhaustDemo, IgnitionDemo, InkDemo, LaneDemo, RideControlsDemo } from "./demos";
import { marks, placeholders, textures } from "@/lib/design-system/assets";
import {
  colors,
  durations,
  easings,
  layout,
  shadows,
  space,
  typeStyles,
  type ColorName,
  type Theme,
  type TypeStyleName,
} from "@/lib/design-system/tokens";

export const metadata: Metadata = {
  title: "Design system",
  description: "Every token, type style and asset of The Ride design system, as it runs in this app.",
  robots: { index: false, follow: false },
};

// Tailwind only generates classes it can find written out in full, so every class is spelled here.
const typeClass: Record<TypeStyleName, string> = {
  display: "type-display",
  "stop-title": "type-stop-title",
  headline: "type-headline",
  lede: "type-lede",
  body: "type-body",
  caption: "type-caption",
  "night-line": "type-night-line",
  stat: "type-stat",
  milestone: "type-milestone",
  kicker: "type-kicker",
  meta: "type-meta",
  sign: "type-sign",
  pen: "type-pen",
  scribble: "type-scribble",
};

// Samples come from tokens.json, except where one would state something that isn't true (yet).
const sampleOverrides: Partial<Record<TypeStyleName, string>> = {
  headline: "lulu: personality first, matchmaking through voice.",
  lede: "I got around 80. He bought it anyway.",
  kicker: "Stop 03 · Class 10 results · The deal",
  meta: "Stop 03 / 11",
  scribble: "still have it.",
};

const radiusClass = {
  "rounded-none": "Default. Paper is cut square.",
  "rounded-hair": "Tape ends, small tags, scan corners.",
  "rounded-soft": "Signboards, the transcript drawer.",
  "rounded-t-stone": "Milestone dome, top corners only.",
  "rounded-pill": "Voice things only.",
};

const shadowClass = {
  "shadow-contact": "Paper on paper: photos, scans, cards.",
  "shadow-lift": "The one object being handled.",
  "shadow-ground": "Under the bike and milestone stones.",
};

const motionDemos: { name: string; className: string; note: string }[] = [
  { name: "animate-live", className: "animate-live", note: "Live waveform, while sound plays or the mic listens" },
  { name: "animate-breathe", className: "animate-breathe", note: "Ignition key, before ignition" },
  { name: "animate-idle", className: "animate-idle", note: "Bike idling at a stop" },
  { name: "animate-bob", className: "animate-bob", note: "Riding, then the fork dip on braking" },
];

const bars = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 28, 14];

/** One component specimen: name, what it's for, then the thing itself. */
function Specimen({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-rule py-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-7">
      <div className="flex flex-col gap-2">
        <h3 className="type-headline">{name}</h3>
        <p className="type-caption text-pencil">{note}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Section({ id, kicker, title, note, children }: { id: string; kicker: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-b border-rule py-7">
      <p className="type-kicker">{kicker}</p>
      <h2 id={`${id}-title`} className="type-headline mt-2">
        {title}
      </h2>
      {note ? <p className="type-body mt-3 max-w-measure text-pencil">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ColourPanel({ theme }: { theme: Theme }) {
  return (
    <div data-theme={theme} className="min-w-0 bg-paper p-5 text-ink shadow-contact">
      <p className="type-kicker">{theme === "day" ? "Day · every page" : "Night · the June 2025 stop only"}</p>
      <ul className="mt-4 grid gap-3">
        {(Object.keys(colors) as ColorName[]).map((name) => (
          <li key={name} className="flex items-start gap-4">
            <span
              className="size-11 shrink-0 border border-rule"
              style={{ background: `var(--${name})` }}
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="type-meta block text-ink">
                {name} · {colors[name][theme]}
              </span>
              <span className="type-caption block text-pencil">{colors[name].usage}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-5">
        <span className="type-sign rounded-soft bg-signboard px-4 py-3 text-on-signboard shadow-[inset_0_0_0_5px_var(--signboard),inset_0_0_0_7px_var(--on-signboard)]">
          Wispr Flow
        </span>
        <span className="type-kicker bg-haldi px-3 py-2 text-on-haldi">Haldi cap</span>
        <span className="type-pen">red pen</span>
        <mark className="type-body bg-highlight px-1 text-ink">highlight</mark>
        <span className="flex size-11 items-center justify-center rounded-pill bg-red-pen text-on-red-pen">
          <Icon name="mic" />
        </span>
      </div>
    </div>
  );
}

function EasingCurve({ name, value }: { name: string; value: string }) {
  const [x1, y1, x2, y2] = value.match(/[\d.]+/g)!.map(Number);
  return (
    <figure className="m-0 flex flex-col gap-2">
      <svg viewBox="-4 -4 108 108" className="size-[120px] overflow-visible bg-card shadow-contact" aria-hidden="true">
        <path d="M0 100 L100 0" stroke="var(--rule)" strokeDasharray="3 3" fill="none" />
        <path
          d={`M0 100 C${x1 * 100} ${100 - y1 * 100} ${x2 * 100} ${100 - y2 * 100} 100 0`}
          stroke="var(--ink)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <figcaption className="type-meta text-pencil">
        ease-{name}
        <span className="block">{value}</span>
      </figcaption>
    </figure>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-page px-4 pb-9 pt-7 xl:px-8">
      <header className="flex flex-wrap items-end gap-5 border-b border-rule pb-7">
        <MilestoneMark label="The Ride milestone mark" />
        <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-3">
          <p className="type-kicker">The Ride · design system</p>
          <h1 className="type-display">Every token, in use.</h1>
          <p className="type-lede max-w-measure">
            The system behind the ride, wired into this app. Day is the page. Night is one stop.
          </p>
          <p className="type-meta text-pencil">Source: design-system/tokens.json · regenerate with pnpm tokens</p>
        </div>
      </header>

      <Section
        id="colour"
        kicker="01 · Colour"
        title="16 colours, two themes"
        note={`Both panels use the same classes. The second sits inside data-theme="night", so every token swaps underneath it.`}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <ColourPanel theme="day" />
          <ColourPanel theme="night" />
        </div>
      </Section>

      <Section id="type" kicker="02 · Type" title="14 styles, three voices" note="Newsreader for the journal, Barlow Condensed for the road, Kalam for the hand. Phone size first; desktop size from 600px.">
        <ul className="grid gap-0">
          {(Object.keys(typeStyles) as TypeStyleName[]).map((name) => {
            const style = typeStyles[name];
            return (
              <li key={name} className="grid gap-3 border-t border-rule py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
                <p className="type-meta text-pencil">
                  <span className="block text-ink">{typeClass[name]}</span>
                  {style.family} · {style.mobileFontSize === style.fontSize ? `${style.fontSize}px` : `${style.mobileFontSize} → ${style.fontSize}px`} · {style.fontWeight}
                </p>
                <p className={`${typeClass[name]} min-w-0 break-words`}>{sampleOverrides[name] ?? style.sample}</p>
              </li>
            );
          })}
          <li className="grid gap-3 border-t border-rule py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
            <p className="type-meta text-pencil">
              <span className="block text-ink">rupee check</span>road and story faces
            </p>
            <p className="flex flex-wrap items-baseline gap-5">
              <span className="type-stat">₹20,000</span>
              <span className="type-lede">~₹80 lakh, chose love instead</span>
            </p>
          </li>
        </ul>
      </Section>

      <Section id="space" kicker="03 · Space" title="A 4px base, ten steps" note="Tailwind's spacing keys 1–10 are these steps: p-5 is space-5 (24px).">
        <ul className="grid gap-3">
          {Object.entries(space).map(([step, px]) => (
            <li key={step} className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4">
              <span className="type-meta text-pencil">
                space-{step} · {px}px
              </span>
              <span className="block h-3 max-w-full bg-ink" style={{ width: `var(--space-${step})` }} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="shape" kicker="04 · Corners and shadows" title="Paper is cut square">
        <div className="flex flex-wrap gap-6">
          {Object.entries(radiusClass).map(([className, note]) => (
            <figure key={className} className="m-0 flex w-[150px] flex-col gap-3">
              <span
                className={`${className} block h-[88px] border-[1.5px] border-ink bg-card ${className === "rounded-pill" ? "w-[150px]" : "w-[88px]"}`}
              />
              <figcaption className="type-meta text-pencil">
                <span className="block text-ink">{className}</span>
                {note}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          {(["day", "night"] as const).map((theme) => (
            <div key={theme} data-theme={theme} className="flex flex-wrap gap-6 bg-paper p-6">
              {Object.entries(shadowClass).map(([className, note]) => (
                <figure key={className} className="m-0 flex w-[150px] flex-col gap-3">
                  <span className={`${className} block h-[88px] bg-card`} />
                  <figcaption className="type-meta text-pencil">
                    <span className="block text-ink">{className}</span>
                    {note}
                  </figcaption>
                </figure>
              ))}
              <figure className="m-0 flex w-[150px] flex-col gap-3">
                <button type="button" className="type-kicker h-11 rounded-pill border-[1.5px] border-ink bg-card px-4 text-ink" style={{ boxShadow: "var(--focus-ring)" }}>
                  Focus ring
                </button>
                <figcaption className="type-meta text-pencil">
                  <span className="block text-ink">--focus-ring</span>
                  {theme === "day" ? shadows["focus-ring"].day : shadows["focus-ring"].night}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </Section>

      <Section id="motion" kicker="05 · Motion" title="Pull away, cruise, brake, settle" note="Durations and curves from the timing tokens. Turn on reduced motion and everything below stands still.">
        <div className="flex flex-wrap gap-6">
          {Object.entries(easings).map(([name, value]) => (
            <EasingCurve key={name} name={name} value={value} />
          ))}
          <ul className="grid content-start gap-2">
            {Object.entries(durations).map(([name, ms]) => (
              <li key={name} className="type-meta text-pencil">
                <span className="text-ink">dur-{name}</span> · {ms}ms
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {motionDemos.map((demo) => (
            <li key={demo.name} className="flex flex-col gap-3">
              <div className="flex h-[96px] items-center justify-center bg-card shadow-contact">
                {demo.name === "animate-live" ? (
                  <span className="flex h-8 items-center gap-1" aria-hidden="true">
                    {bars.map((h, i) => (
                      <span key={i} className={`${demo.className} block w-1 rounded-hair bg-red-pen`} style={{ height: h }} />
                    ))}
                  </span>
                ) : demo.name === "animate-breathe" ? (
                  <span className="relative flex size-[52px] items-center justify-center rounded-pill bg-ink text-paper">
                    <span className="absolute -inset-2 animate-breathe rounded-pill border-2 border-wave-rest" aria-hidden="true" />
                    <Icon name="mic" />
                  </span>
                ) : (
                  <Image
                    src={placeholders.bikeSilhouette.src}
                    width={120}
                    height={75}
                    alt=""
                    className={demo.name === "animate-bob" ? "animate-bob" : "animate-idle"}
                    style={demo.name === "animate-bob" ? { animationIterationCount: "infinite" } : undefined}
                  />
                )}
              </div>
              <p className="type-meta text-pencil">
                <span className="block text-ink">{demo.name}</span>
                {demo.note}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div
              className="h-[58px] bg-paper texture-road-dash animate-road"
              style={{ animationIterationCount: "infinite", animationTimingFunction: "linear" }}
            />
            <p className="type-meta text-pencil">
              <span className="block text-ink">animate-road · texture-road-dash</span>
              Road dashes scroll right to left; the bike never moves.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="type-body">
              I chose science because{" "}
              <span className="relative inline-block">
                I wanted to crack IIT
                <span className="absolute inset-x-0 top-1/2 h-[14px] -translate-y-1/2 texture-pen-strike animate-strike" aria-hidden="true" />
              </span>{" "}
              <span className="type-pen inline-block animate-pen-in">my girlfriend did</span>
            </p>
            <p className="type-meta text-pencil">
              <span className="block text-ink">animate-strike, then animate-pen-in</span>
              Plays once, on load. Pass 2 runs it when a correction scrolls into view.
            </p>
          </div>
        </div>
      </Section>

      <Section id="layout" kicker="06 · Layout" title="One stop per screen">
        <dl className="grid gap-0 sm:grid-cols-2">
          {Object.entries(layout).map(([name, value]) => (
            <div key={name} className="flex justify-between gap-4 border-t border-rule py-3">
              <dt className="type-meta text-ink">--{name}</dt>
              <dd className="type-meta m-0 text-right text-pencil">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="type-caption mt-4 text-pencil">
          Tailwind: max-w-measure, max-w-page. Breakpoint sm: is 600px. Gutters: px-4 on phones, xl:px-8 at 1280px.
        </p>
      </Section>

      <Section id="icons" kicker="07 · Icons" title="Nine controls, one stroke" note="Icons only on controls. They draw in the colour of their text.">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {iconNames.map((name) => (
            <li key={name} className="flex flex-col items-center gap-3 bg-card px-2 py-5 shadow-contact">
              <Icon name={name} />
              <span className="type-meta text-center text-pencil">{name}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <span className="flex size-[52px] items-center justify-center rounded-pill bg-ink text-paper">
            <Icon name="mic" label="Ink disc, paper icon" />
          </span>
          <span className="flex size-[52px] items-center justify-center rounded-pill bg-red-pen text-on-red-pen">
            <Icon name="mic" label="Listening: red-pen disc" />
          </span>
          <span className="flex size-12 items-center justify-center rounded-pill border-[1.5px] border-ink text-ink">
            <Icon name="play" size={22} label="Play" />
          </span>
          <span className="type-sign flex items-center gap-3 rounded-soft bg-signboard px-5 py-4 text-on-signboard shadow-[inset_0_0_0_5px_var(--signboard),inset_0_0_0_7px_var(--on-signboard)]">
            Ride on <Icon name="arrow-right" />
          </span>
        </div>
      </Section>

      <Section id="assets" kicker="08 · Marks, textures, placeholders" title="Everything the page is drawn with">
        <div className="flex flex-wrap items-end gap-7">
          <figure className="m-0 flex flex-col gap-3">
            <Image src={marks.milestone.src} width={marks.milestone.width} height={marks.milestone.height} alt="The Ride milestone mark" />
            <figcaption className="type-meta text-pencil">milestone-mark.svg</figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-3">
            <Image src="/icon.svg" width={32} height={32} alt="The favicon" />
            <figcaption className="type-meta text-pencil">favicon (app/icon.svg)</figcaption>
          </figure>
        </div>

        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex flex-col gap-3">
            <div className="h-[120px] bg-paper texture-paper-grain shadow-contact" />
            <p className="type-meta text-pencil">
              <span className="block text-ink">paper-grain · texture-paper-grain</span>Tiles over the page ground.
            </p>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex h-[120px] items-center justify-center bg-card shadow-contact">
              <span className="block h-[26px] w-[92px] -rotate-6 texture-tape" />
            </div>
            <p className="type-meta text-pencil">
              <span className="block text-ink">tape-strip · texture-tape</span>Holds photos and scans to the page.
            </p>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex h-[120px] items-center justify-center bg-scan shadow-contact">
              <span className="type-body relative inline-block px-5 py-3">
                first prize
                <span className="absolute inset-0 texture-pen-circle" aria-hidden="true" />
              </span>
            </div>
            <p className="type-meta text-pencil">
              <span className="block text-ink">pen-circle · texture-pen-circle</span>One red-pen mark per scan.
            </p>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex h-[120px] items-center justify-center bg-card shadow-contact">
              <span className="block h-[14px] w-[200px] texture-pen-strike" />
            </div>
            <p className="type-meta text-pencil">
              <span className="block text-ink">pen-strike · texture-pen-strike</span>Stretches to the words it strikes.
            </p>
          </li>
          <li className="flex flex-col gap-3">
            <div className="h-[120px] bg-paper texture-road-dash shadow-contact" />
            <p className="type-meta text-pencil">
              <span className="block text-ink">road-dash · texture-road-dash</span>The lane road, repeat-x.
            </p>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex h-[120px] items-center justify-center bg-card shadow-contact">
              <span className="block size-[96px] bg-signboard mask-ink-bloom" />
            </div>
            <p className="type-meta text-pencil">
              <span className="block text-ink">ink-bloom · mask-ink-bloom</span>The mask for ink and smoke transitions.
            </p>
          </li>
        </ul>

        <div className="mt-7 flex flex-wrap items-end gap-7">
          <figure className="m-0 flex flex-col gap-3">
            <Image src={placeholders.bikeSilhouette.src} width={placeholders.bikeSilhouette.width} height={placeholders.bikeSilhouette.height} alt="Placeholder bike with rider" />
            <figcaption className="type-meta text-pencil">
              <span className="block text-ink">bike-silhouette.svg</span>In the lane until the 3D bike lands.
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-3">
            <Image src={placeholders.photoSlot.src} width={160} height={200} alt="Empty photo slot" />
            <figcaption className="type-meta text-pencil">
              <span className="block text-ink">photo-slot.svg</span>Development only. Never ship it.
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-3">
            <Image src={textures.inkBloom.src} width={textures.inkBloom.width} height={textures.inkBloom.height} alt="" />
            <figcaption className="type-meta text-pencil">
              <span className="block text-ink">ink-bloom.svg</span>As a file.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section
        id="components"
        kicker="09 · Components"
        title="What the ride is built from"
        note="Every component the stops use, live. Missing photos and scans show as labelled placeholders on their own."
      >
        <DrawObserver />

        <Specimen name="Milestone" note="The year marker. Past years haldi, 2026 ink, what's ahead signboard green. Large in a stop header, small in the lane.">
          <div className="flex flex-wrap items-end gap-6">
            <Milestone cap="CLASS 9" year="2016" />
            <Milestone cap="COLLEGE" year="2021" place="BLR" />
            <Milestone cap="NOW" year="2026" place="BLR" kind="now" />
            <Milestone cap="WISPR FLOW" year="NEXT" place="INDIA" kind="next" />
            <Milestone cap="AUG" year="2025" size="sm" />
            <Milestone cap="MOUNTAINS" year="CAFE" size="sm" kind="next" />
          </div>
        </Specimen>

        <Specimen name="StopHeader" note="Opens every stop but the Night one: milestone, kicker, the claim, the aside that undercuts it.">
          <StopHeader
            milestone={{ cap: "CLASS 9", year: "2016" }}
            kicker="Stop 01 · 2016 · Class 9"
            title="The dance guy entered the cooking contest."
            lede="About 95% of the contestants were girls. I won first prize. With a very basic dish."
            headingLevel={3}
          />
        </Specimen>

        <Specimen name="TapedPhoto" note="Real photos only, taped and tilted. Without a photo it prints a labelled placeholder.">
          <div className="flex flex-wrap items-start gap-8 px-5 pt-4">
            <TapedPhoto src="/media/photos/le-cordon-bleu.jpg" alt="Le Cordon Bleu Paris, from its website" caption="chose love instead." tilt={-2.5} ratio="4 / 3" width="min(100%, 320px)" sizes="320px" />
            <TapedPhoto alt="A photo still to come" caption="placeholder." tilt={1.8} ratio="4 / 3" tape="top" width="min(100%, 360px)" />
          </div>
        </Specimen>

        <Specimen name="ScannedDocument" note="A scan of a real object as proof, tilted 1.5° at most, one red-pen mark.">
          <div className="flex flex-wrap items-start gap-8">
            <ScannedDocument label="Scan · placeholder" alt="A scan still to come" note="proof, soon." tilt={-1} />
            <ScannedDocument label="Scan · how a recreated scan reads" alt="" tilt={1}>
              <ScanLine width="60%" />
              <ScanRule />
              <ScanLine width="92%" />
              <div className="my-4">
                <ScanProof>[the one line that matters, circled]</ScanProof>
              </div>
              <ScanLine width="70%" />
            </ScannedDocument>
          </div>
        </Specimen>

        <Specimen name="Correction · Mark" note="Wrong turns struck in red pen, the truth written over them. Strikes draw once as they scroll into view. One highlighter swipe per stop.">
          <div className="flex flex-col gap-5">
            <CorrectionText className="type-body max-w-measure">
              I chose science because <Correction was="I wanted to crack IIT" is="my girlfriend did" />.
            </CorrectionText>
            <p className="type-body max-w-measure">
              lulu: 3,500+ on the waitlist. Status: <Correction inline was="building" is="paused" />. <Mark>Knowing when to stop is a growth skill too.</Mark>
            </p>
          </div>
        </Specimen>

        <Specimen name="MarginNote" note="A handwritten aside with an arrow, beside the thing it points at. Ink or pencil, never red.">
          <div className="flex flex-wrap items-start gap-8 pt-5">
            <MarginNote>37% women. on a matchmaking app.</MarginNote>
            <MarginNote pencil flip tilt={2}>
              my PG owner offered to fund it
            </MarginNote>
          </div>
        </Specimen>

        <Specimen name="BigStat · StatRow" note="The number does the bragging; the label stays plain. Up to three in a row, two columns on phones.">
          <StatRow>
            <BigStat value="3,500" unit="+" label="on lulu’s waitlist" source="grown through my own LinkedIn content" />
            <BigStat value="37" unit="%" label="women" pen="on a matchmaking app." />
            <BigStat value="~200" label="users I spoke to myself" />
          </StatRow>
        </Specimen>

        <Specimen name="Signboard" note="Green, only for what lies ahead. Arrow up is the next stop; arrow right is beyond the road.">
          <div className="flex flex-wrap gap-6">
            <Signboard dest="Wispr Flow" sub="India · Growth" km="NEXT" arrow="up" />
            <Signboard dest="Mountains" sub="A boutique cafe · someday" />
          </div>
        </Specimen>

        <Specimen name="IndexCard" note="Not in the design system's list; built from its tokens for the journal cards the stops need.">
          <IndexCard kicker="Card 06 · The cafe that almost happened" tilt={1}>
            <IndexRows>
              <IndexRow label="Backer">My PG owner</IndexRow>
              <IndexRow label="Split">50/50 profit</IndexRow>
              <IndexRow label="Mine to run">Design, menu, team, operations</IndexRow>
              <IndexRow label="Status" kill>
                <Correction inline was="Go" is="cancelled" />
              </IndexRow>
            </IndexRows>
          </IndexCard>
        </Specimen>

        <Specimen name="Waveform" note="The mic's live bars inside the ignition key: red and moving while it listens for “let’s ride”.">
          <Waveform peaks={peaks(22, 11)} live className="max-w-[160px]" />
        </Specimen>

        <Specimen name="IgnitionControl" note="Say “let’s ride”, or tap. The speech recogniser arrives with the ride; this demo fakes its timing.">
          <IgnitionDemo />
        </Specimen>

        <Specimen name="ExhaustControl" note="The ride’s sound switch: stock, loud, silent. Each change puffs the pipe, except into silence.">
          <ExhaustDemo />
        </Specimen>

        <Specimen name="Odometer" note="The hero’s route card. Unpowered before ignition; lit after, when every drum turns over once.">
          <div className="flex flex-wrap gap-6">
            <Odometer readings={[{ value: 10, unit: "years" }, { value: 11, unit: "stops" }]} />
            <Odometer lit readings={[{ value: 10, unit: "years" }, { value: 11, unit: "stops" }]} />
          </div>
        </Specimen>

        <Specimen name="RouteMap" note="The route as a winding road, a stone per stop, the bike parked at the start. Every stop is a link.">
          <div className="max-w-[400px]">
            <RouteMap
              here="you are here"
              stops={[
                { href: "#map-2016", short: "2016", name: "The stage and the kitchen" },
                { href: "#map-june-2025", short: "JUN 25", name: "June 2025", kind: "night" },
                { href: "#map-next", short: "NEXT", name: "Wispr Flow India", kind: "next" },
                { href: "#map-end", short: "END", name: "The garage", kind: "now" },
              ]}
            />
          </div>
        </Specimen>

        <Specimen name="Bike" note="The ride’s bike, side on: Sahil alone and the lamp dark before ignition; lamp on and the visitor on the pillion after. No logo anywhere.">
          <div className="grid gap-6 sm:grid-cols-3">
            <Bike className="w-full" />
            <Bike className="w-full" headlamp pillion />
            <div data-theme="night" className="bg-paper p-3">
              <Bike className="w-full" headlamp pillion />
            </div>
          </div>
        </Specimen>

        <Specimen name="RideControls" note="The right end of a handlebar: brake lever, twist grip, and the exhaust. Throttle rides to the next stop; brake stops a ride, or rolls back one stop.">
          <RideControlsDemo />
        </Specimen>

        <Specimen name="BikeLane" note="Pinned to the bottom of the screen on the real page. The bike never moves sideways; the road and the stones do.">
          <LaneDemo />
        </Specimen>

        <Specimen name="InkReveal" note="Each stop blooms in from where the bike stopped. Smoke only into and out of the Night stop.">
          <InkDemo />
        </Specimen>

        <Specimen name="NightStop" note="June 2025 only. One plain line, the headlamp as the only light. No red pen, no stats.">
          <NightStop date="June 2025" line="June 2025 was the lowest point of my life." lineAs="p" />
        </Specimen>
      </Section>

      <p className="pt-7">
        <Link href="/" className="type-kicker inline-flex min-h-11 items-center gap-2 text-ink underline decoration-rule underline-offset-4 hover:text-red-pen">
          Back to the ride
          <Icon name="arrow-right" size={18} />
        </Link>
      </p>
    </main>
  );
}
