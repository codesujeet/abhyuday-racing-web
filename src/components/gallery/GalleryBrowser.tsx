"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { films, galleryItems, galleryTags } from "@/content/gallery";
import { hasPhoto, photo } from "@/lib/photos";
import { openLightbox } from "@/lib/lightbox";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Play } from "@/components/ui/Icons";

// Shape of each tile from the photo's proportions, so wide shots get wide tiles.
function shape(name: string, i: number) {
  const m = photo(name);
  if (!m) return "";
  const r = m.width / m.height;
  if (r > 1.7) return "wide";
  if (r < 0.9) return "tall";
  return i % 5 === 0 ? "wide tall" : "";
}

function Film({ f }: { f: (typeof films)[number] }) {
  const [playing, setPlaying] = useState(false);
  const poster = <Picture name={f.poster} alt="" sizes="(min-width: 768px) 50vw, 100vw" />;
  const meta = (
    <span className="film-meta">
      <strong>{f.title}</strong>
      <span className="hud">{f.detail}</span>
    </span>
  );
  return (
    <div className="film">
      {playing && f.youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${f.youtubeId}?autoplay=1&rel=0`}
          title={f.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : f.youtubeId ? (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${f.title}`}>
          {poster}
          <span className="film-play">
            <Play />
          </span>
          {meta}
        </button>
      ) : (
        <div className="film-poster">
          {poster}
          <span className="chip film-soon">Coming soon</span>
          {meta}
        </div>
      )}
    </div>
  );
}

/** Full gallery: event filter tabs, photo grid with lightbox, films. Used on /gallery/. */
export function GalleryBrowser() {
  const [tag, setTag] = useState<string>("All");
  const tabs = ["All", ...galleryTags.filter((t) => galleryItems.some((g) => g.tag === t))];
  // "All" shows real photos only; an event with no photos yet shows its placeholder slots.
  const shown = tag === "All" ? galleryItems.filter((g) => hasPhoto(g.photo)) : galleryItems.filter((g) => g.tag === tag);
  const real = shown.filter((g) => hasPhoto(g.photo));
  const visibleFilms = films.filter((f) => !f.title.startsWith("["));

  return (
    <>
      <div className="team-controls">
        <div className="tabs" role="group" aria-label="Filter photos by event">
          {tabs.map((t) => (
            <button key={t} type="button" className="tab" aria-pressed={tag === t} onClick={() => setTag(t)}>
              {tag === t && <motion.span className="tab-bg" layoutId="gallery-tab" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <span>{t}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className="gal-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((g, i) => {
            const isReal = hasPhoto(g.photo);
            return (
              <motion.li
                layout
                key={g.photo}
                className={`gal-item ${shape(g.photo, i)} ${isReal ? "" : "is-slot"}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <BBox className="frame" label={g.tag}>
                  {isReal ? (
                    <button type="button" onClick={() => openLightbox(real, real.indexOf(g))} aria-label={`Open photo: ${g.title}`}>
                      <Picture name={g.photo} alt={g.alt} sizes="(min-width: 900px) 50vw, 100vw" />
                    </button>
                  ) : (
                    <div>
                      <Picture name={g.photo} alt={g.alt} sizes="(min-width: 900px) 25vw, 50vw" />
                    </div>
                  )}
                  <span className="gal-cap">
                    <strong>{g.title}</strong>
                    <span>{g.date}</span>
                  </span>
                </BBox>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {visibleFilms.length > 0 && (
        <div className="films">
          <Reveal className="team-sub">
            <h2 className="display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>Films &amp; reels</h2>
            <p className="hud">Watch</p>
          </Reveal>
          <RevealGroup className="film-grid">
            {visibleFilms.map((f) => (
              <RevealItem key={f.title}>
                <Film f={f} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </>
  );
}
