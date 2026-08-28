import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'
import { EMAILJS_CONFIG, CONTACT_EMAIL } from '../config/emailjs'

const CONTACT_ITEMS = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'contactos.techarandu@gmail.com',
    href: 'mailto:contactos.techarandu@gmail.com',
  },
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

const EMAILJS_READY = Boolean(
  EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EMAILJS_READY) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          service: form.service,
          message: form.message,
          to_email: CONTACT_EMAIL,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
      setStatus('sent')
      setForm({ name: '', email: '', service: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrorMsg(err?.text || err?.message || 'Error desconocido')
      setStatus('error')
    }
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
          {!EMAILJS_READY ? (
            <div className="contact__success" role="status">
              <div className="contact__success-icon" aria-hidden="true">
                <span className="material-symbols-outlined icon-filled">error</span>
              </div>
              <h3>Formulario sin configurar</h3>
              <p>
                Agregá las credenciales de EmailJS en el archivo <strong>.env</strong>.
                Mientras tanto, escribinos a {CONTACT_EMAIL}.
              </p>
            </div>
          ) : status === 'sent' ? (
            <div className="contact__success" role="status" aria-live="polite">
              <div className="contact__success-icon" aria-hidden="true">
                <span className="material-symbols-outlined icon-filled">check_circle</span>
              </div>
              <h3>Mensaje enviado</h3>
              <p>Gracias por escribirnos. Te respondemos pronto.</p>
              
            </div>
          ) : (
            <form>
              

              

              

              
            <h3>verificar despues</h3>

              

              
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
