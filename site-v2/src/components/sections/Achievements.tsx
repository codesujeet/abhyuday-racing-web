"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { achievements, type Result } from "@/content/achievements";
import { gsap } from "@/lib/gsap";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Trophy } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

function Badge({ r }: { r: Result }) {
  if (r.kind === "win")
    return (
      <span className="badge-win">
        <Trophy size={16} /> {r.result}
      </span>
    );
  if (r.kind === "place") return <span className="badge-place">{r.result}</span>;
  return <span className="badge-plain">{r.result}</span>;
}

export function Achievements() {
  const tl = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  // The timeline line draws itself as you scroll.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl.current, start: "top 65%", end: "bottom 65%", scrub: 0.6 } },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="wrap">
        <SectionHead
          index="03"
          kicker="Achievements"
          id="achievements-title"
          title={
            <>
              On the <em>podium</em>
            </>
          }
          lede="From our first car in 2024 to three awards at aBAJA SAEINDIA 2026 — every result, newest first."
        />

        <div ref={tl} className="timeline">
          <div className="tl-rail" aria-hidden="true" />
          <div ref={fill} className="tl-fill" aria-hidden="true" />

          {achievements.map((season, si) => {
            const fromSide = si % 2 === 0 ? "right" : "left";
            return (
              <article key={season.year} className="tl-year" aria-labelledby={`year-${season.year}`}>
                <motion.span
                  className="tl-dot"
                  aria-hidden="true"
                  initial={{ scale: 0, rotate: 45 }}
                  whileInView={{ scale: 1, rotate: 45 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                />
                <div className="tl-label">
                  <motion.h3
                    id={`year-${season.year}`}
                    className="tl-year-num"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease }}
                  >
                    {season.year}
                  </motion.h3>
                  <p className="tl-summary">{season.summary}</p>
                </div>

                <Reveal className="tl-card" from={fromSide}>
                  {season.competitions.map((c) => {
                    const hero = c.results.some((r) => r.headline);
                    return (
                      <div key={c.name} className={`comp ${hero ? "comp-hero" : ""}`}>
                        <div className="comp-head">
                          <h4>{c.name}</h4>
                          <p className="hud">
                            {c.where}
                            {c.when ? ` · ${c.when}` : ""}
                          </p>
                        </div>
                        <ul>
                          {c.results.map((r) => (
                            <li key={r.title} className={r.headline ? "headline" : undefined}>
                              <span className="t">{r.title}</span>
                              <Badge r={r} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </Reveal>

                {season.photo && (
                  <Reveal className="tl-media" from={fromSide === "right" ? "left" : "right"} delay={0.1}>
                    <BBox className="frame" label={`${season.year} · Awards`}>
                      <Picture name={season.photo} alt={season.photoAlt ?? ""} sizes="(min-width: 1024px) 600px, 100vw" />
                    </BBox>
                  </Reveal>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
