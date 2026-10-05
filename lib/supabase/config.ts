export function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url && !key) return null;
  if (!url || !key) throw new Error("Configuração incompleta do Supabase.");
  return { url, key };
}

export function isLive() {
  return supabaseConfig() !== null;
}
