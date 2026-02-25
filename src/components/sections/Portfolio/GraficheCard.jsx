import './GraficheCard.css';

const GraficheCard = ({ theme = 'dark' }) => {
  // Theme colors - SOLO il colore primario cambia
  const primaryColor = theme === 'light' ? '#e8a030' : '#0ff';

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
          stroke={primaryColor}
          strokeWidth="1.5"
          filter="url(#graficheGlow)"
        />
        <circle cx="50" cy="50" r="8" fill="none" stroke={primaryColor} strokeWidth="1" filter="url(#graficheGlow)"/>
        <circle cx="50" cy="50" r="3.5" fill="none" stroke={primaryColor} strokeWidth="0.8" filter="url(#graficheGlow)"/>
      </svg>

      {/* VIHENTE title */}
      <h2 className="grafiche-title" style={{ color: primaryColor, textShadow: `0 0 10px ${primaryColor}80, 0 0 20px ${primaryColor}40` }}>
        VIHENTE
      </h2>
      <p className="grafiche-subtitle" style={{ color: `${primaryColor}b3` }}>GRAPHIC DESIGN</p>

      {/* Color palette */}
      <div className="grafiche-palette">
        {theme === 'light'
          ? ['#e8a030', '#f59e0b', '#d97706', '#ca8a04', '#a16207'].map((color, i) => (
              <div key={i} className="palette-color" style={{ background: color, borderColor: `${primaryColor}4d` }}></div>
            ))
          : ['#0ff', '#00ffaa', '#00aaff', '#0088ff', '#0066ff'].map((color, i) => (
              <div key={i} className="palette-color" style={{ background: color }}></div>
            ))
        }
      </div>

      {/* Design tools icons */}
      <div className="grafiche-tools">
        {/* Pen tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <path d="M 3 21 L 9 15 L 15 21 L 21 3 L 3 9 Z" fill="none" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Brush tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <path d="M 12 2 L 12 16 M 8 12 L 16 12" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="19" r="3" fill="none" stroke={primaryColor} strokeWidth="1.5"/>
        </svg>

        {/* Shape tool */}
        <svg className="tool-icon" viewBox="0 0 24 24" width="20" height="20">
          <rect x="4" y="4" width="16" height="16" fill="none" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" fill="none" stroke={primaryColor} strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Hexagonal grid decoration */}
      <div className="grafiche-hex-grid"></div>
    </div>
  );
};

export default GraficheCard;
