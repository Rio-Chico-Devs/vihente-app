import { useEffect, useRef } from 'react';
import './GraficheCard.css';

const GraficheCard = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    currentRotX: 0.34,
    currentRotY: -1.01,
    targetRotX: 0.34,
    targetRotY: -1.01,
    time: 0,
    lastChangeTime: 0,
    currentState: 'idle',
    stateDuration: 1.5
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Parametri
    const sphereCenterX = 200;
    const sphereCenterY = 150;
    const sphereRadius = 130;
    const irideRadius = 45;
    const pupillaRadius = 22;
    const cameraAngleX = -0.6;
    const cameraAngleY = -0.3;
    const irideTheta = 0;
    const iridePhi = Math.PI / 2;

    // Proiezione 3D -> 2D
    const project = (x, y, z) => {
      const scale = 300 / (300 + z);
      return {
        x: sphereCenterX + x * scale,
        y: sphereCenterY - y * scale,
        z: z
      };
    };

    // Rotazione 3D
    const rotate3D = (x, y, z, rx, ry) => {
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);

      let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

      let x2 = x1 * Math.cos(cameraAngleY) - z2 * Math.sin(cameraAngleY);
      let z3 = x1 * Math.sin(cameraAngleY) + z2 * Math.cos(cameraAngleY);

      let y2 = y1 * Math.cos(cameraAngleX) - z3 * Math.sin(cameraAngleX);
      let z4 = y1 * Math.sin(cameraAngleX) + z3 * Math.cos(cameraAngleX);

      return { x: x2, y: y2, z: z4 };
    };

    // Disegna cerchio 3D sulla superficie della sfera
    const drawCircleOnSphere = (centerTheta, centerPhi, radius, color, lineWidth) => {
      const segments = 32;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      let started = false;
      const state = stateRef.current;

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const localX = Math.cos(angle) * radius;
        const localY = Math.sin(angle) * radius;
        const theta = centerTheta + (localX / sphereRadius);
        const phi = centerPhi + (localY / sphereRadius);

        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.cos(phi);
        const z = sphereRadius * Math.sin(phi) * Math.sin(theta);

        const rotated = rotate3D(x, y, z, state.currentRotX, state.currentRotY);
        const projected = project(rotated.x, rotated.y, rotated.z);

        if (!started) {
          ctx.moveTo(projected.x, projected.y);
          started = true;
        } else {
          ctx.lineTo(projected.x, projected.y);
        }
      }

      ctx.stroke();
    };

    // Disegna sfera wireframe
    const drawSphere = () => {
      const meridians = 16;
      const parallels = 12;
      const state = stateRef.current;

      for (let i = 0; i < meridians; i++) {
        const theta = (i / meridians) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();

        for (let j = 0; j <= 30; j++) {
          const phi = (j / 30) * Math.PI;
          const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
          const y = sphereRadius * Math.cos(phi);
          const z = sphereRadius * Math.sin(phi) * Math.sin(theta);

          const rotated = rotate3D(x, y, z, state.currentRotX, state.currentRotY);
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
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();

        for (let j = 0; j <= 40; j++) {
          const theta = (j / 40) * Math.PI * 2;
          const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
          const y = sphereRadius * Math.cos(phi);
          const z = sphereRadius * Math.sin(phi) * Math.sin(theta);

          const rotated = rotate3D(x, y, z, state.currentRotX, state.currentRotY);
          const projected = project(rotated.x, rotated.y, rotated.z);

          if (j === 0) {
            ctx.moveTo(projected.x, projected.y);
          } else {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        ctx.stroke();
      }
    };

    // Gestione stati con sequenza specifica
    const updateLookState = (deltaTime) => {
      const state = stateRef.current;
      state.time += deltaTime;

      if (state.time - state.lastChangeTime >= state.stateDuration) {
        state.lastChangeTime = state.time;

        // Sequenza posizioni
        if (state.currentState === 'idle') {
          state.currentState = 'pos1';
          state.stateDuration = 2.0;
          state.targetRotX = 0.64;
          state.targetRotY = -1.32;
        } else if (state.currentState === 'pos1') {
          state.currentState = 'pos2';
          state.stateDuration = 2.0;
          state.targetRotX = 0.84;
          state.targetRotY = -1.00;
        } else if (state.currentState === 'pos2') {
          state.currentState = 'pos3';
          state.stateDuration = 2.0;
          state.targetRotX = 0.29;
          state.targetRotY = -1.53;
        } else if (state.currentState === 'pos3') {
          state.currentState = 'random';
          state.stateDuration = 2.0;
          // Posizione random
          state.targetRotX = (Math.random() - 0.5) * 1.5 + 0.5;
          state.targetRotY = (Math.random() - 0.5) * 1.5 - 1.2;
        } else {
          // Torna idle e ricomincia
          state.currentState = 'idle';
          state.stateDuration = 1.5;
          state.targetRotX = 0.34;
          state.targetRotY = -1.01;
        }
      }

      const smoothness = 0.08;
      state.currentRotX += (state.targetRotX - state.currentRotX) * smoothness;
      state.currentRotY += (state.targetRotY - state.currentRotY) * smoothness;
    };

    // Animate
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, 600, 400);

      updateLookState(deltaTime);
      drawSphere();
      drawCircleOnSphere(irideTheta, iridePhi, irideRadius, 'rgba(0, 150, 255, 0.95)', 3);
      drawCircleOnSphere(irideTheta, iridePhi, pupillaRadius, 'rgba(0, 200, 255, 1)', 2.5);

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
    <div className="grafiche-card">
      <canvas ref={canvasRef} width="600" height="400" className="eye-canvas" />
      <div className="category-label">GRAFICHE</div>
    </div>
  );
};

export default GraficheCard;
