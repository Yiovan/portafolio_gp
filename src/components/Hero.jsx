import { useScrollOffset } from '../hooks/useParallax'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Hero.css'

export default function Hero() {
  const scrollY = useScrollOffset()
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.01, once: true })

  /* Parallax scroll */
  const slow   = scrollY * 0.25
  const medium = scrollY * 0.4
  const grid   = scrollY * 0.15

  return (
    <section id="top" className="hero" aria-label="Inicio">

      {/* ── Background ── */}
      <div className="hero__bg" aria-hidden="true">

        {/* Video de fondo */}
        <div className="hero__video-wrapper">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
        </div>

        {/* Overlay para oscurecer el video y mantener legibilidad */}
        <div className="hero__video-overlay" />

        <div
          className="hero__glow hero__glow--1"
          style={{ transform: `translateY(calc(-100px + ${slow}px))` }}
        />
        <div
          className="hero__glow hero__glow--2"
          style={{ transform: `translateY(${medium}px)` }}
        />
        <div
          className="hero__glow hero__glow--3"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="hero__grid"
          style={{ transform: `translateY(${grid}px)` }}
        />
      </div>

      {/* ── Contenido principal ── */}
      <div
        className={`container hero__content${isVisible ? ' reveal-in' : ' reveal-ready'}`}
        ref={contentRef}
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        <div className="hero__badge reveal-item" style={{ '--delay': '0ms' }}>
          <span className="material-symbols-outlined" aria-hidden="true">bolt</span>
          Soluciones tecnológicas de alto impacto
        </div>

        <h1 className="hero__title reveal-item" style={{ '--delay': '80ms' }}>
          Construimos el futuro<br />
          <span className="hero__title-accent">digital de tu negocio</span>
        </h1>

        <p className="hero__subtitle reveal-item" style={{ '--delay': '160ms' }}>
          En TECHARANDU combinamos desarrollo de software, inteligencia artificial
          y automatización para transformar ideas en productos que escalan.
        </p>

        <div className="hero__pillars reveal-item" style={{ '--delay': '240ms' }} aria-label="Pilares principales">
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

        <div className="hero__actions reveal-item" style={{ '--delay': '320ms' }}>
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
