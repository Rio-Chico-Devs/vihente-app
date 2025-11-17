import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentShowcase from './ComponentShowcase/ComponentShowcase';
import './PortfolioComponentiPage.css';

const PortfolioComponentiPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('portfolio-componenti-body');
    return () => {
      document.body.classList.remove('portfolio-componenti-body');
    };
  }, []);

  return (
    <div className="portfolio-componenti-wrapper">
      {/* Back button */}
      <button className="back-to-portfolio" onClick={() => navigate('/portfolio')}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span>Torna al Portfolio</span>
      </button>

      {/* Component Showcase */}
      <ComponentShowcase />
    </div>
  );
};

export default PortfolioComponentiPage;