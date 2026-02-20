import './GraficheCard.css';

const GraficheCard = () => {
  return (
    <div className="grafiche-card">
      {/* Eye logo centrale */}
      <svg className="grafiche-eye" viewBox="0 0 100 100" width="80" height="80">
        <defs>
          <filter id="graficheGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
          fill="none"
          stroke="#0ff"
          strokeWidth="1.5"
          filter="url(#graficheGlow)"
        />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#0ff" strokeWidth="1" filter="url(#graficheGlow)"/>
        <circle cx="50" cy="50" r="3.5" fill="none" stroke="#0ff" strokeWidth="0.8" filter="url(#graficheGlow)"/>
      </svg>

      {/* VIHENTE title */}
      <h2 className="grafiche-title">VIHENTE</h2>
      <p className="grafiche-subtitle">GRAPHIC DESIGN</p>

      {/* Color palette */}
      <div className="grafiche-palette">
        <div className="palette-color" style={{ background: '#0ff' }}></div>
        <div className="palette-color" style={{ background: '#00ffaa' }}></div>
        <div className="palette-color" style={{ background: '#00aaff' }}></div>
        <div className="palette-color" style={{ background: '#0088ff' }}></div>
        <div className="palette-color" style={{ background: '#0066ff' }}></div>
      </div>

      {/* Design tools icons */}
      <div className="grafiche-tools">
        {/* Pen tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <path d="M 3 21 L 9 15 L 15 21 L 21 3 L 3 9 Z" fill="none" stroke="#0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Brush tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <path d="M 12 2 L 12 16 M 8 12 L 16 12" stroke="#0ff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="19" r="3" fill="none" stroke="#0ff" strokeWidth="1.5"/>
        </svg>

        {/* Shape tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <rect x="4" y="4" width="16" height="16" fill="none" stroke="#0ff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" fill="none" stroke="#0ff" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Hexagonal grid decoration */}
      <div className="grafiche-hex-grid"></div>
    </div>
  );
};

export default GraficheCard;
