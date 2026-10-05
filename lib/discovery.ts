import type { Article, Company } from "./data";
export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
const stopwords = new Set([
  "a",
  "o",
  "as",
  "os",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "em",
  "um",
  "uma",
  "para",
  "com",
  "no",
  "na",
]);
function terms(query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  const meaningful = words.filter((t) => !stopwords.has(t));
  return meaningful.length ? meaningful : words;
}
function match(text: string, term: string) {
  return text
    .split(" ")
    .some(
      (word) => word === term || (term.length >= 3 && word.startsWith(term)),
    );
}
function relevance(query: string, fields: [string, number][]) {
  const words = terms(query);
  if (!words.length) return 0;
  const normalized = fields.map(
    ([text, weight]) => [normalize(text), weight] as const,
  );
  if (!words.every((term) => normalized.some(([text]) => match(text, term))))
    return -1;
  return (
    words.reduce(
      (score, term) =>
        score +
        Math.max(
          ...normalized
            .filter(([text]) => match(text, term))
            .map(([, weight]) => weight),
        ),
      0,
    ) +
    Math.max(
      0,
      ...normalized
        .filter(([text]) => text === normalize(query))
        .map(([, weight]) => weight * 4),
    )
  );
}
export function visibleArticles(items: Article[], now = new Date()) {
  return items.filter(
    (a) =>
      a.status === "published" &&
      Number.isFinite(Date.parse(a.published_at)) &&
      Date.parse(a.published_at) <= now.getTime(),
  );
}
export function latestArticles(items: Article[], now = new Date()) {
  return visibleArticles(items, now).sort(
    (a, b) =>
      Date.parse(b.published_at) - Date.parse(a.published_at) || a.id - b.id,
  );
}
export function searchArticles(
  items: Article[],
  query = "",
  options: {
    category?: string;
    kind?: string;
    companies?: Company[];
    now?: Date;
  } = {},
) {
  return visibleArticles(items, options.now)
    .filter(
      (a) =>
        (!options.category || a.category === options.category) &&
        (!options.kind || (a.kind || "guide") === options.kind),
    )
    .map((a) => ({
      article: a,
      score: relevance(query, [
        [a.title, 25],
        [a.excerpt, 12],
        [a.category, 10],
        [(a.tags || []).join(" "), 14],
        [options.companies?.find((c) => c.id === a.company_id)?.name || "", 16],
        [a.content, 3],
      ]),
    }))
    .filter((r) => r.score >= 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.article.published_at) -
          Date.parse(a.article.published_at) ||
        a.article.id - b.article.id,
    )
    .map((r) => r.article);
}
export function searchCompanies(
  items: Company[],
  query = "",
  options: { category?: string; location?: string } = {},
) {
  return items
    .filter(
      (c) =>
        c.status === "published" &&
        (!options.category || c.category === options.category) &&
        (!options.location ||
          terms(options.location).every((term) =>
            match(normalize(c.city + " " + c.neighborhood), term),
          )),
    )
    .map((c) => ({
      company: c,
      score: relevance(query, [
        [c.name, 35],
        [c.offerings, 20],
        [c.category, 15],
        [c.city + " " + c.neighborhood, 12],
        [c.tagline, 10],
        [c.description, 5],
      ]),
    }))
    .filter((r) => r.score >= 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.company.name.localeCompare(b.company.name, "pt-BR"),
    )
    .map((r) => r.company);
}
function freshness(article: Article, now: Date) {
  return Math.max(
    0,
    20 - (now.getTime() - Date.parse(article.published_at)) / 86400000,
  );
}
export function selectHighlights(
  items: Article[],
  limit = 4,
  now = new Date(),
) {
  const pool = visibleArticles(items, now)
    .map((a) => ({
      article: a,
      score:
        Math.max(0, Math.min(5, a.editorial_priority || 0)) * 12 +
        freshness(a, now),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.article.published_at) -
          Date.parse(a.article.published_at) ||
        a.article.id - b.article.id,
    );
  const selected: Article[] = [];
  const companies = new Set<number>();
  const categories = new Set<string>();
  for (const row of pool) {
    if (selected.length >= limit) break;
    if (
      companies.has(row.article.company_id) ||
      categories.has(row.article.category)
    )
      continue;
    selected.push(row.article);
    companies.add(row.article.company_id);
    categories.add(row.article.category);
  }
  for (const row of pool) {
    if (selected.length >= limit) break;
    if (!selected.some((a) => a.id === row.article.id))
      selected.push(row.article);
  }
  return selected;
}
export function relatedArticles(
  current: Article,
  items: Article[],
  limit = 3,
  now = new Date(),
) {
  const tags = new Set((current.tags || []).map(normalize));
  return visibleArticles(items, now)
    .filter((a) => a.id !== current.id)
    .map((a) => ({
      article: a,
      score:
        (a.category === current.category ? 60 : 0) +
        (a.company_id === current.company_id ? 25 : 0) +
        (a.tags || []).filter((tag) => tags.has(normalize(tag))).length * 18 +
        freshness(a, now) / 10,
    }))
    .filter((row) => row.score >= 18)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.article.published_at) -
          Date.parse(a.article.published_at) ||
        a.article.id - b.article.id,
    )
    .slice(0, limit)
    .map((row) => row.article);
}
export const kindLabels: Record<string, string> = {
  news: "Notícia",
  interview: "Entrevista",
  guide: "Guia",
};
export function articleKind(article: Article) {
  return kindLabels[article.kind || "guide"] || "Guia";
}
export function shortDate(date: string) {
  return new Date(date)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      timeZone: "America/Sao_Paulo",
    })
    .replace(".", "");
}

export function personalizedArticles(
  items: Article[],
  history: number[],
  limit = 3,
  now = new Date(),
) {
  const available = visibleArticles(items, now);
  const seen = new Set(history);
  const reads = history
    .slice(-12)
    .map((id) => items.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a));
  if (!reads.length) return selectHighlights(available, limit, now);
  const scores = available
    .filter((a) => !seen.has(a.id))
    .map((article) => ({
      article,
      score:
        reads.reduce((total, read, index) => {
          const weight = (index + 1) / reads.length;
          const tags = new Set((read.tags || []).map(normalize));
          return (
            total +
            weight *
              ((read.category === article.category ? 20 : 0) +
                (article.tags || []).filter((tag) => tags.has(normalize(tag)))
                  .length *
                  10)
          );
        }, 0) +
        freshness(article, now) / 10,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.article.published_at) -
          Date.parse(a.article.published_at) ||
        a.article.id - b.article.id,
    );
  const selected: Article[] = [];
  const counts = new Map<string, number>();
  for (const row of scores) {
    if (selected.length >= limit) break;
    if ((counts.get(row.article.category) || 0) >= 2) continue;
    selected.push(row.article);
    counts.set(
      row.article.category,
      (counts.get(row.article.category) || 0) + 1,
    );
  }
  for (const row of scores) {
    if (selected.length >= limit) break;
    if (!selected.some((a) => a.id === row.article.id))
      selected.push(row.article);
  }
  return selected;
}
