// components/About.js
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const aboutText = `Cybersecurity professional with hands-on experience in Application Security, threat modeling, and vulnerability management. A detail-oriented and action-oriented individual specializing in secure coding practices, cloud security, and automation scripting. Master of Science in Cybersecurity (University of North Texas ’25).`

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete]   = useState(false)
  const typingSpeed = 50

  useEffect(() => {
    if (!inView) return
    setDisplayText('')
    setIsComplete(false)

    aboutText.split('').forEach((char, i) => {
      setTimeout(() => {
        setDisplayText(prev => prev + char)
        if (i === aboutText.length - 1) setIsComplete(true)
      }, i * typingSpeed)
    })
  }, [inView])

  return (
    <motion.section
      id="about"
      ref={ref}
      className="py-16 px-4 bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* 1) Centered CLI prompt */}
      <h2 className="mb-8 text-2xl font-mono font-semibold text-green-400 text-center">
        <span className="text-gray-300">$</span> about-me
      </h2>

      {/* 2) Responsive terminal “window” */}
      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg"
        style={{ aspectRatio: '1131 / 521' }} // match your PNG’s exact dimensions
      >
        {/* 3) Fill-mode PNG, brightened */}
        <Image
          src="/images/terminal-bg.png"
          alt="Terminal window"
          fill
          className="object-contain object-top filter brightness-125"
          priority
        />

        {/* 4) Light overlay so text stands out */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* 5) Typewriter text, with responsive font */}
        <pre className="absolute inset-0 z-10 pt-16 px-6 pb-6 font-mono text-green-400 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
          {displayText}
          {!isComplete && <span className="inline-block animate-blink">|</span>}
        </pre>
      </div>
    </motion.section>
  )
}
