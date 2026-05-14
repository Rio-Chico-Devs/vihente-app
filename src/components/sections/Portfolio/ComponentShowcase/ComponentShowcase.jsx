import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuide } from '../../../../contexts/GuideContext';
import './ComponentShowcase.css';

const ComponentShowcase = () => {
  const navigate = useNavigate();
  const { setGuide, clearGuide } = useGuide();

  const componentGuide = {
    'slider':          'Gallery/slider con animazioni, transizioni fluide e navigazione touch.',
    'text-sampler':    'Anteprima live di tutti i font e stili tipografici usati nel sito.',
    'cubo-3d':         'Cubo 3D interattivo con rotazione animata — CSS puro, zero librerie.',
    'music-player':    'Player musicale con playlist, progress bar e visualizer grafico in tempo reale.',
    'crud-simulator':  'Simulatore di magazzino con operazioni CRUD complete e inventario gestito in stato.',
    'black-market':    'shop game con sistema di rarità, inventario randomico, carrello e checkout.',
    'dashboard':       'Pannello analytics con grafici SVG, KPI, metriche ECG scrollanti e selezione periodo.',
    'image-checker':   'componente per analizzare immagini, con lente per focalizzare piccoli dettagli',
    'booking':         'Sistema di prenotazione con calendario interattivo e gestione disponibilità.',
  };

  // Icona lente di ingrandimento SVG (stile consulenze)
  const MagnifyIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="29" y1="29" x2="40" y2="40" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="6" stroke="var(--color-primary, #0ff)" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );

  const components = [
    {
      id: 'slider',
      title: 'Expandable Gallery',
      description: 'Galleria immagini espandibile con anteprime cliccabili',
      path: '/portfolio/componenti/slider',
      preview: (
        <div className="mini-gallery">
          <div className="gallery-thumbnails">
            <div className="gallery-thumb active">IMG</div>
            <div className="gallery-thumb">IMG</div>
            <div className="gallery-thumb">IMG</div>
          </div>
          <div className="gallery-main-preview">
            <div className="gallery-expand-icon">⤢</div>
          </div>
        </div>
      )
    },
    {
      id: 'text-sampler',
      title: 'Text Sampler',
      description: 'Effetti di testo animati avanzati',
      path: '/portfolio/componenti/text-sampler',
      preview: (
        <div className="mini-text-sampler">
          <div className="sample-text-mini">SAMPLE</div>
          <div className="control-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )
    },
    {
      id: 'cubo-3d',
      title: '3D Model',
      description: 'Cubo 3D interattivo draggable',
      path: '/portfolio/componenti/cubo-3d',
      preview: (
        <div className="mini-3d">
          <div className="cube-mini">
            <div className="cube-face-mini front"></div>
            <div className="cube-face-mini back"></div>
            <div className="cube-face-mini left"></div>
            <div className="cube-face-mini right"></div>
            <div className="cube-face-mini top"></div>
            <div className="cube-face-mini bottom"></div>
          </div>
        </div>
      )
    },
    {
      id: 'music-player',
      title: 'Music Player',
      description: 'Player audio interattivo con visualizzatore di frequenze',
      path: '/portfolio/componenti/music-player',
      preview: (
        <div className="mini-music-player">
          <div className="mini-player-display">
            <svg className="mini-music-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10 24 V12 L22 8 V20" stroke="var(--color-primary, #0ff)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="24" r="3" stroke="var(--color-primary, #0ff)" strokeWidth="2"/>
              <circle cx="22" cy="20" r="3" stroke="var(--color-primary, #0ff)" strokeWidth="2"/>
            </svg>
          </div>
          <div className="mini-visualizer">
            <div className="mini-frequency-bar" style={{ height: '40%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '70%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '50%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '80%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '60%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '90%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '55%' }}></div>
          </div>
        </div>
      )
    },
    {
      id: 'crud-simulator',
      title: 'Operazioni di magazino',
      description: 'Interfaccia CRUD completa con operazioni Create, Read, Update, Delete',
      path: '/portfolio/componenti/crud-simulator',
      preview: (
        <div className="mini-crud">
          <div className="mini-crud-header">
            <div className="mini-crud-title">WAREHOUSE</div>
          </div>
          <div className="mini-crud-table">
            <div className="mini-crud-row"></div>
            <div className="mini-crud-row"></div>
            <div className="mini-crud-row"></div>
          </div>
          <div className="mini-crud-buttons">
            <div className="mini-crud-btn">+</div>
          </div>
        </div>
      )
    },
    {
      id: 'black-market',
      title: 'Black Market',
      description: 'E-commerce cyberpunk con carrello e checkout completo',
      path: '/portfolio/componenti/black-market',
      preview: (
        <div className="mini-black-market">
          <div className="mini-market-header">
            <div className="mini-market-title">MARKET</div>
            <div className="mini-cart-icon">🛒</div>
          </div>
          <div className="mini-products">
            <div className="mini-product-card"></div>
            <div className="mini-product-card"></div>
            <div className="mini-product-card"></div>
            <div className="mini-product-card"></div>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Analytics Dashboard',
      description: 'Pannello analytics con KPI, grafici e transazioni in tempo reale',
      path: '/portfolio/componenti/dashboard',
      preview: (
        <div className="mini-dashboard">
          <div className="mini-dash-header">
            <div className="mini-dash-title">ANALYTICS</div>
            <div className="mini-dash-live"><span className="mini-live-dot"></span>LIVE</div>
          </div>
          <div className="mini-kpi-row">
            <div className="mini-kpi">€4.8k<span className="mini-kpi-up">▲</span></div>
            <div className="mini-kpi">1.2k<span className="mini-kpi-up">▲</span></div>
            <div className="mini-kpi">6.4%<span className="mini-kpi-down">▼</span></div>
          </div>
          <div className="mini-bars">
            <div className="mini-bar" style={{ height: '40%' }}></div>
            <div className="mini-bar" style={{ height: '65%' }}></div>
            <div className="mini-bar" style={{ height: '50%' }}></div>
            <div className="mini-bar" style={{ height: '80%' }}></div>
            <div className="mini-bar" style={{ height: '60%' }}></div>
            <div className="mini-bar" style={{ height: '90%' }}></div>
            <div className="mini-bar" style={{ height: '70%' }}></div>
          </div>
        </div>
      )
    },
    {
      id: 'image-checker',
      title: 'Image Checker',
      description: 'Lente di ingrandimento interattiva per esplorare i dettagli delle immagini',
      path: '/portfolio/componenti/image-checker',
      preview: (
        <div className="mini-image-checker">
          <div className="mini-checker-icon">
            <MagnifyIcon />
          </div>
          <div className="mini-checker-image">
            <div className="mini-checker-lens"></div>
          </div>
        </div>
      )
    },
    {
      id: 'booking',
      title: 'Booking System',
      description: 'Sistema di prenotazione con calendario, orari e conferma multi-step',
      path: '/portfolio/componenti/booking',
      preview: (
        <div className="mini-booking">
          <div className="mini-bk-header">
            <div className="mini-bk-title">BOOKING</div>
            <div className="mini-bk-steps">
              <div className="mini-bk-step done"></div>
              <div className="mini-bk-step current"></div>
              <div className="mini-bk-step"></div>
              <div className="mini-bk-step"></div>
            </div>
          </div>
          <div className="mini-bk-cal">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(d => (
              <div key={d} className={`mini-bk-day${d === 8 ? ' sel' : ''}${d === 3 ? ' today' : ''}`}>{d}</div>
            ))}
          </div>
          <div className="mini-bk-slots">
            <div className="mini-bk-slot">09:00</div>
            <div className="mini-bk-slot sel">10:30</div>
            <div className="mini-bk-slot busy"></div>
          </div>
        </div>
      )
    }
  ];

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      'const components = [',
      'function Component() {',
      'return <Preview />',
      'export default UI;',
      'import { useState }'
    ];
    let activeTimeouts = [];

    function generateCodeLine() {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const x = Math.random() * (window.innerWidth - 250);
      const y = Math.random() * (window.innerHeight - 30);
      
      const codeLine = document.createElement('div');
      codeLine.className = 'code-line';
      codeLine.textContent = snippet;
      codeLine.style.cssText = `left:${x}px;top:${y}px`;
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        codeBackground.appendChild(codeLine);
      }
      
      const removeTimeout = setTimeout(() => {
        if (codeLine.parentNode) {
          codeLine.parentNode.removeChild(codeLine);
        }
      }, 6000);
      
      activeTimeouts.push(removeTimeout);
    }

    const codeInterval = setInterval(generateCodeLine, 6000);
    const codeTimeout = setTimeout(generateCodeLine, 2000);

    return () => {
      clearInterval(codeInterval);
      clearTimeout(codeTimeout);
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        while (codeBackground.firstChild) {
          codeBackground.removeChild(codeBackground.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="component-showcase">
      <div className="code-background" id="codeBackground"></div>
      <div className="preview-grid">
        <h1 className="showcase-title">Component Showcase</h1>
        <p className="showcase-subtitle">Click su una preview per esplorare il componente</p>
        
        <div className="previews-container">
          {components.map(component => (
            <div 
              key={component.id}
              className="preview-card"
              onClick={() => navigate(component.path)}
              onMouseEnter={() => setGuide(componentGuide[component.id])}
              onMouseLeave={clearGuide}
            >
              <div className="preview-content">
                {component.preview}
                <h3 className="preview-title">{component.title}</h3>
                <p className="preview-description">{component.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
