import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './ImmobiliareSim.css';

const PROPERTIES = [
  { zone: 'PRATI · ROMA',      name: 'Un attico dove il cielo è di casa',  price: '€ 820.000',   meta: '145 mq · 4 camere', hint: 'attico · terrazza / luce zenitale',      bg: 'linear-gradient(160deg,#BFC8C0 0%,#8E9E92 100%)', src: '/images/residenze-prop-prati.webp' },
  { zone: 'TRASTEVERE · ROMA', name: 'Il cortile segreto',                  price: '€ 480.000',   meta: '85 mq · 2 camere',  hint: 'appartamento · cortile / cotto',        bg: 'linear-gradient(160deg,#C4B898 0%,#9E8868 100%)', src: '/images/residenze-prop-trastevere.webp' },
  { zone: 'PARIOLI · ROMA',    name: 'Prospettiva sui tigli',               price: '€ 1.100.000', meta: '220 mq · 5 camere', hint: 'piano nobile · verde / viali alberati',  bg: 'linear-gradient(160deg,#B8C4A8 0%,#8A9E78 100%)', src: '/images/residenze-prop-parioli.webp' },
  { zone: 'EUR · ROMA',        name: 'Geometrie razionaliste',              price: '€ 390.000',   meta: '70 mq · 2 camere',  hint: 'moderno · razionalismo / luce uniforme', bg: 'linear-gradient(160deg,#C0BCC0 0%,#9090A0 100%)', src: '/images/residenze-prop-eur.webp' },
];

const ZONES = {
  prati:      { char: 'RAFFINATO.', desc: "Strade ampie e ordinate, vicino al Vaticano e al Tevere. Il quartiere borghese per eccellenza — caffè storici, palazzi degli anni '30, silenzio.", walk: 5, scuole: 4, verde: 3, hints: ['appartamento · palazzo liberty', 'giardino privato · prati'],       photos: ['/images/residenze-zona-prati-1.webp',      '/images/residenze-zona-prati-2.webp'] },
  trastevere: { char: 'AUTENTICO.', desc: "Selciato, trattorie, edera sui muri. Trastevere è Roma nella sua versione più umana e vitale. Di notte si anima, di mattina dorme.", walk: 5, scuole: 3, verde: 4, hints: ['vicolo · cotto e mattoni', 'terrazza · vista tetti Roma'],                  photos: ['/images/residenze-zona-trastevere-1.webp', '/images/residenze-zona-trastevere-2.webp'] },
  parioli:    { char: 'ESCLUSIVO.', desc: "Viali alberati, ville e palazzi signorili. Il quartiere delle famiglie romane di tradizione. Tranquillo, verde, lontano dal caos.", walk: 3, scuole: 5, verde: 5, hints: ['villa · parco privato / liberty', 'piano nobile · parquet / stucchi'],       photos: ['/images/residenze-zona-parioli-1.webp',    '/images/residenze-zona-parioli-2.webp'] },
  eur:        { char: 'MODERNO.',   desc: "Architettura razionalista degli anni '40, lago, congressi. Il quartiere del business e della residenza moderna. Efficiente, ampio, connected.", walk: 4, scuole: 4, verde: 4, hints: ['moderno · razionalismo / luce', 'vista lago · EUR / palazzi'], photos: ['/images/residenze-zona-eur-1.webp',         '/images/residenze-zona-eur-2.webp'] },
};

const BASE_PRICES = {
  roma:    { appartamento: 4200, villa: 5800, attico: 6500 },
  milano:  { appartamento: 5500, villa: 7200, attico: 8000 },
  firenze: { appartamento: 3800, villa: 5200, attico: 5800 },
};
const COND_MULT = { ristrutturato: 1.15, buono: 1.0, 'da-ristrutturare': 0.82 };

const AGENTI = [
  { name: 'Marco Ferretti', zone: 'Esperto di Prati · Flaminio',       tags: ['Matrimoniali', 'Investitori', 'Prime Case'], bg: 'linear-gradient(160deg, #C8BFB0 0%, #A89A88 100%)', photo: '/images/residenze-agente-marco.webp' },
  { name: 'Giulia Monti',   zone: 'Esperta di Trastevere · Testaccio', tags: ['Storici', 'Giovani Acquirenti', 'Locazioni'], bg: 'linear-gradient(160deg, #BFC4B8 0%, #9EA898 100%)', photo: '/images/residenze-agente-giulia.webp' },
  { name: 'Andrea Caruso',  zone: 'Esperto di Parioli · EUR',          tags: ['Ville', 'Piani Nobili', 'Internazionali'],   bg: 'linear-gradient(160deg, #C4BDB0 0%, #A09080 100%)', photo: '/images/residenze-agente-andrea.webp' },
];

