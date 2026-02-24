import { useEffect, useRef } from 'react';
import './GoogleMockup.css';

const GoogleMockup = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    searchText: '',
    targetText: 'I need to build a website',
    typingSpeed: 0,
    cursorVisible: true,
    cursorTime: 0,
    animationState: 'typing', // typing, searching, matrix
    matrixChars: [],
    matrixTime: 0,
    pauseTime: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // High DPI per qualità HD
    const dpr = 3;
    const width = 600;
    const height = 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Text rendering ottimizzato
    ctx.imageSmoothingEnabled = false;
    ctx.textRendering = 'optimizeLegibility';

    const state = stateRef.current;

    // Inizializza matrix chars
    const matrixCols = 20;
    for (let i = 0; i < matrixCols; i++) {
      state.matrixChars.push({
        x: (i * 600) / matrixCols,
        y: Math.random() * -500,
        speed: 2 + Math.random() * 5,
        chars: Array(20).fill(0).map(() =>
          String.fromCharCode(33 + Math.floor(Math.random() * 94))
        )
      });
    }

    // Disegna occhio VIHENTE (più grande)
    const drawEye = () => {
      const centerX = 300;
      const centerY = 80;
      const scale = 1.5; // Aumentato da 1 a 1.5

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';

      // Contorno occhio
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.bezierCurveTo(-11, -7, -6, -10, 0, -10);
      ctx.bezierCurveTo(6, -10, 11, -7, 15, 0);
      ctx.bezierCurveTo(11, 7, 6, 10, 0, 10);
      ctx.bezierCurveTo(-6, 10, -11, 7, -15, 0);
      ctx.stroke();

      // Iride
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Pupilla
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Disegna logo VIHENTE
    const drawLogo = () => {
      ctx.font = '700 36px "Share Tech Mono", monospace';
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
      ctx.fillText('VIHENTE', 300, 150);
      ctx.shadowBlur = 0;
    };

    // Disegna search bar
    const drawSearchBar = () => {
      const barX = 150;
      const barY = 180;
      const barWidth = 300;
      const barHeight = 45;

      // Search bar background
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 25);
      ctx.fill();
      ctx.stroke();

      // Search icon (left side)
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(170, 202, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(176, 208);
      ctx.lineTo(182, 214);
      ctx.stroke();

      // Text in search bar
      ctx.font = '400 16px "Share Tech Mono", monospace';
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'left';
      ctx.fillText(state.searchText, 195, 208);

      // Cursor
      if (state.cursorVisible && state.animationState === 'typing') {
        const textWidth = ctx.measureText(state.searchText).width;
        ctx.fillRect(195 + textWidth, 193, 2, 20);
      }
    };

    // Disegna bottoni
    const drawButtons = () => {
      const btn1X = 180;
      const btn2X = 320;
      const btnY = 250;
      const btnWidth = 140;
      const btnHeight = 36;

      // Button 1: SEARCH WITH VIHENTE
      ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(btn1X, btnY, btnWidth, btnHeight, 5);
      ctx.fill();
      ctx.stroke();

      ctx.font = '600 11px "Share Tech Mono", monospace';
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'center';
      ctx.fillText('SEARCH WITH VIHENTE', btn1X + btnWidth / 2, btnY + 22);

      // Button 2: I'M FEELING LUCKY
      ctx.beginPath();
      ctx.roundRect(btn2X, btnY, btnWidth, btnHeight, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillText("I'M FEELING LUCKY", btn2X + btnWidth / 2, btnY + 22);
    };

    // Disegna effetto matrix
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, 600, 400);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#00ffff';

      state.matrixChars.forEach(col => {
        col.chars.forEach((char, i) => {
          const y = col.y + i * 20;
          if (y > 0 && y < 400) {
            const alpha = 1 - (i / col.chars.length) * 0.8;
            ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.fillText(char, col.x, y);
          }
        });

        col.y += col.speed;
        if (col.y > 400) {
          col.y = -200;
        }

        // Cambia caratteri random
        if (Math.random() > 0.95) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        }
      });
    };

    // Update animation
    const updateAnimation = (deltaTime) => {
      if (state.animationState === 'typing') {
        state.typingSpeed += deltaTime;
        const interval = 1 / 8; // 8 caratteri al secondo

        if (state.typingSpeed >= interval && state.searchText !== state.targetText) {
          state.searchText = state.targetText.substring(0, state.searchText.length + 1);
          state.typingSpeed = 0;

          if (state.searchText === state.targetText) {
            state.pauseTime = 0;
            state.animationState = 'pause';
          }
        }

        state.cursorTime += deltaTime;
        if (state.cursorTime >= 0.5) {
          state.cursorVisible = !state.cursorVisible;
          state.cursorTime = 0;
        }
      } else if (state.animationState === 'pause') {
        state.pauseTime += deltaTime;
        if (state.pauseTime >= 1.5) {
          state.animationState = 'matrix';
          state.matrixTime = 0;
        }
      } else if (state.animationState === 'matrix') {
        state.matrixTime += deltaTime;
        if (state.matrixTime >= 2.5) {
          // Reset
          state.searchText = '';
          state.animationState = 'typing';
          state.typingSpeed = 0;
          state.cursorVisible = true;
          state.matrixTime = 0;
          // Reset matrix positions
          state.matrixChars.forEach(col => {
            col.y = Math.random() * -500;
          });
        }
      }
    };

    // Animate
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      updateAnimation(deltaTime);

      if (state.animationState === 'matrix') {
        drawMatrix();
      } else {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 600, 400);

        drawEye();
        drawLogo();
        drawSearchBar();
        drawButtons();
      }

      // Abilita anti-aliasing per i titoli (qualità come HTML/CSS)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Titolo con shadow per depth
      ctx.textAlign = 'right';
      ctx.font = '700 24px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.95)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.4)';
      ctx.fillText('SITI WEB', 570, 340);

      // Descrizione
      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.2)';
      ctx.fillText('Web development and applications', 570, 365);

      // Reset shadow e smoothing
      ctx.shadowBlur = 0;
      ctx.imageSmoothingEnabled = false;

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
    <div className="google-mockup">
      <canvas ref={canvasRef} width="600" height="400" className="mockup-canvas" />
    </div>
  );
};

export default GoogleMockup;
