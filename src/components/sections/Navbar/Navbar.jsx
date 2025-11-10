import { useState, useEffect } from 'react';

const Navbar = ({ currentPage = 'landing', onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 50, y: 50 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
      // Get navbar logo position
      const logo = document.querySelector('.navbar-logo');
      if (!logo) return;

      const logoRect = logo.getBoundingClientRect();
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      // Calculate angle from logo to cursor
      const deltaX = e.clientX - logoCenterX;
      const deltaY = e.clientY - logoCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Movement constraints for elliptical boundary
      const maxRadiusX = 8; // horizontal movement
      const maxRadiusY = 6; // vertical movement

      // Calculate new position
      let newX = 50 + Math.cos(angle) * maxRadiusX;
      let newY = 50 + Math.sin(angle) * maxRadiusY;

      // Clamp to keep small circle visible (r=7 for small circle)
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
      // Random direction
      const randomAngle = Math.random() * Math.PI * 2;
      const randomDistance = Math.random() * 0.7; // 70% of max distance

      const newX = 50 + Math.cos(randomAngle) * 8 * randomDistance;
      const newY = 50 + Math.sin(randomAngle) * 6 * randomDistance;

      setPupilPosition({ x: newX, y: newY });

      // Return to center after a moment
      setTimeout(() => {
        setPupilPosition({ x: 50, y: 50 });
      }, 1000 + Math.random() * 1000);
    };

    // Look around every 5-8 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance
        lookAround();
      }
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Random blinking - realistic frequency (4-6 seconds)
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 100); // Quick blink like real eye
    };

    // Blink every 4-6 seconds (realistic human rate)
    const interval = setInterval(() => {
      blink();
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  // Navigate to page
  const navigateToPage = (page) => {
    if (onNavigate && page !== 'disabled') {
      onNavigate(page);
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Mobile menu navigation items
  const navItems = [
    { id: 'landing', label: 'Home', angle: 0 },
    { id: 'services', label: 'Servizi', angle: 72 },
    { id: 'portfolio', label: 'Portfolio', angle: 144 },
    { id: 'storia', label: 'La Mia Storia', angle: 216 },
    { id: 'contatti', label: 'Contatti', angle: 288 },
  ];

  const handleMobileItemClick = (item) => {
    if (selectedItem === item.id) {
      // Second click - navigate
      navigateToPage(item.id);
      setMobileMenuOpen(false);
      setSelectedItem(null);
    } else {
      // First click - select
      setSelectedItem(item.id);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <div className="navbar-container">
          {/* Logo - Three Circles Eye with Tracking - VERY LARGE */}
          <div 
            className={`navbar-logo ${mobileMenuOpen ? 'menu-open' : ''}`}
            onClick={() => navigateToPage('landing')}
          >
            <svg className="logo-eye" viewBox="0 0 100 100" width="150" height="150">
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
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links desktop-only">
            <button
              className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
              onClick={() => navigateToPage('services')}
            >
              <span className="nav-link-text">Servizi</span>
              <div className="nav-link-underline" />
            </button>
            
            {/* ✅ ATTIVATO - Portfolio */}
            <button
              className={`nav-link ${currentPage === 'portfolio' ? 'active' : ''}`}
              onClick={() => navigateToPage('portfolio')}
            >
              <span className="nav-link-text">Portfolio</span>
              <div className="nav-link-underline" />
            </button>
            
            {/* ✅ ATTIVATO - La Mia Storia */}
            <button
              className={`nav-link ${currentPage === 'storia' ? 'active' : ''}`}
              onClick={() => navigateToPage('storia')}
            >
              <span className="nav-link-text">La Mia Storia</span>
              <div className="nav-link-underline" />
            </button>
            
            {/* ✅ ATTIVATO - Contatti */}
            <button
              className={`nav-link ${currentPage === 'contatti' ? 'active' : ''}`}
              onClick={() => navigateToPage('contatti')}
            >
              <span className="nav-link-text">Contatti</span>
              <div className="nav-link-underline" />
            </button>
          </div>

          {/* Availability Badge */}
          <div className="availability-badge desktop-only">
            <div className="status-dot" />
            <span className="status-text">Disponibile</span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-button mobile-only"
            aria-label="Toggle menu"
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
            min-height: 70px; /* Fixed height */
          }

          /* Logo - Eye Icon properly aligned */
          .navbar-logo {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
            /* Constrain to not affect navbar height */
            height: 50px;
            overflow: visible;
            flex-shrink: 0;
            margin-left: 2rem; /* Distance from left edge */
          }

          /* 🎯 When mobile menu is open, move eye to center and hide navbar */
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
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              margin-left: 0;
              z-index: 1001;
              height: auto;
            }

            .navbar-logo.menu-open .logo-eye {
              position: relative;
              transform: none;
              width: 150px;
              height: 150px;
            }
          }

          .logo-eye {
            display: block;
            /* Position to overflow beyond container */
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

          /* Navigation Links */
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

          /* Availability Badge with Old TV Flickering */
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

          /* 🍔 HAMBURGER BUTTON */
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

          /* Desktop/Mobile visibility toggles */
          .desktop-only {
            display: flex;
          }

          .mobile-only {
            display: none;
          }

          /* 📱 MOBILE RESPONSIVE */
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
            /* Hide desktop elements */
            .desktop-only {
              display: none !important;
            }

            /* Show mobile elements */
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
          }

          @media (max-width: 480px) {
            .navbar-logo {
              margin-left: 0;
            }

            .logo-eye {
              width: 70px;
              height: 70px;
            }
          }
        `}</style>
      </nav>

      {/* 🍔 MOBILE CIRCULAR MENU */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target.classList.contains('mobile-menu-overlay')) {
            setMobileMenuOpen(false);
            setSelectedItem(null);
          }
        }}
      >
        <div className="mobile-menu-content">
          {/* Rotating Navigation Items */}
          {navItems.map((item) => {
            const radius = 140; // Distance from center
            const angleRad = (item.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isSelected = selectedItem === item.id;
            const scale = isSelected ? 1.3 : 1;

            return (
              <button
                key={item.id}
                onClick={() => handleMobileItemClick(item)}
                className="mobile-nav-item"
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  fontSize: isSelected ? '1.2rem' : '1rem',
                  textShadow: isSelected 
                    ? '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)' 
                    : '0 0 10px rgba(0, 255, 255, 0.5)',
                  opacity: isSelected ? 1 : 0.7,
                }}
              >
                {item.label}
              </button>
            );
          })}

          {/* Instruction text */}
          <div className="mobile-menu-instruction">
            <p>
              {selectedItem ? 'Premi di nuovo per navigare' : 'Premi per selezionare'}
            </p>
          </div>
        </div>

        <style>{`
          .mobile-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: 999;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            display: none;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease;
          }

          .mobile-menu-overlay.active {
            display: flex;
          }

          .mobile-menu-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-nav-item {
            position: absolute;
            font-family: 'Share Tech Mono', monospace;
            color: rgba(0, 255, 255, 0.95);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            padding: 0.5rem 1rem;
            z-index: 1;
          }

          .mobile-menu-instruction {
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            text-align: center;
          }

          .mobile-menu-instruction p {
            font-family: 'Share Tech Mono', monospace;
            color: rgba(0, 255, 255, 0.6);
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    </>
  );
};

export default Navbar;