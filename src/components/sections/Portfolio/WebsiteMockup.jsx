import { useEffect, useRef } from 'react';
import './WebsiteMockup.css';

const WebsiteMockup = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    animationState: 'search', // search, results, hover, click
    stateTime: 0,
    cursorX: 300,
    cursorY: 200,
    targetCursorX: 300,
    targetCursorY: 200,
    clicking: false,
    fadeAlpha: 0,
    hoverAlpha: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // High DPI
    const dpr = 3;
    const width = 600;
    const height = 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const state = stateRef.current;

    // Easing functions - molto più smooth
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    // Disegna occhio logo (migliorato, più fedele all'originale)
    const drawEyeLogo = (centerX, centerY, scale, alpha) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      // Contorno occhio - path preciso
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.bezierCurveTo(-11, -7, -6, -10, 0, -10);
      ctx.bezierCurveTo(6, -10, 11, -7, 15, 0);
      ctx.bezierCurveTo(11, 7, 6, 10, 0, 10);
      ctx.bezierCurveTo(-6, 10, -11, 7, -15, 0);
      ctx.closePath();

      ctx.strokeStyle = `rgba(0, 255, 255, ${0.6 * alpha})`;
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 6 * alpha;
      ctx.shadowColor = `rgba(0, 255, 255, ${0.25 * alpha})`;
      ctx.stroke();

      // Iride
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.6 * alpha})`;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 3 * alpha;
      ctx.stroke();

      // Pupilla
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.7 * alpha})`;
      ctx.lineWidth = 0.9;
      ctx.shadowBlur = 2 * alpha;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Disegna search page
    const drawSearchPage = (alpha) => {
      // Occhio logo al posto del logo
      drawEyeLogo(300, 70, 2.5, alpha);

      // Search bar
      const barX = 120;
      const barY = 110;
      const barWidth = 360;
      const barHeight = 44;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 22);
      ctx.fill();
      ctx.stroke();

      // Search icon
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(140, 132, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(145, 137);
      ctx.lineTo(149, 141);
      ctx.stroke();

      // Search text
      ctx.font = '400 15px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.65)';
      ctx.textAlign = 'left';
      ctx.fillText('web development services', 165, 136);
      ctx.globalAlpha = 1;
    };

    // Disegna results page
    const drawResultsPage = (alpha) => {
      ctx.globalAlpha = alpha;

      // Mini search bar in alto
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 600, 70);

      // Occhio piccolo al posto del testo
      drawEyeLogo(50, 30, 1.2, alpha);

      // Small search bar
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(140, 15, 280, 32, 16);
      ctx.fill();
      ctx.stroke();

      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.fillText('web development services', 160, 35);

      // Results info
      ctx.font = '400 11px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('About 127,000 results (0.43 seconds)', 30, 90);

      // Result 1 - VIHENTE.IT (highlighted on hover)
      const result1Y = 120;
      const hoverAlpha = state.hoverAlpha;

      if (hoverAlpha > 0) {
        ctx.fillStyle = `rgba(0, 255, 255, ${0.04 * hoverAlpha})`;
        ctx.fillRect(20, result1Y - 25, 560, 85);
      }

      // URL
      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.fillText('https://vihente.it', 30, result1Y);

      // Title (clickable)
      ctx.font = '600 18px "Share Tech Mono", monospace';
      const titleAlpha = 0.75 + (0.1 * hoverAlpha);
      ctx.fillStyle = `rgba(0, 255, 255, ${titleAlpha})`;
      if (hoverAlpha > 0) {
        ctx.shadowBlur = 5 * hoverAlpha;
        ctx.shadowColor = `rgba(0, 255, 255, ${0.3 * hoverAlpha})`;
      }
      ctx.fillText('VIHENTE - Web Development & Digital Solutions', 30, result1Y + 24);
      ctx.shadowBlur = 0;

      // Description
      ctx.font = '400 13px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
      const desc1 = 'Professional web development services. We build modern,';
      const desc2 = 'responsive websites and digital solutions for your business.';
      ctx.fillText(desc1, 30, result1Y + 46);
      ctx.fillText(desc2, 30, result1Y + 62);

      // Result 2
      const result2Y = 240;
      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('https://example.com/services', 30, result2Y);

      ctx.font = '600 16px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.55)';
      ctx.fillText('Other Web Development Services', 30, result2Y + 22);

      ctx.font = '400 13px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('Generic web development company offering various...', 30, result2Y + 44);

      // Result 3
      const result3Y = 310;
      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('https://anothersite.com', 30, result3Y);

      ctx.font = '600 16px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.55)';
      ctx.fillText('Web Design Agency', 30, result3Y + 22);

      ctx.globalAlpha = 1;
    };

    // Disegna cursore
    const drawCursor = () => {
      if (state.animationState === 'search') return;

      const x = state.cursorX;
      const y = state.cursorY;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(x + 2, y + 2);
      ctx.lineTo(x + 2, y + 18);
      ctx.lineTo(x + 7, y + 14);
      ctx.lineTo(x + 10, y + 20);
      ctx.lineTo(x + 13, y + 19);
      ctx.lineTo(x + 10, y + 13);
      ctx.lineTo(x + 16, y + 13);
      ctx.closePath();
      ctx.fill();

      // Cursor body
      ctx.fillStyle = state.clicking ? 'rgba(0, 255, 255, 0.8)' : '#ffffff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 16);
      ctx.lineTo(x + 5, y + 12);
      ctx.lineTo(x + 8, y + 18);
      ctx.lineTo(x + 11, y + 17);
      ctx.lineTo(x + 8, y + 11);
      ctx.lineTo(x + 14, y + 11);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // Update animation - timing zen migliorato
    const updateAnimation = (deltaTime) => {
      state.stateTime += deltaTime;

      if (state.animationState === 'search') {
        // Fade in molto smooth
        const t = Math.min(1, state.stateTime / 1.2);
        state.fadeAlpha = easeInOutSine(t);

        if (state.stateTime >= 3.0) {
          state.animationState = 'transition-to-results';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'transition-to-results') {
        // Fade out search con easing
        const t = Math.min(1, state.stateTime / 0.8);
        state.fadeAlpha = 1 - easeInOutSine(t);

        if (state.fadeAlpha <= 0.01) {
          state.animationState = 'results';
          state.stateTime = 0;
          state.fadeAlpha = 0;
          state.cursorX = 500;
          state.cursorY = 50;
          state.targetCursorX = 300;
          state.targetCursorY = 144;
        }
      } else if (state.animationState === 'results') {
        // Fade in results smooth
        const fadeT = Math.min(1, state.stateTime / 1.0);
        state.fadeAlpha = easeInOutSine(fadeT);

        // Move cursor ultra smooth
        const cursorT = Math.min(1, state.stateTime / 2.0);
        const eased = easeOutQuart(cursorT);
        state.cursorX = 500 + (state.targetCursorX - 500) * eased;
        state.cursorY = 50 + (state.targetCursorY - 50) * eased;

        if (state.stateTime >= 3.0) {
          state.animationState = 'hover';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'hover') {
        // Hover fade molto graduale
        const t = Math.min(1, state.stateTime / 1.5);
        state.hoverAlpha = easeInOutSine(t);

        if (state.stateTime >= 1.5) {
          state.animationState = 'click';
          state.stateTime = 0;
          state.clicking = true;
        }
      } else if (state.animationState === 'click') {
        if (state.stateTime >= 0.5) {
          state.clicking = false;
        }
        if (state.stateTime >= 2.0) {
          state.animationState = 'transition-to-search';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'transition-to-search') {
        // Fade out tutto smooth
        const t = Math.min(1, state.stateTime / 1.0);
        const fadeOut = easeInOutSine(t);
        state.fadeAlpha = 1 - fadeOut;
        state.hoverAlpha = 1 - fadeOut;

        if (state.fadeAlpha <= 0.01) {
          state.animationState = 'search';
          state.stateTime = 0;
          state.fadeAlpha = 0;
          state.hoverAlpha = 0;
        }
      }
    };

    // Animate
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      updateAnimation(deltaTime);

      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 600, 400);

      // Draw scene con fade
      if (state.animationState === 'search' || state.animationState === 'transition-to-results') {
        drawSearchPage(state.fadeAlpha);
      }

      if (state.animationState === 'results' || state.animationState === 'hover' ||
          state.animationState === 'click' || state.animationState === 'transition-to-search') {
        drawResultsPage(state.fadeAlpha);
        if (state.fadeAlpha > 0.3) {
          drawCursor();
        }
      }

      // Labels sempre visibili
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.textAlign = 'right';
      ctx.font = '700 24px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.95)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('SITI WEB', 570, 340);

      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.2)';
      ctx.fillText('Web development and applications', 570, 365);

      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="website-mockup">
      <canvas ref={canvasRef} width="600" height="400" className="mockup-canvas" />
    </div>
  );
};

export default WebsiteMockup;
