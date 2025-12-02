import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponentShowcase.css';

const ComponentShowcase = () => {
  const navigate = useNavigate();

  const components = [
    {
      id: 'slider',
      title: 'Image Slider',
      description: 'Slider infinito con controlli play/pause',
      path: '/portfolio/componenti/slider',
      preview: (
        <div className="mini-scroll">
          <div className="scroll-track">
            <div className="scroll-item">IMG</div>
            <div className="scroll-item">IMG</div>
            <div className="scroll-item">IMG</div>
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
          <div className="mini-visualizer">
            <div className="mini-frequency-bar" style={{ height: '40%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '70%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '50%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '80%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '60%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '90%' }}></div>
            <div className="mini-frequency-bar" style={{ height: '55%' }}></div>
          </div>
          <div className="mini-player-controls">
            <div className="mini-play-btn">▶</div>
          </div>
        </div>
      )
    },
    {
      id: 'crud-simulator',
      title: 'CRUD Simulator',
      description: 'Interfaccia CRUD completa con operazioni Create, Read, Update, Delete',
      path: '/portfolio/componenti/crud-simulator',
      preview: (
        <div className="mini-crud">
          <div className="mini-crud-header">
            <div className="mini-crud-title">CRUD</div>
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
      id: 'quiz',
      title: 'Tech Quiz',
      description: 'Quiz interattivo su informatica e grafica con domande randomiche',
      path: '/portfolio/componenti/quiz',
      preview: (
        <div className="mini-quiz">
          <div className="mini-quiz-header">
            <div className="mini-quiz-title">QUIZ</div>
            <div className="mini-quiz-score">0/7</div>
          </div>
          <div className="mini-quiz-question"></div>
          <div className="mini-quiz-options">
            <div className="mini-quiz-option">A</div>
            <div className="mini-quiz-option">B</div>
            <div className="mini-quiz-option">C</div>
            <div className="mini-quiz-option">D</div>
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
          <div className="mini-checker-icon">🔍</div>
          <div className="mini-checker-image">
            <div className="mini-checker-lens"></div>
          </div>
        </div>
      )
    },
    {
      id: 'pattern-matcher',
      title: 'Pattern Matcher',
      description: 'Gioco di logica: trova il pattern mancante nella sequenza',
      path: '/portfolio/componenti/pattern-matcher',
      preview: (
        <div className="mini-pattern-matcher">
          <div className="mini-pattern-grid">
            <div className="mini-pattern-cell"><div className="mini-pattern-shape circle-red"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape square-blue"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape triangle-green"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape circle-red"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape square-blue"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape triangle-green"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape circle-red"></div></div>
            <div className="mini-pattern-cell"><div className="mini-pattern-shape square-blue"></div></div>
            <div className="mini-pattern-cell missing">?</div>
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
