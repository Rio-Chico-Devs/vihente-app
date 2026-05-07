import { createContext, useContext, useState, useCallback } from 'react';

const SettingsContext = createContext(null);

const savedNum = (key, def) => {
  try { const v = parseFloat(localStorage.getItem(key)); return isNaN(v) ? def : v; }
  catch { return def; }
};

export const SettingsProvider = ({ children }) => {
  const [irisVolume,  setIrisVol]  = useState(() => savedNum('s-iris-vol',  1));
  const [musicVolume, setMusicVol] = useState(() => savedNum('s-music-vol', 1));

  const setIrisVolume = useCallback((v) => {
    setIrisVol(v);
    try { localStorage.setItem('s-iris-vol', v); } catch {}
  }, []);

  const setMusicVolume = useCallback((v) => {
    setMusicVol(v);
    try { localStorage.setItem('s-music-vol', v); } catch {}
  }, []);

  const clearData = useCallback(() => {
    try { localStorage.clear(); } catch {}
    setTimeout(() => window.location.reload(), 400);
  }, []);

  return (
    <SettingsContext.Provider value={{ irisVolume, setIrisVolume, musicVolume, setMusicVolume, clearData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
