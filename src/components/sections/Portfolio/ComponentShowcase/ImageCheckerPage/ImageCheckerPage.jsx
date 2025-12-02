import { useState, useRef, useEffect } from 'react';
import './ImageCheckerPage.css';

const ImageCheckerPage = () => {
  const [image, setImage] = useState(null);
  const [lensActive, setLensActive] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const LENS_SIZE = 200; // Dimensione della lente in pixel
  const ZOOM_LEVEL = 2.5; // Livello di ingrandimento

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setLensActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e) => {
    if (!lensActive || !imageRef.current || !containerRef.current) return;

    const image = imageRef.current.getBoundingClientRect();

    // Calcola la posizione del mouse relativa all'immagine
    const x = e.clientX - image.left;
    const y = e.clientY - image.top;

    // Assicurati che la lente rimanga all'interno dei confini dell'immagine
    const halfLens = LENS_SIZE / 2;
    const boundedX = Math.max(halfLens, Math.min(x, image.width - halfLens));
    const boundedY = Math.max(halfLens, Math.min(y, image.height - halfLens));

    setLensPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseLeave = () => {
    // La lente scompare quando il mouse esce dall'immagine
  };

  const toggleLens = () => {
    setLensActive(!lensActive);
  };

  const resetImage = () => {
    setImage(null);
    setLensActive(false);
  };

  useEffect(() => {
    if (lensActive) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'default';
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
            Carica un'immagine e attiva la lente per esplorare i dettagli
          </p>
        </div>

        {!image ? (
          <div className="upload-zone">
            <label htmlFor="image-upload" className="upload-label">
              <div className="upload-icon">📷</div>
              <div className="upload-text">
                <span className="upload-main-text">Clicca per caricare un'immagine</span>
                <span className="upload-sub-text">Supporta JPG, PNG, GIF, WebP</span>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
              />
            </label>
          </div>
        ) : (
          <>
            <div className="checker-controls">
              <button
                className={`lens-toggle-btn ${lensActive ? 'active' : ''}`}
                onClick={toggleLens}
              >
                <span className="lens-icon">🔍</span>
                {lensActive ? 'Disattiva Lente' : 'Attiva Lente'}
              </button>
              <button className="reset-btn" onClick={resetImage}>
                Cambia Immagine
              </button>
            </div>

            <div
              ref={containerRef}
              className={`image-container ${lensActive ? 'lens-active' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={image}
                alt="Uploaded"
                className="uploaded-image"
                draggable="false"
              />

              {lensActive && (
                <div
                  className="magnifier-lens"
                  style={{
                    left: `${lensPosition.x}px`,
                    top: `${lensPosition.y}px`,
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                  }}
                >
                  <div
                    className="magnifier-image"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: `${
                        imageRef.current ? imageRef.current.width * ZOOM_LEVEL : 0
                      }px ${
                        imageRef.current ? imageRef.current.height * ZOOM_LEVEL : 0
                      }px`,
                      backgroundPosition: `${-lensPosition.x * ZOOM_LEVEL + LENS_SIZE / 2}px ${
                        -lensPosition.y * ZOOM_LEVEL + LENS_SIZE / 2
                      }px`,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="checker-info">
              <div className="info-item">
                <span className="info-label">Stato Lente:</span>
                <span className={`info-value ${lensActive ? 'active' : 'inactive'}`}>
                  {lensActive ? 'Attiva' : 'Inattiva'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Zoom:</span>
                <span className="info-value">{ZOOM_LEVEL}x</span>
              </div>
              <div className="info-item">
                <span className="info-label">Dimensione Lente:</span>
                <span className="info-value">{LENS_SIZE}px</span>
              </div>
            </div>

            {lensActive && (
              <div className="lens-instructions">
                <p>💡 Muovi il mouse sull'immagine per esplorare i dettagli</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCheckerPage;
