import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 50, y: 50 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleMobileItemClick = (item) => {
    // Normalizza i path per il confronto
    const currentPath = location.pathname.replace('/vihente-app', '') || '/';
    const targetPath = item.path;

    // Naviga direttamente se non sei già sul path richiesto
    if (currentPath !== targetPath) {
      performTransition(item.path);
    }

    // Chiudi il menu e resetta la selezione
    setMobileMenuOpen(false);
    setSelectedItem(null);
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
          {/* Logo - Three Circles Eye with Tracking */}
          <Link
            to="/"
            className={`navbar-logo ${mobileMenuOpen ? 'menu-open' : ''}`}
            aria-label="Torna alla home"
            onClick={handleLogoClick}
          >
            <svg className="logo-eye" viewBox="0 0 100 100" width="150">
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
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-links desktop-only">
            <Link
              to="/services"
              className={`nav-link ${isActive('/services') ? 'active' : ''}`}
              aria-label="Vai alla pagina Servizi"
              aria-current={isActive('/services') ? 'page' : undefined}
              onClick={(e) => handleDesktopNavClick(e, '/services')}
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
            >
              <span className="nav-link-text">Contatti</span>
              <div className="nav-link-underline" />
            </Link>
          </div>

          {/* Availability Badge */}
          <div className="availability-badge desktop-only" aria-label="Stato disponibilità">
            <div className="status-dot" aria-hidden="true" />
            <span className="status-text">Disponibile</span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-button mobile-only"
            aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
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
                onClick={() => handleMobileItemClick(item)}
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
          <div className="action-line" />
          <p>{selectedItem ? 'TAP AGAIN TO CONFIRM' : 'SELECT YOUR DESTINATION'}</p>
          <div className="action-line" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
