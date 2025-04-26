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

  // fade-in background once you scroll past the hero block
  useEffect(() => {
    const onScrollBg = () => setScrolled(window.scrollY > window.innerHeight - 100)
    window.addEventListener('scroll', onScrollBg)
    onScrollBg()
    return () => window.removeEventListener('scroll', onScrollBg)
  }, [])

  // scroll-spy: watch when each section’s midpoint enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
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
          {/* Logo */}
          <div className="text-white font-bold text-xl">SKR</div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6">
            {sections.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <Link
                  key={id}
                  href={`#${id}`}
                  className={`
                    relative px-1 py-1 font-medium transition-colors duration-300
                    ${isActive
                      ? 'text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]'
                      : 'text-white hover:text-[#1E90FF]'
                    }
                  `}
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
