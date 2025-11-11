import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

const Portfolio = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const categories = [
    { id: 'grafiche', title: 'GRAFICHE' },
    { id: 'sitiweb', title: 'SITI WEB' },
    { id: 'componenti', title: 'COMPONENTI' }
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (isExpanded && cardRef.current && !cardRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isExpanded]);

  const navigate = (dir) => {
    setIsExpanded(false);
    if (dir === 'prev') {
      setSelectedCategory(prev => (prev - 1 + categories.length) % categories.length);
    } else {
      setSelectedCategory(prev => (prev + 1) % categories.length);
    }
  };

  // ⭐ AGGIORNATO: Gestisce la navigazione alle pagine specifiche
  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      // Naviga alla pagina appropriata in base alla categoria selezionata
      const category = categories[selectedCategory];
      
      if (category.id === 'componenti') {
        onNavigate('portfolio-componenti');
      } else if (category.id === 'grafiche') {
        // TODO: Quando creerai la pagina grafiche
        onNavigate('portfolio-grafiche');
      } else if (category.id === 'sitiweb') {
        // TODO: Quando creerai la pagina siti web
        onNavigate('portfolio-sitiweb');
      }
    }
  };

  return (
    <div className="portfolio-page">
      
      <div className="portfolio-container">
        <button className="nav-arrow left" onClick={() => navigate('prev')} disabled={isExpanded}>
          <svg viewBox="0 0 60 100">
            <path d="M 50,10 L 10,50 L 50,90" />
          </svg>
        </button>

        <div className="carousel-scene">
          <div className={`carousel-3d rot-${selectedCategory} ${isExpanded ? 'expanded' : ''}`}>
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                ref={idx === selectedCategory ? cardRef : null}
                className={`panel p-${idx} ${idx === selectedCategory ? 'active' : ''}`}
                onClick={() => idx === selectedCategory && handleClick()}
              >
                {/* Front side with VHS effect */}
                <div className="panel-front">
                  <div className="vhs-screen">
                    <div className="vhs-noise" />
                    <div className="vhs-scanlines" />
                    
                    {/* Title overlay - above VHS effects */}
                    {idx === selectedCategory && (
                      <div className="title-overlay">
                        <h2 className="category-title">{cat.title}</h2>
                      </div>
                    )}
                  </div>
                </div>

                {/* Back side with eye logo */}
                <div className="panel-back">
                  <div className="back-logo">
                    <svg className="eye-logo" viewBox="0 0 100 100" width="120" height="120">
                      <defs>
                        <filter id="eyeGlow">
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        
                        <clipPath id="eyeContourClip">
                          <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"/>
                        </clipPath>
                      </defs>
                      
                      {/* Eye shape - outer contour */}
                      <path
                        d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                        fill="none"
                        stroke="rgba(0, 255, 255, 0.95)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#eyeGlow)"
                      />
                      
                      {/* Pupil group - clipped by eye contour */}
                      <g clipPath="url(#eyeContourClip)">
                        {/* Outer circle */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="8" 
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1"
                          filter="url(#eyeGlow)"
                        />
                        
                        {/* Inner pupil */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="3.5" 
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="0.8"
                          filter="url(#eyeGlow)"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-arrow right" onClick={() => navigate('next')} disabled={isExpanded}>
          <svg viewBox="0 0 60 100">
            <path d="M 10,10 L 50,50 L 10,90" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;