import { useNavigate } from 'react-router-dom';
import './SitiWebShowcase.css';

const SitiWebShowcase = () => {
  const navigate = useNavigate();

  const websites = [
    {
      id: 1,
      title: 'RCS Materiali Compositi',
      description: 'Sito vetrina aziendale con CMS personalizzato, codice custom integrato e form preventivi su misura.',
      logo: null,
      technologies: ['WordPress', 'PHP', 'Custom Code', 'JS']
    },
    {
      id: 2,
      title: 'Portfolio Fotografo',
      description: 'Sito portfolio elegante con gallerie dinamiche e booking integrato.',
      logo: null,
      technologies: ['React', 'Next.js', 'Tailwind']
    },
    {
      id: 3,
      title: 'Landing Page SaaS',
      description: 'Landing page moderna per prodotto SaaS con pricing e form contatti.',
      logo: null,
      technologies: ['React', 'Vite', 'Framer Motion']
    }
  ];

  return (
    <div className="sitiweb-showcase">
      <div className="showcase-header">
        <h1 className="showcase-title">Siti Web Realizzati</h1>
        <p className="showcase-subtitle">
          Progetti web professionali realizzati per clienti
        </p>
      </div>

      <div className="websites-grid">
        {websites.map((site) => (
          <div key={site.id} className="website-card">
            <div className="website-image">
              <div className="image-placeholder">
                <span>Screenshot</span>
              </div>
            </div>

            <div className="website-content">
              <h3 className="website-title">{site.title}</h3>
              <p className="website-description">{site.description}</p>

              <div className="tech-stack">
                {site.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>

              <span className="visit-link pending-link">
                Link in attesa di autorizzazione
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="showcase-cta">
        <h2>Vuoi un Sito come Questi?</h2>
        <p>Contattami per un preventivo gratuito</p>
        <button
          className="cta-button"
          onClick={() => navigate('/contatti')}
        >
          Contattami
        </button>
      </div>
    </div>
  );
};

export default SitiWebShowcase;
