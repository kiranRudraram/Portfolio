// components/Certifications.js
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DataMeshBackground from './DataMeshBackground'

const badges = [
  { id: 'isc2',     img: '/certs/isc2.png' },
  { id: 'comptia',  img: '/certs/comptia-security-plus.png' },
  { id: 'ecouncil', img: '/certs/ecouncil-ceh.png' },
]

const certifications = [
  {
    id:     'isc2',
    thumb:  '/certs/isc2-full.png',
    full:   '/certs/isc2-full.png',
    title:  'ISC2 Certified in Cybersecurity',
    issuer: 'ISC2',
  },
  {
    id:     'comptia',
    thumb:  '/certs/Security-full.png',
    full:   '/certs/Security-full.png',
    title:  'CompTIA Security+',
    issuer: 'CompTIA',
  },
  {
    id:     'ecouncil',
    thumb:  '/certs/ceh-full.png',
    full:   '/certs/ceh-full.png',
    title:  'EC-Council CEH',
    issuer: 'EC-Council',
  },
  {
    id:     'infosec',
    thumb:  '/certs/infosec-full.png',
    full:   '/certs/infosec-full.png',
    title:  'Advanced Penetration Testing',
    issuer: 'Infosec Train',
  },
  {
    id:     'mastercard',
    thumb:  '/certs/mastercard-full.png',
    full:   '/certs/mastercard-full.png',
    title:  'Mastercard Cybersecurity Job Simulation',
    issuer: 'Mastercard',
  },
  {
    id:     'ceic',
    thumb:  '/certs/ceic-full.png',
    full:   '/certs/ceic-full.png',
    title:  'Career Essentials in Cybersecurity',
    issuer: 'Microsoft & LinkedIn',
  },
]

export default function Certifications() {
  const [open, setOpen] = useState(null)

  return (
    <section id="certifications" className="relative w-full h-screen snap-start overflow-hidden text-white">
    <DataMeshBackground />
    <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
  
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold">Verified Skills. Validated Trust.</h2>
        <p className="mt-2 text-green-400">
          Recognized by global leaders in cybersecurity education and defense.
        </p>

        {/* Badge Glass Cards */}
        <div className="mt-12 flex justify-center space-x-8">
          {badges.map(b => (
            <motion.div
              key={b.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg
    p-6 shadow-lg w-32 h-32 flex items-center justify-center
    transition duration-300 hover:border-blue-400"
              whileHover={{ rotateY: 15, rotateX: 5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              <img src={b.img} alt={b.id} className="max-h-full max-w-full object-contain" />
            </motion.div>
          ))}
        </div>

        {/* Unified Certifications Grid */}
        <h3 className="mt-16 text-2xl font-semibold">Certifications &amp; Training</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {certifications.map(cert => (
            <div key={cert.id} className="flex flex-col items-center">
              <motion.div
                className="w-full rounded-lg overflow-hidden cursor-pointer
    border border-transparent hover:border-blue-400
    transition duration-300"
                whileHover={{ scale: 1.05, opacity: 0.9 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                onClick={() => setOpen(cert)}
              >
                <img
                  src={cert.thumb}
                  alt={cert.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="mt-4 text-center">
                <p className="font-medium">{cert.title}</p>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>  

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gray-900 rounded-lg p-4 max-w-3xl w-full mx-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-2 right-2 text-white text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={open.full}
                alt={open.title}
                className="w-full h-auto object-contain rounded"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
