import { useState, useEffect } from 'react';
import './TextSamplerPage.css';

const TextSamplerPage = () => {
  const [activeEffect, setActiveEffect] = useState('conjoined');
  const [morphingText, setMorphingText] = useState('SAMPLE');

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
    <div className="text-sampler-page">

      <div className="text-sampler-container">
        <div className="sampler-layout">
          <div className="text-display">
            {renderTextEffect()}
          </div>

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
    </div>
  );
};

export default TextSamplerPage;