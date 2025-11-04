import { useEffect, useState, useRef } from 'react';
import './ServicesPage.css';

const ServicesPage = ({ onNavigate }) => {
  const [effectsReady, setEffectsReady] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('services-page-body');
    
    gridRef.current = document.getElementById('gridOverlay');
    
    const initEffects = () => {
      setEffectsReady(true);
      
      const codeSnippets = ['int main() {', 'class Node {', 'return 0;'];
      let usedPositions = [];
      let activeTimeouts = [];

      function isPositionFree(x, y, width, height) {
        const margin = 15;
        return !usedPositions.some(pos => {
          return !(x + width + margin < pos.x || 
                  x - margin > pos.x + pos.width || 
                  y + height + margin < pos.y || 
                  y - margin > pos.y + pos.height);
        });
      }

      function generateCodeLine() {
        const maxAttempts = 3;
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        for (let attempts = 0; attempts < maxAttempts; attempts++) {
          const x = Math.random() * (window.innerWidth - 250);
          const y = Math.random() * (window.innerHeight - 30);
          const width = snippet.length * 8;
          const height = 18;
          
          if (isPositionFree(x, y, width, height)) {
            const codeLine = document.createElement('div');
            codeLine.className = 'code-line';
            codeLine.textContent = snippet;
            codeLine.style.cssText = `left:${x}px;top:${y}px`;
            
            const codeBackground = document.getElementById('codeBackground');
            if (codeBackground) {
              codeBackground.appendChild(codeLine);
            }
            
            usedPositions.push({ x, y, width, height, element: codeLine });
            
            const removeTimeout = setTimeout(() => {
              if (codeLine.parentNode) {
                codeLine.parentNode.removeChild(codeLine);
                usedPositions = usedPositions.filter(pos => pos.element !== codeLine);
              }
            }, 6000);
            
            activeTimeouts.push(removeTimeout);
            break;
          }
        }
      }

      const codeInterval = setInterval(generateCodeLine, 6000);
      const codeTimeout = setTimeout(generateCodeLine, 2000);

      const binaryInterval = setInterval(() => {
        const digits = document.querySelectorAll('.binary-digit');
        if (digits.length > 0) {
          const randomDigit = digits[Math.floor(Math.random() * digits.length)];
          randomDigit.textContent = randomDigit.textContent === '1' ? '0' : '1';
        }
      }, 2000);

      function triggerWaveEffect() {
        const grid = gridRef.current;
        if (grid && !grid.classList.contains('flash')) {
          grid.classList.add('flash');
          setTimeout(() => grid.classList.remove('flash'), 800);
        }
      }

      let glitchIntervalId = null;
      
      function scheduleNextGlitch() {
        const delay = Math.random() * 6000 + 10000;
        glitchIntervalId = setTimeout(() => {
          const boxes = document.querySelectorAll('.service-box');
          if (boxes.length > 0) {
            const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
            randomBox.classList.add('glitching');
            setTimeout(() => randomBox.classList.remove('glitching'), 200);
          }
          scheduleNextGlitch();
        }, delay);
      }

      scheduleNextGlitch();

      const limitCheckInterval = setInterval(() => {
        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length > 3) {
          for (let i = 0; i < codeLines.length - 3; i++) {
            if (codeLines[i].parentNode) {
              codeLines[i].parentNode.removeChild(codeLines[i]);
            }
          }
        }
      }, 3000);

      // Store triggerWaveEffect in window for click handlers
      window.triggerWaveEffect = triggerWaveEffect;

      return () => {
        clearInterval(codeInterval);
        clearInterval(binaryInterval);
        clearInterval(limitCheckInterval);
        clearTimeout(codeTimeout);
        if (glitchIntervalId) clearTimeout(glitchIntervalId);
        
        activeTimeouts.forEach(timeout => clearTimeout(timeout));
        
        const codeBackground = document.getElementById('codeBackground');
        if (codeBackground) codeBackground.innerHTML = '';
        
        delete window.triggerWaveEffect;
        
        usedPositions = [];
      };
    };

    let cleanup;
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        cleanup = initEffects();
      }, { timeout: 1000 });
    } else {
      setTimeout(() => {
        cleanup = initEffects();
      }, 500);
    }

    return () => {
      document.body.classList.remove('services-page-body');
      if (cleanup) cleanup();
      gridRef.current = null;
    };
  }, []);

  const handleServiceClick = (servicePage) => {
    if (effectsReady && window.triggerWaveEffect) {
      window.triggerWaveEffect();
    }
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(servicePage);
      }
    }, 100);
  };

  return (
    <div className="services-page-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div id="gridOverlay" className="grid-overlay"></div>
      
      <header>
        <div className="header-content">
          <div className="logo">.</div>
        </div>
      </header>

      <div className="services-container">
        <div 
          className="service-box" 
          onClick={() => handleServiceClick('consulenze')}
        >
          <svg className="border-svg" viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M 0,40 L 40,0 L 120,0 L 140,15 L 300,15 L 320,0 L 360,0 L 380,20 L 380,130 L 350,160 L 280,160 L 260,180 L 80,180 L 60,165 L 20,165 L 0,145 Z" />
          </svg>
          <div className="service-icon icon-consulenza">
            <div className="icon-consulenza-center"></div>
          </div>
          <span className="service-box-text">CONSULENZE DIGITALI</span>
          <p className="service-box-description">Analisi strategica e ottimizzazione della presenza digitale aziendale</p>
        </div>

        <div 
          className="service-box" 
          onClick={() => handleServiceClick('sitiweb')}
        >
          <svg className="border-svg" viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M 0,40 L 40,0 L 120,0 L 140,15 L 300,15 L 320,0 L 360,0 L 380,20 L 380,130 L 350,160 L 280,160 L 260,180 L 80,180 L 60,165 L 20,165 L 0,145 Z" />
          </svg>
          <div className="service-icon icon-siti">
            <div className="binary-row">
              <div className="binary-digit">1</div>
              <div className="binary-digit">0</div>
              <div className="binary-digit">1</div>
              <div className="binary-digit">1</div>
            </div>
            <div className="binary-row">
              <div className="binary-digit">0</div>
              <div className="binary-digit">1</div>
              <div className="binary-digit">0</div>
              <div className="binary-digit">0</div>
            </div>
            <div className="binary-row">
              <div className="binary-digit">1</div>
              <div className="binary-digit">1</div>
              <div className="binary-digit">0</div>
              <div className="binary-digit">1</div>
            </div>
          </div>
          <span className="service-box-text">CREAZIONE SITI WEB</span>
          <p className="service-box-description">Sviluppo web professionale con tecnologie moderne e design responsive</p>
        </div>

        <div 
          className="service-box" 
          onClick={() => handleServiceClick('presenza')}
        >
          <svg className="border-svg" viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M 0,40 L 40,0 L 120,0 L 140,15 L 300,15 L 320,0 L 360,0 L 380,20 L 380,130 L 350,160 L 280,160 L 260,180 L 80,180 L 60,165 L 20,165 L 0,145 Z" />
          </svg>
          <div className="service-icon icon-presenza">
            <div className="radar-circle"></div>
            <div className="radar-circle"></div>
            <div className="radar-circle"></div>
            <div className="radar-sweep"></div>
            <div className="radar-dot"></div>
          </div>
          <span className="service-box-text">PRESENZA ONLINE</span>
          <p className="service-box-description">Gestione completa dei canali digitali e strategie di engagement</p>
        </div>

        <div 
          className="service-box" 
          onClick={() => handleServiceClick('multimedia')}
        >
          <svg className="border-svg" viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M 0,40 L 40,0 L 120,0 L 140,15 L 300,15 L 320,0 L 360,0 L 380,20 L 380,130 L 350,160 L 280,160 L 260,180 L 80,180 L 60,165 L 20,165 L 0,145 Z" />
          </svg>
          <div className="service-icon icon-multimedia">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
          <span className="service-box-text">CREAZIONE MULTIMEDIA</span>
          <p className="service-box-description">Produzione contenuti audio-video e grafica professionale</p>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <p className="footer-text">© 2025 VIHENTE - PER ASPERA AD ASTRA</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;