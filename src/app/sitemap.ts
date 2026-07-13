import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Dynamic sitemap.xml — informational content only.
 *
 * Per brand brief §24: dynamic sitemap, robots file, canonical URLs.
 * Only the canonical routes are listed. The site is a single-route
 * SPA, so the sitemap points to "/" (with the understanding that the
 * hash-based view state is informational). Search engines can index
 * the homepage; legal pages are reachable via in-page navigation
 * and do not need separate URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl;
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
