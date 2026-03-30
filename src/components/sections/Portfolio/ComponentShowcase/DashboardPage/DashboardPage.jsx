import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

/* ── Mock data sets per periodo ── */
const DATA = {
  '7d': {
    kpi: [
      { label: 'Fatturato',    value: '€ 4.820',  delta: '+12%',  up: true  },
      { label: 'Nuovi Utenti', value: '1.247',     delta: '+8%',   up: true  },
      { label: 'Conversioni',  value: '6,4%',      delta: '-1,2%', up: false },
      { label: 'Ordine Medio', value: '€ 127',     delta: '+5%',   up: true  },
    ],
    bars: [35, 58, 42, 70, 61, 88, 95],
    labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',     amount: '€ 980', status: 'pagato'   },
      { id: '#2040', client: 'Studio M',     service: 'Multimedia',  amount: '€ 450', status: 'pagato'   },
      { id: '#2039', client: 'TechFlow Srl', service: 'Consulenza',  amount: '€ 320', status: 'in corso' },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',    amount: '€ 670', status: 'pagato'   },
      { id: '#2037', client: 'Pixel & Co',   service: 'Web Dev',     amount: '€ 1.200', status: 'attesa' },
    ],
  },
  '30d': {
    kpi: [
      { label: 'Fatturato',    value: '€ 18.340', delta: '+22%',  up: true  },
      { label: 'Nuovi Utenti', value: '5.890',    delta: '+15%',  up: true  },
      { label: 'Conversioni',  value: '7,1%',     delta: '+0,9%', up: true  },
      { label: 'Ordine Medio', value: '€ 143',    delta: '+11%',  up: true  },
    ],
    bars: [42, 55, 38, 72, 60, 80, 91, 65, 74, 88, 50, 67],
    labels: ['Sett 1', 'Sett 2', 'Sett 3', 'Sett 4', '', '', '', '', '', '', '', ''],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',     amount: '€ 980',   status: 'pagato'   },
      { id: '#2040', client: 'Studio M',     service: 'Multimedia',  amount: '€ 450',   status: 'pagato'   },
      { id: '#2039', client: 'TechFlow Srl', service: 'Consulenza',  amount: '€ 320',   status: 'in corso' },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',    amount: '€ 670',   status: 'pagato'   },
      { id: '#2036', client: 'MediaX',       service: 'Multimedia',  amount: '€ 890',   status: 'pagato'   },
      { id: '#2035', client: 'StartupZone',  service: 'Web Dev',     amount: '€ 2.100', status: 'pagato'   },
    ],
  },
  '90d': {
    kpi: [
      { label: 'Fatturato',    value: '€ 52.160', delta: '+31%',  up: true  },
      { label: 'Nuovi Utenti', value: '16.420',   delta: '+24%',  up: true  },
      { label: 'Conversioni',  value: '8,3%',     delta: '+2,1%', up: true  },
      { label: 'Ordine Medio', value: '€ 158',    delta: '+18%',  up: true  },
    ],
    bars: [30, 45, 60, 55, 75, 80, 68, 90, 85, 78, 92, 88],
    labels: ['Gen', 'Feb', 'Mar', '', '', '', '', '', '', '', '', ''],
    transactions: [
      { id: '#2041', client: 'Agenzia Neon', service: 'Web Dev',     amount: '€ 980',   status: 'pagato'   },
      { id: '#2038', client: 'Nova Brand',   service: 'Presenza',    amount: '€ 670',   status: 'pagato'   },
      { id: '#2035', client: 'StartupZone',  service: 'Web Dev',     amount: '€ 2.100', status: 'pagato'   },
      { id: '#2032', client: 'Industria 4',  service: 'Consulenza',  amount: '€ 1.500', status: 'pagato'   },
      { id: '#2028', client: 'GreenTech',    service: 'Web Dev',     amount: '€ 3.400', status: 'pagato'   },
      { id: '#2021', client: 'FashionLab',   service: 'Multimedia',  amount: '€ 720',   status: 'pagato'   },
    ],
  },
};

const PERIODS = ['7d', '30d', '90d'];
const PERIOD_LABELS = { '7d': '7 Giorni', '30d': '30 Giorni', '90d': '90 Giorni' };

