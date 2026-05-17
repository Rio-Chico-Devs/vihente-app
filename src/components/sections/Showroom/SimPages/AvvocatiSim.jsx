import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './AvvocatiSim.css';

const AREE = [
  {
    nome: 'Diritto Civile',
    desc: 'Contratti, responsabilità civile, risarcimento danni e tutela dei diritti reali.',
    icon: 'M3 10h18M3 14h18M5 18h14M5 6h14',
  },
  {
    nome: 'Diritto Penale',
    desc: "Difesa in giudizio, assistenza nella fase delle indagini e procedimenti d'appello.",
    icon: 'M12 2L3 7v5c0 5 3.5 9 9 10 5.5-1 9-5 9-10V7l-9-5z',
  },
  {
    nome: 'Diritto del Lavoro',
    desc: 'Licenziamenti, controversie sindacali, contratti di assunzione e mobbing.',
    icon: 'M16 4h4v4M4 20l16-16M8 20H4v-4',
  },
  {
    nome: 'Diritto di Famiglia',
    desc: 'Separazioni, divorzi, affidamento dei minori e regolamentazione patrimoniale.',
    icon: 'M12 2v6m-6 0a6 6 0 1012 0M5 22l3-6h8l3 6',
  },
  {
    nome: 'Diritto Societario',
    desc: 'Costituzione, fusioni, joint venture, governance aziendale e contratti commerciali.',
    icon: 'M3 21V8l9-5 9 5v13M9 21V13h6v8',
  },
  {
    nome: 'Diritto Immobiliare',
    desc: 'Compravendite, locazioni, condominio e controversie su proprietà e confini.',
    icon: 'M3 11l9-7 9 7v10H3z M9 21V13h6v8',
  },
];

const SOCI = [
  {
    nome: 'Avv. Marco Rossi',
    ruolo: 'Socio Fondatore',
    area: 'Diritto Civile · Contenzioso',
    foro: 'Cassazione · Milano',
    anni: 'XXVII anni di esperienza',
    init: 'MR',
  },
  {
    nome: 'Avv. Giulia Ferrari',
    ruolo: 'Equity Partner',
    area: 'Diritto del Lavoro',
    foro: 'Milano · Bruxelles',
    anni: 'XVIII anni di esperienza',
    init: 'GF',
  },
  {
    nome: 'Avv. Luca Bianchi',
    ruolo: 'Equity Partner',
    area: "Diritto Penale d'Impresa",
    foro: 'Cassazione · Roma',
    anni: 'XXI anni di esperienza',
    init: 'LB',
  },
];

const CASI = [
  {
    cifra: '€ 12 M',
    titolo: 'Risarcimento ottenuto',
    sotto: 'Causa di responsabilità contrattuale · settore manifatturiero',
  },
  {
    cifra: '94%',
    titolo: 'Successo in appello',
    sotto: 'Su procedimenti penali patrocinati negli ultimi cinque anni',
  },
  {
    cifra: '€ 180 M',
    titolo: 'M&A assistite',
    sotto: 'Operazioni straordinarie concluse — biennio MMXXIII–MMXXIV',
  },
];

const RICONOSCIMENTI = [
  'Chambers Europe',
  'Legal 500',
  'TopLegal Italia',
  'IFLR1000',
  'ELITE — Borsa Italiana',
];

const TESTIMONIANZE = [
  {
    testo: 'Un livello di rigore e discrezione che è raro incontrare. Ogni passaggio è stato anticipato, ogni rischio mitigato.',
    autore: 'Direttore Generale',
    azienda: 'Gruppo industriale quotato',
  },
  {
    testo: 'Hanno gestito una vertenza estremamente delicata con la solidità di una grande boutique e la velocità di uno studio agile.',
    autore: 'CFO',
    azienda: 'Azienda farmaceutica internazionale',
  },
];

