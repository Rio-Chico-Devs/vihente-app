import { useState, useEffect, useCallback } from 'react';
import './Cubo3DPage.css';

const Cubo3DPage = () => {
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
    <div className="cubo3d-page">

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
    </div>
  );
};

export default Cubo3DPage;