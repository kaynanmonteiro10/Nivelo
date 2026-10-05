"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="wrap page-space">
    <h1>Não foi possível carregar esta página.</h1>
    <p>Espere um momento e tente novamente.</p>
    <button className="button" onClick={reset}>Tentar novamente →</button>
  </div>;
}
