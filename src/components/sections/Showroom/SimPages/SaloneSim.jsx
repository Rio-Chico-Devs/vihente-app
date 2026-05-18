import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './SaloneSim.css';

const SERVIZI = [
  { nome: 'Taglio Donna', desc: 'Consultazione + taglio personalizzato', prezzo: '€ 55', durata: '60 min' },
  { nome: 'Colorazione Completa', desc: 'Colore pieno, balayage o highlights', prezzo: 'da € 95', durata: '120 min' },
  { nome: 'Piega e Styling', desc: 'Blow-dry e definizione su misura', prezzo: '€ 38', durata: '45 min' },
  { nome: 'Trattamento Keratina', desc: 'Lisciatura e nutrimento intensivo', prezzo: '€ 130', durata: '150 min' },
  { nome: 'Taglio Uomo', desc: 'Taglio + finish professionale', prezzo: '€ 35', durata: '40 min' },
  { nome: 'Spa Capelli', desc: 'Maschera + massaggio cuoio capelluto', prezzo: '€ 65', durata: '75 min' },
];

const TEAM = [
  { nome: 'Sofia Marini', ruolo: 'Color Specialist', anni: '12 anni' },
  { nome: 'Giulia Conte', ruolo: 'Styling Director', anni: '9 anni' },
  { nome: 'Andrea Villa', ruolo: 'Hair Artist', anni: '6 anni' },
];

