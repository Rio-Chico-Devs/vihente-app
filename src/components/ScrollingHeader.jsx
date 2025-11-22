import { useState, useRef, useEffect, useCallback } from 'react';
import './ScrollingHeader.css';

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
    <div className="scrolling-header">
      <div
        className="scrolling-header-btn rewind"
        onMouseDown={startRewind}
        onMouseUp={stopSpeedChange}
        onMouseLeave={stopSpeedChange}
      >
        <span className="scrolling-header-btn-text">&lt;&lt;</span>
      </div>

      <div
        className="scrolling-header-content"
        onClick={togglePlayPause}
      >
        <div
          ref={animationRef}
          className="scrolling-header-text"
        >
          {text}
        </div>
      </div>

      <div
        className="scrolling-header-btn forward"
        onMouseDown={startFastForward}
        onMouseUp={stopSpeedChange}
        onMouseLeave={stopSpeedChange}
      >
        <span className="scrolling-header-btn-text">&gt;&gt;</span>
      </div>
    </div>
  );
};

export default ScrollingHeader;