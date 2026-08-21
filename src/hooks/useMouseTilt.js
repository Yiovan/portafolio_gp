import { useRef, useCallback } from 'react'

/**
 * useMouseTilt — devuelve handlers de mouse que aplican un efecto 3D tilt
 * con perspectiva CSS a la card apuntada.
 *
 * @param {object} options
 * @param {number} options.maxTilt    Grados máximos de inclinación (default 12)
 * @param {number} options.scale      Escala al hacer hover (default 1.03)
 * @param {number} options.glareMax   Opacidad máxima del brillo (0 = desactivado)
 * @returns {{ cardRef, glareRef, handleMouseMove, handleMouseLeave }}
 */
export function useMouseTilt({
  maxTilt = 12,
  scale = 1.03,
  glareMax = 0.15,
} = {}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    // -1 a 1
    const normX = (x - cx) / cx
    const normY = (y - cy) / cy

    const rotateY = normX * maxTilt
    const rotateX = -normY * maxTilt

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `
    card.style.transition = 'transform 0.08s ease-out'

    // Brillo de dirección
    if (glareRef.current && glareMax > 0) {
      const angle = Math.atan2(normY, normX) * (180 / Math.PI) + 90
      const opacity = Math.max(Math.abs(normX), Math.abs(normY)) * glareMax
      glareRef.current.style.background = `
        linear-gradient(
          ${angle}deg,
          rgba(255,255,255,${opacity}) 0%,
          transparent 60%
        )
      `
    }
  }, [maxTilt, scale, glareMax])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.transition = 'transform 0.4s ease-out'

    if (glareRef.current) {
      glareRef.current.style.background = 'transparent'
    }
  }, [])

  return { cardRef, glareRef, handleMouseMove, handleMouseLeave }
}
