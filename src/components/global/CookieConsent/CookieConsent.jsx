import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

const CookieConsentBanner = ({ isBooting }) => {
  useEffect(() => {
    // Non caricare il banner se stiamo ancora facendo boot
    if (isBooting) return;

    const loadCookieConsent = async () => {
      const CookieConsent = await import('vanilla-cookieconsent');

      CookieConsent.run({
        guiOptions: {
          consentModal: {
            layout: 'box',
            position: 'middle center',
            equalWeightButtons: false,
            flipButtons: false
          },
          preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: false,
            flipButtons: false
          }
        },

        categories: {
          necessary: {
            readOnly: true,
            enabled: true
          },
          analytics: {
            enabled: false,
            readOnly: false
          }
        },

        language: {
          default: 'it',

          translations: {
            it: {
              consentModal: {
                title: '🍪 Utilizzo dei Cookie',
                description: 'Questo sito utilizza cookie tecnici necessari per il funzionamento. Non utilizziamo cookie di profilazione o marketing. Continuando la navigazione, acconsenti all\'uso dei cookie.',
                acceptAllBtn: 'Accetta tutti',
                acceptNecessaryBtn: 'Rifiuta tutti',
                showPreferencesBtn: 'Gestisci preferenze',
                footer: '<a href="/privacy-policy">Privacy Policy</a> | <a href="/cookie-policy">Cookie Policy</a>'
              },
              preferencesModal: {
                title: 'Preferenze Cookie',
                acceptAllBtn: 'Accetta tutti',
                acceptNecessaryBtn: 'Rifiuta tutti',
                savePreferencesBtn: 'Salva preferenze',
                closeIconLabel: 'Chiudi',
                serviceCounterLabel: 'Servizi',
                sections: [
                  {
                    title: 'Utilizzo dei Cookie',
                    description: 'Utilizziamo cookie per garantire le funzionalità di base del sito web e per migliorare la tua esperienza online. Puoi scegliere per ogni categoria di accettare o rifiutare quando vuoi.'
                  },
                  {
                    title: 'Cookie Strettamente Necessari <span class="pm__badge">Sempre Abilitati</span>',
                    description: 'Questi cookie sono essenziali per il corretto funzionamento del sito. Senza questi cookie, il sito non funzionerebbe correttamente.',
                    linkedCategory: 'necessary'
                  },
                  {
                    title: 'Cookie di Performance e Analytics',
                    description: 'Questi cookie ci permettono di capire come i visitatori interagiscono con il sito raccogliendo informazioni in forma anonima. Attualmente non in uso.',
                    linkedCategory: 'analytics'
                  },
                  {
                    title: 'Maggiori informazioni',
                    description: 'Per qualsiasi domanda relativa alla nostra politica sui cookie e alle tue scelte, <a class="cc__link" href="/privacy-policy">contattaci</a>.'
                  }
                ]
              }
            }
          }
        }
      });
    };

    loadCookieConsent();
  }, [isBooting]);

  // CSS Custom per tema cyberpunk
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `:root {
        --cc-bg: #000;
        --cc-text: rgba(255, 255, 255, 0.95);
        --cc-btn-primary-bg: rgba(3, 33, 33, 1);
        --cc-btn-primary-text: #000;
        --cc-btn-primary-hover-bg: #00cccc;
        --cc-btn-secondary-bg: transparent;
        --cc-btn-secondary-text: #0ff;
        --cc-btn-secondary-hover-bg: rgba(0, 255, 255, 0.1);
        --cc-separator-border-color: rgba(0, 255, 255, 0.3);
        --cc-toggle-bg-off: #1a1a1a;
        --cc-toggle-bg-on: rgba(3, 70, 70, 1);
        --cc-toggle-knob-bg: #fff;
        --cc-toggle-knob-icon-color: #000;
        --cc-overlay-bg: rgba(0, 0, 0, 0.93);
        --cc-cookie-category-block-bg:  rgba(1, 31, 31, 0.1);
        --cc-toggle-on-bg:rgba(123, 183, 20, 1);
        --cc-toggle-readonly-knob-icon-color: rgba(123, 183, 20, 1);
        --cc-cookie-category-block-hover-bg: rgba(0, 255, 255, 0.1);
      }

      /* LIMITA Z-INDEX del cookie banner per permettere al cursore di stare sopra */
      #cc-main {
        z-index: 1000000 !important;
      }

      /* Overlay styling (NO z-index override) */
      #cc-main .cm__overlay,
      #cc-main .pm__overlay {
        background: var(--cc-overlay-bg) !important;
        backdrop-filter: blur(5px) !important;
      }

      /* Font globale */
      #cc-main * {
        font-family: 'Share Tech Mono', monospace !important;
      }

      /* ========== CONSENT MODAL (Banner iniziale) - CENTRATO ========== */
      #cc-main .cm {
        background: #000 !important;
        border: 3px solid rgba(0, 255, 255, 0.6) !important;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.5), 0 0 100px rgba(0, 255, 255, 0.3) !important;
        border-radius: 12px !important;
        padding: 2rem 2.5rem !important;
        max-width: 650px !important;
        width: 90vw !important;
      }

      /* Titolo banner */
      #cc-main .cm__title {
        font-family: 'Orbitron', sans-serif !important;
        color: #0ff !important;
        text-shadow: 0 0 15px rgba(0, 255, 255, 0.6) !important;
        font-size: 1.6rem !important;
        font-weight: 900 !important;
        margin-bottom: 1.25rem !important;
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
      }

      /* Descrizione banner */
      #cc-main .cm__desc {
        color: rgba(255, 255, 255, 0.9) !important;
        line-height: 1.7 !important;
        font-size: 1rem !important;
        margin-bottom: 1.5rem !important;
      }

      /* Footer con link */
      #cc-main .cm__footer {
        border-top: 2px solid rgba(0, 255, 255, 0.3) !important;
        padding-top: 1.25rem !important;
        margin-top: 1.5rem !important;
      }

      /* Link */
      #cc-main a, #cc-main .cc__link {
        color: #0ff !important;
        text-decoration: underline !important;
        font-weight: 600 !important;
        transition: all 0.2s ease !important;
      }

      #cc-main a:hover, #cc-main .cc__link:hover {
        color: #fff !important;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8) !important;
      }

      /* Bottoni */
      #cc-main .cm__btn, #cc-main .pm__btn {
        font-family: 'Orbitron', sans-serif !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        padding: 0.9rem 1.75rem !important;
        transition: all 0.3s ease !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        font-size: 0.95rem !important;
        border: 2px solid #0ff !important;
        cursor: pointer !important;
        min-width: 140px !important;
      }

      /* Bottone primario */
      #cc-main .cm__btn--primary, #cc-main .pm__btn--primary {
        background: rgba(12, 72, 72, 1) !important;
        color: #000 !important;
        border-color: #0ff !important;
        font-weight: 900 !important;
      }

      #cc-main .cm__btn--primary:hover, #cc-main .pm__btn--primary:hover {
        background: #113939ff !important;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3) !important;
        transform: translateY(-3px) !important;
      }

      /* Bottone secondario */
      #cc-main .cm__btn--secondary, #cc-main .pm__btn--secondary {
        background: rgba(0, 255, 255, 0.05) !important;
        color: #0ff !important;
        border-color: #0ff !important;
      }

      #cc-main .cm__btn--secondary:hover, #cc-main .pm__btn--secondary:hover {
        background: rgba(0, 255, 255, 0.15) !important;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
        transform: translateY(-2px) !important;
      }

      /* Container bottoni */
      #cc-main .cm__btns, #cc-main .pm__btns {
        gap: 0.85rem !important;
        margin-top: 1.25rem !important;
      }

      /* ========== PREFERENCES MODAL (Impostazioni) ========== */
      #cc-main .pm {
        background: #000 !important;
        border: 3px solid rgba(0, 255, 255, 0.6) !important;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.5) !important;
        border-radius: 12px !important;
        padding: 2.5rem !important;
        max-width: 800px !important;
        max-height: 85vh !important;
        overflow-y: auto !important;
      }

      /* Titolo modale preferenze */
      #cc-main .pm__title {
        font-family: 'Orbitron', sans-serif !important;
        color: #0ff !important;
        text-shadow: 0 0 15px rgba(0, 255, 255, 0.6) !important;
        font-size: 2rem !important;
        font-weight: 900 !important;
        margin-bottom: 2rem !important;
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
      }

      /* Body modale */
      #cc-main .pm__body {
        color: rgba(255, 255, 255, 0.9) !important;
        line-height: 1.8 !important;
      }

      /* Sezioni */
      #cc-main .pm__section {
        background: rgba(0, 255, 255, 0.03) !important;
        border: 2px solid rgba(0, 255, 255, 0.25) !important;
        border-radius: 8px !important;
        padding: 1.5rem !important;
        margin-bottom: 1.5rem !important;
        transition: all 0.3s ease !important;
      }

      #cc-main .pm__section:hover {
        background: rgba(0, 255, 255, 0.08) !important;
        border-color: rgba(0, 255, 255, 0.4) !important;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.2) !important;
      }

      /* Titolo sezione */
      #cc-main .pm__section-title {
        font-family: 'Orbitron', sans-serif !important;
        color: #0ff !important;
        font-size: 1.15rem !important;
        font-weight: 700 !important;
        margin-bottom: 0.75rem !important;
        display: flex !important;
        align-items: center !important;
        gap: 0.75rem !important;
      }

      /* Descrizione sezione */
      #cc-main .pm__section-desc {
        color: rgba(255, 255, 255, 0.85) !important;
        line-height: 1.7 !important;
        font-size: 0.95rem !important;
      }

      /* Badge "Sempre Abilitati" */
      #cc-main .pm__badge {
        background: rgba(0, 255, 255, 0.15) !important;
        color: #0ff !important;
        border: 2px solid #0ff !important;
        font-size: 0.7rem !important;
        padding: 0.3rem 0.7rem !important;
        border-radius: 4px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.3) !important;
      }

      /* Toggle switch */
      #cc-main .section__toggle {
        background: #1a1a1a !important;
        border: 2px solid rgba(0, 255, 255, 0.4) !important;
        border-radius: 20px !important;
        width: 68px !important;
        height: 32px !important;
        position: relative !important;
        transition: all 0.3s ease !important;
        
      }

      #cc-main .section__toggle.toggle--on {
        background: rgba(0, 255, 255, 0.2) !important;
        border-color: #0ff !important;
      }

      #cc-main .toggle__icon {
        background: #0ff !important;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.6) !important;
        width: 26px !important;
        height: 24px !important;
        border-radius: 50% !important;
         position: absolute !important;

        top: 65% !important;

        transform: translateY(-46%) !important;
        

        height: 24px !important;

        border-radius: 50% !important;
      }

      #cc-main .section__toggle-wrapper {
    cursor: pointer;
    position: absolute;
    right: 28px;
    top: 12px;
    z-index: 1;
}
    #cc-main .section__toggle:checked~.toggle__icon .toggle__icon-circle{
    background-color: var(--cc-toggle-on-knob-bg);
    transform: translateX(42px);
}

      #cc-main .section__toggle.toggle--readonly {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
      }

      /* Header sezione con toggle */
      #cc-main .pm__section-header {
          display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 1rem !important;
      }

      /* Scrollbar personalizzata */
      #cc-main .pm__body::-webkit-scrollbar {
        width: 10px !important;
      }

      #cc-main .pm__body::-webkit-scrollbar-track {
        background: rgba(0, 255, 255, 0.05) !important;
        border-radius: 5px !important;
      }

      #cc-main .pm__body::-webkit-scrollbar-thumb {
        background: rgba(0, 255, 255, 0.3) !important;
        border-radius: 5px !important;
      }

      #cc-main .pm__body::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 255, 255, 0.5) !important;
      }

      /* Animazione di entrata */
      @keyframes ccSlideInScale {
        from {
          opacity: 0;
          transform: scale(0.85);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      #cc-main .cm {
        animation: ccSlideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      }

      @keyframes ccFadeIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      #cc-main .pm {
        animation: ccFadeIn 0.3s ease-out !important;
      }

      /* ========== RESPONSIVE - MOBILE ========== */
      @media (max-width: 768px) {
        /* Banner iniziale mobile */
        #cc-main .cm {
          width: 92vw !important;
          padding: 1.5rem !important;
          max-width: none !important;
        }

        #cc-main .cm__title {
          font-size: 1.3rem !important;
          margin-bottom: 1rem !important;
        }

        #cc-main .cm__desc {
          font-size: 0.92rem !important;
          line-height: 1.6 !important;
          margin-bottom: 1.25rem !important;
        }

        #cc-main .cm__footer {
          padding-top: 1rem !important;
          margin-top: 1.25rem !important;
        }

        /* Bottoni mobile - stack verticale */
        #cc-main .cm__btns {
          flex-direction: column !important;
          gap: 0.75rem !important;
        }

        #cc-main .cm__btn, #cc-main .pm__btn {
          font-size: 0.88rem !important;
          padding: 0.8rem 1.4rem !important;
          width: 100% !important;
        }

        /* Modale preferenze mobile */
        #cc-main .pm {
          width: 92vw !important;
          max-width: none !important;
          padding: 1.5rem !important;
          max-height: 88vh !important;
        }

        #cc-main .pm__title {
          font-size: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }

        #cc-main .pm__section {
          padding: 1.25rem !important;
          margin-bottom: 1rem !important;
        }

        #cc-main .pm__section-title {
          font-size: 1rem !important;
          flex-wrap: wrap !important;
        }

        #cc-main .pm__section-desc {
          font-size: 0.88rem !important;
        }

        #cc-main .pm__badge {
          font-size: 0.65rem !important;
          padding: 0.25rem 0.6rem !important;
        }
      }

      /* Mobile piccolo (< 480px) */
      @media (max-width: 480px) {
        #cc-main .cm {
          padding: 1.25rem !important;
        }

        #cc-main .cm__title {
          font-size: 1.15rem !important;
          letter-spacing: 0.05em !important;
        }

        #cc-main .cm__desc {
          font-size: 0.85rem !important;
        }

        #cc-main .cm__btn, #cc-main .pm__btn {
          font-size: 0.82rem !important;
          padding: 0.75rem 1.25rem !important;
        }

        #cc-main .pm__title {
          font-size: 1.25rem !important;
        }

        #cc-main .pm__section-title {
          font-size: 0.92rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default CookieConsentBanner;