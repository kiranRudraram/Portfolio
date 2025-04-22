// components/Hero.js
import { useState } from 'react';
import DecryptText from './DecryptText';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [taglineUnlocked, setTaglineUnlocked] = useState(false);
  const tagline =
    'Cybersecurity | AppSec | Cloud Security | Vulnerability & Risk Mgmt';
  // Compute delay so full reveal ≈ 2s
  const revealDelay = Math.floor(2000 / tagline.length);

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Semi‑dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Name Reveal (large font) */}
        <DecryptText
          text="Sai Kiran Rudraram"
          scrambleSpeed={50}
          revealDelay={150}
          className="text-5xl sm:text-6xl md:text-7xl"
        />

        {/* Lock + Tagline / Unlock */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          {!taglineUnlocked ? (
            <LockClosedIcon
              className="w-8 h-8 text-[#1E90FF] cursor-pointer animate-pulse hover:animate-bounce transition transform"
              onClick={() => setTaglineUnlocked(true)}
            />
          ) : (
            <LockOpenIcon
              className="w-8 h-8 text-[#39FF14] cursor-pointer hover:scale-110 transition transform"
              onClick={() => setTaglineUnlocked(false)}
            />
          )}

          {/* Placeholder or actual tagline */}
          {!taglineUnlocked ? (
            <span className="inline-block px-4 py-2 bg-white/10 rounded uppercase font-semibold text-white">
              UNLOCK ME
            </span>
          ) : (
            <DecryptText
              text={tagline}
              scrambleSpeed={30}
              revealDelay={revealDelay}
              className="text-base sm:text-lg md:text-xl font-semibold"
            />
          )}
        </div>
      </div>
    </section>
  );
}
