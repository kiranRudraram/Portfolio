// components/DecryptText.js
import { useEffect, useState } from 'react';

export default function DecryptText({
  text,
  scrambleSpeed = 80,
  revealDelay = 200,
  className = '',
}) {
  const [display, setDisplay] = useState(
    () => text.split('').map(ch => (ch === ' ' ? '\u00A0' : ''))
  );

  useEffect(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let revealIndex = 0;
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
      }
    };
    revealNext();

    return () => clearInterval(scrambleInterval);
  }, [text, scrambleSpeed, revealDelay]);

  return (
    <h1 className={`flex font-extrabold text-white ${className}`}>
      {display.map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
            transitionDelay: `${i * 70}ms`,
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
