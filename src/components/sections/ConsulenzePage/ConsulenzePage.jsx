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

  const services = [
    {
      title: 'Analisi Digitale',
      description: 'Audit completo della tua presenza online: siti web, social media, SEO e performance.',
      icon: '🔍'
    },
    {
      title: 'Strategia di Crescita',
      description: 'Piano personalizzato per ottimizzare la tua visibilità digitale e raggiungere i tuoi obiettivi.',
      icon: '📈'
    },
    {
      title: 'Ottimizzazione Risorse',
      description: 'Suggerimenti per migliorare efficienza, conversioni e ROI dei tuoi investimenti digitali.',
      icon: '⚡'
    },
    {
      title: 'Formazione Team',
      description: 'Sessioni di training per il tuo team su strumenti e best practices digitali.',
      icon: '🎓'
    }
  ];

  return (
    <div className="service-detail-wrapper">
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
          <div className="detail-icon icon-consulenza">
            <div className="icon-consulenza-center"></div>
          </div>
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
          <div className="highlight-icon">🎁</div>
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