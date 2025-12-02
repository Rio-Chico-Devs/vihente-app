import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MultimediaPage.css';

const MultimediaPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('multimedia-page-body');
    return () => {
      document.body.classList.remove('multimedia-page-body');
    };
  }, []);

  return (
    <div className="multimedia-page-wrapper">
      {/* Background grid overlay */}
      <div className="multimedia-grid-overlay"></div>
      
      {/* Scrollable content */}
      <div className="multimedia-content">
        {/* Hero section */}
        <section className="multimedia-hero">
          <h1 className="multimedia-title">Creazione Multimedia</h1>
          <p className="multimedia-subtitle">Grafiche, Animazioni e Illustrazioni su Misura</p>
        </section>

        {/* Introduction */}
        <section className="multimedia-section intro-section">
          <div className="intro-box">
            <p className="intro-text">
              Cerchi delle grafiche fatte apposta per te o hai bisogno di aiuto per la creazione delle tue immagini 
              o disegni? Sono specializzato in <strong>grafiche digitali</strong> e <strong>content creation</strong>, 
              ti aiuto a sviluppare le tue idee e ti seguo fornendoti un costante feedback grafico, che siano grafiche 
              o illustrazioni, sei nel posto giusto:
            </p>
            <p className="intro-highlight">
              Ecco una piccola dimostrazione dei miei lavori
            </p>
          </div>
        </section>

        {/* Animazioni Section */}
        <section className="multimedia-section work-section">
          <div className="work-container work-reverse">
            <div className="work-content">
              <h2 className="work-title">Animazioni</h2>
              <p className="work-text">
                Creo e partecipo nella creazione di animazioni da quando sono giovane, illustrami il tuo progetto 
                e ti faccio sapere subito se sono disponibile ;)
              </p>
              <button 
                className="work-cta"
                onClick={() => navigate('/contatti')}
              >
                Raccontami il Tuo Progetto
              </button>
            </div>
            <div className="work-showcase">
              <div className="animation-frame">
                <div className="frame-placeholder">
                  <svg className="frame-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="12" width="48" height="40" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="12" y="16" width="40" height="32" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="20" cy="28" r="4" fill="currentColor"/>
                    <polygon points="28,24 28,36 40,30" fill="currentColor"/>
                    <line x1="4" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="2"/>
                    <line x1="4" y1="28" x2="8" y2="28" stroke="currentColor" strokeWidth="2"/>
                    <line x1="4" y1="36" x2="8" y2="36" stroke="currentColor" strokeWidth="2"/>
                    <line x1="4" y1="44" x2="8" y2="44" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p className="frame-text">Frame Animazione</p>
                  <p className="frame-hint">Qui verranno inserite le immagini<br/>dell'animazione in sequenza</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grafiche Digitali Section */}
        <section className="multimedia-section work-section">
          <div className="work-container">
            <div className="work-content">
              <h2 className="work-title">Grafiche Digitali</h2>
              <p className="work-text">
                Creo banner, sfondi e immagini utilizzabili in vari tipi di progetti e piattaforme. 
                Contattami subito per illustrarmi il tuo progetto!
              </p>
              <button 
                className="work-cta"
                onClick={() => navigate('/contatti')}
              >
                Inizia il Tuo Progetto
              </button>
            </div>
            <div className="work-showcase">
              <div className="graphics-grid">
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 48 L32 28 L44 48 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M8 12 L56 12 L56 52 L8 52 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <p>Banner</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="44" height="44" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M10 42 L24 28 L34 38 L54 18" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="42" cy="22" r="4" fill="currentColor"/>
                  </svg>
                  <p>Sfondi</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="32,8 36,24 52,24 40,34 44,50 32,40 20,50 24,34 12,24 28,24" fill="currentColor"/>
                    <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <p>Social Media</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="32" r="4" fill="currentColor"/>
                    <line x1="32" y1="12" x2="32" y2="16" stroke="currentColor" strokeWidth="2"/>
                    <line x1="32" y1="48" x2="32" y2="52" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="32" x2="16" y2="32" stroke="currentColor" strokeWidth="2"/>
                    <line x1="48" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p>Web Graphics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Illustrazioni Section */}
        <section className="multimedia-section work-section">
          <div className="work-container work-reverse">
            <div className="work-content">
              <h2 className="work-title">Illustrazioni</h2>
              <p className="work-text">
                Da anni seguo il mondo delle illustrazioni, metto a disposizione tutta la mia esperienza per 
                insegnarti, aiutarti nei tuoi progetti o creare direttamente illustrazioni su commissione, 
                visita i miei canali social per avere un'idea più precisa dei miei vari stili e tecniche!
              </p>
              <button 
                className="work-cta"
                onClick={() => navigate('/contatti')}
              >
                Scopri i Miei Stili
              </button>
            </div>
            <div className="work-showcase">
              <div className="illustration-showcase">
                <div className="illustration-placeholder">
                  <svg className="illustration-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="32" cy="36" rx="20" ry="24" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M12 36 Q18 32 24 36 Q30 40 36 36 Q42 32 48 36 Q52 38 52 36" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="22" cy="28" r="3" fill="currentColor"/>
                    <circle cx="42" cy="28" r="3" fill="currentColor"/>
                    <path d="M20 48 Q32 52 44 48" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <p className="illustration-text">Portfolio Illustrazioni</p>
                  <p className="illustration-hint">Spazio per esempi<br/>di illustrazioni</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vari Contenuti Digitali Section */}
        <section className="multimedia-section work-section">
          <div className="work-container">
            <div className="work-content">
              <h2 className="work-title">Vari Contenuti Digitali</h2>
              <p className="work-text">
                E se cerchi anche qualcuno che curi il tuo logo, il tuo brand, le tue palette o le tue icone, 
                sono qui anche per questo, non esitare a contattarmi, <strong>le tue idee sono la mia passione!</strong>
              </p>
              <div className="services-list">
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 24 L16 8 L24 24 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="16" cy="12" r="3" fill="currentColor"/>
                  </svg>
                  <span>Logo Design</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="16,4 18,12 26,12 20,17 22,25 16,20 10,25 12,17 6,12 14,12" fill="currentColor"/>
                  </svg>
                  <span>Brand Identity</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="12" r="6" fill="currentColor" opacity="0.8"/>
                    <circle cx="22" cy="12" r="6" fill="currentColor" opacity="0.6"/>
                    <circle cx="16" cy="20" r="6" fill="currentColor" opacity="0.4"/>
                  </svg>
                  <span>Color Palette</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="18" y="4" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="4" y="18" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="18" y="18" width="10" height="10" fill="currentColor"/>
                  </svg>
                  <span>Icon Design</span>
                </div>
              </div>
              <button 
                className="work-cta work-cta-primary"
                onClick={() => navigate('/contatti')}
              >
                Contattami Ora
              </button>
            </div>
            <div className="work-showcase">
              <div className="brand-showcase">
                <div className="brand-placeholder">
                  <svg className="brand-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="16" width="48" height="36" stroke="currentColor" strokeWidth="2" fill="none" rx="2"/>
                    <path d="M8 24 L56 24" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="20" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M28 36 L36 28 L44 36 L36 44 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="24" y="12" width="16" height="8" stroke="currentColor" strokeWidth="2" fill="none" rx="1"/>
                  </svg>
                  <p className="brand-text">Brand Identity</p>
                  <p className="brand-hint">Esempi di loghi,<br/>palette e branding</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="multimedia-cta-section">
          <h2 className="cta-title">Dai Vita alle Tue Idee</h2>
          <p className="cta-text">
            Sono pronto ad ascoltare il tuo progetto e trasformarlo in realtà
          </p>
          <button
            className="multimedia-cta-button"
            onClick={() => navigate('/contatti')}
          >
            Richiedi Preventivo
          </button>
        </section>
      </div>
    </div>
  );
};

export default MultimediaPage;
