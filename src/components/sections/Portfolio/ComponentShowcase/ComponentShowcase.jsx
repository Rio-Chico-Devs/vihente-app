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