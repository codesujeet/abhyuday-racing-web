/* eslint-disable @next/next/no-img-element -- partner logos are mixed SVG/PNG files served as-is */
import { partners, partnersThanks, type Partner } from "@/content/partners";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/** A partner logo that opens the company's website in a new tab. */
function Logo({ p, copy = false }: { p: Partner; copy?: boolean }) {
  return (
    <a
      className={`logo-tile ${p.small ? "small" : ""}`}
      style={p.tile ? { background: p.tile } : undefined}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${p.name} — visit website`}
      // The second copy only makes the loop seamless: hide it from screen readers and the keyboard.
      {...(copy ? { "aria-hidden": true, tabIndex: -1 } : {})}
    >
      <img src={p.logo} alt={copy ? "" : `${p.name} (opens their website)`} loading="lazy" decoding="async" width={200} height={100} />
    </a>
  );
}

export function Partners() {
  return (
    <section id="partners" className="section" aria-labelledby="partners-title">
      <div className="wrap">
        <SectionHead
          index="06"
          kicker="Our partners"
          id="partners-title"
          title={
            <>
              Powered <em>by</em>
            </>
          }
          lede="The companies whose software, tools and parts are inside every lap we drive. Click a logo to visit them."
        />

        {/* One continuous strip; pauses on hover so a logo is easy to click. */}
        <div className="marquee">
          <ul className="marquee-row" aria-label="Our partners">
            {partners.map((p) => (
              <li key={p.name}>
                <Logo p={p} />
              </li>
            ))}
            {partners.map((p) => (
              <li key={`${p.name}-copy`} aria-hidden="true">
                <Logo p={p} copy />
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <p className="thanks">{partnersThanks}</p>
        </Reveal>
      </div>
    </section>
  );
}
