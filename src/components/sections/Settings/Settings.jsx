import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../../contexts/SettingsContext';
import { useGuide } from '../../../contexts/GuideContext';
import { useTour } from '../../../contexts/TourContext';
import './Settings.css';

const Settings = () => {
  const { irisVolume, setIrisVolume, musicVolume, setMusicVolume, fxVolume, setFxVolume, clearData } = useSettings();
  const { setGuide, clearGuide } = useGuide();
  const { startTour } = useTour();
  const navigate = useNavigate();
  const [clearStep, setClearStep] = useState(0);
  const [savedLabel, setSavedLabel] = useState('');
  const [savedTick,  setSavedTick]  = useState(0);  /* forces animation restart */
  const debounceRef = useRef(null);
  const hideRef     = useRef(null);

  const pct = (v) => `${Math.round(v * 100)}%`;

  /* Debounced "✓ Salvato": fires 400ms after last change so it doesn't flicker
     during slider drag, then auto-hides after 1.4s. */
  const showSaved = useCallback((label) => {
    clearTimeout(debounceRef.current);
    clearTimeout(hideRef.current);
    debounceRef.current = setTimeout(() => {
      setSavedLabel(label);
      setSavedTick(t => t + 1);
      hideRef.current = setTimeout(() => setSavedLabel(''), 1400);
    }, 400);
  }, []);

  const handleClear = () => {
    if (clearStep === 0) { setClearStep(1); return; }
    if (clearStep === 1) { setClearStep(2); setTimeout(clearData, 900); }
  };

  const handleRestartTour = () => {
    startTour();
    navigate('/');
  };

  return (
    <section className="settings-section">
      <div className="settings-vignette" />
      <div className="settings-container">

        <div className="settings-header">
          <span className="settings-tag">// SYS.CONFIG //</span>
          <h1 className="settings-title">IMPOSTAZIONI</h1>
        </div>

        <div className="settings-grid">

        {/* ── Col sinistra: Audio ── */}
        <div className="settings-group">
          <h2 className="settings-group-title">◈ Audio</h2>

          <div
            className="settings-row"
            onMouseEnter={() => setGuide('Volume della voce di Iris — regola quanto è alta la sua voce.')}
            onMouseLeave={clearGuide}
          >
            <div className="settings-label">
              <span>Voce di Iris</span>
              <span className="settings-value">{pct(irisVolume)}</span>
            </div>
            <input
              type="range" min="0" max="100"
              value={Math.round(irisVolume * 100)}
              style={{ '--pct': pct(irisVolume) }}
              onChange={(e) => { setIrisVolume(Number(e.target.value) / 100); showSaved('iris'); }}
              className="settings-slider"
              aria-label="Volume voce Iris"
            />
            {savedLabel === 'iris' && <span key={`iris-${savedTick}`} className="settings-saved">✓ Salvato</span>}
          </div>

          <div
            className="settings-row"
            onMouseEnter={() => setGuide('Volume delle tracce musicali — controlla soundtrack e musica del Black Market.')}
            onMouseLeave={clearGuide}
          >
            <div className="settings-label">
              <span>Tracce Musicali</span>
              <span className="settings-value">{pct(musicVolume)}</span>
            </div>
            <input
              type="range" min="0" max="100"
              value={Math.round(musicVolume * 100)}
              style={{ '--pct': pct(musicVolume) }}
              onChange={(e) => { setMusicVolume(Number(e.target.value) / 100); showSaved('music'); }}
              className="settings-slider"
              aria-label="Volume musica"
            />
            {savedLabel === 'music' && <span key={`music-${savedTick}`} className="settings-saved">✓ Salvato</span>}
          </div>

          <div
            className="settings-row"
            onMouseEnter={() => setGuide('Volume degli effetti sonori — click, jingle di Iris e suoni di interfaccia.')}
            onMouseLeave={clearGuide}
          >
            <div className="settings-label">
              <span>Effetti Sonori</span>
              <span className="settings-value">{pct(fxVolume)}</span>
            </div>
            <input
              type="range" min="0" max="100"
              value={Math.round(fxVolume * 100)}
              style={{ '--pct': pct(fxVolume) }}
              onChange={(e) => { setFxVolume(Number(e.target.value) / 100); showSaved('fx'); }}
              className="settings-slider"
              aria-label="Volume effetti sonori"
            />
            {savedLabel === 'fx' && <span key={`fx-${savedTick}`} className="settings-saved">✓ Salvato</span>}
          </div>
        </div>

        {/* ── Col destra: Tour + Dati ── */}
        <div className="settings-col-right">

          <div className="settings-group">
            <h2 className="settings-group-title">◈ Tour Guidato</h2>
            <p className="settings-desc">
              Rivivi il tour guidato di Iris per scoprire tutte le sezioni del sito.
            </p>
            <button
              className="settings-tour-btn"
              onClick={handleRestartTour}
              onMouseEnter={() => setGuide('Riavvia il tour guidato di Iris — ti mostra tutte le sezioni del sito.')}
              onMouseLeave={clearGuide}
            >
              <span className="btn-bracket">[</span>
              {' AVVIA TOUR GUIDATO '}
              <span className="btn-bracket">]</span>
            </button>
          </div>

          <div className="settings-group">
            <h2 className="settings-group-title">◈ Dati di Navigazione</h2>
            <p className="settings-desc">
              Cancella le preferenze salvate: tema, stato audio, configurazione Iris e volumi.<br />
              Il sito si riavvierà con le impostazioni predefinite.
            </p>

            <button
              className={`settings-clear-btn${clearStep > 0 ? ` step-${clearStep}` : ''}`}
              onClick={handleClear}
              disabled={clearStep === 2}
              onMouseEnter={() => setGuide('Cancella tutti i dati salvati dal sito. Il sito si riavvierà.')}
              onMouseLeave={clearGuide}
            >
              <span className="btn-bracket">[</span>
              {clearStep === 0 && ' FORMAT DATA '}
              {clearStep === 1 && ' SICURO? CLICCA ANCORA '}
              {clearStep === 2 && ' CANCELLAZIONE IN CORSO... '}
              <span className="btn-bracket">]</span>
            </button>

            {clearStep === 1 && (
              <p className="settings-warn">⚠ Questa operazione è irreversibile.</p>
            )}
          </div>

        </div>
        </div>{/* /settings-grid */}

      </div>
    </section>
  );
};

export default Settings;
