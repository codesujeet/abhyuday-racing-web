"use client";

// Tiny party-popper effect: orange and blue triangles and rectangles burst from points on screen,
// tumble, fall and fade. One shared full-screen canvas, created on demand and removed when idle.

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  shape: 0 | 1; // 0 = triangle, 1 = rectangle
  color: string;
  life: number;
};

const COLORS = ["#EE7234", "#FF8A4C", "#47A3DC", "#2D5BB7"];
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let pieces: Piece[] = [];
let raf = 0;
let last = 0;

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "70" });
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function teardown() {
  window.removeEventListener("resize", resize);
  canvas?.remove();
  canvas = null;
  ctx = null;
}

function frame(now: number) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter((p) => p.life > 0);
  for (const p of pieces) {
    p.vy += 900 * dt; // gravity
    p.vx *= 0.985; // air drag
    p.vy *= 0.985;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
    p.life -= dt / 1.8;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    // squash on one axis to fake a 3D tumble
    ctx.scale(1, Math.cos(p.rot * 1.7));
    ctx.fillStyle = p.color;
    if (p.shape === 0) {
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size * 0.9, p.size * 0.7);
      ctx.lineTo(-p.size * 0.9, p.size * 0.7);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(-p.size, -p.size * 0.45, p.size * 2, p.size * 0.9);
    }
    ctx.restore();
  }
  if (pieces.length) raf = requestAnimationFrame(frame);
  else {
    raf = 0;
    teardown();
  }
}

/** Fire a burst of `count` pieces from viewport point (x, y). */
export function burst(x: number, y: number, count = 40) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ensureCanvas();
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5; // mostly upwards, fanned out
    const speed = 280 + Math.random() * 520;
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 14,
      size: 3 + Math.random() * 4,
      shape: Math.random() < 0.5 ? 0 : 1,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      life: 0.75 + Math.random() * 0.25,
    });
  }
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
}

/** Bursts from several points around an element (its corners and centre edges). */
export function burstAround(el: Element, perPoint = 26) {
  const r = el.getBoundingClientRect();
  const points: [number, number][] = [
    [r.left, r.top],
    [r.right, r.top],
    [r.left + r.width / 2, r.top],
    [r.left, r.top + r.height * 0.6],
    [r.right, r.top + r.height * 0.6],
  ];
  points.forEach(([x, y], i) => window.setTimeout(() => burst(x, Math.max(40, Math.min(window.innerHeight - 40, y)), perPoint), i * 90));
}
