import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // ✅ FIX: Aggiunto _ prefix per indicare parametro intenzionalmente non usato
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you could send to error tracking service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Se hai passato un fallback custom come prop, usalo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Altrimenti usa il fallback di default
      return (
        <div style={styles.container}>
          <div style={styles.gridOverlay}></div>

          <div style={styles.errorBox}>
            <div style={styles.iconContainer}>
              <svg
                style={styles.icon}
                viewBox="0 0 100 100"
                width="80"
                height="80"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 50, 50, 0.8)"
                  strokeWidth="3"
                />
                <path
                  d="M 30,30 L 70,70 M 70,30 L 30,70"
                  stroke="rgba(255, 50, 50, 0.8)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 style={styles.title}>Errore di Sistema</h1>
            <p style={styles.message}>
              Si è verificato un errore imprevisto nell'applicazione.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Dettagli Tecnici</summary>
                <div style={styles.errorDetails}>
                  <p style={styles.errorMessage}>
                    <strong>Errore:</strong> {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre style={styles.stackTrace}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div style={styles.buttonGroup}>
              <button
                style={styles.button}
                onClick={this.handleReset}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 255, 255, 0.3)';
                  e.target.style.borderColor = '#0ff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
                }}
              >
                Riprova
              </button>
              <button
                style={styles.buttonSecondary}
                onClick={() => window.location.href = '/'}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                Torna alla Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#000',
    color: '#fff',
    fontFamily: "'Share Tech Mono', monospace",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  gridOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="86.6" height="100" viewBox="0 0 86.6 100"><path d="M43.3 0 L86.6 25 L86.6 75 L43.3 100 L0 75 L0 25 Z" fill="none" stroke="rgba(0,255,255,0.08)" stroke-width="1"/></svg>')`,
    backgroundSize: '86.6px 100px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.6
  },
  errorBox: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '600px',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid rgba(255, 50, 50, 0.5)',
    borderRadius: '8px',
    padding: '3rem 2rem',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 40px rgba(255, 50, 50, 0.3)'
  },
  iconContainer: {
    marginBottom: '1.5rem'
  },
  icon: {
    filter: 'drop-shadow(0 0 10px rgba(255, 50, 50, 0.6))',
    animation: 'pulse 2s ease-in-out infinite'
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: 'rgba(255, 50, 50, 0.9)',
    margin: '0 0 1rem 0',
    textShadow: '0 0 10px rgba(255, 50, 50, 0.6)'
  },
  message: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
    margin: '0 0 2rem 0'
  },
  details: {
    textAlign: 'left',
    marginBottom: '2rem',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '4px',
    padding: '1rem'
  },
  summary: {
    cursor: 'pointer',
    color: '#0ff',
    fontWeight: 700,
    marginBottom: '1rem',
    outline: 'none'
  },
  errorDetails: {
    marginTop: '1rem'
  },
  errorMessage: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '0.5rem'
  },
  stackTrace: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '0.5rem',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    background: 'rgba(0, 255, 255, 0.1)',
    border: '2px solid rgba(0, 255, 255, 0.5)',
    color: '#0ff',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '1rem',
    padding: '0.8rem 2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
    fontWeight: 700
  },
  buttonSecondary: {
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: '#fff',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '1rem',
    padding: '0.8rem 2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '4px'
  }
};

export default ErrorBoundary;