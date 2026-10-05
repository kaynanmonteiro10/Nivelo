import "server-only";
import { cache } from "react";
import { companies as demoCompanies, articles as demoArticles } from "./data";
import type { Company, Article } from "./data";
import { publicSupabase } from "./supabase/server";
import { isLive } from "./supabase/config";

// Public reads always enforce publication visibility, even for signed-in editors.
export const companies = cache(async (): Promise<Company[]> => {
  if (!isLive()) return demoCompanies();
  const db = publicSupabase();
  const { data, error } = await db.from("companies").select("*")
    .eq("status", "published").order("name");
  if (error) throw new Error("Não foi possível carregar as empresas.");
  return data as Company[];
});

export const articles = cache(async (): Promise<Article[]> => {
  if (!isLive()) return demoArticles();
  const db = publicSupabase();
  const { data, error } = await db.from("articles")
    .select("*, companies!inner(status)")
    .eq("status", "published").eq("companies.status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) throw new Error("Não foi possível carregar as matérias.");
  return (data || []).map(({ companies: _company, ...article }) => article as Article);
});

export async function companyBySlug(slug: string) {
  return (await companies()).find((c) => c.slug === slug);
}

export async function articleBySlug(slug: string) {
  return (await articles()).find((a) => a.slug === slug);
}
