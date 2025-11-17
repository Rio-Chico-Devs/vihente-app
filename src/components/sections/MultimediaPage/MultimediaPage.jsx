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
          <div className="hero-icon">
            <div className="icon-multimedia">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          </div>
          
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
                  <span className="frame-icon">🎬</span>
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
                  <span className="graphic-icon">🎨</span>
                  <p>Banner</p>
                </div>
                <div className="graphic-item">
                  <span className="graphic-icon">🖼️</span>
                  <p>Sfondi</p>
                </div>
                <div className="graphic-item">
                  <span className="graphic-icon">✨</span>
                  <p>Social Media</p>
                </div>
                <div className="graphic-item">
                  <span className="graphic-icon">🎯</span>
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
                  <span className="illustration-icon">🎭</span>
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
                  <span className="tag-icon">🎨</span>
                  <span>Logo Design</span>
                </div>
                <div className="service-tag">
                  <span className="tag-icon">✨</span>
                  <span>Brand Identity</span>
                </div>
                <div className="service-tag">
                  <span className="tag-icon">🎯</span>
                  <span>Color Palette</span>
                </div>
                <div className="service-tag">
                  <span className="tag-icon">📱</span>
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
                  <span className="brand-icon">💼</span>
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
            Iniziamo Insieme
          </button>
        </section>

        {/* Spacer for footer */}
        <div className="content-spacer"></div>
      </div>
    </div>
  );
};

export default MultimediaPage;