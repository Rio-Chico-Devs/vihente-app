import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const SettingsContext = createContext(null);

const savedNum = (key, def) => {
  try { const v = parseFloat(localStorage.getItem(key)); return isNaN(v) ? def : v; }
  catch { return def; }
};

const savedBool = (key, def) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? def : v === 'true';
  } catch { return def; }
};

export const SettingsProvider = ({ children }) => {
  const [irisVolume,  setIrisVol]  = useState(() => savedNum('s-iris-vol',  1));
  const [musicVolume, setMusicVol] = useState(() => savedNum('s-music-vol', 1));
  const [fxVolume,    setFxVol]    = useState(() => savedNum('s-fx-vol',    1));
  // Accessibilita': ripristina il cursore nativo del sistema operativo
  // (il dot custom nasconde I-beam, resize e le impostazioni OS tipo
  // "cursore grande" usate da utenti ipovedenti o con difficolta' motorie).
  const [systemCursor, setSysCursor] = useState(() => savedBool('s-system-cursor', false));

  const setIrisVolume = useCallback((v) => {
    setIrisVol(v);
    try { localStorage.setItem('s-iris-vol', v); } catch {}
  }, []);

  const setMusicVolume = useCallback((v) => {
    setMusicVol(v);
    try { localStorage.setItem('s-music-vol', v); } catch {}
  }, []);

  const setFxVolume = useCallback((v) => {
    setFxVol(v);
    try { localStorage.setItem('s-fx-vol', v); } catch {}
  }, []);

  const setSystemCursor = useCallback((v) => {
    setSysCursor(v);
    try { localStorage.setItem('s-system-cursor', v); } catch {}
  }, []);

  const clearData = useCallback(() => {
    try { localStorage.clear(); } catch {}
    setTimeout(() => window.location.reload(), 400);
  }, []);

  const value = useMemo(() => ({
    irisVolume, setIrisVolume,
    musicVolume, setMusicVolume,
    fxVolume, setFxVolume,
    systemCursor, setSystemCursor,
    clearData,
  }), [irisVolume, setIrisVolume, musicVolume, setMusicVolume, fxVolume, setFxVolume, systemCursor, setSystemCursor, clearData]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
