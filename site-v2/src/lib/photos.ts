import images from "@/content/generated/images.json";

export type PhotoMeta = { width: number; height: number; widths: number[]; blur: string };

const manifest = images as Record<string, PhotoMeta>;

/** Metadata for a photo in media/originals, or undefined if the file is not there (placeholder is used). */
export function photo(name: string): PhotoMeta | undefined {
  return manifest[name];
}

export function hasPhoto(name: string) {
  return Boolean(manifest[name]);
}

/** URL of the largest WebP for a photo, or its placeholder SVG. */
export function photoUrl(name: string, maxWidth = 2400) {
  const m = manifest[name];
  if (!m) return `/placeholders/${name}.svg`;
  const w = [...m.widths].reverse().find((x) => x <= maxWidth) ?? m.widths[0];
  return `/photos/${name}-${w}.webp`;
}
