import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './AvvocatiSim.css';

const AREE = [
  { nome: 'Diritto Civile', desc: 'Contratti, responsabilità civile, risarcimento danni e tutela dei diritti reali.' },
  { nome: 'Diritto Penale', desc: 'Difesa in giudizio, assistenza nella fase delle indagini e procedimenti d'appello.' },
  { nome: 'Diritto del Lavoro', desc: 'Licenziamenti, controversie sindacali, contratti di assunzione e mobbing.' },
  { nome: 'Diritto di Famiglia', desc: 'Separazioni, divorzi, affidamento dei minori e regolamentazione patrimoniale.' },
  { nome: 'Diritto Societario', desc: 'Costituzione, fusioni, joint venture, governance aziendale e contratti commerciali.' },
  { nome: 'Diritto Immobiliare', desc: 'Compravendite, locazioni, condominio e controversie su proprietà e confini.' },
];

const SOCI = [
  { nome: 'Avv. Marco Rossi', ruolo: 'Socio Fondatore · Diritto Civile' },
  { nome: 'Avv. Giulia Ferrari', ruolo: 'Socia · Diritto del Lavoro' },
  { nome: 'Avv. Luca Bianchi', ruolo: 'Socio · Diritto Penale' },
];

const AvvocatiSim = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!nome || !area) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setModalOpen(false);
      setNome('');
      setArea('');
    }, 2400);
  };

  return (
    <SimWrapper templateId="avvocati" templateTitle="Studio Legale" accentColor="#C9A843">
      <div className="avv-site">

        {/* ── NAV ── */}
        <nav className="avv-nav">
          <div className="avv-nav-logo">STUDIO LEGALE ROSSI &amp; ASSOCIATI</div>
          <div className="avv-nav-links">
            <a className="avv-nav-link">Aree di Pratica</a>
            <a className="avv-nav-link">I Soci</a>
            <a className="avv-nav-link">Chi Siamo</a>
            <a className="avv-nav-link">Contatti</a>
          </div>
          <button className="avv-nav-cta" onClick={() => setModalOpen(true)}>Consulenza</button>
        </nav>

        {/* ── HERO ── */}
        <section className="avv-hero">
          <div className="avv-hero-rule" />
          <p className="avv-hero-eyebrow">Fondato nel 1998 · Milano · Roma · Bruxelles</p>
          <h1 className="avv-h1">Difendiamo i vostri diritti<br />con autorevolezza e precisione.</h1>
          <p className="avv-hero-desc">
            Venticinque anni di esperienza al servizio di persone, aziende e istituzioni.
            Un approccio rigoroso, una strategia su misura.
          </p>
          <div className="avv-hero-rule" />
          <button className="avv-btn-gold" onClick={() => setModalOpen(true)}>
            Prenota una consulenza gratuita
          </button>
          <div className="avv-hero-stats">
            <div className="avv-stat"><strong>2.400+</strong><span>casi gestiti</span></div>
            <div className="avv-stat-divider" />
            <div className="avv-stat"><strong>96%</strong><span>tasso di successo</span></div>
            <div className="avv-stat-divider" />
            <div className="avv-stat"><strong>25</strong><span>anni di esperienza</span></div>
          </div>
        </section>

        {/* ── AREE DI PRATICA ── */}
        <section className="avv-aree">
          <div className="avv-aree-inner">
            <p className="avv-eyebrow">AREE DI PRATICA</p>
            <h2 className="avv-section-title">La nostra competenza</h2>
            <div className="avv-aree-grid">
              {AREE.map(a => (
                <div key={a.nome} className="avv-area-card">
                  <div className="avv-area-rule" />
                  <h3 className="avv-area-nome">{a.nome}</h3>
                  <p className="avv-area-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── I SOCI ── */}
        <section className="avv-soci">
          <div className="avv-soci-inner">
            <p className="avv-eyebrow">I SOCI</p>
            <h2 className="avv-section-title">Il team che ti affianca</h2>
            <div className="avv-soci-grid">
              {SOCI.map(s => (
                <div key={s.nome} className="avv-socio-card">
                  <div className="avv-socio-avatar">
                    <svg viewBox="0 0 60 80" width="44" height="58">
                      <circle cx="30" cy="22" r="13" fill="#C9A843" opacity="0.45" />
                      <path d="M4 80 Q4 46 30 46 Q56 46 56 80" fill="#C9A843" opacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="avv-socio-nome">{s.nome}</h3>
                  <p className="avv-socio-ruolo">{s.ruolo}</p>
                  <button className="avv-socio-cta" onClick={() => setModalOpen(true)}>
                    Fissa un appuntamento
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="avv-banner">
          <p className="avv-banner-pre">Hai bisogno di assistenza legale?</p>
          <h2 className="avv-banner-title">La prima consulenza è gratuita.</h2>
          <button className="avv-btn-gold" onClick={() => setModalOpen(true)}>
            Contattaci ora →
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer className="avv-footer">
          <div className="avv-footer-logo">STUDIO LEGALE ROSSI &amp; ASSOCIATI</div>
          <p className="avv-footer-sub">
            Via Montenapoleone 8, Milano &nbsp;·&nbsp; info@studiolegaleros si.it &nbsp;·&nbsp; +39 02 9876543
          </p>
          <p className="avv-footer-legal">
            P.IVA 01234567890 — Iscritti all'Ordine degli Avvocati di Milano
          </p>
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
                  Un nostro avvocato vi contatterà entro 24 ore lavorative.
                </small>
              </div>
            ) : (
              <>
                <h3 className="avv-modal-title">Consulenza Gratuita</h3>
                <p className="avv-modal-sub">Compilate il modulo e vi ricontatteremo al più presto.</p>
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
                </div>
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
