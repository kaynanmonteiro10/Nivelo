import { articles } from "@/lib/data";
import { ArticleCard } from "../components";
import Link from "next/link";
export const metadata = {
  title: "Histórias & ideias",
  description:
    "Conteúdos úteis sobre casa, gastronomia, bem-estar e outros assuntos que fazem parte da sua vida.",
};
export default async function Stories({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const all = articles();
  const categories = [...new Set(all.map((a) => a.category))];
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = all.filter(
    (a) =>
      (!p.categoria || a.category === p.categoria) &&
      (!p.q ||
        normalize(a.title + " " + a.excerpt + " " + a.content).includes(
          normalize(p.q),
        )),
  );
  return (
    <div className="wrap page-space">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>Histórias & ideias
      </div>
      <span className="eyebrow">CONHECIMENTO QUE ABRE PORTAS</span>
      <h1 className="page-title">
        Uma boa história.
        <br />
        <em>Uma nova perspectiva.</em>
      </h1>
      <p className="page-description">
        Respostas, referências e descobertas para fazer escolhas com mais
        informação.
      </p>
      <form className="search-form story-search">
        <label>
          Sobre o que você quer ler?
          <input name="q" defaultValue={p.q} placeholder="Busque um assunto" />
        </label>
        <label>
          Assunto
          <select name="categoria" defaultValue={p.categoria || ""}>
            <option value="">Todos os assuntos</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <button className="button">Buscar →</button>
      </form>
      <div className="result-heading">
        <span>{filtered.length} histórias para explorar</span>
        {(p.q || p.categoria) && (
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
          Não encontramos histórias com esses filtros. Experimente outro
          assunto.
        </div>
      )}
    </div>
  );
}
