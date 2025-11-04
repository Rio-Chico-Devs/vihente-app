import { useState, useEffect } from 'react';

const bootMessages = [
  '> LOADING DATA...',
  '> PREPARING HUD...',
  '> PARSING TEXT...',
  '> READY TO LAUNCH',
  '> INITIALIZING CACHE...',
  '> RENDERING COMPONENTS...',
  '> VIHENTE - ONLINE'
];

const bootMessagesMobile = [
  '> Initializing virtual DOM tree...',
  '> Hydrating SSR components and state...',
  '> Parsing async module dependencies...',
  '> Preloading critical render path assets...',
  '> Warming service worker cache layer...',
  '> Mounting root React fiber nodes...',
  '> VIHENTE - ONLINE'
];

const BootScreen = ({ onBootComplete }) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [terminal, setTerminal] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Static data for geometric pattern - calculated once
  const radialLines = Array.from({ length: 32 }, (_, i) => ({
    angle: (i * 360) / 32,
    isDashed: i % 2 === 0,
    isThick: i % 4 === 0
  }));

  const circles = [40, 60, 80, 100, 130, 160, 200, 250, 300, 350, 400, 450];

  const dots = radialLines.flatMap(({ angle }) => 
    [150, 200, 250, 300, 350, 400, 450].map(distance => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: 500 + Math.cos(rad) * distance,
        y: 500 + Math.sin(rad) * distance,
        size: distance < 250 ? 2 : 1.5
      };
    })
  );

  useEffect(() => {
    let messageInterval;
    let progressInterval;
    let progressTimeout;
    let currentMessageIndex = 0;
    
    // Use mobile or desktop messages
    const messages = isMobile ? bootMessagesMobile : bootMessages;

    // Terminal messages
    messageInterval = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        setTerminal(current => [...current, messages[currentMessageIndex]]);
        currentMessageIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 180);

    // Progress bar
    progressTimeout = setTimeout(() => {
      progressInterval = setInterval(() => {
        setBootProgress(prev => {
          const newProgress = prev + Math.random() * 18;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setTimeout(() => {
                onBootComplete();
              }, 600);
            }, 250);
            return 100;
          }
          return newProgress;
        });
      }, 150);
    }, 50);

    return () => {
      if (messageInterval) clearInterval(messageInterval);
      if (progressInterval) clearInterval(progressInterval);
      if (progressTimeout) clearTimeout(progressTimeout);
    };
  }, [onBootComplete, isMobile]);

  return (
    <div className="boot-screen-container">
      {/* Geometric Eye Pattern Background */}
      <div className="geometric-background">
        <svg className="geometric-pattern" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="cyanGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0099aa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background glow */}
          <circle cx="500" cy="500" r="400" fill="url(#cyanGlow)" opacity="0.2" />

          {/* Grid mesh overlay */}
          <g opacity="0.15">
            {Array.from({ length: 20 }, (_, i) => (
              <g key={i}>
                <line x1="0" y1={50 + i * 50} x2="1000" y2={50 + i * 50} stroke="rgba(0, 255, 255, 0.3)" strokeWidth="0.5" />
                <line x1={50 + i * 50} y1="0" x2={50 + i * 50} y2="1000" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="0.5" />
              </g>
            ))}
          </g>

          {/* Concentric circles */}
          <g className="concentric-circles">
            {circles.map((radius, i) => (
              <circle
                key={i}
                cx="500"
                cy="500"
                r={radius}
                fill="none"
                stroke="rgba(0, 255, 255, 0.6)"
                strokeWidth={i < 5 ? "1.5" : "1"}
                opacity={i < 5 ? "0.7" : "0.3"}
              />
            ))}
          </g>

          {/* Radial lines */}
          <g className="radial-lines">
            {radialLines.map(({ angle, isDashed, isThick }, index) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 500 + Math.cos(rad) * 480;
              const y2 = 500 + Math.sin(rad) * 480;
              
              return (
                <line
                  key={index}
                  x1="500"
                  y1="500"
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0, 255, 255, 0.5)"
                  strokeWidth={isThick ? "2" : "1"}
                  strokeDasharray={isDashed ? "5,5" : "none"}
                  opacity={isThick ? "0.8" : "0.4"}
                />
              );
            })}
          </g>

          {/* Inner complex grid */}
          <g opacity="0.4">
            {Array.from({ length: 12 }, (_, ring) => {
              const radius = 100 + ring * 25;
              const segments = 24 + ring * 4;
              return Array.from({ length: segments }, (_, seg) => {
                if (seg >= segments - 1) return null;
                
                const angle = (seg * 360) / segments;
                const nextAngle = ((seg + 1) * 360) / segments;
                const rad = (angle * Math.PI) / 180;
                const nextRad = (nextAngle * Math.PI) / 180;
                
                return (
                  <line
                    key={`${ring}-${seg}`}
                    x1={500 + Math.cos(rad) * radius}
                    y1={500 + Math.sin(rad) * radius}
                    x2={500 + Math.cos(nextRad) * radius}
                    y2={500 + Math.sin(nextRad) * radius}
                    stroke="rgba(0, 255, 255, 0.3)"
                    strokeWidth="0.5"
                  />
                );
              });
            })}
          </g>

          {/* Dots */}
          <g className="radial-dots">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r={dot.size}
                fill="rgba(0, 255, 255, 0.8)"
                className={`dot-${i % 3}`}
              />
            ))}
          </g>

          {/* Rotating outer diamond */}
          <g className="outer-diamond" opacity="0.6">
            <polygon
              points="500,100 750,500 500,900 250,500"
              fill="none"
              stroke="rgba(0, 255, 255, 0.6)"
              strokeWidth="2"
              strokeDasharray="10,5"
              filter="url(#glow)"
            />
          </g>

          {/* Complex Hexagonal Star - NEW rotating figure */}
          <g className="hexagonal-star" opacity="0.5">
            {/* Outer hexagon */}
            <polygon
              points="500,50 750,237.5 750,762.5 500,950 250,762.5 250,237.5"
              fill="none"
              stroke="rgba(0, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="8,4"
            />
            {/* Inner hexagon */}
            <polygon
              points="500,150 650,287.5 650,712.5 500,850 350,712.5 350,287.5"
              fill="none"
              stroke="rgba(0, 255, 255, 0.5)"
              strokeWidth="1.5"
            />
            {/* Star lines connecting vertices */}
            <line x1="500" y1="50" x2="500" y2="150" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <line x1="750" y1="237.5" x2="650" y2="287.5" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <line x1="750" y1="762.5" x2="650" y2="712.5" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <line x1="500" y1="950" x2="500" y2="850" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <line x1="250" y1="762.5" x2="350" y2="712.5" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <line x1="250" y1="237.5" x2="350" y2="287.5" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            {/* Diagonal star connections */}
            <line x1="500" y1="50" x2="750" y2="762.5" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="750" y1="237.5" x2="250" y2="762.5" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="750" y1="762.5" x2="250" y2="237.5" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
          </g>

          {/* Eye Symbol - SMALLER (only eye, not background) */}
          <g className="eye-symbol" filter="url(#glow)">
            <path
              d="M 410 500 
                 C 434 464, 467 448, 500 448
                 C 533 448, 566 464, 590 500
                 C 566 536, 533 552, 500 552
                 C 467 552, 434 536, 410 500 Z"
              fill="none"
              stroke="rgba(0, 255, 255, 0.95)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            <circle 
              cx="500" 
              cy="500" 
              r="45" 
              fill="none"
              stroke="rgba(0, 255, 255, 0.95)"
              strokeWidth="5"
            />
            
            <circle 
              cx="500" 
              cy="500" 
              r="20" 
              fill="none"
              stroke="rgba(0, 255, 255, 0.95)"
              strokeWidth="4"
            />
          </g>
        </svg>
      </div>

      <div className="boot-content">
        {/* Dynamic Loading Message - left aligned at top */}
        <div className="loading-message-container">
          {/* Desktop: single message */}
          <div className="loading-message loading-message-desktop">
            {terminal[terminal.length - 1] || '> INITIALIZING...'}
          </div>
          
          {/* Mobile: multiple messages stacked - all messages, newest grows down */}
          <div className="loading-messages-mobile">
            {terminal.map((message, index) => {
              const totalMessages = terminal.length;
              const opacity = Math.max(0.3, Math.min(1, 0.3 + (index / totalMessages) * 0.7));
              return (
                <div key={index} className="loading-message-mobile" style={{ opacity }}>
                  {message}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Elegant Light Beam Progress Bar - at bottom */}
        <div className="light-beam-container">
          <div className="light-beam-track">
            {/* Progress fill - elegant gradient */}
            <div 
              className="light-beam-fill"
              style={{ width: `${bootProgress}%` }}
            />
            {/* Glowing head - EXTREMELY BRIGHT */}
            <div 
              className="light-beam-head"
              style={{ left: `${bootProgress}%` }}
            />
          </div>
          {/* Progress percentage */}
          <div className="progress-percentage">
            {Math.floor(bootProgress)}%
          </div>
        </div>
      </div>

      <style>{`
        .boot-screen-container {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .geometric-background {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .geometric-pattern {
          width: 100vmin;
          height: 100vmin;
          max-width: 1200px;
          max-height: 1200px;
        }

        /* Geometric Pattern Animations */
        .radial-lines {
          animation: rotateLines 40s linear infinite;
          transform-origin: 500px 500px;
          will-change: transform;
        }

        .outer-diamond {
          animation: rotateDiamond 60s linear infinite;
          transform-origin: 500px 500px;
          will-change: transform;
        }

        .hexagonal-star {
          animation: rotateHexStar 80s linear infinite reverse;
          transform-origin: 500px 500px;
          will-change: transform;
        }

        .eye-symbol {
          animation: eyePulse 5s ease-in-out infinite;
          transform-origin: 500px 500px;
        }

        .concentric-circles {
          animation: circlesPulse 5s ease-in-out infinite;
        }

        .dot-0 {
          animation: dotPulse 3s ease-in-out infinite;
        }

        .dot-1 {
          animation: dotPulse 3s ease-in-out 1s infinite;
        }

        .dot-2 {
          animation: dotPulse 3s ease-in-out 2s infinite;
        }

        @keyframes rotateLines {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotateDiamond {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes rotateHexStar {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes eyePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes circlesPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .boot-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          padding: 3rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
        }

        /* Loading Message - Top Left */
        .loading-message-container {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .loading-message-desktop {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          color: rgba(6, 182, 212, 0.95);
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                       0 0 40px rgba(6, 182, 212, 0.4);
          animation: messagePulse 2s ease-in-out infinite;
          letter-spacing: 0.05em;
          text-align: left;
          display: block;
        }

        .loading-messages-mobile {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
        }

        .loading-message-mobile {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          color: rgba(6, 182, 212, 0.95);
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                       0 0 40px rgba(6, 182, 212, 0.4);
          letter-spacing: 0.05em;
          text-align: left;
          transition: opacity 0.3s ease-in-out;
        }

        @keyframes messagePulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* Light Beam Progress Bar - Bottom */
        .light-beam-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
          padding-bottom: 2rem;
        }

        .light-beam-track {
          position: relative;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(6, 182, 212, 0.1) 0%,
            rgba(6, 182, 212, 0.2) 50%,
            rgba(6, 182, 212, 0.1) 100%
          );
          border-radius: 9999px;
          overflow: visible;
        }

        .light-beam-fill {
          position: absolute;
          height: 100%;
          background: linear-gradient(90deg,
            rgba(6, 182, 212, 0.6) 0%,
            rgba(6, 182, 212, 0.8) 20%,
            rgba(103, 232, 249, 0.95) 60%,
            rgba(200, 245, 252, 1) 90%,
            rgba(255, 255, 255, 1) 100%
          );
          border-radius: 9999px;
          transition: width 0.3s ease-out;
          box-shadow: 0 0 8px rgba(103, 232, 249, 0.8),
                      0 0 16px rgba(6, 182, 212, 0.5),
                      0 0 24px rgba(6, 182, 212, 0.3);
        }

        .light-beam-head {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(90deg,
            rgba(103, 232, 249, 0.3) 0%,
            rgba(255, 255, 255, 0.95) 50%,
            rgba(103, 232, 249, 0.3) 100%
          );
          transform: translateX(-50%);
          transition: left 0.3s ease-out;
          box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.8),
                      0 0 12px 2px rgba(103, 232, 249, 0.6);
          filter: blur(0.3px);
        }

        .progress-percentage {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.875rem;
          color: rgba(103, 232, 249, 0.8);
          letter-spacing: 0.1em;
        }

        /* 📱 MOBILE RESPONSIVE - TABLET */
        @media (max-width: 1024px) {
          .boot-content {
            padding: 2.5rem 3rem;
          }

          .loading-message-desktop {
            font-size: 1.1rem;
          }

          .geometric-pattern {
            width: 90vmin;
            height: 90vmin;
          }
        }

        /* 📱 MOBILE RESPONSIVE - MOBILE LARGE */
        @media (max-width: 768px) {
          .boot-content {
            padding: 2rem 2.5rem;
          }

          /* MOBILE: Show multiple messages, hide desktop single */
          .loading-message-desktop {
            display: none;
          }

          .loading-messages-mobile {
            display: flex;
          }

          .progress-percentage {
            font-size: 0.8rem;
          }

          .geometric-pattern {
            width: 110vmin;
            height: 110vmin;
          }
        }

        /* 📱 MOBILE RESPONSIVE - MOBILE SMALL */
        @media (max-width: 480px) {
          .boot-content {
            padding: 1.5rem 2rem;
          }

          .loading-message-mobile {
            font-size: 0.8rem;
          }

          .progress-percentage {
            font-size: 0.75rem;
          }

          .light-beam-track {
            height: 2px;
          }

          .light-beam-head {
            width: 5px;
          }
        }

        /* 📱 MOBILE RESPONSIVE - EXTRA SMALL */
        @media (max-width: 380px) {
          .boot-content {
            padding: 1rem 1.5rem;
          }

          .loading-message-mobile {
            font-size: 0.75rem;
          }

          .progress-percentage {
            font-size: 0.7rem;
          }

          .light-beam-track {
            height: 2px;
          }

          .light-beam-head {
            width: 4px;
          }
        }

        /* 🎬 ANIMATIONS */
      `}</style>
    </div>
  );
};

export default BootScreen;