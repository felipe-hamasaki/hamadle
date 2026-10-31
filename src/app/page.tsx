import Link from 'next/link';

export default function Home() {
  return (
    <main className="hub">
      <header className="hub-header">
        <Link href="/" className="hub-wordmark">
          <span aria-hidden="true">✦</span> HAMADLE
        </Link>
        <span>Seu desafio diário</span>
      </header>
      <section className="hub-intro">
        <p className="hub-eyebrow">UM NOVO DIA. UM NOVO MISTÉRIO.</p>
        <h1>
          Reconhece o personagem?
          <br />
          <span>Vamos descobrir.</span>
        </h1>
        <p>
          Escolha um universo, siga as pistas e encontre o personagem do dia.
        </p>
      </section>
      <section aria-labelledby="games-title" className="hub-games">
        <h2 id="games-title">Escolha seu jogo</h2>
        <Link href="/berserkdle" className="hub-card">
          <div className="hub-card-art" aria-hidden="true">
            <span>✦</span>
            <strong>BERSERK</strong>
          </div>
          <div className="hub-card-content">
            <p className="hub-eyebrow">DESAFIO DIÁRIO · PERSONAGENS</p>
            <h3>Berserkdle</h3>
            <p>
              Entre no mundo de Berserk. Siga as pistas para desvendar o
              personagem pelas pistas.
            </p>
            <span className="hub-play">
              Jogar agora <span aria-hidden="true">↗</span>
            </span>
          </div>
        </Link>
        <Link href="/hxh" className="hub-card hub-card-hxh">
          <div className="hub-card-art" aria-hidden="true">
            <span>✦</span>
            <strong>HUNTER × HUNTER</strong>
          </div>
          <div className="hub-card-content">
            <p className="hub-eyebrow">DESAFIO DIÁRIO · PERSONAGENS</p>
            <h3>Hunter × Hunter DLE</h3>
            <p>Siga as pistas de Nen e encontre o personagem do dia.</p>
            <span className="hub-play">Jogar agora ↗</span>
          </div>
        </Link>
        <Link href="/kimetsu" className="hub-card hub-card-kimetsu">
          <div className="hub-card-art" aria-hidden="true">
            <span>⚔</span>
            <strong>DEMON SLAYER</strong>
          </div>
          <div className="hub-card-content">
            <p className="hub-eyebrow">DESAFIO DIÁRIO · PERSONAGENS</p>
            <h3>Demon Slayer DLE</h3>
            <p>
              De Tanjiro aos Hashira. Siga as pistas de respirações e poderes.
            </p>
            <span className="hub-play">Jogar agora ↗</span>
          </div>
        </Link>
        <p className="hub-soon">Outros universos chegam em breve.</p>
      </section>
      <footer className="hub-footer">
        Hamadle · Jogos de adivinhar, todos os dias.
      </footer>
    </main>
  );
}
