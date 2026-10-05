"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="mobile-navigation">
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          {open ? (
            <path d="m6 6 12 12M6 18 18 6" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
        <span>{open ? "Fechar" : "Menu"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Menu no celular">
          <Link href="/" onClick={() => setOpen(false)}>
            Início
          </Link>
          <Link href="/empresas" onClick={() => setOpen(false)}>
            Explore empresas
          </Link>
          <Link href="/artigos" onClick={() => setOpen(false)}>
            Histórias & ideias
          </Link>
          <Link href="/sobre" onClick={() => setOpen(false)}>
            Sobre a Nivelo
          </Link>
          <Link href="/empresas" onClick={() => setOpen(false)}>
            Buscar no portal →
          </Link>
        </nav>
      )}
    </div>
  );
}
