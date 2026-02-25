import { useEffect, useRef } from 'react';
import './ComponentiCard.css';

const ComponentiCard = ({ theme = 'dark' }) => {
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

    const ctx = canvas.getContext('2d', { alpha: false });

    // Get container dimensions
    const container = canvas.parentElement;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // High DPI per qualità HD - usa devicePixelRatio
    const dpr = window.devicePixelRatio || 3;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.scale(dpr, dpr);

    // Text rendering ottimizzato
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Theme colors
    const primaryColor = theme === 'light' ? 'rgb(232, 160, 48)' : 'rgb(0, 255, 255)';
    const rgba = (alpha) => theme === 'light'
      ? `rgba(232, 160, 48, ${alpha})`
      : `rgba(0, 255, 255, ${alpha})`;
    const bgColor = theme === 'light' ? '#ffffff' : '#000';
    const editorBg = theme === 'light' ? '#f8f8f8' : '#0d1117';
    const editorHeaderBg = theme === 'light' ? '#eeeeee' : '#161b22';
    const lineNumBg = theme === 'light' ? '#e8e8e8' : '#010409';
    const borderColor = theme === 'light' ? '#d0d0d0' : '#21262d';

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
      // Responsive coordinates based on canvas size
      const editorX = width * 0.033; // ~20px on 600px
      const editorY = height * 0.0625; // ~25px on 400px
      const editorWidth = width * 0.64; // ~385px on 600px
      const editorHeight = height * 0.7375; // ~295px on 400px

      ctx.fillStyle = editorBg;
      ctx.fillRect(editorX, editorY, editorWidth, editorHeight);

      ctx.strokeStyle = rgba(0.4);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(editorX, editorY, editorWidth, editorHeight);

      ctx.fillStyle = editorHeaderBg;
      ctx.fillRect(editorX, editorY, editorWidth, height * 0.07);

      ctx.fillStyle = editorBg;
      ctx.fillRect(editorX + 5, editorY + 3, width * 0.2, height * 0.0625);

      ctx.fillStyle = theme === 'light' ? '#d97706' : '#ffd76b';
      ctx.beginPath();
      ctx.arc(editorX + 15, editorY + 15, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '500 12px "Share Tech Mono", monospace';
      ctx.fillStyle = theme === 'light' ? '#333333' : '#c9d1d9';
      ctx.textAlign = 'left';
      ctx.fillText('ProjectGallery.jsx', editorX + 25, editorY + 20);

      const lineNumWidth = width * 0.067; // ~40px on 600px
      ctx.fillStyle = lineNumBg;
      ctx.fillRect(editorX, editorY + 28, lineNumWidth, editorHeight - 28);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(editorX + lineNumWidth, editorY + 28);
      ctx.lineTo(editorX + lineNumWidth, editorY + editorHeight);
      ctx.stroke();

      const lines = state.code.split('\n');
      const lineHeight = height * 0.0425; // ~17px on 400px
      const startY = editorY + 47;
      const startX = editorX + lineNumWidth + 10;

      ctx.font = '500 12px "Share Tech Mono", monospace';

      const maxY = editorY + editorHeight - 10;

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        if (y > maxY) return;

        ctx.fillStyle = theme === 'light' ? '#999999' : '#6e7681';
        ctx.textAlign = 'right';
        ctx.fillText(String(index + 1).padStart(2, ' '), editorX + lineNumWidth - 8, y);

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
          if (cursorY <= maxY) {
            ctx.fillStyle = primaryColor;
            ctx.fillRect(cursorX, cursorY - 13, 2, 15);
          }
        }
      }
    };

    // Disegna debug panel
    const drawDebugPanel = () => {
      const panelX = width * 0.692; // ~415px on 600px
      const panelY = height * 0.0625; // ~25px on 400px
      const panelWidth = width * 0.275; // ~165px on 600px
      const panelHeight = height * 0.5625; // ~225px on 400px

      ctx.fillStyle = editorBg;
      ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

      ctx.strokeStyle = rgba(0.4);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

      ctx.fillStyle = editorHeaderBg;
      ctx.fillRect(panelX, panelY, panelWidth, height * 0.07);

      ctx.fillStyle = theme === 'light' ? '#777777' : '#8b949e';
      ctx.font = '500 11px "Share Tech Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('▶', panelX + 10, panelY + 17);

      ctx.fillStyle = theme === 'light' ? '#333333' : '#c9d1d9';
      ctx.fillText('CONSOLE', panelX + 25, panelY + 17);

      ctx.fillStyle = theme === 'light' ? '#d0d0d0' : '#21262d';
      ctx.fillRect(panelX + panelWidth - 35, panelY + 5, 30, 18);
      ctx.fillStyle = theme === 'light' ? '#777777' : '#8b949e';
      ctx.font = '400 10px "Share Tech Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('clear', panelX + panelWidth - 20, panelY + 17);

      const logHeight = height * 0.0375; // ~15px on 400px
      const startY = panelY + 43;

      ctx.font = '400 10px "Share Tech Mono", monospace';
      ctx.textAlign = 'left';

      const maxY = panelY + panelHeight - 10;

      state.activeDebugLogs.forEach((log, i) => {
        const y = startY + i * logHeight;
        if (y > maxY) return;

        if (log.type === 'success') {
          ctx.fillStyle = theme === 'light' ? '#16a34a' : '#3fb950';
          ctx.fillText('✓', panelX + 10, y);
        } else if (log.type === 'warn') {
          ctx.fillStyle = theme === 'light' ? '#ca8a04' : '#d29922';
          ctx.fillText('⚠', panelX + 10, y);
        } else if (log.type === 'log') {
          ctx.fillStyle = primaryColor;
          ctx.fillText('●', panelX + 10, y);
        } else {
          ctx.fillStyle = theme === 'light' ? '#777777' : '#8b949e';
          ctx.fillText('›', panelX + 10, y);
        }

        ctx.fillStyle = theme === 'light' ? '#333333' : '#c9d1d9';
        const maxLen = 18;
        const msg = log.msg.length > maxLen ? log.msg.substring(0, maxLen - 2) + '..' : log.msg;
        ctx.fillText(msg, panelX + 25, y);
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

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      updateTyping(deltaTime);
      drawEditor();
      drawDebugPanel();

      // Abilita anti-aliasing per i titoli (qualità come HTML/CSS)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Titolo con shadow per depth - responsive position
      ctx.textAlign = 'right';
      ctx.font = '700 24px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.95);
      ctx.shadowBlur = 8;
      ctx.shadowColor = rgba(0.4);
      ctx.fillText('COMPONENTI', width * 0.95, height * 0.85);

      // Descrizione
      ctx.font = '400 14px "Share Tech Mono", monospace';
      ctx.fillStyle = rgba(0.7);
      ctx.shadowBlur = 4;
      ctx.shadowColor = rgba(0.2);
      ctx.fillText('UI components e librerie React', width * 0.95, height * 0.9125);

      // Reset shadow
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
    <div className="componenti-card">
      <canvas ref={canvasRef} width="600" height="400" className="code-canvas" />
    </div>
  );
};

export default ComponentiCard;
