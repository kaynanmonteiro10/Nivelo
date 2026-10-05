import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin", "/empresas?", "/artigos?", "/buscar"],
    },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
