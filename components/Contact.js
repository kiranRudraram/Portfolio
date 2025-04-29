// components/Contact.js
import { useState, useEffect, useRef }   from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Confetti                          from 'react-confetti'
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope
} from 'react-icons/fa'

export default function Contact() {
  const [form, setForm]           = useState({ name:'', email:'', message:'' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // in-view for slide-in
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' })

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
    if (!form.name.trim())    errs.name    = 'Name is required'
    if (!form.email.trim())   errs.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
                              errs.email   = 'Invalid email'
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
    // TODO: hook up backend
    setErrors({})
    setSubmitted(true)
    setShowConfetti(true)
    setForm({ name:'', email:'', message:'' })
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const spring = { type: 'spring', stiffness: 60, damping: 20 }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Left illustration */}
      <motion.img
        src="/images/contact-left.png"
        alt="Monitoring Station"
        initial={{ x: -300, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ ...spring, delay: 0.2 }}
        className="
          hidden md:block
          absolute left-1/4 top-1/2
          transform -translate-x-1/2 -translate-y-1/2
          w-80 lg:w-96 pointer-events-none
        "
      />

      {/* Right illustration */}
      <motion.img
        src="/images/contact-right.png"
        alt="Security Word Cloud"
        initial={{ x: 300, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ ...spring, delay: 0.2 }}
        className="
          hidden md:block
          absolute right-1/4 top-1/2
          transform translate-x-1/2 -translate-y-1/2
          w-80 lg:w-96 pointer-events-none
        "
      />

      {/* Center form */}
      <div className="max-w-lg mx-auto px-4 relative z-10">
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

        {/* Confirmation */}
        <div className="mt-6">
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="bg-green-500 text-white px-4 py-2 rounded text-center mx-auto max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                🎉 Message sent!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social + Email Icon */}
        <div className="mt-12 flex justify-center space-x-6 text-2xl">
          {[
            {
              icon: FaLinkedin,
              href: 'https://www.linkedin.com/in/kiran-rudraram/',
            },
            {
              icon: FaGithub,
              href: 'https://github.com/kiranRudraram',
            },
            {
              icon: FaInstagram,
              href: 'https://www.instagram.com/kiran_rudraram/',
            },
            // Gmail web compose
            {
              icon: FaEnvelope,
              href:
                'https://mail.google.com/mail/?view=cm&fs=1&to=kiranrudraram@gmail.com',
            },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400"
              whileHover={{ scale: 1.2, color: '#39FF14' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Confetti */}
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
    </section>
  )
}
