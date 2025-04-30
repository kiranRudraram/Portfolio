// components/DecryptText.js
import { useEffect, useState } from 'react';

export default function DecryptText({
  text,
  scrambleSpeed = 80,
  revealDelay = 50,
  className = '',
  onComplete,
}) {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // initialize with a full random scramble
  const makeScrambled = () =>
    text.split('').map(ch =>
      ch === ' ' ? '\u00A0' : alphabet[Math.floor(Math.random() * alphabet.length)]
    );

  const [display, setDisplay] = useState(makeScrambled);

  useEffect(() => {
    let revealIndex = 0;
    let done = false;

    const scrambleInterval = setInterval(() => {
      setDisplay(d =>
        d.map((ch, i) => {
          if (text[i] === ' ') return '\u00A0';
          if (i < revealIndex) return text[i];
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        })
      );
    }, scrambleSpeed);

    const revealNext = () => {
      if (revealIndex < text.length) {
        revealIndex++;
        setTimeout(revealNext, revealDelay);
      } else {
        clearInterval(scrambleInterval);
        setDisplay(text.split('').map(ch => (ch === ' ' ? '\u00A0' : ch)));
        if (!done && onComplete) {
          done = true;
          onComplete();
        }
      }
    };
    revealNext();

    return () => clearInterval(scrambleInterval);
  // ← only re-run on a new `text`; ignore onComplete identity changes
  }, [text, scrambleSpeed, revealDelay]);

  const letterDelay = 50;

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
              ch === text[i] || (text[i] === ' ' && ch === '\u00A0') ? 1 : 0.4,
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
