import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// One road, one page. (/design-system is noindex.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, changeFrequency: "weekly", priority: 1 }];
}
