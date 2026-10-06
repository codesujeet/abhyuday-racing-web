import images from "@/content/generated/images.json";

type Manifest = Record<string, { width: number; height: number; widths: number[] }>;
const manifest = images as Manifest;

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/** A photo from media/originals, served as AVIF with a WebP fallback at the right width. */
export function Picture({ name, alt, sizes = "100vw", className, priority = false }: Props) {
  const entry = manifest[name];
  if (!entry) {
    throw new Error(`Photo "${name}" is not in media/originals. Run "npm run images" after adding it.`);
  }
  const set = (ext: string) => entry.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = entry.widths.find((w) => w >= 1440) ?? entry.widths.at(-1);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.webp`}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export function hasPhoto(name: string) {
  return Boolean(name && manifest[name]);
}
