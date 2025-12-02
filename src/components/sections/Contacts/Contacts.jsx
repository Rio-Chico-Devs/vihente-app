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
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [showRateLimit, setShowRateLimit] = useState(false);

  // 🔧 FIX MEMORY LEAK: Track all timeouts
  const timeoutsRef = useRef([]);

  // 🔧 FIX MEMORY LEAK: Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
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
      message: ''
    });
    setErrors({ name: '', email: '', message: '' });
    setSubmitStatus(null);
    setShowRateLimit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ name: '', email: '', message: '' });

    if (!canSubmit) {
      setShowRateLimit(true);
      const timeout1 = setTimeout(() => setShowRateLimit(false), 3000);
      timeoutsRef.current.push(timeout1);
      return;
    }

    // ✅ VALIDAZIONE
    const validation = validateContactForm(formData);

    if (!validation.valid) {
      setErrors(validation.errors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
      }
      
      return;
    }

    // ✅ SANITIZE INPUT (fix errore ESLint: ora sanitizedData viene usato)
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      reason: sanitizeInput(formData.reason),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message)
    };

    setIsAnimating(true);
    setSubmitStatus(null);

    const timeout2 = setTimeout(() => {
      createDefragParticles();
    }, 2000);
    timeoutsRef.current.push(timeout2);

    const timeout3 = setTimeout(async () => {
      // ✅ USO SANITIZED DATA per invio reale
      try {
        // TODO: Sostituisci con tua API
        console.log('Invio dati sanitizzati:', sanitizedData);
        
        // Simula API call
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(sanitizedData)
        // });
        // if (!response.ok) throw new Error('Errore invio');

        setIsAnimating(false);
        setSubmitStatus('success');

        const timeout4 = setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            reason: '',
            service: 'Consulenza',
            message: ''
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
        }, 4000);
        timeoutsRef.current.push(timeout6);

      } catch (error) {
        console.error('Errore invio form:', error);
        setIsAnimating(false);
        setSubmitStatus('error');
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
