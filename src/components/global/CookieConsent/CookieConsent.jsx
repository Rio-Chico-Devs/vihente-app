import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './CookieConsent.css';

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

  return null;
};

export default CookieConsentBanner;