const statusClass = (s) => {
  if (s === 'pagato')   return 'status-paid';
  if (s === 'in corso') return 'status-progress';
  return 'status-pending';
};

/* ── Sparkline mini linea ── */
const Sparkline = ({ bars }) => {
  const max = Math.max(...bars);
  const pts = bars.map((v, i) => {
    const x = (i / (bars.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg className="dash-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={pts} />
    </svg>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod]       = useState('7d');
  const [displayed, setDisplayed] = useState('7d');
  const [fading, setFading]       = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  /* smooth period switch */
  const switchPeriod = (p) => {
    if (p === period) return;
    setFading(true);
    setTimeout(() => {
      setPeriod(p);
      setDisplayed(p);
      setFading(false);
      setExpandedRow(null);
    }, 220);
  };

  const d = DATA[displayed];

  useEffect(() => {
    document.body.classList.add('dashboard-page-body');
    return () => document.body.classList.remove('dashboard-page-body');
  }, []);

  return (
    <div className="dash-wrapper">
      <div className="dash-grid-overlay" />

      <div className="dash-content">

        {/* Header */}
        <header className="dash-header">
          <button className="dash-back-btn" onClick={() => navigate('/portfolio/componenti')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Showcase</span>
          </button>
          <div className="dash-title-group">
            <h1 className="dash-title">Analytics Dashboard</h1>
            <p className="dash-subtitle">Panoramica in tempo reale</p>
          </div>
          <div className="dash-live-badge">
            <span className="live-dot" />LIVE
          </div>
        </header>

        {/* Period filter */}
        <nav className="dash-period-nav" aria-label="Filtro periodo">
          {PERIODS.map(p => (
            <button
              key={p}
              className={`dash-period-btn${period === p ? ' active' : ''}`}
              onClick={() => switchPeriod(p)}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </nav>

        {/* KPI Cards */}
        <div className={`dash-kpi-grid dash-fade${fading ? ' out' : ''}`}>
          {d.kpi.map((k, i) => (
            <div className="dash-kpi-card" key={i}>
              <div className="kpi-top">
                <span className="kpi-label">{k.label}</span>
                <span className={`kpi-delta ${k.up ? 'up' : 'down'}`}>
                  {k.up ? '▲' : '▼'} {k.delta}
                </span>
              </div>
              <div className="kpi-value">{k.value}</div>
              <Sparkline bars={d.bars} />
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className={`dash-chart-card dash-fade${fading ? ' out' : ''}`}>
          <div className="chart-header">
            <h2 className="chart-title">Andamento Fatturato</h2>
            <span className="chart-unit">migliaia €</span>
          </div>
          <div className="chart-area">
            {d.bars.map((v, i) => (
              <div className="chart-col" key={i}>
                <div
                  className="chart-bar"
                  style={{ '--bar-h': `${v}%` }}
                  title={`${v}%`}
                />
                <span className="chart-label">{d.labels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className={`dash-table-card dash-fade${fading ? ' out' : ''}`}>
          <h2 className="table-title">Transazioni Recenti</h2>

          {/* Mobile: accordion list */}
          <div className="dash-mobile-list">
            {d.transactions.map((t, i) => (
              <div
                className={`mobile-row${expandedRow === i ? ' expanded' : ''}`}
                key={i}
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
              >
                <div className="mobile-row-head">
                  <span className="mobile-row-id">{t.id}</span>
                  <span className="mobile-row-amount">{t.amount}</span>
                  <span className={`dash-status ${statusClass(t.status)}`}>{t.status}</span>
                  <svg className="expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="mobile-row-detail">
                  <span><em>Cliente:</em> {t.client}</span>
                  <span><em>Servizio:</em> {t.service}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="dash-desktop-table">
            <table className="dash-table">
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
                    <td className="td-service">{t.service}</td>
                    <td className="td-amount">{t.amount}</td>
                    <td><span className={`dash-status ${statusClass(t.status)}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="dash-footer-note">
          Dati simulati a scopo dimostrativo · Componente realizzato con React + CSS
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
