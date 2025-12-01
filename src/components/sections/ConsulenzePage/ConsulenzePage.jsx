import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsulenzePage.css';

const ConsulenzePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('service-detail-body');
    return () => {
      document.body.classList.remove('service-detail-body');
    };
  }, []);

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      'const strategy = {',
      'function optimize() {',
      'return growth;',
      'export default Digital;',
      'class Consultant {'
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

  // Icone SVG minimaliste
  const SearchIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="29" y1="29" x2="40" y2="40" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  const GrowthIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="8,36 18,26 26,32 40,12" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="32,12 40,12 40,20" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LightningIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 6 L12 26 L24 26 L22 42 L36 22 L24 22 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EducationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 18 L24 10 L40 18 L24 26 Z" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20 L12 30 L24 36 L36 30 L36 20" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const GiftIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="28" height="20" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="14" width="32" height="6" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="24" y1="14" x2="24" y2="40" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 14 C24 14, 20 8, 16 10 C12 12, 14 14, 24 14" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 14 C24 14, 28 8, 32 10 C36 12, 34 14, 24 14" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const services = [
    {
      title: 'Analisi Digitale',
      description: 'Audit completo della tua presenza online: siti web, social media, SEO e performance.',
      icon: <SearchIcon />
    },
    {
      title: 'Strategia di Crescita',
      description: 'Piano personalizzato per ottimizzare la tua visibilità digitale e raggiungere i tuoi obiettivi.',
      icon: <GrowthIcon />
    },
    {
      title: 'Ottimizzazione Risorse',
      description: 'Suggerimenti per migliorare efficienza, conversioni e ROI dei tuoi investimenti digitali.',
      icon: <LightningIcon />
    },
    {
      title: 'Formazione Team',
      description: 'Sessioni di training per il tuo team su strumenti e best practices digitali.',
      icon: <EducationIcon />
    }
  ];

  return (
    <div className="service-detail-wrapper">
      <div className="code-background" id="codeBackground"></div>
      <div className="detail-grid-overlay"></div>

      <div className="detail-content">
        <div className="detail-hero">
          <h1 className="detail-title">Consulenze Digitali</h1>
          <p className="detail-subtitle">Trasforma la tua presenza online in un asset strategico</p>
        </div>

        <div className="detail-intro">
          <p className="intro-text">
            Se hai già una presenza online ma vorresti cambiare approccio o allinearti a logiche più moderne, 
            hai bisogno di qualcuno che ti aiuti a gestire i tuoi servizi o semplicemente vuoi una consultazione 
            per capire come muoverti per creare la tua presenza digitale, sono qui per aiutarti.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-icon">{service.icon}</div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="process-section">
          <h2 className="section-title">Come Funziona</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3 className="step-title">Contatto Iniziale</h3>
              <p className="step-description">Prenota la tua prima consulenza gratuita online.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3 className="step-title">Analisi</h3>
              <p className="step-description">Studiamo insieme il tuo caso e identifichiamo le opportunità.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3 className="step-title">Proposta</h3>
              <p className="step-description">Ricevi un piano d'azione personalizzato e dettagliato.</p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <h3 className="step-title">Implementazione</h3>
              <p className="step-description">Ti supporto nell'applicazione delle strategie concordate.</p>
            </div>
          </div>
        </div>

        <div className="highlight-box">
          <div className="highlight-icon">
            <GiftIcon />
          </div>
          <h3 className="highlight-title">Prima Consulenza Gratuita</h3>
          <p className="highlight-text">
            La prima consulenza online è sempre gratuita! Parliamo insieme dei tuoi obiettivi 
            e vediamo come posso aiutarti a raggiungerli.
          </p>
        </div>

        <button 
          className="detail-cta"
          onClick={() => navigate('/contatti')}
        >
          <span className="cta-text">Richiedi Consulenza Gratuita</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>

      <footer className="detail-footer">
        <p>© 2025 VIHENTE - PER ASPERA AD ASTRA</p>
      </footer>
    </div>
  );
};

export default ConsulenzePage;
