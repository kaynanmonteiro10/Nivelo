import { companies, articles } from "@/lib/data";
import AdminPrototype from "./prototype";
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
  return (
    <AdminPrototype
      initialCompanies={companies()}
      initialArticles={articles()}
      tab={p.aba || "painel"}
      selectedCompany={Number(p.empresa) || undefined}
      editId={Number(p.id) || undefined}
    />
  );
}
