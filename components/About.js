// components/About.js
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-16 px-4 bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="max-w-3xl leading-relaxed">
        Cybersecurity professional with hands-on experience in Application Security,
        threat modeling, and vulnerability management. A detail-oriented and
        action-oriented individual specializing in secure coding practices, cloud
        security, and automation scripting. Master of Science in Cybersecurity
        (University of North Texas ’25).
      </p>
    </motion.section>
  );
}
