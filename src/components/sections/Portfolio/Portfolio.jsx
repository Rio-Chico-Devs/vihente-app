import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';
import GoogleMockup from './GoogleMockup';
import './Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);
  
  const cardRef = useRef(null);
  const touchStartXRef = useRef(null);
  const startRotationRef = useRef(0);

  const categories = [
    {
      id: 'grafiche',
      title: 'GRAFICHE',
      image: '/portfolio/grafiche-2x.webp' // 1400x1000px recommended
    },
    {
      id: 'sitiweb',
      title: 'SITI WEB',
      image: '/portfolio/sitiweb-2x.webp' // 1400x1000px recommended
    },
    {
      id: 'componenti',
      title: 'COMPONENTI',
      image: '/portfolio/componenti-2x.webp' // 1400x1000px recommended
    }
  ];

  const primaryColor = theme === 'light' 
    ? 'rgba(232, 160, 48, 0.95)' 
    : 'rgba(0, 255, 255, 0.95)';

  // Rotazione base dalla categoria selezionata
  const baseRotation = -selectedCategory * 120;

  useEffect(() => {
    const handleClick = (e) => {
      if (isExpanded && cardRef.current && !cardRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isExpanded]);

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      'const portfolio = {',
      'function render() {',
      'return <Component />',
      'export default App;',
      'import React from "react"'
    ];
    let activeTimeouts = [];

    function generateCodeLine() {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const x = Math.random() * (window.innerWidth - 250);
      const y = Math.random() * (window.innerHeight - 30);
      
      const codeLine = document.createElement('div');
      codeLine.className = 'code-line';
      codeLine.textContent = snippet;
      codeLine.style.cssText = `left:${x}px;top:${y}px`;
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        codeBackground.appendChild(codeLine);
      }
      
      const removeTimeout = setTimeout(() => {
        if (codeLine.parentNode) {
          codeLine.parentNode.removeChild(codeLine);
        }
      }, 6000);
      
      activeTimeouts.push(removeTimeout);
    }

    const codeInterval = setInterval(generateCodeLine, 6000);
    const codeTimeout = setTimeout(generateCodeLine, 2000);

    return () => {
      clearInterval(codeInterval);
      clearTimeout(codeTimeout);
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        while (codeBackground.firstChild) {
          codeBackground.removeChild(codeBackground.firstChild);
        }
      }
    };
  }, []);

  const navigateCarousel = (dir) => {
    setIsExpanded(false);
    if (dir === 'prev') {
      setSelectedCategory(prev => prev - 1);
    } else {
      setSelectedCategory(prev => prev + 1);
    }
  };

  // Touch Start - inizia il drag
  const onTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    startRotationRef.current = baseRotation + dragRotation;
    setIsDragging(true);
  };

  // Touch Move - controllo continuo della rotazione
  const onTouchMove = (e) => {
    if (!touchStartXRef.current) return;
    
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartXRef.current;
    
    // Converti pixel in gradi (più sensibile = più controllo)
    // 300px = 120 gradi (una card)
    const rotationDelta = (diff / 300) * 120;
    
    setDragRotation(rotationDelta);
  };

  const onTouchEnd = () => {
  if (!touchStartXRef.current) return;
  
  // Calcola la rotazione totale
  const totalRotation = baseRotation + dragRotation;
  
  // Trova la card più vicina (ogni card è 120 gradi)
  const nearestCard = Math.round(-totalRotation / 120);
  
  setSelectedCategory(nearestCard);
  setDragRotation(0);
  setIsDragging(false);
  touchStartXRef.current = null;
};
  const handleClick = () => {
    if (isDragging) return; // Ignora click durante drag
    
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      const normalizedIndex = ((selectedCategory % categories.length) + categories.length) % categories.length;
      const category = categories[normalizedIndex];
      
      if (category.id === 'componenti') {
        navigate('/portfolio/componenti');
      } else if (category.id === 'grafiche') {
        navigate('/portfolio/grafiche');
      } else if (category.id === 'sitiweb') {
        navigate('/portfolio/sitiweb');
      }
    }
  };

  const normalizedIndex = ((selectedCategory % categories.length) + categories.length) % categories.length;
  
  // Rotazione finale: base + drag attivo
  const currentRotation = baseRotation + dragRotation;

  return (
    <div className="portfolio-page">
      <div className="code-background" id="codeBackground"></div>
      <div className="portfolio-container">
        <button className="nav-arrow left" onClick={() => navigateCarousel('prev')}>
          <svg viewBox="0 0 60 100">
            <path d="M 50,10 L 10,50 L 50,90" />
          </svg>
        </button>

        <div 
          className="carousel-scene"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className={`carousel-3d ${isDragging ? 'dragging' : ''}`} 
            style={{ transform: `rotateY(${currentRotation}deg)` }}
          >
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
                    <div className="front face">
                      <div className="front-image">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="front-image-img"
                          loading="eager"
                          decoding="sync"
                        />
                      </div>
                      <div className="front-title">
                        <h2>{cat.title}</h2>
                      </div>
                    </div>

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
                          stroke={primaryColor}
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
                            stroke={primaryColor}
                            strokeWidth="1"
                            filter={`url(#eyeGlow-${idx})`}
                          />
                          
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="3.5" 
                            fill="none"
                            stroke={primaryColor}
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