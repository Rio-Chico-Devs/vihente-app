const Footer = ({ onNavigate }) => {
  return (
    <footer
      role="contentinfo"
      aria-label="Informazioni footer"
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '2px solid rgba(0, 255, 255, 0.3)',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        padding: '1.5rem 0',
        zIndex: 50
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <a
            onClick={() => onNavigate && onNavigate('privacy-policy')}
            role="button"
            tabIndex={0}
            aria-label="Vai alla Privacy Policy"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate && onNavigate('privacy-policy');
              }
            }}
            style={{
              color: 'rgba(0, 255, 255, 0.7)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              fontFamily: "'Share Tech Mono', monospace",
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              borderBottom: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0ff';
              e.target.style.borderBottomColor = '#0ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(0, 255, 255, 0.7)';
              e.target.style.borderBottomColor = 'transparent';
            }}
          >
            PRIVACY POLICY
          </a>
          <a
            onClick={() => onNavigate && onNavigate('cookie-policy')}
            role="button"
            tabIndex={0}
            aria-label="Vai alla Cookie Policy"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate && onNavigate('cookie-policy');
              }
            }}
            style={{
              color: 'rgba(0, 255, 255, 0.7)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              fontFamily: "'Share Tech Mono', monospace",
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              borderBottom: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0ff';
              e.target.style.borderBottomColor = '#0ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(0, 255, 255, 0.7)';
              e.target.style.borderBottomColor = 'transparent';
            }}
          >
            COOKIE POLICY
          </a>
        </div>
        <p style={{
          color: 'rgba(103, 232, 249, 0.5)',
          fontSize: '0.875rem',
          letterSpacing: '0.2em',
          fontFamily: "'Share Tech Mono', monospace",
          margin: 0
        }}>
          © 2025 VIHENTE - PER ASPERA AD ASTRA
        </p>
      </div>
    </footer>
  );
};

export default Footer;