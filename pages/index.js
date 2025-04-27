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

        {/* Scroll container: full‐screen, smooth scrolling, vertical snap */}
        <div id="scroll-container" className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
          {loading ? (
            // loader also participates in snap
            <div className="relative min-h-screen overflow-hidden snap-start">
              <MatrixRain />
            </div>
          ) : (
            <>
              <div className="snap-start"><Hero /></div>
              <div className="snap-start"><About /></div>
              <div className="snap-start"><Skills /></div>
              <div className="snap-start"><Experience /></div>
              <div className="snap-start"><Projects /></div>
              <div className="snap-start"><Certifications /></div>
              <div className="snap-start"><Contact /></div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
