import { useState } from 'react'
import './Contact.css'

const CONTACT_ITEMS = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'giovannicabrerarivas@outlook.com',
    href: 'giovannicabrerarivas@outlook.com',
  }, /* mejorar el enlance del correo, redirige a la pagina misma */
  {
    icon: 'chat',
    label: 'WhatsApp',
    value: 'Escribenos directo',
    href: 'https://wa.me/595986173023',
  },
  {
    icon: 'work',
    label: 'LinkedIn',
    value: 'linkedin.com/company/mbaretech',
    href: 'https://www.linkedin.com/in/giovanni-cabrera-rivas-637481279/',
  },
]

const SERVICES_OPTIONS = [
  'Desarrollo Web',
  'App Móvil',
  'Software a Medida',
  'Inteligencia Artificial',
  'Automatización',
  'Consultoría Tecnológica',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulated send — replace with real API call
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', service: '', message: '' })
    }, 1200)
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <span className="section-label">
            <span className="material-symbols-outlined" aria-hidden="true">send</span>
            Contacto
          </span>
          <h2 className="section-title">Cuéntanos qué necesitas</h2>
          <p className="section-subtitle">
            Revisamos cada consulta y respondemos en menos de 24 horas hábiles.
            Sin compromisos, sin presión.
          </p>

          <ul className="contact__channels" aria-label="Canales de contacto">
            {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="contact__channel" target="_blank" rel="noopener noreferrer">
                  <div className="contact__channel-icon" aria-hidden="true">
                    <span className="material-symbols-outlined icon-filled">{icon}</span>
                  </div>
                  <div>
                    <span className="contact__channel-label">{label}</span>
                    <span className="contact__channel-value">{value}</span>
                  </div>
                  <span className="material-symbols-outlined contact__channel-arrow" aria-hidden="true">arrow_forward</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrap card" aria-label="Formulario de contacto">
          {status === 'sent' ? (
            <div className="contact__success" role="status" aria-live="polite">
              <div className="contact__success-icon" aria-hidden="true">
                <span className="material-symbols-outlined icon-filled">check_circle</span>
              </div>
              <h3>Mensaje enviado</h3>
              <p>Gracias por escribirnos. Te respondemos pronto.</p>
              <button className="btn btn-outline" onClick={() => setStatus(null)}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <h3 className="contact__form-title">Enviar mensaje</h3>

              <div className="contact__field">
                <label htmlFor="contact-name">Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-service">Servicio de interés</label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICES_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Mensaje</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describí brevemente tu proyecto o consulta..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className="material-symbols-outlined contact__spinner" aria-hidden="true">refresh</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" aria-hidden="true">send</span>
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
