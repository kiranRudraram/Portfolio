// pages/index.js
import Head from 'next/head'
import { useState, useEffect } from 'react'
import MatrixRain     from '../components/MatrixRain'
import Navbar         from '../components/Navbar'
import Hero           from '../components/Hero'
import About          from '../components/About'
import Skills         from '../components/Skills'
import Experience     from '../components/Experience'
import Projects       from '../components/Projects'
import Certifications from '../components/Certifications'
import Contact        from '../components/Contact'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Sai Kiran Rudraram | Cybersecurity Portfolio</title>
        <meta
          name="description"
          content="Sai Kiran Rudraram – Cybersecurity | AppSec | Cloud Security | Vulnerability & Risk Management"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-black text-white">
        {/* Sticky Navbar */}
        <Navbar />

        {loading ? (
          <div className="relative min-h-screen overflow-hidden">
            <MatrixRain />
          </div>
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </>
        )}
      </div>
    </>
  )
}
