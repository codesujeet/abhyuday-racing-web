"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cars, featuredCar } from "@/content/cars";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/** Featured car: one photo angle per step, each with one key fact. Sticky on tablet/desktop, swipeable on phones. */
function Featured() {
  const angles = featuredCar.angles ?? [];
  const [idx, setIdx] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setIdx(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-50% 0px -49% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!angles.length) return null;
  const a = angles[idx];

  return (
    <div className="featured">
      <div className="featured-scroller" style={{ ["--angles" as string]: angles.length }}>
        <div className="featured-steps" aria-hidden="true">
          {angles.map((_, i) => (
            <div key={i} data-i={i} ref={(el) => void (steps.current[i] = el)} />
          ))}
        </div>
        <div className="featured-stage">
          <div className="featured-frames">
            {angles.map((an, i) => (
              <div key={an.photo + i} className={`featured-frame ${i === idx ? "is-on" : ""}`} aria-hidden={i !== idx}>
                <Picture name={an.photo} alt={an.alt} sizes="100vw" />
              </div>
            ))}
            <div className="featured-hudtop">
              <span className="chip chip-orange">{`Featured · ${featuredCar.year}`}</span>
              <span className="hud">{`ANGLE ${String(idx + 1).padStart(2, "0")} / ${String(angles.length).padStart(2, "0")}`}</span>
            </div>
          </div>
          <div className="featured-info">
            <div>
              <p className="featured-name">{featuredCar.name}</p>
              <div className="featured-pips" style={{ marginTop: 14 }}>
                {angles.map((an, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show angle ${i + 1}: ${an.label}`}
                    aria-current={i === idx}
                    onClick={() => {
                      const el = steps.current[i];
                      if (el && window.matchMedia("(min-width: 768px)").matches) {
                        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
                        window.scrollTo({ top, behavior: "smooth" });
                      } else setIdx(i);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="featured-stat" aria-live="polite">
              <motion.span key={`v${idx}`} className="val" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                {a.stat}
              </motion.span>
              <motion.span key={`l${idx}`} className="lab hud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
                {a.label}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              <p>{c.tagline}</p>
              {c.keySpecs.length > 0 && (
                <motion.dl
                  className="car-specs"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                >
                  {c.keySpecs.map((s) => (
                    <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </motion.div>
                  ))}
                </motion.dl>
              )}
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
        <Featured />
      </div>
      <Garage />
    </section>
  );
}
