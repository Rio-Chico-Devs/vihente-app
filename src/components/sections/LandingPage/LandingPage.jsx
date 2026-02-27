import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../contexts/theme';
import './LandingPage.css';

const LandingPageOldEye = ({ startTime }) => {
  const { theme } = useTheme();

  const colors = theme === 'light' ? {
    primary: 'rgba(232, 160, 48, 1)',
    primary95: 'rgba(232, 160, 48, 0.95)',
    primary60: 'rgba(232, 160, 48, 0.6)',
    primary50: 'rgba(232, 160, 48, 0.5)',
    primary40: 'rgba(232, 160, 48, 0.4)',
    primary35: 'rgba(232, 160, 48, 0.35)',
    primary30: 'rgba(232, 160, 48, 0.3)',
    primary20: 'rgba(232, 160, 48, 0.2)',
    primary15: 'rgba(232, 160, 48, 0.15)',
    primary10: 'rgba(232, 160, 48, 0.1)',
    primary05: 'rgba(232, 160, 48, 0.05)',
    bg: '#080604',
    text: '#e8dcc8',
    textMuted: 'rgba(196, 154, 108, 0.9)',
    accent: 'rgba(232, 160, 48, 0.6)',
    accentMuted: 'rgba(196, 154, 108, 0.5)',
    accentLight: 'rgba(232, 180, 100, 0.8)',
  } : {
    primary: 'rgba(0, 255, 255, 1)',
    primary95: 'rgba(0, 255, 255, 0.95)',
    primary60: 'rgba(0, 255, 255, 0.6)',
    primary50: 'rgba(0, 255, 255, 0.5)',
    primary40: 'rgba(0, 255, 255, 0.4)',
    primary35: 'rgba(0, 255, 255, 0.35)',
    primary30: 'rgba(0, 255, 255, 0.3)',
    primary20: 'rgba(0, 255, 255, 0.2)',
    primary15: 'rgba(0, 255, 255, 0.15)',
    primary10: 'rgba(0, 255, 255, 0.1)',
    primary05: 'rgba(0, 255, 255, 0.05)',
    bg: '#000',
    text: '#fff',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    accent: 'rgba(6, 182, 212, 0.6)',
    accentMuted: 'rgba(6, 182, 212, 0.5)',
    accentLight: 'rgba(103, 232, 249, 0.8)',
  };

  const [uptime, setUptime] = useState('0m 0s');
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState('N/A');
  const [network, setNetwork] = useState('UNKNOWN');
  const [isEyeGlitching, setIsEyeGlitching] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 500, y: 500 });
  const [isNearEye, setIsNearEye] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showClickMessage, setShowClickMessage] = useState(false);
  const [clickMessage, setClickMessage] = useState('');

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalsRef = useRef([]);
  const eyeRef = useRef(null);
  const targetPositionRef = useRef({ x: 500, y: 500 });
  const currentPositionRef = useRef({ x: 500, y: 500 });
  const interpolationFrameRef = useRef(null);
  const directionChangesRef = useRef([]);
  const lastDirectionRef = useRef(null);
  const lastPositionRef = useRef(null);
  const clickMessageTimeoutRef = useRef(null);

  const handleEyeClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    setIsEyeGlitching(true);
    setTimeout(() => setIsEyeGlitching(false), 400);

    let msg = '';
    if (newCount === 10) msg = 'Molto divertente.';
    else if (newCount === 100) msg = 'Serie di click seri.';
    else if (newCount === 175) msg = 'Quanto ancora puoi resistere?';
    else if (newCount === 300) msg = 'Vorrei vedere ancora una volta la luce del sole...';
    else if (newCount === 420) msg = 'Loading 420 jokes...';
    else if (newCount === 555) msg = 'Incredibile.';
    else if (newCount === 1000) msg = "Non perdere altro tempo non c'è altro oltre questo punto.";
    else if (newCount === 1050) msg = "Davvero, non c'è altro.";
    else if (newCount > 1050 && (newCount - 1050) % 30 === 0) msg = 'Limit reached.';

    if (msg) {
      setClickMessage(msg);
      setShowClickMessage(true);
      if (clickMessageTimeoutRef.current) clearTimeout(clickMessageTimeoutRef.current);
      clickMessageTimeoutRef.current = setTimeout(() => setShowClickMessage(false), 3000);
    }
  };

  useEffect(() => {
    const smoothness = 0.15;

    function interpolate() {
      const current = currentPositionRef.current;
      const target = targetPositionRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        current.x = target.x;
        current.y = target.y;
      } else {
        current.x += dx * smoothness;
        current.y += dy * smoothness;
      }

      setPupilPosition({ x: current.x, y: current.y });
      interpolationFrameRef.current = requestAnimationFrame(interpolate);
    }

    interpolate();

    return () => {
      if (interpolationFrameRef.current) {
        cancelAnimationFrame(interpolationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!eyeRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

      if (!clientX || !clientY) return;

      const deltaX = clientX - eyeCenterX;
      const deltaY = clientY - eyeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const now = Date.now();

      if (distance < 300 && isNearEye) {
        const currentPos = { x: clientX, y: clientY };

        if (lastPositionRef.current) {
          const movementX = currentPos.x - lastPositionRef.current.x;
          const movementY = currentPos.y - lastPositionRef.current.y;
          const movementDistance = Math.sqrt(movementX * movementX + movementY * movementY);

          if (movementDistance > 5) {
            const directionX = movementX / movementDistance;
            const directionY = movementY / movementDistance;

            if (lastDirectionRef.current) {
              const dotProduct =
                lastDirectionRef.current.x * directionX +
                lastDirectionRef.current.y * directionY;

              if (dotProduct < 0.5) {
                directionChangesRef.current.push({
                  time: now,
                  angle: Math.acos(Math.max(-1, Math.min(1, dotProduct))) * (180 / Math.PI)
                });

                directionChangesRef.current = directionChangesRef.current.filter(
                  change => now - change.time < 3000
                );

                if (directionChangesRef.current.length >= 10) {
                  console.log('🎮 DETECTED: ' + directionChangesRef.current.length + ' direction changes in 3s');
                  directionChangesRef.current = [];
                  lastDirectionRef.current = null;
                  lastPositionRef.current = null;
                  return;
                }
              }
            }

            lastDirectionRef.current = { x: directionX, y: directionY };
          }
        }

        lastPositionRef.current = currentPos;
      } else {
        if (!isNearEye || distance >= 300) {
          directionChangesRef.current = [];
          lastDirectionRef.current = null;
          lastPositionRef.current = null;
        }
      }

      let activationRadius = 300;

      if (deltaY > 0) {
        activationRadius = 150;
      }

      if (distance < activationRadius) {
        setIsNearEye(true);

        const svgWidth = 1000;
        const svgHeight = 1000;

        const relativeX = (clientX - eyeRect.left) / eyeRect.width;
        const relativeY = (clientY - eyeRect.top) / eyeRect.height;

        let newX = relativeX * svgWidth;
        let newY = relativeY * svgHeight;

        const centerX = 500;
        const centerY = 500;
        const maxRadiusX = 95;
        const maxRadiusY = 65;

        const deltaFromCenterX = newX - centerX;
        const deltaFromCenterY = newY - centerY;

        const normalizedDistance = Math.sqrt(
          (deltaFromCenterX * deltaFromCenterX) / (maxRadiusX * maxRadiusX) +
          (deltaFromCenterY * deltaFromCenterY) / (maxRadiusY * maxRadiusY)
        );

        if (normalizedDistance > 1) {
          const angle = Math.atan2(deltaFromCenterY, deltaFromCenterX);
          newX = centerX + Math.cos(angle) * maxRadiusX;
          newY = centerY + Math.sin(angle) * maxRadiusY;
        }

        targetPositionRef.current = { x: newX, y: newY };
      } else {
        if (isNearEye) {
          setIsNearEye(false);
          targetPositionRef.current = { x: 500, y: 500 };
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      const clickMessageTimeout = clickMessageTimeoutRef.current;

      if (clickMessageTimeout) {
        clearTimeout(clickMessageTimeout);
      }
    };
  }, [isNearEye]);

  useEffect(() => {
    console.log('🎯 LandingPage mounted');

    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }));

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      setUptime(`${mins}m ${secs}s`);

      if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        setMemory(`${memoryMB}MB`);
      }

      const conn = navigator.connection;
      const netType = conn && conn.effectiveType ? conn.effectiveType.toUpperCase() : 'ONLINE';
      setNetwork(netType);
    }, 2000);

    intervalsRef.current.push(timeInterval);

    let frameCount = 0;
    let lastTime = performance.now();

    function measureFPS() {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 2000) {
        const calculatedFps = Math.round(frameCount * 1000 / (currentTime - lastTime));
        setFps(Math.min(calculatedFps, 60));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(measureFPS);
    }

    measureFPS();

    return () => {
      console.log('🧹 LandingPage cleanup START');

      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      console.log('✅ LandingPage cleanup COMPLETE');
    };
  }, [startTime]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEF0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function draw() {
      ctx.fillStyle = theme === 'light' ? 'rgba(8, 6, 4, 0.05)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.primary15;
      ctx.font = 'bold ' + fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i += 2) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 100);
    intervalsRef.current.push(interval);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, colors.bg, colors.primary15]);

  return (
    <div style={{
      background: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Share Tech Mono', monospace",
      animation: 'fadeInScan 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    }}>
      <style>{`
        @keyframes titleGlitch {
          0%, 100% { opacity: 1; }
          23% { opacity: 1; }
          25% { opacity: 0.5; }
          27% { opacity: 1; }
          64% { opacity: 1; }
          66% { opacity: 0.5; }
          68% { opacity: 1; }
        }

        @keyframes breathingBorder {
          0%, 100% {
            box-shadow: 0 0 2px ${colors.primary05}, 0 0 4px ${colors.primary05};
          }
          50% {
            box-shadow: 0 0 10px ${colors.primary20}, 0 0 15px ${colors.primary15};
          }
        }

        .holographic-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 350px;
          background: ${colors.bg};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          overflow: hidden;
          transition: all 0.5s ease;
          pointer-events: none;
          box-shadow: 0 0 2px ${colors.primary05}, 0 0 4px ${colors.primary05};
          animation: breathingBorder 6s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .holographic-circle {
            width: 300px;
            height: 300px;
          }
        }

        @media (min-width: 1024px) {
          .holographic-circle {
            width: 400px;
            height: 400px;
          }
        }

        @media (min-width: 1440px) {
          .holographic-circle {
            width: 500px;
            height: 500px;
          }
        }

        .holographic-circle::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            0deg,
            transparent,
            transparent 30%,
            ${colors.primary30}
          );
          transform: rotate(-45deg);
          transition: all 0.5s ease;
          opacity: 0;
        }

        .eye-container:hover .holographic-circle {
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 0 20px ${colors.primary50};
        }

        .eye-container:hover .holographic-circle::before {
          opacity: 1;
          transform: rotate(-45deg) translateY(100%);
        }

        @keyframes subtleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px ${colors.primary40});
          }
          50% {
            filter: drop-shadow(0 0 15px ${colors.primary60});
          }
        }

        .eye-svg {
          animation: subtleGlow 4s ease-in-out infinite;
        }

        @keyframes glitchEffect {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% {
            transform: translate(-2px, 0);
            filter: hue-rotate(90deg);
          }
          20% {
            transform: translate(2px, 0);
            filter: hue-rotate(-90deg);
          }
          30% {
            transform: translate(-3px, 1px);
            filter: hue-rotate(180deg);
          }
          40% {
            transform: translate(3px, -1px);
            filter: hue-rotate(-180deg);
          }
          50% {
            transform: translate(-1px, 2px);
            filter: hue-rotate(45deg);
          }
        }

        @keyframes glitchScan {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(40% 0 40% 0); }
          40% { clip-path: inset(0 0 80% 0); }
          60% { clip-path: inset(80% 0 0 0); }
          80% { clip-path: inset(30% 0 50% 0); }
        }

        .eye-glitch {
          position: relative;
          display: inline-block;
        }

        .eye-glitch.active svg {
          animation:
            glitchEffect 0.1s ease-in-out 2,
            glitchScan 0.05s steps(5) 4;
        }

        @keyframes fadeInScan {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .click-message {
          position: fixed;
          top: 70%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Share Tech Mono', monospace;
          font-size: 1rem;
          color: ${colors.primary95};
          text-shadow: 0 0 5px ${colors.primary60};
          z-index: 1000;
          pointer-events: none;
        }

        .system-metrics {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: row;
          gap: 2rem;
          font-size: 0.75rem;
          color: ${colors.accent};
          z-index: 10;
          user-select: none;
          font-family: 'Share Tech Mono', monospace;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.8;
        }

        .metric-label {
          color: ${colors.accentMuted};
          font-weight: 600;
        }

        .metric-value {
          color: ${colors.accentLight};
        }

        .eye-svg {
          width: 480px;
          height: 480px;
        }

        .landing-page-main {
          padding: 0.75rem !important;
          min-height: 100vh !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
        }

        .landing-page-main > div {
          flex-direction: column-reverse !important;
          gap: 1.5rem !important;
          justify-content: center !important;
          align-items: center !important;
          height: auto !important;
        }

        .eye-container {
          flex: 0 0 auto !important;
        }

        .text-container {
          flex: 0 0 auto !important;
          text-align: center !important;
        }

        .text-container h1 {
          font-size: 1.6rem !important;
          margin-bottom: 0.75rem !important;
          line-height: 1.2 !important;
          text-align: center !important;
          letter-spacing: 0.1em !important;
        }

        .text-container p {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
          text-align: center !important;
          margin: 0 auto !important;
        }

        @media (min-width: 768px) {
          .eye-svg {
            width: 400px;
            height: 400px;
          }

          .landing-page-main {
            padding: 1rem !important;
          }

          .landing-page-main > div {
            gap: 2.5rem !important;
          }

          .text-container h1 {
            font-size: 4rem !important;
            margin-bottom: 1rem !important;
            letter-spacing: 0.15em !important;
          }

          .text-container p {
            font-size: 0.95rem !important;
          }
        }

        @media (min-width: 1024px) {
          .eye-svg {
            width: 500px;
            height: 500px;
          }

          .landing-page-main {
            padding: 2rem !important;
          }

          .landing-page-main > div {
            flex-direction: row !important;
            gap: 4rem !important;
          }

          .text-container {
            text-align: left !important;
            order: 1;
          }

          .eye-container {
            order: 2;
          }

          .text-container h1 {
            text-align: left !important;
            letter-spacing: 0.2em !important;
          }

          .text-container p {
            text-align: left !important;
            font-size: 1.1rem !important;
          }
        }

        @media (min-width: 1440px) {
          .eye-svg {
            width: 650px;
            height: 650px;
          }

          .text-container p {
            font-size: 1.3rem !important;
          }
        }

        @media (max-width: 767px) {
          .system-metrics {
            font-size: 0.65rem;
            bottom: 0.75rem;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 90%;
          }

          .landing-page-main {
            padding: 0.5rem 0.75rem !important;
          }

          .landing-page-main > div {
            gap: 0.5rem !important;
          }
        }

        @media (max-width: 380px){
          .eye-svg {
            width: 350px;
            height: 350px;
          }
          .holographic-circle {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {showClickMessage && <div className="click-message">{clickMessage}</div>}

      <div className="system-metrics">
        <div className="metric-item">
          <span className="metric-label">UPTIME:</span>
          <span className="metric-value">{uptime}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">TIME:</span>
          <span className="metric-value">{currentTime}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">FPS:</span>
          <span className="metric-value">{fps}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">MEM:</span>
          <span className="metric-value">{memory}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">NET:</span>
          <span className="metric-value">{network}</span>
        </div>
      </div>

      <div className="landing-page-main" style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          maxWidth: '1400px',
          width: '100%'
        }}>
          <div style={{
            flex: '1',
            textAlign: 'left',
            maxWidth: '700px'
          }}
          className="text-container">
            <h1 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textShadow: `0 0 8px ${colors.primary60}, 0 0 15px ${colors.primary35}, 0 0 25px ${colors.primary20}`,
              marginBottom: '2rem',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animation = 'titleGlitch 2s ease-in-out infinite';
              e.currentTarget.style.textShadow = `0 0 12px ${colors.primary}, 0 0 20px ${colors.primary50}, 0 0 35px ${colors.primary30}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animation = 'none';
              e.currentTarget.style.textShadow = `0 0 8px ${colors.primary60}, 0 0 15px ${colors.primary35}, 0 0 25px ${colors.primary20}`;
            }}>
              V//HENTE
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: colors.textMuted,
              margin: '0',
              lineHeight: 1.6,
              fontFamily: "'Share Tech Mono', monospace"
            }}>
              Creo la tua presenza digitale da zero, o ti aiuto a migliorare quella che già hai. Insieme, oltre le stelle.
            </p>
          </div>

          <div className="eye-container" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto'
          }}>
            <div className="holographic-circle"></div>

            <div
              ref={eyeRef}
              className={`eye-glitch ${isEyeGlitching ? 'active' : ''}`}
            >
              <svg
                className="eye-svg glitch-layer"
                viewBox="0 0 1000 1000"
                width="650"
                height="650"
                onClick={handleEyeClick}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <defs>
                  <filter id="eyeGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <clipPath id="eyeContourClip">
                    <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"/>
                  </clipPath>
                </defs>

                <g>
                  <path
                    d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"
                    fill="none"
                    stroke={colors.primary95}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#eyeGlow)"
                  />

                  <g clipPath="url(#eyeContourClip)">
                    <circle
                      cx={pupilPosition.x}
                      cy={pupilPosition.y}
                      r="80"
                      fill="none"
                      stroke={colors.primary95}
                      strokeWidth="10"
                      filter="url(#eyeGlow)"
                    />

                    <circle
                      cx={pupilPosition.x}
                      cy={pupilPosition.y}
                      r="35"
                      fill="none"
                      stroke={colors.primary95}
                      strokeWidth="8"
                      filter="url(#eyeGlow)"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageOldEye;
