import { articles, companies } from "@/lib/data";
import { searchArticles } from "@/lib/discovery";
import { ArticleCard } from "../components";
import Link from "next/link";
export const metadata = {
  title: "Notícias & conteúdos",
  description:
    "Notícias de empresas, entrevistas e guias úteis, organizados por editoria.",
};
export default async function Stories({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const all = articles();
  const categories = [...new Set(all.map((a) => a.category))];
  const filtered = searchArticles(all, p.q, {
    category: p.categoria,
    kind: p.tipo,
    companies: companies(),
  });
  return (
    <div className="wrap page-space article-directory">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>Notícias & conteúdos
      </div>
      <span className="eyebrow">INFORMAÇÃO COM CONTEXTO</span>
      <h1 className="page-title">{p.categoria || "Notícias & conteúdos"}</h1>
      <p className="page-description">
        Novidades dos negócios, conversas e guias para entender melhor cada
        assunto.
      </p>
      <nav className="content-types" aria-label="Tipos de conteúdo">
        {[
          ["", "Todos"],
          ["news", "Notícias"],
          ["interview", "Entrevistas"],
          ["guide", "Guias"],
        ].map(([value, label]) => {
          const query = new URLSearchParams();
          if (p.categoria) query.set("categoria", p.categoria);
          if (p.q) query.set("q", p.q);
          if (value) query.set("tipo", value);
          return (
            <Link
              key={value}
              aria-current={(p.tipo || "") === value ? "page" : undefined}
              href={`/artigos?${query.toString()}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <form className="search-form story-search" action="/artigos">
        <label>
          Buscar por assunto ou empresa
          <input
            name="q"
            defaultValue={p.q}
            placeholder="O que você quer descobrir?"
          />
        </label>
        <label>
          Editoria
          <select name="categoria" defaultValue={p.categoria || ""}>
            <option value="">Todas as editorias</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Formato
          <select name="tipo" defaultValue={p.tipo || ""}>
            <option value="">Todos os formatos</option>
            <option value="news">Notícia</option>
            <option value="interview">Entrevista</option>
            <option value="guide">Guia</option>
          </select>
        </label>
        <button className="button">Buscar →</button>
      </form>
      <div className="result-heading">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1 ? "publicação" : "publicações"} ·{" "}
          {p.q ? "Ordenadas por relevância" : "Mais recentes primeiro"}
        </span>
        {(p.q || p.categoria || p.tipo) && (
          <Link href="/artigos" className="text-link">
            Limpar filtros ×
          </Link>
        )}
      </div>
      <div className="article-grid">
        {filtered.map((a) => (
          <ArticleCard article={a} key={a.id} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <h2>Nenhuma publicação encontrada.</h2>
          <p>Tente outro assunto ou remova um dos filtros.</p>
          <Link className="button" href="/artigos">
            Ver todas as publicações
          </Link>
        </div>
      )}
    </div>
  );
}
