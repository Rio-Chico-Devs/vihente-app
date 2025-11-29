import { useNavigate } from 'react-router-dom';
import './SitiWebShowcase.css';

const SitiWebShowcase = () => {
  const navigate = useNavigate();

  // 🎯 Array semplice di siti - Facile da aggiornare
  const websites = [
    {
      id: 1,
      title: 'RCS Materiali Compositi',
      description: 'Sito vetrina aziendale con CMS personalizzato, codice custom integrato e form preventivi su misura.',
      image: '/placeholder-rcs.jpg', // Cambia con screenshot del sito
      logo: '/rcs-logo.png', // ← Metti qui il logo RCS
      url: 'https://rcsmaterialicompositi.com', // ← URL reale
      technologies: ['WordPress', 'PHP', 'Custom Code', 'JS']
    },
    {
      id: 2,
      title: 'Portfolio Fotografo',
      description: 'Sito portfolio elegante con gallerie dinamiche e booking integrato.',
      image: '/placeholder-portfolio.jpg',
      logo: null, // Nessun logo
      url: 'https://example.com',
      technologies: ['React', 'Next.js', 'Tailwind']
    },
    {
      id: 3,
      title: 'Landing Page SaaS',
      description: 'Landing page moderna per prodotto SaaS con pricing e form contatti.',
      image: '/placeholder-saas.jpg',
      logo: null, // Nessun logo
      url: 'https://example.com',
      technologies: ['React', 'Vite', 'Framer Motion']
    }
  ];

  return (
    <div className="sitiweb-showcase">
      {/* Header */}
      <div className="showcase-header">
        <button 
          className="back-button"
          onClick={() => navigate('/portfolio')}
        >
          ← Torna al Portfolio
        </button>
        
        <h1 className="showcase-title">Siti Web Realizzati</h1>
        <p className="showcase-subtitle">
          Progetti web professionali realizzati per clienti
        </p>
      </div>

      {/* Griglia Siti */}
      <div className="websites-grid">
        {websites.map((site) => (
          <div key={site.id} className="website-card">
            {/* Immagine */}
            <div className="website-image">
              <div className="image-placeholder">
                <span>Screenshot</span>
              </div>
              
              {/* Logo Azienda (se presente) */}
              {site.logo && (
                <div className="company-logo">
                  <img src={site.logo} alt={`${site.title} logo`} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="website-content">
              <h3 className="website-title">{site.title}</h3>
              <p className="website-description">{site.description}</p>

              {/* Tech Stack */}
              <div className="tech-stack">
                {site.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>

              {/* Link */}
              <a 
                href={site.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="visit-link"
              >
                Visita Sito →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="showcase-cta">
        <h2>Vuoi un Sito come Questi?</h2>
        <p>Contattami per un preventivo gratuito</p>
        <button 
          className="cta-button"
          onClick={() => navigate('/contatti')}
        >
          Richiedi Preventivo
        </button>
      </div>
    </div>
  );
};

export default SitiWebShowcase;