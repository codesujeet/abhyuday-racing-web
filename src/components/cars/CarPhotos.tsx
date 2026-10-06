"use client";

import { openLightbox } from "@/lib/lightbox";
import { BBox } from "@/components/ui/BBox";
import { Picture } from "@/components/ui/Picture";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Item = { photo: string; alt: string; caption: string };

export function CarPhotos({ items }: { items: Item[] }) {
  return (
    <RevealGroup className="photo-grid">
      {items.map((it, i) => (
        <RevealItem key={it.photo}>
          <BBox className="frame" label={`IMG ${String(i + 1).padStart(2, "0")}`}>
            <button type="button" onClick={() => openLightbox(items, i)} aria-label={`Open photo: ${it.caption}`} style={{ width: "100%" }}>
              <Picture name={it.photo} alt={it.alt} sizes="(min-width: 900px) 33vw, 100vw" />
            </button>
            <span className="gal-cap">
              <strong>{it.caption}</strong>
            </span>
          </BBox>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
