import { companies, articles } from "@/lib/data";
import AdminPrototype from "./prototype";
import { isLive } from "@/lib/supabase/config";
import { requireEditor } from "@/lib/auth";
import type { Company, Article } from "@/lib/data";
export const metadata = {
  title: "Painel editorial",
  robots: { index: false, follow: false },
};
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const live = isLive();
  let allCompanies = companies();
  let allArticles = articles();
  if (live) {
    const db = await requireEditor();
    const [companyResult, articleResult] = await Promise.all([
      db.from("companies").select("*").order("name"),
      db.from("articles").select("*").order("published_at", { ascending: false }),
    ]);
    if (companyResult.error || articleResult.error) throw new Error("Não foi possível carregar o painel.");
    allCompanies = companyResult.data as Company[];
    allArticles = articleResult.data as Article[];
  }
  return (
    <AdminPrototype
      live={live}
      initialCompanies={allCompanies}
      initialArticles={allArticles}
      tab={p.aba || "painel"}
      selectedCompany={Number(p.empresa) || undefined}
      editId={Number(p.id) || undefined}
    />
  );
}
