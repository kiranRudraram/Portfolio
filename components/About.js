// components/About.js
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const aboutText = `Cybersecurity professional with hands-on experience in Application Security, threat modeling, and vulnerability management. A detail-oriented and action-oriented individual specializing in secure coding practices, cloud security, and automation scripting. Master of Science in Cybersecurity (University of North Texas ’25).`;

export default function About() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete]   = useState(false);
  const typingSpeed = 50; // ms per character

  useEffect(() => {
    if (!inView) return;

    // clear any previous text
    setDisplayText('');
    setIsComplete(false);

    // for each character, schedule a timeout
    aboutText.split('').forEach((char, idx) => {
      setTimeout(() => {
        setDisplayText(prev => prev + char);
        // when we've typed the last character, mark complete
        if (idx === aboutText.length - 1) {
          setIsComplete(true);
        }
      }, idx * typingSpeed);
    });
  }, [inView]);

  return (
    <motion.section
      id="about"
      ref={ref}
      className="py-16 px-4 bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* faux CLI prompt */}
      <h2 className="mb-4 text-2xl font-mono font-semibold text-green-400">
        <span className="text-gray-300">$</span> about-me
      </h2>

      {/* terminal window */}
      <div className="bg-black text-green-400 font-mono p-6 rounded-lg min-h-[10rem]">
        <pre className="whitespace-pre-wrap leading-relaxed">
          {displayText}
          {!isComplete && <span className="inline-block animate-blink">|</span>}
        </pre>
      </div>
    </motion.section>
  );
}
