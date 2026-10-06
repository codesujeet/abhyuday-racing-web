import Link from "next/link";
import { galleryItems, galleryTags } from "@/content/gallery";
import { hasPhoto } from "@/lib/photos";
import { Picture } from "@/components/ui/Picture";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Icons";

const COLUMNS = 5;
const PER_COLUMN = 6;

/**
 * Home "Media" section: a tilted 3D wall of photo columns drifting up and down (alternate directions).
 * The whole wall links to the full gallery page, where events become filters.
 */
export function Gallery() {
  const photos = galleryItems.filter((g) => hasPhoto(g.photo));
  // Each column starts at a different photo so neighbours never line up.
  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    Array.from({ length: PER_COLUMN }, (_, i) => photos[(c * 2 + i) % photos.length]),
  );
  const events = galleryTags.filter((t) => galleryItems.some((g) => g.tag === t));

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="wrap">
        <SectionHead
          index="05"
          kicker="Media & gallery"
          id="gallery-title"
          title={
            <>
              Through the <em>lens</em>
            </>
          }
          lede="The workshop, the night tests, the pit bay and the podium — the season as we lived it."
        />
      </div>

      <Link href="/gallery/" className="wall" aria-label={`Open the full gallery: ${photos.length} photos from ${events.join(", ")}`}>
        <div className="wall-plane" aria-hidden="true">
          {columns.map((col, c) => (
            <div key={c} className={`wall-col ${c % 2 ? "is-down" : ""}`} style={{ animationDuration: `${38 + c * 6}s` }}>
              {[...col, ...col].map((p, i) => (
                <div key={i} className="wall-tile">
                  <Picture name={p.photo} alt="" sizes="320px" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <span className="wall-cta">
          <span className="btn btn-primary">
            Open the full gallery <ArrowRight size={18} />
          </span>
          <span className="hud">{events.slice(0, 4).join(" · ")}</span>
        </span>
      </Link>
    </section>
  );
}
