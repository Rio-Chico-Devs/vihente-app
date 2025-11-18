import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MyStory = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chapters = [
    {
      id: 'beginning',
      year: '2001',
      title: 'IL PRIMO COMPUTER',
      content: 'A sette anni i miei genitori mi comprano un vecchio computer come regalo per il completamento del mio primo corso di informatica per giovani: un Pentium II con 64MB di RAM, monitor CRT da 15 pollici e Windows 98. ',
      image: '💻 Pentium II Setup',
      glitchText: 'Dedico un grazie speciale ai miei genitori.',
      particles: '01001000 01100101 01101100 01101100 01101111'
    },
    {
      id: 'education',
      year: '2014-2015',
      title: 'FORMAZIONE TECNICA',
      content: 'Termino gli studi di programmazione presso l\'Istituto Tecnico Commerciale Leopoldo Pilla, indirizzo Sistemi Informativi Aziendali. Formazione base in C, C++, HTML e PHP. Le fondamenta della mia carriera tecnica.',
      image: '🎓 Diploma Programming',
      glitchText: 'Un grazie ai miei amici che mi hanno sempre supportato',
      particles: 'class Student { knowledge++; }'
    },
    {
      id: 'firstwebsite',
      year: '2017',
      title: 'PRIMO SITO WEB',
      content: 'Dopo diversi corsi online di web development, creo il mio primo sito web. Stesso anno: primo sito WordPress online configurando Apache. Scopro le criticità del web: routing, SEO, XML sitemap, indicizzazione. La documentazione era scarsa, i forum erano l\'unica risorsa.',
      image: '🌐 First Website',
      glitchText: 'Per aspera ad astra.',
      particles: '<html><body>Hello World</body></html>'
    },
    {
      id: 'university',
      year: '2019',
      title: 'APPROFONDIMENTO',
      content: 'Durante gli studi universitari continuo la formazione pratica con framework moderni. Approfondisco HTML, CSS, JavaScript e Python. Scopro React e sviluppo la mia prima applicazione. Decido di dedicarmi in modo particolare al FrontEnd',
      image: '⚛️ React Development',
      glitchText: 'Bisogna seguire varie strade che portano alla stessa meta.',
      particles: 'function App() { return <Future />; }'
    },
    {
      id: 'completion',
      year: '2023',
      title: 'PRIMA APPLICAZIONE',
      content: 'Dopo aver concluso gli studi e lavorato per diverse aziende, completo la mia prima applicazione React completa. Metto online la mia prima build sviluppata completamente in ambiente React. ',
      image: '🚀 React App Launch',
      glitchText: 'Rimanere al passo con i tempi è sempre una sfida.',
      particles: 'npm run build && npm run deploy'
    },
    {
      id: 'freelance',
      year: '2024',
      title: 'LAVORATORE AUTONOMO',
      content: 'Le esperienze in vari settori mi portano ad aprire la mia attività. Osservando le problematiche nei team IT, decido di concentrarmi sull\'aspetto più critico: assistenza e formazione del cliente, spesso di fronte a costi insostenibili.',
      image: '💼 Freelance Journey',
      glitchText: 'Ovunque ci sia un problema, nasce una nuova opportunità.',
      particles: 'while(learning) { experience++; }'
    },
    {
      id: 'method',
      year: '2025',
      title: 'IL MIO METODO',
      content: 'Dopo attento studio, creo un metodo e una roadmap per soluzioni estremamente personalizzate che ottimizzano spese e carichi del cliente. Il mio sito è un esempio di quello che propongo: attenzione ai minimi dettagli, coerenza e branding omogeneo.',
      image: '🎯 Perfect Method',
      glitchText: 'Nessuno può definire meglio chi sei se non tu stesso.',
      particles: 'solution = client.needs + innovation'
    }
  ];

  const changeChapter = useCallback((newChapter) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    createSimpleTransition();
    
    const currentContainer = containerRef.current?.querySelector('.chapter-container');
    if (currentContainer) {
      currentContainer.classList.add('defragmenting');
    }
    
    setTimeout(() => {
      setCurrentChapter(newChapter);
      
      setTimeout(() => {
        const newContainer = containerRef.current?.querySelector('.chapter-container');
        if (newContainer) {
          newContainer.classList.add('recomposing');
        }
      }, 30);
    }, 300);
    
    setTimeout(() => {
      setIsTransitioning(false);
      cleanupTransitionEffects();
    }, 700);
  }, [isTransitioning]);

  // Wheel navigation with debouncing
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;
      
      if (timeDiff > 200) {
        scrollAccumulator.current = 0;
      }
      
      scrollAccumulator.current += Math.abs(e.deltaY);
      lastScrollTime.current = now;
      
      if (scrollAccumulator.current > 100 && !isTransitioning) {
        const direction = e.deltaY > 0 ? 'forward' : 'backward';
        
        if (direction === 'forward' && currentChapter < chapters.length - 1) {
          changeChapter(currentChapter + 1);
        } else if (direction === 'backward' && currentChapter > 0) {
          changeChapter(currentChapter - 1);
        }
        
        scrollAccumulator.current = 0;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentChapter, isTransitioning, chapters.length, changeChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentChapter < chapters.length - 1) {
          changeChapter(currentChapter + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentChapter > 0) {
          changeChapter(currentChapter - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentChapter, isTransitioning, chapters.length, changeChapter]);

  const createSimpleTransition = () => {
    const container = containerRef.current;
    if (!container) return;

    const gridOverlay = container.querySelector('.grid-overlay');
    if (gridOverlay) {
      gridOverlay.classList.add('transition-pulse');
    }

    const scanLine = document.createElement('div');
    scanLine.className = 'elegant-scan';
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        rgba(0, 255, 255, 0.4),
        rgba(0, 255, 255, 1),
        rgba(0, 255, 255, 0.4),
        transparent
      );
      animation: elegantScan 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
      z-index: 26;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
    `;
    container.appendChild(scanLine);

    const noise = document.createElement('div');
    noise.className = 'digital-noise';
    noise.style.cssText = `
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.02) 2px,
        rgba(0, 255, 255, 0.02) 4px
      );
      animation: noiseFlash 0.3s ease-out;
      z-index: 23;
      pointer-events: none;
    `;
    container.appendChild(noise);
  };

  const cleanupTransitionEffects = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const effects = container.querySelectorAll('.elegant-scan, .digital-noise');
    effects.forEach(el => el.remove());
    
    const gridOverlay = container.querySelector('.grid-overlay');
    if (gridOverlay) {
      gridOverlay.classList.remove('transition-pulse');
    }
  };

  const currentChapterData = chapters[currentChapter];

  return (
    <section 
      ref={containerRef}
      style={{
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Share Tech Mono', monospace",
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        paddingTop: '120px',
        paddingBottom: '180px'
      }}
    >
      <style>{`
        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.875rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #0ff;
          text-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
          width: 100%;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes breathingGrid {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.01);
          }
        }

        @keyframes vignettePulse {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.7;
          }
        }

        @keyframes elegantScan {
          0% {
            top: 0%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes noiseFlash {
          0%, 100% { 
            opacity: 0; 
          }
          50% { 
            opacity: 1; 
          }
        }

        .grid-overlay.transition-pulse {
          animation: subtleGridPulse 0.4s ease-out;
        }

        @keyframes subtleGridPulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
            box-shadow: 
              inset 0 0 100px rgba(0, 255, 255, 0.2),
              inset 0 0 50px rgba(0, 255, 255, 0.15);
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes digimonDefrag {
          0% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
          100% {
            opacity: 0;
            filter: blur(2px);
            transform: scale(0.98);
          }
        }

        @keyframes digimonRecompose {
          0% {
            opacity: 0;
            filter: blur(2px);
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="86.6" height="100" viewBox="0 0 86.6 100"><path d="M43.3 0 L86.6 25 L86.6 75 L43.3 100 L0 75 L0 25 Z" fill="none" stroke="rgba(0,255,255,0.45)" stroke-width="1.2"/></svg>');
          background-size: 86.6px 100px;
          z-index: 2;
          box-shadow: 
            inset 0 0 80px rgba(0, 255, 255, 0.12),
            inset 0 0 40px rgba(0, 255, 255, 0.08);
          animation: breathingGrid 7s ease-in-out infinite;
        }

        .vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%);
          animation: vignettePulse 10s ease-in-out infinite;
        }

        .vhs-scanlines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 255, 255, 0.01) 3px,
            rgba(0, 255, 255, 0.01) 6px
          );
          pointer-events: none;
          z-index: 1;
        }

        .chapter-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          transition: none;
          will-change: transform, opacity, filter;
        }

        .chapter-container.defragmenting {
          animation: digimonDefrag 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        .chapter-container.recomposing {
          animation: digimonRecompose 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }

        .chapter-content {
          display: flex;
          gap: 4rem;
          align-items: center;
          justify-content: center;
          max-width: 1600px;
          width: 100%;
        }

        .text-box {
          position: relative;
          width: 850px;
          height: 420px;
          flex-shrink: 0;
        }

        .text-box::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          clip-path: polygon(
            0 40px,
            40px 0,
            120px 0,
            140px 15px,
            calc(100% - 80px) 15px,
            calc(100% - 60px) 0,
            calc(100% - 20px) 0,
            100% 20px,
            100% calc(100% - 50px),
            calc(100% - 30px) calc(100% - 20px),
            calc(100% - 100px) calc(100% - 20px),
            calc(100% - 120px) 100%,
            80px 100%,
            60px calc(100% - 15px),
            20px calc(100% - 15px),
            0 calc(100% - 35px)
          );
          transition: background 0.3s ease;
        }

        .text-border-svg {
          position: absolute;
          top: 20px;
          left: 20px;
          width: calc(100% - 40px);
          height: calc(100% - 40px);
          pointer-events: none;
          overflow: visible;
        }

        .text-border-svg path {
          fill: none;
          stroke: rgba(255, 255, 255, 0.7);
          stroke-width: 4;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
          transition: stroke 0.3s ease, stroke-width 0.3s ease;
        }

        .text-inner {
          position: absolute;
          top: 60px;
          left: 80px;
          right: 80px;
          bottom: 80px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chapter-image-container {
          flex-shrink: 0;
          width: 550px;
        }

        .vhs-image {
          width: 100%;
          height: 420px;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(0, 255, 255, 0.6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 255, 255, 0.8);
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.2rem;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .chapter-year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1rem;
          color: rgba(0, 255, 255, 0.8);
          letter-spacing: 0.1em;
        }

        .mobile-year {
          display: none;
        }

        .chapter-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #0ff;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          margin: 0;
          line-height: 1.2;
        }

        .chapter-description {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          margin: 0.5rem 0;
        }

        .glitch-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.95rem;
          color: rgba(0, 255, 255, 0.7);
          font-style: italic;
          margin-top: 0.5rem;
        }

        .navigation-ui {
          position: fixed;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 100;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(0, 255, 255, 0.3);
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot:hover {
          border-color: rgba(0, 255, 255, 0.6);
        }

        .nav-dot.active {
          background: rgba(0, 255, 255, 0.8);
          border-color: rgba(0, 255, 255, 1);
          box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
        }

        .chapter-indicator {
          position: fixed;
          top: 100px;
          left: 2rem;
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          color: rgba(0, 255, 255, 0.6);
          z-index: 100;
          background: rgba(0, 0, 0, 0.8);
          padding: 0.5rem 1rem;
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 4px;
        }

        .instructions {
          position: fixed;
          bottom: 120px;
          right: 2rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: rgba(0, 255, 255, 0.4);
          text-align: right;
          z-index: 100;
        }

        @media (max-width: 1024px) {
          section {
            padding-top: 2rem !important;
            paddingBottom: 200px !important;
          }

          .chapter-content {
            flex-direction: column;
            gap: 2.5rem;
          }
          
          .text-box {
            width: 90%;
            max-width: 700px;
            height: auto;
            min-height: 320px;
          }
          
          .text-inner {
            top: 50px;
            left: 60px;
            right: 60px;
            bottom: 60px;
          }
          
          .chapter-image-container {
            width: 90%;
            max-width: 500px;
            order: -1;
          }
          
          .vhs-image {
            height: 320px;
          }
        }

        @media (max-width: 768px) {
          section {
            paddingBottom: 220px !important;
          }

          .navigation-ui {
            bottom: 140px;
            gap: 0.8rem;
          }
          
          .nav-dot {
            width: 10px;
            height: 10px;
          }

          .chapter-content {
            gap: 2rem;
          }
          
          .text-box {
            width: 95%;
            min-height: 280px;
          }
          
          .text-inner {
            top: 48px;
            left: 50px;
            right: 50px;
            bottom: 55px;
          }
          
          .chapter-title {
            font-size: 1.6rem;
          }
          
          .chapter-description {
            font-size: 0.9rem;
            line-height: 1.6;
          }
          
          .glitch-text {
            font-size: 0.85rem;
          }
          
          .vhs-image {
            height: 280px;
            font-size: 1rem;
          }
          
          .instructions {
            display: none;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 1rem;
            paddingBottom: 240px !important;
          }
          
          .chapter-content {
            gap: 1.5rem;
          }

          /* Anno sopra il box su mobile */
          .mobile-year {
            display: block;
            text-align: center;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.9rem;
            color: rgba(0, 255, 255, 0.8);
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
            background: rgba(0, 0, 0, 0.6);
            padding: 0.5rem 1rem;
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 4px;
            display: inline-block;
          }

          .chapter-year {
            display: none;
          }
          
          .text-box {
            width: 100%;
            min-height: 300px;
          }

          /* SVG ridimensionato per mobile - linee centrali più corte */
          .text-box::before {
            clip-path: polygon(
              0 30px,
              30px 0,
              80px 0,
              95px 12px,
              calc(100% - 50px) 12px,
              calc(100% - 35px) 0,
              calc(100% - 15px) 0,
              100% 15px,
              100% calc(100% - 35px),
              calc(100% - 20px) calc(100% - 15px),
              calc(100% - 70px) calc(100% - 15px),
              calc(100% - 85px) 100%,
              60px 100%,
              45px calc(100% - 12px),
              15px calc(100% - 12px),
              0 calc(100% - 25px)
            );
          }
          
          .text-inner {
            top: 40px;
            left: 35px;
            right: 35px;
            bottom: 45px;
            gap: 0.75rem;
          }
          
          .chapter-title {
            font-size: 1.3rem;
            line-height: 1.3;
          }
          
          .chapter-description {
            font-size: 0.8rem;
            line-height: 1.5;
          }
          
          .glitch-text {
            font-size: 0.7rem;
          }
          
          .vhs-image {
            height: 220px;
            font-size: 0.85rem;
          }
          
          .chapter-indicator {
            font-size: 0.7rem;
            padding: 0.4rem 0.8rem;
            top: 90px;
            left: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }

        .text-box:hover::before {
          background: rgba(0, 0, 0, 0.75);
        }

        .text-box:hover .text-border-svg path {
          stroke: rgba(255, 255, 255, 0.95);
          stroke-width: 5;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
      `}</style>

      <div className="vhs-scanlines" />

      <div className="grid-overlay">
        <div className="vignette-overlay"></div>
      </div>

      <div className="chapter-indicator">
        [{currentChapterData.year}] CAPITOLO {currentChapter + 1}/{chapters.length}
      </div>

      <div className="instructions">
        SCROLL TO NAVIGATE<br />
        ↑↓ or ARROW KEYS
      </div>

      <div 
        className="chapter-container"
        key={currentChapter}
      >
        <div className="chapter-content">
          {isMobile && (
            <div className="mobile-year">
              [{currentChapterData.year}]
            </div>
          )}

          <div className="text-box">
            {!isMobile && (
              <svg className="text-border-svg" viewBox="0 0 850 420" preserveAspectRatio="none">
                <path d="
                  M 0,40 
                  L 40,0 
                  L 120,0 
                  L 140,15 
                  L 710,15 
                  L 730,0 
                  L 810,0 
                  L 850,20 
                  L 850,370 
                  L 820,400 
                  L 730,400 
                  L 710,420 
                  L 140,420 
                  L 120,405 
                  L 20,405 
                  L 0,380 
                  Z" 
                />
              </svg>
            )}

            {isMobile && (
              <svg className="text-border-svg" viewBox="0 0 350 300" preserveAspectRatio="none">
                <path d="
                  M 0,30 
                  L 30,0 
                  L 80,0 
                  L 95,12 
                  L 255,12 
                  L 270,0 
                  L 335,0 
                  L 350,15 
                  L 350,265 
                  L 330,285 
                  L 280,285 
                  L 265,300 
                  L 85,300 
                  L 70,288 
                  L 15,288 
                  L 0,275 
                  Z" 
                />
              </svg>
            )}
            
            <div className="text-inner">
              {!isMobile && (
                <div className="chapter-year">
                  [{currentChapterData.year}]
                </div>
              )}
              
              <h1 className="chapter-title">
                {currentChapterData.title}
              </h1>
              
              <div className="chapter-description">
                {currentChapterData.content}
              </div>
              
              <div className="glitch-text">
                &gt; {currentChapterData.glitchText}
              </div>
            </div>
          </div>

          <div className="chapter-image-container">
            <div className="vhs-image">
              {currentChapterData.image}
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-ui">
        {chapters.map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${currentChapter === index ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning && index !== currentChapter) {
                changeChapter(index);
              }
            }}
          />
        ))}
      </div>

      {currentChapter === chapters.length - 1 && !isTransitioning && (
        <div style={{
          position: 'fixed',
          bottom: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 100
        }}>
          <button 
            onClick={() => navigate('/contatti')}
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid rgba(0, 255, 255, 0.6)',
              color: 'rgba(0, 255, 255, 0.9)',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 255, 255, 0.2)';
              e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            → INIZIAMO INSIEME
          </button>
        </div>
      )}
    </section>
  );
};

export default MyStory;