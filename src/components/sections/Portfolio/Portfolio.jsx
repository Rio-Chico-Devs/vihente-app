import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';
import GraficheCard from './GraficheCard';
import WebsiteMockup from './WebsiteMockup';
import ComponentiCard from './ComponentiCard';
import './Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const categories = [
    {
      id: 'grafiche',
      title: 'GRAFICHE',
      description: 'Design grafico e visual identity'
    },
    {
      id: 'sitiweb',
      title: 'SITI WEB',
      description: 'Sviluppo web e applicazioni'
    },
    {
      id: 'componenti',
      title: 'COMPONENTI',
      description: 'UI components e librerie React'
    }
  ];

  const primaryColor = theme === 'light'
    ? 'rgba(232, 160, 48, 0.95)'
    : 'rgba(0, 255, 255, 0.95)';

  // Reset fade-out state quando il componente monta (fade-in della pagina)
  useEffect(() => {
    setIsFadingOut(false);
  }, []);

  // Calcola altezze reali di navbar e footer per mobile
  useEffect(() => {
    const updateMobileHeight = () => {
      if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');
        const portfolioMobile = document.querySelector('.portfolio-mobile');

        if (navbar && footer && portfolioMobile) {
          const navbarHeight = navbar.offsetHeight;
          const footerHeight = footer.offsetHeight;
          const availableHeight = window.innerHeight - navbarHeight - footerHeight;

          portfolioMobile.style.top = `${navbarHeight}px`;
          portfolioMobile.style.height = `${availableHeight}px`;
        }
      }
    };

    // Esegui al mount e quando cambia la dimensione della finestra
    updateMobileHeight();
    window.addEventListener('resize', updateMobileHeight);

    // Esegui anche dopo un breve delay per assicurarsi che navbar/footer siano renderizzati
    const timer = setTimeout(updateMobileHeight, 100);

    return () => {
      window.removeEventListener('resize', updateMobileHeight);
      clearTimeout(timer);
    };
  }, []);

  // Code background effect
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

  const navigateCarousel = (direction) => {
    setIsFlipped(false);

    if (direction === 'prev') {
      setSelectedIndex(prev => (prev - 1 + categories.length) % categories.length);
    } else {
      setSelectedIndex(prev => (prev + 1) % categories.length);
    }
  };

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    } else {
      const category = categories[selectedIndex];
      navigate(`/portfolio/${category.id}`);
    }
  };

  const getCardClass = (index) => {
    if (index === selectedIndex) return 'active';
    if (index === (selectedIndex - 1 + categories.length) % categories.length) return 'prev';
    if (index === (selectedIndex + 1) % categories.length) return 'next';
    return 'hidden';
  };

  const renderCardContent = (category) => {
    switch (category.id) {
      case 'grafiche':
        return <GraficheCard theme={theme} />;
      case 'sitiweb':
        return <WebsiteMockup theme={theme} />;
      case 'componenti':
        return <ComponentiCard theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div className="portfolio-page">
      <div className="code-background" id="codeBackground"></div>

      {/* Fade to black overlay per transizioni */}
      <div className={`fade-overlay ${isFadingOut ? 'active' : ''}`}></div>

      {/* Mobile: 3 sezioni fullscreen verticali */}
      <div className="portfolio-mobile">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="portfolio-mobile-card"
            onClick={() => {
              setIsFadingOut(true);
              setTimeout(() => navigate(`/portfolio/${cat.id}`), 120);
            }}
          >
            <h3 className="mobile-card-title">{cat.title}</h3>
            <div className="mobile-card-subtitle">{cat.description}</div>
          </div>
        ))}
      </div>

      {/* Desktop: carousel con animazioni */}
      <div className="portfolio-container">
        <button
          className="nav-arrow left"
          onClick={() => navigateCarousel('prev')}
          aria-label="Previous portfolio item"
        >
          <svg viewBox="0 0 60 100">
            <path d="M 50,10 L 10,50 L 50,90" />
          </svg>
        </button>

        <div className="carousel-scene">
          <div className="carousel-cards">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className={`card-item ${getCardClass(idx)} ${idx === selectedIndex && isFlipped ? 'flipped' : ''}`}
                onClick={() => idx === selectedIndex && handleCardClick()}
              >
                <div className="card-flip">
                  {/* Front Face */}
                  <div className="card-face front">
                    <div className="card-content">
                      <div className="card-image">
                        {renderCardContent(cat)}
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="card-face back">
                    <div className="card-back-content">
                      <svg className="eye-logo" viewBox="0 0 100 100" width="180" height="180">
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

                      <h3 className="card-back-title">{cat.title}</h3>

                      <button className="card-back-button">
                        Esplora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-arrow right"
          onClick={() => navigateCarousel('next')}
          aria-label="Next portfolio item"
        >
          <svg viewBox="0 0 60 100">
            <path d="M 10,10 L 50,50 L 10,90" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