const INSIGHTS = [
  { category: 'Mercato · Comprare', title: 'Comprare casa a Roma nel 2026: cosa è cambiato nel mercato', excerpt: 'I tassi si sono stabilizzati, la domanda cresce nei quartieri storici. Ecco cosa sapere prima di cercare.', hint: 'mercato · architettura / luce',     bg: 'linear-gradient(150deg, #C8BFB0 0%, #A89A88 100%)', src: '/images/residenze-insight-1.webp' },
  { category: 'Mercato · Vendere',  title: "Ristrutturare per rivendere: quando l'investimento ha senso", excerpt: 'Non sempre spendere di più porta a ricavare di più. Ecco i numeri reali su quali interventi aumentano il valore.', hint: 'ristrutturazione · cantiere / luce', bg: 'linear-gradient(150deg, #BFC4B0 0%, #9EA890 100%)', src: '/images/residenze-insight-2.webp' },
];

const RatingDots = ({ value }) => (
  <div className="res-zone-rating">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`res-dot ${i < value ? 'res-dot--on' : ''}`}>●</span>
    ))}
  </div>
);

const ImmobiliareSim = () => {
  const [activeZone, setActiveZone] = useState('prati');
  const [estCity,    setEstCity]    = useState('roma');
  const [estType,    setEstType]    = useState('appartamento');
  const [estCond,    setEstCond]    = useState('buono');
  const [sqm,        setSqm]        = useState(90);
  const [estVisible, setEstVisible] = useState(false);
  const [estMin,     setEstMin]     = useState('');
  const [estMax,     setEstMax]     = useState('');

  const zone = ZONES[activeZone];

  const computeEstimate = () => {
    const base = BASE_PRICES[estCity]?.[estType] || 4200;
    const mult = COND_MULT[estCond] || 1;
    const mid  = base * sqm * mult;
    const min  = Math.round(mid * 0.92 / 1000) * 1000;
    const max  = Math.round(mid * 1.08 / 1000) * 1000;
    setEstMin('€ ' + min.toLocaleString('it-IT'));
    setEstMax('€ ' + max.toLocaleString('it-IT'));
    setEstVisible(true);
  };

  const handleTypeTab = (t) => {
    setEstType(t);
    if (estVisible) setTimeout(computeEstimate, 0);
  };

  const handleCondTab = (c) => {
    setEstCond(c);
    if (estVisible) setTimeout(computeEstimate, 0);
  };

  return (
    <SimWrapper templateId="immobiliare" templateTitle="Immobiliare" accentColor="#C4A574">
      <div className="res-site">

        {/* ── NAV ── */}
        <nav className="res-nav">
          <div className="res-nav-links">
            <a className="res-nav-link">Immobili</a>
            <a className="res-nav-link">Zone</a>
            <a className="res-nav-link">Il Team</a>
          </div>
          <a className="res-nav-brand">RESIDENZE</a>
          <div className="res-nav-actions">
            <a className="res-nav-pill res-nav-pill--outline">Cerca Casa</a>
            <a className="res-nav-pill res-nav-pill--gold">Vendi con Noi</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="res-hero">
          <div className="res-hero-left">
            <div className="res-hero-top-label">RESIDENZE · AGENZIA IMMOBILIARE · ROMA</div>
            <div className="res-hero-mid">
              <h1 className="res-hero-h1-normal">Ogni casa ha</h1>
              <h1 className="res-hero-h1-italic">la sua storia.</h1>
              <div className="res-hero-rule" />
              <p className="res-hero-sub">Non vendiamo immobili. Troviamo il posto dove la tua vita ha senso.</p>
              <div className="res-hero-ctas">
                <a className="res-btn-green">CERCA LA TUA CASA →</a>
                <a className="res-btn-border" href="#venditore">Valuta il tuo immobile</a>
              </div>
            </div>
            <div className="res-hero-bottom">
              <span className="res-hero-stat">340+ famiglie accompagnate a casa</span>
              <span className="res-hero-sep">·</span>
              <span className="res-hero-stat">18 anni a Roma</span>
            </div>
          </div>
          <div className="res-hero-right sim-photo-slot">
            <img src="/images/residenze-hero.webp" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">architettura · Roma / luce dorata</span>
          </div>
        </section>

        {/* ── PROCESS STRIP ── */}
        <div className="res-process-strip">
          <div className="res-strip-left">
            <span className="res-label">Come funziona</span>
          </div>
          <div className="res-strip-steps">
            <div className="res-strip-step">
              <span className="res-step-num">01</span>
              <span className="res-step-name">Incontriamoci</span>
              <span className="res-step-desc">Gratuito, senza impegno</span>
            </div>
            <hr className="res-step-dash" />
            <div className="res-strip-step">
              <span className="res-step-num">02</span>
              <span className="res-step-name">Cerchiamo per te</span>
              <span className="res-step-desc">Solo immobili verificati</span>
            </div>
            <hr className="res-step-dash" />
            <div className="res-strip-step">
              <span className="res-step-num">03</span>
              <span className="res-step-name">Acquista</span>
              <span className="res-step-desc">Supporto legale incluso</span>
            </div>
          </div>
          <a className="res-strip-cta-right">Scopri gli Immobili →</a>
        </div>

        {/* ── PROPERTIES ── */}
        <section className="res-properties-section">
          <div className="res-properties-grid">
            {PROPERTIES.map((p, i) => (
              <div key={i} className={`res-prop-card${i === 0 ? ' res-prop-card--large' : ''}`}>
                <div className="res-prop-photo" style={{ background: p.bg }}>
                  <img src={p.src} alt="" className="sim-photo-img" />
                  <span className="res-photo-hint">{p.hint}</span>
                </div>
                <div className="res-prop-overlay">
                  <div className="res-prop-zone">{p.zone}</div>
                  <div className="res-prop-name">{p.name}</div>
                  <div className="res-prop-bottom-row">
                    <span className="res-prop-price">{p.price}</span>
                    <span className="res-prop-meta">{p.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="res-properties-strip">
            <span className="res-prop-strip-count">04 Immobili in Evidenza</span>
            <a className="res-prop-strip-link">Vedi tutto il Portfolio →</a>
          </div>
        </section>

        {/* ── ZONE ── */}
        <section className="res-zone-section">
          <div className="res-zone-header-label">La rete territoriale</div>
          <h2 className="res-zone-h2">Ogni quartiere<br />racconta una vita diversa.</h2>
          <hr className="res-zone-rule" />
          <div className="res-zone-pills">
            {Object.keys(ZONES).map(zKey => (
              <button
                key={zKey}
                className={`res-zone-pill${activeZone === zKey ? ' res-zone-pill--active' : ''}`}
                onClick={() => setActiveZone(zKey)}
              >
                {zKey.charAt(0).toUpperCase() + zKey.slice(1)}
              </button>
            ))}
          </div>
          <div className="res-zone-expanded">
            <div className="res-zone-info">
              <div className="res-zone-char">{zone.char}</div>
              <p className="res-zone-desc">{zone.desc}</p>
              <div className="res-zone-ratings">
                {[['Walkability', zone.walk], ['Scuole', zone.scuole], ['Verde', zone.verde]].map(([label, val]) => (
                  <div key={label} className="res-zone-rating-row">
                    <span className="res-zone-rating-label">{label}</span>
                    <RatingDots value={val} />
                  </div>
                ))}
              </div>
              <a className="res-zone-link">Immobili in zona →</a>
            </div>
            <div className="res-zone-photos">
              {zone.hints.map((h, i) => (
                <div key={i} className="res-zone-photo">
                  <div className="res-zone-photo-inner sim-photo-slot">
                    <img src={zone.photos[i]} alt="" className="sim-photo-img" />
                    <span className="sim-photo-hint">{h}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VENDITORE + ESTIMATOR ── */}
        <section className="res-venditore-section" id="venditore">
          <div className="res-venditore-grid">
            <div className="res-venditore-left">
              <div className="res-label">Stai pensando di vendere?</div>
              <h2 className="res-venditore-h2">La tua casa vale<br />più di quanto</h2>
              <span className="res-venditore-h2-italic">pensi.</span>
              <hr className="res-venditore-rule" />
              <p className="res-venditore-sub">Valutiamo gratuitamente il tuo immobile in 48 ore. Nessun impegno.</p>
              <div className="res-venditore-props">
                {[
                  ['Valutazione gratuita in 48 ore', 'Un esperto della tua zona ti contatta direttamente.'],
                  ['Vendiamo al 98,2% del prezzo', 'La media del mercato è 91%. La differenza è significativa.'],
                  ['23 giorni per trovare il compratore', 'La media di settore è 87 giorni. Questo è il nostro impegno.'],
                ].map(([title, desc]) => (
                  <div key={title} className="res-venditore-prop">
                    <div className="res-venditore-prop-title">{title}</div>
                    <div className="res-venditore-prop-desc">{desc}</div>
                  </div>
                ))}
              </div>
              <a className="res-btn-gold-full">Prenota la Valutazione Gratuita →</a>
            </div>

            <div className="res-venditore-right">
              <div className="res-estimator-box">
                <div className="res-estimator-label">Stima veloce del tuo immobile</div>

                <div className="res-est-field">
                  <span className="res-est-field-label">Città</span>
                  <select
                    className="res-est-select"
                    value={estCity}
                    onChange={e => setEstCity(e.target.value)}
                  >
                    <option value="roma">Roma</option>
                    <option value="milano">Milano</option>
                    <option value="firenze">Firenze</option>
                  </select>
                </div>

                <div className="res-est-field">
                  <span className="res-est-field-label">Tipologia</span>
                  <div className="res-est-tabs">
                    {['appartamento', 'villa', 'attico'].map(t => (
                      <button
                        key={t}
                        className={`res-est-tab${estType === t ? ' res-est-tab--active' : ''}`}
                        onClick={() => handleTypeTab(t)}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="res-est-field">
                  <span className="res-est-field-label">Superficie</span>
                  <div className="res-est-slider-wrap">
                    <div className="res-est-slider-label">
                      <span>Superficie</span>
                      <strong>{sqm} mq</strong>
                    </div>
                    <input
                      type="range"
                      min="30" max="400"
                      value={sqm}
                      onChange={e => setSqm(parseInt(e.target.value))}
                      className="res-est-slider"
                    />
                  </div>
                </div>

                <div className="res-est-field">
                  <span className="res-est-field-label">Condizione</span>
                  <div className="res-est-tabs">
                    {[['ristrutturato', 'Ristrutturato'], ['buono', 'Buono stato'], ['da-ristrutturare', 'Da ristrutturare']].map(([val, label]) => (
                      <button
                        key={val}
                        className={`res-est-tab${estCond === val ? ' res-est-tab--active' : ''}`}
                        onClick={() => handleCondTab(val)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {estVisible && (
                  <div className="res-est-result">
                    <span className="res-est-range-label">Stima Indicativa</span>
                    <div className="res-est-range">{estMin} — {estMax}</div>
                    <p className="res-est-disclaimer">Stima algoritmica basata su prezzi di zona. Per una valutazione precisa, prenota la consulenza gratuita.</p>
                  </div>
                )}

                <button className="res-est-btn" onClick={computeEstimate}>STIMA IL VALORE →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── KPI ── */}
        <section className="res-kpi-section">
          <div className="res-kpi-grid">
            {[
              ['23',    'Giorni',   'Tempo medio di vendita'],
              ['98,2%', 'Prezzo',   'Raggiunto sul richiesto'],
              ['340+',  'Famiglie', 'Accompagnate a casa'],
              ['18',    'Anni',     'A Roma, e non solo'],
            ].map(([num, unit, desc]) => (
              <div key={num} className="res-kpi-item">
                <div className="res-kpi-num">{num}</div>
                <span className="res-kpi-unit">{unit}</span>
                <div className="res-kpi-desc">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AGENTI ── */}
        <section className="res-agenti-section">
          <div className="res-agenti-header">
            <div className="res-label">Il team</div>
            <h2 className="res-agenti-h2">Le persone<br /><em>dietro ogni acquisto.</em></h2>
          </div>
          <div className="res-agenti-grid">
            {AGENTI.map((a, i) => (
              <div key={i} className="res-agente-card">
                <div className="res-agente-photo" style={{ background: a.bg }}>
                  <img src={a.photo} alt={a.name} className="sim-photo-img" />
                  <span className="res-photo-hint">agente · ritratto / studio</span>
                </div>
                <div className="res-agente-name">{a.name}</div>
                <div className="res-agente-zone">{a.zone}</div>
                <div className="res-agente-tags">
                  {a.tags.map(t => <span key={t} className="res-agente-tag">{t}</span>)}
                </div>
                <a className="res-agente-link">Conosci {a.name.split(' ')[0]} →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── INSIGHTS ── */}
        <section className="res-insights-section">
          <div className="res-insights-header">
            <div className="res-label">Insights · Mercato Immobiliare</div>
            <h2 className="res-insights-h2">Leggi, impara, decidi meglio.</h2>
          </div>
          <div className="res-insights-grid">
            {INSIGHTS.map((ins, i) => (
              <div key={i} className="res-insight-card">
                <div className="res-insight-photo" style={{ background: ins.bg }}>
                  <img src={ins.src} alt="" className="sim-photo-img" />
                  <span className="res-photo-hint">{ins.hint}</span>
                </div>
                <div className="res-insight-body">
                  <div className="res-insight-category">{ins.category}</div>
                  <h3 className="res-insight-title">{ins.title}</h3>
                  <p className="res-insight-excerpt">{ins.excerpt}</p>
                  <a className="res-insight-link">Leggi l'articolo →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="res-footer">
          <div className="res-footer-brand">RESIDENZE</div>
          <div className="res-footer-copy">© 2026 Residenze Srl · Via Condotti 12 · Roma</div>
          <div className="res-footer-links">
            <a className="res-footer-link">Instagram</a>
            <a className="res-footer-link">LinkedIn</a>
            <a className="res-footer-link">info@residenze.it</a>
          </div>
        </footer>

      </div>
    </SimWrapper>
  );
};

export default ImmobiliareSim;
