import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NetworkGlobe from './NetworkGlobe'
import DecryptText from './DecryptText'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'

export default function HeroDesktop() {
  const [taglineUnlocked, setTaglineUnlocked] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [readyToDecrypt, setReadyToDecrypt] = useState(false)

  const tagline =
    'Cybersecurity Analyst | AppSec | Cloud Security | Vulnerability & Risk Mgmt'
  const revealDelay = Math.floor(2000 / tagline.length)

  useEffect(() => {
    const t = setTimeout(() => setReadyToDecrypt(true), 300)
    return () => clearTimeout(t)
  }, [])

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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePos({ x, y })
  }

  const BG_FACTOR = 10
  const FG_FACTOR = 30

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{
          x: mousePos.x * BG_FACTOR,
          y: mousePos.y * BG_FACTOR,
        }}
        className="absolute inset-0"
      >
        <NetworkGlobe />
      </motion.div>

      <motion.div
        style={{
          x: mousePos.x * BG_FACTOR * 0.5,
          y: mousePos.y * BG_FACTOR * 0.5,
        }}
        className="absolute inset-0 bg-black/60"
      />

      <motion.div
        style={{
          x: -mousePos.x * FG_FACTOR,
          y: -mousePos.y * FG_FACTOR,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-6"
      >
        {readyToDecrypt && (
          <DecryptText
            text="Sai Kiran Rudraram"
            scrambleSpeed={50}
            revealDelay={180}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white"
          />
        )}

        {readyToDecrypt && (
          <div className="flex items-center space-x-4">
            {!taglineUnlocked ? (
              <>
                <LockClosedIcon
                  onClick={() => setTaglineUnlocked(true)}
                  className="w-8 h-8 text-[#1E90FF] cursor-pointer animate-pulse hover:animate-bounce transition"
                />
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="px-4 py-2 bg-white/10 rounded uppercase font-semibold text-white"
                >
                  UNLOCK ME
                </motion.span>
              </>
            ) : (
              <DecryptText
                text={tagline}
                scrambleSpeed={50}
                revealDelay={revealDelay}
                className="text-xl sm:text-2xl font-medium text-white"
              />
            )}
          </div>
        )}

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
