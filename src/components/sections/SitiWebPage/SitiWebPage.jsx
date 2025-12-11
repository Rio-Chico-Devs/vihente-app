import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SitiWebPage.css';

const SitiWebPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('sitiweb-page-body');
    return () => {
      document.body.classList.remove('sitiweb-page-body');
    };
  }, []);

  // Icone SVG minimaliste
  const WordPressIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <path d="M10 24 L14 36 L18 14 L22 28 L26 20 L30 34 L34 16 L38 24" stroke="var(--color-primary, #0ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="2" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  const ReactIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="24" rx="18" ry="7" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" stroke="var(--color-primary, #0ff)" strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="3" fill="var(--color-primary, #0ff)"/>
    </svg>
  );

  return (
    <div className="sitiweb-page-wrapper">
      {/* Background grid overlay */}
      <div className="sitiweb-grid-overlay"></div>

      {/* Scrollable content */}
      <div className="sitiweb-content">
        {/* Hero section */}
        <section className="sitiweb-hero">
          <h1 className="sitiweb-title">Web Development</h1>
          <p className="sitiweb-subtitle">Sviluppo su misura per la tua presenza digitale</p>
        </section>

        {/* Introduction section */}
        <section className="sitiweb-section intro-section">
          <div className="intro-box">
            <h2 className="intro-title">Introduzione</h2>
            <p className="intro-text">
              In questa pagina troverai tutte le informazioni utili per scoprire come lavoro, i prodotti che sono in grado di creare
              e il mio metodo di lavoro. Se vuoi sapere di più su cosa so fare contattami per un meeting.
            </p>
          </div>
        </section>

        {/* What we offer section */}
        <section className="sitiweb-section">
          <h2 className="section-title">Che tipo di tecnologie utilizzo per il web Development</h2>

          <div className="offer-content">
            <div className="offer-text-box">
              <h3 className="offer-subtitle">Web Development</h3>
              <p className="offer-description">
                Mi occupo principalmente dello sviluppo e della scrittura del codice necessario per creare <strong>Siti Web estremamente personalizzati</strong>, o componenti per le tue web app o siti. A seconda della grandezza del tuo progetto posso o occuparmene personalmente o entrare a far parte del tuo team.
                Il mio punto forte è l'analisi delle risorse già presenti, implementarne di nuove, ridimensionare la grafica o creare siti personalizzati da zero.
              </p>
            </div>

            <div className="products-grid">
              <div className="product-card">
                <div className="product-icon">
                  <WordPressIcon />
                </div>
                <h4 className="product-name">Siti CMS WordPress</h4>
                <p className="product-desc">
                  Piattaforma versatile e intuitiva, perfetta per chi vuole gestire i contenuti in autonomia
                </p>
              </div>

              <div className="product-card">
                <div className="product-icon">
                  <ReactIcon />
                </div>
                <h4 className="product-name">Siti Web React</h4>
                <p className="product-desc">
                  Applicazioni web moderne e performanti, costruite con tecnologie all'avanguardia
                </p>
              </div>
            </div>

            <div className="price-note">
              <p>
                Principalmente uso <strong>React</strong> o <strong>CMS come wordpress</strong>, ma scrivo anche a codice per soluzioni più legacy.
              </p>
            </div>
          </div>
        </section>

        {/* Programming Languages section */}
        <section className="sitiweb-section packages-section">
          <h2 className="section-title">Linguaggi di Programmazione</h2>

          <div className="pricing-table-container">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="feature-column">Linguaggio</th>
                  <th className="package-column-wide">
                    <div className="package-header">
                      <span className="package-name">Utilizzo</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">C</td>
                  <td className="feature-description">
                    Programmazione di sistema e algoritmi di basso livello
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">C++</td>
                  <td className="feature-description">
                    Sviluppo di applicazioni performanti e gestione della memoria
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Js/JSX</td>
                  <td className="feature-description">
                    Sviluppo di applicazioni web moderne con React e framework JavaScript
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">HTML</td>
                  <td className="feature-description">
                    Strutturazione semantica di pagine web e applicazioni
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">CSS</td>
                  <td className="feature-description">
                    Styling avanzato, animazioni e design responsive
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Python</td>
                  <td className="feature-description">
                    Scripting, automazione e sviluppo backend
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA section */}
        <section className="sitiweb-cta-section">
          <h2 className="cta-title">Pronto a Iniziare?</h2>
          <p className="cta-text">
            Contattami per discutere il tuo progetto e trovare il pacchetto perfetto per te
          </p>
          <button
            className="sitiweb-cta-button"
            onClick={() => navigate('/contatti')}
          >
            Richiedi Preventivo
          </button>
        </section>

        {/* Spacer for footer */}
        <div className="content-spacer"></div>
      </div>
    </div>
  );
};

export default SitiWebPage;
