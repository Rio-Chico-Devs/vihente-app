import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './FotografoSim.css';

const GALLERY = [
  { id: 1, label: 'WEDDING', gradient: 'linear-gradient(145deg, #2A2118, #1A1512)', accent: '#E8D5B7' },
  { id: 2, label: 'PORTRAIT', gradient: 'linear-gradient(160deg, #1E1B14, #141210)', accent: '#D4C4A4' },
  { id: 3, label: 'EDITORIAL', gradient: 'linear-gradient(135deg, #16130E, #0E0C0A)', accent: '#C8B898' },
  { id: 4, label: 'WEDDING', gradient: 'linear-gradient(150deg, #241E16, #180F0A)', accent: '#DCC8A8' },
  { id: 5, label: 'PORTRAIT', gradient: 'linear-gradient(140deg, #1C1914, #120F0C)', accent: '#C4B49A' },
  { id: 6, label: 'EDITORIAL', gradient: 'linear-gradient(165deg, #221D14, #1A1410)', accent: '#E0CEAE' },
];

const CATEGORIE_G = ['TUTTI', 'WEDDING', 'PORTRAIT', 'EDITORIAL'];

const FotografoSim = () => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [catFilter, setCatFilter] = useState('TUTTI');
  const [contactSent, setContactSent] = useState(false);

  const filtered = catFilter === 'TUTTI' ? GALLERY : GALLERY.filter(g => g.label === catFilter);

  const handleContact = () => {
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <SimWrapper templateId="fotografo" templateTitle="Fotografo" accentColor="#E8D5B7">
      <div className="fot-site">

        {/* ── NAV ── */}
        <nav className="fot-nav">
          <div className="fot-nav-logo">LUCA FERRARI</div>
          <div className="fot-nav-links">
            <a className="fot-nav-link">Gallery</a>
            <a className="fot-nav-link">About</a>
            <a className="fot-nav-link">Prints</a>
            <a className="fot-nav-link">Contact</a>
          </div>
          <div className="fot-nav-social">
            <span>IG</span>
            <span>BE</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="fot-hero">
          <div className="fot-hero-bg">
            <img src="" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · mood / fotografia</span>
          </div>
          <div className="fot-hero-content">
            <div className="fot-hero-inner">
              <p className="fot-hero-caption">WEDDING · PORTRAITS · EDITORIAL</p>
              <h1 className="fot-hero-h1">Ogni foto<br />racconta<br />una storia.</h1>
              <div className="fot-hero-rule" />
              <p className="fot-hero-desc">
                Milano · Roma · Disponibile per assignment internazionali.
              </p>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="fot-gallery-section">
          <div className="fot-gallery-inner">
            <div className="fot-gallery-header">
              <div className="fot-gallery-cats">
                {CATEGORIE_G.map(c => (
                  <button
                    key={c}
                    className={`fot-cat${catFilter === c ? ' fot-cat--active' : ''}`}
                    onClick={() => setCatFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="fot-gallery-grid">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  className={`fot-thumb fot-thumb--${i % 3 === 0 ? 'tall' : 'normal'}`}
                  style={{ background: item.gradient }}
                  onClick={() => setLightboxItem(item)}
                >
                  <img src="" alt={item.label} className="sim-photo-img" />
                  <span className="sim-photo-hint">{item.label}</span>
                  <div className="fot-thumb-overlay">
                    <span className="fot-thumb-label">{item.label}</span>
                    <span className="fot-thumb-expand">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="fot-about">
          <div className="fot-about-inner">
            <div className="fot-about-photo sim-photo-slot">
              <img src="" alt="" className="sim-photo-img" />
              <span className="sim-photo-hint">fotografo · ritratto about</span>
              <svg viewBox="0 0 100 130" width="72" height="94">
                <circle cx="50" cy="34" r="20" fill="#E8D5B7" opacity="0.35" />
                <path d="M8 130 Q8 78 50 78 Q92 78 92 130" fill="#E8D5B7" opacity="0.2" />
              </svg>
            </div>
            <div className="fot-about-content">
              <p className="fot-eyebrow">IL FOTOGRAFO</p>
              <h2 className="fot-about-title">Luca Ferrari</h2>
              <p className="fot-about-text">
                Fotografo professionista con oltre dodici anni di esperienza nel racconto per immagini.
                Specializatto in wedding, ritrattistica e editorial per riviste internazionali.
              </p>
              <p className="fot-about-text">
                Il mio approccio: luce naturale, momenti autentici, estetica minimalista.
                Ogni progetto è una collaborazione, non una commissione.
              </p>
              <div className="fot-about-stats">
                <div className="fot-stat">
                  <strong>340+</strong>
                  <span>matrimoni</span>
                </div>
                <div className="fot-stat">
                  <strong>12</strong>
                  <span>anni</span>
                </div>
                <div className="fot-stat">
                  <strong>18</strong>
                  <span>paesi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="fot-contact">
          <div className="fot-contact-inner">
            <p className="fot-eyebrow" style={{ color: 'rgba(232,213,183,0.5)' }}>LAVORIAMO INSIEME</p>
            <h2 className="fot-contact-title">Hai un progetto in mente?</h2>
            <p className="fot-contact-desc">
              Racconta la tua storia. Rispondo entro 24 ore.
            </p>
            {contactSent ? (
              <div className="fot-contact-sent">
                Messaggio inviato — ti rispondo presto.
              </div>
            ) : (
              <div className="fot-contact-row">
                <input className="fot-contact-input" type="email" placeholder="la tua email" />
                <button className="fot-contact-btn" onClick={handleContact}>
                  Scrivimi →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="fot-footer">
          <div className="fot-footer-logo">LUCA FERRARI</div>
          <p className="fot-footer-sub">luca@lucaferrari.it · Milano, Italia</p>
          <div className="fot-footer-links">
            <span>Instagram</span>
            <span>Behance</span>
            <span>Vimeo</span>
          </div>
        </footer>

      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxItem && (
        <div className="fot-lightbox" onClick={() => setLightboxItem(null)}>
          <button className="fot-lightbox-close" onClick={() => setLightboxItem(null)}>✕</button>
          <div
            className="fot-lightbox-img"
            style={{ background: lightboxItem.gradient }}
            onClick={e => e.stopPropagation()}
          >
            <div className="fot-lightbox-caption">
              <span className="fot-lightbox-label">{lightboxItem.label}</span>
              <span className="fot-lightbox-num">#{lightboxItem.id.toString().padStart(3, '0')}</span>
            </div>
          </div>
        </div>
      )}
    </SimWrapper>
  );
};

export default FotografoSim;
