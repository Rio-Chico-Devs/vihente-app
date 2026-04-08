import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const GuideContext = createContext(null);

export const GuideProvider = ({ children }) => {
  const [text, setText] = useState(null);

  const setGuide   = useCallback((t) => setText(t), []);
  const clearGuide = useCallback(() => setText(null), []);

  const value = useMemo(
    () => ({ text, setGuide, clearGuide }),
    [text, setGuide, clearGuide]
  );

  return (
    <GuideContext.Provider value={value}>
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => useContext(GuideContext);
