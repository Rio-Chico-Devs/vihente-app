import { useRef, useEffect, useCallback } from 'react';
import './ScrollingHeader.css';

const ScrollingHeader = ({ text }) => {
  const animationRef = useRef(null);
  const positionRef = useRef(window.innerWidth);
  const speedRef = useRef(1);
  const directionRef = useRef(-1);
  const rafRef = useRef(null);
  const isControlPressed = useRef(false);
  const lastTimeRef = useRef(0);
  // Stato in ref (niente re-render: la UI del marquee e' tutta imperativa)
  const isPlayingRef = useRef(true);
  const hiddenRef = useRef(false);
  // Misure cachate: leggerle a ogni frame (offsetWidth/innerWidth) forza
  // un layout-read continuo per valori che cambiano solo al resize.
  const textWidthRef = useRef(0);
  const viewportRef = useRef(window.innerWidth);

  const shouldRun = useCallback(() => (
    !hiddenRef.current && (isPlayingRef.current || isControlPressed.current)
  ), []);

  const animate = useCallback((timestamp) => {
    // In pausa o tab nascosta: il loop si ferma davvero (niente tick a vuoto).
    // Viene riavviato da ensureLoop() su play/controlli/visibilita'.
    if (!shouldRun()) {
      rafRef.current = null;
      lastTimeRef.current = 0;
      return;
    }

    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (animationRef.current) {
      const pixelsPerSecond = 60;
      const moveAmount = pixelsPerSecond * deltaTime * speedRef.current * directionRef.current;

      positionRef.current += moveAmount;

      const textWidth = textWidthRef.current;
      const viewport = viewportRef.current;
      if (positionRef.current < -textWidth) {
        positionRef.current = viewport;
      } else if (positionRef.current > viewport) {
        positionRef.current = -textWidth;
      }

      animationRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [shouldRun]);

  const ensureLoop = useCallback(() => {
    if (!rafRef.current && shouldRun()) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate, shouldRun]);

  const startRewind = useCallback(() => {
    isControlPressed.current = true;
    speedRef.current = 2;
    directionRef.current = 1;
    ensureLoop();
  }, [ensureLoop]);

  const startFastForward = useCallback(() => {
    isControlPressed.current = true;
    speedRef.current = 2;
    directionRef.current = -1;
    ensureLoop();
  }, [ensureLoop]);

  const stopSpeedChange = useCallback(() => {
    isControlPressed.current = false;
    speedRef.current = 1;
    directionRef.current = -1;
  }, []);

  const togglePlayPause = useCallback(() => {
    isPlayingRef.current = !isPlayingRef.current;
    ensureLoop();
  }, [ensureLoop]);

  useEffect(() => {
    const measure = () => {
      if (animationRef.current) textWidthRef.current = animationRef.current.offsetWidth;
      viewportRef.current = window.innerWidth;
    };
    measure();

    const handleVisibility = () => {
      hiddenRef.current = document.hidden;
      ensureLoop();
    };

    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', handleVisibility);
    ensureLoop();

    return () => {
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ensureLoop, text]);

  return (
    <div className="scrolling-header" data-tour="scrolling-header">
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
