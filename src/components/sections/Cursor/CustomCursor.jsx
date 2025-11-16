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
    
    // 🔥 FORZA z-index inline (massimo valore CSS)
    cursor.style.zIndex = '2147483647';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.display = 'block';
    cursor.style.opacity = '1';
    cursor.style.visibility = 'visible';
    
    document.body.appendChild(cursor);

    console.log('Custom cursor created:', cursor);

    // Update position on mouse move
    const updatePosition = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // 🔥 Ripristina visibilità se necessario
      if (cursor.style.display !== 'block') cursor.style.display = 'block';
      if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
      if (cursor.style.visibility !== 'visible') cursor.style.visibility = 'visible';
      if (cursor.style.zIndex !== '2147483647') cursor.style.zIndex = '2147483647';
    };

    // Click animation
    const handleClick = () => {
      cursor.classList.add('click-effect');
      setTimeout(() => cursor.classList.remove('click-effect'), 300);
    };

    // 🔥 WATCHDOG - Verifica ogni 500ms che il cursore sia visibile
    const watchdog = setInterval(() => {
      if (!document.body.contains(cursor)) {
        console.warn('⚠️ Cursor removed from DOM - re-appending...');
        document.body.appendChild(cursor);
      }
      
      // Verifica e ripristina stili critici
      if (cursor.style.zIndex !== '2147483647') {
        console.warn('⚠️ Cursor z-index changed - restoring...');
        cursor.style.zIndex = '2147483647';
      }
      
      if (cursor.style.display !== 'block') {
        console.warn('⚠️ Cursor hidden - restoring...');
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
      }
      
      if (cursor.style.position !== 'fixed') {
        console.warn('⚠️ Cursor position changed - restoring...');
        cursor.style.position = 'fixed';
      }
    }, 500);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleClick);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      console.log('Cleaning up custom cursor...');
      clearInterval(watchdog);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleClick);
      if (document.body.contains(cursor)) {
        cursor.remove();
      }
      document.body.style.cursor = 'auto';
    };
  }, []);

  return null;
};

export default CustomCursor;