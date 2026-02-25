import { useEffect, useRef } from 'react';
import './GraficheCard.css';

const GraficheCard = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    time: 0,
    palettePhase: 0,
    gridPhase: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // High DPI rendering - 3x for maximum quality
    const dpr = 3;
    const width = 600;
    const height = 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const state = stateRef.current;

    // Theme colors
    const primaryColor = theme === 'light' ? 'rgb(232, 160, 48)' : 'rgb(0, 255, 255)';
    const rgba = (alpha) => theme === 'light'
      ? `rgba(232, 160, 48, ${alpha})`
      : `rgba(0, 255, 255, ${alpha})`;
    const bgColor = theme === 'light' ? '#ffffff' : '#000';
    const colors = theme === 'light'
      ? ['#e8a030', '#f59e0b', '#d97706', '#ca8a04', '#a16207']
      : ['#0ff', '#00ffaa', '#00aaff', '#0088ff', '#0066ff'];

    // 3D Eye wireframe mesh vertices
    const createEyeMesh = () => {
      const vertices = [];
      const edges = [];

      // Eye outline (ellipse)
      const eyeSegments = 24;
      const eyeRadiusX = 80;
      const eyeRadiusY = 40;

      for (let i = 0; i < eyeSegments; i++) {
        const angle = (i / eyeSegments) * Math.PI * 2;
        const x = Math.cos(angle) * eyeRadiusX;
        const y = Math.sin(angle) * eyeRadiusY;
        const z = Math.sin(angle * 2) * 10; // Add depth variation
        vertices.push([x, y, z]);

        // Connect to next vertex
        edges.push([i, (i + 1) % eyeSegments]);
      }

      // Iris (outer circle)
      const irisSegments = 16;
      const irisRadius = 25;
      const irisStartIdx = vertices.length;

      for (let i = 0; i < irisSegments; i++) {
        const angle = (i / irisSegments) * Math.PI * 2;
        const x = Math.cos(angle) * irisRadius;
        const y = Math.sin(angle) * irisRadius;
        const z = 5;
        vertices.push([x, y, z]);

        edges.push([irisStartIdx + i, irisStartIdx + (i + 1) % irisSegments]);
      }

      // Pupil (inner circle)
      const pupilSegments = 12;
      const pupilRadius = 10;
      const pupilStartIdx = vertices.length;

      for (let i = 0; i < pupilSegments; i++) {
        const angle = (i / pupilSegments) * Math.PI * 2;
        const x = Math.cos(angle) * pupilRadius;
        const y = Math.sin(angle) * pupilRadius;
        const z = 8;
        vertices.push([x, y, z]);

        edges.push([pupilStartIdx + i, pupilStartIdx + (i + 1) % pupilSegments]);
      }

      // Connect iris to eye with radial lines
      for (let i = 0; i < 8; i++) {
        const eyeIdx = Math.floor((i / 8) * eyeSegments);
        const irisIdx = irisStartIdx + Math.floor((i / 8) * irisSegments);
        edges.push([eyeIdx, irisIdx]);
      }

      // Connect iris to pupil with radial lines
      for (let i = 0; i < 6; i++) {
        const irisIdx = irisStartIdx + Math.floor((i / 6) * irisSegments);
        const pupilIdx = pupilStartIdx + Math.floor((i / 6) * pupilSegments);
        edges.push([irisIdx, pupilIdx]);
      }

      return { vertices, edges };
    };

    const eyeMesh = createEyeMesh();

    // 3D rotation matrices
    const rotateX = (point, angle) => {
      const [x, y, z] = point;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x, y * cos - z * sin, y * sin + z * cos];
    };

    const rotateY = (point, angle) => {
      const [x, y, z] = point;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos + z * sin, y, -x * sin + z * cos];
    };

    const rotateZ = (point, angle) => {
      const [x, y, z] = point;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos - y * sin, x * sin + y * cos, z];
    };

    // Project 3D to 2D
    const project = (point, centerX, centerY) => {
      const [x, y, z] = point;
      const scale = 200 / (200 + z);
      return [
        centerX + x * scale,
        centerY + y * scale,
        z
      ];
    };

    // Easing function
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    // Draw hexagonal grid background
    const drawHexGrid = () => {
      const hexSize = 30;
      const hexHeight = hexSize * Math.sqrt(3);

      ctx.strokeStyle = rgba(0.06 + Math.sin(state.gridPhase) * 0.02);
      ctx.lineWidth = 1;

      for (let row = -1; row < 15; row++) {
        for (let col = -1; col < 22; col++) {
          const x = col * hexSize * 1.5;
          const y = row * hexHeight + (col % 2) * hexHeight / 2;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + Math.cos(angle) * hexSize;
            const py = y + Math.sin(angle) * hexSize;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    // Draw 3D wireframe eye
    const drawWireframeEye = () => {
      const centerX = 300;
      const centerY = 140;

      // Apply rotations
      const rotatedVertices = eyeMesh.vertices.map(v => {
        let point = rotateX(v, state.rotationX);
        point = rotateY(point, state.rotationY);
        point = rotateZ(point, state.rotationZ);
        return point;
      });

      // Project to 2D
      const projectedVertices = rotatedVertices.map(v => project(v, centerX, centerY));

      // Draw edges with depth-based opacity
      eyeMesh.edges.forEach(([i, j]) => {
        const [x1, y1, z1] = projectedVertices[i];
        const [x2, y2, z2] = projectedVertices[j];

        // Calculate opacity based on Z depth
        const avgZ = (z1 + z2) / 2;
        const opacity = 0.3 + (avgZ / 200) * 0.7;

        ctx.strokeStyle = rgba(opacity);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw vertices as small dots (enhanced depth effect)
      projectedVertices.forEach(([x, y, z]) => {
        const opacity = 0.4 + (z / 200) * 0.6;
        const size = 2 + (z / 200) * 2;

        ctx.fillStyle = rgba(opacity);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw animated color palette
    const drawColorPalette = () => {
      const paletteY = 280;
      const spacing = 45;
      const startX = 300 - (colors.length * spacing) / 2 + spacing / 2;

      colors.forEach((color, i) => {
        const x = startX + i * spacing;
        const wave = Math.sin(state.palettePhase + i * 0.5) * 3;
        const y = paletteY + wave;

        // Shadow
        ctx.fillStyle = rgba(0.15);
        ctx.fillRect(x - 16, y - 16 + 4, 32, 32);

        // Color box
        ctx.fillStyle = color;
        ctx.fillRect(x - 15, y - 15, 30, 30);

        // Border
        const borderAlpha = 0.4 + Math.sin(state.palettePhase + i * 0.5) * 0.2;
        ctx.strokeStyle = rgba(borderAlpha);
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 15, y - 15, 30, 30);

        // Glow effect
        ctx.shadowBlur = 10 + wave * 2;
        ctx.shadowColor = color;
        ctx.strokeRect(x - 15, y - 15, 30, 30);
        ctx.shadowBlur = 0;
      });
    };

    // Draw tool icons
    const drawToolIcons = () => {
      const iconY = 330;
      const iconSpacing = 40;
      const startX = 300 - iconSpacing;

      // Pen tool
      ctx.strokeStyle = rgba(0.8);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX - 6, iconY + 6);
      ctx.lineTo(startX, iconY);
      ctx.lineTo(startX + 6, iconY + 6);
      ctx.lineTo(startX + 8, iconY - 8);
      ctx.lineTo(startX - 8, iconY + 8);
      ctx.closePath();
      ctx.stroke();

      // Brush tool
      const brushX = startX + iconSpacing;
      ctx.beginPath();
      ctx.moveTo(brushX, iconY - 8);
      ctx.lineTo(brushX, iconY + 4);
      ctx.moveTo(brushX - 6, iconY);
      ctx.lineTo(brushX + 6, iconY);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(brushX, iconY + 8, 3, 0, Math.PI * 2);
      ctx.stroke();

      // Shape tool
      const shapeX = startX + iconSpacing * 2;
      ctx.strokeRect(shapeX - 6, iconY - 6, 12, 12);
      ctx.beginPath();
      ctx.arc(shapeX, iconY, 4, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Draw title and subtitle
    const drawText = () => {
      // Title
      ctx.font = '700 32px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.95);
      ctx.textAlign = 'center';
      ctx.shadowBlur = 12;
      ctx.shadowColor = rgba(0.5);
      ctx.fillText('GRAFICHE', 300, 240);

      // Subtitle
      ctx.font = '400 13px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.7);
      ctx.shadowBlur = 6;
      ctx.shadowColor = rgba(0.3);
      ctx.fillText('Design grafico e visual identity', 300, 260);

      ctx.shadowBlur = 0;
    };

    // Animation loop
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      state.time += deltaTime;

      // Smooth rotation animation
      state.rotationY = state.time * 0.4;
      state.rotationX = Math.sin(state.time * 0.3) * 0.3;
      state.rotationZ = Math.sin(state.time * 0.5) * 0.1;

      // Palette wave animation
      state.palettePhase += deltaTime * 2;

      // Grid pulse animation
      state.gridPhase += deltaTime * 0.8;

      // Clear and render
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 600, 400);

      drawHexGrid();
      drawWireframeEye();
      drawText();
      drawColorPalette();
      drawToolIcons();

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
    <div className="grafiche-card">
      <canvas ref={canvasRef} className="grafiche-canvas" />
    </div>
  );
};

export default GraficheCard;
