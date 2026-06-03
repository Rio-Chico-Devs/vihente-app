import { useState, useCallback } from 'react';
import SimWrapper from './SimWrapper';
import './BarbiereSim.css';

const SERVIZI = [
  { nome: 'Taglio Uomo',       desc: 'Taglio personalizzato, lavaggio, asciugatura e finishing professionale.', prezzo: 'Da € 28 · 40 min', slot: 'Taglio Uomo — € 28 · 40 min',               src: '/images/barbiere-svc-taglio-uomo.webp' },
  { nome: 'Barba Tradizionale', desc: 'Rasatura con rasoio a mano libera, asciugamano caldo e oli essenziali.',  prezzo: 'Da € 22 · 30 min', slot: 'Barba Tradizionale — € 22 · 30 min',      src: '/images/barbiere-svc-barba-tradizionale.webp' },
  { nome: 'Taglio + Barba',     desc: 'Il pacchetto completo: taglio su misura e rifinitura barba professionale.', prezzo: 'Da € 45 · 65 min', slot: 'Taglio + Barba — € 45 · 65 min',      src: '/images/barbiere-svc-taglio-barba.webp' },
  { nome: 'Trattamento Cuoio',  desc: 'Maschera nutriente, massaggio capillare e trattamento anti-caduta.',     prezzo: 'Da € 38 · 50 min', slot: 'Trattamento Cuoio — € 38 · 50 min',      src: '/images/barbiere-svc-trattamento-cuoio.webp' },
];

const TEAM = [
  { nome: 'Marco Neri',    ruolo: 'Master Barber',    tag: 'Fondatore',       spec: 'Specializzato in tagli classici e rasatura tradizionale. 16 anni di esperienza.', photoHint: 'ritratto · master barber / uomo',  photo: '/images/barbiere-team-marco.webp' },
  { nome: 'Luca Ferretti', ruolo: 'Senior Barber',    tag: 'Fade Specialist', spec: 'Esperto di fade, skin fade e tagli moderni. Appassionato di freestyle cutting.',   photoHint: 'ritratto · barber giovane / uomo', photo: '/images/barbiere-team-luca.webp' },
  { nome: 'Andrea Russo',  ruolo: 'Barber & Stylist', tag: 'Beard Expert',    spec: 'Specialista in trattamenti barba, design e colorazione. Formazione Londra.',       photoHint: 'ritratto · barber / uomo scuro',   photo: '/images/barbiere-team-andrea.webp' },
];

const DATE_OPTIONS = ['Lun 23 Giugno', 'Mar 24 Giugno', 'Mer 25 Giugno', 'Gio 26 Giugno', 'Ven 27 Giugno', 'Sab 28 Giugno'];
const ORA_OPTIONS  = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '16:00', '17:00'];

const TICKER_ITEMS = [
  'Taglio uomo', 'Barba tradizionale', 'Rasatura con rasoio', 'Trattamenti capelli',
  'Colorazione', 'Skin fade', 'Beard design', 'Hot towel shave', 'Milano · Brera · Dal 2008',
];

