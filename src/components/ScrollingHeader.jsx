import { useState, useRef, useEffect, useCallback } from 'react';

const ScrollingHeader = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef(null);
  const positionRef = useRef(window.innerWidth);
  const speedRef = useRef(1);
  const directionRef = useRef(-1);
  const rafRef = useRef(null);
  const isControlPressed = useRef(false);
  const lastTimeRef = useRef(0);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const deltaTime = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;
    
    if (animationRef.current && (isPlaying || isControlPressed.current)) {
      const speed = speedRef.current;
      const direction = directionRef.current;
      const pixelsPerSecond = 60;
      const moveAmount = pixelsPerSecond * deltaTime * speed * direction;
      
      positionRef.current += moveAmount;
      
      const textWidth = animationRef.current.offsetWidth;
      if (positionRef.current < -textWidth) {
        positionRef.current = window.innerWidth;
      } else if (positionRef.current > window.innerWidth) {
        positionRef.current = -textWidth;
      }
      
      animationRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
    
    rafRef.current = requestAnimationFrame(animate);
  }, [isPlaying]);

  const startRewind = useCallback(() => {
    isControlPressed.current = true;
    speedRef.current = 2;
    directionRef.current = 1;
  }, []);

  const startFastForward = useCallback(() => {
    isControlPressed.current = true;
    speedRef.current = 2;
    directionRef.current = -1;
  }, []);

  const stopSpeedChange = useCallback(() => {
    isControlPressed.current = false;
    speedRef.current = 1;
    directionRef.current = -1;
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      width: '100%',
      height: '60px',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div
        onMouseDown={startRewind}
        onMouseUp={stopSpeedChange}
        onMouseLeave={stopSpeedChange}
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRight: '1px solid rgba(0, 255, 255, 0.3)',
          userSelect: 'none'
        }}
      >
        <span style={{
          color: '#0ff',
          fontSize: '1.2rem',
          fontFamily: 'Orbitron, monospace',
          fontWeight: 'bold'
        }}>
          &lt;&lt;
        </span>
      </div>

      <div
        onClick={togglePlayPause}
        style={{
          flex: 1,
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div
          ref={animationRef}
          style={{
            position: 'absolute',
            whiteSpace: 'nowrap',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: '#0ff',
            textShadow: '0 0 10px #0ff, 0 0 20px #0ff',
            willChange: 'transform',
            lineHeight: '60px'
          }}
        >
          {text}
        </div>
      </div>

      <div
        onMouseDown={startFastForward}
        onMouseUp={stopSpeedChange}
        onMouseLeave={stopSpeedChange}
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: 'rgba(0, 255, 255, 0.1)',
          borderLeft: '1px solid rgba(0, 255, 255, 0.3)',
          userSelect: 'none'
        }}
      >
        <span style={{
          color: '#0ff',
          fontSize: '1.2rem',
          fontFamily: 'Orbitron, monospace',
          fontWeight: 'bold'
        }}>
          &gt;&gt;
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="position: fixed"] { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ScrollingHeader;