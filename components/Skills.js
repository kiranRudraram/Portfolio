import { useState } from 'react'
import ProjectsBackground from './ProjectsBackground'

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

const prettyName = str =>
  str
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')

export default function Skills() {
  const [hoverLabel, setHoverLabel] = useState(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const onMouseMove = (e, logo) => {
    setCoords({ x: e.clientX, y: e.clientY })
    setHoverLabel(prettyName(logo))
  }

  const onMouseLeave = () => setHoverLabel(null)

  return (
    <section
      id="skills"
      className="relative text-white py-24 px-4 scroll-mt-28 md:scroll-mt-32 overflow-hidden"
    >
      {/* 🔁 Your original background layers */}
      <div className="absolute inset-0 z-0 bg-skill-gradient" />
      <div className="absolute inset-0 z-10 bg-skill-noise" />

      {/* 🌟 New particle effect layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <ProjectsBackground />
      </div>

      {/* 💬 Foreground content */}
      <div className="relative z-30 w-full max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-1">
          My Arsenal of Skills.
        </h2>
        <p className="text-center text-green-400 italic mb-10">
          Technical precision. Real-world readiness.
        </p>

        {categories.map(({ id, title, logos }) => (
          <div key={id} className="mb-10 scroll-mt-20">
            <h3 className="text-center text-2xl font-semibold mb-4">{title}</h3>
            <div className="flex flex-wrap justify-center gap-4 px-2">
              {logos.map(logo => (
                <div
                  key={logo}
                  className="p-2 bg-gray-700 rounded-md cursor-pointer"
                  onMouseMove={e => onMouseMove(e, logo)}
                  onMouseLeave={onMouseLeave}
                >
                  <img
                    src={`/icons/${logo}.png`}
                    alt={logo}
                    className="h-12 w-auto object-contain drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Hover tooltip */}
        {hoverLabel && (
          <div
            style={{
              position: 'fixed',
              top: coords.y + 12,
              left: coords.x + 12,
              pointerEvents: 'none',
            }}
            className="bg-black/80 text-white text-xs py-1 px-2 rounded-md select-none z-50"
          >
            {hoverLabel}
          </div>
        )}
      </div>
    </section>
  )
}
