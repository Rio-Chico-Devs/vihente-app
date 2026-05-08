import { useEffect, useRef, useCallback, useState } from 'react';
import { useTour, TOUR_STEPS } from '../../contexts/TourContext';
import { useSettings } from '../../contexts/SettingsContext';
import './TourOverlay.css';

const SPOTLIGHT_PAD    = 14;
const PANEL_W          = 320;
const PANEL_H_ESTIMATE = 200;

const TourOverlay = () => {
  const { active, stepIdx, currentStep, nextStep, prevStep, endTour } = useTour();
  const { irisVolume } = useSettings();
  const irisVolumeRef  = useRef(irisVolume);
  useEffect(() => { irisVolumeRef.current = irisVolume; }, [irisVolume]);

  const [rect,        setRect]        = useState(null);
  const [audioPaused, setAudioPaused] = useState(false);

  const audioRef       = useRef(null);
  const playPromiseRef = useRef(null);
  const measureRafRef  = useRef(null);

  /* ───────────────────────────── target measurement ─────────────────────────────
     Use rAF loop to wait until the target's bounding rect stabilizes after smooth
     scrollIntoView. Detects "stopped scrolling" by checking when top doesn't change
     for 3 consecutive frames. */
  const measureTarget = useCallback(() => {
    if (measureRafRef.current) cancelAnimationFrame(measureRafRef.current);

    if (!currentStep?.target) {
      setRect(null);
      return;
    }
    const el = document.querySelector(`[data-tour="${currentStep.target}"]`);
    if (!el) { setRect(null); return; }

    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    let prevTop     = null;
    let stableCount = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      if (prevTop !== null && Math.abs(r.top - prevTop) < 0.5) stableCount++;
      else                                                     stableCount = 0;
      prevTop = r.top;

      if (stableCount >= 3) {
        setRect({ x: r.left, y: r.top, w: r.width, h: r.height });
        measureRafRef.current = null;
        return;
      }
      measureRafRef.current = requestAnimationFrame(tick);
    };
    measureRafRef.current = requestAnimationFrame(tick);
  }, [currentStep]);

  useEffect(() => {
    if (!active) return;
    measureTarget();
    const onResize = () => measureTarget();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (measureRafRef.current) cancelAnimationFrame(measureRafRef.current);
    };
  }, [active, measureTarget]);

  /* ───────────────────────────── audio per step ─────────────────────────────
     Race-safe: await previous play() promise before pausing to avoid the
     "play() interrupted by pause()" warning. */
  useEffect(() => {
    if (!active || !currentStep?.audio) return;

    let cancelled = false;
    const run = async () => {
      const prev    = audioRef.current;
      const prevP   = playPromiseRef.current;
      if (prev) {
        try { if (prevP) await prevP.catch(() => {}); prev.pause(); } catch (_) {}
      }
      if (cancelled) return;

      const audio  = new Audio(currentStep.audio);
      audio.volume = irisVolumeRef.current;
      audioRef.current = audio;
      setAudioPaused(false);
      const p = audio.play();
      playPromiseRef.current = p;
      if (p) p.catch(() => {});
    };
    run();

    return () => {
      cancelled = true;
      const a = audioRef.current;
      const p = playPromiseRef.current;
      if (a) {
        if (p) p.then(() => { try { a.pause(); } catch (_) {} }).catch(() => {});
        else   { try { a.pause(); } catch (_) {} }
      }
    };
  }, [active, stepIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Stop audio when tour closes */
  useEffect(() => {
    if (!active && audioRef.current) {
      try { audioRef.current.pause(); } catch (_) {}
      audioRef.current = null;
    }
  }, [active]);

  const toggleAudio = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().catch(() => {}); setAudioPaused(false); }
    else          { a.pause();                  setAudioPaused(true);  }
  }, []);

  /* ───────────────────────────── keyboard ───────────────────────────── */
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if      (e.key === 'Escape')                          { endTour();  e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === 'ArrowRight') { nextStep(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft')                       { prevStep(); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, endTour, nextStep, prevStep]);

  if (!active || !currentStep) return null;

  const isFirst = stepIdx === 0;
  const isLast  = stepIdx === TOUR_STEPS.length - 1;

  /* ───────────────────────────── panel position ─────────────────────────────
     Place above or below the target depending on space available; clamp X & Y
     within the viewport. */
  const vW  = window.innerWidth;
  const vH  = window.innerHeight;
  const PAD = currentStep?.spotPad ?? SPOTLIGHT_PAD;

  let panelStyle, intro = false;
  if (rect) {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const ry = rect.h / 2 + PAD;

    const placeAbove = cy > vH / 2;
    let top;
    if (placeAbove) {
      top = (cy - ry) - PANEL_H_ESTIMATE - 16;
      if (top < 12) top = (cy + ry) + 16;
    } else {
      top = (cy + ry) + 16;
      if (top + PANEL_H_ESTIMATE > vH - 12) top = (cy - ry) - PANEL_H_ESTIMATE - 16;
    }
    top = Math.max(12, Math.min(top, vH - PANEL_H_ESTIMATE - 12));
    const left = Math.max(12, Math.min(cx - PANEL_W / 2, vW - PANEL_W - 12));
    panelStyle = { top: `${top}px`, left: `${left}px` };
  } else {
    intro = true;
    panelStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  /* Spotlight box-shadow technique: small element with massive box-shadow
     creates the dark surround everywhere except this rect. */
  const spotStyle = rect ? {
    left:   `${rect.x - PAD}px`,
    top:    `${rect.y - PAD}px`,
    width:  `${rect.w + PAD * 2}px`,
    height: `${rect.h + PAD * 2}px`,
  } : null;

  const progressPct = ((stepIdx + 1) / TOUR_STEPS.length) * 100;

  return (
    <div className="tour-root" role="dialog" aria-modal="true" aria-label="Tour guidato">
      {rect ? (
        <div className="tour-spotlight" style={spotStyle} />
      ) : (
        <div className="tour-fullscreen-overlay" />
      )}

      <div className={`tour-panel${intro ? ' tour-panel--intro' : ''}`} style={panelStyle}>
        <div className="tour-progress" aria-hidden="true">
          <div className="tour-progress-bar" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="tour-panel-header">
          <span className="tour-panel-step">
            {String(stepIdx + 1).padStart(2, '0')} / {String(TOUR_STEPS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="tour-icon-btn"
            onClick={toggleAudio}
            aria-label={audioPaused ? 'Riprendi audio' : 'Pausa audio'}
            title={audioPaused ? 'Riprendi' : 'Pausa'}
          >
            {audioPaused ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
            )}
          </button>
        </div>

        <p className="tour-panel-text">{currentStep.text}</p>

        <div className="tour-panel-actions">
          <button
            type="button"
            className="tour-btn tour-btn--stop"
            onClick={endTour}
            aria-label="Termina tour (Esc)"
            title="Termina tour (Esc)"
          >
            Stop
          </button>
          <div className="tour-nav-group">
            <button
              type="button"
              className="tour-btn tour-btn--back"
              onClick={prevStep}
              disabled={isFirst}
              aria-label="Step precedente (←)"
              title="Step precedente (←)"
            >
              ‹
            </button>
            <button
              type="button"
              className="tour-btn tour-btn--next"
              onClick={nextStep}
              autoFocus
              aria-label={isLast ? 'Termina tour (Enter)' : 'Step successivo (→)'}
              title={isLast ? 'Fine (Enter)' : 'Continua (Enter)'}
            >
              {isLast ? 'Fine' : 'Continua ›'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;
