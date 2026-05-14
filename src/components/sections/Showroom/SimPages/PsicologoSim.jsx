import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './PsicologoSim.css';

const SPECIALITA = [
  { nome: 'Ansia e Attacchi di Panico', desc: 'Tecniche evidence-based per recuperare serenità e controllo nelle situazioni difficili.' },
  { nome: 'Relazioni di Coppia', desc: 'Percorsi individuali e di coppia per ritrovare connessione, dialogo e fiducia reciproca.' },
  { nome: 'Trauma e PTSD', desc: 'Approccio EMDR e trauma-focused per elaborare esperienze difficili e ritrovare equilibrio.' },
  { nome: 'Crescita Personale', desc: 'Sviluppo di consapevolezza, autostima e risorse interiori per vivere più autenticamente.' },
];

const TARIFFE = [
  { tipo: 'Prima Consulenza', prezzo: 'Gratuita', nota: '30 minuti — online o in studio', featured: false },
  { tipo: 'Seduta Individuale', prezzo: '€ 75', nota: '50 minuti — in studio o online', featured: true },
  { tipo: 'Percorso Mensile', prezzo: '€ 260', nota: '4 sedute + supporto via messaggio', featured: false },
];

const SLOTS = ['Lun 09:00', 'Lun 14:00', 'Lun 17:30', 'Mar 10:00', 'Mer 09:30', 'Mer 15:00', 'Gio 11:00', 'Ven 14:00', 'Ven 17:00'];

