import { useState } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';
import { useGuide } from '../../../contexts/GuideContext';
import './Settings.css';

const Settings = () => {
  const { irisVolume, setIrisVolume, musicVolume, setMusicVolume, clearData } = useSettings();
  const { setGuide, clearGuide } = useGuide();
  const [clearStep, setClearStep] = useState(0); // 0 idle · 1 confirm · 2 wiping

  const handleClear = () => {
    if (clearStep === 0) { setClearStep(1); return; }
    if (clearStep === 1) { setClearStep(2); setTimeout(clearData, 900); }
  };

  const pct = (v) => `${Math.round(v * 100)}%`;

  return (
    <section className="settings-section">
      <div className="settings-container">

        <div className="settings-header">
          <span className="settings-tag">// SYS.CONFIG //</span>
          <h1 className="settings-title">IMPOSTAZIONI</h1>
        </div>

        {/* ── Audio ── */}
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
              onChange={(e) => setIrisVolume(Number(e.target.value) / 100)}
              className="settings-slider"
              aria-label="Volume voce Iris"
            />
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
              onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
              className="settings-slider"
              aria-label="Volume musica"
            />
          </div>
        </div>

        {/* ── Dati ── */}
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
    </section>
  );
};

export default Settings;
