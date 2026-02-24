import { useEffect, useRef } from 'react';
import './SitiWebCard.css';

const SitiWebCard = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    code: '',
    targetCode: '',
    typingSpeed: 0,
    cursorVisible: true,
    cursorTime: 0,
    activeDebugLogs: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // High DPI per qualità HD
    const dpr = window.devicePixelRatio || 2;
    canvas.width = 600 * dpr;
    canvas.height = 400 * dpr;
    ctx.scale(dpr, dpr);

    // Anti-aliasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Debug events sincronizzati
    const debugEvents = [
      { atChar: 0, type: 'info', msg: '> npm run dev' },
      { atChar: 10, type: 'info', msg: 'vite v5.0.8 starting...' },
      { atChar: 50, type: 'success', msg: '✓ dependencies loaded' },
      { atChar: 120, type: 'info', msg: 'compiling...' },
      { atChar: 180, type: 'warn', msg: 'setState hook detected' },
      { atChar: 250, type: 'success', msg: '✓ component compiled' },
      { atChar: 320, type: 'info', msg: 'http://localhost:3000' },
      { atChar: 380, type: 'log', msg: 'console: "Data loaded"' },
      { atChar: 450, type: 'success', msg: '✓ HMR update' },
      { atChar: 520, type: 'info', msg: 'watching for changes' },
      { atChar: 600, type: 'success', msg: '✓ ready in 1.2s' }
    ];

    // Codice React reale
    const codeLines = [
      'import React, { useState, useEffect } from "react";',
      'import axios from "axios";',
      '',
      'export default function ProjectGallery() {',
      '  const [projects, setProjects] = useState([]);',
      '  const [loading, setLoading] = useState(true);',
      '',
      '  useEffect(() => {',
      '    const fetchProjects = async () => {',
      '      try {',
      '        const res = await axios.get("/api/projects");',
      '        setProjects(res.data);',
      '        console.log("Data loaded", res.data.length);',
      '      } catch (err) {',
      '        console.error("Failed to load", err);',
      '      } finally {',
      '        setLoading(false);',
      '      }',
      '    };',
      '    fetchProjects();',
      '  }, []);',
      '',
      '  return (',
      '    <div className="gallery">',
      '      {loading ? <Spinner /> : (',
      '        projects.map(p => <Card key={p.id} {...p} />)',
      '      )}',
      '    </div>',
      '  );',
      '}'
    ];

    const state = stateRef.current;
    state.targetCode = codeLines.join('\n');

    // Colori syntax highlighting
    const colors = {
      keyword: '#ff6b9d',
      string: '#6bffa3',
      function: '#ffd76b',
      jsx: '#6bc8ff',
      bracket: '#c8c8c8',
      comment: '#6a737d',
      normal: '#b0b0b0',
      property: '#79c0ff'
    };

    // Parser syntax highlighting
    const parseCodeLine = (line) => {
      const tokens = [];
      const keywords = ['import', 'from', 'export', 'default', 'function', 'const', 'return', 'if', 'try', 'catch', 'finally', 'async', 'await'];
      const hooks = ['useState', 'useEffect', 'axios'];
      const jsxTags = ['div', 'Spinner', 'Card'];

      let i = 0;
      while (i < line.length) {
        if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
          let str = line[i];
          let quote = line[i];
          i++;
          while (i < line.length && line[i] !== quote) {
            if (line[i] === '\\' && i + 1 < line.length) {
              str += line[i] + line[i + 1];
              i += 2;
            } else {
              str += line[i];
              i++;
            }
          }
          if (i < line.length) str += line[i++];
          tokens.push({ text: str, color: colors.string });
          continue;
        }

        if (line[i] === '/' && i + 1 < line.length && line[i + 1] === '/') {
          tokens.push({ text: line.substring(i), color: colors.comment });
          break;
        }

        if (line[i] === '<' || line[i] === '>') {
          tokens.push({ text: line[i], color: colors.jsx });
          i++;
          continue;
        }

        if ('(){}[];=,.?:'.includes(line[i])) {
          tokens.push({ text: line[i], color: colors.bracket });
          i++;
          continue;
        }

        if (line[i] === ' ') {
          tokens.push({ text: ' ', color: colors.normal });
          i++;
          continue;
        }

        let word = '';
        while (i < line.length && !/[\s(){}[\];=,.<>]/.test(line[i])) {
          word += line[i];
          i++;
        }

        if (word) {
          let color = colors.normal;

          if (keywords.includes(word)) {
            color = colors.keyword;
          } else if (hooks.includes(word)) {
            color = colors.function;
          } else if (jsxTags.includes(word)) {
            color = colors.jsx;
          } else if (/^[A-Z]/.test(word)) {
            color = colors.function;
          } else if (word === 'console' || word === 'data' || word === 'err') {
            color = colors.property;
          }

          tokens.push({ text: word, color: color });
        }
      }

      return tokens;
    };

    // Disegna editor
    const drawEditor = () => {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(20, 25, 385, 295);

      ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, 25, 385, 295);

      ctx.fillStyle = '#161b22';
      ctx.fillRect(20, 25, 385, 28);

      ctx.fillStyle = '#0d1117';
      ctx.fillRect(25, 28, 120, 25);

      ctx.fillStyle = '#ffd76b';
      ctx.beginPath();
      ctx.arc(35, 40, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '500 12px "Share Tech Mono", monospace';
      ctx.fillStyle = '#c9d1d9';
      ctx.textAlign = 'left';
      ctx.fillText('ProjectGallery.jsx', 45, 45);

      ctx.fillStyle = '#010409';
      ctx.fillRect(20, 53, 40, 267);

      ctx.strokeStyle = '#21262d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 53);
      ctx.lineTo(60, 320);
      ctx.stroke();

      const lines = state.code.split('\n');
      const lineHeight = 17;
      const startY = 72;
      const startX = 70;

      ctx.font = '500 12px "Share Tech Mono", monospace';

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        if (y > 310) return;

        ctx.fillStyle = '#6e7681';
        ctx.textAlign = 'right';
        ctx.fillText(String(index + 1).padStart(2, ' '), 52, y);

        if (line.trim()) {
          const tokens = parseCodeLine(line);
          let x = startX;

          ctx.textAlign = 'left';
          tokens.forEach(token => {
            ctx.fillStyle = token.color;
            ctx.fillText(token.text, x, y);
            x += ctx.measureText(token.text).width;
          });
        }
      });

      if (state.cursorVisible && lines.length > 0) {
        const lastLineIdx = lines.length - 1;
        const lastLine = lines[lastLineIdx];
        if (lastLine !== undefined) {
          const tokens = parseCodeLine(lastLine);
          let cursorX = startX;
          tokens.forEach(t => cursorX += ctx.measureText(t.text).width);

          const cursorY = startY + lastLineIdx * lineHeight;
          if (cursorY <= 310) {
            ctx.fillStyle = '#58a6ff';
            ctx.fillRect(cursorX, cursorY - 13, 2, 15);
          }
        }
      }
    };

    // Disegna debug panel
    const drawDebugPanel = () => {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(415, 25, 165, 225);

      ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(415, 25, 165, 225);

      ctx.fillStyle = '#161b22';
      ctx.fillRect(415, 25, 165, 28);

      ctx.fillStyle = '#8b949e';
      ctx.font = '500 11px "Share Tech Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('▶', 425, 42);

      ctx.fillStyle = '#c9d1d9';
      ctx.fillText('CONSOLE', 440, 42);

      ctx.fillStyle = '#21262d';
      ctx.fillRect(545, 30, 30, 18);
      ctx.fillStyle = '#8b949e';
      ctx.font = '400 10px "Share Tech Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('clear', 560, 42);

      const logHeight = 15;
      const startY = 68;

      ctx.font = '400 10px "Share Tech Mono", monospace';
      ctx.textAlign = 'left';

      state.activeDebugLogs.forEach((log, i) => {
        const y = startY + i * logHeight;
        if (y > 240) return;

        if (log.type === 'success') {
          ctx.fillStyle = '#3fb950';
          ctx.fillText('✓', 425, y);
        } else if (log.type === 'warn') {
          ctx.fillStyle = '#d29922';
          ctx.fillText('⚠', 425, y);
        } else if (log.type === 'log') {
          ctx.fillStyle = '#58a6ff';
          ctx.fillText('●', 425, y);
        } else {
          ctx.fillStyle = '#8b949e';
          ctx.fillText('›', 425, y);
        }

        ctx.fillStyle = '#c9d1d9';
        const maxLen = 18;
        const msg = log.msg.length > maxLen ? log.msg.substring(0, maxLen - 2) + '..' : log.msg;
        ctx.fillText(msg, 440, y);
      });
    };

    // Update typing
    const updateTyping = (deltaTime) => {
      state.typingSpeed += deltaTime;

      const charsPerSecond = 30;
      const interval = 1 / charsPerSecond;

      if (state.typingSpeed >= interval && state.code !== state.targetCode) {
        state.code = state.targetCode.substring(0, state.code.length + 1);
        state.typingSpeed = 0;

        const currentLength = state.code.length;
        debugEvents.forEach(event => {
          if (event.atChar === currentLength && !state.activeDebugLogs.includes(event)) {
            state.activeDebugLogs.push(event);
            if (state.activeDebugLogs.length > 12) {
              state.activeDebugLogs.shift();
            }
          }
        });

        if (state.code === state.targetCode) {
          setTimeout(() => {
            state.code = '';
            state.activeDebugLogs = [];
          }, 4000);
        }
      }

      state.cursorTime += deltaTime;
      if (state.cursorTime >= 0.5) {
        state.cursorVisible = !state.cursorVisible;
        state.cursorTime = 0;
      }
    };

    // Animate
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, 600, 400);

      updateTyping(deltaTime);
      drawEditor();
      drawDebugPanel();

      ctx.textAlign = 'right';
      ctx.font = '700 24px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.95)';
      ctx.fillText('SITI WEB', 570, 340);

      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.fillText('Sviluppo web e applicazioni', 570, 365);

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
    <div className="sitiweb-card">
      <canvas ref={canvasRef} width="600" height="400" className="code-canvas" />
    </div>
  );
};

export default SitiWebCard;
