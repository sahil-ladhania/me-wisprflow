"use client";

import { useEffect } from "react";

/** A stop arrives when its top crosses this far down the viewport. */
const ARRIVAL_LINE = 0.6;

/**
 * Marks each stop as arrived when it scrolls in, which runs the arrival choreography and the ink
 * bloom in app/styles/motion.css. Stops already on screen when the page loads arrive instantly,
 * before the page is armed, so nothing visible ever blinks. Mount once.
 */
export function ArrivalWatcher() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
    const root = document.documentElement;

    const arrive = (section: HTMLElement, instant: boolean) => {
      if (section.hasAttribute("data-arrived")) return;
      if (!instant) {
        // The ink blooms from where the bike stopped: its headlamp end, relative to this stop.
        const box = section.getBoundingClientRect();
        const bike = document.querySelector("[data-bike]")?.getBoundingClientRect();
        const x = bike ? bike.left + bike.width * 0.75 - box.left : box.width * 0.3;
        const y = bike ? bike.top + bike.height * 0.4 - box.top : window.innerHeight * 0.85 - box.top;
        const reach = 2.2 * Math.hypot(box.width, Math.min(box.height, window.innerHeight * 1.5));
        section.style.setProperty("--ink-x", `${Math.round(x)}px`);
        section.style.setProperty("--ink-y", `${Math.round(y)}px`);
        section.style.setProperty("--ink-reach", `${Math.round(reach)}px`);
      }
      section.setAttribute("data-arrived", instant ? "instant" : "");
    };

    const onScreen = (section: HTMLElement) => {
      const box = section.getBoundingClientRect();
      return box.top < window.innerHeight * 0.9 && box.bottom > 0;
    };
    sections.filter(onScreen).forEach((section) => arrive(section, true));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      sections.forEach((section) => arrive(section, true));
      return;
    }

    // Hide the stops not yet reached with transitions off, then switch transitions on two frames
    // later, so nothing below the fold fades out on load.
    root.dataset.motion = "arming";
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        root.dataset.motion = "armed";
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          arrive(entry.target as HTMLElement, false);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - ARRIVAL_LINE) * 100)}% 0px` },
    );
    sections.filter((section) => !section.hasAttribute("data-arrived")).forEach((section) => io.observe(section));

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
