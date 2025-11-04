import { useState, useEffect, useRef } from 'react';

const LandingPageOldEye = ({ startTime }) => {
  const [uptime, setUptime] = useState('0m 0s');
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState('N/A');
  const [network, setNetwork] = useState('UNKNOWN');
  const [isEyeGlitching, setIsEyeGlitching] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 500, y: 500 });
  const [isNearEye, setIsNearEye] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalsRef = useRef([]);
  const eyeRef = useRef(null);

  const handleEyeClick = () => {
    setIsEyeGlitching(true);
    setTimeout(() => {
      setIsEyeGlitching(false);
    }, 400);
  };

  // Track mouse movement near eye
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      
      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      let activationRadius = 300;
      
      if (deltaY > 0) {
        activationRadius = 150;
      }
      
      if (distance < activationRadius) {
        setIsNearEye(true);
        
        const eyeRect = eyeRef.current.getBoundingClientRect();
        
        const svgWidth = 1000;
        const svgHeight = 1000;
        
        const relativeX = (e.clientX - eyeRect.left) / eyeRect.width;
        const relativeY = (e.clientY - eyeRect.top) / eyeRect.height;
        
        let newX = relativeX * svgWidth;
        let newY = relativeY * svgHeight;
        
        // Calcolo limiti: il cerchio piccolo (r=35) può toccare il contorno interno dell'occhio
        // Il contorno ha forma ellittica centrata in (500, 500)
        // Movimento ellittico: più ampio orizzontalmente, più stretto verticalmente
        const centerX = 500;
        const centerY = 500;
        const maxRadiusX = 95; // raggio orizzontale più ampio
        const maxRadiusY = 65; // raggio verticale originale
        
        // Calcola la distanza dal centro in forma ellittica
        const deltaFromCenterX = newX - centerX;
        const deltaFromCenterY = newY - centerY;
        
        // Normalizza per l'ellisse
        const normalizedDistance = Math.sqrt(
          (deltaFromCenterX * deltaFromCenterX) / (maxRadiusX * maxRadiusX) +
          (deltaFromCenterY * deltaFromCenterY) / (maxRadiusY * maxRadiusY)
        );
        
        // Se supera il limite ellittico, proietta sul bordo dell'ellisse
        if (normalizedDistance > 1) {
          const angle = Math.atan2(deltaFromCenterY, deltaFromCenterX);
          newX = centerX + Math.cos(angle) * maxRadiusX;
          newY = centerY + Math.sin(angle) * maxRadiusY;
        }
        
        setPupilPosition({ x: newX, y: newY });
      } else {
        if (isNearEye) {
          setIsNearEye(false);
          setPupilPosition({ x: 500, y: 500 });
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
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
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Share Tech Mono', monospace",
      animation: 'fadeInScan 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    }}>
      <style>{`
        @keyframes titleGlitch {
          0%, 100% {
            opacity: 1;
          }
          23% {
            opacity: 1;
          }
          25% {
            opacity: 0.5;
          }
          27% {
            opacity: 1;
          }
          64% {
            opacity: 1;
          }
          66% {
            opacity: 0.5;
          }
          68% {
            opacity: 1;
          }
        }

        @keyframes rotateSquare1 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateSquare2 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .eye-svg {
        }

        @keyframes glitchEffect {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg) drop-shadow(0 0 15px rgba(6, 182, 212, 0.4));
          }
          10% {
            transform: translate(-2px, 0);
            filter: hue-rotate(90deg) drop-shadow(0 0 20px rgba(255, 0, 100, 0.6));
          }
          20% {
            transform: translate(2px, 0);
            filter: hue-rotate(-90deg) drop-shadow(0 0 25px rgba(0, 255, 100, 0.6));
          }
          30% {
            transform: translate(-3px, 1px);
            filter: hue-rotate(180deg) drop-shadow(0 0 30px rgba(255, 0, 255, 0.7));
          }
          40% {
            transform: translate(3px, -1px);
            filter: hue-rotate(-180deg) drop-shadow(0 0 20px rgba(255, 255, 0, 0.5));
          }
          50% {
            transform: translate(-1px, 2px);
            filter: hue-rotate(45deg) drop-shadow(0 0 35px rgba(0, 255, 255, 0.8));
          }
          60% {
            transform: translate(2px, -2px);
            filter: hue-rotate(-45deg) drop-shadow(0 0 25px rgba(255, 0, 0, 0.6));
          }
          70% {
            transform: translate(-3px, 0);
            filter: hue-rotate(120deg) drop-shadow(0 0 30px rgba(100, 255, 0, 0.7));
          }
          80% {
            transform: translate(1px, 1px);
            filter: hue-rotate(-120deg) drop-shadow(0 0 20px rgba(255, 100, 255, 0.5));
          }
          90% {
            transform: translate(-2px, -1px);
            filter: hue-rotate(270deg) drop-shadow(0 0 40px rgba(0, 100, 255, 0.8));
          }
        }

        @keyframes glitchScan {
          0%, 100% {
            clip-path: inset(0 0 0 0);
          }
          10% {
            clip-path: inset(20% 0 60% 0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
          }
          30% {
            clip-path: inset(40% 0 40% 0);
          }
          40% {
            clip-path: inset(0 0 80% 0);
          }
          50% {
            clip-path: inset(80% 0 0 0);
          }
          60% {
            clip-path: inset(30% 0 50% 0);
          }
          70% {
            clip-path: inset(50% 0 30% 0);
          }
          80% {
            clip-path: inset(10% 0 70% 0);
          }
          90% {
            clip-path: inset(70% 0 10% 0);
          }
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
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
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
          color: rgba(103, 232, 249, 0.6);
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
          color: rgba(6, 182, 212, 0.5);
          font-weight: 600;
        }

        .metric-value {
          color: rgba(103, 232, 249, 0.8);
        }

        @media (max-width: 768px) {
          .system-metrics {
            font-size: 0.65rem;
            bottom: 1rem;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 90%;
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
          zIndex: 0
        }}
      />

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

      <main style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          maxWidth: '1400px',
          width: '100%'
        }}>
          <div className="eye-container" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}>
              <svg 
                width="500" 
                height="500" 
                viewBox="0 0 500 500"
                style={{
                  animation: 'rotateSquare1 60s linear infinite',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))'
                }}
              >
                <rect
                  x="50"
                  y="50"
                  width="400"
                  height="400"
                  fill="none"
                  stroke="rgba(0, 255, 255, 0.5)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}>
              <svg 
                width="500" 
                height="500" 
                viewBox="0 0 500 500"
                style={{
                  animation: 'rotateSquare2 45s linear infinite',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))'
                }}
              >
                <rect
                  x="50"
                  y="50"
                  width="400"
                  height="400"
                  fill="none"
                  stroke="rgba(0, 255, 255, 0.5)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Old Eye SVG with tracking */}
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
                  
                  {/* Clip path per il contorno dell'occhio */}
                  <clipPath id="eyeContourClip">
                    <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"/>
                  </clipPath>
                </defs>
                
                <g>
                  {/* Eye shape - outer contour */}
                  <path
                    d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"
                    fill="none"
                    stroke="rgba(0, 255, 255, 0.95)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#eyeGlow)"
                  />
                  
                  {/* Pupil group - clipped by eye contour */}
                  <g clipPath="url(#eyeContourClip)">
                    {/* Outer circle - moves with cursor */}
                    <circle 
                      cx={pupilPosition.x} 
                      cy={pupilPosition.y} 
                      r="80" 
                      fill="none"
                      stroke="rgba(0, 255, 255, 0.95)"
                      strokeWidth="10"
                      filter="url(#eyeGlow)"
                      style={{
                        transition: isNearEye ? 'cx 0.15s ease-out, cy 0.15s ease-out' : 'cx 0.3s ease-in, cy 0.3s ease-in'
                      }}
                    />
                    
                    {/* Inner pupil - moves with cursor */}
                    <circle 
                      cx={pupilPosition.x} 
                      cy={pupilPosition.y} 
                      r="35" 
                      fill="none"
                      stroke="rgba(0, 255, 255, 0.95)"
                      strokeWidth="8"
                      filter="url(#eyeGlow)"
                      style={{
                        transition: isNearEye ? 'cx 0.15s ease-out, cy 0.15s ease-out' : 'cx 0.3s ease-in, cy 0.3s ease-in'
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>

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
              color: '#0ff',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 15px rgba(0, 255, 255, 0.35), 0 0 25px rgba(0, 255, 255, 0.2)',
              marginBottom: '2rem',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animation = 'titleGlitch 2s ease-in-out infinite';
              e.currentTarget.style.textShadow = '0 0 12px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 35px rgba(0, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animation = 'none';
              e.currentTarget.style.textShadow = '0 0 8px rgba(0, 255, 255, 0.6), 0 0 15px rgba(0, 255, 255, 0.35), 0 0 25px rgba(0, 255, 255, 0.2)';
            }}>
              CONSULENZE<br/>DIGITALI
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
              lineHeight: 1.6,
              fontFamily: "'Share Tech Mono', monospace"
            }}>
              Creo la tua presenza digitale da zero, o ti aiuto a migliorare quella che già hai.
            </p>
          </div>
        </div>

        <style>{`
          @media (min-width: 1025px) {
            .eye-svg {
              width: 650px;
              height: 650px;
            }
          }

          @media (max-width: 1024px) {
            main {
              padding: 1rem !important;
              min-height: 100vh !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            main > div {
              flex-direction: column !important;
              gap: 2.5rem !important;
              justify-content: center !important;
              align-items: center !important;
              height: auto !important;
            }
            
            .eye-container {
              flex: 0 0 auto !important;
            }

            .eye-container svg[width="500"] {
              width: 280px !important;
              height: 280px !important;
            }
            
            .eye-svg {
              width: 350px !important;
              height: 350px !important;
            }
            
            .text-container {
              flex: 0 0 auto !important;
              text-align: center !important;
            }
            
            .text-container h1 {
              font-size: 2rem !important;
              margin-bottom: 1rem !important;
              line-height: 1.2 !important;
              text-align: center !important;
            }
            
            .text-container p {
              font-size: 0.95rem !important;
              line-height: 1.5 !important;
              text-align: center !important;
              margin: 0 auto !important;
            }
          }
          
          @media (max-width: 480px) {
            main {
              padding: 0.75rem !important;
            }
            
            main > div {
              gap: 2rem !important;
            }

            .eye-container svg[width="500"] {
              width: 220px !important;
              height: 220px !important;
            }
            
            .eye-svg {
              width: 280px !important;
              height: 280px !important;
            }
            
            .text-container h1 {
              font-size: 1.6rem !important;
              margin-bottom: 0.75rem !important;
              letter-spacing: 0.1em !important;
            }
            
            .text-container p {
              font-size: 0.875rem !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default LandingPageOldEye;