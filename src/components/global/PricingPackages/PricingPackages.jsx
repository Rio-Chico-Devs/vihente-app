import './PricingPackages.css';
import { useNavigate } from 'react-router-dom';

/**
 * PricingPackages
 *
 * Sezione a 3 pacchetti per ogni pagina servizio.
 * Ogni pacchetto: name, price, tagline, features[], featured?, ctaLabel?.
 * Il CTA porta a /contatti?mode=quote&service=<serviceKey> (Contacts.jsx
 * legge la query string al mount per pre-selezionare la modalita' preventivo
 * e il servizio).
 */
const PricingPackages = ({ packages, serviceKey, title = 'Pacchetti', subtitle }) => {
  const navigate = useNavigate();

  const goToQuote = (preselectName) => {
    const params = new URLSearchParams();
    params.set('mode', 'quote');
    if (serviceKey) params.set('service', serviceKey);
    if (preselectName) params.set('tier', preselectName);
    navigate(`/contatti?${params.toString()}`);
  };

  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <span className="pricing-tag">// PACCHETTI //</span>
        <h2 className="pricing-title">{title}</h2>
        {subtitle && <p className="pricing-subtitle">{subtitle}</p>}
      </div>

      <div className="pricing-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`pricing-card${pkg.featured ? ' pricing-card--featured' : ''}`}
          >
            {pkg.featured && <span className="pricing-card-badge">CONSIGLIATO</span>}

            <h3 className="pricing-card-name">{pkg.name}</h3>
            {pkg.tagline && <p className="pricing-card-tagline">{pkg.tagline}</p>}

            <div className="pricing-card-price">
              <span className="pricing-card-price-value">{pkg.price}</span>
              {pkg.priceNote && (
                <span className="pricing-card-price-note">{pkg.priceNote}</span>
              )}
            </div>

            {pkg.features && pkg.features.length > 0 && (
              <ul className="pricing-card-features">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="pricing-card-feature">
                    <span className="pricing-card-feature-bullet" aria-hidden="true">▸</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              className="pricing-card-cta"
              onClick={() => goToQuote(pkg.name)}
            >
              {pkg.ctaLabel || 'Richiedi preventivo'}
            </button>
          </div>
        ))}
      </div>

      <p className="pricing-disclaimer">
        I prezzi indicati sono <strong>fasce indicative</strong> per dare un'idea dell'ordine di grandezza.
        Ogni progetto e' diverso: il preventivo definitivo viene formulato dopo una breve call gratuita
        in cui valutiamo insieme requisiti, complessita' e tempi.
      </p>
    </section>
  );
};

export default PricingPackages;
