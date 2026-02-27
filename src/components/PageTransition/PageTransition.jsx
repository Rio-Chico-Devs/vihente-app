import { useEffect, useState, cloneElement } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * PageTransition - Transizioni fluide tra pagine
 * Hardware-accelerated per performance ottimali su mobile
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    // FIX: Confronta pathname invece di oggetti location
    if (location.pathname !== displayLocation.pathname) {
      // Fase 1: Fade out
      setTransitionStage('fadeOut');

      // Fase 2: Cambia contenuto e fade in (dopo 250ms)
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayLocation.pathname, location]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {cloneElement(children, { location: displayLocation })}
    </div>
  );
};

export default PageTransition;