const AvvocatiSim = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!nome || !area) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setModalOpen(false);
      setNome('');
      setArea('');
      setMessaggio('');
    }, 2400);
  };

  return (
    <SimWrapper templateId="avvocati" templateTitle="Studio Legale" accentColor="#B89B5E">
      <div className="avv-site">

        {/* ── TOP STRIP — heritage ── */}
        <div className="avv-strip">
          <span className="avv-strip-left">FONDATO · MCMXCVIII</span>
          <span className="avv-strip-center">Studio Legale Rossi &amp; Associati · Milano · Roma · Bruxelles</span>
          <span className="avv-strip-right">+39 02 9876 543</span>
        </div>

        {/* ── NAV ── */}
        <nav className="avv-nav">
          <div className="avv-nav-brand">
            <svg className="avv-brand-mark" viewBox="0 0 40 40" width="36" height="36">
              <g stroke="#B89B5E" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <line x1="20" y1="6" x2="20" y2="34" />
                <line x1="8" y1="13" x2="32" y2="13" />
                <path d="M8 13 L5 22 Q5 24 8 24 Q11 24 11 22 Z" />
                <path d="M32 13 L29 22 Q29 24 32 24 Q35 24 35 22 Z" />
                <circle cx="20" cy="34" r="2.4" />
              </g>
            </svg>
            <div className="avv-brand-text">
              <span className="avv-brand-line1">ROSSI &amp; ASSOCIATI</span>
              <span className="avv-brand-line2">Studio Legale dal MCMXCVIII</span>
            </div>
          </div>
          <div className="avv-nav-links">
            <a className="avv-nav-link">Studio</a>
            <a className="avv-nav-link">Aree di Pratica</a>
            <a className="avv-nav-link">I Soci</a>
            <a className="avv-nav-link">Casi</a>
            <a className="avv-nav-link">Pubblicazioni</a>
            <a className="avv-nav-link">Contatti</a>
          </div>
          <button className="avv-nav-cta" onClick={() => setModalOpen(true)}>Consulenza Riservata</button>
        </nav>

        {/* ── HERO ── */}
        <section className="avv-hero">
          <div className="avv-hero-photobg">
            <img src="" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · architettura / marmo</span>
          </div>
          <div className="avv-hero-inner">
            <div className="avv-hero-emblem">
              <svg viewBox="0 0 60 60" width="50" height="50">
                <g stroke="#B89B5E" strokeWidth="1" fill="none" strokeLinecap="round">
                  <line x1="30" y1="8" x2="30" y2="50" />
                  <line x1="14" y1="16" x2="46" y2="16" />
                  <path d="M14 16 L10 28 Q10 31 14 31 Q18 31 18 28 Z" />
                  <path d="M46 16 L42 28 Q42 31 46 31 Q50 31 50 28 Z" />
                  <circle cx="30" cy="50" r="2.6" />
                  <path d="M22 50 L38 50" />
                </g>
              </svg>
            </div>
            <div className="avv-hero-rule" />
            <p className="avv-hero-eyebrow">XXV anni — Difesa giuridica di prim'ordine</p>
            <h1 className="avv-h1">
              <em>Difendiamo</em> i vostri diritti<br />
              con <em>autorevolezza</em> e precisione.
            </h1>
            <p className="avv-hero-desc">
              Un approccio rigoroso, una strategia su misura, un team che ha rappresentato
              clienti privati e istituzioni davanti alle più alte corti italiane ed europee.
            </p>
            <div className="avv-hero-actions">
              <button className="avv-btn-gold" onClick={() => setModalOpen(true)}>
                Prenota una consulenza riservata
              </button>
              <button className="avv-btn-ghost">Scopri lo studio</button>
            </div>
            <div className="avv-hero-stats">
              <div className="avv-stat"><strong>2.400+</strong><span>casi gestiti</span></div>
              <div className="avv-stat-divider" />
              <div className="avv-stat"><strong>96%</strong><span>tasso di successo</span></div>
              <div className="avv-stat-divider" />
              <div className="avv-stat"><strong>XXV</strong><span>anni di studio</span></div>
              <div className="avv-stat-divider" />
              <div className="avv-stat"><strong>III</strong><span>sedi europee</span></div>
            </div>
          </div>
        </section>

        {/* ── AREE DI PRATICA ── */}
        <section className="avv-aree">
          <div className="avv-aree-inner">
            <div className="avv-section-head">
              <p className="avv-eyebrow">I · Aree di Pratica</p>
              <h2 className="avv-section-title">La nostra competenza</h2>
              <p className="avv-section-sub">
                Sei aree di pratica integrate, una visione unica. Ogni mandato è seguito da un
                team multidisciplinare guidato da un socio referente.
              </p>
            </div>
            <div className="avv-aree-grid">
              {AREE.map((a, i) => (
                <div key={a.nome} className="avv-area-card">
                  <div className="avv-area-num">{String(i + 1).padStart(2, '0')}</div>
                  <svg className="avv-area-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d={a.icon} />
                  </svg>
                  <h3 className="avv-area-nome">{a.nome}</h3>
                  <p className="avv-area-desc">{a.desc}</p>
                  <span className="avv-area-link">Approfondisci →</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── I SOCI ── */}
        <section className="avv-soci">
          <div className="avv-soci-inner">
            <div className="avv-section-head">
              <p className="avv-eyebrow">II · I Soci</p>
              <h2 className="avv-section-title">Il team che vi affianca</h2>
              <p className="avv-section-sub">
                Tre soci, settanta anni di esperienza cumulata, una sola misura di qualità.
              </p>
            </div>
            <div className="avv-soci-grid">
              {SOCI.map(s => (
                <div key={s.nome} className="avv-socio-card">
                  <div className="avv-socio-portrait">
                    <div className="avv-portrait-frame sim-photo-slot">
                      <img src="" alt={s.nome} className="sim-photo-img" />
                      <span className="sim-photo-hint">ritratto · {s.init}</span>
                      <div className="avv-portrait-init">{s.init}</div>
                    </div>
                  </div>
                  <h3 className="avv-socio-nome">{s.nome}</h3>
                  <p className="avv-socio-ruolo">{s.ruolo}</p>
                  <div className="avv-socio-meta">
                    <span>{s.area}</span>
                    <span>{s.foro}</span>
                    <span>{s.anni}</span>
                  </div>
                  <button className="avv-socio-cta" onClick={() => setModalOpen(true)}>
                    Richiedi un incontro
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASI DI SUCCESSO ── */}
        <section className="avv-casi">
          <div className="avv-casi-inner">
            <div className="avv-section-head avv-section-head--center">
              <p className="avv-eyebrow">III · Casi di Successo</p>
              <h2 className="avv-section-title">I risultati parlano</h2>
            </div>
            <div className="avv-casi-grid">
              {CASI.map((c, i) => (
                <div key={i} className="avv-caso-card">
                  <span className="avv-caso-roman">{['I', 'II', 'III'][i]}</span>
                  <strong className="avv-caso-cifra">{c.cifra}</strong>
                  <p className="avv-caso-titolo">{c.titolo}</p>
                  <p className="avv-caso-sotto">{c.sotto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RICONOSCIMENTI ── */}
        <section className="avv-riconoscimenti">
          <p className="avv-ric-eyebrow">RICONOSCIUTI DA</p>
          <div className="avv-ric-row">
            {RICONOSCIMENTI.map(r => (
              <span key={r} className="avv-ric-item">{r}</span>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIANZE ── */}
        <section className="avv-testimonianze">
          <div className="avv-test-inner">
            <p className="avv-eyebrow">IV · Testimonianze</p>
            <div className="avv-test-grid">
              {TESTIMONIANZE.map((t, i) => (
                <blockquote key={i} className="avv-test-card">
                  <div className="avv-test-quote">«</div>
                  <p className="avv-test-text">{t.testo}</p>
                  <footer className="avv-test-footer">
                    <span className="avv-test-autore">{t.autore}</span>
                    <span className="avv-test-azienda">{t.azienda}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="avv-banner">
          <div className="avv-banner-inner">
            <p className="avv-banner-pre">Avete una questione delicata?</p>
            <h2 className="avv-banner-title">La prima consulenza è <em>gratuita</em> e <em>riservata</em>.</h2>
            <p className="avv-banner-sub">
              Vi richiamiamo entro 24 ore lavorative. Massima confidenzialità garantita.
            </p>
            <button className="avv-btn-gold avv-banner-btn" onClick={() => setModalOpen(true)}>
              Richiedi consulenza
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="avv-footer">
          <div className="avv-footer-inner">
            <div className="avv-footer-col">
              <div className="avv-footer-logo">ROSSI &amp; ASSOCIATI</div>
              <p className="avv-footer-tag">Studio Legale dal MCMXCVIII</p>
            </div>
            <div className="avv-footer-col">
              <p className="avv-footer-head">Milano · Sede principale</p>
              <p>Via Montenapoleone 8</p>
              <p>20121 Milano</p>
              <p>+39 02 9876 543</p>
            </div>
            <div className="avv-footer-col">
              <p className="avv-footer-head">Roma</p>
              <p>Piazza di Spagna 32</p>
              <p>00187 Roma</p>
            </div>
            <div className="avv-footer-col">
              <p className="avv-footer-head">Bruxelles</p>
              <p>Avenue Louise 222</p>
              <p>1050 Bruxelles</p>
            </div>
          </div>
          <div className="avv-footer-bottom">
            <span>P.IVA 01234567890</span>
            <span>Iscritti all'Ordine degli Avvocati di Milano</span>
            <span>© MMXXVI Rossi &amp; Associati — Tutti i diritti riservati</span>
          </div>
        </footer>

      </div>

      {/* ── CONSULTATION MODAL ── */}
      {modalOpen && (
        <div className="avv-overlay" onClick={() => setModalOpen(false)}>
          <div className="avv-modal" onClick={e => e.stopPropagation()}>
            {sent ? (
              <div className="avv-modal-success">
                <div className="avv-success-icon">✓</div>
                <p className="avv-success-title">Richiesta ricevuta</p>
                <small className="avv-success-sub">
                  Un nostro socio vi contatterà entro 24 ore lavorative.<br />
                  La pratica è già stata protocollata con riservatezza.
                </small>
              </div>
            ) : (
              <>
                <p className="avv-modal-eyebrow">CONSULENZA RISERVATA</p>
                <h3 className="avv-modal-title">Una prima valutazione, <em>gratuita</em>.</h3>
                <p className="avv-modal-sub">
                  Compilate il modulo. Vi richiameremo entro 24 ore lavorative — sempre da un socio.
                </p>
                <div className="avv-form">
                  <label className="avv-label">Nome e Cognome</label>
                  <input
                    className="avv-input"
                    type="text"
                    placeholder="Mario Bianchi"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                  <label className="avv-label">Area di interesse</label>
                  <select
                    className="avv-input avv-select"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                  >
                    <option value="">Seleziona un'area</option>
                    {AREE.map(a => (
                      <option key={a.nome} value={a.nome}>{a.nome}</option>
                    ))}
                  </select>
                  <label className="avv-label">Breve descrizione (opzionale)</label>
                  <textarea
                    className="avv-input avv-textarea"
                    rows={3}
                    placeholder="Descriva sinteticamente la situazione…"
                    value={messaggio}
                    onChange={e => setMessaggio(e.target.value)}
                  />
                </div>
                <p className="avv-modal-privacy">
                  I dati sono trattati nel pieno rispetto del segreto professionale.
                </p>
                <div className="avv-modal-footer">
                  <button className="avv-modal-cancel" onClick={() => setModalOpen(false)}>
                    Annulla
                  </button>
                  <button
                    className="avv-modal-confirm"
                    disabled={!nome || !area}
                    onClick={handleSend}
                  >
                    Invia richiesta →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </SimWrapper>
  );
};

export default AvvocatiSim;
