import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

/* ── ECG waveform data ── */
const ECG_METRICS = [
  {
    id: 'fatturato',
    label: 'Fatturato',
    color: 'var(--color-primary, #0ff)',
    speed: '9s',
    values: [40,45,43,50,55,52,60,63,58,68,72,70,75,80,78,85,82,88,85,90,88,95,92,97],
  },
  {
    id: 'utenti',
    label: 'Nuovi Utenti',
    color: 'rgba(0,200,255,0.95)',
    speed: '7s',
    values: [30,35,32,40,38,45,50,48,55,52,60,58,65,62,68,65,72,70,75,72,80,78,83,80],
  },
  {
    id: 'conversioni',
    label: 'Conversioni',
    color: 'rgba(0,255,150,0.95)',
    speed: '11s',
    values: [55,58,53,60,62,58,65,68,63,70,72,68,75,78,73,80,77,82,80,85,82,87,84,88],
  },
  {
    id: 'ordine',
    label: 'Ordine Medio',
    color: 'rgba(255,210,0,0.95)',
    speed: '8s',
    values: [35,40,38,45,48,44,52,55,50,58,62,58,65,68,63,72,70,75,72,78,75,82,78,85],
  },
];

/* Genera polyline points doppi per loop seamless (viewBox 0 0 800 60) */
const genPoints = (values) => {
  const doubled = [...values, ...values];
  const n = doubled.length - 1;
  return doubled.map((v, i) => {
    const x = ((i / n) * 800).toFixed(1);
    const y = (55 - (v / 100) * 48).toFixed(1);
    return `${x},${y}`;
  }).join(' ');
};

/* Genera 5 etichette date distribuite nel periodo (riferimento ECG) */
const getEcgDates = (period) => {
  const today = new Date(2026, 2, 30); // 30 mar 2026
  const totalDays = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 }[period];
  return [0, 1, 2, 3, 4].map(i => {
    const daysAgo = Math.round(totalDays - (totalDays * i) / 4);
    const d = new Date(today);
    d.setDate(today.getDate() - daysAgo);
    if (period === '1y') {
      return d.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
    }
    return `${d.getDate()}/${d.getMonth() + 1}`;
  });
};

/* ── Settori ── */
const SECTORS = [
  { name: 'AI / ML Tools',   pct: 45 },
  { name: 'E-Commerce',      pct: 34 },
  { name: 'SaaS Platform',   pct: 28 },
  { name: 'Healthcare Tech', pct: 22 },
  { name: 'Fintech',         pct: 19 },
];

