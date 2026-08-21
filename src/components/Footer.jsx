import './Footer.css'

const LINKS = [
  { href: '#about', label: 'Nosotros' },
  { href: '#pillars', label: 'Servicios' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__logo" aria-label="MBareTech - volver al inicio">
            <span className="material-symbols-outlined icon-filled footer__logo-icon" aria-hidden="true">hub</span>
            <span>TECHAURANDU</span>
          </a>
          <p className="footer__tagline">
            Soluciones Digitales y Tecnología Inteligente
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <ul className="footer__links">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="footer__link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__bottom">
          <span className="footer__copy">
            {new Date().getFullYear()} TECHARANDU. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
