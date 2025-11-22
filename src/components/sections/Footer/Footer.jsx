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
        </div>
        <p className="footer-copyright">
          © 2025 VIHENTE - PER ASPERA AD ASTRA
        </p>
      </div>
    </footer>
  );
};

export default Footer;