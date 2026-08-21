import { useScrollReveal, useStaggeredReveal } from '../hooks/useScrollReveal'
import { useMouseTilt } from '../hooks/useMouseTilt'
import './About.css'

const STATS = [
  { icon: 'rocket_launch', value: '50+', label: 'Proyectos entregados' },
  { icon: 'groups',        value: '30+', label: 'Clientes satisfechos' },
  { icon: 'public',        value: '5+',  label: 'Países alcanzados'    },
  { icon: 'schedule',      value: '3+',  label: 'Años de experiencia'  },
]

const VALUES = [
  {
    icon: 'verified',
    title: 'Calidad sin compromisos',
    description:
      'Cada línea de código pasa por revisión. Entregamos productos que funcionan en producción, no solo en demos.',
  },
  {
    icon: 'speed',
    title: 'Velocidad con criterio',
    description:
      'Iteramos rápido pero con arquitectura sólida. Nada de deuda técnica que frene el crecimiento futuro.',
  },
  {
    icon: 'handshake',
    title: 'Comunicación directa',
    description:
      'Sin intermediarios ni procesos inflados. Tu equipo habla directamente con quien construye tu producto.',
  },
]

function StatCard({ icon, value, label, delay }) {
  const { cardRef, glareRef, handleMouseMove, handleMouseLeave } = useMouseTilt({ maxTilt: 10, scale: 1.04 })
  return (
    <div
      className="about__stat card tilt-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--reveal-delay': delay }}
    >
      <div className="tilt-glare" ref={glareRef} aria-hidden="true" />
      <span className="material-symbols-outlined icon-filled about__stat-icon" aria-hidden="true">{icon}</span>
      <span className="about__stat-value">{value}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

function ValueCard({ icon, title, description, delay }) {
  const { cardRef, glareRef, handleMouseMove, handleMouseLeave } = useMouseTilt({ maxTilt: 8, scale: 1.03 })
  return (
    <div
      className="about__value card tilt-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--reveal-delay': delay }}
    >
      <div className="tilt-glare" ref={glareRef} aria-hidden="true" />
      <div className="about__value-icon-wrap" aria-hidden="true">
        <span className="material-symbols-outlined icon-filled">{icon}</span>
      </div>
      <h3 className="about__value-title">{title}</h3>
      <p className="about__value-desc">{description}</p>
    </div>
  )
}

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { containerRef: statsRef, visibleItems: statsVisible } = useStaggeredReveal(STATS.length, { staggerDelay: 90 })
  const { containerRef: valuesRef, visibleItems: valuesVisible } = useStaggeredReveal(VALUES.length, { staggerDelay: 110 })

  return (
    <section id="about" className="about">
      <div className="container">

        {/* Header */}
        <div
          className={`about__header section-reveal${headerVisible ? ' is-visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-label">
            <span className="material-symbols-outlined" aria-hidden="true">info</span>
            Sobre TECHARANDU
          </span>
          <h2 className="section-title">Tecnología que genera resultados reales</h2>
          <p className="section-subtitle">
            Somos un equipo técnico enfocado en construir productos digitales e implementar
            soluciones inteligentes que resuelven problemas concretos de negocio.
          </p>
        </div>

        {/* Stats */}
        <div className="about__stats" ref={statsRef} aria-label="Estadísticas">
          {STATS.map(({ icon, value, label }, i) => (
            <div
              key={label}
              className={`stagger-item${statsVisible.has(i) ? ' is-visible' : ''}`}
            >
              <StatCard icon={icon} value={value} label={label} delay={`${i * 90}ms`} />
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="about__values" ref={valuesRef}>
          {VALUES.map(({ icon, title, description }, i) => (
            <div
              key={title}
              className={`stagger-item${valuesVisible.has(i) ? ' is-visible' : ''}`}
            >
              <ValueCard icon={icon} title={title} description={description} delay={`${i * 110}ms`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
