import { slugify, safeImage, safeUrl } from "./editorial.mjs";

export type RecordKind = "empresa" | "artigo";

export function validateRecord(kind: RecordKind, form: FormData) {
  function text(key: string, max = 500, required = false) {
    const value = String(form.get(key) || "").trim();
    if (value.length > max || (required && !value))
      throw new Error(`Confira o campo ${key}: ${required ? "obrigatório, " : ""}máximo de ${max} caracteres.`);
    return value;
  }
  const status = text("status");
  if (!["draft", "published"].includes(status)) throw new Error("Status inválido.");
  const imageInput = text("image", 2000);
  const image = safeImage(imageInput);
  if (imageInput && !image) throw new Error("Use uma URL http/https ou um caminho local para a imagem.");
  const shared = { status, image: image || "/placeholder.svg", category: text("category", 100, true) };
  if (kind === "empresa") {
    const name = text("name", 200, true);
    const websiteInput = text("website", 2000);
    const website = safeUrl(websiteInput);
    if (websiteInput && !website) throw new Error("O site precisa de uma URL http ou https válida.");
    const email = text("email", 254);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Confira o e-mail.");
    const gallery = text("gallery", 20000).split("\n").map((v) => v.trim()).filter(Boolean);
    if (gallery.length > 10 || gallery.some((url) => !safeImage(url)))
      throw new Error("A galeria aceita até 10 URLs de imagens válidas, uma por linha.");
    const slug = slugify(name).slice(0, 180).replace(/-+$/, "");
    if (!slug) throw new Error("Use letras ou números no nome.");
    return { ...shared, name, slug, city: text("city", 150, true),
      neighborhood: text("neighborhood", 150), tagline: text("tagline", 300, true),
      description: text("description", 20000, true), offerings: text("offerings", 10000, true),
      address: text("address", 500), hours: text("hours", 2000), phone: text("phone", 50),
      email, website, gallery: gallery.join("\n") };
  }
  if (kind !== "artigo") throw new Error("Tipo de registro inválido.");
  const title = text("title", 200, true);
  const slug = slugify(title).slice(0, 180).replace(/-+$/, "");
  if (!slug) throw new Error("Use letras ou números no título.");
  const company_id = Number(text("company_id", 20, true));
  if (!Number.isSafeInteger(company_id) || company_id < 1) throw new Error("Selecione uma empresa.");
  const kindValue = text("kind");
  if (!["news", "interview", "guide"].includes(kindValue)) throw new Error("Formato inválido.");
  const editorial_priority = Number(text("editorial_priority", 1, true));
  if (!Number.isInteger(editorial_priority) || editorial_priority < 0 || editorial_priority > 5)
    throw new Error("A prioridade deve estar entre 0 e 5.");
  const date = text("published_at", 10, true);
  const parsedDate = new Date(`${date}T03:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date)
    throw new Error("Data de publicação inválida.");
  const tags = [...new Set(text("tags", 1000).split(",").map((t) => t.trim()).filter(Boolean))];
  if (tags.length > 15 || tags.some((t) => t.length > 60)) throw new Error("Use até 15 assuntos de até 60 caracteres.");
  return { ...shared, title, slug, excerpt: text("excerpt", 500, true),
    content: text("content", 100000, true), author: text("author", 150, true),
    company_id, kind: kindValue, tags, editorial_priority, published_at: parsedDate.toISOString() };
}
