import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";
import { companies, articles } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  return [
    { url: base },
    { url: `${base}/empresas` },
    { url: `${base}/artigos` },
    { url: `${base}/sobre` },
    ...(await companies()).map((c) => ({ url: `${base}/empresas/${c.slug}` })),
    ...(await articles()).map((a) => ({
      url: `${base}/artigos/${a.slug}`,
      lastModified: new Date(a.updated_at),
    })),
  ];
}
