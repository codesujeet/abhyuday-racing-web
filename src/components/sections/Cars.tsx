"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cars } from "@/content/cars";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/** All cars, newest first: pinned horizontal scroll on desktop, swipeable carousel elsewhere. */
function Garage() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      setPinned(true);
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      // wait a frame so the pinned layout (wider panels) is applied before measuring
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(t, { clearProps: "transform" });
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, []);

  // Panels get wider when pinned: re-measure once that layout is on screen.
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pinned]);

  const onScroll = () => {
    const t = track.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 });
  };
  const nudge = (dir: number) => {
    const t = track.current;
    if (!t) return;
    const panel = t.querySelector<HTMLElement>(".car-panel");
    t.scrollBy({ left: dir * ((panel?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <div className="garage">
      <div className="wrap garage-head" style={{ display: pinned ? "none" : "flex", justifyContent: "space-between", alignItems: "end", gap: 16, marginBottom: 24 }}>
        <div>
          <p className="hud hud-orange">The garage</p>
          <h3 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", marginTop: 8 }}>
            Every car we&apos;ve built
          </h3>
        </div>
        <div className="garage-nav">
          <button type="button" className="icon-btn" onClick={() => nudge(-1)} disabled={edge.start} aria-label="Previous car">
            <ArrowLeft />
          </button>
          <button type="button" className="icon-btn" onClick={() => nudge(1)} disabled={edge.end} aria-label="Next car">
            <ArrowRight />
          </button>
        </div>
      </div>

      <div ref={wrap} className={`garage-pin ${pinned ? "is-pinned" : ""}`}>
        <div ref={track} className="garage-track" onScroll={pinned ? undefined : onScroll} tabIndex={pinned ? -1 : 0} aria-label="Cars, newest first" role="region">
          <div className="garage-intro">
            <p className="hud hud-orange">The garage · scroll →</p>
            <h3 className="display" style={{ fontSize: "clamp(3rem, 5vw, 4.6rem)" }}>
              Every car
              <br />
              we&apos;ve built
            </h3>
            <p className="muted">Newest first. Open any car for its full story, spec sheet and photos.</p>
          </div>

          {cars.map((c) => (
            <article key={c.slug} className={`car-panel ${c.built ? "" : "is-next"}`} aria-labelledby={`car-${c.slug}`}>
              <BBox className="frame car-photo" label={`${c.category} · ${c.year}`}>
                <Picture name={c.photo} alt={c.photoAlt} sizes="(min-width: 1024px) 640px, 86vw" />
              </BBox>
              <div className="car-top">
                <span className="car-year">{c.year}</span>
                <span className={`chip ${c.current ? "chip-orange" : ""}`}>{c.current ? "Current car" : c.built ? c.category : "Coming soon"}</span>
              </div>
              <h3 id={`car-${c.slug}`}>{c.name}</h3>
              <p className="car-name">{c.carName}</p>
              <motion.dl
                className="car-specs car-specs-one"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease }}
              >
                <div>
                  <dt>Class</dt>
                  <dd>{c.cls}</dd>
                </div>
              </motion.dl>
              {c.built ? (
                <Link className="textlink" href={`/cars/${c.slug}/`}>
                  Full story <ArrowRight size={18} />
                </Link>
              ) : (
                <span className="hud">Reveal date to be announced</span>
              )}
            </article>
          ))}
          <div aria-hidden="true" style={{ flex: "none", width: 1 }} />
        </div>
      </div>
    </div>
  );
}

export function Cars() {
  return (
    <section id="cars" className="section" aria-labelledby="cars-title">
      <div className="wrap">
        <SectionHead
          index="04"
          kicker="Cars"
          id="cars-title"
          title={
            <>
              The <em>machines</em>
            </>
          }
          lede="Designed in CAD, proven in simulation, built and wired by hand in our workshop."
        />
      </div>
      <Garage />
    </section>
  );
}