const PsicologoSim = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setModalOpen(false);
      setSelectedSlot(null);
    }, 2200);
  };

  return (
    <SimWrapper templateId="psicologo" templateTitle="Studio Psicologo" accentColor="#5C7A6B">
      <div className="psi-site">

        {/* ── NAV ── */}
        <nav className="psi-nav">
          <div className="psi-nav-logo">Dr.ssa Elena Mancini</div>
          <div className="psi-nav-links">
            <a className="psi-nav-link" href="#chi-sono">Chi sono</a>
            <a className="psi-nav-link" href="#specializzazioni">Specializzazioni</a>
            <a className="psi-nav-link" href="#tariffe">Tariffe</a>
          </div>
          <button className="psi-nav-cta" onClick={() => setModalOpen(true)}>Prenota</button>
        </nav>

        {/* ── HERO ── */}
        <section className="psi-hero">
          <div className="psi-hero-text">
            <p className="psi-eyebrow">Psicologa · Psicoterapeuta · Milano</p>
            <h1 className="psi-h1">Un percorso verso<br />il tuo benessere.</h1>
            <p className="psi-hero-desc">
              Ascolto empatico, strumenti concreti e un approccio evidence-based
              per aiutarti a stare meglio — in studio o online.
            </p>
            <div className="psi-hero-btns">
              <button className="psi-btn-primary" onClick={() => setModalOpen(true)}>
                Prenota una sessione
              </button>
              <button className="psi-btn-ghost">Scopri il mio approccio</button>
            </div>
          </div>
          <div className="psi-hero-photo">
            <div className="psi-photo-placeholder">
              <svg viewBox="0 0 100 130" width="90" height="117">
                <circle cx="50" cy="34" r="22" fill="#8FAF8A" opacity="0.55" />
                <path d="M8 130 Q8 78 50 78 Q92 78 92 130" fill="#8FAF8A" opacity="0.38" />
              </svg>
            </div>
            <div className="psi-badge-years">
              <strong>8+</strong>
              <span>anni di esperienza</span>
            </div>
          </div>
        </section>

        {/* ── SPECIALIZZAZIONI ── */}
        <section className="psi-specs-section" id="specializzazioni">
          <p className="psi-section-eyebrow">SPECIALIZZAZIONI</p>
          <h2 className="psi-section-title">Come posso aiutarti</h2>
          <div className="psi-specs-grid">
            {SPECIALITA.map(s => (
              <div key={s.nome} className="psi-spec-card">
                <div className="psi-spec-dot" />
                <h3 className="psi-spec-name">{s.nome}</h3>
                <p className="psi-spec-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHI SONO ── */}
        <section className="psi-about" id="chi-sono">
          <div className="psi-about-inner">
            <div className="psi-about-photo">
              <div className="psi-about-photo-placeholder">
                <svg viewBox="0 0 80 100" width="72" height="90">
                  <circle cx="40" cy="28" r="18" fill="#8FAF8A" opacity="0.5" />
                  <path d="M5 100 Q5 62 40 62 Q75 62 75 100" fill="#8FAF8A" opacity="0.35" />
                </svg>
              </div>
            </div>
            <div className="psi-about-content">
              <p className="psi-section-eyebrow">CHI SONO</p>
              <h2 className="psi-section-title">Dott.ssa Elena Mancini</h2>
              <p className="psi-about-text">
                Psicologa iscritta all'Albo di Milano e psicoterapeuta ad orientamento
                cognitivo-comportamentale. Laureata in Psicologia Clinica all'Università degli
                Studi di Milano con lode, ho completato la formazione specialistica presso
                l'Istituto Beck di Milano.
              </p>
              <p className="psi-about-text">
                Credo che ogni persona abbia le risorse per stare meglio. Il mio compito
                è aiutarti a scoprirle e a usarle nel modo più efficace possibile.
              </p>
              <div className="psi-about-certs">
                <span className="psi-cert">Laurea Magistrale con Lode</span>
                <span className="psi-cert">Albo Psicologi Lombardia</span>
                <span className="psi-cert">Specializzazione CBT</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TARIFFE ── */}
        <section className="psi-tariffe" id="tariffe">
          <p className="psi-section-eyebrow" style={{ textAlign: 'center' }}>TARIFFE</p>
          <h2 className="psi-section-title" style={{ textAlign: 'center' }}>Trasparenza prima di tutto</h2>
          <div className="psi-tariffe-grid">
            {TARIFFE.map(t => (
              <div key={t.tipo} className={`psi-tariffa-card${t.featured ? ' psi-tariffa-card--featured' : ''}`}>
                <div className="psi-tariffa-prezzo">{t.prezzo}</div>
                <div className="psi-tariffa-tipo">{t.tipo}</div>
                <div className="psi-tariffa-nota">{t.nota}</div>
                <button className="psi-tariffa-cta" onClick={() => setModalOpen(true)}>
                  {t.prezzo === 'Gratuita' ? 'Prenota gratis' : 'Prenota ora'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIM FOOTER ── */}
        <footer className="psi-footer">
          <div className="psi-footer-logo">Dr.ssa Elena Mancini</div>
          <p className="psi-footer-sub">
            Via Brera 14, Milano &nbsp;·&nbsp; info@drelena.it &nbsp;·&nbsp; +39 02 1234567
          </p>
          <p className="psi-footer-legal">Iscritta all'Albo degli Psicologi della Lombardia — n. 12345</p>
        </footer>

      </div>

      {/* ── BOOKING MODAL ── */}
      {modalOpen && (
        <div className="psi-overlay" onClick={() => setModalOpen(false)}>
          <div className="psi-modal" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="psi-modal-success">
                <div className="psi-success-icon">✓</div>
                <p className="psi-success-title">Richiesta inviata!</p>
                <small className="psi-success-sub">Ti contatteremo entro 24 ore per confermare.</small>
              </div>
            ) : (
              <>
                <h3 className="psi-modal-title">Prenota una sessione</h3>
                <p className="psi-modal-sub">Seleziona un orario disponibile:</p>
                <div className="psi-slot-grid">
                  {SLOTS.map(o => (
                    <button
                      key={o}
                      className={`psi-slot${selectedSlot === o ? ' psi-slot--active' : ''}`}
                      onClick={() => setSelectedSlot(o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="psi-modal-footer">
                  <button className="psi-modal-cancel" onClick={() => setModalOpen(false)}>
                    Annulla
                  </button>
                  <button
                    className="psi-modal-confirm"
                    disabled={!selectedSlot}
                    onClick={handleBook}
                  >
                    Conferma →
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

export default PsicologoSim;
