import Link from "next/link";
import { FilmPlayer } from "@/components/FilmPlayer";
import { GarageCarousel } from "@/components/GarageCarousel";
import { ModelViewer3D } from "@/components/ModelViewer3D";
import { Picture, hasPhoto } from "@/components/Picture";
import { SeasonTabs } from "@/components/SeasonTabs";
import { Slot } from "@/components/Slot";
import { Chevrons } from "@/components/Chevrons";
import { autonomySteps, film, garage, news, programmes, proof, season2026, upcoming } from "@/content/home";
import { partners } from "@/content/partners";
import { results } from "@/content/results";
import { defaultSeason, seasons } from "@/content/seasons";
import { site } from "@/content/site";

function resultRows() {
  const years = [...new Set(results.map((r) => r.year))];
  return years.flatMap((year) => {
    const rows = results.filter((r) => r.year === year);
    return rows.map((r, i) => (
      <tr key={`${year}-${r.category}`}>
        {i === 0 && (
          <td className="year" rowSpan={rows.length}>
            {year}
          </td>
        )}
        <td className="event">{r.event}</td>
        <td>{r.category}</td>
        <td>
          <span className={`chip ${r.kind}`}>{r.result}</span>
        </td>
      </tr>
    ));
  });
}

export default function Home() {
  const applyHref = site.applyUrl || `mailto:${site.email}?subject=Joining%20Team%20Abhyuday%20Racing`;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Picture
          className="hero-photo"
          name="hero-a10-aeb-run"
          alt="A10, the team's autonomous buggy, driving itself during the emergency braking test at aBAJA SAEINDIA 2026"
          priority
        />
        <div className="plate">
          <div className="plate-body">
            <h1 className="display" id="hero-title">
              Arise.
              <br />
              Conquer.
              <br />
              Repeat.
            </h1>
            <p>
              We&apos;re the student motorsport team of {site.college}. We design, build and race electric and autonomous
              off-road cars for BAJA SAEINDIA.
            </p>
          </div>
          <Chevrons />
        </div>
      </section>

      <section className="proof" aria-label="2026 results">
        <div className="wrap">
          <p className="proof-text">{proof}</p>
          <div className="btn-row">
            <Link className="btn btn-navy" href="/#season">
              See the 2026 season
            </Link>
            <Link className="btn btn-line" href="/#film">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4l13 8-13 8z" />
              </svg>
              Watch the season film
            </Link>
          </div>
        </div>
      </section>

      <section className="cars" id="cars" aria-label="Our two programmes">
        {programmes.map((p) => (
          <div className={`car-panel ${p.id}`} key={p.id}>
            <h2 className="display name">{p.name}</h2>
            <p className="what">{p.what}</p>
            <dl className="specs">
              {p.specs.map((s) => (
                <div key={s.term} style={{ display: "contents" }}>
                  <dt>{s.term}</dt>
                  <dd>{s.detail}</dd>
                </div>
              ))}
            </dl>
            <Link className="textlink" href={p.link.href}>
              {p.link.label}
            </Link>
          </div>
        ))}
      </section>

      <section className="aeb" id="aeb" aria-labelledby="aeb-title">
        <div className="wrap">
          <div className="split-head">
            <h2 className="h2" id="aeb-title">
              It saw the car ahead and stopped by itself
            </h2>
            <p className="lede muted">
              In the emergency braking event, nobody touches the pedals. A10 has to spot the target, judge the gap and brake
              in time. It scored 100 out of 100.
            </p>
          </div>
          <figure className="figure">
            <Picture name="aeb-stop" alt="A10 stopped short of the target car on the braking test lane" sizes="(min-width: 1240px) 1144px, 92vw" />
            <figcaption>The braking test at Sri Sairam Engineering College, Chennai, 2 August 2026.</figcaption>
          </figure>
          <ol className="steps">
            {autonomySteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <ModelViewer3D />
        </div>
      </section>

      <section className="season" id="season" aria-labelledby="season-title">
        <div className="wrap">
          <div className="split-head">
            <h2 className="h2" id="season-title">
              {season2026.heading}
            </h2>
            <p className="lede">{season2026.lede}</p>
          </div>
          <ol className="course">
            {season2026.stops.map((s) => (
              <li key={s.title} className={s.result ? "result" : undefined}>
                <span className="when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <Picture
          className="podium-photo"
          name="champions-stage"
          alt="Team Abhyuday Racing with their awards on the Champions stage at aBAJA SAEINDIA 2026"
        />
        <div className="awards">
          <div className="wrap awards-row">
            {season2026.awards.map((a) => (
              <div className={`award${a.win ? " win" : ""}`} key={a.title}>
                <span className="rank">{a.rank}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
          <div className="wrap">
            <p className="podium-caption">On the Champions stage, 2 August 2026.</p>
          </div>
        </div>
      </section>

      <section className="next" aria-label="Coming up and latest news">
        <div className="wrap">
          <div>
            <h2 className="h2">Coming up</h2>
            <div className="schedule">
              {upcoming.map((u) => (
                <div className="schedule-row" key={u.title}>
                  {u.when ? <span className="when">{u.when}</span> : <span className="tba">Date to be set</span>}
                  <div>
                    <h3>{u.title}</h3>
                    {u.detail && <p className="detail">{u.detail}</p>}
                    <span className={`status ${u.open ? "open" : "later"}`}>{u.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h2">Latest</h2>
            <div className="news">
              {news.map((n) => (
                <article key={n.title} className={n.draft ? "draft" : undefined}>
                  <span className="date">{n.date}</span>
                  <h3>{n.href ? <Link href={n.href}>{n.title}</Link> : n.title}</h3>
                  <p>{n.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="results" id="results" aria-labelledby="results-title">
        <div className="wrap">
          <h2 className="h2" id="results-title">
            Results
          </h2>
          <div className="sheet">
            <table>
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Event</th>
                  <th scope="col">Category</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>{resultRows()}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="seasons" id="seasons" aria-labelledby="seasons-title">
        <div className="wrap">
          <div className="split-head">
            <h2 className="h2" id="seasons-title">
              Season by season
            </h2>
            <p className="lede muted">
              How each BAJA SAEINDIA season ran, where every round was held, and what we did in it. Official dates come
              from SAEINDIA and host press releases.
            </p>
          </div>
          <SeasonTabs seasons={seasons} initial={defaultSeason} />
        </div>
      </section>

      <section className="garage" aria-labelledby="garage-title">
        <div className="wrap">
          <GarageCarousel
            heading={
              <h2 className="h2" id="garage-title">
                Every car we&apos;ve built
              </h2>
            }
          >
            {garage.map((car) => (
              <li className={`car-card${car.current ? " current" : ""}`} key={car.year}>
                <span className="yr">{car.year}</span>
                {hasPhoto(car.photo) ? (
                  <Picture name={car.photo} alt={`${car.name}, ${car.year}`} sizes="340px" />
                ) : (
                  <Slot title={car.slot} hint={car.current ? undefined : "Landscape, at least 1600 px wide"} />
                )}
                <h3>{car.name}</h3>
                <p>{car.body}</p>
              </li>
            ))}
          </GarageCarousel>
        </div>
      </section>

      <section className="film" id="film" aria-labelledby="film-title">
        <div className="wrap">
          <FilmPlayer
            youtubeId={film.youtubeId}
            title={film.title}
            channelUrl={site.socials.find((s) => s.label === "YouTube")?.href ?? "#"}
            poster={<Picture name={film.poster} alt="" sizes="(min-width: 960px) 60vw, 92vw" />}
          />
          <div className="film-side">
            <h2 className="h2" id="film-title">
              {film.title}
            </h2>
            <p className="muted">{film.body}</p>
            <Link className="textlink" href="/media">
              Open the photo gallery
            </Link>
            <div className="mini-slots" aria-label="Space for more photos">
              <Slot title="Add a workshop photo" />
              <Slot title="Add a testing photo" />
              <Slot title="Add an event photo" />
            </div>
          </div>
        </div>
      </section>

      <section className="partners" id="partners" aria-labelledby="partners-title">
        <div className="wrap">
          <div className="partners-head">
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "40em" }}>
              <h2 className="h2" id="partners-title">
                Our partners
              </h2>
              <p className="muted">The software, tools and parts in A10 came from these companies. Thank you.</p>
            </div>
            <div className="btn-row">
              <a className="btn btn-navy" href={`mailto:${site.email}?subject=Partnering%20with%20Team%20Abhyuday%20Racing`}>
                Become a partner
              </a>
              {site.sponsorDeckUrl && (
                <a className="btn btn-line" href={site.sponsorDeckUrl} target="_blank" rel="noopener">
                  Sponsor deck
                </a>
              )}
            </div>
          </div>
          <ul className="logo-wall">
            {partners.map((p) => (
              <li key={p.name} className={p.small ? "small" : undefined} style={p.tile ? { background: p.tile } : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element -- logos are small static files */}
                <img src={p.logo} alt={p.name} loading="lazy" />
              </li>
            ))}
            <li className="you">Your logo here</li>
          </ul>
        </div>
      </section>

      <section className="join" id="join" aria-labelledby="join-title">
        <Chevrons base="#EE7234" className="chevrons join-chevrons" animate={false} />
        <div className="wrap">
          <h2 className="display" id="join-title">
            Build the next car with us
          </h2>
          <div className="join-side">
            <p>
              Any branch, any year, no experience needed. We&apos;ll teach you software, electronics, mechanical design or
              sponsorship, and you&apos;ll work on a real car.
            </p>
            <p>Meet the current crew, our faculty advisors and past members on the team page.</p>
            <div className="btn-row">
              <a className="btn btn-navy" href={applyHref}>
                Apply for 2026–27
              </a>
              <Link className="btn btn-line" href="/team">
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
