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
        <div className="footer-links">
          <Link
            to="/privacy-policy"
            className="footer-link"
            aria-label="Vai alla Privacy Policy"
          >
            PRIVACY POLICY
          </Link>
          <Link
            to="/cookie-policy"
            className="footer-link"
            aria-label="Vai alla Cookie Policy"
          >
            COOKIE POLICY
          </Link>
          <Link
            to="/termini-e-condizioni"
            className="footer-link"
            aria-label="Vai ai Termini e Condizioni"
          >
            TERMINI E CONDIZIONI
          </Link>
        </div>

        <div className="footer-copyright-section">
          <p className="footer-copyright">
            © 2025 VIHENTE - Tutti i diritti riservati
          </p>
          <p className="footer-legal">
            PER ASPERA AD ASTRA
          </p>
          <p className="footer-small">
            Contenuti protetti da diritto d'autore (L. 633/1941).
            Vietata la riproduzione senza autorizzazione scritta.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;