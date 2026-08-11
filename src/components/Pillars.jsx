import './Pillars.css'

const PILLAR_1 = {
  label: 'Pilar 1',
  icon: 'devices',
  accent: 'blue',
  title: 'Soluciones Digitales',
  description:
    'Diseñamos y construimos productos digitales que se adaptan al crecimiento de tu negocio. Desde una landing hasta plataformas complejas.',
  services: [
    {
      icon: 'language',
      name: 'Desarrollo Web',
      desc: 'Aplicaciones web modernas con React, Next.js y arquitecturas escalables.',
    },
    {
      icon: 'smartphone',
      name: 'Apps Móviles',
      desc: 'Aplicaciones iOS y Android nativas o multiplataforma con React Native y Flutter.',
    },
    {
      icon: 'code',
      name: 'Software a Medida',
      desc: 'Sistemas internos, plataformas SaaS y APIs diseñadas según tus procesos.',
    },
  ],
}

const PILLAR_2 = {
  label: 'Pilar 2',
  icon: 'psychology',
  accent: 'purple',
  title: 'Tecnología Inteligente',
  description:
    'Incorporamos inteligencia en tus operaciones para que tu equipo se enfoque en lo que realmente importa.',
  services: [
    {
      icon: 'smart_toy',
      name: 'Inteligencia Artificial',
      desc: 'Modelos de ML, procesamiento de lenguaje natural e integración con LLMs.',
    },
    {
      icon: 'account_tree',
      name: 'Automatización',
      desc: 'Flujos de trabajo automáticos que eliminan tareas manuales y errores humanos.',
    },
    {
      icon: 'support_agent',
      name: 'Consultoría Tecnológica',
      desc: 'Auditorías de arquitectura, hoja de ruta tecnológica y decisiones de stack.',
    },
  ],
}

function PillarCard({ pillar }) {
  return (
    <div className={`pillar card pillar--${pillar.accent}`}>
      <div className="pillar__header">
        <div className={`pillar__icon-wrap pillar__icon-wrap--${pillar.accent}`} aria-hidden="true">
          <span className="material-symbols-outlined icon-filled">{pillar.icon}</span>
        </div>
        <span className={`tag${pillar.accent === 'purple' ? ' tag-2' : ''}`}>
          {pillar.label}
        </span>
      </div>
      <h3 className="pillar__title">{pillar.title}</h3>
      <p className="pillar__description">{pillar.description}</p>
      <ul className="pillar__services" aria-label={`Servicios de ${pillar.title}`}>
        {pillar.services.map(({ icon, name, desc }) => (
          <li key={name} className="pillar__service">
            <span className="material-symbols-outlined pillar__service-icon" aria-hidden="true">{icon}</span>
            <div>
              <strong className="pillar__service-name">{name}</strong>
              <p className="pillar__service-desc">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <a href="#contact" className={`btn pillars__btn pillars__btn--${pillar.accent}`}>
        <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        Saber más
      </a>
    </div>
  )
}

export default function Pillars() {
  return (
    <section id="pillars" className="pillars">
      <div className="container">
        <div className="pillars__header">
          <span className="section-label">
            <span className="material-symbols-outlined" aria-hidden="true">grid_view</span>
            Nuestros pilares
          </span>
          <h2 className="section-title">Dos ejes, un mismo propósito</h2>
          <p className="section-subtitle">
            Todo lo que hacemos cae en uno de estos dos pilares. Juntos cubren el ciclo
            completo de transformación digital de cualquier empresa.
          </p>
        </div>

        <div className="pillars__grid">
          <PillarCard pillar={PILLAR_1} />
          <PillarCard pillar={PILLAR_2} />
        </div>
      </div>
    </section>
  )
}
