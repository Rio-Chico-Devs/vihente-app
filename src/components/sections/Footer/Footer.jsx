import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      role="contentinfo"
      aria-label="Informazioni footer"
    >
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link" aria-label="Vai alla Privacy Policy">
              PRIVACY
            </Link>
            <Link to="/cookie-policy" className="footer-link" aria-label="Vai alla Cookie Policy">
              COOKIE
            </Link>
            <Link to="/termini-e-condizioni" className="footer-link" aria-label="Vai ai Termini e Condizioni">
              TERMINI
            </Link>
          </div>

          <div className="footer-info">
            <span className="footer-info-item">P.IVA: [P.IVA]</span>
            <span className="footer-divider">|</span>
            <span className="footer-info-item">Email: <a href="mailto:[TUA-EMAIL]" className="footer-email">[EMAIL]</a></span>
          </div>

          <div className="footer-social">
            <a 
              href="https://instagram.com/[USERNAME]" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/[USERNAME]" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com/[USERNAME]" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 VIHENTE - Tutti i diritti riservati • PER ASPERA AD ASTRA
          </p>
          <p className="footer-legal-small">
            Contenuti protetti da L. 633/1941
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
