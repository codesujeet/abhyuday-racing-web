"use client";

import { useSyncExternalStore } from "react";

// The preloader announces when it starts to leave, so the hero intro plays in view, not behind it.
const EVENT = "tar:ready";
let ready = false;

export function markReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  // Safety net: never wait longer than the preloader's maximum.
  const t = window.setTimeout(markReady, 2600);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.clearTimeout(t);
  };
}

const snapshot = () => ready || document.documentElement.classList.contains("skip-preload");

export function useSiteReady() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
