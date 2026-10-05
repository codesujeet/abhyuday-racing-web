import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Picture, hasPhoto } from "@/components/Picture";
import { Slot } from "@/components/Slot";
import { alumni, departments, faculty, leads, mentors, squads } from "@/content/team";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: "The students, faculty advisors and mentors behind Team Abhyuday Racing, and every past crew.",
};

export default function TeamPage() {
  return (
    <>
      <PageHead
        title="The crew"
        lede="Students from every branch, guided by faculty and mentors, with every past season's crew kept on record."
      />

      <section className="block" aria-labelledby="faculty-title">
        <div className="wrap">
          <h2 className="block-title" id="faculty-title">
            Faculty and leadership
          </h2>
          <ul className="people-list">
            {faculty.map((p) => (
              <li key={p.name}>
                <span className="person">{p.name}</span>
                <span className="role">
                  {p.role}
                  {p.honour && <span className="honour">{p.honour}</span>}
                </span>
              </li>
            ))}
            <li>
              <span className="person">{mentors.join(", ")}</span>
              <span className="role">aBAJA technical mentors</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="block" aria-labelledby="leads-title">
        <div className="wrap">
          <h2 className="block-title" id="leads-title">
            Leads for 2026–27
          </h2>
          <ul className="lead-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {leads.map((l) => (
              <li className="lead" key={l.role}>
                {hasPhoto(l.photo) ? (
                  <Picture name={l.photo} alt={l.name} sizes="240px" />
                ) : (
                  <Slot title="Add a portrait" hint="Upright photo, 4:5" person />
                )}
                <span className={`name${l.name.startsWith("[") ? " todo" : ""}`}>{l.name}</span>
                <span className="role">{l.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {squads.map((squad) => (
        <section className="block" key={squad.season} aria-label={`${squad.season} squad`}>
          <div className="wrap">
            <h2 className="block-title">{squad.season} squad</h2>
            <ul className="squad" style={{ margin: 0, padding: 0 }}>
              {squad.members.map((m) => (
                <li key={m.name}>
                  <span>{m.name}</span>
                  {m.department && <span className="dept">{m.department}</span>}
                </li>
              ))}
            </ul>
            <p className="muted" style={{ marginTop: 12, fontSize: "var(--s-16)" }}>
              {squad.note} Departments: {departments.join(", ")}. The 2026–27 roster is still to be added.
            </p>
          </div>
        </section>
      ))}

      <section className="block" aria-labelledby="alumni-title">
        <div className="wrap">
          <div className="partners-head" style={{ marginBottom: 24 }}>
            <h2 className="block-title" id="alumni-title" style={{ marginBottom: 0 }}>
              Alumni and past crews
            </h2>
            <a className="btn btn-line" href={`mailto:${site.email}?subject=Alumni%20listing`}>
              Alumni? Get listed
            </a>
          </div>
          <ul className="alumni-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {alumni.map((b) => (
              <li className="batch" key={b.batch}>
                {hasPhoto(b.photo) ? (
                  <Picture name={b.photo} alt={`${b.batch} crew`} sizes="400px" />
                ) : (
                  <Slot title={`Add the ${b.batch} group photo`} />
                )}
                <h3>{b.batch}</h3>
                <p className="muted">{b.label}</p>
                <p style={{ fontSize: "var(--s-16)" }}>{b.names.length ? b.names.join(", ") : "Names to be added."}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
