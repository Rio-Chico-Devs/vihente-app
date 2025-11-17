import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
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

  const navigateCarousel = (dir) => {
    setIsExpanded(false);
    if (dir === 'prev') {
      setSelectedCategory(prev => prev - 1);
    } else {
      setSelectedCategory(prev => prev + 1);
    }
  };

  const handleClick = () => {
    if (!isExpanded) {
      // Primo click: solo ingrandimento
      setIsExpanded(true);
    } else {
      // Secondo click: naviga alla pagina
      const normalizedIndex = ((selectedCategory % categories.length) + categories.length) % categories.length;
      const category = categories[normalizedIndex];
      
      if (category.id === 'componenti') {
        navigate('/portfolio-componenti');
      } else if (category.id === 'grafiche') {
        navigate('/portfolio-grafiche');
      } else if (category.id === 'sitiweb') {
        navigate('/portfolio-sitiweb');
      }
    }
  };

  const normalizedIndex = ((selectedCategory % categories.length) + categories.length) % categories.length;

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <button className="nav-arrow left" onClick={() => navigateCarousel('prev')}>
          <svg viewBox="0 0 60 100">
            <path d="M 50,10 L 10,50 L 50,90" />
          </svg>
        </button>

        <div className="carousel-scene">
          <div className="carousel-3d" style={{ transform: `rotateY(${-selectedCategory * 120}deg)` }}>
            {categories.map((cat, idx) => {
              const isActive = idx === normalizedIndex;
              
              return (
                <div
                  key={cat.id}
                  ref={isActive ? cardRef : null}
                  className={`card-deck p-${idx} ${isActive ? 'active' : ''} ${isActive && isExpanded ? 'clicked' : ''}`}
                  onClick={() => isActive && handleClick()}
                >
                  <div className="card-3d">
                    {/* FRONT FACE */}
                    <div className="front face">
                      <div className="front-image"></div>
                      <div className="front-title">
                        <h2>{cat.title}</h2>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="back face">
                      <svg className="eye-logo" viewBox="0 0 100 100" width="200" height="200">
                        <defs>
                          <filter id={`eyeGlow-${idx}`}>
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          
                          <clipPath id={`eyeContourClip-${idx}`}>
                            <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"/>
                          </clipPath>
                        </defs>
                        
                        <path
                          d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                          fill="none"
                          stroke="rgba(0, 255, 255, 0.95)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter={`url(#eyeGlow-${idx})`}
                        />
                        
                        <g clipPath={`url(#eyeContourClip-${idx})`}>
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="8" 
                            fill="none"
                            stroke="rgba(0, 255, 255, 0.95)"
                            strokeWidth="1"
                            filter={`url(#eyeGlow-${idx})`}
                          />
                          
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="3.5" 
                            fill="none"
                            stroke="rgba(0, 255, 255, 0.95)"
                            strokeWidth="0.8"
                            filter={`url(#eyeGlow-${idx})`}
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="nav-arrow right" onClick={() => navigateCarousel('next')}>
          <svg viewBox="0 0 60 100">
            <path d="M 10,10 L 50,50 L 10,90" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;