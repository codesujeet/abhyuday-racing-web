"use client";

import type Lenis from "lenis";

// The single Lenis instance (null when reduced motion is on or before mount).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

// While a link-triggered scroll runs, the nav bar stays visible (see Nav).
let keepNavUntil = 0;
export function navPinned() {
  return performance.now() < keepNavUntil;
}

function navOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return parseFloat(v) || 68;
}

/** Smooth-scroll to a section id, leaving room for the sticky nav. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  keepNavUntil = performance.now() + 1800;
  // A numeric target, so the nav offset is applied exactly once.
  const top = id === "home" ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - navOffset());
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4 });
  } else {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
}

export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
}
