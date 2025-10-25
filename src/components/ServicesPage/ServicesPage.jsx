import { useEffect, useState, useRef } from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [effectsReady, setEffectsReady] = useState(false);
  // 🚀 OTTIMIZZAZIONE: Cache del grid element
  const gridRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('services-page-body');
    
    // 🚀 CRITICAL: Salva riferimento al grid per evitare querySelector durante click
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

      // 🚀 OTTIMIZZAZIONE INP: Funzione ULTRA LEGGERA
      function triggerWaveEffect() {
        // Usa ref invece di querySelector
        const grid = gridRef.current;
        if (grid && !grid.classList.contains('flash')) {
          grid.classList.add('flash');
          // Rimozione async dopo che il click è completato
          setTimeout(() => grid.classList.remove('flash'), 800);
        }
      }

      // 🚀 CRITICAL: Overlay apre SUBITO, flash in parallelo
      window.openOverlay = function(overlayId) {
        // 🎯 NON fare nulla di sincrono qui!
        // Apri overlay immediatamente
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          overlay.classList.add('active');
        }
        
        // 🎯 Flash della griglia DOPO, non blocca il click
        setTimeout(triggerWaveEffect, 0);
      };

      window.closeOverlay = function(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          overlay.classList.remove('active');
        }
      };

      // 🚀 Event listeners ottimizzati
      const handleOverlayClick = (event) => {
        if (event.target.classList.contains('service-overlay')) {
          window.closeOverlay(event.target.id);
        }
      };

      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          const activeOverlay = document.querySelector('.service-overlay.active');
          if (activeOverlay) window.closeOverlay(activeOverlay.id);
        }
      };

      // 🚀 Passive per performance
      document.addEventListener('click', handleOverlayClick, { passive: true });
      document.addEventListener('keydown', handleEscKey);

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

      return () => {
        clearInterval(codeInterval);
        clearInterval(binaryInterval);
        clearInterval(limitCheckInterval);
        clearTimeout(codeTimeout);
        if (glitchIntervalId) clearTimeout(glitchIntervalId);
        
        activeTimeouts.forEach(timeout => clearTimeout(timeout));
        
        document.removeEventListener('click', handleOverlayClick);
        document.removeEventListener('keydown', handleEscKey);
        
        delete window.openOverlay;
        delete window.closeOverlay;
        
        const codeBackground = document.getElementById('codeBackground');
        if (codeBackground) codeBackground.innerHTML = '';
        
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

  // 🚀 OTTIMIZZAZIONE: Handler inline semplice (no function call overhead)
  return (
    <div className="services-page-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div id="gridOverlay" className="grid-overlay"></div>
      
      <header>
        <div className="header-content">
          <div className="logo">V//HENTE</div>
        </div>
      </header>

      <div className="services-container">
        {/* 🎯 onClick inline diretto - zero overhead */}
        <div 
          className="service-box" 
          onClick={() => effectsReady && window.openOverlay && window.openOverlay('overlay-1')}
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
          onClick={() => effectsReady && window.openOverlay && window.openOverlay('overlay-2')}
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
          onClick={() => effectsReady && window.openOverlay && window.openOverlay('overlay-3')}
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
          onClick={() => effectsReady && window.openOverlay && window.openOverlay('overlay-4')}
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

      {/* OVERLAYS */}
      <div className="service-overlay" id="overlay-1">
        <div className="overlay-content">
          <button className="overlay-close" onClick={() => window.closeOverlay && window.closeOverlay('overlay-1')}>×</button>
          <h2 className="overlay-title">Consulenze Digitali</h2>
          <p className="overlay-text">
            Se hai già una presenza online ma vorresti cambiare approccio o allinearti a delle ottiche più moderne, hai bisogno di qualcuno che si occupi ad aiutarti a gestire i tuoi servizi o semplicemente vuoi una consultazione per capire come muoverti per creare la tua presenza digitale, contattami o chiamami per studiare il tuo caso, identificare i tuoi problemi e valutare le misure possibili da adottare per risolvere i tuoi problemi.
          </p>
          <p className="overlay-text" style={{ color: '#0ff', fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
            La prima consulenza online è sempre gratuita!
          </p>
        </div>
      </div>

      <div className="service-overlay" id="overlay-2">
        <div className="overlay-content">
          <button className="overlay-close" onClick={() => window.closeOverlay && window.closeOverlay('overlay-2')}>×</button>
          <h2 className="overlay-title">Creazione Siti Web</h2>
          <p className="overlay-text">
            Creo il tuo sito a seconda del pacchetto che scegli e lo gestisco a seconda della disponibilità attuale che puoi verificare nella sezione gestione dei siti.
          </p>
          
          <div className="package-section">
            <h3 className="package-title">Pacchetto Base</h3>
            <p className="package-items">
              Sito Wordpress CMS o Build React App per uso vetrina o promozionale, ottimizzazione SEO monolingua, ottimizzazione materiale multimediale, Indicizzazione sulle Search Consolle, Grafiche Base.
            </p>
          </div>
          
          <div className="package-section">
            <h3 className="package-title">Pacchetto Intermedio</h3>
            <p className="package-items">
              Sito Wordpress CMS o Build React App per uso vetrina o promozionale, ottimizzazione SEO con possibilità di Multilingua, ottimizzazione materiale multimediale, Indicizzazione sulle Search Consolle, Grafiche personalizzate e animazioni Js/CSS personalizzate.
            </p>
          </div>
          
          <div className="package-section">
            <h3 className="package-title">Pacchetto Commerciale</h3>
            <p className="package-items">
              Sito Wordpress CMS con E-commerce, ottimizzazione SEO mono e multilingua, ottimizzazione materiale multimediale, indicizzazione sulle Search Consolle, Grafiche personalizzate.
            </p>
          </div>
        </div>
      </div>

      <div className="service-overlay" id="overlay-3">
        <div className="overlay-content">
          <button className="overlay-close" onClick={() => window.closeOverlay && window.closeOverlay('overlay-3')}>×</button>
          <h2 className="overlay-title">Presenza Online</h2>
          <p className="overlay-text">
            Gestisco per te i tuoi social e i tuoi siti:
          </p>
          
          <div className="package-section">
            <p className="package-items">
              • Hosting<br />
              • Chat<br />
              • Pubblicazione di contenuti<br />
              • Studio sulla strategia digitale da adottare<br />
              • Risoluzione controversie con clienti o pubblico
            </p>
          </div>
          
          <p className="overlay-text" style={{ marginTop: '1.5rem' }}>
            Lavoro per prestazioni in base al tuo bisogno, anche a periodi.
          </p>
          <p className="overlay-text" style={{ color: '#0ff', fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
            Se sei contento possiamo anche stringere una collaborazione a lungo termine!
          </p>
        </div>
      </div>

      <div className="service-overlay" id="overlay-4">
        <div className="overlay-content">
          <button className="overlay-close" onClick={() => window.closeOverlay && window.closeOverlay('overlay-4')}>×</button>
          <h2 className="overlay-title">Creazione Multimedia</h2>
          <p className="overlay-text">
            Creo o ricreo i tuoi contenuti multimediali:
          </p>
          
          <div className="package-section">
            <p className="package-items">
              • Grafiche SVG<br />
              • Contenuti per Social<br />
              • Animazioni<br />
              • Grafiche Digitali<br />
              • Mockups<br />
              • Ricostruzioni immagini<br />
              • Miglioramento immagini<br />
              • Pulizia Grafiche create con AI
            </p>
          </div>
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