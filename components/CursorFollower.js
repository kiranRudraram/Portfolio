import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CursorFollower() {
  // 1) Raw mouse coords
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  // 2) Springed for smooth lag
  const spring = { damping: 20, stiffness: 300 }
  const x = useSpring(mouseX, spring)
  const y = useSpring(mouseY, spring)

  // 3) Keep a short history for the trail
  const trailMax = 8
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const unsub = x.onChange((latestX) => {
      setTrail((prev) => {
        const next = [{ x: latestX, y: y.get() }, ...prev]
        return next.slice(0, trailMax)
      })
    })
    return () => unsub()
  }, [x, y])

  // 4) Listen for pointer moves
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
      {/* trailing dots */}
      {trail.map((pos, i) => {
        const opacity = 1 - i / trailMax
        const size = 16 * (1 - i / (trailMax * 1.2)) // shrink each dot
        return (
          <motion.div
            key={i}
            className="fixed pointer-events-none rounded-full bg-[rgba(30,144,255,0.3)]"
            style={{
              x: pos.x - size / 2,
              y: pos.y - size / 2,
              width: size,
              height: size,
              opacity,
              zIndex: 9998,
              filter: 'blur(2px)'
            }}
          />
        )
      })}

      {/* main orb + ring */}
      <motion.svg
        width={28}
        height={28}
        viewBox="0 0 24 24"
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
        }}
      >
        {/* inner pulsing orb */}
        <motion.circle
          cx="12"
          cy="12"
          r="5"
          fill="rgba(30,144,255,0.9)"
          animate={{ r: [5, 8, 5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* outer rotating ring */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="rgba(30,144,255,0.5)"
          strokeWidth="2"
          strokeDasharray="69.12"      // 2π·11
          strokeDashoffset={[0, 69.12]}
          animate={{ strokeDashoffset: [0, -69.12] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.svg>
    </>
  )
}
