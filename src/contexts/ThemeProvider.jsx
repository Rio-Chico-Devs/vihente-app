import { useState, useEffect, useCallback, useMemo } from 'react';
import ThemeContext from './theme';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('vihente-theme') || 'dark'; }
    catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('vihente-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
      isLight: theme === 'light'
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;