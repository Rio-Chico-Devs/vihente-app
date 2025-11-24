import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PresenzaOnlinePage.css';

const PresenzaOnlinePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('presenza-detail-body');
    return () => {
      document.body.classList.remove('presenza-detail-body');
    };
  }, []);

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      'const engagement = {',
      'function shareContent() {',
      'return visibility;',
      'export default Social;',
      'class CommunityManager {'
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
      
      const codeBackground = document.getElementById('codeBackground');
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
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        while (codeBackground.firstChild) {
          codeBackground.removeChild(codeBackground.firstChild);
        }
      }
    };
  }, []);

  const platforms = [
    {
      name: 'Instagram',
      description: 'Content strategy, post design, stories, reels e crescita organica del profilo.',
      icon: '📸'
    },
    {
      name: 'Facebook',
      description: 'Gestione pagina aziendale, campagne advertising e community management.',
      icon: '👥'
    },
    {
      name: 'LinkedIn',
      description: 'Personal branding, networking professionale e lead generation B2B.',
      icon: '💼'
    },
    {
      name: 'TikTok',
      description: 'Creazione video virali, trend analysis e strategia di crescita rapida.',
      icon: '🎵'
    }
  ];

  const services = [
    {
      title: 'Content Creation',
      description: 'Creazione di contenuti visual e copy accattivanti, studiati per il tuo target e ottimizzati per ogni piattaforma.',
      icon: '🎨'
    },
    {
      title: 'Community Management',
      description: 'Gestione quotidiana dei tuoi social: risposte ai commenti, messaggi diretti e moderazione della community.',
      icon: '💬'
    },
    {
      title: 'Social Analytics',
      description: 'Monitoraggio performance, analisi metriche e report dettagliati per ottimizzare la strategia.',
      icon: '📊'
    },
    {
      title: 'Advertising',
      description: 'Campagne pubblicitarie su Facebook Ads, Instagram Ads e LinkedIn Ads per massimizzare il ROI.',
      icon: '🎯'
    },
    {
      title: 'Influencer Marketing',
      description: 'Ricerca e gestione collaborazioni con influencer in linea con il tuo brand.',
      icon: '⭐'
    },
    {
      title: 'Social SEO',
      description: 'Ottimizzazione profili, hashtag strategy e tecniche per aumentare la visibilità organica.',
      icon: '🔍'
    }
  ];

  return (
    <div className="presenza-detail-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div className="detail-grid-overlay"></div>
      
      <header className="detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/services')}
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Torna ai Servizi</span>
        </button>
      </header>

      <div className="detail-content">
        <div className="detail-hero">
          <div className="detail-icon icon-social">
            <div className="icon-social-bars">
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
            </div>
          </div>
          <h1 className="detail-title">Social Media & Presenza Online</h1>
          <p className="detail-subtitle">Costruiamo insieme la tua identità digitale</p>
        </div>

        <div className="detail-intro">
          <p className="intro-text">
            Una presenza social forte e coerente è fondamentale per il successo di qualsiasi business moderno. 
            Ti aiuto a costruire e gestire una strategia social efficace, creando contenuti di qualità e 
            costruendo una community attiva intorno al tuo brand.
          </p>
        </div>

        <div className="platforms-section">
          <h2 className="section-title">Piattaforme Gestite</h2>
          <div className="platforms-grid">
            {platforms.map((platform, index) => (
              <div key={index} className="platform-card">
                <div className="platform-icon">{platform.icon}</div>
                <h3 className="platform-name">{platform.name}</h3>
                <p className="platform-description">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="services-section">
          <h2 className="section-title">Servizi Offerti</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-card-icon">{service.icon}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="packages-section">
          <h2 className="section-title">Pacchetti Social</h2>
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-header">
                <h3 className="package-title">Starter</h3>
                <p className="package-subtitle">Ideale per iniziare</p>
              </div>
              <ul className="package-features">
                <li>✓ 2 piattaforme social</li>
                <li>✓ 8 post al mese</li>
                <li>✓ Gestione commenti base</li>
                <li>✓ Report mensile</li>
              </ul>
            </div>
            
            <div className="package-card package-featured">
              <div className="package-badge">Più Richiesto</div>
              <div className="package-header">
                <h3 className="package-title">Professional</h3>
                <p className="package-subtitle">Per business in crescita</p>
              </div>
              <ul className="package-features">
                <li>✓ 3-4 piattaforme social</li>
                <li>✓ 16 post al mese</li>
                <li>✓ Community management completo</li>
                <li>✓ Stories & Reels</li>
                <li>✓ Report settimanale</li>
                <li>✓ Consulenza strategica</li>
              </ul>
            </div>
            
            <div className="package-card">
              <div className="package-header">
                <h3 className="package-title">Enterprise</h3>
                <p className="package-subtitle">Soluzione completa</p>
              </div>
              <ul className="package-features">
                <li>✓ Tutte le piattaforme</li>
                <li>✓ Contenuti illimitati</li>
                <li>✓ Campagne advertising</li>
                <li>✓ Influencer marketing</li>
                <li>✓ Analytics avanzate</li>
                <li>✓ Supporto prioritario 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="highlight-box">
          <div className="highlight-icon">💡</div>
          <h3 className="highlight-title">Audit Social Gratuito</h3>
          <p className="highlight-text">
            Ricevi un'analisi gratuita dei tuoi profili social attuali con suggerimenti 
            pratici per migliorare engagement e visibilità. Nessun impegno richiesto!
          </p>
        </div>

        <button 
          className="detail-cta"
          onClick={() => navigate('/contatti')}
        >
          <span className="cta-text">Richiedi Preventivo</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>

      <footer className="detail-footer">
        <p>© 2025 VIHENTE - PER ASPERA AD ASTRA</p>
      </footer>
    </div>
  );
};

export default PresenzaOnlinePage;