import Link from "next/link";
import { articles, companies } from "@/lib/content";
import { searchArticles, searchCompanies } from "@/lib/discovery";
import { ArticleCard, CompanyCard } from "../components";
export const metadata = {
  title: "Busca no portal",
  robots: { index: false, follow: true },
};
export default async function Search({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const q = p.q?.trim() || "";
  const businesses = await companies();
  const stories = q
    ? searchArticles(await articles(), q, { companies: businesses })
    : [];
  const results = q ? searchCompanies(businesses, q) : [];
  return (
    <div className="wrap page-space">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>Buscar
      </div>
      <span className="eyebrow">UMA PERGUNTA, NOVAS DESCOBERTAS</span>
      <h1 className="page-title">Busque na Nivelo.</h1>
      <form className="search-form portal-search" action="/buscar">
        <label>
          Assunto, empresa, produto ou serviço
          <input
            name="q"
            defaultValue={q}
            placeholder="Ex.: cerâmica, restaurante, reforma"
            autoFocus
          />
        </label>
        <button className="button">Buscar →</button>
      </form>
      {q ? (
        <>
          <p className="search-summary">
            Resultados para <strong>“{q}”</strong> · ordenados por relevância
          </p>
          <section className="search-results">
            <div className="news-section-heading">
              <h2>
                Conteúdos <span>{stories.length}</span>
              </h2>
              <Link href={`/artigos?q=${encodeURIComponent(q)}`}>
                Filtrar conteúdos →
              </Link>
            </div>
            <div className="article-grid">
              {stories.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
            {!stories.length && (
              <p className="search-empty">
                Nenhuma publicação corresponde a essa busca.
              </p>
            )}
          </section>
          <section className="search-results">
            <div className="news-section-heading">
              <h2>
                Empresas <span>{results.length}</span>
              </h2>
              <Link href={`/empresas?q=${encodeURIComponent(q)}`}>
                Filtrar empresas →
              </Link>
            </div>
            <div className="company-grid">
              {results.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
            {!results.length && (
              <p className="search-empty">
                Nenhuma empresa corresponde a essa busca.
              </p>
            )}
          </section>
        </>
      ) : (
        <div className="search-start">
          <h2>Por onde começar?</h2>
          <div>
            {["Casa Raiz", "cerâmica", "restaurante", "reforma"].map((term) => (
              <Link key={term} href={`/buscar?q=${encodeURIComponent(term)}`}>
                {term} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
