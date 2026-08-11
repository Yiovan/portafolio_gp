import { useState } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    category: 'digital',
    tag: 'Desarrollo Web',
    tagVariant: '',
    icon: 'language',
    title: 'Plataforma de gestión para PYMES',
    description:
      'Sistema web integral para administrar inventario, facturación y reportes en tiempo real. Redujo el tiempo administrativo de los clientes en un 60%.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    metric: { icon: 'trending_down', text: '60% menos tiempo operativo' },
  },
  {
    category: 'intelligent',
    tag: 'Automatización',
    tagVariant: 'tag-2',
    icon: 'account_tree',
    title: 'Pipeline de datos automatizado',
    description:
      'Automatización del procesamiento de datos para una empresa de logística. Procesaba 10,000 registros diarios de forma manual; ahora es automático.',
    tech: ['Python', 'Airflow', 'AWS Lambda'],
    metric: { icon: 'bolt', text: '10K registros/día automatizados' },
  },
  {
    category: 'digital',
    tag: 'App Móvil',
    tagVariant: '',
    icon: 'smartphone',
    title: 'App de delivery para restaurantes',
    description:
      'Aplicación móvil para iOS y Android con seguimiento en tiempo real, pagos integrados y panel de administración para restaurantes independientes.',
    tech: ['React Native', 'Firebase', 'Stripe'],
    metric: { icon: 'star', text: '4.8 en App Store' },
  },
  {
    category: 'intelligent',
    tag: 'Inteligencia Artificial',
    tagVariant: 'tag-2',
    icon: 'smart_toy',
    title: 'Asistente de soporte con IA',
    description:
      'Chatbot entrenado con la documentación de un producto SaaS. Resuelve el 75% de las consultas de soporte sin intervención humana.',
    tech: ['OpenAI API', 'LangChain', 'Next.js'],
    metric: { icon: 'support_agent', text: '75% consultas resueltas sin agente' },
  },
  {
    category: 'digital',
    tag: 'Software a Medida',
    tagVariant: '',
    icon: 'code',
    title: 'CRM personalizado para agencia',
    description:
      'Plataforma CRM construida desde cero adaptada a los flujos de ventas específicos de una agencia de marketing con integración a herramientas de email.',
    tech: ['Vue.js', 'Django', 'Redis'],
    metric: { icon: 'groups', text: '3x más seguimientos completados' },
  },
  {
    category: 'intelligent',
    tag: 'Consultoría',
    tagVariant: 'tag-2',
    icon: 'support_agent',
    title: 'Migración a arquitectura cloud',
    description:
      'Consultoría y ejecución de migración de infraestructura on-premise a AWS. Reducción de costos del 40% y 99.9% de uptime desde el primer mes.',
    tech: ['AWS', 'Terraform', 'Docker'],
    metric: { icon: 'savings', text: '40% reducción de costos en infra' },
  },
]

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'digital', label: 'Soluciones Digitales' },
  { key: 'intelligent', label: 'Tecnología Inteligente' },
]

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects__header">
          <span className="section-label">
            <span className="material-symbols-outlined" aria-hidden="true">folder_open</span>
            Proyectos
          </span>
          <h2 className="section-title">Trabajo que habla por sí mismo</h2>
          <p className="section-subtitle">
            Una selección de proyectos que muestran el tipo de problemas que resolvemos
            y los resultados que entregamos.
          </p>
        </div>

        <div className="projects__filters" role="group" aria-label="Filtrar proyectos">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`projects__filter-btn${active === key ? ' projects__filter-btn--active' : ''}`}
              onClick={() => setActive(key)}
              aria-pressed={active === key}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="projects__grid">
          {filtered.map((project) => (
            <li key={project.title} className="project-card card">
              <div className="project-card__top">
                <div className="project-card__icon-wrap" aria-hidden="true">
                  <span className="material-symbols-outlined icon-filled">{project.icon}</span>
                </div>
                <span className={`tag ${project.tagVariant}`}>{project.tag}</span>
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__metric">
                <span className="material-symbols-outlined icon-filled project-card__metric-icon" aria-hidden="true">
                  {project.metric.icon}
                </span>
                <span>{project.metric.text}</span>
              </div>
              <div className="project-card__tech" aria-label="Tecnologías usadas">
                {project.tech.map(t => (
                  <span key={t} className="project-card__tech-tag">{t}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