/* ── Dati per periodo — barre corrispondono ESATTAMENTE al periodo ── */
const DATA = {
  '7d': {
    kpi: { fatturato: '€ 4.820', utenti: '1.247', conversioni: '6,4%', ordine: '€ 127' },
    bars: [62, 75, 58, 80, 70, 90, 95],
    labels: ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',    amount: '€ 980',   status: 'pagato'   },
      { id: '#2040', client: 'Studio M',     service: 'Multimedia', amount: '€ 450',   status: 'pagato'   },
      { id: '#2039', client: 'TechFlow Srl', service: 'Consulenza', amount: '€ 320',   status: 'in corso' },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',   amount: '€ 670',   status: 'pagato'   },
      { id: '#2037', client: 'Pixel & Co',   service: 'Web Dev',    amount: '€ 1.200', status: 'attesa'   },
    ],
  },
  '30d': {
    kpi: { fatturato: '€ 18.340', utenti: '5.890', conversioni: '7,1%', ordine: '€ 143' },
    // 30 barre — una per giorno di marzo 2026
    bars: [55,60,52,65,68,72,58,70,75,80,78,82,74,85,88,84,90,86,92,89,95,91,88,94,90,96,92,95,98,95],
    labels: ['1','','','','5','','','','','10','','','','','15','','','','','20','','','','','25','','','','','30'],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',    amount: '€ 980',   status: 'pagato'   },
      { id: '#2040', client: 'Studio M',     service: 'Multimedia', amount: '€ 450',   status: 'pagato'   },
      { id: '#2039', client: 'TechFlow Srl', service: 'Consulenza', amount: '€ 320',   status: 'in corso' },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',   amount: '€ 670',   status: 'pagato'   },
      { id: '#2036', client: 'MediaX',       service: 'Multimedia', amount: '€ 890',   status: 'pagato'   },
      { id: '#2035', client: 'StartupZone',  service: 'Web Dev',    amount: '€ 2.100', status: 'pagato'   },
    ],
  },
  '90d': {
    kpi: { fatturato: '€ 52.160', utenti: '16.420', conversioni: '8,3%', ordine: '€ 158' },
    // 13 barre settimanali (Gen-Mar 2026)
    bars: [38, 44, 50, 56, 52, 62, 58, 68, 65, 74, 70, 80, 85],
    labels: ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13'],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',    amount: '€ 980',   status: 'pagato' },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',   amount: '€ 670',   status: 'pagato' },
      { id: '#2035', client: 'StartupZone',  service: 'Web Dev',    amount: '€ 2.100', status: 'pagato' },
      { id: '#2032', client: 'Industria 4',  service: 'Consulenza', amount: '€ 1.500', status: 'pagato' },
      { id: '#2028', client: 'GreenTech',    service: 'Web Dev',    amount: '€ 3.400', status: 'pagato' },
      { id: '#2021', client: 'FashionLab',   service: 'Multimedia', amount: '€ 720',   status: 'pagato' },
    ],
  },
  '1y': {
    kpi: { fatturato: '€ 198.400', utenti: '62.300', conversioni: '9,1%', ordine: '€ 172' },
    // 12 barre mensili Apr 2025 – Mar 2026
    bars: [55, 60, 65, 62, 70, 75, 72, 80, 82, 88, 92, 95],
    labels: ['Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic','Gen','Feb','Mar'],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',    amount: '€ 980',   status: 'pagato' },
      { id: '#2035', client: 'StartupZone',  service: 'Web Dev',    amount: '€ 2.100', status: 'pagato' },
      { id: '#2028', client: 'GreenTech',    service: 'Web Dev',    amount: '€ 3.400', status: 'pagato' },
      { id: '#2020', client: 'MegaCorp',     service: 'Consulenza', amount: '€ 5.200', status: 'pagato' },
      { id: '#2015', client: 'Innovatech',   service: 'Web Dev',    amount: '€ 4.800', status: 'pagato' },
      { id: '#2008', client: 'GlobalBrand',  service: 'Multimedia', amount: '€ 1.900', status: 'pagato' },
      { id: '#2001', client: 'EduPlatform',  service: 'Presenza',   amount: '€ 2.300', status: 'pagato' },
    ],
  },
};

const PERIODS = ['7d', '30d', '90d', '1y'];
const PERIOD_LABELS = { '7d': '7 Giorni', '30d': '30 Giorni', '90d': '90 Giorni', '1y': 'Annuale' };
const PERIOD_DESC   = { '7d': 'Ultimi 7 giorni', '30d': 'Marzo 2026', '90d': 'Gen – Mar 2026', '1y': 'Apr 2025 – Mar 2026' };

