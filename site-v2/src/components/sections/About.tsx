import { about, autonomySteps, competitions, programmes, subteams } from "@/content/home";
import { stats } from "@/content/stats";
import { Counter } from "@/components/ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Icons";

/** The rest of the Home section: who we are, what we do, where we compete, counters, sub-teams. */
export function About() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead
          index="01"
          kicker="Home · Who we are"
          id="about-title"
          title={
            <>
              Built in Pune.
              <br />
              <em>Raced</em> on its own.
            </>
          }
        />

        <div className="about-grid">
          <Reveal>
            <p className="about-statement">
              Students from every branch. One <em>autonomous</em> off-road race car.
            </p>
          </Reveal>
          <Reveal className="about-body" delay={0.1}>
            {about.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </Reveal>
        </div>

        {/* What we do */}
        <RevealGroup className="programmes">
          {programmes.map((p) => (
            <RevealItem key={p.id} as="article" className={`prog prog-${p.id}`}>
              <span className="prog-letter" aria-hidden="true">
                {p.name.charAt(0)}
              </span>
              <h3>
                {p.name}
                <small>
                  {p.full} · since {p.since}
                </small>
              </h3>
              <p>{p.what}</p>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* How the autonomy works */}
        <div className="pipeline">
          <Reveal className="pipeline-head">
            <h3>
              How A10
              <br />
              drives itself
            </h3>
            <p className="hud">Perception → Planning → Control</p>
          </Reveal>
          <RevealGroup as="ol" className="pipeline-steps" stagger={0.1}>
            {autonomySteps.map((s, i) => (
              <RevealItem as="li" key={s.title}>
                <span className="num">{`0${i + 1} //`}</span>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Where we compete */}
        <div className="compete">
          <Reveal>
            <h3>{competitions.title}</h3>
            <p className="muted" style={{ marginTop: 16 }}>
              {competitions.body}
            </p>
          </Reveal>
          <RevealGroup className="compete-list">
            {competitions.events.map((e) => (
              <RevealItem key={e.name} className="compete-item">
                <strong>{e.name}</strong>
                <span>{e.detail}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Counters */}
      <div className="stats">
        <div className="wrap">
          <dl className="stats-grid">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt className="stat-label">{s.label}</dt>
                <dd className="stat-num">
                  <span className="hud" aria-hidden="true">
                    {`// ${s.hud}`}
                  </span>
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Sub-teams */}
      <div className="wrap subteams">
        <Reveal className="pipeline-head">
          <h3 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Five sub-teams.
            <br />
            One car.
          </h3>
          <p className="hud">Departments</p>
        </Reveal>
        <RevealGroup className="subteam-grid">
          {subteams.map((t, i) => (
            <RevealItem key={t.name} as="article" className="subteam">
              <span className="subteam-idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="hud">{t.role}</p>
              <h4>{t.name}</h4>
              <p>{t.body}</p>
            </RevealItem>
          ))}
          <RevealItem as="article" className="subteam subteam-cta">
            <div>
              <p className="hud" style={{ color: "var(--bg)" }}>
                Recruitment
              </p>
              <h4>Join the crew</h4>
              <p>No experience needed — we train you from zero. Students from every branch are welcome.</p>
            </div>
            <a href="#support">
              Get in touch <ArrowRight size={18} />
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
