// components/Projects.js
import { motion } from 'framer-motion'

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
      'Developed and tested Solidity smart contracts locally with Foundry and Ganache, ensuring 100% reliability.',
    technologies: ['Solidity', 'Foundry', 'TypeScript'],
    skills: ['Smart Contract Dev', 'Testing', 'Blockchain Security'],
    icons: ['/icons/solidity.png', '/icons/foundry.png', '/icons/typescript.png'],
  },
]

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Projects That Shaped My Journey.
        </h2>
        <p className="text-center text-blue-400 mb-12 italic">
          Showcasing real-world impacts, technical depth, and a security-first mindset.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(project => (
            <motion.div
              key={project.id}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-transform duration-300"
              whileHover={{ scale: 1.03 }}
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4">{project.description}</p>

              {/* Technologies Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-sm px-2 py-1 bg-gray-700 rounded-full text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 bg-gray-700 rounded-full text-green-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Tech Stack Icons */}
              <div className="flex space-x-4 mt-2">
                {project.icons.map(src => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-6 w-6 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
