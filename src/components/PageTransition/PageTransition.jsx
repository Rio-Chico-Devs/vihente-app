import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * PageTransition - Wrapper semplice per transizioni
 * NON usa displayChildren per permettere a Suspense di funzionare correttamente
 * Suspense mostrerà LoadingSpinner durante lazy loading su mobile
 */
const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediato su ogni cambio pagina
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Renderizza direttamente children senza state intermedio
  // Questo permette a Suspense di intercettare e mostrare fallback
  return (
    <div className="page-transition-wrapper" key={location.pathname}>
      {children}
    </div>
  );
};

export default PageTransition;
