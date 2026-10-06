"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

const D = "M0 30 C 200 30, 260 8, 480 10 S 820 32, 1000 22 S 1150 8, 1200 10";
const VB_W = 1200;
const VB_H = 40;
const WHEEL_R = 6.5; // in buggy SVG units (buggy is drawn 60 units wide)

/** Small side-view buggy in A10's livery. Wheels are separate groups so they can spin. */
function Buggy({ wheelRefs }: { wheelRefs: RefObject<(SVGGElement | null)[]> }) {
  const wheel = (cx: number, i: number) => (
    <g transform={`translate(${cx} 26)`}>
      <g ref={(el) => void (wheelRefs.current[i] = el)}>
        <circle r={WHEEL_R} fill="#15171c" stroke="#3a3f4d" strokeWidth="2" />
        <circle r="2.6" fill="#c9ced8" />
        <path d="M0 -6 V6 M-6 0 H6" stroke="#6b7183" strokeWidth="1" />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 60 34" width="60" height="34" aria-hidden="true">
      {/* roll cage */}
      <path d="M17 16 L22 5 L38 5 L45 15 M22 5 L28 15" fill="none" stroke="#e6e8ee" strokeWidth="1.7" strokeLinejoin="round" />
      {/* beacon */}
      <rect x="35" y="1.5" width="3" height="3.5" rx="0.8" fill="#47A3DC" />
      {/* driver helmet */}
      <circle cx="31" cy="10.5" r="3.2" fill="#47A3DC" />
      {/* body + livery stripe */}
      <path d="M5 21 L10 14.5 L46 14.5 L55 19 L55 23.5 L5 23.5 Z" fill="#EE7234" />
      <path d="M14 18 L41 18 L37 21.5 L14 21.5 Z" fill="#2D5BB7" />
      <path d="M43 16.5 L50 19 L46 21.5 Z" fill="#B88BE0" />
      {wheel(15, 0)}
      {wheel(46, 1)}
    </svg>
  );
}

/**
 * The orange trajectory line under each section title. It draws itself when it scrolls into view,
 * and a little buggy drives along it, tilting with the curve and spinning its wheels, then parks at the end.
 */
export function TrackLine() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const buggy = useRef<HTMLDivElement>(null);
  const wheels = useRef<(SVGGElement | null)[]>([]);
  const inView = useInView(wrap, { once: true, amount: 0.6 });

  useEffect(() => {
    const p = path.current;
    const svg = p?.ownerSVGElement;
    const car = buggy.current;
    if (!inView || !p || !svg || !car) return;

    const total = p.getTotalLength();
    const place = (t: number) => {
      p.setAttribute("stroke-dashoffset", String(1 - t));
      const sx = svg.clientWidth / VB_W;
      const sy = svg.clientHeight / VB_H;
      const len = t * total;
      const a = p.getPointAtLength(len);
      const b = p.getPointAtLength(Math.min(total, len + 2));
      const c = len + 2 > total ? p.getPointAtLength(len - 2) : a;
      const [x0, y0, x1, y1] = len + 2 > total ? [c.x, c.y, a.x, a.y] : [a.x, a.y, b.x, b.y];
      const angle = (Math.atan2((y1 - y0) * sy, (x1 - x0) * sx) * 180) / Math.PI;
      const w = car.offsetWidth;
      const h = car.offsetHeight;
      // Starts with its tail at the line start and parks with its nose at the line end.
      car.style.transform = `translate(${a.x * sx - w * t}px, ${a.y * sy - h + 3}px) rotate(${angle}deg)`;
      // spin the wheels by the distance travelled on screen
      const travelled = len * sx;
      const scale = w / 60;
      const deg = (travelled / (WHEEL_R * scale)) * (180 / Math.PI);
      wheels.current.forEach((wh) => wh?.setAttribute("transform", `rotate(${deg})`));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(1);
      car.style.opacity = "1";
      return;
    }
    place(0);
    car.style.opacity = "1";
    const controls = animate(0, 1, { duration: 2.2, delay: 0.2, ease: [0.45, 0, 0.25, 1], onUpdate: place });
    const onResize = () => place(1);
    window.addEventListener("resize", onResize);
    return () => {
      controls.stop();
      window.removeEventListener("resize", onResize);
    };
  }, [inView]);

  return (
    <div ref={wrap} className="track" aria-hidden="true">
      <svg className="trajectory" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
        <path
          ref={path}
          d={D}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1}
        />
      </svg>
      <div ref={buggy} className="track-buggy">
        <Buggy wheelRefs={wheels} />
      </div>
    </div>
  );
}
