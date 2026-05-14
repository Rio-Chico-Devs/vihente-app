import { useNavigate } from 'react-router-dom';
import './SimWrapper.css';

const SimWrapper = ({ templateId, templateTitle, accentColor, children }) => {
  const navigate = useNavigate();

  return (
    <div className="simwrap">
      <div className="simwrap-bar" style={{ '--sim-accent': accentColor }}>
        <button className="simwrap-back" onClick={() => navigate('/showroom')}>
          ← Showroom
        </button>
        <div className="simwrap-label">
          <span className="simwrap-badge">ANTEPRIMA INTERATTIVA</span>
          <span className="simwrap-name">{templateTitle}</span>
        </div>
        <button
          className="simwrap-choose"
          onClick={() => navigate(`/contatti?template=${templateId}`)}
        >
          Scegli modello →
        </button>
      </div>
      <div className="simwrap-body">{children}</div>
    </div>
  );
};

export default SimWrapper;
