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

        {/* ── Fiocchetto — top-right ── */}
        <g filter="url(#irisGlowD)">
          {/* Left wing */}
          <path
            d="M 67,37 C 64,33 60,32 61,35 C 62,38 65,38 67,37"
            fill="var(--color-primary-15, rgba(0,255,255,0.15))"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right wing */}
          <path
            d="M 67,37 C 70,33 74,32 73,35 C 72,38 69,38 67,37"
            fill="var(--color-primary-15, rgba(0,255,255,0.15))"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left tail */}
          <path
            d="M 67,37 C 65,39 64,41 63,43"
            fill="none"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Right tail */}
          <path
            d="M 67,37 C 69,39 70,41 71,43"
            fill="none"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Center knot */}
          <circle
            cx="67" cy="37" r="1.8"
            fill="var(--color-primary, #0ff)"
            stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
            strokeWidth="0.4"
          />
        </g>

        {/* ── Neo (beauty mark) ── */}
        <circle
          cx="65" cy="63" r="1.5"
          fill="var(--color-primary, #0ff)"
          filter="url(#irisGlowD)"
        />
      </svg>
    </div>
  );
};

export default Iris;
