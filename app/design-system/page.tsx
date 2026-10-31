import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, iconNames } from "@/components/ds/Icon";
import { MilestoneMark } from "@/components/ds/MilestoneMark";
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
  headline: "Three growth experiments for Wispr Flow India",
  lede: "I got around 80. He bought it anyway.",
  kicker: "Stop 03 · Class 10 results · The deal",
  meta: "0:00 · voice note placeholder",
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
  { name: "animate-breathe", className: "animate-breathe", note: "Ignition key, engine off" },
  { name: "animate-idle", className: "animate-idle", note: "Bike idling at a stop" },
  { name: "animate-bob", className: "animate-bob", note: "Riding, then the fork dip on braking" },
];

const bars = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 28, 14];

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
              <span className="type-lede">₹20–25 lakh, ₹10–12 lakh</span>
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

      <p className="pt-7">
        <Link href="/" className="type-kicker inline-flex min-h-11 items-center gap-2 text-ink underline decoration-rule underline-offset-4 hover:text-red-pen">
          Back to the ride
          <Icon name="arrow-right" size={18} />
        </Link>
      </p>
    </main>
  );
}
