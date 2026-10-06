"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useMemo, useState } from "react";
import "photoswipe/style.css";
import images from "@/content/generated/images.json";
import { mediaTags, type MediaItem, type MediaTag } from "@/content/media";
import { Picture } from "./Picture";
import { Slot } from "./Slot";

const manifest = images as Record<string, { width: number; height: number; widths: number[] }>;

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [tag, setTag] = useState<MediaTag | "All">("All");
  // Photos glide to their new places when the filter changes. auto-animate skips this for reduced motion.
  const [gridRef] = useAutoAnimate<HTMLUListElement>({ duration: 260, easing: "ease-out" });
  const shown = useMemo(() => (tag === "All" ? items : items.filter((i) => i.tag === tag)), [items, tag]);

  useEffect(() => {
    let lightbox: { init: () => void; destroy: () => void } | undefined;
    let cancelled = false;
    import("photoswipe/lightbox").then(({ default: PhotoSwipeLightbox }) => {
      if (cancelled) return;
      lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a[data-pswp-width]",
        pswpModule: () => import("photoswipe"),
        bgOpacity: 0.94,
      });
      lightbox.init();
    });
    return () => {
      cancelled = true;
      lightbox?.destroy();
    };
  }, [shown]);

  return (
    <>
      <div className="filters" role="group" aria-label="Show photos from">
        {(["All", ...mediaTags] as const).map((t) => (
          <button key={t} type="button" className="filter" aria-pressed={tag === t} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="gallery" id="gallery" ref={gridRef}>
        {shown.map((item) => {
          const entry = item.photo ? manifest[item.photo] : undefined;
          const large = entry ? entry.widths.at(-1) : undefined;
          return (
            <li key={item.title}>
              <figure>
                {entry ? (
                  <a
                    href={`/img/${item.photo}-${large}.webp`}
                    data-pswp-width={entry.width}
                    data-pswp-height={entry.height}
                    aria-label={`Open photo: ${item.title}`}
                  >
                    <Picture name={item.photo} alt={item.title} sizes="(min-width: 960px) 30vw, (min-width: 640px) 45vw, 92vw" />
                  </a>
                ) : (
                  <Slot title={`Add a photo: ${item.title}`} hint="Landscape, at least 1600 px wide" />
                )}
                <figcaption>
                  <span className="title">{item.title}</span>
                  <span className="meta">
                    {item.tag}, {item.date}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </>
  );
}
