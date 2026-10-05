"use server";
import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { validateRecord, type RecordKind } from "@/lib/admin-validation";
import type { Company, Article } from "@/lib/data";

export async function saveRecord(kind: RecordKind, id: number | undefined, form: FormData): Promise<
  { ok: true; record: Company | Article } | { ok: false; error: string }
> {
  const db = await requireEditor();
  if (!["empresa", "artigo"].includes(kind) || (id !== undefined && (!Number.isSafeInteger(id) || id < 1)))
    return { ok: false, error: "Registro inválido." };
  let values: Record<string, unknown>;
  try { values = validateRecord(kind, form); }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Confira os campos." }; }
  const table = kind === "empresa" ? "companies" : "articles";
  if (id !== undefined) {
    const { data: existing, error } = await db.from(table).select("slug").eq("id", id).maybeSingle();
    if (error || !existing) return { ok: false, error: "O registro não foi encontrado. Atualize a página." };
    values.slug = existing.slug;
  }
  const query = id !== undefined
    ? db.from(table).update(values).eq("id", id)
    : db.from(table).insert(values);
  const { data, error } = await query.select("*").single();
  if (error) return { ok: false, error: error.code === "23505"
    ? "Já existe uma página com este nome ou título. Use um nome diferente."
    : error.code === "23503" ? "A empresa selecionada não existe mais. Atualize a página."
    : "Não foi possível salvar. Tente novamente." };
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  return { ok: true, record: data as Company | Article };
}
