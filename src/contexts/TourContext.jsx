import { createContext, useContext, useState, useCallback } from 'react';

export const TOUR_STEPS = [
  {
    id:     'intro',
    target: null,
    text:   'Ciao! Sono Iris, sono stata creata per rendere questo sito accessibile a tutti.',
    audio:  '/audio/iris/iris-tour-intro.ogg',
  },
  {
    id:     'toggle',
    target: 'iris-widget',
    text:   'Puoi disattivarmi o attivarmi cliccando su di me come hai già fatto.',
    audio:  '/audio/iris/iris-tour-toggle.ogg',
  },
  {
    id:     'logo',
    target: 'nav-logo',
    text:   'Oltre ad essere il nostro logo, questa è la seconda mascotte del sito, clicca su di lei per tornare alla home.',
    audio:  '/audio/iris/iris-tour-logo.ogg',
  },
  {
    id:     'servizi',
    target: 'nav-servizi',
    text:   'Puoi visitare questa pagina per scoprire come eroghiamo le nostre prestazioni e cosa offriamo.',
    audio:  '/audio/iris/iris-tour-servizi.ogg',
  },
  {
    id:     'portfolio',
    target: 'nav-portfolio',
    text:   'Abbiamo creato questa sezione per mostrare i nostri lavori e cosa possiamo e abbiamo già fatto.',
    audio:  '/audio/iris/iris-tour-portfolio.ogg',
  },
  {
    id:     'storia',
    target: 'nav-storia',
    text:   'In questa sezione puoi trovare più informazioni su chi ha creato questo sito.',
    audio:  '/audio/iris/iris-tour-storia.ogg',
  },
  {
    id:     'contatti',
    target: 'nav-contatti',
    text:   'Puoi visitare questa sezione nel caso volessi contattarci.',
    audio:  '/audio/iris/iris-tour-contatti.ogg',
  },
  {
    id:     'settings',
    target: 'nav-settings',
    text:   'Da qui puoi gestire alcune impostazioni del sito.',
    audio:  '/audio/iris/iris-tour-settings.ogg',
  },
  {
    id:     'availability',
    target: 'nav-availability',
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
    id:     'controls',
    target: 'audio-theme-controls',
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

const TourContext = createContext(null);

export const TourProvider = ({ children }) => {
  const [active,   setActive]   = useState(false);
  const [stepIdx,  setStepIdx]  = useState(0);

  const startTour = useCallback(() => {
    setStepIdx(0);
    setActive(true);
  }, []);

  const nextStep = useCallback(() => {
    setStepIdx(prev => {
      const next = prev + 1;
      if (next >= TOUR_STEPS.length) {
        setActive(false);
        return 0;
      }
      return next;
    });
  }, []);

  const endTour = useCallback(() => {
    setActive(false);
    setStepIdx(0);
  }, []);

  const currentStep = active ? TOUR_STEPS[stepIdx] : null;

  return (
    <TourContext.Provider value={{ active, stepIdx, currentStep, startTour, nextStep, endTour }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
