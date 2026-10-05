"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/lib/data";
import { personalizedArticles, articleKind, shortDate } from "@/lib/discovery";
type Reading = { id: number; at: number };
type Preferences = { enabled: boolean; history: Reading[] };
const empty: Preferences = { enabled: false, history: [] };
const Context = createContext<{
  preferences: Preferences;
  update: (value: Preferences) => void;
  items: Article[];
  loaded: boolean;
}>({ preferences: empty, update: () => {}, items: [], loaded: false });
const key = "nivelo-reading-v1";
export function PersonalizationProvider({
  items,
  children,
}: {
  items: Article[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [preferences, setPreferences] = useState<Preferences>(empty);
  const [loaded, setLoaded] = useState(false);
  function update(value: Preferences) {
    setPreferences(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "null");
      if (
        data &&
        typeof data.enabled === "boolean" &&
        Array.isArray(data.history)
      ) {
        setPreferences({
          enabled: data.enabled,
          history: data.history
            .filter(
              (r: Reading) =>
                typeof r.id === "number" &&
                typeof r.at === "number" &&
                Number.isFinite(r.at) &&
                r.at > Date.now() - 30 * 86400000,
            )
            .slice(-20),
        });
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !preferences.enabled) return;
    const article = items.find((a) => pathname === `/artigos/${a.slug}`);
    if (!article || preferences.history.at(-1)?.id === article.id) return;
    update({
      ...preferences,
      history: [
        ...preferences.history.filter((r) => r.id !== article.id),
        { id: article.id, at: Date.now() },
      ].slice(-20),
    });
  }, [pathname, loaded, preferences.enabled, items, preferences.history]);
  return (
    <Context.Provider value={{ preferences, update, items, loaded }}>
      {children}
    </Context.Provider>
  );
}
export function PersonalizedNews() {
  const { preferences, update, items, loaded } = useContext(Context);
  const suggestions = personalizedArticles(
    items,
    preferences.history.map((r) => r.id),
  );
  return (
    <section
      className="personalized-section"
      aria-labelledby="personalized-title"
    >
      <div className="news-section-heading">
        <div>
          <span className="eyebrow">CONTINUE SUA DESCOBERTA</span>
          <h2 id="personalized-title">Para você</h2>
        </div>
        {loaded && preferences.enabled && (
          <button
            className="personalization-control"
            onClick={() => update({ ...preferences, enabled: false })}
          >
            Pausar personalização
          </button>
        )}
      </div>
      {!loaded || !preferences.enabled ? (
        <div className="personalization-intro">
          <p>
            Quer descobrir conteúdos a partir dos assuntos que você lê?
            <br />
            Ative uma seleção que acompanha suas leituras, só neste navegador.
          </p>
          <button
            disabled={!loaded}
            className="button"
            onClick={() => update({ ...preferences, enabled: true })}
          >
            Personalizar minhas leituras →
          </button>
        </div>
      ) : (
        <>
          <div className="personalization-caption">
            <p>
              {preferences.history.length
                ? "Sugestões a partir das suas leituras recentes."
                : "Comece com estas matérias. A seleção muda conforme você lê."}
            </p>
            <button
              className="personalization-control"
              onClick={() => update({ ...preferences, history: [] })}
            >
              Limpar histórico
            </button>
          </div>
          <div className="article-grid">
            {suggestions.map((story) => (
              <article className="article-card" key={story.id}>
                <Link href={`/artigos/${story.slug}`} className="image-link">
                  <img src={story.image} alt="" loading="lazy" />
                </Link>
                <div className="article-info">
                  <span className="eyebrow category">
                    {story.category} · {articleKind(story)}
                  </span>
                  <h3>
                    <Link href={`/artigos/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <p>{story.excerpt}</p>
                  <span className="reading">
                    <time dateTime={story.published_at}>
                      {shortDate(story.published_at)}
                    </time>
                    <span>→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
          {!suggestions.length && (
            <p>
              Você já explorou as publicações disponíveis. Novas leituras
              aparecerão aqui quando forem publicadas.
            </p>
          )}
          <p className="personalization-footnote">
            Seu histórico fica neste navegador. Você pode pausar a seleção ou
            limpar as leituras a qualquer momento.
          </p>
        </>
      )}
    </section>
  );
}
