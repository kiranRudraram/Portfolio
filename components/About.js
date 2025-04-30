// components/About.js
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import DiagonalDivider from './DiagonalDivider'

const aboutText = `
Cybersecurity Analyst with a strong foundation in securing systems, detecting threats, and reducing risk across complex environments. I specialize in application security, cloud hardening, vulnerability management, and scripting-based automation – bringing both technical depth and proactive problem-solving to every engagement.

Graduating with a Master of Science in Cybersecurity from the University of North Texas on May 9, 2025, I’ve already applied my skills in real-world scenarios: remediating high-impact CVEs, simulating phishing attacks, integrating security into CI/CD pipelines, and refining incident response playbooks.

🔐 I don't just find security gaps—I build solutions to close them.
`

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete]   = useState(false)
  // speed up typing
  const typingSpeed = 30

  useEffect(() => {
    if (!inView) return
    setDisplayText('')
    setIsComplete(false)
    aboutText.split('').forEach((ch, i) =>
      setTimeout(() => {
        setDisplayText(prev => prev + ch)
        if (i === aboutText.length - 1) setIsComplete(true)
      }, i * typingSpeed)
    )
  }, [inView])

  return (
    <>
      <motion.section
        id="about"
        ref={ref}
        className="relative py-20 px-4 bg-gray-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Heading & Tagline */}
        <h2 className="mb-2 text-4xl font-bold text-center text-white">
          The Mind Behind the Mission.
        </h2>
        <p className="mb-8 text-center text-green-400 italic text-lg">
          Building secure systems. Protecting what matters.
        </p>

        {/* Typing-terminal card */}
        <div
          className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg"
          style={{ aspectRatio: '1131 / 521' }}
        >
          <Image
            src="/images/terminal-bg.png"
            alt="Terminal window"
            fill
            className="object-contain object-top filter brightness-125"
            priority
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <pre
            className="absolute inset-0 z-10 pt-16 px-8 pb-6 font-mono text-green-400 text-base sm:text-lg whitespace-pre-wrap leading-relaxed"
          >
            {displayText}
            {!isComplete && <span className="inline-block animate-blink">|</span>}
          </pre>
        </div>
      </motion.section>

      {/* diagonal down into Skills */}
      <DiagonalDivider />
    </>
  )
}
