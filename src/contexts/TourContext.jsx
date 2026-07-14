import { createContext, useContext, useState, useCallback } from 'react';

/*
 * Ogni step punta a un data-tour. Su mobile (<=768px) molti bersagli
 * desktop sono display:none (link navbar, logo, widget Iris, toggle tema
 * fisso): senza alternative lo spotlight illuminava rettangoli 0x0.
 * - mobileTarget: bersaglio alternativo da usare su mobile
 * - mobileSkip:   lo step viene saltato su mobile (l'elemento narrato
 *                 non esiste proprio, es. badge disponibilita')
 */
export const TOUR_STEPS = [
  {
    id:           'intro',
    target:       'iris-widget',
    mobileTarget: 'nav-iris-mobile',
    text:   'Ciao! Sono Iris, sono stata creata per rendere questo sito accessibile a tutti.',
    audio:  '/audio/iris/iris-tour-intro.ogg',
  },
  {
    id:           'toggle',
    target:       'iris-widget',
    mobileTarget: 'nav-iris-mobile',
    text:   'Puoi disattivarmi o attivarmi cliccando su di me come hai già fatto.',
    audio:  '/audio/iris/iris-tour-toggle.ogg',
  },
  {
    id:         'logo',
    target:     'nav-logo',
    spotPad:    24,
    mobileSkip: true,
    text:    'Oltre ad essere il nostro logo, questa è la seconda mascotte del sito, clicca su di lei per tornare alla home.',
    audio:   '/audio/iris/iris-tour-logo.ogg',
  },
  {
    id:           'servizi',
    target:       'nav-servizi',
    mobileTarget: 'nav-hamburger',
    text:   'Puoi visitare questa pagina per scoprire come eroghiamo le nostre prestazioni e cosa offriamo.',
    audio:  '/audio/iris/iris-tour-servizi.ogg',
  },
  {
    id:           'portfolio',
    target:       'nav-portfolio',
    mobileTarget: 'nav-hamburger',
    text:   'Abbiamo creato questa sezione per mostrare i nostri lavori e cosa possiamo e abbiamo già fatto.',
    audio:  '/audio/iris/iris-tour-portfolio.ogg',
  },
  {
    id:           'storia',
    target:       'nav-storia',
    mobileTarget: 'nav-hamburger',
    text:   'In questa sezione puoi trovare più informazioni su chi ha creato questo sito.',
    audio:  '/audio/iris/iris-tour-storia.ogg',
  },
  {
    id:           'contatti',
    target:       'nav-contatti',
    mobileTarget: 'nav-hamburger',
    text:   'Puoi visitare questa sezione nel caso volessi contattarci.',
    audio:  '/audio/iris/iris-tour-contatti.ogg',
  },
  {
    id:           'settings',
    target:       'nav-settings',
    mobileTarget: 'nav-hamburger',
    text:   'Da qui puoi gestire alcune impostazioni del sito.',
    audio:  '/audio/iris/iris-tour-settings.ogg',
  },
  {
    id:         'availability',
    target:     'nav-availability',
    mobileSkip: true,
    text:   'Questo spazio mostra se siamo disponibili o attualmente occupati in progetti o lavori.',
    audio:  '/audio/iris/iris-tour-availability.ogg',
  },
  {
    id:     'scrolling',
    target: 'scrolling-header',
    text:   'Questo è un banner che mostra alcune interessanti novità nell\'ambito nel quale lavoriamo.',
    audio:  '/audio/iris/iris-tour-scrolling.ogg',
  },
  {
    id:           'controls',
    target:       'audio-theme-controls',
    mobileTarget: 'nav-theme-compact',
    text:   'Da qui puoi attivare o mutare la musica del sito o cambiare modalità visiva.',
    audio:  '/audio/iris/iris-tour-controls.ogg',
  },
  {
    id:     'footer',
    target: 'site-footer',
    text:   'Qui trovi tutte le informazioni su di noi e regole di utilizzo del sito, visita i nostri social e seguici se ti piace quel che vedi!',
    audio:  '/audio/iris/iris-tour-footer.ogg',
  },
];

export const isTourMobile = () => window.matchMedia('(max-width: 768px)').matches;

const TourContext = createContext(null);

export const TourProvider = ({ children }) => {
  const [active,   setActive]   = useState(false);
  const [stepIdx,  setStepIdx]  = useState(0);
  // Lista effettiva degli step: su mobile i mobileSkip vengono esclusi
  // all'avvio, cosi' avanti/indietro e la barra di progresso restano
  // coerenti senza logica di salto direzionale.
  const [steps,    setSteps]    = useState(TOUR_STEPS);

  const startTour = useCallback(() => {
    setSteps(isTourMobile() ? TOUR_STEPS.filter(s => !s.mobileSkip) : TOUR_STEPS);
    setStepIdx(0);
    setActive(true);
  }, []);

  const nextStep = useCallback(() => {
    setStepIdx(prev => {
      const next = prev + 1;
      if (next >= steps.length) {
        setActive(false);
        return 0;
      }
      return next;
    });
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setStepIdx(prev => Math.max(0, prev - 1));
  }, []);

  const endTour = useCallback(() => {
    setActive(false);
    setStepIdx(0);
  }, []);

  const currentStep = active ? steps[stepIdx] : null;

  return (
    <TourContext.Provider value={{ active, stepIdx, steps, currentStep, startTour, nextStep, prevStep, endTour }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
