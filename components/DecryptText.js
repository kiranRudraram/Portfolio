// components/DecryptText.js
import { useEffect, useState } from 'react';

export default function DecryptText({
  text,
  scrambleSpeed = 80,
  revealDelay = 50,        // default faster now
  className = '',
}) {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // create an initial full scramble
  const makeScrambled = () =>
    text.split('').map(ch =>
      ch === ' ' ? '\u00A0' : alphabet[Math.floor(Math.random() * alphabet.length)]
    );

  // initialize state already scrambled
  const [display, setDisplay] = useState(makeScrambled);

  useEffect(() => {
    let revealIndex = 0;

    // keep re-scrambling unrevealed letters
    const scrambleInterval = setInterval(() => {
      setDisplay(d =>
        d.map((ch, i) => {
          if (text[i] === ' ') return '\u00A0';
          if (i < revealIndex) return text[i];
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        })
      );
    }, scrambleSpeed);

    // bump the reveal index quickly
    const revealNext = () => {
      if (revealIndex < text.length) {
        revealIndex++;
        setTimeout(revealNext, revealDelay);
      } else {
        clearInterval(scrambleInterval);
        // lock in final text
        setDisplay(text.split('').map(ch => (ch === ' ' ? '\u00A0' : ch)));
      }
    };
    revealNext();

    return () => clearInterval(scrambleInterval);
  }, [text, scrambleSpeed, revealDelay]);

  // how long each letter waits before its CSS animation
  const letterDelay = 50;   // lower = faster per-letter fade/slide

  return (
    <h1 className={`flex font-extrabold text-white ${className}`}>
      {display.map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
            transitionDelay: `${i * letterDelay}ms`,
            opacity:
              ch === text[i] || (text[i] === ' ' && ch === '\u00A0')
                ? 1
                : 0.4,
            transform:
              ch === text[i] || (text[i] === ' ' && ch === '\u00A0')
                ? 'translateX(0)'
                : 'translateX(-8px)',
          }}
        >
          {ch}
        </span>
      ))}
    </h1>
  );
}
