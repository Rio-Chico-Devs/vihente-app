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
    console.log(`🔄 [PageTransition] Location changed to: ${location.pathname}`);
    const start = performance.now();

    // Scroll to top immediato su ogni cambio pagina
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      const duration = performance.now() - start;
      console.log(`🔄 [PageTransition] Unmounting after ${duration.toFixed(2)}ms`);
    };
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
