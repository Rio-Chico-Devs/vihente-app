import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // 📱 SKIP COMPLETO su dispositivi touch - controllo multiplo
    const isTouchDevice = (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      navigator.msMaxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
    
    if (isTouchDevice) {
      console.log('Touch device detected - custom cursor disabled');
      return; // ❌ NON crea il cursore
    }

    console.log('Desktop detected - initializing custom cursor...');

    // Create cursor dot
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);

    console.log('Custom cursor created:', cursor);

    // Update position on mouse move
    const updatePosition = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    // Click animation
    const handleClick = () => {
      cursor.classList.add('click-effect');
      setTimeout(() => cursor.classList.remove('click-effect'), 300);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleClick);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      console.log('Cleaning up custom cursor...');
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleClick);
      cursor.remove();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return null;
};

export default CustomCursor;