const BarbiereSim = () => {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [selService, setSelService] = useState('');
  const [selBarber,  setSelBarber]  = useState('');
  const [selData,    setSelData]    = useState('');
  const [selOra,     setSelOra]     = useState('');
  const [booked,     setBooked]     = useState(false);

  const isReady = selService && selBarber && selData && selOra;

  const openModal = useCallback((serviceName = '') => {
    if (serviceName) setSelService(serviceName);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      setBooked(false);
      setSelService('');
      setSelBarber('');
      setSelData('');
      setSelOra('');
    }, 300);
  }, []);

  const handleBook = () => {
    if (!isReady) return;
    setBooked(true);
    setTimeout(closeModal, 2800);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <SimWrapper templateId="barbiere" templateTitle="Barbiere" accentColor="#F2C11E">
      <div className="bar-site">

        {/* ── LABEL STRIP ── */}
        <div className="bar-label-strip">
          <span>BLADE BARBERSHOP — TEMPLATE PREVIEW · VIHENTE STUDIO</span>
          <span>STILE EDITORIALE / MAGAZINE</span>
        </div>

        {/* ── NAV ── */}
        <nav className="bar-nav">
          <div className="bar-nav-logo">BL<span>A</span>DE</div>
          <div className="bar-nav-links">
            <a className="bar-nav-link">Servizi</a>
            <a className="bar-nav-link">Il Nostro Lavoro</a>
            <a className="bar-nav-link">Il Team</a>
            <a className="bar-nav-link">Contatti</a>
          </div>
          <button className="bar-nav-book" onClick={() => openModal()}>Prenota ora</button>
        </nav>

        {/* ── HERO ── */}
        <section className="bar-hero">
          <div className="bar-hero-left">
            <div className="bar-hero-issue">
              <div className="bar-hero-num">01</div>
              <div className="bar-hero-meta">
                <p>THE ISSUE</p>
                <p>L'arte del taglio perfetto</p>
                <p>—</p>
                <p>DAL <strong>2008</strong></p>
                <p>MILANO · BRERA</p>
              </div>
            </div>
            <div className="bar-hero-main">
              <h1 className="bar-hero-h1">NON<br />SOLO UN<br /><span className="bar-hero-accent">TAGLIO.</span></h1>
              <div className="bar-hero-rule" />
              <p className="bar-hero-sub">Ogni visita è un rituale. Ogni dettaglio racconta chi sei.</p>
            </div>
            <div className="bar-hero-bottom">
              <div className="bar-hero-name">
                <span>Master Barber</span>
                MARCO NERI
              </div>
              <div className="bar-hero-address">VIA BRERA 14<br />MILANO<br />+39 02 1234567</div>
            </div>
          </div>
          <div className="bar-hero-right sim-photo-slot">
            <img src="/images/barbiere-hero.webp" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · ritratto uomo / barbiere</span>
          </div>
        </section>

        {/* ── BANNER ── */}
        <div className="bar-banner">
          <div className="bar-ticker">
            <div className="bar-ticker-row">
              <div className="bar-ticker-inner">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span key={i} className="bar-ticker-item">{item}<span className="bar-ticker-sep">✦</span></span>
                ))}
              </div>
            </div>
          </div>
          <div className="bar-banner-info">
            <div className="bar-info-cell">
              <div className="bar-info-icon">09</div>
              <div className="bar-info-text">
                <div className="bar-info-label">Orari di apertura</div>
                <div className="bar-info-value">Lun – Sab · 09:00 – 20:00</div>
              </div>
            </div>
            <div className="bar-info-cell">
              <div className="bar-info-icon">14</div>
              <div className="bar-info-text">
                <div className="bar-info-label">Dove siamo</div>
                <div className="bar-info-value">Via Brera 14, Milano</div>
              </div>
            </div>
            <div className="bar-info-cell bar-info-cell--cta" onClick={() => openModal()}>
              <div className="bar-info-icon">↗</div>
              <div className="bar-info-text">
                <div className="bar-info-label">Prenota ora</div>
                <div className="bar-info-value bar-info-value--yellow">Slot disponibili oggi →</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="bar-services">
          <div className="bar-services-header">
            <h2 className="bar-services-title">I NOSTRI<br />SERVIZI</h2>
            <span className="bar-services-count">04 categorie disponibili</span>
          </div>
          <div className="bar-services-grid">
            {SERVIZI.map((svc, i) => (
              <div key={i} className="bar-svc-card sim-photo-slot">
                <img src={svc.src} alt="" loading="lazy" decoding="async" className="sim-photo-img" />
                <span className="sim-photo-hint">{`servizio · ${svc.nome.toLowerCase()}`}</span>
                <div className="bar-svc-overlay" />
                <div className="bar-svc-num">0{i + 1}</div>
                <div className="bar-svc-body">
                  <div className="bar-svc-name">{svc.nome}</div>
                  <div className="bar-svc-desc">{svc.desc}</div>
                  <div className="bar-svc-price">{svc.prezzo}</div>
                </div>
                <button className="bar-svc-book" onClick={() => openModal(svc.slot)}>Prenota</button>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="bar-stats">
          <div className="bar-stat"><div className="bar-stat-num">16+</div><div className="bar-stat-label">Anni di attività</div></div>
          <div className="bar-stat"><div className="bar-stat-num">4.8K</div><div className="bar-stat-label">Clienti fidelizzati</div></div>
          <div className="bar-stat"><div className="bar-stat-num">3</div><div className="bar-stat-label">Master Barber nel team</div></div>
          <div className="bar-stat"><div className="bar-stat-num">98%</div><div className="bar-stat-label">Clienti soddisfatti</div></div>
        </div>

        {/* ── SPREAD ── */}
        <section className="bar-spread">
          <div className="bar-spread-photo sim-photo-slot">
            <img src="/images/barbiere-interni.webp" alt="" loading="lazy" decoding="async" className="sim-photo-img" />
            <span className="sim-photo-hint">interni · barbershop interior</span>
            <div className="bar-spread-banner">
              <div className="bar-spread-word">CUT.</div>
              <div className="bar-spread-tagline">L'ambiente, gli strumenti, la cura — tutto pensato per te.</div>
            </div>
          </div>
          <div className="bar-spread-content">
            <div className="bar-section-meta">
              <div className="bar-meta-line" />
              <span className="bar-eyebrow">La nostra filosofia</span>
            </div>
            <div className="bar-spread-bignum">02</div>
            <h2 className="bar-spread-h2">L'ARTE<br />CHE NON<br />SEGUE<br /><em>le mode.</em></h2>
            <p className="bar-spread-body">Blade nasce da una passione per il mestiere del barbiere nel senso più classico del termine. Strumenti affilati, mani esperte, prodotti selezionati. Ogni cliente entra con una richiesta e ne esce con un'identità. Non seguiamo le tendenze — le osserviamo, le interpretiamo e le adattiamo.</p>
            <div className="bar-spread-sig">MARCO NERI — MASTER BARBER &amp; FONDATORE</div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="bar-gallery">
          <div className="bar-gallery-header">
            <h2 className="bar-gallery-title">IL NOSTRO<br />LAVORO</h2>
            <span className="bar-gallery-viewall bar-eyebrow">Vedi tutta la galleria</span>
          </div>
          <div className="bar-gallery-grid">
            {[
              { label: 'FEATURED', hint: 'gallery · ritratto capelli uomo', src: '/images/barbiere-gallery-featured.webp' },
              { label: 'FADE',     hint: 'gallery · fade / barbiere',        src: '/images/barbiere-gallery-fade.webp' },
              { label: 'BEARD',    hint: 'gallery · barba / design',         src: '/images/barbiere-gallery-beard.webp' },
              { label: 'CLASSIC',  hint: 'gallery · taglio classico / uomo', src: '/images/barbiere-gallery-classic.webp' },
              { label: 'TEXTURE',  hint: 'gallery · texture / hairstyle uomo', src: '/images/barbiere-gallery-texture.webp' },
            ].map((item, i) => (
              <div key={i} className="bar-gal-item sim-photo-slot">
                <img src={item.src} alt="" loading="lazy" decoding="async" className="sim-photo-img" />
                <span className="sim-photo-hint">{item.hint}</span>
                <div className="bar-gal-label">{item.label}</div>
                <div className="bar-gal-num">0{i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="bar-team">
          <div className="bar-team-header">
            <h2 className="bar-team-title">IL TEAM</h2>
            <span className="bar-eyebrow bar-eyebrow--mid">3 Master Barber</span>
          </div>
          <div className="bar-team-grid">
            {TEAM.map((member, i) => (
              <div key={i} className="bar-team-card">
                <div className="bar-team-photo sim-photo-slot">
                  <img src={member.photo} alt="" loading="lazy" decoding="async" className="sim-photo-img" />
                  <span className="sim-photo-hint">{member.photoHint}</span>
                  <span className="bar-team-tag">{member.tag}</span>
                </div>
                <div className="bar-team-info">
                  <div className="bar-team-role">{member.ruolo}</div>
                  <div className="bar-team-name">{member.nome}</div>
                  <div className="bar-team-spec">{member.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOOKING STRIP ── */}
        <section className="bar-booking-strip">
          <div className="bar-booking-text">
            <div className="bar-section-meta bar-section-meta--light">
              <div className="bar-meta-line bar-meta-line--dim" />
              <span className="bar-eyebrow bar-eyebrow--dim">Prenota il tuo posto</span>
            </div>
            <h2 className="bar-booking-h2">SCEGLI<br />IL TUO<br /><span>MOMENTO.</span></h2>
            <p className="bar-booking-sub">Niente attese, niente sorprese. Prenota online in meno di un minuto e scegli il barber che preferisci.</p>
          </div>
          <div className="bar-booking-right">
            <div className="bar-booking-time">Disponibile oggi<br />3 slot liberi</div>
            <button className="bar-booking-btn" onClick={() => openModal()}>Prenota ora</button>
          </div>
        </section>

        {/* ── INFO ROW ── */}
        <div className="bar-info-row">
          <div className="bar-inforow-cell">
            <div className="bar-inforow-label">Orari</div>
            <div className="bar-inforow-value">Lun – Sab<br />09:00 – 20:00</div>
          </div>
          <div className="bar-inforow-cell">
            <div className="bar-inforow-label">Dove siamo</div>
            <div className="bar-inforow-value">Via Brera 14<br />Milano, 20121</div>
          </div>
          <div className="bar-inforow-cell">
            <div className="bar-inforow-label">Contatti</div>
            <div className="bar-inforow-value">+39 02 1234567<br />info@blade.it</div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="bar-footer">
          <div className="bar-footer-logo">BL<span>A</span>DE</div>
          <div className="bar-footer-center">© 2026 Blade Barbershop S.r.l.<br />P.IVA 01234567890 · Milano</div>
          <div className="bar-footer-socials">
            <a className="bar-footer-social">Instagram</a>
            <a className="bar-footer-social">Facebook</a>
            <a className="bar-footer-social">Google</a>
          </div>
        </footer>

        {/* ── BOOKING MODAL ── */}
        <div
          className={`bar-modal-overlay${modalOpen ? ' open' : ''}`}
          onClick={handleOverlayClick}
        >
          <div className="bar-modal" onClick={e => e.stopPropagation()}>
            {!booked ? (
              <>
                <div className="bar-modal-header">
                  <span className="bar-modal-title">Prenota</span>
                  <button className="bar-modal-close" onClick={closeModal}>✕ chiudi</button>
                </div>
                <div className="bar-modal-body">
                  <div className="bar-modal-field">
                    <label className="bar-modal-label">Servizio</label>
                    <select className="bar-modal-select" value={selService} onChange={e => setSelService(e.target.value)}>
                      <option value="">Seleziona un servizio</option>
                      {SERVIZI.map(s => <option key={s.slot} value={s.slot}>{s.slot}</option>)}
                    </select>
                  </div>
                  <div className="bar-modal-field">
                    <label className="bar-modal-label">Barber</label>
                    <select className="bar-modal-select" value={selBarber} onChange={e => setSelBarber(e.target.value)}>
                      <option value="">Scegli il barber</option>
                      <option>Marco Neri — Master Barber</option>
                      <option>Luca Ferretti — Fade Specialist</option>
                      <option>Andrea Russo — Beard Expert</option>
                    </select>
                  </div>
                  <div className="bar-modal-row">
                    <div className="bar-modal-field">
                      <label className="bar-modal-label">Data</label>
                      <select className="bar-modal-select" value={selData} onChange={e => setSelData(e.target.value)}>
                        <option value="">Seleziona</option>
                        {DATE_OPTIONS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="bar-modal-field">
                      <label className="bar-modal-label">Orario</label>
                      <select className="bar-modal-select" value={selOra} onChange={e => setSelOra(e.target.value)}>
                        <option value="">Seleziona</option>
                        {ORA_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    className="bar-modal-confirm"
                    disabled={!isReady}
                    onClick={handleBook}
                  >
                    Conferma prenotazione
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bar-modal-header">
                  <span className="bar-modal-title">Confermato</span>
                  <button className="bar-modal-close" onClick={closeModal}>✕ chiudi</button>
                </div>
                <div className="bar-modal-success">
                  <div className="bar-modal-success-icon">✓</div>
                  <div className="bar-modal-success-title">Appuntamento<br />confermato!</div>
                  <div className="bar-modal-success-sub">Riceverai una conferma via SMS. A presto da Blade.</div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </SimWrapper>
  );
};

export default BarbiereSim;