const statusClass = (s) => {
  if (s === 'pagato')   return 'status-paid';
  if (s === 'in corso') return 'status-progress';
  return 'status-pending';
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod]   = useState('30d');
  const [fading, setFading]   = useState(false);
  const [ecgPlaying, setEcgPlaying] = useState(
    Object.fromEntries(ECG_METRICS.map(m => [m.id, true]))
  );

  const switchPeriod = (p) => {
    if (p === period) return;
    setFading(true);
    setTimeout(() => { setPeriod(p); setFading(false); }, 220);
  };

  const toggleEcg = (id) =>
    setEcgPlaying(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    document.body.classList.add('dashboard-page-body');
    return () => document.body.classList.remove('dashboard-page-body');
  }, []);

  const d = DATA[period];
  const ecgDates = getEcgDates(period);

  return (
    <div className="dash-wrapper">
      <div className="dash-grid-overlay" />

      <div className="dash-layout">

        {/* Header */}
        <header className="dash-header">
          <button className="dash-back-btn" onClick={() => navigate('/portfolio/componenti')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Showcase</span>
          </button>
          <div className="dash-title-group">
            <h1 className="dash-title">Analytics Dashboard</h1>
            <p className="dash-subtitle">Panoramica in tempo reale · {PERIOD_DESC[period]}</p>
          </div>
          <div className="dash-live-badge">
            <span className="live-dot" />LIVE
          </div>
        </header>

        {/* Griglia 3 colonne */}
        <div className={`dash-main-grid dash-fade${fading ? ' out' : ''}`}>

          {/* ZONA 1 — Transazioni Recenti */}
          <div className="dash-zone">
            <div className="zone-hd">
              <h2 className="zone-title">Transazioni Recenti</h2>
            </div>
            <div className="zone-scroll">
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Servizio</th>
                    <th>Importo</th>
                    <th>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {d.transactions.map((t, i) => (
                    <tr key={i}>
                      <td className="td-id">{t.id}</td>
                      <td>{t.client}</td>
                      <td className="td-svc">{t.service}</td>
                      <td className="td-amt">{t.amount}</td>
                      <td>
                        <span className={`dash-status ${statusClass(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Colonna centrale: ZONA 2 + ZONA 4 */}
          <div className="dash-center-col">

            {/* ZONA 2 — Bar Chart */}
            <div className="dash-zone dash-zone-chart">
              <div className="zone-hd">
                <h2 className="zone-title">Andamento Fatturato</h2>
                <span className="zone-unit">{PERIOD_DESC[period]} · migliaia €</span>
              </div>
              <div className={`chart-area${period === '30d' ? ' chart-dense' : ''}`}>
                {d.bars.map((v, i) => (
                  <div className="chart-col" key={i}>
                    <div className="chart-bar" style={{ '--bar-h': `${v}%` }} />
                    <span className="chart-lbl">{d.labels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ZONA 4 — Crescita Settori */}
            <div className="dash-zone dash-zone-sectors">
              <div className="zone-hd">
                <h2 className="zone-title">Crescita Settori 2025</h2>
                <span className="zone-unit">dati simulati</span>
              </div>
              <div className="sectors-list">
                {SECTORS.map((s, i) => (
                  <div className="sector-row" key={i}>
                    <span className="sector-name">{s.name}</span>
                    <div className="sector-track">
                      <div className="sector-bar" style={{ '--s-pct': `${s.pct}%` }} />
                    </div>
                    <span className="sector-pct">+{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Colonna destra: ZONA 3 + ZONA 5 */}
          <div className="dash-right-col">

            {/* ZONA 3 — ECG Metriche */}
            <div className="dash-zone dash-zone-ecg">
              <div className="zone-hd">
                <h2 className="zone-title">Metriche Attive</h2>
                <span className="zone-unit">{PERIOD_DESC[period]}</span>
              </div>
              <div className="ecg-list">
                {ECG_METRICS.map((m) => {
                  const pts     = genPoints(m.values);
                  const playing = ecgPlaying[m.id];
                  return (
                    <div className="ecg-metric" key={m.id}>
                      <div className="ecg-top">
                        <span className="ecg-label">{m.label}</span>
                        <span className="ecg-value" style={{ color: m.color }}>
                          {d.kpi[m.id]}
                        </span>
                        <button
                          className={`ecg-btn${playing ? ' pause' : ' play'}`}
                          onClick={() => toggleEcg(m.id)}
                          aria-label={playing ? 'Pausa' : 'Avvia'}
                        >
                          {playing
                            ? <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
                            : <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                          }
                        </button>
                      </div>
                      <div className="ecg-canvas">
                        <svg
                          className="ecg-svg"
                          viewBox="0 0 800 60"
                          preserveAspectRatio="none"
                          style={{
                            animationDuration: m.speed,
                            animationPlayState: playing ? 'running' : 'paused',
                          }}
                        >
                          <polyline
                            className="ecg-line"
                            points={pts}
                            style={{ stroke: m.color }}
                          />
                        </svg>
                      </div>
                      {/* Asse date di riferimento */}
                      <div className="ecg-dates">
                        {ecgDates.map((label, i) => (
                          <span key={i} className="ecg-date">{label}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ZONA 5 — Filtro Periodo */}
            <div className="dash-zone dash-zone-period">
              <div className="zone-hd">
                <h2 className="zone-title">Periodo</h2>
              </div>
              <div className="period-grid">
                {PERIODS.map(p => (
                  <button
                    key={p}
                    className={`period-btn${period === p ? ' active' : ''}`}
                    onClick={() => switchPeriod(p)}
                  >
                    {PERIOD_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
