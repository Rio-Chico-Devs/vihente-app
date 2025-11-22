import { useTheme } from '../../contexts/theme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'night' : 'neon'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${theme}`}>
          {theme === 'dark' ? (
            // NEON MODE - Icona fulmine/energia
            <svg viewBox="0 0 24 24" className="theme-icon">
              <path 
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // NIGHT MODE - Icona luna
            <svg viewBox="0 0 24 24" className="theme-icon">
              <path 
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="theme-label">{theme === 'dark' ? 'Neon' : 'Night'}</span>
    </button>
  );
};

export default ThemeToggle;