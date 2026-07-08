import { useEffect } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';

const CustomCursor = () => {
  const { systemCursor } = useSettings();

  useEffect(() => {
    const isTouchDevice = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );

    if (isTouchDevice) return;

    // Opt-out accessibilita' (Impostazioni -> "Cursore di sistema"):
    // la classe sul body riattiva i cursori nativi via CSS (index.css)
    // e il dot custom non viene montato.
    if (systemCursor) {
      document.body.classList.add('system-cursor');
      return () => document.body.classList.remove('system-cursor');
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor-dot';
    cursor.style.cssText = 'z-index:2147483647;position:fixed;pointer-events:none';

    document.body.appendChild(cursor);

    let rafId = null;
    let clickTimeoutId = null;
    const updatePosition = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        rafId = null;
      });
    };

    const handleClick = () => {
      cursor.classList.add('click-effect');
      clearTimeout(clickTimeoutId);
      clickTimeoutId = setTimeout(() => cursor.classList.remove('click-effect'), 300);
    };

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleClick);

    document.body.style.cursor = 'none';

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(clickTimeoutId);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleClick);
      if (document.body.contains(cursor)) cursor.remove();
      document.body.style.cursor = 'auto';
    };
  }, [systemCursor]);

  return null;
};

export default CustomCursor;
