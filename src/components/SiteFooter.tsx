import Link from "next/link";
import { nav, site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";

export function SiteFooter() {
  return (
    <footer className="foot">
      <svg className="foot-band" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
        <rect width="1200" height="28" fill="#131A35" />
        <polygon points="0,0 380,0 360,28 0,28" fill="#EE7234" />
        <polygon points="380,0 560,0 540,28 360,28" fill="#2D5BB7" />
        <polygon points="560,0 680,0 660,28 540,28" fill="#47A3DC" />
        <polygon points="680,0 740,0 720,28 660,28" fill="#B88BE0" />
      </svg>
      <div className="wrap foot-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="brand-name">{site.name}</span>
          <p>{site.college}, Maharashtra</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Follow</h2>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Write to us</h2>
          <CopyEmail email={site.email} />
        </div>
      </div>
      <div className="foot-base">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
