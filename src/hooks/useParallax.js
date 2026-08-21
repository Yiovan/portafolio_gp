import { useEffect, useRef, useState } from 'react'

/**
 * useParallax — trackea la posición Y del scroll y calcula un offset
 * proporcional para elementos parallax.
 *
 * @param {number} speed  Factor de velocidad (0 = fijo, 1 = normal, negativo = inverso)
 * @returns {{ ref, offset }}  ref para el elemento contenedor, offset en px
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let rafId

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const centerY = rect.top + scrolled + rect.height / 2
        const viewCenter = window.innerHeight / 2
        const distance = scrolled + viewCenter - centerY
        setOffset(distance * speed)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [speed])

  return { ref, offset }
}

/**
 * useScrollOffset — versión simple que sólo retorna el scrollY actual.
 * Útil para mover elementos del hero que no necesitan un contenedor de referencia.
 *
 * @returns {number} scrollY
 */
export function useScrollOffset() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId
    const onScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return scrollY
}
