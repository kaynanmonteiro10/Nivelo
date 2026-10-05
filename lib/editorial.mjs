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
 * @returns {(T & {count:number})[]}
 */
export function monthlyCounts(companies, articles, month) {
  return companies.map((company) => ({
    ...company,
    count: articles.filter(
      (article) =>
        article.company_id === company.id &&
        article.status === "published" &&
        article.published_at?.slice(0, 7) === month,
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
  if (/^\/[a-zA-Z0-9/_\-.]+$/.test(value)) return value;
  return safeUrl(value);
}
