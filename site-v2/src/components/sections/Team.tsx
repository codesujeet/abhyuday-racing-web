"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type PointerEvent } from "react";
import { departments, faculty, groupPhoto, leads, mentors, squads, type Person } from "@/content/team";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Social, Trophy } from "@/components/ui/Icons";
import { hasPhoto } from "@/lib/photos";

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

type Crew = Person & { key: string; lead: boolean };

export function Team() {
  const [season, setSeason] = useState(squads[0]?.season ?? "");
  const [filter, setFilter] = useState("All");

  const crew: Crew[] = useMemo(() => {
    const squad = squads.find((s) => s.season === season);
    return [
      ...leads.map((p, i) => ({ ...p, key: `lead-${i}`, lead: true })),
      ...(squad?.members ?? []).map((p, i) => ({ ...p, key: `m-${season}-${i}`, lead: false })),
    ];
  }, [season]);

  // Tabs: only departments that actually have someone in them.
  const tabs = useMemo(() => {
    const present = new Set(crew.map((p) => p.department).filter(Boolean));
    return ["All", ...["Leadership", ...departments].filter((d) => present.has(d))];
  }, [crew]);

  const shown = filter === "All" ? crew : crew.filter((p) => p.department === filter);
  const shownLeads = shown.filter((p) => p.lead);
  const shownSquad = shown.filter((p) => !p.lead);

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
          lede="Faculty who back us, mentors who push us, and the students who design, wire, code and weld every car."
        />

        <Reveal>
          <BBox className="frame team-banner tread-mask" label={groupPhoto.label}>
            <Picture name={groupPhoto.photo} alt={groupPhoto.alt} sizes="(min-width: 1320px) 1320px, 100vw" />
          </BBox>
        </Reveal>

        {/* Faculty & mentors */}
        <div className="team-sub">
          <h3>Faculty &amp; mentors</h3>
          <p className="hud">Guidance</p>
        </div>
        <RevealGroup className="faculty-grid">
          {[...faculty, ...mentors].map((p) => (
            <RevealItem key={p.name} className="person">
              <Avatar p={p} />
              <div>
                <p className="person-name">{p.name}</p>
                <p className="person-role">{p.role}</p>
              </div>
              {p.honour && (
                <span className="chip chip-orange honour">
                  <Trophy size={14} /> {p.honour}
                </span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Leads and squad */}
        <div className="team-sub">
          <h3>Leads &amp; squad</h3>
          {squads.length > 1 && (
            <label className="hud" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              Season
              <select className="select" value={season} onChange={(e) => (setSeason(e.target.value), setFilter("All"))}>
                {squads.map((s) => (
                  <option key={s.season}>{s.season}</option>
                ))}
              </select>
            </label>
          )}
          {squads.length === 1 && <p className="hud">{season}</p>}
        </div>

        <div className="team-controls">
          <div className="tabs" role="group" aria-label="Filter by sub-team">
            {tabs.map((t) => (
              <button key={t} type="button" className="tab" aria-pressed={filter === t} onClick={() => setFilter(t)}>
                {filter === t && <motion.span className="tab-bg" layoutId="team-tab" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <span>{t}</span>
              </button>
            ))}
          </div>
        </div>

        {shownLeads.length > 0 && (
          <>
            <p className="hud crew-label">Leads</p>
            <motion.ul layout className="crew-grid" style={{ listStyle: "none", margin: 0, padding: 0 }} aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {shownLeads.map((p) => (
                  <motion.li
                    layout
                    key={p.key}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`crew-card ${p.lead ? "is-lead" : "is-member"}`} onPointerMove={tilt} onPointerLeave={untilt}>
                    <Avatar p={p} />
                    <div>
                      <p className="person-name">{p.name}</p>
                      <p className="person-role">{p.lead ? p.role : season}</p>
                    </div>
                    {(p.department || p.linkedin) && <div className="reveal">
                      {p.department && <span className="chip">{p.department}</span>}
                      {p.linkedin && (
                        <a className="li" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
                          <Social name="LinkedIn" size={16} /> LinkedIn
                        </a>
                      )}
                    </div>}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
        {shownSquad.length > 0 && (
          <>
            <p className="hud crew-label">{`Squad · ${season}`}</p>
            <motion.ul layout className="crew-grid" style={{ listStyle: "none", margin: 0, padding: 0 }} aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {shownSquad.map((p) => (
                  <motion.li
                    layout
                    key={p.key}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`crew-card ${p.lead ? "is-lead" : "is-member"}`} onPointerMove={tilt} onPointerLeave={untilt}>
                    <Avatar p={p} />
                    <div>
                      <p className="person-name">{p.name}</p>
                      <p className="person-role">{p.lead ? p.role : season}</p>
                    </div>
                    {(p.department || p.linkedin) && <div className="reveal">
                      {p.department && <span className="chip">{p.department}</span>}
                      {p.linkedin && (
                        <a className="li" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
                          <Social name="LinkedIn" size={16} /> LinkedIn
                        </a>
                      )}
                    </div>}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </div>
    </section>
  );
}
