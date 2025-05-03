import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Confetti from 'react-confetti'
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope
} from 'react-icons/fa'

import ProjectsBackground from './ProjectsBackground'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => setSubmitted(false), 3000)
      return () => clearTimeout(t)
    }
  }, [submitted])

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
    setShowConfetti(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const spring = { type: 'spring', stiffness: 60, damping: 20 }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden text-white flex flex-col"
    >
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 pointer-events-none z-10">
        <ProjectsBackground />
      </div>
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-10" />

      {/* 🧩 Center Section (fills space) */}
      <div className="relative z-30 flex flex-col md:flex-row items-center justify-center flex-grow px-6 py-10 gap-10 md:gap-12 lg:gap-20">
        {/* Left Illustration */}
        <motion.img
          src="/images/contact-left.png"
          alt="Monitoring Station"
          initial={{ x: -300, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ ...spring, delay: 0.2 }}
          className="hidden md:block max-w-xs sm:max-w-sm lg:max-w-md pointer-events-none self-center"
        />

        {/* 📬 Form */}
        <div className="w-full max-w-md flex flex-col justify-center self-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Establish a Secure Connection
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Let's build resilient systems and safer futures. I'm just a message away.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                className="inline-block px-8 py-3 bg-green-400 text-black font-semibold rounded-full neon-btn hover:scale-105 transition"
                whileTap={{ scale: 0.9 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>

          {/* ✅ Confirmation */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="bg-green-500 text-white px-4 py-2 rounded text-center mx-auto max-w-xs mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                🎉 Message sent!
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🌍 Social Links */}
          <div className="mt-12 flex justify-center space-x-6 text-2xl">
            {[
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/kiran-rudraram/' },
              { icon: FaGithub, href: 'https://github.com/kiranRudraram' },
              { icon: FaInstagram, href: 'https://www.instagram.com/kiran_rudraram/' },
              {
                icon: FaEnvelope,
                href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kiranrudraram@gmail.com',
              },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Illustration */}
        <motion.img
          src="/images/contact-right.png"
          alt="Security Word Cloud"
          initial={{ x: 300, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ ...spring, delay: 0.2 }}
          className="hidden md:block max-w-xs sm:max-w-sm lg:max-w-md pointer-events-none self-center"
        />
      </div>

      {/* 🎊 Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            tweenDuration={3000}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        )}
      </AnimatePresence>

      {/* 🧷 Footer */}
      <footer className="relative z-30 text-center text-gray-400 text-sm py-4">
        <div>© {new Date().getFullYear()} Sai Kiran Rudraram. All rights reserved.</div>
        <div className="text-xs text-gray-600 mt-1">Last updated: May 02, 2025</div>
      </footer>
    </section>
  )
}
