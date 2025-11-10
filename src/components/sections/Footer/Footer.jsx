const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      borderTop: '2px solid rgba(0, 255, 255, 0.3)',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(12px)',
      padding: '1.5rem 0',
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center'
      }}>
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