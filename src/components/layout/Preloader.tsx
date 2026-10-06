"use client";

/* eslint-disable @next/next/no-img-element -- static logo */
import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { markReady } from "@/lib/ready";

// Timings (ms). Total ≈ 3.4 s.
const TYPE_START = 1000; // after logo + glow + name have faded in
const TYPE_STEP = 55; // per character
const HOLD = 450; // pause after typing
const FLY = 950; // logo flies to the nav

/**
 * Landing intro, played on every page load: logo with an orange glow and the team name,
 * the hashtag types itself out, then the logo flies into the nav's top-left corner and the
 * black screen fades to reveal the hero. Skipped for visitors who prefer reduced motion.
 */
export function Preloader() {
  const [state, setState] = useState<"run" | "fly" | "done">("run");
  const [typed, setTyped] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const tag = site.introTag;

  useEffect(() => {
    rootRef.current?.classList.add("is-js");
    if (document.documentElement.classList.contains("skip-preload")) {
      const r = requestAnimationFrame(() => setState("done"));
      return () => cancelAnimationFrame(r);
    }
    document.documentElement.classList.add("is-preloading");
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    // Typing
    for (let i = 1; i <= tag.length; i++) at(TYPE_START + i * TYPE_STEP, () => setTyped(i));
    const typedAt = TYPE_START + tag.length * TYPE_STEP + HOLD;

    // Fly the logo into the nav brand slot, then fade the black screen away.
    at(typedAt, () => {
      setState("fly");
      // Wait one frame so the fade-in animation is released before the flight starts.
      requestAnimationFrame(() => requestAnimationFrame(fly));
    });

    const fly = () => {
      const logo = logoRef.current;
      const target = document.querySelector<HTMLElement>(".nav .brand img");
      if (logo && target) {
        const a = logo.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const dx = b.left + b.width / 2 - (a.left + a.width / 2);
        const dy = b.top + b.height / 2 - (a.top + a.height / 2);
        animate(logo, { x: dx, y: dy, scale: b.width / a.width }, { duration: FLY / 1000, ease: [0.65, 0, 0.35, 1] });
      }
      if (rootRef.current) {
        animate(rootRef.current, { backgroundColor: "rgba(0,0,0,0)" }, { duration: 0.7, delay: (FLY / 1000) * 0.3, ease: "easeOut" });
      }
      at(FLY * 0.45, markReady);
    };
    // Hand over to the real nav logo the moment the flight lands (same size, same spot).
    at(typedAt + FLY + 120, () => {
      document.documentElement.classList.remove("is-preloading");
      setState("done");
    });

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.classList.remove("is-preloading");
    };
  }, [tag]);

  if (state === "done") return null;

  return (
    <div ref={rootRef} className={`preloader ${state === "fly" ? "is-flying" : ""}`} aria-hidden="true">
      <div className="intro">
        <div className="intro-logo-wrap">
          <span className="intro-glow" />
          <img ref={logoRef} className="intro-logo" src="/brand/emblem-640.webp" alt="" width={260} height={190} />
        </div>
        <p className="intro-name">{site.name}</p>
        <p className="intro-tag">
          <span>{tag.slice(0, typed)}</span>
          <span className="intro-caret" />
        </p>
      </div>
    </div>
  );
}
