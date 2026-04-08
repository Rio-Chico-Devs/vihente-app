import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';
import { useGuide } from '../../../contexts/GuideContext';
import './Navbar.css';

const MOBILE_GREETINGS = [
  ':D Eccomi! Mi hai chiamato?',
  'Yawn... e.e Hola amigo mi ero addormentata.',
  'Carica e operativa.',
  'Cominciamo pure, sono Iris la tua guida.',
  'rrrr* zz* boop* Ca-Carica e P-Pronta!',
];

const PAGE_GUIDES = {
  '/':                                    'Home — panoramica del sito. Scorri per scoprire chi siamo.',
  '/storia':                              'La mia storia — skills, lingue e background di Antonio.',
  '/services':                            'Servizi — tutto quello che offriamo come consulenti digitali.',
  '/services/consulenze':                 'Consulenza digitale — strategia, analisi e supporto personalizzato.',
  '/services/sitiweb':                    'Siti web — dal design al deploy, progetti web completi.',
  '/services/presenza':                   'Presenza online — social media, SEO e visibilità digitale.',
  '/services/multimedia':                 'Multimedia — illustrazioni, grafiche e content creation.',
  '/portfolio':                           'Portfolio — una selezione dei lavori più significativi.',
  '/portfolio/componenti':                'Componenti UI — interfacce interattive realizzate da zero.',
  '/portfolio/grafiche':                  'Grafiche — illustrazioni e visual design del portfolio.',
  '/portfolio/sitiweb':                   'Siti web — esempi di progetti web realizzati.',
  '/portfolio/componenti/black-market':   "Femo's Black Market — negozio cyberpunk con carrello simulato.",
  '/portfolio/componenti/dashboard':      'Analytics Dashboard — metriche e grafici in tempo reale.',
  '/portfolio/componenti/booking':        'Booking System — prenota sessioni scegliendo data e orario.',
  '/portfolio/componenti/music-player':   'Music Player — riproduttore con equalizzatore e playlist.',
  '/portfolio/componenti/crud-simulator': 'Gestionale Logistico — magazzino con form CRUD.',
  '/portfolio/componenti/slider':         'Expanding Gallery — pannelli espandibili con lightbox.',
  '/portfolio/componenti/text-sampler':   'Text Sampler — effetti tipografici in CSS puro.',
  '/portfolio/componenti/cubo-3d':        '3D Model — cubo interattivo, zero librerie esterne.',
  '/portfolio/componenti/image-checker':  "Image Checker — lente d'ingrandimento su immagini.",
  '/contatti':                            'Contatti — scrivi un messaggio o richiedi un preventivo!',
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { text, setGuide, clearGuide } = useGuide();
  const [scrolled, setScrolled] = useState(false);
  const [mobileIrisActive, setMobileIrisActive] = useState(false);
  const [mobileGreeting,   setMobileGreeting]   = useState(null);
  const mobileIrisTimer = useRef(null);

  /* Cleanup timer on unmount */
  useEffect(() => () => clearTimeout(mobileIrisTimer.current), []);

  /* Reset greeting on route change */
  useEffect(() => { setMobileGreeting(null); }, [location.pathname]);
  const [pupilPosition, setPupilPosition] = useState({ x: 50, y: 50 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Get current page from location
  const currentPage = location.pathname.replace('/vihente-app', '').replace('/', '') || 'landing';

  // Detect scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse movement globally to make pupil follow cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const logo = document.querySelector('.navbar-logo');
      if (!logo) return;

      const logoRect = logo.getBoundingClientRect();
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      const deltaX = e.clientX - logoCenterX;
      const deltaY = e.clientY - logoCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      const maxRadiusX = 8;
      const maxRadiusY = 6;

      let newX = 50 + Math.cos(angle) * maxRadiusX;
      let newY = 50 + Math.sin(angle) * maxRadiusY;

      const distanceFromCenter = Math.sqrt(
        Math.pow((newX - 50) / maxRadiusX, 2) +
        Math.pow((newY - 50) / maxRadiusY, 2)
      );

      if (distanceFromCenter > 1) {
        newX = 50 + Math.cos(angle) * maxRadiusX;
        newY = 50 + Math.sin(angle) * maxRadiusY;
      }

      setPupilPosition({ x: newX, y: newY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random looking around
  useEffect(() => {
    const lookAround = () => {
      const randomAngle = Math.random() * Math.PI * 2;
      const randomDistance = Math.random() * 0.7;

      const newX = 50 + Math.cos(randomAngle) * 8 * randomDistance;
      const newY = 50 + Math.sin(randomAngle) * 6 * randomDistance;

      setPupilPosition({ x: newX, y: newY });

      setTimeout(() => {
        setPupilPosition({ x: 50, y: 50 });
      }, 1000 + Math.random() * 1000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        lookAround();
      }
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Random blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 100);
    };

    const interval = setInterval(() => {
      blink();
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  // Mobile menu navigation items
  const navItems = [
    { id: 'landing', label: 'Home', path: '/', number: '01' },
    { id: 'services', label: 'Servizi', path: '/services', number: '02' },
    { id: 'portfolio', label: 'Portfolio', path: '/portfolio', number: '03' },
    { id: 'storia', label: 'La Mia Storia', path: '/storia', number: '04' },
    { id: 'contatti', label: 'Contatti', path: '/contatti', number: '05' },
  ];

  // Improved transition with proper navigation timing
  const performTransition = (path) => {
    // Navigazione diretta - transizione gestita da PageTransition globale
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleDesktopNavClick = (e, path) => {
    e.preventDefault();
    // Normalizza i path per il confronto
    const currentPath = location.pathname.replace('/vihente-app', '') || '/';
    const targetPath = path;

    // Permetti la navigazione se non sei esattamente sul path richiesto
    // Questo permette di tornare alla home della sezione anche se sei in una sottosezione
    if (currentPath !== targetPath) {
      performTransition(path);
    }
  };

  const handleMobileItemClick = (e, item) => {
    // PREVENT DOUBLE CLICK (touch + click on mobile)
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple rapid clicks
    if (isNavigating) {
      return;
    }

    // Normalizza i path per il confronto - FIX più robusto
    const rawPath = location.pathname;
    let currentPath = rawPath
      .replace('/vihente-app', '')  // Rimuovi basename
      .replace(/^\/+/, '/');         // Normalizza slash multipli

    if (!currentPath || currentPath === '') {
      currentPath = '/';
    }

    const targetPath = item.path;

    // NAVIGA SEMPRE se paths sono diversi
    if (currentPath !== targetPath) {
      // Set navigating flag
      setIsNavigating(true);

      // Chiudi menu PRIMA per evitare interferenze
      setMobileMenuOpen(false);
      setSelectedItem(null);

      // Navigate IMMEDIATELY
      navigate(targetPath, { replace: false });

      // Force scroll dopo un frame
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Reset flag dopo navigazione
        setTimeout(() => {
          setIsNavigating(false);
        }, 500);
      });
    } else {
      setMobileMenuOpen(false);
      setSelectedItem(null);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setSelectedItem(null);
  };

  const handleLogoClick = (e) => {
    if (mobileMenuOpen) {
      e.preventDefault();
      closeMobileMenu();
    } else {
      // Normalizza i path per il confronto
      const currentPath = location.pathname.replace('/vihente-app', '') || '/';
      if (currentPath !== '/') {
        e.preventDefault();
        performTransition('/');
      }
    }
  };

  /* Mobile iris toggle */
  const handleMobileIrisToggle = () => {
    if (mobileIrisActive) {
      clearTimeout(mobileIrisTimer.current);
      setMobileGreeting(null);
      setMobileIrisActive(false);
    } else {
      setMobileIrisActive(true);
      const msg = MOBILE_GREETINGS[Math.floor(Math.random() * MOBILE_GREETINGS.length)];
      setMobileGreeting(msg);
      mobileIrisTimer.current = setTimeout(() => setMobileGreeting(null), 4000);
    }
  };

  const rawPath      = location.pathname.replace('/vihente-app', '') || '/';
  const mobilePageGuide = PAGE_GUIDES[rawPath] ?? null;
  const mobileGuideText = mobileIrisActive
    ? (mobileGreeting || text || mobilePageGuide)
    : null;

  // Helper to check if link is active (usato solo per lo styling)
  const isActive = (path) => {
    const currentPath = location.pathname.replace('/vihente-app', '') || '/';

    if (path === '/') {
      return currentPath === '/';
    }

    // Un link è "attivo" se il path corrente inizia con il path del link
    // Questo permette di evidenziare "Portfolio" anche quando sei in "/portfolio/grafiche"
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}
        role="navigation"
        aria-label="Navigazione principale"
      >
        <div className="navbar-container">
          {/* Mobile-only: Iris eye button + guide text */}
          <button
            className="mobile-iris-btn"
            onClick={handleMobileIrisToggle}
            aria-label={mobileIrisActive ? 'Disattiva Iris' : 'Attiva Iris'}
          >
            <svg viewBox="20 27 62 42" className="mobile-iris-svg" aria-hidden="true">
              <defs>
                <filter id="irisGlowM">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <clipPath id="irisClipM">
                  <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"/>
                </clipPath>
              </defs>

              {/* Sleeping eye (drooping arc) */}
              {!mobileIrisActive && (
                <>
                  <path d="M 36 50 C 42 53.5, 58 53.5, 64 50"
                    fill="none"
                    stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                    strokeWidth="1.2" strokeLinecap="round"
                    filter="url(#irisGlowM)"
                  />
                  <path d="M 36 50 C 42 47, 58 47, 64 50"
                    fill="none"
                    stroke="var(--color-primary-40, rgba(0,255,255,0.4))"
                    strokeWidth="0.8" strokeLinecap="round"
                  />
                </>
              )}

              {/* Awake eye */}
              {mobileIrisActive && (
                <>
                  <path
                    d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                    fill="none"
                    stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                    filter="url(#irisGlowM)"
                  />
                  <g clipPath="url(#irisClipM)">
                    <circle cx="50" cy="50" r="8"
                      fill="none" stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                      strokeWidth="1" filter="url(#irisGlowM)"
                    />
                    <circle cx="50" cy="50" r="3.5"
                      fill="none" stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                      strokeWidth="0.8" filter="url(#irisGlowM)"
                    />
                  </g>
                </>
              )}

              {/* Papillon — sempre visibile */}
              <g transform="translate(65.5,37) rotate(45)" filter="url(#irisGlowM)">
                <path d="M -1.5,-1.2 C -2.5,-3 -4.5,-4.8 -7.5,-4.3 C -10,-3.8 -10.5,0 -7.5,4.3 C -4.5,4.8 -2.5,3 -1.5,1.2 C -1,0.5 -1,-0.5 -1.5,-1.2 Z" fill="var(--color-primary, #0ff)"/>
                <path d="M 1.5,-1.2 C 2.5,-3 4.5,-4.8 7.5,-4.3 C 10,-3.8 10.5,0 7.5,4.3 C 4.5,4.8 2.5,3 1.5,1.2 C 1,0.5 1,-0.5 1.5,-1.2 Z" fill="var(--color-primary, #0ff)"/>
                <rect x="-2" y="-2" width="4" height="4" rx="0.8" fill="rgba(0,0,0,0.9)"/>
                <rect x="-1.2" y="-1.2" width="2.4" height="2.4" rx="0.5" fill="var(--color-primary, #0ff)"/>
              </g>
              <circle cx="65" cy="61" r="1.5" fill="var(--color-primary, #0ff)" filter="url(#irisGlowM)"/>
            </svg>
          </button>

          {/* Mobile guide text — between iris and theme toggle */}
          <span
            className={`mobile-guide-text${mobileGuideText ? ' mobile-guide-text--visible' : ''}`}
            aria-live="polite"
          >
            {mobileGuideText}
          </span>

          {/* Logo - Three Circles Eye with Tracking */}
          <Link
            to="/"
            className={`navbar-logo ${mobileMenuOpen ? 'menu-open' : ''}`}
            aria-label="Torna alla home"
            onClick={handleLogoClick}
            onMouseEnter={() => setGuide('Psst... questo è Femo! Si irrita facilmente, quindi trattalo con rispetto.')}
            onMouseLeave={clearGuide}
          >
            {/* Desktop: plain eye */}
            <svg className="logo-eye logo-eye-plain" viewBox="24 36 52 28">
              <defs>
                <filter id="eyeGlowNav">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <clipPath id="eyeContourClipNav">
                  <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"/>
                </clipPath>
              </defs>

              {/* Eye shape - outer contour */}
              <path
                d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                fill="none"
                stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#eyeGlowNav)"
                style={{
                  opacity: isBlinking ? 0 : 1,
                  transition: 'opacity 0.1s ease-in-out'
                }}
              />

              {/* Pupil group - clipped by eye contour */}
              <g
                clipPath="url(#eyeContourClipNav)"
                style={{
                  opacity: isBlinking ? 0 : 1,
                  transition: 'opacity 0.1s ease-in-out'
                }}
              >
                {/* Outer circle */}
                <circle
                  cx={pupilPosition.x}
                  cy={pupilPosition.y}
                  r="8"
                  fill="none"
                  stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                  strokeWidth="1"
                  filter="url(#eyeGlowNav)"
                  style={{
                    transition: 'cx 0.3s ease-out, cy 0.3s ease-out'
                  }}
                />

                {/* Inner pupil */}
                <circle
                  cx={pupilPosition.x}
                  cy={pupilPosition.y}
                  r="3.5"
                  fill="none"
                  stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                  strokeWidth="0.8"
                  filter="url(#eyeGlowNav)"
                  style={{
                    transition: 'cx 0.3s ease-out, cy 0.3s ease-out'
                  }}
                />
              </g>
            </svg>

            {/* Mobile: Iris eye with fiocchetto */}
            <svg className="logo-eye logo-eye-iris" viewBox="20 27 62 42" aria-hidden="true">
              <defs>
                <filter id="irisGlowNav">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <clipPath id="irisClipNav">
                  <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"/>
                </clipPath>
              </defs>

              {/* Eye outline */}
              <path
                d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                fill="none"
                stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#irisGlowNav)"
                style={{ opacity: isBlinking ? 0 : 1, transition: 'opacity 0.1s ease-in-out' }}
              />

              {/* Pupil */}
              <g
                clipPath="url(#irisClipNav)"
                style={{ opacity: isBlinking ? 0 : 1, transition: 'opacity 0.1s ease-in-out' }}
              >
                <circle
                  cx={pupilPosition.x} cy={pupilPosition.y} r="8"
                  fill="none"
                  stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                  strokeWidth="1"
                  filter="url(#irisGlowNav)"
                  style={{ transition: 'cx 0.3s ease-out, cy 0.3s ease-out' }}
                />
                <circle
                  cx={pupilPosition.x} cy={pupilPosition.y} r="3.5"
                  fill="none"
                  stroke="var(--color-primary-95, rgba(0, 255, 255, 0.95))"
                  strokeWidth="0.8"
                  filter="url(#irisGlowNav)"
                  style={{ transition: 'cx 0.3s ease-out, cy 0.3s ease-out' }}
                />
              </g>

              {/* Papillon — filled, inclinato -45deg, top-right */}
              <g transform="translate(67,36) rotate(45)" filter="url(#irisGlowNav)">
                <path
                  d="M -1.5,-1.2 C -2.5,-3 -4.5,-4.8 -7.5,-4.3 C -10,-3.8 -10.5,0 -7.5,4.3 C -4.5,4.8 -2.5,3 -1.5,1.2 C -1,0.5 -1,-0.5 -1.5,-1.2 Z"
                  fill="var(--color-primary, #0ff)"
                />
                <path
                  d="M 1.5,-1.2 C 2.5,-3 4.5,-4.8 7.5,-4.3 C 10,-3.8 10.5,0 7.5,4.3 C 4.5,4.8 2.5,3 1.5,1.2 C 1,0.5 1,-0.5 1.5,-1.2 Z"
                  fill="var(--color-primary, #0ff)"
                />
                <rect x="-2" y="-2" width="4" height="4" rx="0.8" fill="rgba(0,0,0,0.9)" />
                <rect x="-1.2" y="-1.2" width="2.4" height="2.4" rx="0.5" fill="var(--color-primary, #0ff)" />
              </g>

              {/* Neo */}
              <circle cx="65" cy="61" r="1.5"
                fill="var(--color-primary, #0ff)"
                filter="url(#irisGlowNav)"
              />
            </svg>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-links desktop-only">
            <Link
              to="/services"
              className={`nav-link ${isActive('/services') ? 'active' : ''}`}
              aria-label="Vai alla pagina Servizi"
              aria-current={isActive('/services') ? 'page' : undefined}
              onClick={(e) => handleDesktopNavClick(e, '/services')}
              onMouseEnter={() => setGuide('Scopri i miei servizi: web, grafica, multimedia e consulenze digitali.')}
              onMouseLeave={clearGuide}
            >
              <span className="nav-link-text">Servizi</span>
              <div className="nav-link-underline" />
            </Link>

            <Link
              to="/portfolio"
              className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}
              aria-label="Vai alla pagina Portfolio"
              aria-current={isActive('/portfolio') ? 'page' : undefined}
              onClick={(e) => handleDesktopNavClick(e, '/portfolio')}
              onMouseEnter={() => setGuide('Dai un\'occhiata ai miei lavori: componenti UI, siti web e grafiche.')}
              onMouseLeave={clearGuide}
            >
              <span className="nav-link-text">Portfolio</span>
              <div className="nav-link-underline" />
            </Link>

            <Link
              to="/storia"
              className={`nav-link ${isActive('/storia') ? 'active' : ''}`}
              aria-label="Vai alla pagina La Mia Storia"
              aria-current={isActive('/storia') ? 'page' : undefined}
              onClick={(e) => handleDesktopNavClick(e, '/storia')}
              onMouseEnter={() => setGuide('Chi sono, da dove vengo e dove sto andando — la storia di Bruno.')}
              onMouseLeave={clearGuide}
            >
              <span className="nav-link-text">La Mia Storia</span>
              <div className="nav-link-underline" />
            </Link>

            <Link
              to="/contatti"
              className={`nav-link ${isActive('/contatti') ? 'active' : ''}`}
              aria-label="Vai alla pagina Contatti"
              aria-current={isActive('/contatti') ? 'page' : undefined}
              onClick={(e) => handleDesktopNavClick(e, '/contatti')}
              onMouseEnter={() => setGuide('Mi sembra un\'ottima idea e.e')}
              onMouseLeave={clearGuide}
            >
              <span className="nav-link-text">Contatti</span>
              <div className="nav-link-underline" />
            </Link>
          </div>

          {/* Availability Badge */}
          <div
            className="availability-badge desktop-only"
            aria-label="Stato disponibilità"
            onMouseEnter={() => setGuide('Questo badge verde significa che siamo disponibili per nuove collaborazioni. Non esitare a contattarci!')}
            onMouseLeave={clearGuide}
          >
            <div className="status-dot" aria-hidden="true" />
            <span className="status-text">Disponibile</span>
          </div>

          {/* Mobile Right Group: theme toggle + hamburger */}
          <div className="mobile-right-group mobile-only">
            <button
              className="theme-toggle-compact"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Attiva Night Mode' : 'Attiva Neon Mode'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hamburger-button"
              aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* PERSONA-STYLE MENU WITH SITE COLORS */}
      <div
        className={`p4-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-label="Menu di navigazione mobile"
        aria-modal="true"
      >
        {/* Menu Header - SOLO SCRITTA IN ALTO A DESTRA */}
        <div className="menu-header">
          <div className="japanese-name-display">
            <div className="name-jp">ブルノ</div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div className="menu-bg-pattern" />

        {/* Menu Items Container */}
        <div className="p4-menu-content">
          {navItems.map((item, index) => {
            const isSelected = selectedItem === item.id;
            const isCurrent = currentPage === item.id;

            return (
              <div
                key={item.id}
                onClick={(e) => handleMobileItemClick(e, item)}
                className={`p4-menu-item ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
                role="button"
                tabIndex={0}
                aria-label={`Vai a ${item.label}`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="item-number">{item.number}</span>
                <span className="item-label">{item.label}</span>
                <span className="item-arrow">▶</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Text */}
        <div className="p4-action-text">
          <p>{selectedItem ? 'TAP AGAIN TO CONFIRM' : 'SELECT YOUR DESTINATION'}</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
