"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  /** A still from the clip, shown before it plays (and instead of playing, with reduced motion). */
  poster?: string;
  /** What the clip shows. */
  label: string;
  className?: string;
};

/**
 * A short silent loop that plays only while it's on screen. Muted always: the engine is the ride's
 * only sound. With reduced motion it never starts on its own; the visitor gets controls instead.
 */
export function LoopVideo({ src, poster, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

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

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className={className} />;
}
