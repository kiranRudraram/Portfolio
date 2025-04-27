// components/Navbar.js
import { useState, useEffect } from 'react'
import Link from 'next/link'

const sections = [
  { id: 'hero',           label: 'Home' },
  { id: 'about',          label: 'About' },
  { id: 'skills',         label: 'Skills' },
  { id: 'experience',     label: 'Experience' },
  { id: 'projects',       label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return

    const onScroll = () => {
      // fade‐in navbar background once we leave hero
      setScrolled(container.scrollTop > window.innerHeight - 100)

      // scroll-spy: pick the section whose midpoint is in view
      const mid = container.clientHeight / 2
      for (let { id } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const cRect = container.getBoundingClientRect()

        // top relative to container
        const top = rect.top - cRect.top
        const bottom = top + rect.height

        if (top <= mid && bottom > mid) {
          setActiveSection(id)
          break
        }
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial highlight
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="text-white font-bold text-xl">SKR</div>

          {/* links */}
          <div className="hidden md:flex space-x-6">
            {sections.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <Link
                  key={id}
                  href={`#${id}`}
                  scroll={false}
                  className={`relative px-1 py-1 font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]'
                      : 'text-white hover:text-[#1E90FF]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#39FF14] animate-expand" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
