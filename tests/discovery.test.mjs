import test from "node:test";
import assert from "node:assert/strict";
import {
  searchArticles,
  searchCompanies,
  selectHighlights,
  relatedArticles,
  personalizedArticles,
  latestArticles,
} from "../lib/discovery.ts";
import { contentBlocks } from "../lib/editorial.mjs";
const now = new Date("2026-10-06T12:00:00Z");
const article = (id, overrides = {}) => ({
  id,
  slug: `a-${id}`,
  title: `Matéria ${id}`,
  excerpt: "Informação útil",
  category: "Casa",
  company_id: 1,
  image: "/placeholder.svg",
  author: "Redação",
  status: "published",
  published_at: "2026-10-05T12:00:00Z",
  updated_at: "2026-10-05T12:00:00Z",
  content: "",
  kind: "guide",
  tags: [],
  ...overrides,
});
const company = (id, overrides = {}) => ({
  id,
  name: `Empresa ${id}`,
  category: "Casa",
  city: "São Paulo",
  neighborhood: "Pinheiros",
  offerings: "Cerâmica artesanal",
  description: "Loja de objetos",
  tagline: "Objetos de decoração",
  status: "published",
  ...overrides,
});
test("busca combina palavras sem acentos, aceita prefixos e privilegia o nome exato", () => {
  const results = searchCompanies(
    [
      company(1, { name: "Casa Raiz" }),
      company(2, {
        name: "Ateliê",
        description: "Casa Raiz aparece na descrição",
      }),
    ],
    "CASA RAÍZ",
  );
  assert.deepEqual(
    results.map((c) => c.id),
    [1, 2],
  );
  assert.equal(searchCompanies([company(1)], "ceram pinheiros").length, 1);
  assert.equal(searchCompanies([company(1)], "cerâmica inexistente").length, 0);
});
test("localização e categoria permanecem filtros obrigatórios", () => {
  assert.equal(
    searchCompanies([company(1)], "cerâmica", {
      location: "Sao Paulo Pinheiros",
      category: "Casa",
    }).length,
    1,
  );
  assert.equal(
    searchCompanies([company(1)], "cerâmica", { location: "Jardins" }).length,
    0,
  );
});
test("busca de artigos prioriza o título sobre menções no corpo", () => {
  const items = [
    article(1, { title: "Como escolher cerâmica" }),
    article(2, { content: "Como escolher cerâmica para casa" }),
  ];
  assert.deepEqual(
    searchArticles(items, "escolher ceramica", { now }).map((a) => a.id),
    [1, 2],
  );
});
test("busca encontra a empresa relacionada e respeita formato e editoria", () => {
  const items = [article(1, { kind: "news" }), article(2, { kind: "guide" })];
  assert.deepEqual(
    searchArticles(items, "Casa Raiz", {
      companies: [company(1, { name: "Casa Raiz" })],
      kind: "news",
      category: "Casa",
      now,
    }).map((a) => a.id),
    [1],
  );
  assert.equal(searchArticles(items, "", { category: "Saúde", now }).length, 0);
});
test("rascunhos, datas inválidas e publicações futuras não vazam para a busca ou capa", () => {
  const items = [
    article(1),
    article(2, { status: "draft" }),
    article(3, { published_at: "2027-01-01" }),
    article(4, { published_at: "inválida" }),
  ];
  assert.deepEqual(
    latestArticles(items, now).map((a) => a.id),
    [1],
  );
  assert.deepEqual(
    searchArticles(items, "", { now }).map((a) => a.id),
    [1],
  );
  assert.deepEqual(
    selectHighlights(items, 4, now).map((a) => a.id),
    [1],
  );
});
test("capa diversifica empresas e editorias, preservando prioridade editorial", () => {
  const items = [
    article(1, { editorial_priority: 5 }),
    article(2, { editorial_priority: 4 }),
    article(3, {
      category: "Gastronomia",
      company_id: 2,
      editorial_priority: 3,
    }),
    article(4, { category: "Saúde", company_id: 3 }),
  ];
  assert.deepEqual(
    selectHighlights(items, 3, now).map((a) => a.id),
    [1, 3, 4],
  );
  assert.equal(
    new Set(selectHighlights(items, 8, now).map((a) => a.id)).size,
    4,
  );
});
test("recomendações preferem assuntos próximos e não incluem a matéria atual", () => {
  const current = article(1, { tags: ["cerâmica"] });
  const items = [
    current,
    article(2, { tags: ["ceramica"] }),
    article(3, { category: "Gastronomia", company_id: 2 }),
    article(4),
  ];
  assert.deepEqual(
    relatedArticles(current, items, 3, now).map((a) => a.id),
    [2, 4],
  );
});
test("personalização muda com a leitura, exclui matérias lidas e mantém diversidade", () => {
  const items = [
    article(1),
    article(2),
    article(3),
    article(4, { category: "Gastronomia", company_id: 2 }),
    article(5, { category: "Gastronomia", company_id: 2 }),
  ];
  assert.equal(personalizedArticles(items, [4], 3, now)[0].id, 5);
  assert.equal(personalizedArticles(items, [1], 3, now)[0].id, 2);
  assert.ok(
    personalizedArticles(items, [1], 3, now).some(
      (a) => a.category === "Gastronomia",
    ),
  );
  assert.ok(
    !personalizedArticles(items, [1, 2], 3, now).some((a) =>
      [1, 2].includes(a.id),
    ),
  );
  assert.deepEqual(
    personalizedArticles(
      items,
      items.map((a) => a.id),
      3,
      now,
    ),
    [],
  );
});
test("sem histórico válido a seleção tem início útil e resultados estáveis", () => {
  const items = [
    article(1),
    article(2, { category: "Gastronomia", company_id: 2 }),
  ];
  assert.deepEqual(
    personalizedArticles(items, [999], 3, now),
    selectHighlights(items, 3, now),
  );
  assert.deepEqual(
    selectHighlights(items, 4, now),
    selectHighlights(items, 4, now),
  );
});
test("parágrafos após subtítulos continuam como texto de leitura", () => {
  const blocks = contentBlocks(
    "Introdução.\n\n## Como escolher\nEste parágrafo não é um título.",
  );
  assert.deepEqual(
    blocks.map((b) => b.type),
    ["paragraph", "heading", "paragraph"],
  );
  assert.equal(blocks[1].text, "Como escolher");
  assert.ok(blocks[1].id.startsWith("secao-1-"));
});
