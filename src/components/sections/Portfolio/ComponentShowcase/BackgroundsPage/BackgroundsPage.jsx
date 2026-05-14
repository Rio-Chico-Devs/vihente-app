import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuide } from '../../../../../contexts/GuideContext';
import { WALLPAPERS, WallpaperRenderer } from './shaders';
import './BackgroundsPage.css';

const DESCRIPTIONS = {
  haze:   'Bande orizzontali stratificate. Il cursore illumina localmente la sua banda.',
  mesh:   'Griglia di punti statici. Il cursore accende i punti vicini con falloff esponenziale.',
  strata: 'Curve di livello da rumore FBM statico. Il cursore solleva un dosso locale.',
  prism:  'Tassellatura triangolare cristallina. Il cursore è la sorgente di luce direzionale.',
  field:  'Griglia magnetica: le linee si piegano verso il cursore. Click = impulso d\'onda.',
};

const BackgroundsPage = () => {
  const navigate = useNavigate();
  const { setGuide, clearGuide } = useGuide();

  const canvasRef   = useRef(null);
  const rendererRef = useRef(null);

  const [activeId,    setActiveId]    = useState('prism');
  const [tweaks,      setTweaks]      = useState({ density: 1.0, glow: 0.55, motion: 0.0 });
  const [mono,        setMono]        = useState(false);
  const [showTweaks,  setShowTweaks]  = useState(false);
  const [webglError,  setWebglError]  = useState(false);

  /* ── Init / swap shader on activeId change ───────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (rendererRef.current) {
      rendererRef.current.destroy();
      rendererRef.current = null;
    }

    const wl = WALLPAPERS.find(w => w.id === activeId);
    if (!wl) return;

    const r = new WallpaperRenderer(canvas, wl.frag, wl.accent);

    /* Check WebGL availability */
    if (!r._gl) { setWebglError(true); return; }
    setWebglError(false);

    r.setTweaks({ ...tweaks, mono, ease: 8.0 });
    rendererRef.current = r;

    /* Pause when off-screen */
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting ? r.start_() : r.stop_(),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    /* Pause when tab hidden */
    const onVis = () => document.hidden ? r.stop_() : r.start_();
    document.addEventListener('visibilitychange', onVis);

    r.start_();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      r.destroy();
      rendererRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  /* ── Hot-update tweaks/mono without re-init ──────────────────────────── */
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setTweaks({ ...tweaks, mono, ease: 8.0 });
    }
  }, [tweaks, mono]);

  const activeWl = WALLPAPERS.find(w => w.id === activeId);

  return (
    <div className="bgp-page">
      {/* Fullscreen WebGL canvas */}
      <canvas ref={canvasRef} className="bgp-canvas" />

      {/* WebGL error fallback */}
      {webglError && (
        <div className="bgp-error">
          <span>WebGL non disponibile su questo dispositivo.</span>
        </div>
      )}

      {/* UI overlay — z below navbar */}
      <div className="bgp-ui" aria-label="Controlli shader">

        {/* Top bar */}
        <div className="bgp-topbar">
          <button
            className="bgp-back"
            onClick={() => navigate('/portfolio/componenti')}
            onMouseEnter={() => setGuide('Torna alla lista dei componenti.')}
            onMouseLeave={clearGuide}
          >
            ← COMPONENTI
          </button>

          <div className="bgp-title-group">
            <span className="bgp-section-label">SHADER WALLPAPERS</span>
            {activeWl && (
              <span className="bgp-active-name" style={{ color: activeWl.accent }}>
                {activeWl.name}
              </span>
            )}
          </div>

          <button
            className={`bgp-tweaks-toggle ${showTweaks ? 'open' : ''}`}
            onClick={() => setShowTweaks(v => !v)}
            onMouseEnter={() => setGuide('Apri i controlli avanzati: densità, glow, motion, mono.')}
            onMouseLeave={clearGuide}
          >
            {showTweaks ? '✕ CLOSE' : '⚙ TWEAKS'}
          </button>
        </div>

        {/* Tweaks panel */}
        <div className={`bgp-tweaks-panel ${showTweaks ? 'visible' : ''}`}>
          <div className="bgp-tweak-row">
            <label>DENSITY</label>
            <input
              type="range" min="0.5" max="2.0" step="0.1"
              value={tweaks.density}
              onChange={e => setTweaks(t => ({ ...t, density: parseFloat(e.target.value) }))}
            />
            <span>{tweaks.density.toFixed(1)}</span>
          </div>
          <div className="bgp-tweak-row">
            <label>GLOW</label>
            <input
              type="range" min="0.0" max="1.4" step="0.05"
              value={tweaks.glow}
              onChange={e => setTweaks(t => ({ ...t, glow: parseFloat(e.target.value) }))}
            />
            <span>{tweaks.glow.toFixed(2)}</span>
          </div>
          <div className="bgp-tweak-row">
            <label>MOTION</label>
            <input
              type="range" min="0.0" max="1.0" step="0.05"
              value={tweaks.motion}
              onChange={e => setTweaks(t => ({ ...t, motion: parseFloat(e.target.value) }))}
            />
            <span>{tweaks.motion.toFixed(2)}</span>
          </div>
          <div className="bgp-tweak-row bgp-tweak-row--mono">
            <label>MONO</label>
            <button
              className={`bgp-mono-btn ${mono ? 'on' : ''}`}
              onClick={() => setMono(v => !v)}
            >
              {mono ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Spacer pushes selector to bottom */}
        <div className="bgp-spacer" />

        {/* Wallpaper selector */}
        <div className="bgp-selector" role="group" aria-label="Selezione wallpaper">
          {WALLPAPERS.map(wl => (
            <button
              key={wl.id}
              className={`bgp-chip ${activeId === wl.id ? 'active' : ''}`}
              style={{ '--chip-accent': wl.accent }}
              onClick={() => setActiveId(wl.id)}
              onMouseEnter={() => setGuide(`${wl.name} — ${DESCRIPTIONS[wl.id]}`)}
              onMouseLeave={clearGuide}
              aria-pressed={activeId === wl.id}
            >
              <span className="bgp-chip-dot" />
              <span className="bgp-chip-name">{wl.name}</span>
            </button>
          ))}
        </div>

        {/* Description strip */}
        {activeWl && (
          <p className="bgp-desc">{DESCRIPTIONS[activeWl.id]}</p>
        )}
      </div>
    </div>
  );
};

export default BackgroundsPage;
