import Link from "next/link";
import { PersonalizedNews } from "./personalization";
import { articles, companies } from "@/lib/data";
import {
  latestArticles,
  selectHighlights,
  articleKind,
  shortDate,
} from "@/lib/discovery";
import { StoryMeta, ArticleCard } from "./components";
export const dynamic = "force-dynamic";
export default function Home() {
  const all = articles();
  const businesses = companies();
  const highlights = selectHighlights(all);
  const featured = highlights[0];
  const used = new Set(highlights.map((a) => a.id));
  const remaining = latestArticles(all).filter((a) => !used.has(a.id));
  const reserved = new Map<string, number>();
  remaining.forEach((a) =>
    reserved.set(a.category, (reserved.get(a.category) || 0) + 1),
  );
  const latest = remaining
    .filter((a) => {
      if ((reserved.get(a.category) || 0) <= 1) return false;
      reserved.set(a.category, (reserved.get(a.category) || 0) - 1);
      return true;
    })
    .slice(0, 4);
  latest.forEach((a) => used.add(a.id));
  const categories = [...new Set(businesses.map((c) => c.category))];
  const sections = categories.map((category) => ({
    category,
    stories: latestArticles(all)
      .filter((a) => a.category === category && !used.has(a.id))
      .slice(0, 2),
  }));
  return (
    <div className="wrap newsroom">
      <section className="newsroom-heading">
        <div>
          <span className="eyebrow">
            O PORTAL DOS NEGÓCIOS E DE QUEM FAZ ACONTECER
          </span>
          <h1>Empresas em pauta.</h1>
        </div>
        <p>
          Notícias, conversas e informação
          <br />
          para descobrir o que está perto de você.
        </p>
      </section>
      <nav className="edition-nav" aria-label="Editorias">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/artigos?categoria=${encodeURIComponent(category)}`}
          >
            {category}
          </Link>
        ))}
        <Link className="edition-all" href="/artigos">
          Todas as editorias →
        </Link>
      </nav>
      <p className="demo-strip">
        <span>EDIÇÃO DEMONSTRATIVA</span> Empresas, novidades e entrevistas
        fictícias para apresentar o portal.
      </p>
      {featured && (
        <section className="news-lead" aria-label="Manchetes">
          <article className="main-headline">
            <Link className="headline-image" href={`/artigos/${featured.slug}`}>
              <img src={featured.image} alt="" fetchPriority="high" />
              <span className="headline-label">EM PAUTA</span>
            </Link>
            <div className="headline-copy">
              <div className="story-kicker">
                <Link
                  href={`/artigos?categoria=${encodeURIComponent(featured.category)}`}
                >
                  {featured.category}
                </Link>
                <span>{articleKind(featured)}</span>
              </div>
              <h2>
                <Link href={`/artigos/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <StoryMeta article={featured} />
            </div>
          </article>
          <aside className="headline-sidebar">
            <div className="news-section-label">
              <span>OUTROS DESTAQUES</span>
              <span>→</span>
            </div>
            {highlights.slice(1).map((story, i) => (
              <article key={story.id} className="secondary-headline">
                <span className="headline-number">0{i + 1}</span>
                <div>
                  <div className="story-kicker">
                    <Link
                      href={`/artigos?categoria=${encodeURIComponent(story.category)}`}
                    >
                      {story.category}
                    </Link>
                    <span>{articleKind(story)}</span>
                  </div>
                  <h3>
                    <Link href={`/artigos/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <p>{story.excerpt}</p>
                  <StoryMeta article={story} />
                </div>
              </article>
            ))}
            <Link className="news-more" href="/artigos">
              Leia todas as publicações <span>→</span>
            </Link>
          </aside>
        </section>
      )}
      <div className="news-content-grid">
        <section className="latest-news">
          <div className="news-section-heading">
            <div>
              <span className="eyebrow">ACOMPANHE O PORTAL</span>
              <h2>Últimas publicações</h2>
            </div>
            <Link href="/artigos">Ver todas →</Link>
          </div>
          <div className="news-feed">
            {latest.map((story) => (
              <article className="feed-item" key={story.id}>
                <div className="feed-date">
                  <time dateTime={story.published_at}>
                    {shortDate(story.published_at)}
                  </time>
                  <span>{articleKind(story)}</span>
                </div>
                <div className="feed-copy">
                  <Link
                    className="feed-category"
                    href={`/artigos?categoria=${encodeURIComponent(story.category)}`}
                  >
                    {story.category}
                  </Link>
                  <h3>
                    <Link href={`/artigos/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <p>{story.excerpt}</p>
                  <StoryMeta article={story} />
                </div>
                <Link
                  className="feed-image"
                  href={`/artigos/${story.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img src={story.image} alt="" loading="lazy" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <aside className="portal-sidebar">
          <span className="eyebrow">POR TRÁS DAS PAUTAS</span>
          <h2>Conheça os negócios.</h2>
          <p>
            O conteúdo abre a conversa. A página da empresa ajuda você a
            conhecer o resto.
          </p>
          {businesses.map((company) => (
            <Link
              className="business-brief"
              href={`/empresas/${company.slug}`}
              key={company.id}
            >
              <img src={company.image} alt="" loading="lazy" />
              <div>
                <strong>{company.name}</strong>
                <span>{company.category}</span>
                <small>
                  {company.neighborhood}, {company.city}
                </small>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link href="/empresas" className="news-more">
            Explore o diretório <span>→</span>
          </Link>
          <div className="editorial-note">
            <span className="eyebrow">NOSSO OLHAR</span>
            <h3>Informação primeiro.</h3>
            <p>
              Uma notícia conta uma novidade. Um guia ajuda a entender. Uma
              entrevista apresenta um ponto de vista. Sempre com o vínculo com a
              empresa identificado.
            </p>
            <Link href="/sobre">Conheça a proposta editorial →</Link>
          </div>
        </aside>
      </div>
      <section className="topic-section">
        <div className="news-section-heading">
          <div>
            <span className="eyebrow">EXPLORE POR ASSUNTO</span>
            <h2>Cada editoria, uma descoberta.</h2>
          </div>
        </div>
        <div className="topic-grid">
          {sections
            .filter((section) => section.stories.length)
            .map((section) => (
              <section className="topic-column" key={section.category}>
                <div className="topic-heading">
                  <h3>{section.category}</h3>
                  <Link
                    aria-label={`Ver editoria ${section.category}`}
                    href={`/artigos?categoria=${encodeURIComponent(section.category)}`}
                  >
                    →
                  </Link>
                </div>
                {section.stories.map((story) => (
                  <ArticleCard article={story} key={story.id} />
                ))}
              </section>
            ))}
        </div>
      </section>
      <PersonalizedNews />
      <section className="newsroom-invitation">
        <div>
          <span className="eyebrow">SUA EMPRESA NA NIVELO</span>
          <h2>Todo negócio tem uma história para contar.</h2>
        </div>
        <Link className="button" href="/sobre#fazer-parte">
          Conheça a proposta →
        </Link>
      </section>
    </div>
  );
}
