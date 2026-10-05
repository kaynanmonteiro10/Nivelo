import type { MetadataRoute } from "next";
import { companies, articles } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: base },
    { url: `${base}/empresas` },
    { url: `${base}/artigos` },
    { url: `${base}/sobre` },
    ...companies().map((c) => ({ url: `${base}/empresas/${c.slug}` })),
    ...articles().map((a) => ({
      url: `${base}/artigos/${a.slug}`,
      lastModified: new Date(a.updated_at),
    })),
  ];
}
