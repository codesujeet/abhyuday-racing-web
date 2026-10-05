"use client";

import { useRef, useState } from "react";
import type { Season } from "@/content/seasons";

export function SeasonTabs({ seasons, initial }: { seasons: Season[]; initial: string }) {
  const [index, setIndex] = useState(Math.max(0, seasons.findIndex((s) => s.year === initial)));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const season = seasons[index];

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
      <div className="season-panel" role="tabpanel" id="season-panel" aria-labelledby={`tab-${season.year}`} tabIndex={0}>
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
