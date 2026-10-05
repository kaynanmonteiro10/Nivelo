"use server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/server";
import { isLive } from "@/lib/supabase/config";

export async function signIn(form: FormData) {
  if (!isLive()) redirect("/admin/login");
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  if (!email || !password || email.length > 254 || password.length > 1000)
    redirect("/admin/login?erro=login");
  const db = await supabase();
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?erro=login");
  redirect("/admin");
}

export async function signOut() {
  if (isLive()) {
    const db = await supabase();
    await db.auth.signOut();
  }
  redirect("/admin/login");
}
