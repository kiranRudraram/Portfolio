// components/Experience.js
import { motion } from 'framer-motion'
import DiagonalDivider from './DiagonalDivider'

const experiences = [
  { company:'Cigniti Technologies', title:'Security Analyst', date:'May 2022 – Apr 2023', bullets:[
      'Remediated 15+ critical web app vulnerabilities via OWASP ZAP & Burp Suite.',
      'Reduced external attack surface by addressing 100+ CVEs in production.',
      'Automated security scans in CI/CD, lowering vulnerabilities by ~20%.',
      'Enhanced AWS security via IAM policies & network segmentation.',
    ],
  },
  { company:'Wesco', title:'SOC Analyst Intern', date:'Jun 2024 – Dec 2024', bullets:[
      'Triaged 50+ daily alerts in Splunk & ELK, cutting false positives by 20%.',
      'Documented and escalated 15+ phishing/malware incidents.',
      'Mapped attacker infra via OSINT, reducing phishing risk by 35%.',
    ],
  },
]

export default function Experience() {
  return (
    <>
      {/* diagonal up from Skills */}
      <div className="overflow-hidden leading-[0]">
        <DiagonalDivider reverse />
      </div>

      <motion.section
        id="experience"
        className="py-16 px-4 bg-gray-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">Experience</h2>
        <div className="space-y-8 text-white">
          {experiences.map(exp => (
            <div key={exp.company}>
              <h3 className="text-xl font-semibold">
                {exp.title} @ {exp.company}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{exp.date}</p>
              <ul className="list-disc list-inside space-y-1">
                {exp.bullets.map((b,i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  )
}
