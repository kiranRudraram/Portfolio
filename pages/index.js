// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import MatrixRain    from '../components/MatrixRain';
import Hero          from '../components/Hero';
import About         from '../components/About';
import Skills        from '../components/Skills';
import Experience    from '../components/Experience';
import Projects      from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact       from '../components/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-black text-white">
        {loading ? (
          <MatrixRain />
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
  );
}
