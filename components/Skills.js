// components/Skills.js
import { motion } from 'framer-motion';

const skills = [
  'AppSec Testing',
  'Vulnerability Management',
  'Threat Modeling',
  'Secure Coding',
  'AWS & Azure Security',
  'Python & Bash Scripting',
  'SIEM (Splunk, ELK)',
  'NIST CSF & MITRE ATT&CK',
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map(skill => (
          <div
            key={skill}
            className="p-4 bg-gray-800 rounded text-center font-medium"
          >
            {skill}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
