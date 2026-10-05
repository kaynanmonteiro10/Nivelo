export function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
/** @template {{id:number}} T
 * @param {T[]} companies
 * @param {{company_id:number,status:string,published_at:string}[]} articles
 * @param {string} month
 * @param {Date} [now]
 * @returns {(T & {count:number})[]}
 */
export function monthlyCounts(companies, articles, month, now = new Date()) {
  return companies.map((company) => ({
    ...company,
    count: articles.filter(
      (article) =>
        article.company_id === company.id &&
        article.status === "published" &&
        Number.isFinite(Date.parse(article.published_at)) &&
        Date.parse(article.published_at) <= now.getTime() &&
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit",
        }).format(new Date(article.published_at)) === month,
    ).length,
  }));
}
export function safeUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
export function safeImage(value) {
  if (!value) return "";
  if (/^\/(?!\/)[a-zA-Z0-9/_\-.]+$/.test(value)) return value;
  return safeUrl(value);
}

/** @param {string} text
 * @returns {{type:string,text:string,id:string}[]}
 */
export function contentBlocks(text) {
  return text
    .split(/\n\s*\n/)
    .flatMap((block) => {
      const [first, ...rest] = block.split("\n");
      if (first.startsWith("## "))
        return [
          { type: "heading", text: first.slice(3) },
          ...(rest.join("\n").trim()
            ? [{ type: "paragraph", text: rest.join("\n") }]
            : []),
        ];
      return [{ type: "paragraph", text: block }];
    })
    .filter((block) => block.text.trim())
    .map((block, index) => ({
      ...block,
      id: `secao-${index}-${slugify(block.text)}`,
    }));
}
