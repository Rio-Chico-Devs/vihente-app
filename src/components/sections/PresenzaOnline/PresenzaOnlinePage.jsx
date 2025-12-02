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

  // Icone SVG minimaliste per piattaforme
  const InstagramIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="28" height="28" rx="6" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="7" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <circle cx="32" cy="16" r="1.5" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <path d="M28 16 L26 16 C24 16 23 17 23 19 L23 21 L20 21 L20 25 L23 25 L23 36 L27 36 L27 25 L30 25 L30.5 21 L27 21 L27 19.5 C27 18.5 27.3 18 28.5 18 L30.5 18 L30.5 14.2 C30.1 14.1 29 14 27.5 14 C24.5 14 23 15.8 23 18.8 L23 21" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="28" height="28" rx="4" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="15" y="22" width="4" height="12" fill="var(--color-primary, #0ff)"/>
      <circle cx="17" cy="17" r="2" fill="var(--color-primary, #0ff)"/>
      <path d="M23 22 L23 34 L27 34 L27 28 C27 26 28 25 29.5 25 C31 25 32 26 32 28 L32 34 L36 34 L36 27 C36 23.5 34 22 31 22 C29 22 27.5 23 27 24 L27 22 Z" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  const TikTokIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 14 C30 14 31 11 27 11 L24 11 L24 29 C24 31 22.5 32 21 32 C19 32 17.5 30.5 17.5 28.5 C17.5 26 19.5 25 21 25 L21 21 C17 21 13.5 24 13.5 28.5 C13.5 33 17 36 21 36 C25 36 28 33 28 29 L28 20 C29 21 31 22 33 22 L33 18 C31 18 30 16 30 14 Z" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  // Icone SVG minimaliste per servizi
  const ContentIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="28" height="28" rx="2" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="19" cy="19" r="4" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <path d="M10 30 L18 22 L24 28 L30 20 L38 28 L38 38 L10 38 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CommunityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 32 L12 18 C12 14 14 12 18 12 L30 12 C34 12 36 14 36 18 L36 26 C36 30 34 32 30 32 L20 32 L12 38 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="18" y1="20" x2="30" y2="20" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="18" y1="26" x2="26" y2="26" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  const AnalyticsIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="36" x2="36" y2="36" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="36" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="16" y="26" width="4" height="10" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="22" y="20" width="4" height="16" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="28" y="16" width="4" height="20" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TargetIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="14" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="9" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="4" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="1.5" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8 L27.5 18.5 L39 19.5 L31 27 L33.5 38.5 L24 32.5 L14.5 38.5 L17 27 L9 19.5 L20.5 18.5 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="29" y1="29" x2="40" y2="40" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  const LightBulbIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8 C18 8 13 13 13 19 C13 23 15 26 17 28 L17 32 L31 32 L31 28 C33 26 35 23 35 19 C35 13 30 8 24 8 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="36" x2="28" y2="36" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="21" y1="40" x2="27" y2="40" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  const platforms = [
    {
      name: 'Instagram',
      description: 'Content strategy, post design, stories, reels e crescita organica del profilo.',
      icon: <InstagramIcon />
    },
    {
      name: 'Facebook',
      description: 'Gestione pagina aziendale, campagne advertising e community management.',
      icon: <FacebookIcon />
    },
    {
      name: 'LinkedIn',
      description: 'Personal branding, networking professionale e lead generation B2B.',
      icon: <LinkedInIcon />
    },
    {
      name: 'TikTok',
      description: 'Creazione video virali, trend analysis e strategia di crescita rapida.',
      icon: <TikTokIcon />
    }
  ];

  const services = [
    {
      title: 'Content Creation',
      description: 'Creazione di contenuti visual e copy accattivanti, studiati per il tuo target e ottimizzati per ogni piattaforma.',
      icon: <ContentIcon />
    },
    {
      title: 'Community Management',
      description: 'Gestione quotidiana dei tuoi social: risposte ai commenti, messaggi diretti e moderazione della community.',
      icon: <CommunityIcon />
    },
    {
      title: 'Social Analytics',
      description: 'Monitoraggio performance, analisi metriche e report dettagliati per ottimizzare la strategia.',
      icon: <AnalyticsIcon />
    },
    {
      title: 'Advertising',
      description: 'Campagne pubblicitarie su Facebook Ads, Instagram Ads e LinkedIn Ads per massimizzare il ROI.',
      icon: <TargetIcon />
    },
    {
      title: 'Influencer Marketing',
      description: 'Ricerca e gestione collaborazioni con influencer in linea con il tuo brand.',
      icon: <StarIcon />
    },
    {
      title: 'Social SEO',
      description: 'Ottimizzazione profili, hashtag strategy e tecniche per aumentare la visibilità organica.',
      icon: <SearchIcon />
    }
  ];

  return (
    <div className="presenza-detail-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div className="detail-grid-overlay"></div>

      <div className="detail-content">
        <div className="detail-hero">
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
          <div className="highlight-icon">
            <LightBulbIcon />
          </div>
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
    </div>
  );
};

export default PresenzaOnlinePage;
