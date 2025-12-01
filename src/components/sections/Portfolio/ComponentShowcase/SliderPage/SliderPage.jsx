import { useState, useEffect, useRef } from 'react';
import './SliderPage.css';

const SliderPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const panelRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const lastTapTime = useRef(0);
  const lastTapIndex = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && panelRefs.current[selectedIndex] && !isDragging.current) {
      setTimeout(() => {
        panelRefs.current[selectedIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 100);
    }
  }, [selectedIndex, isMobile]);

  const images = [
    { id: 1, url: 'https://picsum.photos/800/1200?random=1', caption: 'Paesaggio montano al tramonto', description: 'Una vista mozzafiato delle montagne illuminate dai raggi dorati del tramonto, creando un contrasto perfetto tra luci e ombre.' },
    { id: 2, url: 'https://picsum.photos/800/1200?random=2', caption: 'Architettura moderna minimalista', description: 'Linee pulite e forme geometriche definiscono questa struttura architettonica contemporanea, simbolo di innovazione e design.' },
    { id: 3, url: 'https://picsum.photos/800/1200?random=3', caption: 'Natura selvaggia e incontaminata', description: 'La bellezza pura della natura incontaminata, dove la flora e la fauna convivono in perfetta armonia.' },
    { id: 4, url: 'https://picsum.photos/800/1200?random=4', caption: 'Design urbano contemporaneo', description: 'Il paesaggio urbano moderno si fonde con elementi di design innovativi, creando spazi vivibili e funzionali.' },
    { id: 5, url: 'https://picsum.photos/800/1200?random=5', caption: 'Vita marina e oceano', description: 'Le profondità oceaniche rivelano un mondo sommerso ricco di vita, colori e mistero.' },
    { id: 6, url: 'https://picsum.photos/800/1200?random=6', caption: 'Arte digitale astratta', description: 'Una composizione astratta che sfida la percezione, mescolando forme, colori e texture in modo armonico.' },
    { id: 7, url: 'https://picsum.photos/800/1200?random=7', caption: 'Ritratto emozionale', description: 'Uno sguardo intenso che cattura l\'essenza dell\'emozione umana, raccontando storie senza parole.' },
    { id: 8, url: 'https://picsum.photos/800/1200?random=8', caption: 'Geometrie e simmetrie', description: 'Pattern geometrici perfetti che si ripetono creando un effetto ipnotico di simmetria e equilibrio.' }
  ];

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    scrollLeft.current = containerRef.current.scrollLeft;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const deltaX = touchStartX.current - touch.clientX;
    const deltaY = Math.abs(touchStartY.current - touch.clientY);
    
    // Se il movimento orizzontale è significativo e maggiore del verticale
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
      isDragging.current = true;
      containerRef.current.scrollLeft = scrollLeft.current + deltaX;
      e.preventDefault();
    }
  };

  const handleTouchEnd = (index) => {
    if (!isMobile) return;
    
    if (!isDragging.current) {
      // È un tap, non un drag
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime.current;
      
      // Double tap detection (entro 300ms sullo stesso elemento)
      if (tapLength < 300 && tapLength > 0 && lastTapIndex.current === index) {
        // Double tap - apri lightbox
        openLightbox(images[index]);
        lastTapTime.current = 0;
        lastTapIndex.current = null;
      } else {
        // Single tap - seleziona immagine
        setSelectedIndex(index);
        lastTapTime.current = currentTime;
        lastTapIndex.current = index;
      }
    }
    
    isDragging.current = false;
  };

  const handleImageClick = (index) => {
    if (!isMobile) {
      setSelectedIndex(index);
    }
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="expanding-gallery">
      <h2 className="expanding-title">Expanding Gallery</h2>
      
      <div 
        className="expanding-container"
        ref={containerRef}
        onTouchMove={handleTouchMove}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={el => panelRefs.current[index] = el}
            className={`expanding-panel ${selectedIndex === index ? 'active' : ''}`}
            onMouseEnter={!isMobile ? () => setHoveredIndex(index) : undefined}
            onMouseLeave={!isMobile ? () => setHoveredIndex(null) : undefined}
            onClick={() => handleImageClick(index)}
            onTouchStart={handleTouchStart}
            onTouchEnd={() => handleTouchEnd(index)}
          >
            <img 
              src={image.url} 
              alt={image.caption}
              className={hoveredIndex === index && selectedIndex !== index ? 'colored' : ''}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="image-description">
        <h3 className="description-title">{images[selectedIndex].caption}</h3>
        <p className="description-text">{images[selectedIndex].description}</p>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.caption}
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderPage;
