import Link from "next/link";
import { articles, companies } from "@/lib/data";
import { ArticleCard, CompanyCard, SectionHeading } from "./components";
export default function Home() {
  const stories = articles();
  const businesses = companies();
  const featured = stories[0];
  const categories = [...new Set(businesses.map((c) => c.category))];
  return (
    <>
      <div className="wrap">
        <section className="intro">
          <div>
            <span className="eyebrow">UM LUGAR PARA DESCOBRIR</span>
            <h1>
              Boas histórias.
              <br />
              Novas <em>conexões.</em>
            </h1>
          </div>
          <div className="intro-right">
            <p>
              Conheça negócios, explore ideias e encontre
              <br className="desktop" /> o que faz sentido para você.
            </p>
            <Link className="text-link" href="/empresas">
              Explore a Nivelo <span>→</span>
            </Link>
          </div>
        </section>
        <section className="lead-grid" aria-label="Destaques editoriais">
          {featured ? (
            <article className="lead-story">
              <Link href={`/artigos/${featured.slug}`} className="lead-photo">
                <img
                  src={featured.image || "/placeholder.svg"}
                  alt=""
                  fetchPriority="high"
                />
                <span className="featured-badge">
                  <span /> EM DESTAQUE
                </span>
                <div className="lead-caption">
                  <span className="eyebrow">{featured.category}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <span className="lead-more">
                    Leia a história <span>→</span>
                  </span>
                </div>
              </Link>
            </article>
          ) : (
            <div className="empty">As primeiras histórias estão a caminho.</div>
          )}
          <aside className="side-stories">
            <div className="aside-heading">
              <span className="eyebrow">NO NOSSO RADAR</span>
              <span>←</span>
            </div>
            {stories.slice(1, 4).map((a) => (
              <ArticleCard key={a.id} article={a} compact />
            ))}
            <Link className="text-link aside-more" href="/artigos">
              Todas as histórias <span>→</span>
            </Link>
          </aside>
        </section>
        <section className="category-strip">
          <span className="eyebrow">SIGA SUA CURIOSIDADE</span>
          <div>
            {categories.map((c, i) => (
              <Link
                key={c}
                href={`/empresas?categoria=${encodeURIComponent(c)}`}
              >
                <span className="category-symbol">
                  {["⌂", "♧", "☼", "◫"][i % 4]}
                </span>
                {c}
                <span>→</span>
              </Link>
            ))}
            <Link className="all-categories" href="/empresas">
              Todas as categorias <span>→</span>
            </Link>
          </div>
        </section>
        <section className="business-section">
          <SectionHeading
            label="NEGÓCIOS QUE VALEM A DESCOBERTA"
            title="Perto de você. Longe do óbvio."
            href="/empresas"
            link="Explore empresas"
          />
          <div className="company-grid">
            {businesses.slice(0, 4).map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </div>
        </section>
        <section className="editorial-banner">
          <div className="banner-mark">
            n<span>→</span>
          </div>
          <div>
            <span className="eyebrow">CONTEÚDO QUE APROXIMA</span>
            <h2>
              Por trás de cada negócio,
              <br />
              há algo para conhecer.
            </h2>
            <p>
              Vamos além do endereço. Conectamos histórias, conhecimento
              <br className="desktop" /> e empresas para ajudar você a fazer
              boas escolhas.
            </p>
          </div>
          <Link className="button light" href="/sobre">
            Conheça a Nivelo →
          </Link>
        </section>
        <section className="latest-section">
          <SectionHeading
            label="PARA LER COM CALMA"
            title="Ideias para o seu dia a dia."
            href="/artigos"
            link="Mais histórias"
          />
          <div className="article-grid">
            {stories.slice(1, 4).map((a) => (
              <ArticleCard article={a} key={a.id} />
            ))}
          </div>
        </section>
      </div>
      <section className="invitation">
        <div className="wrap">
          <div>
            <span className="eyebrow">SUA EMPRESA TEM UMA HISTÓRIA</span>
            <h2>Vamos contá-la juntos?</h2>
            <p>Um espaço para o seu negócio. Conteúdo para criar conexões.</p>
          </div>
          <Link className="button" href="/sobre#fazer-parte">
            Faça parte da Nivelo →
          </Link>
        </div>
      </section>
    </>
  );
}
