import type { Metadata } from "next";
import Link from "next/link";
import Brand from "./brand";
import MobileMenu from "./mobile-menu";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-700.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Nivelo — boas histórias, bons encontros",
    template: "%s | Nivelo",
  },
  description:
    "Descubra empresas, ideias e conteúdos úteis para o seu dia a dia. Um novo olhar para os negócios que fazem parte da sua vida.",
  openGraph: { siteName: "Nivelo", locale: "pt_BR", type: "website" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <header className="header">
          <div className="header-top wrap">
            <Link className="logo" href="/" aria-label="Nivelo, início">
              <Brand />
            </Link>
            <span className="brand-note">BOAS HISTÓRIAS. BONS ENCONTROS.</span>
            <Link className="partner-link" href="/sobre#fazer-parte">
              Sua empresa na Nivelo <span>→</span>
            </Link>
            <MobileMenu />
          </div>
          <div className="nav-line">
            <nav className="wrap nav" aria-label="Navegação principal">
              <div className="nav-links">
                <Link href="/">Início</Link>
                <Link href="/empresas">Explore empresas</Link>
                <Link href="/artigos">Histórias & ideias</Link>
                <Link href="/sobre">Sobre a Nivelo</Link>
              </div>
              <Link className="nav-search" href="/empresas">
                Buscar <SearchIcon />
              </Link>
            </nav>
          </div>
        </header>
        <main id="conteudo">{children}</main>
        <footer className="footer">
          <div className="wrap footer-main">
            <div>
              <Link className="logo" href="/">
                <Brand />
              </Link>
              <p>
                Um novo olhar para os negócios.
                <br />
                Uma boa história para cada descoberta.
              </p>
            </div>
            <div>
              <span className="eyebrow">EXPLORE</span>
              <Link href="/empresas">Encontre uma empresa</Link>
              <Link href="/artigos">Histórias & ideias</Link>
              <Link href="/sobre">Conheça a Nivelo</Link>
            </div>
            <div>
              <span className="eyebrow">PARA EMPRESAS</span>
              <Link href="/sobre#fazer-parte">Faça parte da Nivelo →</Link>
              <Link href="/admin">Área administrativa</Link>
              <p className="demo-note">
                Edição de demonstração.
                <br />
                Empresas e conteúdos ilustrativos.
              </p>
            </div>
          </div>
          <div className="wrap footer-bottom">
            <span>© {new Date().getFullYear()} Nivelo</span>
            <span>Conexões que começam com conteúdo.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}