const SaloneSim = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selService, setSelService] = useState('');
  const [selData, setSelData] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!selService || !selData) return;
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setModalOpen(false);
      setSelService('');
      setSelData('');
    }, 2400);
  };

  return (
    <SimWrapper templateId="salone" templateTitle="Salone di Bellezza" accentColor="#C9A96E">
      <div className="sal-site">

        {/* ── NAV ── */}
        <nav className="sal-nav">
          <div className="sal-nav-links">
            <a className="sal-nav-link">Servizi</a>
            <a className="sal-nav-link">Team</a>
            <a className="sal-nav-link">Galleria</a>
          </div>
          <div className="sal-nav-logo">ATELIER ARIA</div>
          <div className="sal-nav-right">
            <button className="sal-nav-cta" onClick={() => setModalOpen(true)}>Prenota</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="sal-hero">
          <div className="sal-hero-bg">
            <img src="" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · salone / beauty interior</span>
          </div>
          <div className="sal-hero-content">
            <p className="sal-eyebrow">Salone di Bellezza · Milano, Brera</p>
            <h1 className="sal-h1">La bellezza<br />è un'arte.</h1>
            <p className="sal-hero-desc">
              Da oltre quindici anni trasformiamo ogni visita in un'esperienza.
              Perché la cura di sé inizia dal momento in cui entri.
            </p>
            <button className="sal-btn-primary" onClick={() => setModalOpen(true)}>
              Prenota il tuo appuntamento
            </button>
          </div>
        </section>

        {/* ── SERVIZI ── */}
        <section className="sal-servizi" id="servizi">
          <div className="sal-servizi-inner">
            <p className="sal-eyebrow-section">SERVIZI</p>
            <h2 className="sal-section-title">Un trattamento per ogni esigenza</h2>
            <div className="sal-servizi-grid">
              {SERVIZI.map(s => (
                <div key={s.nome} className="sal-servizio-card">
                  <div className="sal-servizio-header">
                    <h3 className="sal-servizio-nome">{s.nome}</h3>
                    <div className="sal-servizio-prezzo">{s.prezzo}</div>
                  </div>
                  <p className="sal-servizio-desc">{s.desc}</p>
                  <div className="sal-servizio-footer">
                    <span className="sal-servizio-durata">{s.durata}</span>
                    <button
                      className="sal-servizio-btn"
                      onClick={() => { setSelService(s.nome); setModalOpen(true); }}
                    >
                      Prenota
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="sal-team">
          <div className="sal-team-inner">
            <p className="sal-eyebrow-section">IL NOSTRO TEAM</p>
            <h2 className="sal-section-title">Artigiani della bellezza</h2>
            <div className="sal-team-grid">
              {TEAM.map(m => (
                <div key={m.nome} className="sal-member-card">
                  <div className="sal-member-avatar sim-photo-slot">
                    <img src="" alt={m.nome} className="sim-photo-img" />
                    <span className="sim-photo-hint">{m.nome.split(' ')[0]}</span>
                    <svg viewBox="0 0 80 100" width="52" height="65">
                      <circle cx="40" cy="28" r="16" fill="#C9A96E" opacity="0.45" />
                      <path d="M5 100 Q5 64 40 64 Q75 64 75 100" fill="#C9A96E" opacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="sal-member-nome">{m.nome}</h3>
                  <p className="sal-member-ruolo">{m.ruolo}</p>
                  <p className="sal-member-anni">{m.anni} di esperienza</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERIA PLACEHOLDER ── */}
        <section className="sal-gallery">
          <div className="sal-gallery-inner">
            <p className="sal-eyebrow-section">GALLERIA</p>
            <h2 className="sal-section-title">Il nostro lavoro</h2>
            <div className="sal-gallery-grid">
              {[
                '#E8DDD0', '#D8CFC2', '#C8BFB0',
                '#EAE0D4', '#D2C8BC', '#E0D6CA',
              ].map((c, i) => (
                <div key={i} className="sal-gallery-item sim-photo-slot" style={{ background: `linear-gradient(145deg, ${c}, ${c}BB)` }}>
                  <img src="" alt="" className="sim-photo-img" />
                  <span className="sim-photo-hint">gallery · {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="sal-cta-strip">
          <h2 className="sal-cta-title">Pronta per la tua trasformazione?</h2>
          <button className="sal-btn-primary" onClick={() => setModalOpen(true)}>
            Prenota ora →
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer className="sal-footer">
          <div className="sal-footer-logo">ATELIER ARIA</div>
          <p className="sal-footer-sub">Via Brera 22, Milano · info@atelieraria.it · +39 02 3456789</p>
          <div className="sal-footer-orari">
            <span>Lun–Sab: 09:00–19:30</span>
            <span>Dom: chiuso</span>
          </div>
        </footer>

      </div>

      {/* ── BOOKING MODAL ── */}
      {modalOpen && (
        <div className="sal-overlay" onClick={() => setModalOpen(false)}>
          <div className="sal-modal" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="sal-modal-success">
                <div className="sal-success-icon">✓</div>
                <p className="sal-success-title">Appuntamento confermato!</p>
                <small className="sal-success-sub">
                  Riceverai una conferma via email entro pochi minuti.
                </small>
              </div>
            ) : (
              <>
                <div className="sal-modal-header">
                  <h3 className="sal-modal-title">Prenota un appuntamento</h3>
                  <button className="sal-modal-x" onClick={() => setModalOpen(false)}>✕</button>
                </div>
                <div className="sal-form">
                  <label className="sal-label">Servizio</label>
                  <select
                    className="sal-select"
                    value={selService}
                    onChange={e => setSelService(e.target.value)}
                  >
                    <option value="">Seleziona un servizio</option>
                    {SERVIZI.map(s => (
                      <option key={s.nome} value={s.nome}>{s.nome} — {s.prezzo}</option>
                    ))}
                  </select>

                  <label className="sal-label">Data preferita</label>
                  <select
                    className="sal-select"
                    value={selData}
                    onChange={e => setSelData(e.target.value)}
                  >
                    <option value="">Seleziona una data</option>
                    <option>Lun 23 Giugno — ore 10:00</option>
                    <option>Lun 23 Giugno — ore 14:30</option>
                    <option>Mar 24 Giugno — ore 11:00</option>
                    <option>Mer 25 Giugno — ore 09:30</option>
                    <option>Gio 26 Giugno — ore 16:00</option>
                    <option>Ven 27 Giugno — ore 15:00</option>
                  </select>
                </div>
                <button
                  className="sal-modal-confirm"
                  disabled={!selService || !selData}
                  onClick={handleBook}
                >
                  Conferma prenotazione →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </SimWrapper>
  );
};

export default SaloneSim;
