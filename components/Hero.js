// components/Hero.js
import { useState } from 'react';
import NetworkGlobe from './NetworkGlobe';
import DecryptText from './DecryptText';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [taglineUnlocked, setTaglineUnlocked] = useState(false);
  const tagline = 'Cybersecurity | AppSec | Cloud Security | Vulnerability & Risk Mgmt';
  // each letter reveal delay so full tagline finishes in ~2s
  const revealDelay = Math.floor(2000 / tagline.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D network globe background */}
      <NetworkGlobe />

      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* your name + lock/tagline on top */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-6">
        {/* 💥 Name Reveal */}
        <DecryptText
          text="Sai Kiran Rudraram"
          scrambleSpeed={50}
          revealDelay={180}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white"
        />

        {/* 🔐 Lock + “Unlock Me” / Tagline */}
        <div className="flex items-center space-x-4">
          {!taglineUnlocked ? (
            <LockClosedIcon
              onClick={() => setTaglineUnlocked(true)}
              className="w-8 h-8 text-[#1E90FF] cursor-pointer animate-pulse hover:animate-bounce transition"
            />
          ) : (
            <LockOpenIcon
              onClick={() => setTaglineUnlocked(false)}
              className="w-8 h-8 text-[#39FF14] cursor-pointer hover:scale-110 transition"
            />
          )}

          {!taglineUnlocked ? (
            <span className="px-4 py-2 bg-white/10 rounded uppercase font-semibold text-white">
              UNLOCK ME
            </span>
          ) : (
            <DecryptText
              text={tagline}
              scrambleSpeed={30}
              revealDelay={revealDelay}
              className="text-xl sm:text-2xl font-medium text-white"
            />
          )}
        </div>
      </div>
    </section>
  );
}
