import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { builtCars } from "@/content/cars";
import { site } from "@/content/site";
import { hasPhoto, photo, photoUrl } from "@/lib/photos";
import { Nav } from "@/components/layout/Nav";
import { CarPhotos } from "@/components/cars/CarPhotos";
import { ModelViewer } from "@/components/cars/ModelViewer";
import { Picture } from "@/components/ui/Picture";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeft, ArrowRight, Trophy } from "@/components/ui/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return builtCars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const car = builtCars.find((c) => c.slug === slug);
  if (!car) return {};
  const image = hasPhoto(car.photo) ? photoUrl(car.photo, 1440) : "/og.jpg";
  const title = `${car.name} (${car.year})`;
  return {
    title,
    description: `${car.tagline} ${car.description}`.slice(0, 160),
    alternates: { canonical: `/cars/${car.slug}/` },
    openGraph: { title: `${title} | ${site.name}`, description: car.tagline, url: `/cars/${car.slug}/`, images: [{ url: image, alt: car.photoAlt }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description: car.tagline, images: [image] },
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = builtCars.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const car = builtCars[i];
  const prev = builtCars[i - 1];
  const next = builtCars[i + 1];
  const hero = photo(car.photo);
  if (hero) {
    preload(`/photos/${car.photo}-${hero.widths[1] ?? hero.widths[0]}.avif`, {
      as: "image",
      type: "image/avif",
      imageSrcSet: hero.widths.map((w) => `/photos/${car.photo}-${w}.avif ${w}w`).join(", "),
      imageSizes: "100vw",
      fetchPriority: "high",
    });
  }

  return (
    <>
      <Nav onHome={false} />
      <main id="main">
        <section className="car-hero" aria-labelledby="car-title">
          <div className="frame">
            <Picture name={car.photo} alt={car.photoAlt} priority sizes="100vw" />
          </div>
          <div className="wrap car-hero-content">
            <nav className="crumbs hud" aria-label="Breadcrumb">
              <Link href="/#cars">
                <ArrowLeft size={16} /> All cars
              </Link>
              <span aria-hidden="true">/</span>
              <span>{`${car.category} · ${car.year}`}</span>
            </nav>
            <h1 id="car-title">{car.name}</h1>
            <p className="lede" style={{ color: "var(--ink)" }}>
              {car.tagline}
            </p>
            {car.keySpecs.length > 0 && (
              <dl className="car-specs">
                {car.keySpecs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <section className="section" aria-labelledby="story-title">
          <div className="wrap detail-grid">
            <Reveal>
              <p className="hud hud-orange">{`// The story`}</p>
              <h2 id="story-title" className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", margin: "14px 0 22px" }}>
                {car.name}, {car.year}
              </h2>
              <p className="lede" style={{ color: "var(--ink)" }}>
                {car.description}
              </p>
              {car.results.length > 0 && (
                <>
                  <h3 className="hud" style={{ margin: "40px 0 14px" }}>
                    Results with this car
                  </h3>
                  <ul className="comp" style={{ listStyle: "none" }}>
                    {car.results.map((r) => (
                      <li key={r.title}>
                        <span className="t">{r.title}</span>
                        {r.win ? (
                          <span className="badge-win">
                            <Trophy size={16} /> {r.result}
                          </span>
                        ) : (
                          <span className="badge-place">{r.result}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="hud" style={{ marginBottom: 14 }}>
                Spec sheet
              </h3>
              <dl className="spec-sheet">
                {car.specs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd className={s.value === "TBA" ? "tba" : undefined}>{s.value === "TBA" ? "TBA — to be confirmed" : s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {(car.highlights.length > 0 || car.timeline) && (
        <section className="section" aria-labelledby="tech-title">
          <div className="wrap">
            <SectionHead index="02" kicker="Design & technology" id="tech-title" title={<>Under the <em>skin</em></>} />
            <RevealGroup as="ol" className="pipeline-steps" stagger={0.08}>
              {car.highlights.map((h, n) => (
                <RevealItem as="li" key={h.title}>
                  <span className="num">{`0${n + 1} //`}</span>
                  <h3 className="step-title">{h.title}</h3>
                  <p>{h.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            {car.timeline && (
              <div className="detail-grid" style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
                <Reveal>
                  <h3 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {car.timelineTitle}
                  </h3>
                  <p className="muted" style={{ marginTop: 16 }}>
                    {car.timelineLede}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <ol className="mini-tl">
                    {car.timeline.map((t) => (
                      <li key={t.title} className={t.result ? "is-result" : undefined}>
                        <span className="hud">{t.when}</span>
                        <br />
                        <strong>{t.title}</strong>
                        <p className="muted">{t.body}</p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            )}
          </div>
        </section>

        )}

        <section className="section" aria-labelledby="photos-title">
          <div className="wrap">
            <SectionHead index="03" kicker="Gallery & 3D" id="photos-title" title={<>Every <em>angle</em></>} />
            {car.gallery.length > 0 ? (
              <CarPhotos items={car.gallery} />
            ) : (
              <p className="todo-note">Photos of this car are on their way. Add them to the car&apos;s gallery to show them here.</p>
            )}
            <Reveal className="" delay={0.05}>
              <div style={{ marginTop: 40 }}>
                <ModelViewer src={car.model} name={car.name} note={car.modelNote} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" aria-label="More cars">
          <div className="wrap car-pager">
            {prev ? (
              <Link href={`/cars/${prev.slug}/`}>
                <span className="hud">
                  <ArrowLeft size={14} /> Newer
                </span>
                <strong>{prev.name}</strong>
                <span className="muted">{prev.year}</span>
              </Link>
            ) : (
              <Link href="/#cars">
                <span className="hud">
                  <ArrowLeft size={14} /> Back
                </span>
                <strong>All cars</strong>
                <span className="muted">The garage</span>
              </Link>
            )}
            {next ? (
              <Link href={`/cars/${next.slug}/`} style={{ textAlign: "right" }}>
                <span className="hud">
                  Older <ArrowRight size={14} />
                </span>
                <strong>{next.name}</strong>
                <span className="muted">{next.year}</span>
              </Link>
            ) : (
              <Link href="/#support" style={{ textAlign: "right" }}>
                <span className="hud">
                  Next <ArrowRight size={14} />
                </span>
                <strong>Back the next car</strong>
                <span className="muted">Support us</span>
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
