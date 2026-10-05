import "server-only";
import { redirect } from "next/navigation";
import { supabase } from "./supabase/server";

export async function requireEditor() {
  const db = await supabase();
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) redirect("/admin/login");
  const { data, error: membershipError } = await db.from("admin_users")
    .select("user_id").eq("user_id", user.id).maybeSingle();
  if (membershipError || !data) redirect("/admin/login?erro=acesso");
  return db;
}
