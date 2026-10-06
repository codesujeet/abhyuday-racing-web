"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToId, setLenis } from "@/lib/scroll";

/**
 * Smooth scrolling (Lenis, driven by GSAP's ticker so ScrollTrigger stays in sync)
 * and Motion's reduced-motion handling. Lenis is skipped entirely for reduced motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.11, touchMultiplier: 1.2 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Every in-page link (#section) scrolls smoothly with the nav offset.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^=\"#\"]");
      const id = a?.getAttribute("href")?.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", id === "home" ? location.pathname : `#${id}`);
    };
    document.addEventListener("click", onClick);

    // Images and fonts change layout heights: recalculate scroll triggers when they are in.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") requestAnimationFrame(refresh);
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => {});

    // Deep link to a section (e.g. /#cars): land there after layout settles.
    const hash = window.location.hash.slice(1);
    if (hash) {
      const t = window.setTimeout(() => scrollToId(hash), 350);
      return () => {
        window.clearTimeout(t);
        cleanup();
      };
    }
    return cleanup;

    function cleanup() {
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    }
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
