/* eslint-disable @next/next/no-img-element -- partner logos are mixed SVG/PNG files served as-is */
import { partners, partnersThanks, partnerTiers, type Partner } from "@/content/partners";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

function Logo({ p, link = true }: { p: Partner; link?: boolean }) {
  const img = <img src={p.logo} alt={link ? `${p.name} (opens their website)` : ""} loading="lazy" decoding="async" width={200} height={100} />;
  const cls = `logo-tile ${p.small ? "small" : ""}`;
  const style = p.tile ? { background: p.tile } : undefined;
  return link ? (
    <a className={cls} style={style} href={p.href} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    <span className={cls} style={style}>
      {img}
    </span>
  );
}

export function Partners() {
  const half = Math.ceil(partners.length / 2);
  const rowA = [...partners.slice(0, half), ...partners.slice(half)];
  const rowB = [...partners.slice(half), ...partners.slice(0, half)];

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
          lede="The companies whose software, tools and parts are inside every lap we drive."
        />

        {/* Decorative marquee — the real, linked list is below it. */}
        <div className="marquee" aria-hidden="true">
          {[rowA, rowB].map((row, r) => (
            <div key={r} className={`marquee-row ${r ? "rev" : ""}`}>
              {[...row, ...row].map((p, i) => (
                <Logo key={`${p.name}-${i}`} p={p} link={false} />
              ))}
            </div>
          ))}
        </div>

        <div className="partner-groups">
          {partnerTiers.map((tier) => {
            const list = partners.filter((p) => (p.tier ?? partnerTiers[0]) === tier);
            return (
              <div key={tier}>
                <p className="hud hud-orange">{tier}</p>
                <RevealGroup as="ul" className="partner-grid" stagger={0.05}>
                  {list.map((p) => (
                    <RevealItem as="li" key={p.name}>
                      <Logo p={p} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>

        <Reveal>
          <p className="thanks">{partnersThanks}</p>
        </Reveal>
      </div>
    </section>
  );
}
