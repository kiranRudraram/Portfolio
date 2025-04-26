// components/Skills.js
import { motion } from 'framer-motion'
import DiagonalDivider from './DiagonalDivider'

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
    logos: ['wireshark', 'metasploit', 'nmap', 'splunk', 'burpsuite', 'aws', 'azure'],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    logos: ['windows', 'kali-linux', 'macos', 'ubuntu'],
  },
]

export default function Skills() {
  return (
    <>
      {/* diagonal from previous section */}
      <div className="overflow-hidden leading-[0]">
        <DiagonalDivider reverse />
      </div>

      <section id="skills" className="relative z-10 bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="mb-16 text-3xl font-bold text-center">My Skills</h2>

          {categories.map(({ id, title, logos }, idx) => {
            const items = [...logos, ...logos]
            const even = idx % 2 === 0
            const fromX = even ? '0%' : '-50%'
            const toX   = even ? '-50%' : '0%'

            return (
              <div key={id} className="mb-16">
                <h3 className="mb-6 text-2xl font-semibold text-center">
                  {title}
                </h3>
                {/* pad both sides so logos never hit the edges */}
                <div className="overflow-hidden px-4">
                  <motion.div
                    className="flex items-center justify-between gap-8"
                    animate={{ x: [fromX, toX] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
                  >
                    {items.map((logo, i) => (
                      <img
                        key={`${logo}-${i}`}
                        src={`/icons/${logo}.png`}
                        alt={logo}
                        className="h-16 w-auto object-contain drop-shadow-lg"
                        loading="lazy"
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* diagonal into next section */}
      <div className="overflow-hidden leading-[0]">
        <DiagonalDivider />
      </div>
    </>
  )
}
