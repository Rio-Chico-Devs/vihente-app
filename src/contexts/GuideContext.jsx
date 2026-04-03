import { createContext, useContext, useState, useCallback } from 'react';

const GuideContext = createContext(null);

export const GuideProvider = ({ children }) => {
  const [text, setText] = useState(null);

  const setGuide   = useCallback((t) => setText(t), []);
  const clearGuide = useCallback(() => setText(null), []);

  return (
    <GuideContext.Provider value={{ text, setGuide, clearGuide }}>
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => useContext(GuideContext);
