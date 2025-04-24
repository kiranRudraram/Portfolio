// components/Certifications.js
import { motion } from 'framer-motion';

const certs = [
  'ISC2 Certified in Cybersecurity (CC)',
  'EC-Council CEHv12',
  'CompTIA Security+',
  'Advanced Penetration Testing (Infosec Train)',
];

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      className="py-16 px-4 bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold mb-6">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {certs.map(cert => (
          <div key={cert} className="p-4 bg-gray-800 rounded text-center">
            {cert}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
