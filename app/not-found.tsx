import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap page-space empty">
      <span className="eyebrow">404</span>
      <h1>Esta descoberta ainda não está aqui.</h1>
      <p>A página pode ter mudado ou ainda não ter sido publicada.</p>
      <Link className="button" href="/">
        Voltar ao início →
      </Link>
    </div>
  );
}
