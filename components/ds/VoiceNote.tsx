"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { formatTime, peaks as makePeaks } from "@/lib/design-system/peaks";
import { Icon } from "./Icon";
import { Waveform } from "./Waveform";
import styles from "./VoiceNote.module.css";

// Starting one voice note pauses the others.
const PLAY_EVENT = "ride:voice-play";

type VoiceNoteProps = {
  /** Unique on the page. */
  id: string;
  /** The recording (10–25 s). Leave it out and the note shows as a labelled placeholder. */
  src?: string;
  /** Seconds, so the time shows before the file loads. */
  duration?: number;
  /** "Read it instead": always offered, since judges skim and some are on mute. */
  transcript?: string;
  /** Handwritten line under the capsule: "recorded on the bike, 2026". */
  where?: string;
  /** Real peaks from the audio file; until then, speech-shaped ones from `seed`. */
  peaks?: readonly number[];
  seed?: number;
  bars?: number;
  /** The Night stop's version: no fill, no shadow, outlined play. */
  quiet?: boolean;
  /** For a placeholder: what this note will be about. */
  about?: string;
  className?: string;
};

/** A short real voice note: capsule player, waveform, time, and a transcript. Never autoplays. */
export function VoiceNote({ id, src, duration, transcript, where, peaks, seed = 3, bars = 44, quiet, about, className }: VoiceNoteProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(duration ?? 0);
  const [showText, setShowText] = useState(false);
  const bars_ = useMemo(() => peaks ?? makePeaks(bars, seed), [peaks, bars, seed]);
  const isPlaceholder = !src;

  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) audioRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [id]);

  // Follow the playhead while sound plays; the waveform moves only then.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      setPosition(audioRef.current?.currentTime ?? 0);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
      void audio.play();
    } else {
      audio.pause();
    }
  };

  const played = length > 0 ? Math.round((position / length) * bars_.length) : 0;
  const seconds = Math.round(length);

  return (
    <figure className={cx(styles.voice, quiet && styles.quiet, isPlaceholder && styles.placeholder, className)}>
      <div className={styles.capsule}>
        <button
          type="button"
          className={styles.play}
          onClick={toggle}
          disabled={isPlaceholder}
          aria-label={isPlaceholder ? "Voice note, not recorded yet" : playing ? "Pause voice note" : `Play voice note, ${seconds} seconds`}
        >
          <Icon name={playing ? "pause" : "play"} size={22} />
        </button>
        <Waveform peaks={bars_} played={played} />
        <span className={cx(styles.time, "type-meta text-pencil")}>
          {isPlaceholder ? "—:——" : `${formatTime(position)} / ${formatTime(length)}`}
        </span>
        {src ? (
          <audio
            ref={audioRef}
            src={src}
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setPosition(0);
            }}
            onLoadedMetadata={(event) => {
              if (!duration) setLength(event.currentTarget.duration);
            }}
          />
        ) : null}
      </div>
      <div className={styles.foot}>
        <span className={styles.where}>{isPlaceholder ? `placeholder · ${about ?? "voice note"} · 10–25 sec` : where}</span>
        <details className={styles.transcript} onToggle={(event) => setShowText(event.currentTarget.open)}>
          <summary>Read it instead</summary>
        </details>
      </div>
      {showText ? (
        <p className={styles.text}>{transcript ?? "Transcript placeholder. The words of this voice note go here, unedited, once it’s recorded."}</p>
      ) : null}
    </figure>
  );
}
