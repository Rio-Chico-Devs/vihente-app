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
                    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <path d="M26 20 L26 44 L44 32 Z" fill="currentColor"/>
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
                    <rect x="8" y="12" width="48" height="40" rx="3" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <path d="M48 12 L56 12 L56 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Banner</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3" fill="none"/>
                  </svg>
                  <p>Sfondi</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="18" r="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <circle cx="18" cy="42" r="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <circle cx="46" cy="42" r="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <line x1="27" y1="25" x2="21" y2="35" stroke="currentColor" strokeWidth="3"/>
                    <line x1="37" y1="25" x2="43" y2="35" stroke="currentColor" strokeWidth="3"/>
                  </svg>
                  <p>Social Media</p>
                </div>
                <div className="graphic-item">
                  <svg className="graphic-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="12" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <rect x="34" y="12" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <rect x="12" y="34" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
                    <rect x="34" y="34" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
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
                    <path d="M20 52 L16 8 L22 10 L44 52 L38 54 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <ellipse cx="41" cy="48" rx="4" ry="6" fill="currentColor" transform="rotate(-15 41 48)"/>
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
                    <path d="M8 26 L16 6 L24 26 L8 26 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                    <line x1="12" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span>Logo Design</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4 L20 14 L30 14 L22 20 L26 30 L16 24 L6 30 L10 20 L2 14 L12 14 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
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
                    <rect x="6" y="6" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                    <line x1="16" y1="12" x2="16" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="12" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
                    <path d="M32 8 L50 24 L50 40 L32 56 L14 40 L14 24 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
                    <path d="M32 20 L42 28 L42 36 L32 44 L22 36 L22 28 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
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
