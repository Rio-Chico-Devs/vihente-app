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

  return (
    <div className="sitiweb-page-wrapper">
      {/* Background grid overlay */}
      <div className="sitiweb-grid-overlay"></div>
      
      {/* Scrollable content */}
      <div className="sitiweb-content">
        {/* Hero section */}
        <section className="sitiweb-hero">
          <div className="hero-icon">
            <div className="icon-siti">
              <div className="binary-row">
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">1</div>
              </div>
              <div className="binary-row">
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">0</div>
              </div>
              <div className="binary-row">
                <div className="binary-digit">1</div>
                <div className="binary-digit">1</div>
                <div className="binary-digit">0</div>
                <div className="binary-digit">1</div>
              </div>
            </div>
          </div>
          
          <h1 className="sitiweb-title">Web Development</h1>
          <p className="sitiweb-subtitle">Sviluppo su misura per la tua presenza digitale</p>
        </section>

        {/* Introduction section */}
        <section className="sitiweb-section intro-section">
          <div className="intro-box">
            <h2 className="intro-title">Introduzione</h2>
            <p className="intro-text">
              In questa pagina troverai tutte le informazioni utili per scoprire come lavoro, i prodotti che offro 
              e se vorrai avere anche informazioni tecniche che spesso e volentieri non vengono fornite data la 
              complessità della materia. Se hai piacere clicca sui tasti <span className="highlight-plus">+</span> per 
              approfondire, altrimenti consulta solo quello che ti è più strettamente necessario.
            </p>
          </div>
        </section>

        {/* What we offer section */}
        <section className="sitiweb-section">
          <h2 className="section-title">Cosa Offriamo</h2>
          
          <div className="offer-content">
            <div className="offer-text-box">
              <h3 className="offer-subtitle">Prestazioni di Sviluppo Web</h3>
              <p className="offer-description">
                Offro <strong>prestazioni di sviluppo web</strong>, non cessione di prodotti. Questo significa che 
                scrivo il codice personalizzato per te e ti consegno un prodotto funzionante come opera di prestazione. 
                Non vendo licenze, ma creo soluzioni su misura.
              </p>
            </div>

            <div className="products-grid">
              <div className="product-card">
                <div className="product-icon">🔧</div>
                <h4 className="product-name">Siti CMS WordPress</h4>
                <p className="product-desc">
                  Piattaforma versatile e intuitiva, perfetta per chi vuole gestire i contenuti in autonomia
                </p>
              </div>

              <div className="product-card">
                <div className="product-icon">⚛️</div>
                <h4 className="product-name">Siti Web React</h4>
                <p className="product-desc">
                  Applicazioni web moderne e performanti, costruite con tecnologie all'avanguardia
                </p>
              </div>
            </div>

            <div className="price-note">
              <p>
                💰 Il prezzo varia a seconda della <strong>complessità</strong> e delle <strong>tecnologie utilizzate</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Pricing packages section */}
        <section className="sitiweb-section packages-section">
          <h2 className="section-title">Pacchetti Disponibili</h2>
          
          <div className="pricing-table-container">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="feature-column">Servizi Inclusi</th>
                  <th className="package-column package-base">
                    <div className="package-header">
                      <span className="package-name">Base</span>
                      <span className="package-badge">Starter</span>
                    </div>
                  </th>
                  <th className="package-column package-plus">
                    <div className="package-header">
                      <span className="package-name">Plus</span>
                      <span className="package-badge">Popolare</span>
                    </div>
                  </th>
                  <th className="package-column package-deluxe">
                    <div className="package-header">
                      <span className="package-name">Deluxe</span>
                      <span className="package-badge">Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Ottimizzazione SEO</td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Ottimizzazione regole accessibilità base</td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Progettazione grafica</td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Ottimizzazione immagini e caricamento</td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Sito multipagina</td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Blog</td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Cookie Policy</td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Privacy Policy</td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Grafica personalizzata</td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="cross-icon">✗</span>
                  </td>
                  <td className="feature-value">
                    <span className="check-icon">✓</span>
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