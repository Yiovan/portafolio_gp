import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Pillars from './components/Pillars'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('mbaretech-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mbaretech-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <About />
        <Pillars />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
