import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * PageTransition - Transizioni fluide tra pagine
 * Usa il pathname come chiave per forzare il re-render
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [displayChildren, setDisplayChildren] = useState(children);
  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentKey) {
      // Fade out
      setTransitionStage('fadeOut');

      const timer = setTimeout(() => {
        // Aggiorna contenuto e chiave
        setDisplayChildren(children);
        setCurrentKey(location.pathname);
        setTransitionStage('fadeIn');
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentKey, children]);

  return (
    <div className={`page-transition ${transitionStage}`} key={currentKey}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
