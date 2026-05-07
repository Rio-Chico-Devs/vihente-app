import { useEffect, useRef, useCallback, useState } from 'react';
import { useTour, TOUR_STEPS } from '../../contexts/TourContext';
import { useSettings } from '../../contexts/SettingsContext';
import './TourOverlay.css';

const SPOTLIGHT_R  = 80;
const SPOTLIGHT_PAD = 24;

const TourOverlay = () => {
  const { active, stepIdx, currentStep, nextStep, endTour } = useTour();
  const { irisVolume } = useSettings();
  const irisVolumeRef  = useRef(irisVolume);
  useEffect(() => { irisVolumeRef.current = irisVolume; }, [irisVolume]);

  const [rect,     setRect]     = useState(null);
  const [panelPos, setPanelPos] = useState('bottom');
  const audioRef = useRef(null);

  /* ── Find target element & measure it ── */
  const measureTarget = useCallback(() => {
    if (!currentStep?.target) { setRect(null); return; }
    const el = document.querySelector(`[data-tour="${currentStep.target}"]`);
    if (!el) { setRect(null); return; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    setTimeout(() => {
      const r = el.getBoundingClientRect();
      setRect({ x: r.left, y: r.top, w: r.width, h: r.height });
      setPanelPos(r.top > window.innerHeight / 2 ? 'top' : 'bottom');
    }, 420);
  }, [currentStep]);

  useEffect(() => {
    if (!active) return;
    measureTarget();
    window.addEventListener('resize', measureTarget);
    return () => window.removeEventListener('resize', measureTarget);
  }, [active, measureTarget]);

  /* ── Play audio for step ── */
  useEffect(() => {
    if (!active || !currentStep?.audio) return;
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch (_) {}
    }
    const audio = new Audio(currentStep.audio);
    audio.volume = irisVolumeRef.current;
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => { try { audio.pause(); } catch (_) {} };
  }, [active, stepIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Stop audio on close ── */
  useEffect(() => {
    if (!active && audioRef.current) {
      try { audioRef.current.pause(); } catch (_) {}
      audioRef.current = null;
    }
  }, [active]);

  if (!active || !currentStep) return null;

  const isLast = stepIdx === TOUR_STEPS.length - 1;

  /* ── Spotlight clip coords ── */
  const vW = window.innerWidth;
  const vH = window.innerHeight;

  let clipPath = null;
  if (rect) {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const rx = rect.w / 2 + SPOTLIGHT_PAD;
    const ry = rect.h / 2 + SPOTLIGHT_PAD;
    /* SVG polygon approximating a rounded rect hole */
    clipPath = `polygon(
      0% 0%, 100% 0%, 100% 100%, 0% 100%,
      0% ${cy - ry}px,
      ${cx - rx}px ${cy - ry}px,
      ${cx - rx}px ${cy + ry}px,
      ${cx + rx}px ${cy + ry}px,
      ${cx + rx}px ${cy - ry}px,
      0% ${cy - ry}px,
      0% 0%
    )`;
  }

  /* ── Panel position ── */
  let panelStyle = {};
  if (rect) {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const ry = rect.h / 2 + SPOTLIGHT_PAD;
    if (panelPos === 'top') {
      panelStyle = { bottom: `${vH - (cy - ry) + 16}px`, left: `${Math.min(Math.max(cx - 160, 12), vW - 340)}px` };
    } else {
      panelStyle = { top: `${cy + ry + 16}px`, left: `${Math.min(Math.max(cx - 160, 12), vW - 340)}px` };
    }
  } else {
    /* intro: centered */
    panelStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }

  return (
    <div className="tour-root" role="dialog" aria-modal="true" aria-label="Tour guidato">
      {/* Overlay with spotlight hole */}
      <div
        className="tour-overlay"
        style={clipPath ? { clipPath } : undefined}
      />

      {/* Spotlight ring highlight */}
      {rect && (
        <div
          className="tour-spotlight-ring"
          style={{
            left:   rect.x - SPOTLIGHT_PAD,
            top:    rect.y - SPOTLIGHT_PAD,
            width:  rect.w + SPOTLIGHT_PAD * 2,
            height: rect.h + SPOTLIGHT_PAD * 2,
          }}
        />
      )}

      {/* Step panel */}
      <div className="tour-panel" style={panelStyle}>
        <div className="tour-panel-step">
          {stepIdx + 1} / {TOUR_STEPS.length}
        </div>
        <p className="tour-panel-text">{currentStep.text}</p>
        <div className="tour-panel-actions">
          <button className="tour-btn tour-btn--stop" onClick={endTour}>
            Stop
          </button>
          <button className="tour-btn tour-btn--next" onClick={nextStep}>
            {isLast ? 'Fine' : 'Continua'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;
