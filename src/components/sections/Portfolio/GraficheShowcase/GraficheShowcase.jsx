import { useRef, useState } from 'react';
import './GraficheShowcase.css';

const GraficheShowcase = () => {
  // Logo occhio path - stesso della navbar
  const eyeContourPath = "M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z";

  // State per la rotazione interattiva nel modal
  const [modalRotations, setModalRotations] = useState({});
  const dragRef = useRef({});

  // Handler per mouse drag
  const handleMouseDown = (e, trophyId) => {
    e.preventDefault();
    dragRef.current[trophyId] = {
      isDragging: true,
      startX: e.clientX,
      currentRotation: modalRotations[trophyId] || 0
    };
  };

  const handleMouseMove = (e, trophyId) => {
    const drag = dragRef.current[trophyId];
    if (!drag?.isDragging) return;

    const deltaX = e.clientX - drag.startX;
    const rotationDelta = deltaX * 0.5; // Sensibilità
    const newRotation = drag.currentRotation + rotationDelta;

    setModalRotations(prev => ({
      ...prev,
      [trophyId]: newRotation
    }));
  };

  const handleMouseUp = (trophyId) => {
    if (dragRef.current[trophyId]) {
      dragRef.current[trophyId].isDragging = false;
    }
  };

  // Touch support
  const handleTouchStart = (e, trophyId) => {
    const touch = e.touches[0];
    dragRef.current[trophyId] = {
      isDragging: true,
      startX: touch.clientX,
      currentRotation: modalRotations[trophyId] || 0
    };
  };

  const handleTouchMove = (e, trophyId) => {
    const drag = dragRef.current[trophyId];
    if (!drag?.isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - drag.startX;
    const rotationDelta = deltaX * 0.5;
    const newRotation = drag.currentRotation + rotationDelta;

    setModalRotations(prev => ({
      ...prev,
      [trophyId]: newRotation
    }));
  };

  const handleTouchEnd = (trophyId) => {
    if (dragRef.current[trophyId]) {
      dragRef.current[trophyId].isDragging = false;
    }
  };

  const trophies = [
    {
      id: 'logo-tech',
      title: 'Logo Design - Brand Identity',
      category: 'Branding',
      client: 'Tech Startup Inc.',
      year: '2024',
      software: 'Adobe Illustrator, Photoshop',
      description: 'Logo aziendale completo con guidelines per identità visiva. Sistema di branding modulare con declinazioni per digital e print.',
      tags: ['Logo', 'Branding', 'Vector', 'Identity']
    },
    {
      id: 'icon-app',
      title: 'Icon Set - Mobile App',
      category: 'UI/UX',
      client: 'FinTech App',
      year: '2024',
      software: 'Figma, Illustrator',
      description: 'Set di 120 icone personalizzate per applicazione mobile. Design system completo con varianti outline e filled.',
      tags: ['Icons', 'UI', 'Mobile', 'System']
    },
    {
      id: 'illustration-editorial',
      title: 'Illustrazione Editoriale',
      category: 'Illustration',
      client: 'Magazine Design',
      year: '2023',
      software: 'Procreate, Photoshop',
      description: 'Serie di illustrazioni per magazine mensile. Stile grafico moderno con palette limitata e composizioni dinamiche.',
      tags: ['Illustration', 'Editorial', 'Digital Art']
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity Package',
      category: 'Branding',
      client: 'Luxury Brand Co.',
      year: '2023',
      software: 'Illustrator, InDesign',
      description: 'Pacchetto completo di brand identity: logo, palette, typography, pattern, mockup. Guideline di 45 pagine.',
      tags: ['Branding', 'Identity', 'Luxury', 'Package']
    },
    {
      id: 'poster-event',
      title: 'Event Poster Design',
      category: 'Print',
      client: 'Music Festival',
      year: '2024',
      software: 'Photoshop, Illustrator',
      description: 'Poster per evento musicale. Design ad alto impatto visivo con typography sperimentale e composizione dinamica.',
      tags: ['Poster', 'Print', 'Event', 'Typography']
    },
    {
      id: 'packaging-product',
      title: 'Product Packaging',
      category: 'Packaging',
      client: 'Organic Foods',
      year: '2023',
      software: 'Illustrator, Dimension',
      description: 'Design packaging per linea di prodotti biologici. Focus su sostenibilità e appeal visivo eco-friendly.',
      tags: ['Packaging', 'Product', 'Eco', '3D']
    },
    {
      id: 'social-media',
      title: 'Social Media Graphics',
      category: 'Digital',
      client: 'E-commerce Brand',
      year: '2024',
      software: 'Canva Pro, Photoshop',
      description: 'Template per social media: Instagram, Facebook, LinkedIn. Sistema modulare per mantenere coerenza visiva.',
      tags: ['Social', 'Digital', 'Template', 'Marketing']
    },
    {
      id: 'infographic',
      title: 'Infographic Design',
      category: 'Editorial',
      client: 'Tech Report',
      year: '2023',
      software: 'Illustrator, After Effects',
      description: 'Infografica animata per report tecnologico. Data visualization con elementi interattivi e motion graphics.',
      tags: ['Infographic', 'Data', 'Motion', 'Editorial']
    },
    {
      id: 'character-design',
      title: 'Character Design',
      category: 'Illustration',
      client: 'Game Studio',
      year: '2024',
      software: 'Procreate, Illustrator',
      description: 'Character design per videogioco indie. Turnaround completo, espressioni facciali, e concept art dettagliato.',
      tags: ['Character', 'Game', 'Concept', 'Digital']
    },
    {
      id: 'web-design',
      title: 'Web Design - Landing Page',
      category: 'UI/UX',
      client: 'SaaS Startup',
      year: '2024',
      software: 'Figma, Adobe XD',
      description: 'Landing page responsive per piattaforma SaaS. Focus su conversione e user experience ottimale.',
      tags: ['Web', 'UI', 'Landing', 'Responsive']
    }
  ];

  return (
    <div className="trophy-arena">
      {/* PURE CSS STATE: Radio inputs nascosti */}
      {trophies.map((trophy, index) => (
        <input
          key={`state-${trophy.id}`}
          type="radio"
          name="trophy-state"
          id={`trophy-${trophy.id}`}
          className="trophy-state"
          defaultChecked={index === 0}
        />
      ))}

      {/* GALLERY: Immagini 2D rotanti */}
      <div className="trophy-gallery">
        <div className="gallery-stage">
          {trophies.map((trophy, index) => (
            <label
              key={trophy.id}
              htmlFor={`trophy-${trophy.id}`}
              className="trophy-container"
              style={{ '--trophy-index': index }}
            >
              <div className="trophy-scene">
                {/* Trophy 3D vero con preserve-3d */}
                <div className="trophy-3d">
                  {/* Immagine 2D rotante al posto del cubo */}
                  <div className="image-rotator">
                    {/* Front: Immagine placeholder */}
                    <div className="image-card front">
                      <div className="image-placeholder">
                        <div className="placeholder-category">{trophy.category}</div>
                      </div>
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

                        {/* Eye contour */}
                        <path
                          d={eyeContourPath}
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter={`url(#eyeGlow-${trophy.id})`}
                        />

                        {/* Pupil outer circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="8"
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1"
                          filter={`url(#eyeGlow-${trophy.id})`}
                        />

                        {/* Pupil inner circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="3.5"
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="0.8"
                          filter={`url(#eyeGlow-${trophy.id})`}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Ombra a terra al posto del piedistallo */}
                  <div className="ground-shadow" />
                </div>

                {/* Info quick preview */}
                <div className="trophy-preview">
                  <div className="preview-category">{trophy.category}</div>
                  <div className="preview-title">{trophy.title}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* MODAL: Si apre quando il radio è checked */}
      {trophies.map((trophy) => (
        <div
          key={`modal-${trophy.id}`}
          className="trophy-modal"
          data-trophy={trophy.id}
        >
          <div className="modal-backdrop" />

          <div className="modal-content">
            {/* Close button */}
            <label htmlFor={`trophy-${trophies[0].id}`} className="modal-close">
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </label>

            {/* SSBM Layout: 60% Trophy / 40% Info */}
            <div className="modal-layout">
              {/* Trophy Section - Interactive 2D */}
              <div className="modal-trophy-section">
                <div className="modal-trophy-3d">
                  {/* Immagine 2D interattiva (drag to rotate) */}
                  <div
                    className="modal-image-rotator"
                    style={{
                      transform: `rotateY(${modalRotations[trophy.id] || 0}deg)`,
                      cursor: 'grab'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, trophy.id)}
                    onMouseMove={(e) => handleMouseMove(e, trophy.id)}
                    onMouseUp={() => handleMouseUp(trophy.id)}
                    onMouseLeave={() => handleMouseUp(trophy.id)}
                    onTouchStart={(e) => handleTouchStart(e, trophy.id)}
                    onTouchMove={(e) => handleTouchMove(e, trophy.id)}
                    onTouchEnd={() => handleTouchEnd(trophy.id)}
                  >
                    {/* Front */}
                    <div className="modal-image-card front">
                      <div className="modal-placeholder">
                        <div className="modal-placeholder-text">{trophy.category}</div>
                      </div>
                    </div>

                    {/* Back: Logo */}
                    <div className="modal-image-card back">
                      <svg viewBox="0 0 100 100" className="grafiche-modal-logo-eye">
                        <defs>
                          <filter id={`eyeGlowModal-${trophy.id}`}>
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Eye contour */}
                        <path
                          d={eyeContourPath}
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter={`url(#eyeGlowModal-${trophy.id})`}
                        />

                        {/* Pupil outer circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="8"
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1.2"
                          filter={`url(#eyeGlowModal-${trophy.id})`}
                        />

                        {/* Pupil inner circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="3.5"
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1"
                          filter={`url(#eyeGlowModal-${trophy.id})`}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Ombra a terra al posto del piedistallo */}
                  <div className="modal-ground-shadow" />
                </div>

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
                    {trophy.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="corner-deco corner-tl" />
                <div className="corner-deco corner-tr" />
                <div className="corner-deco corner-bl" />
                <div className="corner-deco corner-br" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GraficheShowcase;
