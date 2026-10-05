import { isLive } from "@/lib/supabase/config";
import Link from "next/link";
export const metadata = {
  title: "Sobre a Nivelo",
  description:
    "Um portal que conecta pessoas a empresas por meio de conteúdo útil, boas histórias e informação.",
};
export default function About() {
  return (
    <div className="wrap page-space">
      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>Sobre a Nivelo
      </div>
      <section className="about-intro">
        <span className="eyebrow">BOAS HISTÓRIAS. BONS ENCONTROS.</span>
        <h1 className="page-title">
          Descobrir um negócio
          <br />é descobrir <em>possibilidades.</em>
        </h1>
        <p className="page-description">
          A Nivelo aproxima pessoas e empresas através do que há de mais valioso
          entre elas: informação que faz sentido.
        </p>
      </section>
      <div className="about-grid">
        <div className="prose">
          <h2>Mais contexto. Melhores escolhas.</h2>
          <p>
            Acreditamos que uma empresa merece ser conhecida além do nome e do
            endereço. Por isso, cada negócio tem um espaço para apresentar sua
            história, seus produtos, seus serviços e sua maneira de trabalhar.
          </p>
          <p>
            Ao lado desses espaços, publicamos conteúdos sobre dúvidas reais,
            escolhas cotidianas e assuntos que merecem uma conversa mais
            cuidadosa. Você pode chegar por uma pergunta e encontrar uma nova
            possibilidade.
          </p>
          <h2>Nosso compromisso editorial</h2>
          <p>
            Conteúdo útil vem primeiro. Os artigos explicam, orientam e
            apresentam referências sem prometer resultados nem esconder a
            relação com as empresas do portal. Quando um conteúdo se relaciona a
            uma empresa, esse vínculo é identificado.
          </p>
          <p>
            Informações comerciais ficam nas páginas das empresas. Conteúdos de
            saúde e outras áreas especializadas devem passar por revisão de
            profissionais qualificados antes de serem publicados.
          </p>
        </div>
        <aside className="about-note">
          <span>01 / CONHECER</span>
          <h3>Negócios com contexto.</h3>
          <span>02 / ENTENDER</span>
          <h3>Conteúdos com propósito.</h3>
          <span>03 / CONECTAR</span>
          <h3>Descobertas que fazem sentido.</h3>
        </aside>
      </div>
      <section className="join-section" id="fazer-parte">
        <span className="eyebrow">PARA EMPRESAS</span>
        <h2>Sua história pode começar aqui.</h2>
        <p>
          Um espaço completo para apresentar o seu negócio e uma produção
          editorial contínua, com dois conteúdos por mês sobre assuntos
          relevantes para o seu público.
        </p>
        <p>
          {!isLive() && "Esta é a versão de demonstração da Nivelo. "}O canal de atendimento comercial será informado quando o portal abrir para novas empresas.
        </p>
        <Link className="button" href="/empresas">
          {isLive() ? "Conheça as empresas do portal →" : "Conheça os espaços de demonstração →"}
        </Link>
      </section>
    </div>
  );
}
