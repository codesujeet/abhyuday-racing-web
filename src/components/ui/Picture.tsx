import { photo } from "@/lib/photos";

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * A photo from media/originals as AVIF + WebP at several widths, with a blurred preview.
 * If the photo does not exist yet, the labelled placeholder from public/placeholders is shown.
 */
export function Picture({ name, alt, sizes = "100vw", className, priority = false }: Props) {
  const m = photo(name);
  if (!m) {
    return (
      <picture className={className}>
        <img src={`/placeholders/${name}.svg`} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" width={1600} height={1000} />
      </picture>
    );
  }
  const set = (ext: string) => m.widths.map((w) => `/photos/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = m.widths.find((w) => w >= 960) ?? m.widths.at(-1);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/photos/${name}-${fallback}.webp`}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ backgroundImage: `url(${m.blur})` }}
      />
    </picture>
  );
}
