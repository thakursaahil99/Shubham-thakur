import type { MetadataRoute } from "next";
import { navLinks, siteUrl } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((l) => ({
    url: `${siteUrl}${l.href === "/" ? "" : l.href}`,
    lastModified: new Date(),
    priority: l.href === "/" ? 1 : 0.8,
  }));
}
