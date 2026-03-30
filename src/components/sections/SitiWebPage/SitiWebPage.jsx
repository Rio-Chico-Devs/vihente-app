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

  // WordPress official mark (W in circle) — colored with site theme
  const WordPressIcon = () => (
    <svg width="48" height="48" viewBox="0 0 122.52 122.523" xmlns="http://www.w3.org/2000/svg" fill="var(--color-primary, #0ff)">
      <path d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388z"/>
      <path d="M96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501l19.138 56.925 11.503-34.494-8.188-22.431c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.689.667 13.858.667 5.496 0 14.006-.667 14.006-.667 2.835-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"/>
      <path d="M62.184 65.857l-15.768 45.819c4.708 1.384 9.687 2.141 14.846 2.141 6.12 0 11.989-1.058 17.452-2.979a4.741 4.741 0 0 1-.374-.724L62.184 65.857z"/>
      <path d="M107.376 36.046a41.56 41.56 0 0 1 .48 6.332c0 6.246-1.169 13.24-4.663 22.013l-18.722 54.129c18.213-10.613 30.48-30.407 30.48-52.998a52.567 52.567 0 0 0-7.575-29.476z"/>
      <path d="M61.262 0C27.483 0 0 27.481 0 61.262c0 33.783 27.483 61.265 61.262 61.265 33.778 0 61.265-27.482 61.265-61.265C122.527 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.223-58.453-58.453 0-32.229 26.222-58.45 58.453-58.45 32.229 0 58.45 26.221 58.45 58.45 0 32.23-26.221 58.453-58.45 58.453z"/>
    </svg>
  );

  // React official atom logo — colored with site theme
  const ReactIcon = () => (
    <svg width="48" height="48" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="var(--color-primary, #0ff)"/>
      <g fill="none" stroke="var(--color-primary, #0ff)" strokeWidth="1">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
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
                Principalmente uso <strong>React</strong> o <strong>CMS come Wordpress</strong>, ma scrivo anche codice per soluzioni più legacy.
              </p>
            </div>
          </div>
        </section>

        {/* Programming Languages section */}
        <section className="sitiweb-section packages-section">
          <h2 className="section-title">Linguaggi Utilizzati</h2>

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
                    Ho studiato il C durante il mio percorso scolastico, ma solo lavorando sono riuscito a comprenderne la potenza.
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">C++</td>
                  <td className="feature-description">
                    Il mio primo linguaggio con il quale ho iniziato a creare le mie prime creazioni senza grafica, sto ancora studiando per poter capire a pieno le operazioni più complesse.
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Js/JSX</td>
                  <td className="feature-description">
                    Utilizzo Js principalmente per la manipolazione del DOM e la gestione di animazioni particolarmente ostiche.
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">HTML</td>
                  <td className="feature-description">
                    Sono anni che uso l'HTML, per creare pagine, fare modifiche, organizzare form o strutturare contenuti digitali essendo un markup language.
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">CSS</td>
                  <td className="feature-description">
                    Anche con il CSS la mia esperienza è abbastanza lunga, preferisco se possibile usare solo CSS per evitare di appesantire quel che creo.
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Python</td>
                  <td className="feature-description">
                    Ottimo per il backend e lo sviluppo di applicazioni semplici e veloci, sto ancora studiando per poter usarlo al meglio insieme al C per far fronte ai suoi limiti.
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
            Contattami per discutere il tuo progetto o le tue necessità per iniziare la nostra collaborazione.
          </p>
          <button
            className="sitiweb-cta-button"
            onClick={() => navigate('/contatti')}
          >
            Contattami
          </button>
        </section>

        {/* Spacer for footer */}
        <div className="content-spacer"></div>
      </div>
    </div>
  );
};

export default SitiWebPage;
