import './GoogleMockup.css';

const GoogleMockup = () => {
  return (
    <div className="google-mockup">
      {/* Eye logo */}
      <svg className="mockup-eye" viewBox="0 0 100 100" width="60" height="60">
        <defs>
          <filter id="mockupGlow">
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
          filter="url(#mockupGlow)"
        />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#0ff" strokeWidth="1" filter="url(#mockupGlow)"/>
        <circle cx="50" cy="50" r="3.5" fill="none" stroke="#0ff" strokeWidth="0.8" filter="url(#mockupGlow)"/>
      </svg>

      {/* VIHENTE title */}
      <h1 className="mockup-title">VIHENTE</h1>

      {/* Search bar */}
      <div className="mockup-search">
        <input
          type="text"
          className="mockup-input"
          placeholder="Cerca nel web..."
          readOnly
        />
        <svg className="mockup-search-icon" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="11" cy="11" r="8" fill="none" stroke="#0ff" strokeWidth="2"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#0ff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Buttons */}
      <div className="mockup-buttons">
        <button className="mockup-btn">CERCA CON VIHENTE</button>
        <button className="mockup-btn">MI SENTO FORTUNATO</button>
      </div>
    </div>
  );
};

export default GoogleMockup;
