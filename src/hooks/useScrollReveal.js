import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — aplica una clase CSS cuando el elemento entra en el viewport.
 *
 * @param {object} options
 * @param {number}  options.threshold  Fracción del elemento visible para activar (0–1)
 * @param {string}  options.rootMargin Margen alrededor del viewport
 * @param {boolean} options.once       Si es true, se activa sólo una vez
 * @returns {{ ref, isVisible }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

/**
 * useStaggeredReveal — revela múltiples elementos con delay escalonado.
 *
 * @param {number} count     Número de elementos
 * @param {object} options   Opciones de IntersectionObserver
 * @returns {{ containerRef, visibleItems }}  visibleItems es un Set de índices visibles
 */
export function useStaggeredReveal(count, {
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  staggerDelay = 80,
} = {}) {
  const containerRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children).slice(0, count)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = children.indexOf(entry.target)
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, index]))
              }, index * staggerDelay)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold, rootMargin }
    )

    children.forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [count, threshold, rootMargin, staggerDelay])

  return { containerRef, visibleItems }
}
