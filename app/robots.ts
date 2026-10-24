import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const sitemap = siteUrl("/sitemap.xml");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    ...(sitemap ? { sitemap } : {}),
  };
}
