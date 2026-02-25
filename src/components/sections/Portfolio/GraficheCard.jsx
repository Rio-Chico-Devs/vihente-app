import { useEffect, useRef } from 'react';
import './GraficheCard.css';

const GraficheCard = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // High DPI rendering
    const dpr = window.devicePixelRatio || 2;
    canvas.width = 600 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    // Theme colors
    const rgba = (alpha) => theme === 'light'
      ? `rgba(232, 160, 48, ${alpha})`
      : `rgba(0, 255, 255, ${alpha})`;

    // Parametri
    const sphereCenterX = 220;
    const sphereCenterY = 150;
    const sphereRadius = 180;
    const irideRadius = 63;
    const pupillaRadius = 29;
    const cameraAngleX = -0.6;
    const cameraAngleY = -0.3;
    const irideTheta = 0;
    const iridePhi = Math.PI / 2;

    // State
    let currentRotX = 0.34;
    let currentRotY = -1.01;
    let targetRotX = 0.34;
    let targetRotY = -1.01;
    let time = 0;
    let lastChangeTime = 0;
    let currentState = 'idle';
    let stateDuration = 1.5;

    // Proiezione 3D -> 2D
    function project(x, y, z) {
      const scale = 300 / (300 + z);
      return {
        x: sphereCenterX + x * scale,
        y: sphereCenterY - y * scale,
        z: z
      };
    }

    // Rotazione 3D
    function rotate3D(x, y, z, rx, ry) {
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      let x2 = x1 * Math.cos(cameraAngleY) - z2 * Math.sin(cameraAngleY);
      let z3 = x1 * Math.sin(cameraAngleY) + z2 * Math.cos(cameraAngleY);
      let y2 = y1 * Math.cos(cameraAngleX) - z3 * Math.sin(cameraAngleX);
      let z4 = y1 * Math.sin(cameraAngleX) + z3 * Math.cos(cameraAngleX);
      return { x: x2, y: y2, z: z4 };
    }

    // Disegna cerchio 3D sulla superficie della sfera
    function drawCircleOnSphere(centerTheta, centerPhi, radius, color, lineWidth) {
      const segments = 32;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const localX = Math.cos(angle) * radius;
        const localY = Math.sin(angle) * radius;
        const theta = centerTheta + (localX / sphereRadius);
        const phi = centerPhi + (localY / sphereRadius);
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.cos(phi);
        const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const rotated = rotate3D(x, y, z, currentRotX, currentRotY);
        const projected = project(rotated.x, rotated.y, rotated.z);
        if (!started) {
          ctx.moveTo(projected.x, projected.y);
          started = true;
        } else {
          ctx.lineTo(projected.x, projected.y);
        }
      }
      ctx.stroke();
    }

    // Disegna sfera wireframe
    function drawSphere() {
      const meridians = 16;
      const parallels = 12;
      for (let i = 0; i < meridians; i++) {
        const theta = (i / meridians) * Math.PI * 2;
        ctx.strokeStyle = rgba(0.35);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let j = 0; j <= 30; j++) {
          const phi = (j / 30) * Math.PI;
          const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
          const y = sphereRadius * Math.cos(phi);
          const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
          const rotated = rotate3D(x, y, z, currentRotX, currentRotY);
          const projected = project(rotated.x, rotated.y, rotated.z);
          if (j === 0) {
            ctx.moveTo(projected.x, projected.y);
          } else {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }
      for (let i = 1; i < parallels; i++) {
        const phi = (i / parallels) * Math.PI;
        ctx.strokeStyle = rgba(0.35);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let j = 0; j <= 40; j++) {
          const theta = (j / 40) * Math.PI * 2;
          const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
          const y = sphereRadius * Math.cos(phi);
          const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
          const rotated = rotate3D(x, y, z, currentRotX, currentRotY);
          const projected = project(rotated.x, rotated.y, rotated.z);
          if (j === 0) {
            ctx.moveTo(projected.x, projected.y);
          } else {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }
    }

    // Gestione stati con sequenza specifica
    function updateLookState(deltaTime) {
      time += deltaTime;
      if (time - lastChangeTime >= stateDuration) {
        lastChangeTime = time;
        // Sequenza posizioni
        if (currentState === 'idle') {
          currentState = 'pos1';
          stateDuration = 2.0;
          targetRotX = 0.64;
          targetRotY = -1.32;
        } else if (currentState === 'pos1') {
          currentState = 'pos2';
          stateDuration = 2.0;
          targetRotX = 0.84;
          targetRotY = -1.00;
        } else if (currentState === 'pos2') {
          currentState = 'pos3';
          stateDuration = 2.0;
          targetRotX = 0.29;
          targetRotY = -1.53;
        } else if (currentState === 'pos3') {
          currentState = 'random';
          stateDuration = 2.0;
          // Posizione random
          targetRotX = (Math.random() - 0.5) * 1.5 + 0.5;
          targetRotY = (Math.random() - 0.5) * 1.5 - 1.2;
        } else {
          // Torna idle e ricomincia
          currentState = 'idle';
          stateDuration = 1.5;
          targetRotX = 0.34;
          targetRotY = -1.01;
        }
      }
      const smoothness = 0.08;
      currentRotX += (targetRotX - currentRotX) * smoothness;
      currentRotY += (targetRotY - currentRotY) * smoothness;
    }

    // Animate
    let lastTime = performance.now();
    function animate(currentTime) {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 600, 400);

      updateLookState(deltaTime);
      drawSphere();

      // Iride e pupilla con colori tema
      const irideColor = theme === 'light' ? 'rgba(232, 160, 48, 0.95)' : 'rgba(0, 150, 255, 0.95)';
      const pupilColor = theme === 'light' ? 'rgba(232, 160, 48, 1)' : 'rgba(0, 200, 255, 1)';

      drawCircleOnSphere(irideTheta, iridePhi, irideRadius, irideColor, 3);
      drawCircleOnSphere(irideTheta, iridePhi, pupillaRadius, pupilColor, 2.5);

      // Titolo e descrizione
      ctx.textAlign = 'right';
      ctx.font = '700 24px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.95);
      ctx.fillText('GRAFICHE', 570, 340);
      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.7);
      ctx.fillText('Design grafico e visual identity', 570, 365);

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <div className="grafiche-card">
      <canvas ref={canvasRef} className="grafiche-canvas" />
    </div>
  );
};

export default GraficheCard;
