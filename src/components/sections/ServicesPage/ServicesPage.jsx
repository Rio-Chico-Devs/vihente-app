import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [effectsReady, setEffectsReady] = useState(false);
  const gridRef = useRef(null);
  
  const intervalsRef = useRef([]);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    console.log('🚀 ServicesPage MOUNTING...');
    const mountStart = performance.now();

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
      intervalsRef.current.push(codeInterval);
      const codeTimeout = setTimeout(generateCodeLine, 2000);
      timeoutsRef.current.push(codeTimeout);

      const binaryInterval = setInterval(() => {
        const digits = document.querySelectorAll('.binary-digit');
        if (digits.length > 0) {
          const randomDigit = digits[Math.floor(Math.random() * digits.length)];
          randomDigit.textContent = randomDigit.textContent === '1' ? '0' : '1';
        }
      }, 2000);
      intervalsRef.current.push(binaryInterval);

      function triggerWaveEffect() {
        const grid = gridRef.current;
        if (grid && !grid.classList.contains('flash')) {
          grid.classList.add('flash');
          const flashTimeout = setTimeout(() => grid.classList.remove('flash'), 800);
          timeoutsRef.current.push(flashTimeout);
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
            const glitchTimeout = setTimeout(() => randomBox.classList.remove('glitching'), 200);
            timeoutsRef.current.push(glitchTimeout);
          }
          scheduleNextGlitch();
        }, delay);
        timeoutsRef.current.push(glitchIntervalId);
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
      intervalsRef.current.push(limitCheckInterval);

      window.triggerWaveEffect = triggerWaveEffect;

      return () => {
        clearInterval(codeInterval);
        clearInterval(binaryInterval);
        clearInterval(limitCheckInterval);
        clearTimeout(codeTimeout);
        if (glitchIntervalId) clearTimeout(glitchIntervalId);
        
        activeTimeouts.forEach(timeout => clearTimeout(timeout));

        const codeBackground = document.getElementById('codeBackground');
        if (codeBackground) {
          while (codeBackground.firstChild) {
            codeBackground.removeChild(codeBackground.firstChild);
          }
        }

        delete window.triggerWaveEffect;
        
        usedPositions = [];
      };
    };

    let cleanup;

    const mountEnd = performance.now();
    console.log(`✅ ServicesPage MOUNTED in ${(mountEnd - mountStart).toFixed(2)}ms`);

    if ('requestIdleCallback' in window) {
      console.log('⏳ Waiting for requestIdleCallback (max 1000ms)...');
      requestIdleCallback(() => {
        const effectsStart = performance.now();
        console.log(`🎨 Starting effects after ${(effectsStart - mountStart).toFixed(2)}ms`);
        cleanup = initEffects();
      }, { timeout: 1000 });
    } else {
      console.log('⏳ Using setTimeout fallback (500ms)...');
      setTimeout(() => {
        console.log('🎨 Starting effects (setTimeout)');
        cleanup = initEffects();
      }, 500);
    }

    return () => {
      console.log('🧹 ServicesPage UNMOUNTING');
      document.body.classList.remove('services-page-body');
      
      intervalsRef.current.forEach(interval => clearInterval(interval));
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      intervalsRef.current = [];
      timeoutsRef.current = [];
      
      if (cleanup) cleanup();
      gridRef.current = null;
    };
  }, []);

  const handleServiceClick = (servicePath) => {
    if (effectsReady && window.triggerWaveEffect) {
      window.triggerWaveEffect();
    }
    setTimeout(() => {
      navigate(servicePath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="services-page-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div id="gridOverlay" className="grid-overlay"></div>

      <div className="services-container">
        <div
          className="service-box"
          onClick={() => handleServiceClick('/services/consulenze')}
          role="button"
          tabIndex={0}
          aria-label="Vai alla pagina Consulenze digitali"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleServiceClick('/services/consulenze');
            }
          }}
        >
          <svg className="border-svg" viewBox="0 0 380 180" preserveAspectRatio="none">
            <path d="M 0,40 L 40,0 L 120,0 L 140,15 L 300,15 L 320,0 L 360,0 L 380,20 L 380,130 L 350,160 L 280,160 L 260,180 L 80,180 L 60,165 L 20,165 L 0,145 Z" />
          </svg>
          <div className="service-icon icon-consulenza">
            <div className="icon-consulenza-center"></div>
          </div>
          <span className="service-box-text">CONSULENZE digitali</span>
          <p className="service-box-description">Analisi e ottimizzazione della presenza digitale aziendale</p>
        </div>

        <div
          className="service-box"
          onClick={() => handleServiceClick('/services/sitiweb')}
          role="button"
          tabIndex={0}
          aria-label="Vai alla pagina Sviluppo di Siti web su misura"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleServiceClick('/services/sitiweb');
            }
          }}
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
          <span className="service-box-text">Sviluppo di Siti web su misura</span>
          <p className="service-box-description">Sviluppo siti web con tecnologie moderne e design responsive</p>
        </div>

        <div
          className="service-box"
          onClick={() => handleServiceClick('/services/presenza')}
          role="button"
          tabIndex={0}
          aria-label="Vai alla pagina Social Media e presenza"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleServiceClick('/services/presenza');
            }
          }}
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
          <span className="service-box-text"> Social Media e presenza</span>
          <p className="service-box-description wave">Gestione dei canali online e strategie di engagement</p>
        </div>

        <div
          className="service-box"
          onClick={() => handleServiceClick('/services/multimedia')}
          role="button"
          tabIndex={0}
          aria-label="Vai alla pagina creazione File Multimediali"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleServiceClick('/services/multimedia');
            }
          }}
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
          <span className="service-box-text">creazione File Multimediali</span>
          <p className="service-box-description">Produzione file multimediali e grafiche digitali</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;