import Link from "next/link";
import { isLive } from "@/lib/supabase/config";
import { signIn, signOut } from "./actions";

export const metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

export default async function Login({ searchParams }: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { erro } = await searchParams;
  return <div className="wrap page-space"><div className="admin-login">
    <span className="eyebrow">ESTÚDIO NIVELO</span>
    <h1>Acesse sua redação.</h1>
    {!isLive() ? <>
      <p>O login estará disponível quando a conexão com o Supabase for ativada.</p>
      <Link className="button" href="/admin">Conhecer o painel de demonstração →</Link>
    </> : <>
      <p>Entre com a conta autorizada a administrar a Nivelo.</p>
      {erro && <p className="notice" role="alert">{erro === "acesso"
        ? "Esta conta ainda não tem acesso ao painel. Peça ao responsável para liberar seu acesso."
        : "Não foi possível entrar. Confira o e-mail e a senha e tente novamente."}</p>}
      <form action={signIn} className="form-grid">
        <label className="wide">E-mail<input name="email" type="email" autoComplete="username" required maxLength={254} /></label>
        <label className="wide">Senha<input name="password" type="password" autoComplete="current-password" required maxLength={1000} /></label>
        <button className="button" type="submit">Entrar →</button>
      </form>
      {erro === "acesso" && <form action={signOut}><button className="text-link">Sair desta conta</button></form>}
    </>}
  </div></div>;
}
