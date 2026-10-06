"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type PointerEvent } from "react";
import { groupPhoto, leads, squads, type Person } from "@/content/team";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight, Social } from "@/components/ui/Icons";
import { ScrollTrigger } from "@/lib/gsap";
import { hasPhoto } from "@/lib/photos";

const ease = [0.16, 1, 0.3, 1] as const;

const initials = (name: string) =>
  name.startsWith("[")
    ? "?"
    : name
        .replace(/^Dr\.\s*/, "")
        .split(/\s+/)
        .map((p) => p[0])
        .slice(0, 2)
        .join("");

function Avatar({ p }: { p: Person }) {
  return (
    <span className="avatar" aria-hidden="true">
      {p.photo && hasPhoto(p.photo) ? <Picture name={p.photo} alt="" sizes="64px" /> : initials(p.name)}
    </span>
  );
}

/** Slight 3D tilt towards the pointer (mouse only). */
function tilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateZ(0)`;
}
function untilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

function Card({ p, lead }: { p: Person; lead: boolean }) {
  return (
    <div className={`crew-card ${lead ? "is-lead" : "is-member"}`} onPointerMove={tilt} onPointerLeave={untilt}>
      <Avatar p={p} />
      <div>
        <p className="person-name">{p.name}</p>
        <p className="person-role">{p.role}</p>
      </div>
      {p.linkedin && (
        <a className="li" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
          <Social name="LinkedIn" size={16} /> LinkedIn
        </a>
      )}
    </div>
  );
}

export function Team() {
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState(squads[0]?.season ?? "");
  const squad = squads.find((s) => s.season === season);

  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className="wrap">
        <SectionHead
          index="02"
          kicker="Team"
          id="team-title"
          title={
            <>
              The <em>crew</em>
            </>
          }
          lede="The students who design, wire, code, weld and drive every car."
        />

        <Reveal>
          <BBox className="frame team-banner tread-mask" label={groupPhoto.label}>
            <Picture name={groupPhoto.photo} alt={groupPhoto.alt} sizes="(min-width: 1320px) 1320px, 100vw" />
          </BBox>
        </Reveal>

        <div className="team-sub">
          <h3>Team leads</h3>
        </div>
        <RevealGroup as="ul" className="crew-grid lead-grid" stagger={0.06}>
          {leads.map((p) => (
            <RevealItem as="li" key={p.role}>
              <Card p={p} lead />
            </RevealItem>
          ))}
        </RevealGroup>

        {squad && (
          <>
            <div className="team-more">
              <button type="button" className="btn btn-ghost" aria-expanded={open} aria-controls="full-team" onClick={() => setOpen(!open)}>
                {open ? "Show less" : "Explore the full team"}
                <ArrowRight size={18} className={open ? "is-up" : "is-down"} />
              </button>
            </div>

            <AnimatePresence initial={false} onExitComplete={() => ScrollTrigger.refresh()}>
              {open && (
                <motion.div
                  id="full-team"
                  key="full-team"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  onAnimationComplete={() => ScrollTrigger.refresh()}
                  style={{ overflow: "hidden" }}
                >
                  <div className="team-sub" style={{ marginTop: 32 }}>
                    <h3>Full team</h3>
                    {squads.length > 1 ? (
                      <label className="hud" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        Season
                        <select className="select" value={season} onChange={(e) => setSeason(e.target.value)}>
                          {squads.map((s) => (
                            <option key={s.season}>{s.season}</option>
                          ))}
                        </select>
                      </label>
                    ) : (
                      <p className="hud">{`${season} · ${squad.members.length} members`}</p>
                    )}
                  </div>
                  <ul className="crew-grid">
                    {squad.members.map((p, i) => (
                      <motion.li
                        key={`${season}-${p.name}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: Math.min(i * 0.025, 0.5), ease }}
                      >
                        <Card p={{ ...p, role: p.role === "Team member" ? season : p.role }} lead={false} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
