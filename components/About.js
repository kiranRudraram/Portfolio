import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const aboutText = `
> whoami
Cybersecurity Analyst with a strong foundation in securing systems, detecting threats, and reducing risk across complex environments. I specialize in application security, cloud hardening, vulnerability management, and scripting-based automation – bringing both technical depth and proactive problem-solving to every engagement.

Graduating with a Master of Science in Cybersecurity from the University of North Texas on May 9, 2025, I’ve already applied my skills in real-world scenarios: remediating high-impact CVEs, simulating phishing attacks, integrating security into CI/CD pipelines, and refining incident response playbooks.

🔐 I don't just find security gaps—I build solutions to close them.
`

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
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

  const octagonClip =
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'

  return (
    <motion.section
      id="about"
      ref={ref}
      className="relative w-full min-h-screen bg-gray-900 flex flex-col justify-center items-center px-6 py-20 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="mb-2 text-3xl sm:text-4xl font-bold text-center text-white">
        The Mind Behind the Mission.
      </h2>
      <p className="mb-12 text-center text-green-400 italic text-lg">
        Building secure systems. Protecting what matters.
      </p>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Image left */}
        <div className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div
            className="absolute -inset-0"
            style={{
              clipPath: octagonClip,
              boxShadow:
                '0 0 12px rgba(57,255,20,0.8), 0 0 24px rgba(57,255,20,0.6)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: octagonClip }}
          >
            <Image
              src="/images/your-photo.jpg"
              alt="Sai Kiran Rudraram"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Terminal right */}
        <div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
          <div className="h-10 bg-green-600 text-white px-4 flex items-center font-semibold text-sm sm:text-base">
            Command Prompt
          </div>
          <div className="pb-6 pt-4 px-6 bg-black min-h-[360px] sm:min-h-[420px]">
            <pre className="font-mono text-green-400 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
              {displayText}
              {!isComplete && (
                <span className="inline-block animate-blink">|</span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
