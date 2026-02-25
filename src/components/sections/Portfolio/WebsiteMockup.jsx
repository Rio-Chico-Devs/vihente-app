import { useEffect, useRef } from 'react';
import './WebsiteMockup.css';

const WebsiteMockup = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    animationState: 'search',
    stateTime: 0,
    cursorX: 300,
    cursorY: 200,
    targetCursorX: 300,
    targetCursorY: 200,
    clicking: false,
    fadeAlpha: 0,
    hoverAlpha: 0,
    typedText: ''
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // High DPI per qualità massima
    const dpr = window.devicePixelRatio || 3;
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

    // Theme colors - SOLO il colore primario cambia
    const rgba = (alpha) => theme === 'light'
      ? `rgba(232, 160, 48, ${alpha})`
      : `rgba(0, 255, 255, ${alpha})`;

    // Easing functions - molto più smooth
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    // Occhio logo semplice senza effetti
    const drawEyeLogo = (centerX, centerY, scale, alpha) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.bezierCurveTo(-11, -7, -6, -10, 0, -10);
      ctx.bezierCurveTo(6, -10, 11, -7, 15, 0);
      ctx.bezierCurveTo(11, 7, 6, 10, 0, 10);
      ctx.bezierCurveTo(-6, 10, -11, 7, -15, 0);
      ctx.closePath();

      ctx.strokeStyle = rgba(0.7 * alpha);
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    // Search page con typing animation
    const drawSearchPage = (alpha) => {
      ctx.globalAlpha = alpha;

      // Occhio centrato
      drawEyeLogo(300, 100, 2.8, alpha);

      // Search bar centrata
      const barX = 125;
      const barY = 185;
      const barWidth = 350;
      const barHeight = 48;

      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 24);
      ctx.fill();

      ctx.strokeStyle = rgba(0.35);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 24);
      ctx.stroke();

      // Icona search
      ctx.strokeStyle = rgba(0.6);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(145, 209, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(151, 215);
      ctx.lineTo(156, 220);
      ctx.stroke();

      // Testo con typing animation
      ctx.font = '400 16px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.8);
      ctx.textAlign = 'left';
      ctx.fillText(state.typedText, 175, 212);

      // Cursore lampeggiante
      if (state.typedText.length < 24 && Math.floor(state.stateTime * 2) % 2 === 0) {
        ctx.fillStyle = rgba(0.8);
        ctx.fillRect(175 + ctx.measureText(state.typedText).width, 197, 2, 18);
      }

      ctx.globalAlpha = 1;
    };

    // helper: testo con subpixel hint per bordi puliti
    const drawText = (text, x, y) => ctx.fillText(text, Math.round(x) + 0.5, Math.round(y) + 0.5);

    // Disegna results page
    const drawResultsPage = (alpha) => {
      ctx.globalAlpha = alpha;

      // Header
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, 600, 58);
      // Linea separatrice sottile
      ctx.fillStyle = rgba(0.12);
      ctx.fillRect(0, 57.5, 600, 1);

      // Occhio logo piccolo
      drawEyeLogo(38, 29, 1.0, alpha);

      // Search bar piccola
      ctx.fillStyle = '#1e1e1e';
      ctx.beginPath();
      ctx.roundRect(90, 17, 210, 24, 12);
      ctx.fill();
      ctx.strokeStyle = rgba(0.22);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(90, 17, 210, 24, 12);
      ctx.stroke();

      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.65);
      ctx.textAlign = 'left';
      drawText('vihente.it', 110, 33);

      // Results info
      ctx.font = '400 11px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.38);
      drawText('About 4,320,000 results  (0.38 seconds)', 30, 82);

      // ── Result 1 - VIHENTE.IT ──────────────────────
      const r1 = 104;
      const hov = state.hoverAlpha;

      if (hov > 0) {
        ctx.fillStyle = rgba(0.06 * hov);
        ctx.beginPath();
        ctx.roundRect(16, r1 - 6, 568, 82, 6);
        ctx.fill();
      }

      ctx.font = '400 11px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.45 + 0.1 * hov);
      drawText('vihente.it', 30, r1 + 2);

      ctx.font = `600 17px "Share Tech Mono", monospace`;
      ctx.fillStyle = rgba(0.72 + 0.18 * hov);
      drawText('Vihente — Web Development & Digital Solutions', 30, r1 + 22);

      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.48 + 0.08 * hov);
      drawText('Custom websites, React apps and digital products built for', 30, r1 + 42);
      drawText('performance and conversion. Based in Italy.', 30, r1 + 57);

      // ── Result 2 ───────────────────────────────────
      const r2 = 210;
      ctx.font = '400 11px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.35);
      drawText('webflow.com › enterprise', 30, r2);

      ctx.font = '600 15px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.48);
      drawText('Webflow — Build powerful websites without code', 30, r2 + 19);

      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.36);
      drawText('The modern platform for professional web development.', 30, r2 + 37);

      // ── Result 3 ───────────────────────────────────
      const r3 = 286;
      ctx.font = '400 11px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.35);
      drawText('vercel.com › solutions', 30, r3);

      ctx.font = '600 15px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.48);
      drawText('Vercel — Deploy fast. Build at the speed of thought.', 30, r3 + 19);

      ctx.font = '400 12px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.36);
      drawText('Frontend cloud for web developers. Instant deployment.', 30, r3 + 37);

      ctx.globalAlpha = 1;
    };

    // Cursore realistico
    const drawCursor = () => {
      if (state.animationState === 'search') return;

      const x = state.cursorX;
      const y = state.cursorY;

      // Click effect: cerchio colorato quando clicca
      if (state.clicking) {
        ctx.fillStyle = rgba(0.2);
        ctx.beginPath();
        ctx.arc(x + 7, y + 8, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursore
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 18);
      ctx.lineTo(x + 6, y + 13);
      ctx.lineTo(x + 9, y + 20);
      ctx.lineTo(x + 12, y + 19);
      ctx.lineTo(x + 9, y + 12);
      ctx.lineTo(x + 16, y + 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const updateAnimation = (deltaTime) => {
      state.stateTime += deltaTime;

      const fullText = "I need a custom website";

      if (state.animationState === 'search') {
        const t = Math.min(1, state.stateTime / 0.5);
        state.fadeAlpha = easeInOutSine(t);

        // Typing animation
        const charsToShow = Math.floor(state.stateTime * 15); // 15 caratteri/secondo
        state.typedText = fullText.substring(0, charsToShow);

        if (state.stateTime >= 2.2) {
          state.animationState = 'transition-to-results';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'transition-to-results') {
        const t = Math.min(1, state.stateTime / 0.3);
        state.fadeAlpha = 1 - easeInOutSine(t);

        if (state.fadeAlpha <= 0.01) {
          state.animationState = 'results';
          state.stateTime = 0;
          state.fadeAlpha = 0;
          state.cursorX = 540;
          state.cursorY = 30;
          state.targetCursorX = 200;
          state.targetCursorY = 126;
        }
      } else if (state.animationState === 'results') {
        const fadeT = Math.min(1, state.stateTime / 0.4);
        state.fadeAlpha = easeInOutSine(fadeT);

        const cursorT = Math.min(1, state.stateTime / 0.9);
        const eased = easeOutQuart(cursorT);
        state.cursorX = 540 + (state.targetCursorX - 540) * eased;
        state.cursorY = 30 + (state.targetCursorY - 30) * eased;

        if (state.stateTime >= 1.4) {
          state.animationState = 'hover';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'hover') {
        const t = Math.min(1, state.stateTime / 0.4);
        state.hoverAlpha = easeInOutSine(t);

        if (state.stateTime >= 0.5) {
          state.animationState = 'click';
          state.stateTime = 0;
          state.clicking = true;
        }
      } else if (state.animationState === 'click') {
        if (state.stateTime >= 0.2) state.clicking = false;

        if (state.stateTime >= 0.8) {
          state.animationState = 'transition-to-search';
          state.stateTime = 0;
        }
      } else if (state.animationState === 'transition-to-search') {
        const t = Math.min(1, state.stateTime / 0.4);
        const fadeOut = easeInOutSine(t);
        state.fadeAlpha = 1 - fadeOut;
        state.hoverAlpha = 1 - fadeOut;

        if (state.fadeAlpha <= 0.01) {
          state.animationState = 'search';
          state.stateTime = 0;
          state.fadeAlpha = 0;
          state.hoverAlpha = 0;
          state.typedText = '';
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
      ctx.fillStyle = rgba(0.95);
      ctx.shadowBlur = 8;
      ctx.shadowColor = rgba(0.4);
      ctx.fillText('SITI WEB', 570, 340);

      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.7);
      ctx.shadowBlur = 4;
      ctx.shadowColor = rgba(0.2);
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
  }, [theme]);

  return (
    <div className="website-mockup">
      <canvas ref={canvasRef} width="600" height="400" className="mockup-canvas" />
    </div>
  );
};

export default WebsiteMockup;
