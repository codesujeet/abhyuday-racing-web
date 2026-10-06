"use client";

import { useEffect, useRef } from "react";

/**
 * A LiDAR-style point cloud: rows of points over rolling terrain, rushing towards the viewer,
 * with a sweeping scan beam. Pure canvas 2D, paused when off-screen or when the tab is hidden.
 * With reduced motion it draws a single still frame.
 */
export function PointCloud({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const COLS = small ? 26 : 52;
    const ROWS = small ? 20 : 32;
    const DEPTH = 40;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Terrain height: a few layered waves, like a dirt track with ruts and bumps.
    const ground = (x: number, z: number) =>
      Math.sin(x * 0.35 + z * 0.22) * 0.45 + Math.sin(x * 0.9 - z * 0.5) * 0.18 + Math.cos(z * 0.35) * 0.3;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.42;
      const fov = Math.min(w, h * 1.6) * 0.9;
      const camY = 2.4;
      const scan = (t * 0.25) % 1; // sweep position 0..1 across depth

      for (let r = 0; r < ROWS; r++) {
        // rows move towards the camera over time
        const z = ((r / ROWS) * DEPTH - ((t * 3) % (DEPTH / ROWS)) + DEPTH) % DEPTH + 1.2;
        const depthFade = 1 - z / DEPTH;
        const scanHit = Math.abs(z / DEPTH - scan) < 0.035;
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1) - 0.5) * 26;
          const y = ground(x, z + t * 3);
          const sx = w * 0.62 + (x / z) * fov;
          const sy = horizon + ((camY - y) / z) * fov * 0.55;
          if (sx < -10 || sx > w + 10 || sy > h + 10) continue;
          const size = Math.max(0.6, 2.4 * depthFade);
          // left edge reads as the lane: cobalt, the rest orange
          const lane = Math.abs(x) < 1.2;
          let alpha = 0.18 + depthFade * 0.7;
          if (scanHit) alpha = Math.min(1, alpha + 0.45);
          ctx.fillStyle = lane ? `rgba(71,163,220,${alpha})` : `rgba(238,114,52,${alpha * 0.8})`;
          ctx.fillRect(sx, sy, size, size);
        }
      }
    };

    const loop = (now: number) => {
      // ~30 fps is plenty for a background effect and halves the main-thread cost.
      if (now - last < 32) {
        if (visible) raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt * 0.6;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    // Start after the page has loaded and the browser is idle, so it never competes with first paint.
    let started = false;
    let idleId = 0;
    const begin = () => {
      if (started) return;
      started = true;
      resize();
      if (reduced) draw();
      else start();
    };
    const schedule = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idleId = ric(begin, { timeout: 2500 }) as number;
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting && !document.hidden;
      if (started && visible && !was && !reduced) {
        start();
      }
    });
    io.observe(canvas);
    const onVis = () => {
      const was = visible;
      visible = !document.hidden;
      if (started && visible && !was && !reduced) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => {
      if (!started) return;
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    return () => {
      window.removeEventListener("load", schedule);
      window.cancelIdleCallback?.(idleId);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
