import { searchCompanies } from "@/lib/discovery";
import { companies } from "@/lib/data";
import { CompanyCard } from "../components";
import Link from "next/link";
export const metadata = {
  title: "Explore empresas",
  description:
    "Encontre lojas, restaurantes, profissionais e empresas por categoria, localização, produtos e serviços.",
};
export default async function Directory({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const all = companies();
  const categories = [...new Set(all.map((c) => c.category))];
  const filtered = searchCompanies(all, p.q, {
    category: p.categoria,
    location: p.local,
  });
  return (
    <div className="wrap page-space">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>Explore empresas
      </div>
      <span className="eyebrow">ENCONTRE SUA PRÓXIMA DESCOBERTA</span>
      <h1 className="page-title">
        Negócios com <em>algo a contar.</em>
      </h1>
      <p className="page-description">
        Lojas, mesas, espaços e pessoas. Descubra quem faz parte da Nivelo.
      </p>
      <form className="search-form" action="/empresas">
        <label>
          O que você procura?
          <input
            name="q"
            defaultValue={p.q}
            placeholder="Empresa, produto ou serviço"
          />
        </label>
        <label>
          Onde?
          <input
            name="local"
            defaultValue={p.local}
            placeholder="Cidade ou bairro"
          />
        </label>
        <label>
          Categoria
          <select name="categoria" defaultValue={p.categoria || ""}>
            <option value="">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <button className="button">Buscar →</button>
      </form>
      <div className="result-heading">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1
            ? "empresa encontrada"
            : "empresas encontradas"}
        </span>
        {(p.q || p.local || p.categoria) && (
          <Link className="text-link" href="/empresas">
            Limpar filtros ×
          </Link>
        )}
      </div>
      <div className="company-grid directory-grid">
        {filtered.map((c) => (
          <CompanyCard company={c} key={c.id} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <h2>Nenhum negócio por aqui ainda.</h2>
          <p>Tente outro termo, cidade ou categoria.</p>
        </div>
      )}
    </div>
  );
}
