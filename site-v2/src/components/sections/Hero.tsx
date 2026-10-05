"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { photo } from "@/lib/photos";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";
import { useSiteReady } from "@/lib/ready";
import { Picture } from "@/components/ui/Picture";
import { PointCloud } from "@/components/ui/PointCloud";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const HERO = "hero-a10-aeb-run";

export function Hero() {
  // Start fetching the hero photo from the <head>, before any script runs.
  const meta = photo(HERO);
  if (meta && !site.heroVideo) {
    preload(`/photos/${HERO}-${meta.widths[1] ?? meta.widths[0]}.avif`, {
      as: "image",
      type: "image/avif",
      imageSrcSet: meta.widths.map((w) => `/photos/${HERO}-${w}.avif ${w}w`).join(", "),
      imageSizes: "100vw",
      fetchPriority: "high",
    });
  }
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  // Parallax: the photo drifts slower than the page, the copy fades as you leave.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(media.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -18,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  // Word index across all lines, so each word rises in turn and the second word is orange.
  let n = 0;
  // Wait for the preloader on the first visit of the session.
  const go = useSiteReady();
  const delay = 0.1;

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div ref={media} className="hero-media">
        {site.heroVideo ? (
          <video src={site.heroVideo} autoPlay muted loop playsInline poster="/photos/hero-a10-aeb-run-1920.webp" aria-hidden="true" />
        ) : (
          <Picture name={HERO} alt="A10, the team's autonomous buggy, on a test run" priority sizes="100vw" />
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <PointCloud className="hero-cloud" />

      <div ref={content} className="wrap hero-content">
        <h1 id="hero-title">
          <motion.span className="hero-team" initial={{ opacity: 0, x: -24 }} animate={go ? { opacity: 1, x: 0 } : undefined} transition={{ duration: 0.8, delay, ease }}>
            {site.name}
          </motion.span>
          <span className="hero-tag">
            {hero.headline.map((line) => (
              <span className="hero-line" key={line}>
                {line.split(" ").map((w) => {
                  const i = n++;
                  return (
                    <span className={`w ${i === 1 ? "is-accent" : ""}`} key={w}>
                      <motion.span initial={{ y: "105%" }} animate={go ? { y: 0 } : undefined} transition={{ duration: 1.1, delay: delay + 0.12 + i * 0.12, ease }}>
                        {w}
                      </motion.span>{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>
        <motion.p className="hero-lede" initial={{ opacity: 0, y: 16 }} animate={go ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, delay: delay + 0.55, ease }}>
          {hero.lede}
        </motion.p>
        <motion.div className="btn-row" initial={{ opacity: 0, y: 16 }} animate={go ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, delay: delay + 0.7, ease }}>
          {hero.ctas.map((c, i) => (
            <Magnetic key={c.href}>
              <a
                href={c.href}
                className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(c.href.slice(1));
                }}
              >
                {c.label}
                <ArrowRight size={18} />
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
