"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export function GarageCarousel({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", update).on("select", update).on("reInit", update).on("resize", update);
    return () => {
      emblaApi.off("init", update).off("select", update).off("reInit", update).off("resize", update);
    };
  }, [emblaApi, update]);

  return (
    <>
      <div className="garage-head">
        {heading}
        <div className="garage-controls">
          <button className="round-btn" type="button" aria-label="Previous car" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="round-btn" type="button" aria-label="Next car" disabled={!canNext} onClick={() => emblaApi?.scrollNext()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <div className="embla" ref={emblaRef}>
        <ul className="embla__container" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {children}
        </ul>
      </div>
    </>
  );
}
