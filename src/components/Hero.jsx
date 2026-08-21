import { useEffect, useRef, useState } from 'react'
import { useScrollOffset } from '../hooks/useParallax'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Hero.css'

/* Cada float tiene un factor de profundidad (depth).
   depth alto = se mueve más = más "cerca" del usuario.
   depth bajo = se mueve poco = más "lejos" en el fondo. */
const FLOATS = [
  { id: 'f1', cls: 'hero__float hero__float--1', icon: 'code',       label: 'React',     depth: 0.028 },
  { id: 'f2', cls: 'hero__float hero__float--2', icon: 'psychology', label: 'IA',        depth: 0.018 },
  { id: 'f3', cls: 'hero__float hero__float--3', icon: 'cloud',      label: 'Cloud',     depth: 0.035 },
  { id: 'f4', cls: 'hero__float hero__float--4', icon: 'database',   label: 'DB',        depth: 0.022 },
  { id: 'f5', cls: 'hero__float hero__float--5', icon: 'security',   label: 'Seguridad', depth: 0.015 },
]

function lerp(a, b, t) { return a + (b - a) * t }

export default function Hero() {
  const scrollY    = useScrollOffset()
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.01, once: true })

  const sectionRef  = useRef(null)
  const rafRef      = useRef(null)
  const rawMouse    = useRef({ x: 0, y: 0 })          // posición real del mouse
  const smoothMouse = useRef({ x: 0, y: 0 })          // posición interpolada
  const [floatPos, setFloatPos]   = useState(() => FLOATS.map(() => ({ x: 0, y: 0 })))
  const [glowMouse, setGlowMouse] = useState({ x: 0, y: 0 })

  /* ── Captura del mouse (relativo al centro de la sección) ── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      rawMouse.current = {
        x: e.clientX - rect.left - rect.width  / 2,
        y: e.clientY - rect.top  - rect.height / 2,
      }
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Loop de animación con lerp ── */
  useEffect(() => {
    const LERP_SPEED = 0.06   // 0 = no se mueve, 1 = instantáneo

    const tick = () => {
      smoothMouse.current = {
        x: lerp(smoothMouse.current.x, rawMouse.current.x, LERP_SPEED),
        y: lerp(smoothMouse.current.y, rawMouse.current.y, LERP_SPEED),
      }

      setFloatPos(FLOATS.map(f => ({
        x: smoothMouse.current.x * f.depth * 100,
        y: smoothMouse.current.y * f.depth * 100,
      })))

      // Glows usan normalizado -0.5 a 0.5
      const section = sectionRef.current
      if (section) {
        const w = section.offsetWidth
        const h = section.offsetHeight
        setGlowMouse({
          x: smoothMouse.current.x / w,
          y: smoothMouse.current.y / h,
        })
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* Parallax scroll */
  const slow   = scrollY * 0.25
  const medium = scrollY * 0.4
  const grid   = scrollY * 0.15
  const fast   = scrollY * 0.55

  return (
    <section id="top" className="hero" aria-label="Inicio" ref={sectionRef}>

      {/* ── Background ── */}
      <div className="hero__bg" aria-hidden="true">
        <div
          className="hero__glow hero__glow--1"
          style={{
            transform: `translate(
              ${glowMouse.x * 50}px,
              calc(-100px + ${slow}px + ${glowMouse.y * 40}px)
            )`,
          }}
        />
        <div
          className="hero__glow hero__glow--2"
          style={{
            transform: `translate(
              ${glowMouse.x * -40}px,
              calc(${medium}px + ${glowMouse.y * -30}px)
            )`,
          }}
        />
        <div
          className="hero__glow hero__glow--3"
          style={{
            transform: `translate(
              ${glowMouse.x * 25}px,
              calc(${scrollY * 0.3}px + ${glowMouse.y * 20}px)
            )`,
          }}
        />
        <div
          className="hero__grid"
          style={{ transform: `translateY(${grid}px)` }}
        />
      </div>

      {/* ── Elementos flotantes ── */}
      <div className="hero__floats" aria-hidden="true">
        {FLOATS.map((f, i) => (
          <div
            key={f.id}
            className={f.cls}
            style={{
              translate: `${floatPos[i].x}px ${floatPos[i].y + fast * (i % 2 === 0 ? -0.6 : -0.4)}px`,
            }}
          >
            <span className="material-symbols-outlined icon-filled">{f.icon}</span>
            <span className="hero__float-label">{f.label}</span>
          </div>
        ))}
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
