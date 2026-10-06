"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { inKind, supportCopy, tiers, whySponsor } from "@/content/sponsorship";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Magnetic } from "@/components/ui/Magnetic";
import { Check, Cpu, Download, Eye, Mail, Radar, Users } from "@/components/ui/Icons";

const whyIcons = [Radar, Eye, Users, Cpu];
const ease = [0.16, 1, 0.3, 1] as const;

// Optional form service (Formspree / Web3Forms). Without it the form opens the visitor's email app.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY ?? "";

function ContactForm() {
  const [status, setStatus] = useState<{ kind: "" | "ok" | "err"; msg: string }>({ kind: "", msg: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company_website) return; // spam trap

    if (!ENDPOINT) {
      const subject = `Sponsorship enquiry — ${data.organisation || data.name}`;
      const body = [
        `Name: ${data.name}`,
        `Organisation: ${data.organisation}`,
        `Email: ${data.email}`,
        `Interested in: ${data.interest}`,
        "",
        data.message,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "ok", msg: "Your email app should open with the message ready to send." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}), subject: "Sponsorship enquiry from the website" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "ok", msg: "Thank you — your message is on its way. We will reply soon." });
    } catch {
      setStatus({ kind: "err", msg: `Sorry, that did not go through. Please email us at ${site.email}.` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <div className="row2">
        <div className="field">
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="f-org">Organisation</label>
          <input id="f-org" name="organisation" autoComplete="organization" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="f-interest">Interested in</label>
          <select id="f-interest" name="interest" defaultValue="Sponsorship">
            <option>Sponsorship</option>
            <option>In-kind support</option>
            <option>Technical partnership</option>
            <option>Media / press</option>
            <option>Joining the team</option>
            <option>Something else</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-msg">Message</label>
        <textarea id="f-msg" name="message" required />
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1 }} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        <Magnetic>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
            <Mail size={18} />
          </button>
        </Magnetic>
      </div>
      <p className={`form-status ${status.kind}`} role="status" aria-live="polite">
        {status.msg}
      </p>
    </form>
  );
}

export function Support() {
  return (
    <section id="support" className="section" aria-labelledby="support-title">
      <div className="wrap">
        <SectionHead
          index="07"
          kicker="Support us"
          id="support-title"
          title={
            <>
              Fuel the <em>next lap</em>
            </>
          }
          lede={supportCopy.lede}
        />

        <RevealGroup className="why-grid">
          {whySponsor.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <RevealItem key={w.title} as="article" className="why">
                <Icon />
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Tiers */}
        <div className="tiers-head">
          <Reveal className="team-sub">
            <h3>Sponsorship tiers</h3>
            <p className="hud">Partnership options</p>
          </Reveal>
          {tiers.some((t) => t.todo) && (
            <p className="todo-note" role="note">
              <strong className="chip chip-todo">Draft</strong>
              <span>Tier names and perks are being finalised. Write to us for the current sponsorship deck.</span>
            </p>
          )}
          <div className="tier-grid">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className={`tier ${t.highlight ? "is-highlight" : ""}`} style={{ height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                    <p className="hud hud-orange">{`Tier 0${i + 1}`}</p>
                    {t.todo && <span className="chip chip-todo">TODO</span>}
                  </div>
                  <h3>{t.name}</h3>
                  <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}>
                    {t.perks.map((p) => (
                      <motion.li key={p} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}>
                        <motion.span variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 18 } } }} style={{ display: "inline-flex" }}>
                          <Check size={18} />
                        </motion.span>
                        <span>{p}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* In-kind */}
        <div className="inkind">
          <Reveal>
            <h3>In-kind support</h3>
            <p className="muted" style={{ marginTop: 16 }}>
              Parts, tools, software and services help as much as funding. Our current partners already support us this way.
            </p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Magnetic>
                <a className="btn btn-ghost" href={site.brochureUrl} download>
                  Sponsorship brochure <Download size={18} />
                </a>
              </Magnetic>
            </div>
          </Reveal>
          <RevealGroup as="ul" className="inkind-list">
            {inKind.map((k, i) => (
              <RevealItem as="li" key={k.title}>
                <span className="hud">{`0${i + 1}`}</span>
                <div>
                  <strong>{k.title}</strong>
                  <span>{k.body}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Contact */}
        <Reveal className="contact">
          <div className="contact-info">
            <h3>{supportCopy.formTitle}</h3>
            <p className="muted">{supportCopy.formNote}</p>
            <a className="mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
            <p className="hud">{site.address || site.college}</p>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
