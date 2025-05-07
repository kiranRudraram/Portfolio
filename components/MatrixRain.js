import { useEffect, useRef } from 'react';
import NetworkGlobe from './NetworkGlobe'; // ✅ import the globe

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);

    let rafId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#39FF14';
      ctx.font = '16px monospace';

      drops.forEach((y, x) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, x * 20, y * 20);

        if (y * 20 > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-50"
      />

      {/* ✅ Preload NetworkGlobe behind MatrixRain */}
      <div className="fixed inset-0 opacity-0 pointer-events-none z-0">
        <NetworkGlobe />
      </div>
    </>
  );
}
