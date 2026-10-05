import type { Metadata } from "next";
import { MediaGallery } from "@/components/MediaGallery";
import { Slot } from "@/components/Slot";
import { films, mediaItems } from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Media",
  description: "Photos and films from Team Abhyuday Racing's workshop, testing and competitions.",
};

export default function MediaPage() {
  const youtube = site.socials.find((s) => s.label === "YouTube")?.href ?? "#";
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="display">Media</h1>
          <p className="lede muted">Photos from the workshop, testing and competitions. Select a photo to see it full size.</p>
          <MediaGallery items={mediaItems} />
        </div>
      </section>

      <section className="block" aria-labelledby="films-title">
        <div className="wrap">
          <h2 className="block-title" id="films-title">
            Films and reels
          </h2>
          <ul className="films-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {films.map((f) => (
              <li key={f.title} style={{ display: "grid", gap: 10 }}>
                {f.youtubeId ? (
                  <a className="textlink" href={`https://www.youtube.com/watch?v=${f.youtubeId}`} target="_blank" rel="noopener">
                    Watch on YouTube
                  </a>
                ) : (
                  <Slot title="Add the YouTube link" hint="Paste the video ID in src/content/media.ts" />
                )}
                <span style={{ fontWeight: 700 }}>{f.title}</span>
                <span className="muted" style={{ fontSize: "var(--s-16)" }}>
                  {f.detail}
                </span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 24 }}>
            <a className="textlink" href={youtube} target="_blank" rel="noopener">
              Our YouTube channel
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
