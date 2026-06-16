import { useRef, useState, useCallback } from 'react';
import './GraficheShowcase.css';
import { useGuide } from '../../../../contexts/GuideContext';

/* ------------------------------------------------------------------
   Limiti zoom/pan per il viewer del modal.
   - scale: 1 = dimensione naturale (gia' fittata con max-width/height)
   - wheel: deltaY positivo (scroll giu') => zoom out; deltaY negativo => zoom in
------------------------------------------------------------------ */
const DEFAULT_VIEW = { scale: 1, x: 0, y: 0 };
const MIN_SCALE = 0.5;
const MAX_SCALE = 6;
const WHEEL_SENSITIVITY = 0.0015;
const BUTTON_STEP = 0.25;

const clampScale = (s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

const GraficheShowcase = () => {
  // Logo occhio path - stesso della navbar (back card della gallery)
  const eyeContourPath = "M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z";

  const { setGuide, clearGuide } = useGuide();

  // Stato di vista (zoom + pan) per ciascun trofeo, indipendente.
  const [imageViews, setImageViews] = useState({});
  // Trofei la cui immagine ha fallito il caricamento -> fallback al placeholder.
  const [imageErrors, setImageErrors] = useState({});

  const panRef = useRef({});

  const getView = (id) => imageViews[id] || DEFAULT_VIEW;

  const setView = useCallback((id, updater) => {
    setImageViews((prev) => {
      const current = prev[id] || DEFAULT_VIEW;
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [id]: next };
    });
  }, []);

  /* ------------------------------------------------------------------
     ZOOM (rotella mouse + pulsanti)
  ------------------------------------------------------------------ */
  const handleWheel = useCallback((e, id) => {
    e.preventDefault();
    setView(id, (current) => ({
      ...current,
      scale: clampScale(current.scale - e.deltaY * WHEEL_SENSITIVITY),
    }));
  }, [setView]);

  const handleZoomButton = (id, delta) => {
    setView(id, (current) => ({
      ...current,
      scale: clampScale(current.scale + delta),
    }));
  };

  const handleReset = (id) => setView(id, DEFAULT_VIEW);

  /* ------------------------------------------------------------------
     PAN (click + drag, touch + drag)
  ------------------------------------------------------------------ */
  const handlePanStart = useCallback((e, id) => {
    const isTouch = e.touches !== undefined;
    const point = isTouch ? e.touches[0] : e;
    const current = imageViews[id] || DEFAULT_VIEW;
    panRef.current[id] = {
      isDragging: true,
      startX: point.clientX,
      startY: point.clientY,
      initialX: current.x,
      initialY: current.y,
    };
  }, [imageViews]);

  const handlePanMove = useCallback((e, id) => {
    const pan = panRef.current[id];
    if (!pan?.isDragging) return;
    const isTouch = e.touches !== undefined;
    const point = isTouch ? e.touches[0] : e;
    setView(id, (current) => ({
      ...current,
      x: pan.initialX + (point.clientX - pan.startX),
      y: pan.initialY + (point.clientY - pan.startY),
    }));
  }, [setView]);

  const handlePanEnd = useCallback((id) => {
    if (panRef.current[id]) panRef.current[id].isDragging = false;
  }, []);

  const handleImageError = (id) =>
    setImageErrors((prev) => ({ ...prev, [id]: true }));

  /* ------------------------------------------------------------------
     Dati dei trofei.
     Per attivare la singola immagine, basta che il file esista in
     /public/images/ con il path indicato. Se manca, onError fa
     fallback al placeholder testuale.
  ------------------------------------------------------------------ */
  const trophies = [
    {
      id: 'logo-tech',
      image: '/images/grafiche-logo-tech.webp',
      title: 'Logo Design - Brand Identity',
      category: 'Branding',
      client: 'Tech Startup Inc.',
      year: '2024',
      software: 'Adobe Illustrator, Photoshop',
      description: 'Logo aziendale completo con guidelines per identità visiva. Sistema di branding modulare con declinazioni per digital e print.',
      tags: ['Logo', 'Branding', 'Vector', 'Identity'],
    },
    {
      id: 'icon-app',
      image: '/images/grafiche-icon-app.webp',
      title: 'Icon Set - Mobile App',
      category: 'UI/UX',
      client: 'FinTech App',
      year: '2024',
      software: 'Figma, Illustrator',
      description: 'Set di 120 icone personalizzate per applicazione mobile. Design system completo con varianti outline e filled.',
      tags: ['Icons', 'UI', 'Mobile', 'System'],
    },
    {
      id: 'illustration-editorial',
      image: '/images/grafiche-illustration-editorial.webp',
      title: 'Illustrazione Editoriale',
      category: 'Illustration',
      client: 'Magazine Design',
      year: '2023',
      software: 'Procreate, Photoshop',
      description: 'Serie di illustrazioni per magazine mensile. Stile grafico moderno con palette limitata e composizioni dinamiche.',
      tags: ['Illustration', 'Editorial', 'Digital Art'],
    },
    {
      id: 'brand-identity',
      image: '/images/grafiche-brand-identity.webp',
      title: 'Brand Identity Package',
      category: 'Branding',
      client: 'Luxury Brand Co.',
      year: '2023',
      software: 'Illustrator, InDesign',
      description: 'Pacchetto completo di brand identity: logo, palette, typography, pattern, mockup. Guideline di 45 pagine.',
      tags: ['Branding', 'Identity', 'Luxury', 'Package'],
    },
    {
      id: 'poster-event',
      image: '/images/grafiche-poster-event.webp',
      title: 'Event Poster Design',
      category: 'Print',
      client: 'Music Festival',
      year: '2024',
      software: 'Photoshop, Illustrator',
      description: 'Poster per evento musicale. Design ad alto impatto visivo con typography sperimentale e composizione dinamica.',
      tags: ['Poster', 'Print', 'Event', 'Typography'],
    },
    {
      id: 'packaging-product',
      image: '/images/grafiche-packaging-product.webp',
      title: 'Product Packaging',
      category: 'Packaging',
      client: 'Organic Foods',
      year: '2023',
      software: 'Illustrator, Dimension',
      description: 'Design packaging per linea di prodotti biologici. Focus su sostenibilità e appeal visivo eco-friendly.',
      tags: ['Packaging', 'Product', 'Eco', '3D'],
    },
    {
      id: 'social-media',
      image: '/images/grafiche-social-media.webp',
      title: 'Social Media Graphics',
      category: 'Digital',
      client: 'E-commerce Brand',
      year: '2024',
      software: 'Canva Pro, Photoshop',
      description: 'Template per social media: Instagram, Facebook, LinkedIn. Sistema modulare per mantenere coerenza visiva.',
      tags: ['Social', 'Digital', 'Template', 'Marketing'],
    },
    {
      id: 'infographic',
      image: '/images/grafiche-infographic.webp',
      title: 'Infographic Design',
      category: 'Editorial',
      client: 'Tech Report',
      year: '2023',
      software: 'Illustrator, After Effects',
      description: 'Infografica animata per report tecnologico. Data visualization con elementi interattivi e motion graphics.',
      tags: ['Infographic', 'Data', 'Motion', 'Editorial'],
    },
    {
      id: 'character-design',
      image: '/images/grafiche-character-design.webp',
      title: 'Character Design',
      category: 'Illustration',
      client: 'Game Studio',
      year: '2024',
      software: 'Procreate, Illustrator',
      description: 'Character design per videogioco indie. Turnaround completo, espressioni facciali, e concept art dettagliato.',
      tags: ['Character', 'Game', 'Concept', 'Digital'],
    },
    {
      id: 'web-design',
      image: '/images/grafiche-web-design.webp',
      title: 'Web Design - Landing Page',
      category: 'UI/UX',
      client: 'SaaS Startup',
      year: '2024',
      software: 'Figma, Adobe XD',
      description: 'Landing page responsive per piattaforma SaaS. Focus su conversione e user experience ottimale.',
      tags: ['Web', 'UI', 'Landing', 'Responsive'],
    },
  ];

  return (
    <div className="trophy-arena">
      {/* PURE CSS STATE: Radio inputs nascosti + dummy per reset */}
      <input
        type="radio"
        name="trophy-state"
        id="trophy-none"
        className="trophy-state"
        defaultChecked={true}
        style={{ display: 'none' }}
      />
      {trophies.map((trophy) => (
        <input
          key={`state-${trophy.id}`}
          type="radio"
          name="trophy-state"
          id={`trophy-${trophy.id}`}
          className="trophy-state"
        />
      ))}

      {/* GALLERY: Card rotanti con immagine in dimensione nativa (cap 200px) */}
      <div className="trophy-gallery">
        <div className="gallery-stage">
          {trophies.map((trophy, index) => {
            const hasImage = trophy.image && !imageErrors[trophy.id];
            return (
              <label
                key={trophy.id}
                htmlFor={`trophy-${trophy.id}`}
                className="trophy-container"
                style={{ '--trophy-index': index }}
                onMouseEnter={() => setGuide('Trascina per ruotare, clicca per aprire i dettagli del progetto.')}
                onMouseLeave={clearGuide}
              >
                <div className="trophy-scene">
                  <div className="trophy-3d">
                    <div className="image-rotator">
                      {/* Front: immagine vera (o placeholder se manca) */}
                      <div className="image-card front">
                        {hasImage ? (
                          <img
                            src={trophy.image}
                            alt={trophy.title}
                            className="trophy-img"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onError={() => handleImageError(trophy.id)}
                          />
                        ) : (
                          <div className="image-placeholder">
                            <div className="placeholder-category">{trophy.category}</div>
                          </div>
                        )}
                      </div>

                      {/* Back: Logo occhio */}
                      <div className="image-card back">
                        <svg viewBox="0 0 100 100" className="grafiche-logo-eye">
                          <defs>
                            <filter id={`eyeGlow-${trophy.id}`}>
                              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <path
                            d={eyeContourPath}
                            fill="none"
                            stroke="rgba(0, 255, 255, 0.95)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter={`url(#eyeGlow-${trophy.id})`}
                          />
                          <circle cx="50" cy="50" r="8" fill="none"
                            stroke="rgba(0, 255, 255, 0.95)" strokeWidth="1"
                            filter={`url(#eyeGlow-${trophy.id})`} />
                          <circle cx="50" cy="50" r="3.5" fill="none"
                            stroke="rgba(0, 255, 255, 0.95)" strokeWidth="0.8"
                            filter={`url(#eyeGlow-${trophy.id})`} />
                        </svg>
                      </div>
                    </div>

                    <div className="ground-shadow" />
                  </div>

                  <div className="trophy-preview">
                    <div className="preview-category">{trophy.category}</div>
                    <div className="preview-title">{trophy.title}</div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* MODAL: si adatta all'immagine; zoom + pan per ispezionarla */}
      {trophies.map((trophy) => {
        const view = getView(trophy.id);
        const hasImage = trophy.image && !imageErrors[trophy.id];
        return (
          <div
            key={`modal-${trophy.id}`}
            className="trophy-modal"
            data-trophy={trophy.id}
          >
            <div className="modal-backdrop" />

            <div className="modal-content">
              {/* Close button */}
              <label htmlFor="trophy-none" className="modal-close" aria-label="Chiudi">
                <svg viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </label>

              <div className="modal-layout">
                {/* Trophy Section: viewer immagine con zoom+pan */}
                <div className="modal-trophy-section">
                  <div
                    className={`modal-image-viewer${hasImage ? '' : ' is-empty'}`}
                    onWheel={hasImage ? (e) => handleWheel(e, trophy.id) : undefined}
                    onMouseDown={hasImage ? (e) => handlePanStart(e, trophy.id) : undefined}
                    onMouseMove={hasImage ? (e) => handlePanMove(e, trophy.id) : undefined}
                    onMouseUp={() => handlePanEnd(trophy.id)}
                    onMouseLeave={() => { handlePanEnd(trophy.id); clearGuide(); }}
                    onTouchStart={hasImage ? (e) => handlePanStart(e, trophy.id) : undefined}
                    onTouchMove={hasImage ? (e) => handlePanMove(e, trophy.id) : undefined}
                    onTouchEnd={() => handlePanEnd(trophy.id)}
                    onDoubleClick={() => handleReset(trophy.id)}
                    onMouseEnter={() => hasImage && setGuide('Trascina per spostare, rotella per ingrandire. Doppio click per resettare.')}
                  >
                    {hasImage ? (
                      <img
                        src={trophy.image}
                        alt={trophy.title}
                        className="modal-image"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onError={() => handleImageError(trophy.id)}
                        style={{
                          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                        }}
                      />
                    ) : (
                      <div className="modal-placeholder">
                        <div className="modal-placeholder-text">{trophy.category}</div>
                      </div>
                    )}
                  </div>

                  {hasImage && (
                    <div className="modal-image-toolbar" role="toolbar" aria-label="Controlli immagine">
                      <button
                        type="button"
                        className="modal-toolbar-btn"
                        onClick={() => handleZoomButton(trophy.id, -BUTTON_STEP)}
                        disabled={view.scale <= MIN_SCALE}
                        aria-label="Riduci zoom"
                        title="Riduci zoom"
                      >−</button>
                      <span className="modal-toolbar-zoom" aria-live="polite">
                        {Math.round(view.scale * 100)}%
                      </span>
                      <button
                        type="button"
                        className="modal-toolbar-btn"
                        onClick={() => handleZoomButton(trophy.id, BUTTON_STEP)}
                        disabled={view.scale >= MAX_SCALE}
                        aria-label="Aumenta zoom"
                        title="Aumenta zoom"
                      >+</button>
                      <button
                        type="button"
                        className="modal-toolbar-btn modal-toolbar-btn--reset"
                        onClick={() => handleReset(trophy.id)}
                        aria-label="Reset zoom e posizione"
                        title="Reset"
                      >RESET</button>
                    </div>
                  )}

                  {/* Particles ambient */}
                  <div className="ambient-particles">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="particle" style={{ '--particle-index': i }} />
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="modal-info-section">
                  <div className="info-header">
                    <div className="info-category">
                      <span className="category-badge">{trophy.category}</span>
                      <span className="info-year">{trophy.year}</span>
                    </div>
                    <h2 className="info-title">{trophy.title}</h2>
                  </div>

                  <div className="info-body">
                    <div className="info-row">
                      <span className="info-label">Cliente</span>
                      <span className="info-value">{trophy.client}</span>
                    </div>

                    <div className="info-row">
                      <span className="info-label">Software</span>
                      <span className="info-value">{trophy.software}</span>
                    </div>

                    <div className="info-description">
                      <span className="info-label">Descrizione</span>
                      <p>{trophy.description}</p>
                    </div>

                    <div className="info-tags">
                      {trophy.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GraficheShowcase;
