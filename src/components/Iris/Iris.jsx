import { useState, useEffect, useRef } from 'react';
import './Iris.css';

const Iris = () => {
  const [pupilPos, setPupilPos] = useState({ x: 50, y: 50 });
  const [blinking, setBlinking] = useState(false);
  const ref = useRef(null);

  // Cursor tracking — pupil follows mouse
  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      setPupilPos({
        x: 50 + Math.cos(angle) * 8,
        y: 50 + Math.sin(angle) * 6,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Idle random look
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.5) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 0.7;
        setPupilPos({ x: 50 + Math.cos(a) * 8 * d, y: 50 + Math.sin(a) * 6 * d });
        setTimeout(() => setPupilPos({ x: 50, y: 50 }), 1000 + Math.random() * 1000);
      }
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  // Blinking
  useEffect(() => {
    const id = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 100);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  const eyeOpacity = blinking ? 0 : 1;
  const pTrans     = 'cx 0.3s ease-out, cy 0.3s ease-out';

  return (
    <div className="iris-widget" ref={ref} aria-label="Iris">
      <svg
        className="iris-svg"
        viewBox="20 27 62 42"
        aria-hidden="true"
      >
        <defs>
          <filter id="irisGlowD">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="irisClipD">
            <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z" />
          </clipPath>
        </defs>

        {/* ── Eye outline ── */}
        <path
          d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
          fill="none"
          stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#irisGlowD)"
          style={{ opacity: eyeOpacity, transition: 'opacity 0.1s ease-in-out' }}
        />

        {/* ── Pupil (clipped inside eye) ── */}
        <g
          clipPath="url(#irisClipD)"
          style={{ opacity: eyeOpacity, transition: 'opacity 0.1s ease-in-out' }}
        >
          <circle
            cx={pupilPos.x} cy={pupilPos.y} r="8"
            fill="none"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="1"
            filter="url(#irisGlowD)"
            style={{ transition: pTrans }}
          />
          <circle
            cx={pupilPos.x} cy={pupilPos.y} r="3.5"
            fill="none"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.8"
            filter="url(#irisGlowD)"
            style={{ transition: pTrans }}
          />
        </g>

        {/* ── Papillon — filled, inclinato -45deg, top-right ── */}
        <g transform="translate(66,39) rotate(-45)" filter="url(#irisGlowD)">
          {/* Left wing — larga fuori, stretta al centro */}
          <path
            d="M -1.5,-1.2 C -2.5,-3 -4.5,-4.8 -7.5,-4.3 C -10,-3.8 -10.5,0 -7.5,4.3 C -4.5,4.8 -2.5,3 -1.5,1.2 C -1,0.5 -1,-0.5 -1.5,-1.2 Z"
            fill="var(--color-primary, #0ff)"
          />
          {/* Right wing — mirror */}
          <path
            d="M 1.5,-1.2 C 2.5,-3 4.5,-4.8 7.5,-4.3 C 10,-3.8 10.5,0 7.5,4.3 C 4.5,4.8 2.5,3 1.5,1.2 C 1,0.5 1,-0.5 1.5,-1.2 Z"
            fill="var(--color-primary, #0ff)"
          />
          {/* Nodo centrale — gap scuro + quadratino cyan */}
          <rect x="-2" y="-2" width="4" height="4" rx="0.8" fill="rgba(0,0,0,0.9)" />
          <rect x="-1.2" y="-1.2" width="2.4" height="2.4" rx="0.5" fill="var(--color-primary, #0ff)" />
        </g>

        {/* ── Neo (beauty mark) — spostato leggermente su ── */}
        <circle
          cx="65" cy="61" r="1.5"
          fill="var(--color-primary, #0ff)"
          filter="url(#irisGlowD)"
        />
      </svg>
    </div>
  );
};

export default Iris;
