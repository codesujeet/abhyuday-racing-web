"use client";

import { photo, photoUrl } from "./photos";
import { getLenis } from "./scroll";

/** Opens real photos (by name) in a PhotoSwipe lightbox. The library loads on first use. */
export async function openLightbox(items: { photo: string; alt: string }[], index: number) {
  const { default: PhotoSwipe } = await import("photoswipe");
  const dataSource = items.map((it) => {
    const m = photo(it.photo);
    const w = Math.min(m?.width ?? 1600, 1920);
    return { src: photoUrl(it.photo, 1920), width: w, height: m ? Math.round((m.height / m.width) * w) : 1000, alt: it.alt };
  });
  const pswp = new PhotoSwipe({ dataSource, index, bgOpacity: 0.94, showHideAnimationType: "fade", wheelToZoom: true });
  getLenis()?.stop();
  pswp.on("destroy", () => getLenis()?.start());
  pswp.init();
}
