import { useState, useRef, useEffect } from 'react';
import './ImageCheckerPage.css';

const ImageCheckerPage = () => {
  const [lensActive, setLensActive] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const [lensSize, setLensSize] = useState(200);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Immagine fornita (MODIFICA QUESTO PATH)
  const image = '../../../../../screenshots/VIejcO5.png';

  const ZOOM_LEVEL = 2.5;

  // Aggiorna dimensione lente in base allo schermo
  useEffect(() => {
    const updateLensSize = () => {
      if (window.innerWidth <= 480) {
        setLensSize(140);
      } else if (window.innerWidth <= 768) {
        setLensSize(160);
      } else {
        setLensSize(200);
      }
    };

    updateLensSize();
    window.addEventListener('resize', updateLensSize);

    return () => {
      window.removeEventListener('resize', updateLensSize);
    };
  }, []);

  const updateLensPosition = (clientX, clientY) => {
    if (!imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    
    // Calcola posizione relativa all'immagine
    const x = clientX - imageRect.left;
    const y = clientY - imageRect.top;

    const halfLens = lensSize / 2;
    
    // Su MOBILE (touch): nessun limite, lente libera di uscire
    // Su DESKTOP (mouse): confina dentro l'immagine
    if (isTouching) {
      // Mobile: nessun bounds, la lente segue esattamente il dito
      setLensPosition({ x, y });
    } else {
      // Desktop: confina la lente dentro l'immagine
      const boundedX = Math.max(halfLens, Math.min(x, imageRect.width - halfLens));
      const boundedY = Math.max(halfLens, Math.min(y, imageRect.height - halfLens));
      setLensPosition({ x: boundedX, y: boundedY });
    }
  };

  // Handler DESKTOP - Mouse
  const handleMouseMove = (e) => {
    if (!lensActive || isTouching) return;
    updateLensPosition(e.clientX, e.clientY);
  };

  // Handler MOBILE - Touch Start
  const handleTouchStart = (e) => {
    if (!lensActive) return;
    e.preventDefault(); // Previeni comportamenti default
    setIsTouching(true);
    const touch = e.touches[0];
    updateLensPosition(touch.clientX, touch.clientY);
  };

  // Handler MOBILE - Touch Move (drag con dito)
  const handleTouchMove = (e) => {
    if (!lensActive || !isTouching) return;
    e.preventDefault(); // Previeni scroll durante il drag
    const touch = e.touches[0];
    updateLensPosition(touch.clientX, touch.clientY);
  };

  // Handler MOBILE - Touch End
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsTouching(false);
  };

  const toggleLens = () => {
    setLensActive(!lensActive);
  };

  useEffect(() => {
    if (lensActive) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'default';
      setIsTouching(false);
    }

    return () => {
      document.body.style.cursor = 'default';
    };
  }, [lensActive]);

  return (
    <div className="image-checker-page">
      <div className="checker-container">
        <div className="checker-header">
          <h1 className="checker-title">Image Checker</h1>
          <p className="checker-subtitle">
            Attiva la lente per esplorare i dettagli dell'immagine
          </p>
        </div>

        <div className="checker-controls">
          <button
            className={`lens-toggle-btn ${lensActive ? 'active' : ''}`}
            onClick={toggleLens}
          >
            <span className="lens-icon">🔍</span>
            {lensActive ? 'Disattiva Lente' : 'Attiva Lente'}
          </button>
        </div>

        <div
          ref={containerRef}
          className={`image-container ${lensActive ? 'lens-active' : ''}`}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <img
            ref={imageRef}
            src={image}
            alt="Image to inspect"
            className="uploaded-image"
            draggable="false"
          />

          {lensActive && imageRef.current && (
            <div
              className="magnifier-lens"
              style={{
                left: `${lensPosition.x}px`,
                top: `${lensPosition.y}px`,
                width: `${lensSize}px`,
                height: `${lensSize}px`,
              }}
            >
              <div
                className="magnifier-image"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: `${imageRef.current.width * ZOOM_LEVEL}px ${imageRef.current.height * ZOOM_LEVEL}px`,
                  backgroundPosition: `${-lensPosition.x * ZOOM_LEVEL + lensSize / 2}px ${-lensPosition.y * ZOOM_LEVEL + lensSize / 2}px`,
                }}
              />
            </div>
          )}
        </div>

        <div className="checker-info">
          <div className="info-item">
            <span className="info-label">Stato Lente</span>
            <span className={`info-value ${lensActive ? 'active' : 'inactive'}`}>
              {lensActive ? 'Attiva' : 'Inattiva'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Zoom</span>
            <span className="info-value">{ZOOM_LEVEL}x</span>
          </div>
          <div className="info-item">
            <span className="info-label">Dimensione Lente</span>
            <span className="info-value">{lensSize}px</span>
          </div>
        </div>

        {lensActive && (
          <div className="lens-instructions">
            <p>Desktop: muovi il mouse - Mobile: tocca e trascina il dito</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCheckerPage;