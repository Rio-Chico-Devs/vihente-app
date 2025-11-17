import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsulenzePage = () => {
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
        <div className="detail-icon icon-consulenza">
          <div className="icon-consulenza-center"></div>
        </div>

        <h1 className="detail-title">Consulenze Digitali</h1>
        
        <div className="detail-description">
          <p>
            Se hai già una presenza online ma vorresti cambiare approccio o allinearti a delle ottiche più moderne, 
            hai bisogno di qualcuno che si occupi ad aiutarti a gestire i tuoi servizi o semplicemente vuoi una 
            consultazione per capire come muoverti per creare la tua presenza digitale, contattami o chiamami per 
            studiare il tuo caso, identificare i tuoi problemi e valutare le misure possibili da adottare per 
            risolvere i tuoi problemi.
          </p>
          
          <div className="highlight-box">
            <p className="highlight-text">
              La prima consulenza online è sempre gratuita!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className="detail-cta"
          onClick={() => navigate('/contatti')}
        >
          Richiedi Consulenza
        </button>
      </div>

      {/* Footer */}
      <footer className="detail-footer">
        <p>© 2025 VIHENTE - PER ASPERA AD ASTRA</p>
      </footer>
    </div>
  );
};

export default ConsulenzePage;