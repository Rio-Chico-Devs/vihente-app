import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default PageTransition;
