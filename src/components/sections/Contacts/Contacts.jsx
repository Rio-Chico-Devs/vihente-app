import { useState, useEffect, useRef } from 'react';
import { validateContactForm, sanitizeInput } from '../../../utils/validation';
import './Contacts.css';

const Contacts = () => {
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    service: 'Consulenza',
    message: '',
    privacyConsent: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    privacyConsent: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const timeoutsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleMode = () => {
    setIsQuoteMode(!isQuoteMode);
    setFormData({
      name: '',
      email: '',
      reason: '',
      service: 'Consulenza',
      message: '',
      privacyConsent: false
    });
    setErrors({ name: '', email: '', message: '', privacyConsent: '' });
    setSubmitStatus(null);
    setShowRateLimit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ name: '', email: '', message: '', privacyConsent: '' });

    if (!canSubmit) {
      setShowRateLimit(true);
      const timeout1 = setTimeout(() => setShowRateLimit(false), 3000);
      timeoutsRef.current.push(timeout1);
      return;
    }

    const validation = validateContactForm(formData);

    if (!validation.valid) {
      setErrors(validation.errors);

      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
      }

      return;
    }

    if (!formData.privacyConsent) {
      setErrors(prev => ({
        ...prev,
        privacyConsent: 'Devi accettare la Privacy Policy per continuare'
      }));
      return;
    }

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      reason: sanitizeInput(formData.reason),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
      privacyConsent: formData.privacyConsent
    };

    setIsAnimating(true);
    setSubmitStatus(null);

    const timeout2 = setTimeout(() => {
      createDefragParticles();
    }, 2000);
    timeoutsRef.current.push(timeout2);

    const timeout3 = setTimeout(async () => {
      try {
        const response = await fetch('/api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: sanitizedData.name,
            email: sanitizedData.email,
            message: sanitizedData.message,
            service: isQuoteMode ? sanitizedData.service : undefined,
            reason: !isQuoteMode ? sanitizedData.reason : undefined,
            privacyConsent: sanitizedData.privacyConsent
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Errore durante l\'invio');
        }

        setIsAnimating(false);
        setSubmitStatus('success');

        const timeout4 = setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            reason: '',
            service: 'Consulenza',
            message: '',
            privacyConsent: false
          });
        }, 100);
        timeoutsRef.current.push(timeout4);

        setCanSubmit(false);
        const timeout5 = setTimeout(() => {
          setCanSubmit(true);
        }, 10000);
        timeoutsRef.current.push(timeout5);

        const timeout6 = setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        timeoutsRef.current.push(timeout6);

      } catch (error) {
        console.error('Errore invio form:', error);
        setIsAnimating(false);
        setSubmitStatus('error');

        const timeout7 = setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        timeoutsRef.current.push(timeout7);
      }
    }, 3000);
    timeoutsRef.current.push(timeout3);
  };

  const createDefragParticles = () => {
    const container = document.querySelector('.contacts-container');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 100 + Math.random() * 150;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: rgba(0, 255, 255, ${0.6 + Math.random() * 0.4});
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation: particleSpread 1s ease-out forwards;
      `;

      container.appendChild(particle);

      const timeout = setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 1000);
      timeoutsRef.current.push(timeout);
    }
  };

  return (
    <section className="contacts-section">
      <div className="vhs-scanlines" />

      <div className="grid-overlay">
        <div className="vignette-overlay"></div>
      </div>

      <div className="contacts-container">
        <h1 className="section-title">CONTATTI</h1>

        <div 
          className={`form-container ${isAnimating ? 'cube-animation' : ''} ${submitStatus === 'success' && !isAnimating ? 'reappearing' : ''}`}
        >
          <div className="mode-toggle-container">
            <button 
              type="button"
              className="mode-toggle-button"
              onClick={toggleMode}
            >
              <span className="mode-toggle-text">
                {isQuoteMode ? '📧 Contatto Generale' : '💰 Richiedi un Preventivo'}
              </span>
            </button>
            <p className="section-subtitle">
              {isQuoteMode ? '→ RICHIEDI UN PREVENTIVO' : ''}
            </p>
          </div>

          <div>
            <h2 className="form-title">
              {isQuoteMode ? 'RICHIESTA PREVENTIVO' : 'MODULO DI CONTATTO'}
            </h2>
            <p className="form-description">
              {isQuoteMode 
                ? 'Compila il form con i dettagli del servizio richiesto e ti risponderò con un preventivo personalizzato.'
                : 'Compila il form e ti risponderò il prima possibile. Tutti i campi sono obbligatori.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Nome/Azienda *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Inserisci nome o ragione sociale"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tua@email.it"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {!isQuoteMode ? (
                <div className="form-group form-field-full">
                  <label className="form-label" htmlFor="reason">
                    Motivo Contatto *
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="form-input"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Es: Informazioni generali, collaborazione, ecc."
                    required
                  />
                </div>
              ) : (
                <div className="form-group form-field-full">
                  <label className="form-label" htmlFor="service">
                    Prestazione Richiesta *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="Consulenza">Consulenza</option>
                    <option value="Grafica">Grafica</option>
                    <option value="Sito Web o componenti">Sito Web o componenti</option>
                    <option value="Social e SEO">Social e SEO</option>
                    <option value="Content Creation">Content Creation</option>
                  </select>
                </div>
              )}

              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="message">
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? 'form-textarea-error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isQuoteMode
                    ? "Descrivi in dettaglio il progetto e i tuoi obiettivi..."
                    : "Scrivi qui il tuo messaggio..."}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <span id="message-error" className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="form-group form-field-full privacy-consent-group">
                <label className="privacy-consent-label">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    className="privacy-consent-checkbox"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.privacyConsent}
                    aria-describedby={errors.privacyConsent ? "privacy-consent-error" : undefined}
                  />
                  <span className="privacy-consent-text">
                    Acconsento al trattamento dei miei dati personali secondo la{' '}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="privacy-link"
                    >
                      Privacy Policy
                    </a>
                    {' '}e i{' '}
                    <a
                      href="/termini-e-condizioni"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="privacy-link"
                    >
                      Termini e Condizioni
                    </a>
                    {' '}*
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span id="privacy-consent-error" className="form-error privacy-consent-error" role="alert">
                    {errors.privacyConsent}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isAnimating}
              >
                <span className="submit-button-text">
                  {isQuoteMode
                    ? '→ INVIA RICHIESTA PREVENTIVO'
                    : '→ INVIA MESSAGGIO'}
                </span>
              </button>

              {showRateLimit && (
                <div className="rate-limit-warning">
                  ⚠ Hai appena inviato una richiesta, aspetta qualche secondo
                </div>
              )}

              {submitStatus === 'success' && !isAnimating && (
                <div className="success-message">
                  ✓ {isQuoteMode 
                    ? 'Richiesta preventivo inviata con successo! Ti risponderò a breve.' 
                    : 'Messaggio inviato con successo! Ti risponderò il prima possibile.'}
                </div>
              )}

              {submitStatus === 'error' && !isAnimating && (
                <div className="rate-limit-warning">
                  ✗ Errore durante l'invio. Riprova più tardi.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contatti",
          "description": "Contattami per progetti, collaborazioni e preventivi personalizzati"
        })}
      </script>
    </section>
  );
};

export default Contacts;
