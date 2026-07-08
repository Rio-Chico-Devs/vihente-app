import { createContext, useContext, useState, useCallback, useMemo } from 'react';

/*
 * Contesto guida diviso in DUE context:
 * - GuideActionsContext: setGuide/clearGuide, value stabile (mai ricreato).
 *   Consumato dalle pagine che impostano i tooltip in hover.
 * - GuideTextContext: il testo corrente. Consumato solo da chi lo mostra
 *   (Iris). Prima erano un context unico: ogni hover ri-renderizzava TUTTI
 *   i 26 consumer, inclusa l'intera pagina corrente, due volte
 *   (mouseenter + mouseleave).
 */
const GuideActionsContext = createContext(null);
const GuideTextContext = createContext(null);

export const GuideProvider = ({ children }) => {
  const [text, setText] = useState(null);

  const setGuide   = useCallback((t) => setText(t), []);
  const clearGuide = useCallback(() => setText(null), []);

  const actions = useMemo(
    () => ({ setGuide, clearGuide }),
    [setGuide, clearGuide]
  );

  return (
    <GuideActionsContext.Provider value={actions}>
      <GuideTextContext.Provider value={text}>
        {children}
      </GuideTextContext.Provider>
    </GuideActionsContext.Provider>
  );
};

/* Per chi imposta i tooltip: non si ri-renderizza quando il testo cambia. */
export const useGuideActions = () => useContext(GuideActionsContext);

/* Per chi mostra il testo (Iris). */
export const useGuideText = () => useContext(GuideTextContext);

/* Compat: firma storica { text, setGuide, clearGuide }.
   ATTENZIONE: chi la usa si ri-renderizza a ogni cambio di testo — va bene
   solo per i componenti che il testo lo mostrano davvero. Per i tooltip
   hover usare useGuideActions(). */
export const useGuide = () => {
  const actions = useGuideActions();
  const text = useGuideText();
  return useMemo(() => ({ text, ...actions }), [text, actions]);
};
