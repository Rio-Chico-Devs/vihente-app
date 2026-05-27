import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimWrapper.css';

const SimWrapper = ({ templateId, templateTitle, accentColor, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('sim-fullscreen-active');
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('sim-fullscreen-active');
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  return (
    <div className="simwrap" style={{ '--sim-accent': accentColor }}>
      <div className="simwrap-close-wrap">
        <button
          className="simwrap-close-x"
          onClick={() => navigate('/showroom')}
          aria-label="Torna allo Showroom"
          title="Torna allo Showroom"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
        <button
          className="simwrap-close-text"
          onClick={() => navigate('/showroom')}
          aria-label="Torna allo Showroom"
        >
          TORNA ALLO<br />SHOWROOM
        </button>
      </div>

      <button
        className="simwrap-choose-float"
        onClick={() => navigate(`/contatti?template=${templateId}`)}
      >
        <span className="simwrap-choose-badge">ANTEPRIMA · {templateTitle}</span>
        <span className="simwrap-choose-action">Scegli modello →</span>
      </button>

      <div className="simwrap-body">{children}</div>
    </div>
  );
};

export default SimWrapper;
