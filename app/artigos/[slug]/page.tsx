import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, companies, articles } from "@/lib/data";
import {
  Paragraphs,
  JsonLd,
  CompanyCard,
  ArticleCard,
  SectionHeading,
} from "../../components";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  return a
    ? {
        title: a.title,
        description: a.excerpt,
        alternates: { canonical: `/artigos/${a.slug}` },
        openGraph: {
          type: "article",
          publishedTime: a.published_at,
          modifiedTime: a.updated_at,
          images: [a.image],
        },
      }
    : {};
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const c = companies().find((c) => c.id === a.company_id);
  const related = articles()
    .filter((b) => b.id !== a.id)
    .slice(0, 3);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          image: a.image,
          datePublished: a.published_at,
          dateModified: a.updated_at,
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: "Nivelo" },
          mainEntityOfPage: `${process.env.SITE_URL || "http://localhost:3000"}/artigos/${a.slug}`,
        }}
      />
      <div className="wrap page-space">
        <div className="breadcrumb">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/artigos">Histórias & ideias</Link>
          <span>/</span>
          {a.category}
        </div>
        <header className="article-header">
          <Link
            className="eyebrow category"
            href={`/artigos?categoria=${encodeURIComponent(a.category)}`}
          >
            {a.category}
          </Link>
          <h1>{a.title}</h1>
          <p>{a.excerpt}</p>
          <div className="byline">
            <span>Por {a.author}</span>
            <span>
              {new Date(a.published_at).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "America/Sao_Paulo",
              })}
            </span>
            <span>
              {Math.max(1, Math.ceil(a.content.split(/\s+/).length / 200))} min
              de leitura
            </span>
          </div>
        </header>
        <img
          className="article-hero"
          src={a.image || "/placeholder.svg"}
          alt=""
          fetchPriority="high"
        />
        <div className="article-body">
          <div className="article-prose prose">
            <Paragraphs text={a.content} />
            <div className="editorial-disclosure">
              <span className="eyebrow">SOBRE ESTE CONTEÚDO</span>
              <p>
                Produção editorial da Nivelo relacionada ao universo de{" "}
                {c?.name}. A empresa integra o portal; o conteúdo tem finalidade
                informativa.
              </p>
            </div>
          </div>
          {c && (
            <aside className="discover-panel">
              <span className="eyebrow">DA LEITURA À DESCOBERTA</span>
              <h3>Conheça quem faz parte desse universo.</h3>
              <CompanyCard company={c} />
              <p>Veja o negócio, o que oferece e como encontrá-lo.</p>
            </aside>
          )}
        </div>
        {related.length > 0 && (
          <section className="related-section">
            <SectionHeading
              title="Continue sua descoberta."
              href="/artigos"
              link="Todas as histórias"
            />
            <div className="article-grid">
              {related.map((b) => (
                <ArticleCard article={b} key={b.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
