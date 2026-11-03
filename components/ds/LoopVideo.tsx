"use client";

import { useEffect, useRef, useState } from "react";
import { duckEngine } from "@/lib/ride/engine-sound";
import { Icon } from "./Icon";
import styles from "./LoopVideo.module.css";

type LoopVideoProps = {
  src: string;
  /** A still from the clip, shown before it plays (and instead of playing, with reduced motion). */
  poster?: string;
  /** What the clip shows. */
  label: string;
  /** Give the clip a sound switch. It still starts muted: sound only comes on when the visitor asks. */
  sound?: boolean;
  className?: string;
};

/**
 * A short loop that plays only while it's on screen, always starting muted. With `sound`, a switch in
 * the corner turns its sound on, and the engine steps back while the clip is audible. With reduced
 * motion it never starts on its own; the visitor gets controls instead.
 */
export function LoopVideo({ src, poster, label, sound, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [audible, setAudible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // The engine drops out while the clip is heard, and comes back when it pauses or scrolls away.
  useEffect(() => {
    duckEngine(audible && playing);
    return () => duckEngine(false);
  }, [audible, playing]);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    // A tap counts as permission, so the clip may now play with sound even if it was paused.
    if (!video.muted && video.paused) void video.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={className}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setAudible(!event.currentTarget.muted)}
      />
      {sound ? (
        <button type="button" className={styles.sound} aria-pressed={audible} onClick={toggleSound}>
          <Icon name={audible ? "sound" : "mute"} size={18} />
          Sound<span className="sr-only">: {label}</span>
        </button>
      ) : null}
    </>
  );
}
