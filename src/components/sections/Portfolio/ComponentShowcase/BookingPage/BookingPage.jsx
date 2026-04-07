import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';
import { useGuide } from '../../../../../contexts/GuideContext';

/* ── Static data ── */
const SERVICES = [
  { id: 'web',       label: 'Web Development',    duration: '60 min', icon: '⌨' },
  { id: 'consulenza',label: 'Consulenza Digitale', duration: '45 min', icon: '🔍' },
  { id: 'multimedia',label: 'Multimedia & Design', duration: '30 min', icon: '🎨' },
  { id: 'presenza',  label: 'Presenza Online',     duration: '45 min', icon: '📡' },
];

const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15',
  '14:00', '14:45', '15:30', '16:15', '17:00',
];

/* Busy slots — simulated */
const BUSY = new Set(['10:30', '15:30']);

/* Build a mini calendar for a given year/month (0-indexed) */
function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  // Start on Monday (shift Sun→6)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const MONTH_NAMES = [
  'Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'
];
const DAY_NAMES = ['Lu','Ma','Me','Gi','Ve','Sa','Do'];

const STEPS = ['Servizio', 'Data', 'Orario', 'Conferma'];

const BookingPage = () => {
  const { setGuide, clearGuide } = useGuide();
  const navigate = useNavigate();

  const today = new Date();
  const [step,        setStep]       = useState(0);
  const [service,     setService]    = useState(null);
  const [calYear,     setCalYear]    = useState(today.getFullYear());
  const [calMonth,    setCalMonth]   = useState(today.getMonth());
  const [selDay,      setSelDay]     = useState(null);
  const [selTime,     setSelTime]    = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [confirmed,   setConfirmed]  = useState(false);

  useEffect(() => {
    document.body.classList.add('booking-page-body');
    return () => document.body.classList.remove('booking-page-body');
  }, []);

  const cells = buildCalendar(calYear, calMonth);

  const isToday = (d) =>
    d === today.getDate() &&
    calMonth === today.getMonth() &&
    calYear  === today.getFullYear();

  const isPast = (d) => {
    const date = new Date(calYear, calMonth, d);
    date.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return date < t;
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelDay(null); setSelTime(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelDay(null); setSelTime(null);
  };

  const goStep = (next) => {
    setTransitioning(true);
    setTimeout(() => { setStep(next); setTransitioning(false); }, 200);
  };

  const handleConfirm = () => {
    setTransitioning(true);
    setTimeout(() => { setConfirmed(true); setTransitioning(false); }, 200);
  };

  const reset = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(0); setService(null); setSelDay(null);
      setSelTime(null); setConfirmed(false); setTransitioning(false);
    }, 200);
  };

  const dateLabel = selDay
    ? `${selDay} ${MONTH_NAMES[calMonth]} ${calYear}`
    : '—';

  const svc = SERVICES.find(s => s.id === service);

  return (
    <div className="bk-wrapper">
      <div className="bk-grid-overlay" />
      <div className="bk-content">

        {/* Header */}
        <header className="bk-header">
          <button className="bk-back-btn" onClick={() => navigate('/portfolio/componenti')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Showcase</span>
          </button>
          <div className="bk-title-group">
            <h1 className="bk-title">Booking System</h1>
            <p className="bk-subtitle">Prenota una sessione in pochi click</p>
          </div>
        </header>

        {/* Stepper */}
        {!confirmed && (
          <div className="bk-stepper" onMouseEnter={() => setGuide('Indicatore di avanzamento — mostra in quale step della prenotazione ti trovi.')} onMouseLeave={clearGuide}>
            {STEPS.map((label, i) => (
              <div key={i} className={`bk-step${step === i ? ' current' : ''}${step > i ? ' done' : ''}`}>
                <div className="bk-step-circle">
                  {step > i
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                    : i + 1
                  }
                </div>
                <span className="bk-step-label">{label}</span>
                {i < STEPS.length - 1 && <div className="bk-step-line" />}
              </div>
            ))}
          </div>
        )}

        {/* Main panel */}
        <div className={`bk-panel${transitioning ? ' bk-fade-out' : ''}`}>

          {/* ── CONFIRMED ── */}
          {confirmed && (
            <div className="bk-confirmed">
              <div className="bk-check-icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="var(--color-primary,#0ff)" strokeWidth="1.5"/>
                  <path d="M6 12l4 4 8-8" stroke="var(--color-primary,#0ff)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="bk-confirmed-title">Prenotazione Confermata!</h2>
              <div className="bk-confirmed-summary">
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Servizio</span>
                  <span className="bk-summary-val">{svc?.label}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Data</span>
                  <span className="bk-summary-val">{dateLabel}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Orario</span>
                  <span className="bk-summary-val">{selTime}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Durata</span>
                  <span className="bk-summary-val">{svc?.duration}</span>
                </div>
              </div>
              <p className="bk-confirmed-note">
                Una simulazione — in un'app reale riceveresti una email di conferma.
              </p>
              <button className="bk-cta-btn" onClick={reset}>Nuova Prenotazione</button>
            </div>
          )}

          {/* ── STEP 0: Servizio ── */}
          {!confirmed && step === 0 && (
            <div className="bk-step-content">
              <h2 className="bk-step-title">Scegli il Servizio</h2>
              <div className="bk-services-grid" onMouseEnter={() => setGuide('Scegli il servizio che ti interessa prenotare — ogni opzione ha durata e prezzo dedicati.')} onMouseLeave={clearGuide}>
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    className={`bk-service-card${service === s.id ? ' selected' : ''}`}
                    onClick={() => setService(s.id)}
                  >
                    <span className="bk-service-icon">{s.icon}</span>
                    <span className="bk-service-label">{s.label}</span>
                    <span className="bk-service-dur">{s.duration}</span>
                  </button>
                ))}
              </div>
              <div className="bk-nav-row">
                <span />
                <button
                  className="bk-cta-btn"
                  disabled={!service}
                  onClick={() => goStep(1)}
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 1: Data ── */}
          {!confirmed && step === 1 && (
            <div className="bk-step-content">
              <h2 className="bk-step-title">Scegli la Data</h2>
              <div className="bk-calendar" onMouseEnter={() => setGuide('Calendario interattivo — seleziona il giorno disponibile per la tua prenotazione.')} onMouseLeave={clearGuide}>
                <div className="bk-cal-header">
                  <button className="bk-cal-nav" onClick={prevMonth} aria-label="Mese precedente">‹</button>
                  <span className="bk-cal-month">{MONTH_NAMES[calMonth]} {calYear}</span>
                  <button className="bk-cal-nav" onClick={nextMonth} aria-label="Mese successivo">›</button>
                </div>
                <div className="bk-cal-grid">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="bk-cal-day-name">{d}</div>
                  ))}
                  {cells.map((d, i) => {
                    if (!d) return <div key={`e-${i}`} className="bk-cal-empty" />;
                    const past = isPast(d);
                    return (
                      <button
                        key={d}
                        disabled={past}
                        className={`bk-cal-day${isToday(d) ? ' today' : ''}${selDay === d ? ' selected' : ''}${past ? ' past' : ''}`}
                        onClick={() => !past && setSelDay(d)}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bk-nav-row">
                <button className="bk-ghost-btn" onClick={() => goStep(0)}>← Indietro</button>
                <button className="bk-cta-btn" disabled={!selDay} onClick={() => goStep(2)}>Avanti</button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Orario ── */}
          {!confirmed && step === 2 && (
            <div className="bk-step-content">
              <h2 className="bk-step-title">Scegli l'Orario</h2>
              <p className="bk-step-meta">
                {dateLabel} &mdash; <span className="bk-meta-service">{svc?.label}</span>
              </p>
              <div className="bk-slots-grid">
                {TIME_SLOTS.map(t => {
                  const busy = BUSY.has(t);
                  return (
                    <button
                      key={t}
                      disabled={busy}
                      className={`bk-slot${selTime === t ? ' selected' : ''}${busy ? ' busy' : ''}`}
                      onClick={() => !busy && setSelTime(t)}
                    >
                      {t}
                      {busy && <span className="bk-busy-label">Occupato</span>}
                    </button>
                  );
                })}
              </div>
              <div className="bk-nav-row">
                <button className="bk-ghost-btn" onClick={() => goStep(1)}>← Indietro</button>
                <button className="bk-cta-btn" disabled={!selTime} onClick={() => goStep(3)}>Avanti</button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Conferma ── */}
          {!confirmed && step === 3 && (
            <div className="bk-step-content">
              <h2 className="bk-step-title">Conferma Prenotazione</h2>
              <div className="bk-summary-box">
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Servizio</span>
                  <span className="bk-summary-val">{svc?.label}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Data</span>
                  <span className="bk-summary-val">{dateLabel}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Orario</span>
                  <span className="bk-summary-val">{selTime}</span>
                </div>
                <div className="bk-summary-row">
                  <span className="bk-summary-key">Durata</span>
                  <span className="bk-summary-val">{svc?.duration}</span>
                </div>
              </div>
              <div className="bk-nav-row">
                <button className="bk-ghost-btn" onClick={() => goStep(2)}>← Indietro</button>
                <button className="bk-cta-btn bk-cta-confirm" onClick={handleConfirm}>
                  Conferma ✓
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="bk-footer-note">
          Sistema dimostrativo · Nessun dato viene effettivamente salvato
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
