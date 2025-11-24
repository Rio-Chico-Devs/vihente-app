import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SitiWebShowcase.css';

const SitiWebShowcase = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      '<div className="app">',
      'function App() {',
      'return <Component />',
      'export default Router;',
      'import React from "react"',
      'const [state, setState]',
      'useEffect(() => {',
      'navigate("/home")',
    ];

    let activeTimeouts = [];

    function generateCodeLine() {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const x = Math.random() * (window.innerWidth - 250);
      const y = Math.random() * (window.innerHeight - 30);

      const codeLine = document.createElement('div');
      codeLine.className = 'code-line';
      codeLine.textContent = snippet;
      codeLine.style.cssText = `left:${x}px;top:${y}px`;

      const codeBackground = document.getElementById('codeBackgroundSitiWeb');
      if (codeBackground) {
        codeBackground.appendChild(codeLine);
      }

      const removeTimeout = setTimeout(() => {
        if (codeLine.parentNode) {
          codeLine.parentNode.removeChild(codeLine);
        }
      }, 6000);

      activeTimeouts.push(removeTimeout);
    }

    const codeInterval = setInterval(generateCodeLine, 6000);
    const codeTimeout = setTimeout(generateCodeLine, 2000);

    return () => {
      clearInterval(codeInterval);
      clearTimeout(codeTimeout);
      activeTimeouts.forEach(timeout => clearTimeout(timeout));

      const codeBackground = document.getElementById('codeBackgroundSitiWeb');
      if (codeBackground) {
        while (codeBackground.firstChild) {
          codeBackground.removeChild(codeBackground.firstChild);
        }
      }
    };
  }, []);

  const websites = [
    {
      id: 1,
      title: 'E-Commerce Fashion Store',
      description: 'Piattaforma e-commerce completa per brand di moda con sistema di pagamento integrato, gestione inventario e dashboard amministrativa.',
      image: '/path/to/ecommerce-screenshot.jpg',
      url: 'https://example-ecommerce.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      category: 'E-Commerce',
      status: 'live'
    },
    {
      id: 2,
      title: 'Portfolio Fotografo Professionista',
      description: 'Sito portfolio elegante e minimalista con gallerie dinamiche, effetti parallax e sistema di booking integrato.',
      image: '/path/to/portfolio-screenshot.jpg',
      url: 'https://example-photography.com',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      category: 'Portfolio',
      status: 'live'
    },
    {
      id: 3,
      title: 'App Gestionale Aziendale',
      description: 'Applicazione web per la gestione completa di processi aziendali: CRM, fatturazione, gestione progetti e analytics.',
      image: '/path/to/gestionale-screenshot.jpg',
      url: 'https://example-crm.com',
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'GraphQL'],
      category: 'Web App',
      status: 'development'
    },
    {
      id: 4,
      title: 'Sito Corporate Multilingua',
      description: 'Sito aziendale corporate con CMS WordPress personalizzato, supporto multilingua e integrazione newsletter.',
      image: '/path/to/corporate-screenshot.jpg',
      url: 'https://example-corporate.com',
      technologies: ['WordPress', 'PHP', 'WPML', 'ACF'],
      category: 'Corporate',
      status: 'live'
    },
    {
      id: 5,
      title: 'Landing Page Prodotto SaaS',
      description: 'Landing page ad alte conversioni per prodotto SaaS con animazioni moderne, form di registrazione e pricing dinamico.',
      image: '/path/to/saas-screenshot.jpg',
      url: 'https://example-saas.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'EmailJS'],
      category: 'Landing Page',
      status: 'live'
    },
    {
      id: 6,
      title: 'Blog Personale con CMS',
      description: 'Blog personale con sistema di gestione contenuti, categorizzazione, ricerca avanzata e commenti moderati.',
      image: '/path/to/blog-screenshot.jpg',
      url: 'https://example-blog.com',
      technologies: ['Gatsby', 'Contentful', 'React', 'GraphQL'],
      category: 'Blog',
      status: 'live'
    }
  ];

  const categories = ['all', 'E-Commerce', 'Portfolio', 'Web App', 'Corporate', 'Landing Page', 'Blog'];

  const filteredWebsites = selectedFilter === 'all' 
    ? websites 
    : websites.filter(site => site.category === selectedFilter);

  return (
    <div className="sitiweb-showcase-wrapper">
      {/* Background effects */}
      <div className="code-background" id="codeBackgroundSitiWeb"></div>
      <div className="showcase-grid-overlay"></div>

      {/* Header */}
      <header className="showcase-header">
        <button 
          className="back-button"
          onClick={() => navigate('/portfolio')}
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Torna al Portfolio</span>
        </button>

        <div className="header-content">
          <div className="header-icon">
            <div className="icon-siti-showcase">
              <div className="binary-row">
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">1</div>
              </div>
              <div className="binary-row">
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">0</div>
              </div>
              <div className="binary-row">
                <div className="binary-digit">1</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
              </div>
            </div>
          </div>
          <h1 className="showcase-title">Siti Web</h1>
          <p className="showcase-subtitle">Portfolio di progetti web realizzati</p>
        </div>
      </header>

      {/* Filter buttons */}
      <div className="filter-container">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-button ${selectedFilter === cat ? 'active' : ''}`}
            onClick={() => setSelectedFilter(cat)}
          >
            {cat === 'all' ? 'Tutti' : cat}
          </button>
        ))}
      </div>

      {/* Websites grid */}
      <div className="websites-grid">
        {filteredWebsites.map(website => (
          <div key={website.id} className="website-card">
            <div className="website-image-container">
              <div 
                className="website-image" 
                style={{ backgroundImage: `url(${website.image})` }}
              >
                <div className="image-placeholder">
                  <span className="placeholder-icon">🖼️</span>
                  <span className="placeholder-text">Screenshot</span>
                </div>
              </div>
              
              {/* Overlay on hover */}
              <div className="website-overlay">
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="visit-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="visit-icon">🔗</span>
                  Visita Sito
                </a>
              </div>

              {/* Status badge */}
              <div className={`status-badge status-${website.status}`}>
                {website.status === 'live' ? '● Live' : '◐ In Development'}
              </div>
            </div>

            <div className="website-info">
              <div className="category-tag">{website.category}</div>
              <h3 className="website-title">{website.title}</h3>
              <p className="website-description">{website.description}</p>

              {/* Tech stack */}
              <div className="tech-stack">
                {website.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="showcase-cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Hai un Progetto in Mente?</h2>
          <p className="cta-text">
            Trasformiamo la tua idea in un sito web professionale e performante
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/contatti')}
          >
            Inizia il Tuo Progetto
          </button>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="footer-spacer"></div>
    </div>
  );
};

export default SitiWebShowcase;