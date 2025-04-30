// components/Hero.js
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadFull } from '@tsparticles/engine'
import NetworkGlobe from './NetworkGlobe'
import DecryptText from './DecryptText'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'

// initialize tsParticles engine
const particlesInit = async (engine) => {
  await loadFull(engine)
}

const particlesOptions = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: '#39FF14' },
    shape: { type: 'circle' },
    opacity: { value: 0.2 },
    size: { value: 1.5 },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      outModes: 'out',
    },
  },
  interactivity: { events: { onHover: { enable: false } } },
  detectRetina: true,
}

export default function Hero() {
  const [taglineUnlocked, setTaglineUnlocked] = useState(false)
  const [showStatus, setShowStatus]           = useState(false)
  const tagline =
    'Cybersecurity | AppSec | Cloud Security | Vulnerability & Risk Mgmt'
  const revealDelay = Math.floor(2000 / tagline.length)

  // 5s timer for status text
  useEffect(() => {
    let timer
    if (taglineUnlocked) {
      setShowStatus(false)
      timer = setTimeout(() => setShowStatus(true), 5000)
    } else {
      setShowStatus(false)
    }
    return () => clearTimeout(timer)
  }, [taglineUnlocked])

  // parallax mouse tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePos({ x, y })
  }

  const BG_FACTOR = 5
  const FG_FACTOR = 20

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{ perspective: 800 }}
    >
      {/* Particles Background */}
      <Particles
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Parallax Globe */}
      <motion.div
        style={{
          x: mousePos.x * BG_FACTOR,
          y: mousePos.y * BG_FACTOR,
        }}
        className="absolute inset-0 z-5"
      >
        <NetworkGlobe />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        style={{
          x: mousePos.x * BG_FACTOR * 0.3,
          y: mousePos.y * BG_FACTOR * 0.3,
        }}
        className="absolute inset-0 bg-black/60 z-10"
      />

      {/* Foreground Content */}
      <motion.div
        style={{
          x: -mousePos.x * FG_FACTOR * 0.5,
          y: -mousePos.y * FG_FACTOR * 0.5,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-6 z-20"
      >
        <DecryptText
          text="Sai Kiran Rudraram"
          scrambleSpeed={50}
          revealDelay={180}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white"
        />

        <div className="flex items-center space-x-4">
          {/* Lock icon + tooltip */}
          <div className="relative inline-block group">
            {!taglineUnlocked ? (
              <LockClosedIcon
                onClick={() => setTaglineUnlocked(true)}
                className="w-8 h-8 text-[#1E90FF] cursor-pointer animate-pulse hover:animate-bounce transition"
              />
            ) : (
              <LockOpenIcon
                onClick={() => setTaglineUnlocked(false)}
                className="w-8 h-8 text-[#39FF14] cursor-pointer hover:scale-110 transition"
              />
            )}
            <span className="
              absolute -top-6 left-1/2 transform -translate-x-1/2
              bg-black text-white text-xs rounded px-2 py-1
              opacity-0 group-hover:opacity-100 transition-opacity
            ">
              Secured by SKR
            </span>
          </div>

          {!taglineUnlocked ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="px-4 py-2 bg-white/10 rounded uppercase font-semibold text-white"
            >
              UNLOCK ME
            </motion.span>
          ) : (
            <DecryptText
              text={tagline}
              scrambleSpeed={30}
              revealDelay={revealDelay}
              className="text-xl sm:text-2xl font-medium text-white"
            />
          )}
        </div>

        {/* Status after countdown */}
        {showStatus && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-lg sm:text-xl text-green-400"
          >
            🚀 Actively looking for Cyber Roles | Based in TX, USA
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
