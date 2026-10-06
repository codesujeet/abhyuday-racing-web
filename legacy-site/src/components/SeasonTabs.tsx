"use client";

import { animate } from "motion/mini";
import { useEffect, useRef, useState } from "react";
import type { Season } from "@/content/seasons";

export function SeasonTabs({ seasons, initial }: { seasons: Season[]; initial: string }) {
  const [index, setIndex] = useState(Math.max(0, seasons.findIndex((s) => s.year === initial)));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicator = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const season = seasons[index];

  // Slide the orange indicator under the chosen year and fade the panel in (motion's small WAAPI helper).
  useEffect(() => {
    const tab = tabs.current[index];
    const bar = indicator.current;
    if (!tab || !bar) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || firstRender.current;
    const place = { x: tab.offsetLeft, y: tab.offsetTop + tab.offsetHeight + 4, width: tab.offsetWidth };
    animate(bar, { transform: `translate(${place.x}px, ${place.y}px)`, width: `${place.width}px` }, { duration: still ? 0 : 0.35, ease: [0.2, 0.8, 0.2, 1] });
    if (!still && panel.current) {
      animate(panel.current, { opacity: [0, 1], transform: ["translateY(8px)", "none"] }, { duration: 0.28, ease: "easeOut" });
    }
    firstRender.current = false;
  }, [index]);

  // Keep the indicator under the chosen tab when the tabs reflow (rotation, window resize).
  useEffect(() => {
    const onResize = () => {
      const tab = tabs.current[index];
      const bar = indicator.current;
      if (!tab || !bar) return;
      bar.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop + tab.offsetHeight + 4}px)`;
      bar.style.width = `${tab.offsetWidth}px`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + seasons.length) % seasons.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Choose a season">
        <span className="tab-indicator" ref={indicator} aria-hidden="true" />
        {seasons.map((s, i) => (
          <button
            key={s.year}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            className="tab"
            type="button"
            role="tab"
            id={`tab-${s.year}`}
            aria-selected={i === index}
            aria-controls="season-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {s.year}
          </button>
        ))}
      </div>
      <div className="season-panel" ref={panel} role="tabpanel" id="season-panel" aria-labelledby={`tab-${season.year}`} tabIndex={0}>
        <div className="season-intro">
          <h3>{season.title}</h3>
          <p>{season.intro}</p>
        </div>
        <ol className="phases" style={{ "--n": season.phases.length } as React.CSSProperties}>
          {season.phases.map((phase, n) => (
            <li className="phase" key={phase.name}>
              <h4>
                Round {n + 1}: {phase.name}
              </h4>
              <p className="what">{phase.what}</p>
              <ul className="legs">
                {phase.legs.map((leg) => (
                  <li className={`leg${leg.ours ? " ours" : ""}`} key={leg.category + leg.when}>
                    <span className="cat">{leg.category}</span>
                    <span className="on">{leg.when}</span>
                    <span className="where">{leg.where}</span>
                    {leg.note && <span className="note">{leg.note}</span>}
                    {leg.ours && <span className="tag">We entered</span>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="ours-box">
          <h4>Our {season.year} season</h4>
          <ul>
            {season.ours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <p className="sources">
          Sources:{" "}
          {season.sources.map((src, i) => (
            <span key={src.href}>
              <a href={src.href} rel="noopener" target="_blank">
                {src.label}
              </a>
              {i < season.sources.length - 1 ? "; " : ""}
            </span>
          ))}
          . Our results are from team records.
        </p>
      </div>
    </>
  );
}
