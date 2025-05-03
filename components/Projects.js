import { motion } from 'framer-motion'
import ProjectsBackground from './ProjectsBackground'

const projects = [
  {
    id: 'cybersneak',
    title: 'CyberSneak Secure E-commerce',
    description:
      'Built a secure sneaker store with end-to-end encryption and Stripe integration, reducing security incidents by 30%.',
    technologies: ['React', 'Stripe', 'AWS'],
    skills: ['Secure Coding', 'Payment Integration', 'Web Security'],
    icons: ['/icons/react.png', '/icons/stripe.png', '/icons/aws.png'],
  },
  {
    id: 'ransomware-sim',
    title: 'Ransomware Simulation',
    description:
      'Designed and executed a phishing-based ransomware simulation, increasing threat awareness by 50%.',
    technologies: ['Python', 'Scapy', 'Watchdog'],
    skills: ['Threat Modeling', 'Automation', 'Incident Response'],
    icons: ['/icons/python.png', '/icons/scapy.png', '/icons/monitoring.png'],
  },
  {
    id: 'smart-contracts',
    title: 'Blockchain Smart Contracts',
    description:
      'Developed and tested Solidity smart contracts locally, ensuring 100% reliability with automated Foundry tests.',
    technologies: ['Solidity', 'Foundry', 'TypeScript'],
    skills: ['Smart Contract Dev', 'Testing', 'Blockchain Security'],
    icons: ['/icons/solidity.png', '/icons/foundry.png', '/icons/typescript.png'],
  },
  {
    id: 'gesture-mouse',
    title: 'Gesture Controlled Virtual Mouse',
    description:
      'Implemented a contactless mouse driven by hand gestures and voice commands on Windows using MediaPipe CNN models via pybind11.',
    technologies: ['Machine Learning', 'Computer Vision', 'MediaPipe', 'pybind11'],
    skills: ['Gesture Recognition', 'Voice Integration', 'Python', 'CV Pipelines'],
    icons: [
      '/icons/python.png',
      '/icons/mediapipe.png',
      '/icons/pybind11.png',
      '/icons/computer-vision.png',
    ],
  },
]

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="relative w-full h-screen snap-start overflow-hidden text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ProjectsBackground />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col justify-start">
        {/* Heading */}
        <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-0">
          <h2 className="text-3xl font-bold text-center mb-2">
            Projects That Shaped My Journey.
          </h2>
          <p className="text-center text-blue-400 mb-6 italic">
            Showcasing real-world impact, technical depth, and a security-first mindset.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-6xl mx-auto">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800/75 p-5 rounded-lg border border-gray-700 hover:border-blue-400 shadow-lg transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-white">{proj.title}</h3>
              <p className="text-gray-300 mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map((tech) => (
                  <span key={tech} className="text-sm px-2 py-1 bg-gray-700 rounded-full text-blue-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-green-400">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 mt-2">
                {proj.icons.map((src) => (
                  <img key={src} src={src} alt="" className="h-6 w-6 object-contain hover:opacity-80 transition-opacity" loading="lazy" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: 2 Cards per Scroll Snap */}
        <div className="md:hidden flex-1 overflow-y-auto snap-y snap-mandatory px-4 pt-6 space-y-12 pb-10">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-center bg-gray-800/75 p-5 rounded-xl border border-gray-700 shadow-md"
            >
              <h3 className="text-lg font-bold mb-2 text-white">{proj.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-blue-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-green-400">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3 mt-1">
                {proj.icons.map((src) => (
                  <img key={src} src={src} alt="" className="h-5 w-5 object-contain" loading="lazy" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
