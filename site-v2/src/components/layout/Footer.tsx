/* eslint-disable @next/next/no-img-element -- small static logo */
import { builtCars } from "@/content/cars";
import { sections, site } from "@/content/site";
import { Social } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="chevron-band" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6 }} />
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src="/brand/emblem-320.webp" alt={`${site.name} emblem`} width={120} height={88} loading="lazy" />
          <p>{site.description}</p>
          <p className="hud hud-orange">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Cars</h2>
          <ul>
            {builtCars.map((c) => (
              <li key={c.slug}>
                <a href={`/cars/${c.slug}/`}>
                  {c.name} · {c.year}
                </a>
              </li>
            ))}
          </ul>
          <h2 style={{ marginTop: 24 }}>Follow</h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ minWidth: 44, justifyContent: "center" }}>
                  <Social name={s.label} size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
            )}
          </ul>
          <p className="muted" style={{ marginTop: 10, fontSize: "0.95rem" }}>
            {site.address || site.college}
          </p>
        </div>
      </div>

      <p className="footer-band" aria-hidden="true">
        Abhyuday Racing
      </p>

      <div className="wrap footer-bottom">
        <span>
          © {year} {site.name}, {site.collegeShort}.
        </span>
        <span>Partner logos are trademarks of their owners.</span>
      </div>
    </footer>
  );
}
