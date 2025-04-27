// components/Experience.js
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Cigniti Technologies',
    title: 'Security Analyst',
    date: 'May 2022 – Apr 2023',
    bullets: [
      'Worked in a dedicated team of 5 to design and implement security solutions aligned with business requirements.',
      'Conducted in-depth AppSec assessments with OWASP ZAP & Burp Suite, remediating 15+ critical vulnerabilities.',
      'Optimized Splunk SIEM rules, cutting incident response time by 25%.',
      'Automated OWASP ZAP & Burp checks in CI/CD, lowering vulnerabilities ~20%.',
      'Implemented AWS IAM policies & network segmentation to mitigate cloud risks.',
      'Refined incident response playbooks and ran simulated attack drills to reduce MTTR.',
    ],
  },
  {
    company: 'Wesco',
    title: 'SOC Analyst Intern',
    date: 'Jun 2024 – Dec 2024',
    bullets: [
      'Triaged 50+ daily alerts in Splunk & ELK, reducing false positives by 20%.',
      'Resolved 15+ phishing/malware incidents—documented IOCs and escalated high-severity threats.',
      'Mapped attacker infra via OSINT (VirusTotal, Shodan), cutting phishing risk 35%.',
      'Scanned networks with Nessus, identified 50+ CVEs, and collaborated with DevOps on AWS remediation.',
    ],
  },
  {
    company: 'Virtusa Consulting',
    title: 'Security Quality Analyst Intern',
    date: 'Dec 2021 – Mar 2022',
    bullets: [
      'Gained hands-on experience in regression, negative & bug testing across the SDLC.',
      'Wrote Python scripts to automate vulnerability scanning & reporting, cutting manual effort 30%.',
      'Performed security assessments & log analysis to harden system configurations.',
      'Collaborated on usability tests and detailed reports to improve software stability.',
    ],
  },
]

// polar→cartesian helpers for SVG arcs
function polarToCartesian(cx, cy, r, angle) {
  const a = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}
function describeArc(cx, cy, r, start, end) {
  const p1 = polarToCartesian(cx, cy, r, end)
  const p2 = polarToCartesian(cx, cy, r, start)
  const largeArc = end - start <= 180 ? 0 : 1
  return `
    M ${cx} ${cy}
    L ${p1.x} ${p1.y}
    A ${r} ${r} 0 ${largeArc} 0 ${p2.x} ${p2.y}
    Z
  `
}

export default function Experience() {
  const containerRef = useRef(null)
  const [selected, setSelected] = useState(0)

  // snap-scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSelected(+e.target.dataset.index)
          }
        })
      },
      { root: containerRef.current, threshold: 0.6 }
    )
    containerRef.current
      .querySelectorAll('.exp-slide')
      .forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (i) => {
    const el = document.querySelector(`[data-index="${i}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // SVG donut settings
  const size = 320
  const r = size / 2 - 10      // leave small padding so center image can be larger
  const cx = size / 2
  const cy = size / 2
  const totalSlices = experiences.length + 1  // +1 for the pitch slide
  const sliceAngle = 360 / totalSlices

  // spinner dash setup (25% of circumference)
  const circumference = 2 * Math.PI * r
  const dashLength = circumference * 0.25

  // three-sentence pitch
  const pitch = `I'm a Master's graduate in Cybersecurity with hands-on AppSec, cloud-security, and SOC experience. I drive down risk through automation, close CVEs before they become headlines, and build resilient detection pipelines. Let's turn threats into insights and secure your organization end-to-end.`

  return (
    <section id="experience" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Experience</h2>

        <div className="mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
          {/* ─── Left: Donut + Dots ─── */}
          <div className="relative">
            <svg width={size} height={size} className="block mx-auto">
              {/* pitch spinner */}
              {selected === 0 && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="rgba(57,255,20,0.8)"
                  strokeWidth={8}
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeLinecap="round"
                  style={{ transformOrigin: '50% 50%' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'linear',
                  }}
                />
              )}

              {/* static slices */}
              {[...Array(totalSlices)].map((_, idx) => {
                // skip drawing the spinner slice for idx===0
                if (idx === 0) return null
                const start = sliceAngle * idx
                const end = sliceAngle * (idx + 1)
                return (
                  <motion.path
                    key={idx}
                    d={describeArc(cx, cy, r, start, end)}
                    fill={
                      selected === idx
                        ? 'rgba(57,255,20,0.8)'
                        : 'rgba(255,255,255,0.1)'
                    }
                    onClick={() => scrollTo(idx)}
                  />
                )
              })}
            </svg>

            {/* fixed center image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-green-400 shadow-xl">
                <img
                  src="/images/exp.png"
                  alt="Security"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* vertical nav dots */}
            <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 flex flex-col space-y-3">
              {Array.from({ length: totalSlices }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    selected === i ? 'bg-green-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ─── Right: Snap-scroll Slides ─── */}
          <div
            ref={containerRef}
            className="flex-1 h-[400px] overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          >
            {/* slide 0: pitch */}
            <div
              className="exp-slide snap-start h-full flex flex-col justify-center px-6"
              data-index={0}
            >
              <h3 className="text-2xl font-semibold">Why Hire Me?</h3>
              <p className="mt-4 text-gray-300">{pitch}</p>
            </div>

            {/* slides 1–n: each experience */}
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-slide snap-start h-full flex flex-col justify-center px-6"
                data-index={i + 1}
              >
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 max-w-2xl"
                >
                  <h3 className="text-2xl font-semibold">
                    {exp.title}{' '}
                    <span className="text-green-400">@ {exp.company}</span>
                  </h3>
                  <p className="text-sm text-gray-400">{exp.date}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
