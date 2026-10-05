"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Company, Article } from "@/lib/data";
import {
  slugify,
  monthlyCounts,
  safeImage,
  safeUrl,
} from "@/lib/editorial.mjs";
type Props = {
  initialCompanies: Company[];
  initialArticles: Article[];
  tab: string;
  editId?: number;
  selectedCompany?: number;
};
export default function AdminPrototype({
  initialCompanies,
  initialArticles,
  tab,
  editId,
  selectedCompany,
}: Props) {
  const [businesses, setBusinesses] = useState(initialCompanies);
  const [stories, setStories] = useState(initialArticles);
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("2026-10");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("nivelo-demo");
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.companies) && Array.isArray(data.articles)) {
          setBusinesses(data.companies);
          setStories(data.articles);
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    setMessage("");
    setPreview(false);
    setQuery("");
  }, [tab, editId]);
  function persist(c: Company[], a: Article[]) {
    setBusinesses(c);
    setStories(a);
    try {
      sessionStorage.setItem(
        "nivelo-demo",
        JSON.stringify({ companies: c, articles: a }),
      );
    } catch {}
  }
  const active =
    tab === "empresa" ? "empresas" : tab === "artigo" ? "artigos" : tab;
  const currentCompany = businesses.find((c) => c.id === editId);
  const currentArticle = stories.find((a) => a.id === editId);
  const monthly = monthlyCounts(businesses, stories, month);
  const complete = monthly.filter((c) => c.count >= 2).length;
  function save(
    event: React.FormEvent<HTMLFormElement>,
    kind: "empresa" | "artigo",
  ) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) || "").trim();
    if (kind === "empresa") {
      const name = get("name");
      const company: Company = {
        id: editId || Date.now(),
        name,
        slug: currentCompany?.slug || slugify(name),
        category: get("category"),
        city: get("city"),
        neighborhood: get("neighborhood"),
        tagline: get("tagline"),
        description: get("description"),
        offerings: get("offerings"),
        address: get("address"),
        hours: get("hours"),
        phone: get("phone"),
        email: get("email"),
        website: safeUrl(get("website")),
        image: safeImage(get("image")) || "/placeholder.svg",
        gallery: "",
        status: get("status"),
      };
      persist(
        editId
          ? businesses.map((c) => (c.id === editId ? company : c))
          : [...businesses, company],
        stories,
      );
    } else {
      const title = get("title");
      const article: Article = {
        id: editId || Date.now(),
        slug: currentArticle?.slug || slugify(title),
        title,
        excerpt: get("excerpt"),
        category: get("category"),
        company_id: Number(get("company_id")),
        content: get("content"),
        image: safeImage(get("image")) || "/placeholder.svg",
        author: get("author"),
        status: get("status"),
        published_at: get("published_at")
          ? `${get("published_at")}T12:00:00.000Z`
          : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      persist(
        businesses,
        editId
          ? stories.map((a) => (a.id === editId ? article : a))
          : [...stories, article],
      );
    }
    setMessage(
      "Simulação salva nesta aba do navegador. O portal público continua exibindo os exemplos originais.",
    );
  }
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <span className="eyebrow">ESTÚDIO NIVELO</span>
        {[
          ["painel", "◫", "Visão geral"],
          ["empresas", "⌂", "Empresas"],
          ["artigos", "▤", "Conteúdos"],
        ].map(([id, icon, label]) => (
          <Link
            key={id}
            className={active === id ? "active" : ""}
            href={`/admin?aba=${id}`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
        <p>
          Um espaço para organizar boas histórias.
          <br />
          <br />
          Protótipo visual — sem autenticação e sem banco de dados.
        </p>
      </aside>
      <div className="admin-main">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">ÁREA ADMINISTRATIVA</span>
            <h1>
              {tab === "painel"
                ? "Toda história começa por aqui."
                : tab === "empresas"
                  ? "Empresas da Nivelo"
                  : tab === "artigos"
                    ? "Seu calendário de histórias"
                    : tab === "empresa"
                      ? editId
                        ? "Editar empresa"
                        : "Uma nova empresa"
                      : editId
                        ? "Editar conteúdo"
                        : "Uma nova história"}
            </h1>
            <p>
              {tab === "painel"
                ? "Acompanhe os negócios e a produção editorial do mês."
                : tab === "empresas"
                  ? "Cada negócio, um espaço próprio."
                  : tab === "artigos"
                    ? "Conteúdo útil, consistente e bem acompanhado."
                    : "Dê forma ao próximo encontro."}
            </p>
          </div>
          <span className="prototype-badge">MODO DEMONSTRAÇÃO</span>
        </div>
        {message && (
          <div className="notice" role="status">
            {message}{" "}
            <Link href={`/admin?aba=${active}`}>Voltar à lista →</Link>
          </div>
        )}
        {tab === "painel" && (
          <>
            <div className="stats">
              <div className="stat">
                <span>Empresas no portal</span>
                <strong>{businesses.length.toString().padStart(2, "0")}</strong>
                <small>
                  {businesses.filter((c) => c.status === "published").length}{" "}
                  publicadas
                </small>
              </div>
              <div className="stat">
                <span>Conteúdos publicados no mês</span>
                <strong>
                  {stories
                    .filter(
                      (a) =>
                        a.status === "published" &&
                        a.published_at.startsWith(month),
                    )
                    .length.toString()
                    .padStart(2, "0")}
                </strong>
                <small>Meta: {businesses.length * 2} histórias</small>
              </div>
              <div className="stat">
                <span>Empresas com a meta completa</span>
                <strong>
                  {complete.toString().padStart(2, "0")}{" "}
                  <small>
                    / {businesses.length.toString().padStart(2, "0")}
                  </small>
                </strong>
                <small>
                  {businesses.length - complete} ainda precisam de conteúdo
                </small>
              </div>
            </div>
            <div className="admin-section-heading">
              <h2>Produção editorial do mês</h2>
              <input
                aria-label="Mês de acompanhamento"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Conteúdos publicados</th>
                    <th>Situação</th>
                    <th>Próximo passo</th>
                  </tr>
                </thead>
                <tbody>
                  {monthly.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong>{c.name}</strong>
                        <small>{c.category}</small>
                      </td>
                      <td>
                        <div className="progress">
                          <i className={c.count >= 1 ? "filled" : ""} />
                          <i className={c.count >= 2 ? "filled" : ""} />
                          <span>{c.count} de 2</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status ${c.count < 2 ? "pending" : ""}`}
                        >
                          {c.count >= 2
                            ? "Meta completa"
                            : `${2 - c.count} ${2 - c.count === 1 ? "conteúdo pendente" : "conteúdos pendentes"}`}
                        </span>
                      </td>
                      <td>
                        <Link
                          className="table-link"
                          href={`/admin?aba=artigo&empresa=${c.id}`}
                        >
                          Criar conteúdo →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-section-heading">
              <h2>Histórias mais recentes</h2>
              <Link className="text-link" href="/admin?aba=artigos">
                Ver conteúdos →
              </Link>
            </div>
            <ArticleTable
              stories={stories.slice(0, 3)}
              businesses={businesses}
            />
          </>
        )}
        {tab === "empresas" && (
          <>
            <div className="admin-toolbar">
              <input
                aria-label="Buscar empresa"
                placeholder="Buscar empresa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Link className="button" href="/admin?aba=empresa">
                Cadastrar empresa +
              </Link>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Categoria</th>
                    <th>Localização</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {businesses
                    .filter((c) =>
                      c.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    .map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.name}</strong>
                          <small>{c.tagline}</small>
                        </td>
                        <td>{c.category}</td>
                        <td>{c.city}</td>
                        <td>
                          <span
                            className={`status ${c.status === "draft" ? "draft" : ""}`}
                          >
                            {c.status === "published"
                              ? "Publicada"
                              : "Rascunho"}
                          </span>
                        </td>
                        <td>
                          <Link
                            className="table-link"
                            href={`/admin?aba=empresa&id=${c.id}`}
                          >
                            Editar →
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "artigos" && (
          <>
            <div className="admin-toolbar">
              <input
                aria-label="Buscar conteúdo"
                placeholder="Buscar título ou empresa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Link className="button" href="/admin?aba=artigo">
                Escrever conteúdo +
              </Link>
            </div>
            <ArticleTable
              stories={stories.filter((a) =>
                (
                  a.title +
                  " " +
                  businesses.find((c) => c.id === a.company_id)?.name
                )
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )}
              businesses={businesses}
            />
          </>
        )}
        {tab === "empresa" && (
          <form key={`company-${editId}`} onSubmit={(e) => save(e, "empresa")}>
            <div className="form-grid">
              <Field
                name="name"
                label="Nome da empresa"
                value={currentCompany?.name}
                required
              />
              <Field
                name="category"
                label="Categoria"
                value={currentCompany?.category}
                required
                placeholder="Ex.: gastronomia, varejo, saúde"
              />
              <Field
                name="city"
                label="Cidade"
                value={currentCompany?.city}
                required
              />
              <Field
                name="neighborhood"
                label="Bairro"
                value={currentCompany?.neighborhood}
              />
              <Field
                name="tagline"
                label="Uma frase sobre o negócio"
                value={currentCompany?.tagline}
                wide
                required
              />
              <Field
                name="description"
                label="A história e a proposta da empresa"
                value={currentCompany?.description}
                wide
                multiline
                required
              />
              <Field
                name="offerings"
                label="Produtos e serviços"
                value={currentCompany?.offerings}
                wide
                multiline
                required
                note="Um item por linha. Adapte ao tipo de negócio."
              />
              <Field
                name="address"
                label="Endereço"
                value={currentCompany?.address}
              />
              <Field
                name="hours"
                label="Horários de funcionamento"
                value={currentCompany?.hours}
                multiline
              />
              <Field
                name="phone"
                label="Telefone"
                value={currentCompany?.phone}
              />
              <Field
                name="email"
                label="E-mail"
                value={currentCompany?.email}
                type="email"
              />
              <Field
                name="website"
                label="Site"
                value={currentCompany?.website}
                type="url"
              />
              <Field
                name="image"
                label="URL da imagem de capa"
                value={currentCompany?.image}
              />
              <label>
                Status
                <select
                  name="status"
                  defaultValue={currentCompany?.status || "draft"}
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicada (simulação)</option>
                </select>
              </label>
            </div>
            <div className="form-actions">
              <p>As alterações são apenas uma simulação local.</p>
              <button className="button">Salvar demonstração →</button>
            </div>
          </form>
        )}
        {tab === "artigo" && (
          <form key={`article-${editId}`} onSubmit={(e) => save(e, "artigo")}>
            <div className="editor-tabs">
              <button
                type="button"
                className={!preview ? "selected" : ""}
                onClick={() => setPreview(false)}
              >
                Escrever
              </button>
              <button
                type="button"
                className={preview ? "selected" : ""}
                onClick={() => setPreview(true)}
              >
                Prévia do texto
              </button>
            </div>
            <div
              className="form-grid"
              style={preview ? { display: "none" } : undefined}
            >
              <Field
                name="title"
                label="Título"
                value={currentArticle?.title}
                required
                wide
                onChange={setPreviewTitle}
              />
              <Field
                name="excerpt"
                label="Linha fina / descrição para busca"
                value={currentArticle?.excerpt}
                required
                multiline
                wide
              />
              <label>
                Empresa relacionada
                <select
                  name="company_id"
                  defaultValue={
                    currentArticle?.company_id ||
                    selectedCompany ||
                    businesses[0]?.id
                  }
                  required
                >
                  {businesses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                name="category"
                label="Assunto"
                value={currentArticle?.category}
                required
              />
              <Field
                name="author"
                label="Autoria"
                value={currentArticle?.author || "Redação Nivelo"}
                required
              />
              <Field
                name="published_at"
                label="Data de publicação"
                value={
                  currentArticle?.published_at.slice(0, 10) || "2026-10-05"
                }
                type="date"
                required
              />
              <Field
                name="content"
                label="Texto da matéria"
                value={currentArticle?.content}
                required
                wide
                multiline
                large
                note="Separe os parágrafos com uma linha em branco. Use ## antes de um subtítulo."
                onChange={setPreviewContent}
              />
              <Field
                name="image"
                label="URL da imagem de capa"
                value={currentArticle?.image}
                wide
              />
              <label>
                Status
                <select
                  name="status"
                  defaultValue={currentArticle?.status || "draft"}
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado (simulação)</option>
                </select>
              </label>
            </div>
            {preview && (
              <div className="admin-preview">
                <span className="eyebrow">PRÉVIA DO CONTEÚDO</span>
                <h2>
                  {previewTitle ||
                    currentArticle?.title ||
                    "O título da sua próxima história"}
                </h2>
                <p>
                  {previewContent ||
                    currentArticle?.content ||
                    "Comece a escrever para visualizar seu texto aqui."}
                </p>
              </div>
            )}
            <div className="form-actions">
              <p>A publicação real será conectada ao Supabase depois.</p>
              <button className="button">Salvar demonstração →</button>
            </div>
          </form>
        )}
        <p className="small-muted" style={{ marginTop: 35 }}>
          Demonstração visual · alterações duram apenas nesta aba ·{" "}
          <button
            type="button"
            style={{
              border: 0,
              background: "none",
              padding: 0,
              textDecoration: "underline",
              color: "inherit",
              fontSize: "inherit",
            }}
            onClick={() => {
              persist(initialCompanies, initialArticles);
              setMessage("Exemplos originais restaurados.");
            }}
          >
            Restaurar exemplos
          </button>
        </p>
      </div>
    </div>
  );
}
function Field({
  name,
  label,
  value,
  wide,
  multiline,
  required,
  placeholder,
  note,
  type = "text",
  large,
  onChange,
}: {
  name: string;
  label: string;
  value?: string;
  wide?: boolean;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  note?: string;
  type?: string;
  large?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={wide ? "wide" : ""}>
      {label}
      {multiline ? (
        <textarea
          name={name}
          defaultValue={value}
          rows={large ? 16 : 4}
          required={required}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          name={name}
          defaultValue={value}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {note && <small>{note}</small>}
    </label>
  );
}
function ArticleTable({
  stories,
  businesses,
}: {
  stories: Article[];
  businesses: Company[];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Conteúdo</th>
            <th>Empresa</th>
            <th>Publicação</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {stories.map((a) => (
            <tr key={a.id}>
              <td>
                <strong>{a.title}</strong>
                <small>{a.category}</small>
              </td>
              <td>{businesses.find((c) => c.id === a.company_id)?.name}</td>
              <td>
                {new Date(a.published_at).toLocaleDateString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })}
              </td>
              <td>
                <span
                  className={`status ${a.status === "draft" ? "draft" : ""}`}
                >
                  {a.status === "published" ? "Publicado" : "Rascunho"}
                </span>
              </td>
              <td>
                <Link
                  className="table-link"
                  href={`/admin?aba=artigo&id=${a.id}`}
                >
                  Editar →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!stories.length && (
        <div className="admin-empty">Nenhum conteúdo encontrado.</div>
      )}
    </div>
  );
}
