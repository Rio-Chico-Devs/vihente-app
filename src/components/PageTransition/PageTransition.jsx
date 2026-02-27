import { useEffect, useState } from 'react';
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
    if (location !== displayLocation) {
      // Fase 1: Fade out
      setTransitionStage('fadeOut');

      // Fase 2: Cambia contenuto e fade in (dopo 200ms)
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {children}
    </div>
  );
};

export default PageTransition;
