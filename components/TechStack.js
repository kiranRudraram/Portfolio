// components/TechStack.js
import { motion } from 'framer-motion'

const techLogos = [
  'python',
  'aws',
  'azure',
  'splunk',
  'nmap',
  'burpsuite',
  'javascript',
  // add whatever else you like
].map(name => ({
  name,
  src: `/icons/${name}.png`
}))

export default function TechStack() {
  // we duplicate the array so it can scroll seamlessly
  const logos = [...techLogos, ...techLogos]

  return (
    <section id="tech" className="py-16 px-4 bg-gray-900">
      <h2 className="mb-8 text-3xl font-bold text-white text-center">
        My Tech Stack
      </h2>

      {/* Marquee 1: left → right */}
      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-8"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30
          }}
        >
          {logos.map((logo, i) => (
            <img
              key={`l1-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-16 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>

      {/* Marquee 2: right → left */}
      <div className="overflow-hidden mt-8">
        <motion.div
          className="flex items-center gap-8"
          animate={{ x: ['-100%', '0%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30
          }}
        >
          {logos.map((logo, i) => (
            <img
              key={`l2-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-16 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
