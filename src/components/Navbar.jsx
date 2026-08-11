import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#about', label: 'Nosotros' },
  { href: '#pillars', label: 'Servicios' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo" aria-label="MBareTech - inicio">
          <span className="navbar__logo-icon material-symbols-outlined icon-filled" aria-hidden="true">hub</span>
          <span className="navbar__logo-text">MBareTech</span>
        </a>

        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`} aria-label="Navegación principal">
          <ul className="navbar__links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="navbar__link" onClick={handleNavClick}>{label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary navbar__cta" onClick={handleNavClick}>
            <span className="material-symbols-outlined" aria-hidden="true">send</span>
            Hablemos
          </a>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className="material-symbols-outlined icon-filled" aria-hidden="true">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
