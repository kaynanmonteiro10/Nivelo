import Link from "next/link";
import { contentBlocks } from "@/lib/editorial.mjs";
import { articleKind, shortDate } from "@/lib/discovery";
import { companies } from "@/lib/data";
import type { Article, Company } from "@/lib/data";
export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <article className={`article-card ${compact ? "compact" : ""}`}>
      <Link href={`/artigos/${article.slug}`} className="image-link">
        <img src={article.image || "/placeholder.svg"} alt="" loading="lazy" />
      </Link>
      <div className="article-info">
        <Link
          className="eyebrow category"
          href={`/artigos?categoria=${encodeURIComponent(article.category)}`}
        >
          {article.category}
        </Link>
        <h3>
          <Link href={`/artigos/${article.slug}`}>{article.title}</Link>
        </h3>
        {!compact && <p>{article.excerpt}</p>}
        <div className="card-publication-meta">
          <span>{articleKind(article)}</span>
          <time dateTime={article.published_at}>
            {shortDate(article.published_at)}
          </time>
          <span>
            {Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))}{" "}
            min de leitura
          </span>
        </div>
      </div>
    </article>
  );
}
export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="company-card">
      <Link href={`/empresas/${company.slug}`} className="image-link">
        <img
          src={company.image || "/placeholder.svg"}
          loading="lazy"
          alt={company.name}
        />
        <span className="image-label">{company.category}</span>
      </Link>
      <div className="company-info">
        <div>
          <h3>
            <Link href={`/empresas/${company.slug}`}>{company.name}</Link>
          </h3>
          <span className="location">
            ⌖ {company.neighborhood ? `${company.neighborhood}, ` : ""}
            {company.city}
          </span>
        </div>
        <Link
          className="circle-arrow"
          href={`/empresas/${company.slug}`}
          aria-label={`Conheça ${company.name}`}
        >
          →
        </Link>
      </div>
      <p>{company.tagline}</p>
    </article>
  );
}
export function SectionHeading({
  label,
  title,
  href,
  link,
}: {
  label?: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {label && <span className="eyebrow">{label}</span>}
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link || "Ver todos"} <span>→</span>
        </Link>
      )}
    </div>
  );
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {contentBlocks(text).map((block) =>
        block.type === "heading" ? (
          <h2 id={block.id} key={block.id}>
            {block.text}
          </h2>
        ) : (
          <p key={block.id}>{block.text}</p>
        ),
      )}
    </>
  );
}

export function StoryMeta({ article }: { article: Article }) {
  const company = companies().find((c) => c.id === article.company_id);
  return (
    <div className="story-meta">
      <span>{article.author}</span>
      <time dateTime={article.published_at}>
        {shortDate(article.published_at)}
      </time>
      {company && (
        <Link href={`/empresas/${company.slug}`}>Sobre {company.name}</Link>
      )}
    </div>
  );
}
