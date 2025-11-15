import { useState, useEffect, useCallback } from 'react';

// TextAnimationSampler Component - Clean Version
const TextAnimationSampler = () => {
  const [activeEffect, setActiveEffect] = useState('conjoined');
  const [morphingText, setMorphingText] = useState('SAMPLE');

  // Morphing effect logic
  useEffect(() => {
    if (activeEffect === 'morphing') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
      const targetText = 'SAMPLE';
      let animationId;
      
      const morphText = () => {
        let iterations = 0;
        
        const animate = () => {
          let result = '';
          
          for (let i = 0; i < targetText.length; i++) {
            if (iterations > i * 3) {
              result += targetText[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          
          setMorphingText(result);
          iterations += 0.5;
          
          if (iterations < targetText.length * 3 + 10) {
            animationId = requestAnimationFrame(animate);
          } else {
            setTimeout(() => {
              setMorphingText('SAMPLE');
              setTimeout(morphText, 2000);
            }, 500);
          }
        };
        
        animate();
      };
      
      morphText();
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [activeEffect]);

  const effects = [
    { id: 'conjoined', name: 'Conjoined', description: 'Testo che si unisce dai lati' },
    { id: 'folded', name: 'Folded', description: 'Effetto piegatura come un libro' },
    { id: 'reflection', name: 'Reflection', description: 'Riflesso avanzato con blur' },
    { id: 'cube3d', name: 'Cube 3D', description: 'Cubo tridimensionale rotante' },
    { id: 'morphing', name: 'Morphing', description: 'Counter veloce che diventa SAMPLE' }
  ];

  const renderTextEffect = () => {
    switch (activeEffect) {
      case 'conjoined':
        return (
          <div className="text-effect-conjoined">
            <span className="text-left">SAM</span>
            <span className="text-right">PLE</span>
          </div>
        );
      
      case 'folded':
        return (
          <div className="text-effect-folded">
            <h1 className="folded-text" data-text="SAMPLE">SAMPLE</h1>
          </div>
        );
      
      case 'reflection':
        return (
          <div className="text-effect-reflection">
            <span className="reflection-text" data-text="SAMPLE">SAMPLE</span>
          </div>
        );
      
      case 'cube3d':
        return (
          <div className="text-effect-cube3d">
            <div className="cube-container">
              <div className="cube-face front">SAMPLE</div>
              <div className="cube-face back">SAMPLE</div>
              <div className="cube-face left">SAMPLE</div>
              <div className="cube-face right">SAMPLE</div>
              <div className="cube-face top">SAMPLE</div>
              <div className="cube-face bottom">SAMPLE</div>
            </div>
          </div>
        );
      
      case 'morphing':
        return (
          <div className="text-effect-morphing">
            <span className="morphing-text">{morphingText}</span>
          </div>
        );
      
      default:
        return <div className="text-default">SAMPLE</div>;
    }
  };

  return (
    <div className="text-sampler-container">
      <div className="sampler-layout">
        {/* Display Area */}
        <div className="text-display">
          {renderTextEffect()}
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h3 className="panel-title">Text Effects</h3>
          
          <div className="effects-list">
            {effects.map(effect => (
              <button 
                key={effect.id}
                className={`effect-button ${activeEffect === effect.id ? 'active' : ''}`}
                onClick={() => setActiveEffect(effect.id)}
              >
                <div className="effect-name">{effect.name}</div>
                <div className="effect-description">{effect.description}</div>
              </button>
            ))}
          </div>
          
          <div className="panel-footer">
            <div className="info-line">
              <span className="label">Current Effect:</span>
              <span className="value">{effects.find(e => e.id === activeEffect)?.name}</span>
            </div>
            <div className="info-line">
              <span className="label">Status:</span>
              <span className="value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Image Slider Component
const ImageSlider = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Infinite Image Slider</h2>
      <p className="slider-instruction">Click play/pause per controllare lo slider</p>
      
      <div className={`slider-wrapper ${isPlaying ? 'playing' : 'paused'}`}>
        <div className="slider-line slider-line-1">
          <img src="https://picsum.photos/300/200?random=1" alt="Slide 1" />
          <img src="https://picsum.photos/300/200?random=2" alt="Slide 2" />
          <img src="https://picsum.photos/300/200?random=3" alt="Slide 3" />
          <img src="https://picsum.photos/300/200?random=4" alt="Slide 4" />
          <img src="https://picsum.photos/300/200?random=5" alt="Slide 5" />
          <img src="https://picsum.photos/300/200?random=6" alt="Slide 6" />
          <img src="https://picsum.photos/300/200?random=1" alt="Slide 1 Duplicate" />
          <img src="https://picsum.photos/300/200?random=2" alt="Slide 2 Duplicate" />
          <img src="https://picsum.photos/300/200?random=3" alt="Slide 3 Duplicate" />
          <img src="https://picsum.photos/300/200?random=4" alt="Slide 4 Duplicate" />
          <img src="https://picsum.photos/300/200?random=5" alt="Slide 5 Duplicate" />
          <img src="https://picsum.photos/300/200?random=6" alt="Slide 6 Duplicate" />
        </div>
        <div className="slider-line slider-line-2">
          <img src="https://picsum.photos/300/200?random=7" alt="Slide 7" />
          <img src="https://picsum.photos/300/200?random=8" alt="Slide 8" />
          <img src="https://picsum.photos/300/200?random=9" alt="Slide 9" />
          <img src="https://picsum.photos/300/200?random=10" alt="Slide 10" />
          <img src="https://picsum.photos/300/200?random=11" alt="Slide 11" />
          <img src="https://picsum.photos/300/200?random=12" alt="Slide 12" />
          <img src="https://picsum.photos/300/200?random=7" alt="Slide 7 Duplicate" />
          <img src="https://picsum.photos/300/200?random=8" alt="Slide 8 Duplicate" />
          <img src="https://picsum.photos/300/200?random=9" alt="Slide 9 Duplicate" />
          <img src="https://picsum.photos/300/200?random=10" alt="Slide 10 Duplicate" />
          <img src="https://picsum.photos/300/200?random=11" alt="Slide 11 Duplicate" />
          <img src="https://picsum.photos/300/200?random=12" alt="Slide 12 Duplicate" />
        </div>
        <div className="slider-line slider-line-3">
          <img src="https://picsum.photos/300/200?random=13" alt="Slide 13" />
          <img src="https://picsum.photos/300/200?random=14" alt="Slide 14" />
          <img src="https://picsum.photos/300/200?random=15" alt="Slide 15" />
          <img src="https://picsum.photos/300/200?random=16" alt="Slide 16" />
          <img src="https://picsum.photos/300/200?random=17" alt="Slide 17" />
          <img src="https://picsum.photos/300/200?random=18" alt="Slide 18" />
          <img src="https://picsum.photos/300/200?random=13" alt="Slide 13 Duplicate" />
          <img src="https://picsum.photos/300/200?random=14" alt="Slide 14 Duplicate" />
          <img src="https://picsum.photos/300/200?random=15" alt="Slide 15 Duplicate" />
          <img src="https://picsum.photos/300/200?random=16" alt="Slide 16 Duplicate" />
          <img src="https://picsum.photos/300/200?random=17" alt="Slide 17 Duplicate" />
          <img src="https://picsum.photos/300/200?random=18" alt="Slide 18 Duplicate" />
        </div>
      </div>

      <button className="play-pause-btn" onClick={togglePlay}>
        <div className={`play-icon ${isPlaying ? 'hidden' : ''}`}>▶</div>
        <div className={`pause-icon ${isPlaying ? '' : 'hidden'}`}>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

// 3D Model Component
const Model3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setVelocity({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setVelocity({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setVelocity({ x: deltaX * 0.8, y: deltaY * 0.8 });
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.8)),
      y: (prev.y + deltaX * 0.8) % 360
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  }, [isDragging, startPos.x, startPos.y]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    
    setVelocity({ x: deltaX * 0.8, y: deltaY * 0.8 });
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.8)),
      y: (prev.y + deltaX * 0.8) % 360
    }));
    
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, [isDragging, startPos.x, startPos.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      const momentum = () => {
        setVelocity(prev => ({
          x: prev.x * 0.95,
          y: prev.y * 0.95
        }));
        
        setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x + velocity.y * 0.1)),
          y: (prev.y + velocity.x * 0.1) % 360
        }));
        
        if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
          requestAnimationFrame(momentum);
        }
      };
      
      if (Math.abs(velocity.x) > 1 || Math.abs(velocity.y) > 1) {
        requestAnimationFrame(momentum);
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, velocity, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="model3d-container">
      <h2 className="model3d-title">3D Interactive Model</h2>
      <p className="model3d-instruction">Trascina per ruotare • Touch e scorri su mobile</p>
      
      <div 
        className="model3d-viewport"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="model3d-scene"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <div className="cube-3d">
            <div className="cube-face front">
              <div className="face-content">FRONT</div>
            </div>
            <div className="cube-face back">
              <div className="face-content">BACK</div>
            </div>
            <div className="cube-face left">
              <div className="face-content">LEFT</div>
            </div>
            <div className="cube-face right">
              <div className="face-content">RIGHT</div>
            </div>
            <div className="cube-face top">
              <div className="face-content">TOP</div>
            </div>
            <div className="cube-face bottom">
              <div className="face-content">BOTTOM</div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="model3d-hint">X: {Math.round(rotation.x)}° • Y: {Math.round(rotation.y)}°</p>
    </div>
  );
};

