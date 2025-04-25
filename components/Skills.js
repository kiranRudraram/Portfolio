// components/Skills.js
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'programming',
    title: 'Programming',
    logos: ['python', 'c', 'cpp', 'java', 'sql', 'javascript'],
  },
  {
    id: 'networking',
    title: 'Networking',
    logos: ['tcp-ip', 'dns', 'vpn', 'firewall'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    logos: ['nist-csf', 'mitre-attck', 'owasp', 'osint'],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud',
    logos: [
      'wireshark',
      'metasploit',
      'nmap',
      'splunk',
      'burpsuite',
      'aws',
      'azure',
    ],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    logos: ['windows', 'kali-linux', 'macos', 'ubuntu'],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 px-4 bg-gray-800 border-t border-gray-700"
    >
      <h2 className="mb-16 text-3xl font-bold text-center text-white">
        My Skills
      </h2>

      {categories.map(({ id, title, logos }, idx) => {
        // Double up the array for a seamless 50% translate loop
        const items = [...logos, ...logos]
        const even = idx % 2 === 0
        const fromX = even ? '0%' : '-50%'
        const toX   = even ? '-50%' : '0%'

        return (
          <div key={id} className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-center text-white">
              {title}
            </h3>

            <div className="overflow-hidden w-full max-w-4xl mx-auto">
              <motion.div
                className="flex items-center justify-center gap-8"
                animate={{ x: [fromX, toX] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 20,
                }}
              >
                {items.map((logo, i) => (
                  <img
                    key={`${logo}-${i}`}
                    src={`/icons/${logo}.png`}
                    alt={logo}
                    className="h-16 w-auto object-contain shadow-2xl"
                    loading="lazy"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
