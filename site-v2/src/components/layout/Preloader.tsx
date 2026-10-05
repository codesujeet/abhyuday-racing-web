"use client";

/* eslint-disable @next/next/no-img-element -- small static logo */
import { useEffect, useRef, useState } from "react";
import { markReady } from "@/lib/ready";

const MAX_MS = 1400; // never hold the visitor longer than this
const MIN_MS = 700; // long enough for the needle sweep to read
const KEY = "tar-preloaded";

// Gauge geometry: 270° sweep, needle from -135° to +135°.
const CX = 150;
const CY = 150;
const R = 118;
const polar = (deg: number, r = R) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const arc = (from: number, to: number, r = R) => {
  const [x1, y1] = polar(from, r);
  const [x2, y2] = polar(to, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

/**
 * Tachometer preloader: the needle sweeps 0 → 100% with real asset loading (eager images + fonts),
 * then wipes away. Shown once per session; skipped for reduced motion (see the inline script in layout).
 */
export function Preloader() {
  const [state, setState] = useState<"run" | "leave" | "done">("run");
  const rootRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const numRef = useRef<HTMLElement>(null);

  useEffect(() => {
    rootRef.current?.classList.add("is-js");
    if (document.documentElement.classList.contains("skip-preload")) {
      const r = requestAnimationFrame(() => setState("done"));
      return () => cancelAnimationFrame(r);
    }
    const start = performance.now();
    const imgs = Array.from(document.images).filter((i) => i.loading !== "lazy");
    const total = imgs.length + 1;
    let loaded = imgs.filter((i) => i.complete).length;
    const bump = () => (loaded += 1);
    imgs.forEach((i) => {
      if (!i.complete) {
        i.addEventListener("load", bump, { once: true });
        i.addEventListener("error", bump, { once: true });
      }
    });
    if (document.fonts) document.fonts.ready.then(bump, bump);
    else bump();

    let shown = 0;
    let raf = 0;
    let finished = false;
    const loop = () => {
      const elapsed = performance.now() - start;
      const real = (loaded / total) * 100;
      const timeCap = Math.min(100, (elapsed / MIN_MS) * 100);
      const target = elapsed >= MAX_MS ? 100 : Math.min(real, timeCap);
      shown += (target - shown) * 0.22;
      if (target === 100 && shown > 98.5) shown = 100;
      // Write straight to the DOM: no React render per frame.
      const v = Math.round(shown);
      arcRef.current?.setAttribute("stroke-dashoffset", String(100 - shown));
      if (needleRef.current) needleRef.current.style.transform = `rotate(${-135 + shown * 2.7}deg)`;
      if (numRef.current) numRef.current.textContent = String(v);
      rootRef.current?.setAttribute("aria-valuenow", String(v));
      if (shown >= 100 && !finished) {
        finished = true;
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        window.setTimeout(() => {
          setState("leave");
          markReady();
        }, 120);
        window.setTimeout(() => setState("done"), 820);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-preloading", state === "run");
  }, [state]);

  if (state === "done") return null;

  const ticks = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div
      ref={rootRef}
      className="preloader"
      role="progressbar"
      aria-label="Loading the site"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      style={{
        transform: state === "leave" ? "translateY(-100%)" : undefined,
        transition: "transform .7s cubic-bezier(.76,0,.24,1)",
      }}
    >
      <div className="preloader-inner">
        <img className="tach-logo" src="/brand/emblem-320.webp" alt="" width={160} height={117} />
      <div className="tach">
        <svg viewBox="0 0 300 300" aria-hidden="true">
          <path d={arc(-135, 135)} stroke="rgba(255,255,255,.1)" strokeWidth="10" fill="none" />
          <path d={arc(81, 135)} stroke="#ff3b30" strokeWidth="10" fill="none" opacity=".7" />
          <path
            d={arc(-135, 135)}
            stroke="#EE7234"
            strokeWidth="10"
            fill="none"
            ref={arcRef}
            pathLength={100}
            strokeDasharray="100 100"
            strokeDashoffset={100}
          />
          {ticks.map((i) => {
            const deg = -135 + i * 27;
            const [x1, y1] = polar(deg, R - 18);
            const [x2, y2] = polar(deg, R - 30);
            const [tx, ty] = polar(deg, R - 46);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 8 ? "#ff3b30" : "rgba(255,255,255,.55)"} strokeWidth="2.5" />
                <text x={tx} y={ty + 4} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,.5)" fontFamily="monospace">
                  {i}
                </text>
              </g>
            );
          })}
          <g ref={needleRef} className="tach-needle" style={{ transform: "rotate(-135deg)" }}>
            <path d={`M ${CX - 3} ${CY} L ${CX} ${CY - R + 22} L ${CX + 3} ${CY} Z`} fill="#EE7234" />
          </g>
          <circle cx={CX} cy={CY} r="9" fill="#0A0B0F" stroke="#EE7234" strokeWidth="3" />
        </svg>
        <div className="tach-readout">
          <strong ref={numRef}>0</strong>
          <span className="hud">RPM ×100 · Loading</span>
        </div>
      </div>
      </div>
    </div>
  );
}
