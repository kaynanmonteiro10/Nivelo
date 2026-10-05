import { siteUrl } from "@/lib/site";
import Link from "next/link";
import { relatedArticles, articleKind } from "@/lib/discovery";
import { contentBlocks } from "@/lib/editorial.mjs";
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
  const sections = contentBlocks(a.content).filter(
    (block) => block.type === "heading",
  );
  const c = companies().find((c) => c.id === a.company_id);
  const related = relatedArticles(a, articles());
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": a.kind === "news" ? "NewsArticle" : "Article",
          genre: articleKind(a),
          headline: a.title,
          description: a.excerpt,
          image: a.image,
          datePublished: a.published_at,
          dateModified: a.updated_at,
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: "Nivelo" },
          mainEntityOfPage: `${siteUrl}/artigos/${a.slug}`,
        }}
      />
      <div className="wrap page-space">
        <div className="breadcrumb">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/artigos">Notícias & conteúdos</Link>
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
          <div className="article-format">
            <span>{articleKind(a)}</span>
            <span>Conteúdo de demonstração</span>
          </div>
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
          <article
            className="article-prose prose"
            aria-label="Texto da matéria"
          >
            {sections.length > 0 && (
              <details className="article-index">
                <summary>
                  Nesta matéria <span>+</span>
                </summary>
                <ol>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <Paragraphs text={a.content} />
            <div className="editorial-disclosure">
              <span className="eyebrow">SOBRE ESTE CONTEÚDO</span>
              <p>
                Exemplo editorial da Nivelo relacionado ao universo de {c?.name}
                . Empresa fictícia do portal. Notícias e entrevistas são
                ilustrativas; guias têm finalidade informativa.
              </p>
            </div>
          </article>
        </div>
        {c && (
          <aside className="discover-panel">
            <span className="eyebrow">DA LEITURA À DESCOBERTA</span>
            <h2>Da ideia ao encontro.</h2>
            <CompanyCard company={c} />
            <p>Veja o negócio, o que oferece e como encontrá-lo.</p>
          </aside>
        )}
        {related.length > 0 && (
          <section className="related-section">
            <SectionHeading
              title="Para entender mais sobre o assunto."
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
