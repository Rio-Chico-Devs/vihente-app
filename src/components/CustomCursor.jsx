import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    console.log('🎯 CustomCursor mounted!');
    
    // Skip su dispositivi touch
    if ('ontouchstart' in window) {
      console.log('❌ Touch device - cursor disabled');
      return;
    }

    // Crea cursore
    const cursor = document.createElement('div');
    cursor.innerHTML = '🎯'; // Emoji come fallback visibile
    cursor.style.cssText = `
      position: fixed;
      font-size: 30px;
      pointer-events: none;
      z-index: 9999999;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    console.log('✅ Cursor created');

    // Movimento
    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    document.addEventListener('mousemove', move);
    console.log('✅ Listener added');

    // Nascondi cursore normale
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      console.log('🧹 Cursor cleanup');
      document.removeEventListener('mousemove', move);
      cursor.remove();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return null;
};

export default CustomCursor;