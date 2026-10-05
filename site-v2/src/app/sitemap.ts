import type { MetadataRoute } from "next";
import { builtCars } from "@/content/cars";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...builtCars.map((c) => ({ url: `${site.url}/cars/${c.slug}/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
