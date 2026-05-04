import { MetadataRoute } from "next";
import { portfolio } from "@/lib/portfolio";

export default function robots(): MetadataRoute.Robots {
  const base = portfolio.site.metadataBaseUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/admin/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
