import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-label="Inicio">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="material-symbols-outlined" aria-hidden="true">bolt</span>
          Soluciones tecnológicas de alto impacto
        </div>

        <h1 className="hero__title">
          Construimos el futuro<br />
          <span className="hero__title-accent">digital de tu negocio</span>
        </h1>

        <p className="hero__subtitle">
          En MBareTech combinamos desarrollo de software, inteligencia artificial
          y automatización para transformar ideas en productos que escalan.
        </p>

        <div className="hero__pillars" aria-label="Pilares principales">
          <div className="hero__pillar">
            <span className="material-symbols-outlined icon-filled hero__pillar-icon hero__pillar-icon--blue" aria-hidden="true">devices</span>
            <div>
              <strong>Soluciones Digitales</strong>
              <p>Web, móvil y software a medida</p>
            </div>
          </div>
          <div className="hero__pillar-divider" aria-hidden="true" />
          <div className="hero__pillar">
            <span className="material-symbols-outlined icon-filled hero__pillar-icon hero__pillar-icon--purple" aria-hidden="true">psychology</span>
            <div>
              <strong>Tecnología Inteligente</strong>
              <p>IA, automatización y consultoría</p>
            </div>
          </div>
        </div>

        <div className="hero__actions">
          <a href="#contact" className="btn btn-primary">
            <span className="material-symbols-outlined" aria-hidden="true">send</span>
            Iniciar un proyecto
          </a>
          <a href="#pillars" className="btn btn-outline">
            <span className="material-symbols-outlined" aria-hidden="true">explore</span>
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  )
}
