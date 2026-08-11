import './About.css'

const STATS = [
  { icon: 'rocket_launch', value: '50+', label: 'Proyectos entregados' },
  { icon: 'groups', value: '30+', label: 'Clientes satisfechos' },
  { icon: 'public', value: '5+', label: 'Países alcanzados' },
  { icon: 'schedule', value: '3+', label: 'Años de experiencia' },
]

const VALUES = [
  {
    icon: 'verified',
    title: 'Calidad sin compromisos',
    description: 'Cada línea de código pasa por revisión. Entregamos productos que funcionan en producción, no solo en demos.',
  },
  {
    icon: 'speed',
    title: 'Velocidad con criterio',
    description: 'Iteramos rápido pero con arquitectura sólida. Nada de deuda técnica que frene el crecimiento futuro.',
  },
  {
    icon: 'handshake',
    title: 'Comunicación directa',
    description: 'Sin intermediarios ni procesos inflados. Tu equipo habla directamente con quien construye tu producto.',
  },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__header">
          <span className="section-label">
            <span className="material-symbols-outlined" aria-hidden="true">info</span>
            Sobre MBareTech
          </span>
          <h2 className="section-title">Tecnología que genera resultados reales</h2>
          <p className="section-subtitle">
            Somos un equipo técnico enfocado en construir productos digitales e implementar
            soluciones inteligentes que resuelven problemas concretos de negocio.
          </p>
        </div>

        <div className="about__stats" aria-label="Estadísticas">
          {STATS.map(({ icon, value, label }) => (
            <div className="about__stat card" key={label}>
              <span className="material-symbols-outlined icon-filled about__stat-icon" aria-hidden="true">{icon}</span>
              <span className="about__stat-value">{value}</span>
              <span className="about__stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="about__values">
          {VALUES.map(({ icon, title, description }) => (
            <div className="about__value card" key={title}>
              <div className="about__value-icon-wrap" aria-hidden="true">
                <span className="material-symbols-outlined icon-filled">{icon}</span>
              </div>
              <h3 className="about__value-title">{title}</h3>
              <p className="about__value-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
