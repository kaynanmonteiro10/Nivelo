import test from "node:test";
import assert from "node:assert/strict";
import { validateRecord } from "../lib/admin-validation.ts";
import { monthlyCounts, safeImage } from "../lib/editorial.mjs";
import { supabaseConfig } from "../lib/supabase/config.ts";

const company = { name: "Loja Nova", category: "Varejo", city: "Recife",
  tagline: "Peças para sua casa", description: "Uma loja local.", offerings: "Louças",
  status: "draft", image: "/placeholder.svg" };
const story = { title: "Como escolher uma peça", excerpt: "Um guia útil.",
  category: "Casa", content: "Explicação com referências.", company_id: "1",
  kind: "guide", tags: "casa, decoração, casa", editorial_priority: "3",
  published_at: "2026-10-05", author: "Redação Nivelo", status: "published" };
const form = (values) => {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
};

test("company fields and slug are validated; client cannot inject identity or privileges", () => {
  const result = validateRecord("empresa", form({ ...company, id: "999", user_id: "admin", slug: "spoofed" }));
  assert.equal(result.slug, "loja-nova");
  assert.equal(result.status, "draft");
  assert.equal("id" in result, false);
  assert.equal("user_id" in result, false);
  assert.throws(() => validateRecord("empresa", form({ ...company, name: "", status: "published" })));
  assert.throws(() => validateRecord("empresa", form({ ...company, status: "admin" })));
});

test("rejects unsafe URLs, invalid gallery and malformed email", () => {
  for (const extra of [{ website: "javascript:alert(1)" }, { image: "data:text/html,bad" },
    { gallery: "https://example.org/photo.jpg\njavascript:bad" }, { email: "invalid" }]) {
    assert.throws(() => validateRecord("empresa", form({ ...company, ...extra })));
  }
  assert.equal(safeImage("//example.org/tracker"), "");
  assert.equal(validateRecord("empresa", form({ ...company, gallery: "/images/a.jpg\nhttps://example.org/b.jpg" })).gallery,
    "/images/a.jpg\nhttps://example.org/b.jpg");
});

test("articles require valid company, format, priority, content and real calendar dates", () => {
  const result = validateRecord("artigo", form(story));
  assert.equal(result.published_at, "2026-10-05T03:00:00.000Z");
  assert.deepEqual(result.tags, ["casa", "decoração"]);
  for (const extra of [{ company_id: "0" }, { company_id: "1.5" }, { kind: "ad" },
    { editorial_priority: "6" }, { published_at: "2026-02-30" }, { content: "" }]) {
    assert.throws(() => validateRecord("artigo", form({ ...story, ...extra })));
  }
});

test("monthly delivery counts exclude drafts and future dates and use Brasília month boundary", () => {
  const rows = [
    { company_id: 1, status: "published", published_at: "2026-10-01T02:00:00Z" },
    { company_id: 1, status: "published", published_at: "2026-10-02T03:00:00Z" },
    { company_id: 1, status: "published", published_at: "2026-10-08T03:00:00Z" },
    { company_id: 1, status: "draft", published_at: "2026-10-03T03:00:00Z" },
    { company_id: 1, status: "published", published_at: "invalid" },
  ];
  const now = new Date("2026-10-05T12:00:00Z");
  assert.equal(monthlyCounts([{ id: 1 }], rows, "2026-10", now)[0].count, 1);
  assert.equal(monthlyCounts([{ id: 1 }], rows, "2026-09", now)[0].count, 1);
});

test("unconfigured mode is explicit and partial configuration fails instead of silently using demos", () => {
  const savedUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const savedKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  try {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    assert.equal(supabaseConfig(), null);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    assert.throws(() => supabaseConfig(), /incompleta/);
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-publishable";
    assert.equal(supabaseConfig().url, "https://example.supabase.co");
  } finally {
    if (savedUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = savedUrl;
    if (savedKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = savedKey;
  }
});
