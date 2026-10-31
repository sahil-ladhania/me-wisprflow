"use client";

import { useEffect } from "react";

/**
 * Draws red-pen strikes once, as each Correction scrolls into view. Mount it once per page.
 * It arms the page only when motion is allowed, so without it every strike is simply drawn.
 */
export function DrawObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.dataset.pen = "armed";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-drawn", "");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.6 },
    );
    const observeAll = () => document.querySelectorAll("[data-pen-mark]:not([data-drawn])").forEach((el) => io.observe(el));
    observeAll();

    // Corrections that mount later (client-rendered parts of the page) get picked up too.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      delete root.dataset.pen;
    };
  }, []);

  return null;
}
