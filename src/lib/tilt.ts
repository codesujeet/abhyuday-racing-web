import type { PointerEvent } from "react";

/** Slight 3D tilt towards the pointer (mouse only, off for reduced motion). Use with onPointerMove / onPointerLeave. */
export function tilt(e: PointerEvent<HTMLElement>, strength = 1) {
  if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateX(${(-y * 8 * strength).toFixed(2)}deg) rotateY(${(x * 10 * strength).toFixed(2)}deg) translateZ(0)`;
}

export function untilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}
