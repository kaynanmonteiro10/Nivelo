import { siteUrl } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyBySlug, articles } from "@/lib/data";
import {
  ArticleCard,
  JsonLd,
  Paragraphs,
  SectionHeading,
} from "../../components";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = companyBySlug(slug);
  return c
    ? {
        title: `${c.name} — ${c.category} em ${c.city}`,
        description: c.tagline,
        alternates: { canonical: `/empresas/${c.slug}` },
        openGraph: { images: [c.image] },
      }
    : {};
}
export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = companyBySlug(slug);
  if (!c) notFound();
  const related = articles().filter((a) => a.company_id === c.id);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: c.name,
          description: c.tagline,
          image: c.image,
          url: `${siteUrl}/empresas/${c.slug}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: c.address,
            addressLocality: c.city,
            addressCountry: "BR",
          },
          ...(c.phone ? { telephone: c.phone } : {}),
          ...(c.email ? { email: c.email } : {}),
        }}
      />
      <div className="wrap page-space">
        <div className="breadcrumb">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/empresas">Empresas</Link>
          <span>/</span>
          {c.name}
        </div>
        <div className="company-title">
          <div>
            <Link
              className="eyebrow category"
              href={`/empresas?categoria=${encodeURIComponent(c.category)}`}
            >
              {c.category}
            </Link>
            <h1 className="page-title">{c.name}</h1>
            <p className="page-description">{c.tagline}</p>
          </div>
          <span className="location">
            ⌖ {c.neighborhood}, {c.city}
          </span>
        </div>
        <img
          className="company-hero"
          src={c.image || "/placeholder.svg"}
          alt={`Conheça ${c.name}`}
          fetchPriority="high"
        />
        <div className="company-body">
          <div>
            <span className="eyebrow">POR DENTRO DO NEGÓCIO</span>
            <h2>Prazer, {c.name}.</h2>
            <div className="prose">
              <Paragraphs text={c.description} />
            </div>
            <h2>O que você encontra aqui</h2>
            <ul className="offerings">
              {c.offerings
                .split("\n")
                .filter(Boolean)
                .map((o) => (
                  <li key={o}>
                    {o}
                    <span>→</span>
                  </li>
                ))}
            </ul>
            {c.gallery && (
              <>
                <h2>Um pouco mais de perto</h2>
                <div className="gallery">
                  {c.gallery
                    .split("\n")
                    .filter(Boolean)
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${c.name}, foto ${i + 1}`}
                        loading="lazy"
                      />
                    ))}
                </div>
              </>
            )}
          </div>
          <aside className="contact-panel">
            <span className="eyebrow">PLANEJE SUA VISITA</span>
            <h3>Vamos nos encontrar?</h3>
            {c.address && (
              <div>
                <h4>Localização</h4>
                <p>{c.address}</p>
                <a
                  className="text-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address + " " + c.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no mapa →
                </a>
              </div>
            )}
            {c.hours && (
              <div>
                <h4>Horários</h4>
                <p className="preserve-lines">{c.hours}</p>
              </div>
            )}
            {(c.phone || c.email || c.website) && (
              <div>
                <h4>Fale com a empresa</h4>
                {c.phone && (
                  <a
                    className="button"
                    href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                  >
                    {c.phone} →
                  </a>
                )}
                {c.email && (
                  <a className="contact-link" href={`mailto:${c.email}`}>
                    {c.email} →
                  </a>
                )}
                {c.website && (
                  <a
                    className="contact-link"
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar site →
                  </a>
                )}
              </div>
            )}
            <p className="small-muted">
              Confirme horários e disponibilidade diretamente com a empresa
              antes da visita.
            </p>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="related-section">
            <SectionHeading
              label="CONHECIMENTO QUE CONECTA"
              title={`Histórias relacionadas a ${c.name}`}
              href="/artigos"
              link="Todos os conteúdos"
            />
            <div className="article-grid">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
