// components/HeroMobile.js
import { useState } from 'react'
import { motion } from 'framer-motion'
import NetworkGlobe from './NetworkGlobe'
import DecryptText from './DecryptText'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'

export default function HeroMobile() {
  const [taglineUnlocked, setTaglineUnlocked] = useState(false)
  const [allowLine2, setAllowLine2] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const taglineLine1 = 'Cybersecurity Analyst | AppSec | Cloud Security'
  const taglineLine2 = 'Vulnerability & Risk Mgmt'
  const scrambleSpeed = 60

  // Trigger line 2 after line 1 finishes
  function handleLine1Done() {
    setAllowLine2(true)
  }

  // Trigger status after line 2 finishes
  function handleLine2Done() {
    setTimeout(() => setShowStatus(true), 400)
  }

  // Reset all when re-locking
  function resetState() {
    setTaglineUnlocked(false)
    setAllowLine2(false)
    setShowStatus(false)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center px-4 pt-10 pb-8 text-center">
      {/* Background Globe */}
      <div className="absolute inset-0 scale-[1.2] sm:scale-[1.6] opacity-50">
        <NetworkGlobe />
      </div>

      {/* Foreground Content */}
      <div className="z-20 space-y-6">
        {/* Name */}
        <DecryptText
          text="Sai Kiran Rudraram"
          scrambleSpeed={50}
          revealDelay={100}
          className="text-3xl font-extrabold text-white"
        />

        {/* Tagline + Unlock */}
        {!taglineUnlocked ? (
          <div className="flex items-center justify-center space-x-3">
            <LockClosedIcon
              onClick={() => setTaglineUnlocked(true)}
              className="w-6 h-6 text-blue-400 cursor-pointer animate-pulse"
            />
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="px-3 py-1 bg-white/10 rounded text-sm font-semibold"
            >
              UNLOCK ME
            </motion.span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <LockOpenIcon
                onClick={resetState}
                className="w-5 h-5 text-green-400 cursor-pointer"
              />
              <DecryptText
                text={taglineLine1}
                scrambleSpeed={scrambleSpeed}
                revealDelay={130}
                className="text-sm font-medium text-white"
                onComplete={handleLine1Done}
              />
            </div>

            {/* Line 2 starts ONLY after line 1 is fully decrypted */}
            {allowLine2 && (
              <DecryptText
                text={taglineLine2}
                scrambleSpeed={scrambleSpeed}
                revealDelay={0}
                className="text-sm font-medium text-white"
                onComplete={handleLine2Done}
              />
            )}
          </div>
        )}

        {/* Final Status */}
        {showStatus && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-xs text-green-400"
          >
            🚀 Actively looking for Cyber Roles | Based in TX, USA
          </motion.p>
        )}
      </div>
    </section>
  )
}
