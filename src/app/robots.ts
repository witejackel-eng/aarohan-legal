import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt — informational site, indexable.
 *
 * Per brand brief §24: robots file, no SEO cloaking. The disclaimer
 * gate is implemented as a client-side session overlay, not as
 * server-side cloaking; public informational content remains
 * indexable.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.seo.siteUrl;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
