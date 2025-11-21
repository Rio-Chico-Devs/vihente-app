import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 50, y: 50 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get current page from location
  const currentPage = location.pathname.replace('/vihente-app', '').replace('/', '') || 'landing';

  // 🔍 DEBUG: Component mount
  useEffect(() => {
    console.log('%c╔═══════════════════════════════════════════════════════════════╗', 'color: #00ffff; font-weight: bold');
    console.log('%c║  🚀 NAVBAR DEBUG MODE ACTIVATED                              ║', 'color: #00ffff; font-weight: bold');
    console.log('%c╚═══════════════════════════════════════════════════════════════╝', 'color: #00ffff; font-weight: bold');
    console.log('%c[NAVBAR DEBUG] Navbar mounted', 'color: #00ffff; font-weight: bold', {
      initialPath: location.pathname,
      initialPage: currentPage,
      timestamp: new Date().toISOString()
    });
    return () => {
      console.log('%c[NAVBAR DEBUG] Navbar unmounted', 'color: #ff0000; font-weight: bold');
    };
  }, []);

  // 🔍 DEBUG: Monitor location changes
  useEffect(() => {
    console.log('%c[NAVBAR DEBUG] 🌐 Location changed', 'color: #00ff00; font-weight: bold; font-size: 16px', {
      pathname: location.pathname,
      currentPage,
      timestamp: new Date().toISOString(),
      performanceTime: performance.now()
    });
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00');
  }, [location.pathname, currentPage]);

  // 🔍 DEBUG: Monitor state changes
  useEffect(() => {
    console.log('%c[NAVBAR DEBUG] State changed', 'color: #00ffff; font-weight: bold', {
      mobileMenuOpen,
      selectedItem,
      isTransitioning,
      timestamp: new Date().toISOString()
    });
  }, [mobileMenuOpen, selectedItem, isTransitioning]);

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
    {
      id: 'landing',
      label: 'Home',
      path: '/',
      number: '01'
    },
    {
      id: 'services',
      label: 'Servizi',
      path: '/services',
      number: '02'
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      path: '/portfolio',
      number: '03'
    },
    {
      id: 'storia',
      label: 'La Mia Storia',
      path: '/storia',
      number: '04'
    },
    {
      id: 'contatti',
      label: 'Contatti',
      path: '/contatti',
      number: '05'
    },
  ];

  // Improved transition with proper navigation timing
  const performTransition = (path) => {
    const startTime = performance.now();
    const startTimestamp = new Date().toISOString();

    console.log('%c[NAVBAR DEBUG] 🚀 performTransition START', 'color: #ff00ff; font-weight: bold; font-size: 14px', {
      targetPath: path,
      currentPath: location.pathname,
      startTimestamp,
      performanceTime: startTime
    });

    setIsTransitioning(true);
    console.log('%c[NAVBAR DEBUG] ⏳ isTransitioning = true', 'color: #ffaa00', {
      time: `${(performance.now() - startTime).toFixed(2)}ms`
    });

    // Navigate after a brief moment
    setTimeout(() => {
      const navigateTime = performance.now();
      console.log('%c[NAVBAR DEBUG] 📍 CALLING navigate()', 'color: #ff0000; font-weight: bold; font-size: 14px', {
        path,
        currentPath: location.pathname,
        time: `${(navigateTime - startTime).toFixed(2)}ms`
      });

      navigate(path);

      console.log('%c[NAVBAR DEBUG] ✅ navigate() CALLED', 'color: #00ff00; font-weight: bold', {
        path,
        time: `${(performance.now() - startTime).toFixed(2)}ms`
      });

      window.scrollTo({ top: 0, behavior: 'instant' });
      console.log('%c[NAVBAR DEBUG] 📜 Scrolled to top', 'color: #00aaff', {
        time: `${(performance.now() - startTime).toFixed(2)}ms`
      });
    }, 50);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      console.log('%c[NAVBAR DEBUG] ✨ isTransitioning = false', 'color: #ffaa00', {
        time: `${(performance.now() - startTime).toFixed(2)}ms`
      });
      console.log('%c[NAVBAR DEBUG] 🏁 performTransition END', 'color: #ff00ff; font-weight: bold; font-size: 14px', {
        totalTime: `${(performance.now() - startTime).toFixed(2)}ms`,
        endTimestamp: new Date().toISOString()
      });
    }, 800);
  };

  const handleDesktopNavClick = (e, path) => {
    e.preventDefault();
    console.log('%c[NAVBAR DEBUG] 🖱️ Desktop nav clicked', 'color: #00ff88; font-weight: bold', {
      path,
      isAlreadyActive: isActive(path),
      currentPath: location.pathname
    });
    if (isActive(path)) return;
    performTransition(path);
  };

  const handleMobileItemClick = (item) => {
    const clickTime = performance.now();
    console.log('%c[NAVBAR DEBUG] 👆 Mobile item clicked', 'color: #00ffff; font-weight: bold; font-size: 14px', {
      item: item.label,
      itemId: item.id,
      itemPath: item.path,
      currentSelectedItem: selectedItem,
      isSecondClick: selectedItem === item.id,
      currentPath: location.pathname,
      timestamp: new Date().toISOString()
    });

    if (selectedItem === item.id) {
      console.log('%c[NAVBAR DEBUG] 🎯 SECOND CLICK - Starting navigation', 'color: #ff00ff; font-weight: bold; font-size: 14px', {
        from: location.pathname,
        to: item.path,
        time: `${clickTime.toFixed(2)}ms`
      });

      // Second click - use the same performTransition that desktop uses
      performTransition(item.path);

      // Close menu separately
      setMobileMenuOpen(false);
      console.log('%c[NAVBAR DEBUG] 🚪 Closing mobile menu', 'color: #ffaa00', {
        time: `${(performance.now() - clickTime).toFixed(2)}ms`
      });

      setSelectedItem(null);
      console.log('%c[NAVBAR DEBUG] 🔄 Reset selectedItem', 'color: #ffaa00', {
        time: `${(performance.now() - clickTime).toFixed(2)}ms`
      });
    } else {
      // First click - select
      console.log('%c[NAVBAR DEBUG] ⭐ FIRST CLICK - Selecting item', 'color: #ffff00; font-weight: bold', {
        itemId: item.id,
        itemLabel: item.label
      });
      setSelectedItem(item.id);
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
    } else if (!isActive('/')) {
      e.preventDefault();
      performTransition('/');
    }
  };

  // Helper to check if link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/vihente-app' || location.pathname === '/vihente-app/' || location.pathname === '/';
    }
    return location.pathname.includes(path);
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
                stroke="rgba(0, 255, 255, 0.95)"
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
                  stroke="rgba(0, 255, 255, 0.95)"
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
                  stroke="rgba(0, 255, 255, 0.95)"
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

        <style>{`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s ease;
            backdrop-filter: blur(12px);
            background: rgba(0, 0, 0, 0.7);
            border-bottom: 2px solid rgba(0, 255, 255, 0.3);
          }

          .navbar.scrolled {
            background: rgba(0, 0, 0, 0.85);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3),
                        0 0 20px rgba(6, 182, 212, 0.1);
            border-bottom: 2px solid rgba(0, 255, 255, 0.3);
          }

          .navbar-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 3rem;
            min-height: 70px;
          }

          .navbar-logo {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
            height: 50px;
            overflow: visible;
            flex-shrink: 0;
            margin-left: 2rem;
            text-decoration: none;
          }

          /* Mobile menu: logo-icon ingrandita in alto a sinistra */
          @media (max-width: 768px) {
            .navbar.mobile-menu-active {
              background: transparent;
              backdrop-filter: none;
              border-bottom: none;
            }

            .navbar.mobile-menu-active .navbar-container > *:not(.navbar-logo) {
              opacity: 0;
              pointer-events: none;
            }

            .navbar-logo.menu-open {
              position: fixed;
              top: 2rem;
              left: 2rem;
              margin-left: 0;
              z-index: 1101;
              height: auto;
            }

            .navbar-logo.menu-open .logo-eye {
              width: 140px;
              height: 140px;
            }
          }

          .logo-eye {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .navbar-logo:hover .logo-eye {
            animation: glitchEye 0.4s ease-in-out infinite;
          }

          @keyframes glitchEye {
            0%, 100% {
              transform: translate(-50%, -50%) translate(0, 0);
              opacity: 1;
            }
            15% {
              transform: translate(-50%, -50%) translate(-1px, 1px);
              opacity: 1;
            }
            30% {
              transform: translate(-50%, -50%) translate(1px, -1px);
              opacity: 0.5;
            }
            50% {
              transform: translate(-50%, -50%) translate(-1px, 1px);
              opacity: 1;
            }
            75% {
              transform: translate(-50%, -50%) translate(1px, 0);
              opacity: 0.5;
            }
          }

          .navbar-links {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 2.5rem;
            justify-content: center;
          }

          .nav-link {
            position: relative;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem 0;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }

          .nav-link.disabled {
            cursor: not-allowed;
            opacity: 0.4;
          }

          .nav-link:not(.disabled):hover .nav-link-text {
            color: rgba(103, 232, 249, 1);
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
          }

          .nav-link.active .nav-link-text {
            color: rgba(103, 232, 249, 1);
          }

          .nav-link-text {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.05em;
            transition: all 0.3s ease;
          }

          .nav-link:hover .nav-link-text {
            animation: textGlitch 0.4s ease-in-out infinite;
          }

          @keyframes textGlitch {
            0%, 100% {
              opacity: 1;
            }
            23% {
              opacity: 1;
            }
            25% {
              opacity: 0.5;
            }
            27% {
              opacity: 1;
            }
            64% {
              opacity: 1;
            }
            66% {
              opacity: 0.5;
            }
            68% {
              opacity: 1;
            }
          }

          .nav-link-underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg,
              rgba(6, 182, 212, 0.8),
              rgba(103, 232, 249, 1)
            );
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
          }

          .nav-link:not(.disabled):hover .nav-link-underline,
          .nav-link.active .nav-link-underline {
            width: 100%;
          }

          .availability-badge {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.25rem;
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            animation: tvFlicker 4s infinite;
          }

          @keyframes tvFlicker {
            0%, 100% {
              opacity: 1;
              filter: brightness(1);
            }
            2% {
              opacity: 0.92;
              filter: brightness(0.95);
            }
            4% {
              opacity: 1;
              filter: brightness(1);
            }
            8% {
              opacity: 0.88;
              filter: brightness(0.9);
            }
            10% {
              opacity: 1;
              filter: brightness(1);
            }
            15% {
              opacity: 0.95;
              filter: brightness(0.98);
            }
            17% {
              opacity: 1;
              filter: brightness(1);
            }
            45% {
              opacity: 0.9;
              filter: brightness(0.92);
            }
            47% {
              opacity: 1;
              filter: brightness(1);
            }
            82% {
              opacity: 0.93;
              filter: brightness(0.96);
            }
            84% {
              opacity: 1;
              filter: brightness(1);
            }
          }

          .availability-badge:hover {
            background: rgba(6, 182, 212, 0.15);
            border-color: rgba(103, 232, 249, 0.5);
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }

          .status-dot {
            width: 8px;
            height: 8px;
            background: rgba(34, 197, 94, 1);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.8),
                        0 0 20px rgba(34, 197, 94, 0.4);
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(0.9);
            }
          }

          .status-text {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            color: rgba(103, 232, 249, 0.95);
            letter-spacing: 0.05em;
            font-weight: 500;
          }

          .availability-badge:hover .status-text {
            animation: statusTextGlitch 0.4s ease-in-out infinite;
          }

          @keyframes statusTextGlitch {
            0%, 100% {
              opacity: 1;
            }
            18% {
              opacity: 1;
            }
            20% {
              opacity: 0.5;
            }
            22% {
              opacity: 1;
            }
            56% {
              opacity: 1;
            }
            58% {
              opacity: 0.5;
            }
            60% {
              opacity: 1;
            }
            83% {
              opacity: 1;
            }
            85% {
              opacity: 0.5;
            }
            87% {
              opacity: 1;
            }
          }

          .hamburger-button {
            display: none;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 25px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
          }

          .hamburger-line {
            width: 30px;
            height: 3px;
            background: rgba(0, 255, 255, 0.95);
            border-radius: 2px;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
          }

          .hamburger-line.open:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
          }

          .hamburger-line.open:nth-child(2) {
            opacity: 0;
          }

          .hamburger-line.open:nth-child(3) {
            transform: rotate(-45deg) translate(8px, -8px);
          }

          .desktop-only {
            display: flex;
          }

          .mobile-only {
            display: none;
          }

          @media (max-width: 1024px) {
            .navbar-container {
              padding: 1rem 1.5rem;
              gap: 2rem;
            }

            .navbar-logo {
              margin-left: 1.5rem;
            }

            .navbar-links {
              gap: 2rem;
            }

            .nav-link-text {
              font-size: 0.9rem;
            }

            .availability-badge {
              padding: 0.55rem 1.1rem;
            }

            .status-text {
              font-size: 0.8rem;
            }

            .logo-eye {
              width: 120px;
              height: 120px;
            }
          }

          @media (max-width: 768px) {
            .desktop-only {
              display: none !important;
            }

            .mobile-only {
              display: flex;
            }

            .navbar-container {
              padding: 1rem;
              gap: 1.5rem;
            }

            .navbar-logo {
              margin-left: 1rem;
            }

            .logo-eye {
              width: 100px;
              height: 100px;
            }

            .hamburger-button {
              display: flex;
            }
          }

          @media (max-width: 640px) {
            .navbar-logo {
              margin-left: 0.5rem;
            }

            .logo-eye {
              width: 80px;
              height: 80px;
            }

            .navbar-logo.menu-open {
              top: 1.5rem;
              left: 1rem;
            }

            .navbar-logo.menu-open .logo-eye {
              width: 100px;
              height: 100px;
            }
          }

          @media (max-width: 480px) {
            .navbar-logo {
              margin-left: 0;
            }

            .logo-eye {
              width: 70px;
              height: 70px;
            }

            .navbar-logo.menu-open .logo-eye {
              width: 80px;
              height: 80px;
            }
          }
        `}</style>
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
          {/* Japanese Name Display - IN ALTO A DESTRA */}
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
                onClick={(e) => {
                  console.log('%c[NAVBAR DEBUG] 🖱️ DIV WRAPPER CLICKED', 'color: #ff00ff; font-weight: bold; font-size: 16px', {
                    item: item.label,
                    itemId: item.id,
                    target: e.target,
                    currentTarget: e.currentTarget
                  });
                  handleMobileItemClick(item);
                }}
                onPointerDown={(e) => {
                  console.log('%c[NAVBAR DEBUG] 👉 POINTER DOWN', 'color: #ff8800; font-weight: bold', {
                    item: item.label,
                    pointerType: e.pointerType
                  });
                }}
                onTouchStart={(e) => {
                  console.log('%c[NAVBAR DEBUG] 👆 TOUCH START', 'color: #ffff00; font-weight: bold', {
                    item: item.label,
                    touches: e.touches.length
                  });
                }}
                className={`p4-menu-item ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
                role="button"
                tabIndex={0}
                aria-label={`Vai a ${item.label}`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {/* Number - directly in wrapper */}
                <span className="item-number">{item.number}</span>

                {/* Label - directly in wrapper */}
                <span className="item-label">{item.label}</span>

                {/* Arrow - directly in wrapper */}
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

        <style>{`
          /* Main Overlay */
          .p4-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: 999;
            background: #000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            overflow: hidden;
          }

          .p4-menu-overlay.active {
            display: block;
            opacity: 1;
          }

          /* Menu Header - SOLO SCRITTA A DESTRA */
          .menu-header {
            position: absolute;
            top: 2rem;
            right: 2rem;
            z-index: 1101;
          }

          /* Japanese Name Display - IN ALTO A DESTRA */
          .japanese-name-display {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .name-jp {
            font-family: 'Share Tech Mono', monospace;
            font-size: 3.5rem;
            font-weight: 900;
            color: rgba(0, 255, 255, 1);
            text-shadow:
              0 0 20px rgba(0, 255, 255, 0.8),
              0 0 40px rgba(0, 255, 255, 0.4);
            line-height: 1;
            letter-spacing: 0.1em;
            animation: nameGlow 3s ease-in-out infinite;
          }

          @keyframes nameGlow {
            0%, 100% {
              text-shadow:
                0 0 20px rgba(0, 255, 255, 0.8),
                0 0 40px rgba(0, 255, 255, 0.4);
            }
            50% {
              text-shadow:
                0 0 30px rgba(0, 255, 255, 1),
                0 0 60px rgba(0, 255, 255, 0.6);
            }
          }

          /* Subtle Background Pattern */
          .menu-bg-pattern {
            position: absolute;
            inset: 0;
            background:
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(0, 255, 255, 0.02) 3px,
                rgba(0, 255, 255, 0.02) 4px
              );
            pointer-events: none;
          }

          /* Menu Content */
          .p4-menu-content {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-height: calc(100vh - 260px);
            overflow-y: auto;
            margin-top: 25px;
          }

          .p4-menu-content::-webkit-scrollbar {
            width: 6px;
          }

          .p4-menu-content::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
          }

          .p4-menu-content::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 255, 0.5);
            border-radius: 3px;
          }

          /* Menu Item - Persona Style with Site Colors */
          .p4-menu-item {
            position: relative;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem 2rem;
            background: rgba(0, 10, 15, 0.8);
            border: none;
            clip-path: polygon(
              12px 0,
              100% 0,
              100% calc(100% - 12px),
              calc(100% - 12px) 100%,
              0 100%,
              0 12px
            );
            cursor: pointer;
            overflow: hidden;
            opacity: 0;
            transform: translateX(-100%);
            animation: slideInFromLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          }

          @keyframes slideInFromLeft {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .p4-menu-item:active {
            transform: scale(0.98);
          }

          /* Background Slide Effect - Using ::before pseudo-element */
          .p4-menu-item::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg,
              rgba(0, 255, 255, 0) 0%,
              rgba(0, 255, 255, 0.1) 100%
            );
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: none;
            z-index: 0;
          }

          .p4-menu-item:hover::before,
          .p4-menu-item.current::before {
            transform: translateX(0);
          }

          /* Skewed Background for Selected State - Using ::after pseudo-element */
          .p4-menu-item::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: rgba(0, 255, 255, 0.15);
            transform: skewX(-2deg) scaleX(0);
            transform-origin: left;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: none;
            z-index: 0;
          }

          .p4-menu-item.selected::after {
            transform: skewX(-2deg) scaleX(1);
          }

          /* Number - Large and Bold */
          .item-number {
            position: relative;
            z-index: 1;
            font-family: 'Share Tech Mono', monospace;
            font-size: 3rem;
            font-weight: 900;
            color: rgba(0, 255, 255, 0.3);
            line-height: 1;
            min-width: 80px;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
            pointer-events: none;
          }

          .p4-menu-item:hover .item-number,
          .p4-menu-item.current .item-number {
            color: rgba(0, 255, 255, 0.6);
            transform: scale(1.1);
          }

          .p4-menu-item.selected .item-number {
            color: rgba(0, 255, 255, 1);
            text-shadow:
              0 0 20px rgba(0, 255, 255, 0.8),
              2px 2px 0 rgba(0, 0, 0, 0.5);
            transform: scale(1.15) translateX(-5px);
          }

          /* Label - Bold Typography */
          .item-label {
            position: relative;
            z-index: 1;
            flex: 1;
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.4rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.2;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            pointer-events: none;
          }

          .p4-menu-item:hover .item-label,
          .p4-menu-item.current .item-label {
            color: rgba(0, 255, 255, 0.95);
            transform: translateX(5px);
          }

          .p4-menu-item.selected .item-label {
            color: #fff;
            text-shadow:
              0 0 10px rgba(0, 255, 255, 0.8),
              2px 2px 4px rgba(0, 0, 0, 0.7);
            transform: translateX(10px) scale(1.05);
          }

          /* Arrow Indicator */
          .item-arrow {
            position: relative;
            z-index: 1;
            font-size: 1.5rem;
            color: rgba(0, 255, 255, 0.5);
            transform: translateX(-10px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: none;
          }

          .p4-menu-item:hover .item-arrow,
          .p4-menu-item.current .item-arrow {
            opacity: 0.7;
            transform: translateX(0);
          }

          .p4-menu-item.selected .item-arrow {
            opacity: 1;
            color: rgba(0, 255, 255, 1);
            transform: translateX(5px);
            animation: arrowPulse 0.6s ease-in-out infinite;
          }

          @keyframes arrowPulse {
            0%, 100% {
              transform: translateX(5px);
            }
            50% {
              transform: translateX(10px);
            }
          }

          /* Action Text */
          .p4-action-text {
            position: absolute;
            bottom: 2.5rem;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 0 2rem;
          }

          .action-line {
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg,
              transparent 0%,
              rgba(0, 255, 255, 0.5) 50%,
              transparent 100%
            );
          }

          .p4-action-text p {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.8rem;
            font-weight: 700;
            color: rgba(0, 255, 255, 0.8);
            letter-spacing: 0.15em;
            margin: 0;
            white-space: nowrap;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
          }

          /* Responsive */
          @media (max-width: 480px) {
            .menu-header {
              top: 1.5rem;
              right: 1rem;
            }

            .name-jp {
              font-size: 2.5rem;
            }

            .p4-menu-content {
              padding: 1.5rem 1rem;
              gap: 0.75rem;
              max-height: calc(100vh - 220px);
            }

            .p4-menu-item {
              padding: 1.25rem 1.5rem;
              gap: 1rem;
            }

            .item-number {
              font-size: 2.5rem;
              min-width: 70px;
            }

            .item-label {
              font-size: 1.1rem;
            }

            .item-arrow {
              font-size: 1.25rem;
            }

            .p4-action-text p {
              font-size: 0.7rem;
            }
          }

          @media (max-width: 360px) {
            .name-jp {
              font-size: 2rem;
            }

            .p4-menu-item {
              padding: 1rem 1.25rem;
            }

            .item-number {
              font-size: 2rem;
              min-width: 60px;
            }

            .item-label {
              font-size: 1rem;
            }
          }

          @media (max-width: 700px) {
            .menu-header {
              top: 1.25rem;
            }

            .name-jp {
              font-size: 2.5rem;
            }

            .p4-menu-content {
              gap: 0.5rem;
              max-height: calc(100vh - 200px);
            }

            .p4-menu-item {
              padding: 1rem 1.5rem;
            }

            .item-number {
              font-size: 2.25rem;
            }

            .item-label {
              font-size: 1.1rem;
            }
          }
        `}</style>
      </div>

      {/* TRANSIZIONE LEGGERA E SFUMATA - CYBER-TECH */}
      {isTransitioning && (
        <div className="page-transition-container">
          {/* Overlay principale con fade */}
          <div className="transition-overlay"></div>

          {/* Linee orizzontali sfumate */}
          <div className="transition-lines"></div>

          {/* Glitch leggero */}
          <div className="transition-glitch"></div>

          <style>{`
            .page-transition-container {
              position: fixed;
              top: 90px;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 9999;
              pointer-events: none;
              overflow: hidden;
            }

            @media (max-width: 768px) {
              .page-transition-container {
                top: 0;
              }
            }

            /* Overlay con fade sfumato */
            .transition-overlay {
              position: absolute;
              inset: 0;
              background: radial-gradient(
                ellipse at center,
                rgba(0, 0, 0, 0.95) 0%,
                rgba(0, 10, 15, 0.98) 50%,
                #000 100%
              );
              opacity: 0;
              animation: overlayFade 0.8s ease-in-out forwards;
            }

            @keyframes overlayFade {
              0% {
                opacity: 0;
              }
              40% {
                opacity: 1;
              }
              60% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }

            /* Linee orizzontali sfumate */
            .transition-lines {
              position: absolute;
              inset: 0;
              background: repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(0, 255, 255, 0.15) 3px,
                rgba(0, 255, 255, 0.15) 4px,
                transparent 4px,
                transparent 8px
              );
              opacity: 0;
              animation: linesFade 0.8s ease-in-out forwards;
            }

            @keyframes linesFade {
              0%, 100% {
                opacity: 0;
                transform: translateY(0);
              }
              30% {
                opacity: 0.6;
                transform: translateY(10px);
              }
              70% {
                opacity: 0.6;
                transform: translateY(-10px);
              }
            }

            /* Glitch leggero sui bordi */
            .transition-glitch {
              position: absolute;
              inset: 0;
              opacity: 0;
              animation: glitchFlash 0.8s ease-in-out forwards;
            }

            .transition-glitch::before,
            .transition-glitch::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(0, 255, 255, 0.1) 20%,
                transparent 40%,
                transparent 60%,
                rgba(0, 255, 255, 0.1) 80%,
                transparent 100%
              );
            }

            .transition-glitch::before {
              animation: glitchSlide1 0.8s ease-in-out forwards;
            }

            .transition-glitch::after {
              animation: glitchSlide2 0.8s ease-in-out forwards;
              animation-delay: 0.1s;
            }

            @keyframes glitchFlash {
              0%, 100% {
                opacity: 0;
              }
              40%, 60% {
                opacity: 1;
              }
            }

            @keyframes glitchSlide1 {
              0%, 100% {
                transform: translateX(-100%);
              }
              50% {
                transform: translateX(100%);
              }
            }

            @keyframes glitchSlide2 {
              0%, 100% {
                transform: translateX(100%);
              }
              50% {
                transform: translateX(-100%);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Navbar;