// Main Component Showcase
const ComponentShowcase = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (activeComponent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeComponent]);

  const closeComponent = () => {
    setActiveComponent(null);
  };

  return (
    <div className="component-showcase">
      {/* Preview Grid */}
      {!activeComponent && (
        <div className="preview-grid">
          <h1 className="showcase-title">Component Showcase</h1>
          <p className="showcase-subtitle">Click su una preview per espandere il componente</p>
          
          <div className="previews-container">
            {/* Preview 1: Image Slider */}
            <div 
              className="preview-card preview-scroll"
              onClick={() => setActiveComponent('slider')}
            >
              <div className="preview-content">
                <div className="mini-scroll">
                  <div className="scroll-track">
                    <div className="scroll-item">IMG</div>
                    <div className="scroll-item">IMG</div>
                    <div className="scroll-item">IMG</div>
                  </div>
                </div>
                <h3 className="preview-title">Image Slider</h3>
                <p className="preview-description">Slider infinito con controlli</p>
              </div>
            </div>

            {/* Preview 2: Text Animation Sampler */}
            <div 
              className="preview-card preview-text-sampler"
              onClick={() => setActiveComponent('textSampler')}
            >
              <div className="preview-content">
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
                <h3 className="preview-title">Text Sampler</h3>
                <p className="preview-description">Effetti di testo avanzati</p>
              </div>
            </div>

            {/* Preview 3: 3D Model */}
            <div 
              className="preview-card preview-3d"
              onClick={() => setActiveComponent('model3d')}
            >
              <div className="preview-content">
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
                <h3 className="preview-title">3D Model</h3>
                <p className="preview-description">Cubo 3D interattivo</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Component: Image Slider */}
      {activeComponent === 'slider' && (
        <div className="full-component">
          <button className="close-btn" onClick={closeComponent}>✕</button>
          <ImageSlider />
        </div>
      )}

      {/* Full Component: Text Animation Sampler */}
      {activeComponent === 'textSampler' && (
        <div className="full-component">
          <button className="close-btn" onClick={closeComponent}>✕</button>
          <TextAnimationSampler />
        </div>
      )}

      {/* Full Component: 3D Model */}
      {activeComponent === 'model3d' && (
        <div className="full-component">
          <button className="close-btn" onClick={closeComponent}>✕</button>
          <Model3D />
        </div>
      )}
    </div>
  );
};

export default ComponentShowcase;