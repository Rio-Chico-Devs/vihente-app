import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PresenzaOnlinePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('service-detail-body');
    return () => {
      document.body.classList.remove('service-detail-body');
    };
  }, []);

  return (
    <div className="service-detail-wrapper">
      {/* Background effects */}
      <div className="detail-grid-overlay"></div>
      
      {/* Header */}
      <header className="detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/services')}
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Torna ai Servizi</span>
        </button>
      </header>

      {/* Content */}
      <div className="detail-content">
        <div className="detail-icon icon-presenza">
          <div className="radar-circle"></div>
          <div className="radar-circle"></div>
          <div className="radar-circle"></div>
          <div className="radar-sweep"></div>
          <div className="radar-dot"></div>
        </div>

        <h1 className="detail-title">Presenza Online</h1>
        
        <div className="detail-description">
          <p>
            Gestisco per te i tuoi social e i tuoi siti:
          </p>
        </div>

        {/* Services List */}
        <div className="services-list">
          <div className="service-item">
            <span className="service-bullet">▹</span>
            <span className="service-name">Hosting</span>
          </div>
          <div className="service-item">
            <span className="service-bullet">▹</span>
            <span className="service-name">Chat</span>
          </div>
          <div className="service-item">
            <span className="service-bullet">▹</span>
            <span className="service-name">Pubblicazione di contenuti</span>
          </div>
          <div className="service-item">
            <span className="service-bullet">▹</span>
            <span className="service-name">Studio sulla strategia digitale da adottare</span>
          </div>
          <div className="service-item">
            <span className="service-bullet">▹</span>
            <span className="service-name">Risoluzione controversie con clienti o pubblico</span>
          </div>
        </div>

        <div className="detail-description">
          <p>
            Lavoro per prestazioni in base al tuo bisogno, anche a periodi.
          </p>
          
          <div className="highlight-box">
            <p className="highlight-text">
              Se sei contento possiamo anche stringere una collaborazione a lungo termine!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className="detail-cta"
          onClick={() => navigate('/contatti')}
        >
          Scopri di Più
        </button>
      </div>

      {/* Footer */}
      <footer className="detail-footer">
        <p>© 2025 VIHENTE - PER ASPERA AD ASTRA</p>
      </footer>
    </div>
  );
};

export default PresenzaOnlinePage;