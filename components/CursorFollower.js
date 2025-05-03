import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CursorFollower() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const spring = { damping: 25, stiffness: 300 }
  const x = useSpring(mouseX, spring)
  const y = useSpring(mouseY, spring)

  const trailMax = 12
  const [trail, setTrail] = useState([])

  useEffect(() => {
    let animationFrame
    const updateTrail = () => {
      setTrail((prev) => {
        const next = [{ x: x.get(), y: y.get() }, ...prev]
        return next.slice(0, trailMax)
      })
      animationFrame = requestAnimationFrame(updateTrail)
    }
    animationFrame = requestAnimationFrame(updateTrail)
    return () => cancelAnimationFrame(animationFrame)
  }, [x, y])

  useEffect(() => {
    const handler = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Glowing Green Laser Trail */}
      {trail.map((pos, i, arr) => {
        if (i === arr.length - 1) return null
        const next = arr[i + 1]
        const dx = next.x - pos.x
        const dy = next.y - pos.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        const length = Math.sqrt(dx * dx + dy * dy) * 1.2
        const opacity = 1 - i / trailMax
        const thickness = 2 + (1 - i / trailMax) * 2

        return (
          <motion.div
            key={i}
            className="fixed pointer-events-none"
            style={{
              x: pos.x,
              y: pos.y,
              width: length,
              height: thickness,
              background: 'linear-gradient(90deg, rgba(0,255,0,0.9), rgba(0,255,0,0))',
              opacity,
              borderRadius: '9999px',
              rotate: `${angle}deg`,
              translateX: '-50%',
              translateY: '-50%',
              zIndex: 9998,
              boxShadow: '0 0 12px rgba(0,255,0,0.7)',
              willChange: 'transform, opacity',
            }}
          />
        )
      })}

      {/* Main Green Arrowhead */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-green-500 pointer-events-none"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          rotate: '-45deg',
          clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)',
          zIndex: 9999,
          boxShadow: '0 0 10px rgba(0,255,0,0.8)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
