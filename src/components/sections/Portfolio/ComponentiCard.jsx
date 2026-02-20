import './ComponentiCard.css';

const ComponentiCard = () => {
  return (
    <div className="componenti-card">
      {/* Eye logo */}
      <svg className="componenti-eye" viewBox="0 0 100 100" width="50" height="50">
        <defs>
          <filter id="componentiGlow">
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
          filter="url(#componentiGlow)"
        />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#0ff" strokeWidth="1" filter="url(#componentiGlow)"/>
        <circle cx="50" cy="50" r="3.5" fill="none" stroke="#0ff" strokeWidth="0.8" filter="url(#componentiGlow)"/>
      </svg>

      {/* Title */}
      <h2 className="componenti-title">VIHENTE</h2>
      <p className="componenti-subtitle">WEB COMPONENTS</p>

      {/* Code snippets */}
      <div className="componenti-code-container">
        <div className="code-line">
          <span className="code-keyword">import</span>
          <span className="code-text"> React </span>
          <span className="code-keyword">from</span>
          <span className="code-string"> 'react'</span>
        </div>

        <div className="code-line">
          <span className="code-keyword">const</span>
          <span className="code-function"> Component</span>
          <span className="code-text"> = () =&gt; {'{'}</span>
        </div>

        <div className="code-line code-indent">
          <span className="code-keyword">return</span>
          <span className="code-text"> &lt;</span>
          <span className="code-tag">div</span>
          <span className="code-text">&gt;</span>
        </div>

        <div className="code-line code-indent-2">
          <span className="code-text">&lt;</span>
          <span className="code-tag">Eye</span>
          <span className="code-text"> /&gt;</span>
        </div>

        <div className="code-line code-indent">
          <span className="code-text">&lt;/</span>
          <span className="code-tag">div</span>
          <span className="code-text">&gt;</span>
        </div>

        <div className="code-line">
          <span className="code-text">{'}'}</span>
        </div>
      </div>

      {/* Component tree decoration */}
      <div className="componenti-tree">
        <svg viewBox="0 0 200 50" width="120" height="30">
          <defs>
            <filter id="treeGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Tree lines */}
          <line x1="100" y1="5" x2="100" y2="15" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="100" y1="15" x2="50" y2="30" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="100" y1="15" x2="150" y2="30" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="50" y1="30" x2="30" y2="45" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="50" y1="30" x2="70" y2="45" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="150" y1="30" x2="130" y2="45" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>
          <line x1="150" y1="30" x2="170" y2="45" stroke="#0ff" strokeWidth="1.5" filter="url(#treeGlow)"/>

          {/* Tree nodes */}
          <circle cx="100" cy="5" r="3" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="50" cy="30" r="3" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="150" cy="30" r="3" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="30" cy="45" r="2.5" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="70" cy="45" r="2.5" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="130" cy="45" r="2.5" fill="#0ff" filter="url(#treeGlow)"/>
          <circle cx="170" cy="45" r="2.5" fill="#0ff" filter="url(#treeGlow)"/>
        </svg>
      </div>
    </div>
  );
};

export default ComponentiCard;
