import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './FotografoSim.css';

const GALLERY = [
  { id: 1, label: 'WEDDING',   hint: 'wedding · cerimonia / sposi' },
  { id: 2, label: 'PORTRAIT',  hint: 'ritratto · donna / luce naturale' },
  { id: 3, label: 'EDITORIAL', hint: 'editorial · fashion / studio' },
  { id: 4, label: 'WEDDING',   hint: 'wedding · dettaglio / floreale' },
  { id: 5, label: 'PORTRAIT',  hint: 'ritratto · uomo / bianco nero' },
  { id: 6, label: 'EDITORIAL', hint: 'editorial · campagna / outdoor' },
  { id: 7, label: 'WEDDING',   hint: 'wedding · ricevimento / luce' },
  { id: 8, label: 'PORTRAIT',  hint: 'ritratto / close-up' },
];

const CATS = ['TUTTI', 'WEDDING', 'PORTRAIT', 'EDITORIAL'];

const FotografoSim = () => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [catFilter,    setCatFilter]    = useState('TUTTI');
  const [contactSent,  setContactSent]  = useState(false);

  const filtered = catFilter === 'TUTTI' ? GALLERY : GALLERY.filter(g => g.label === catFilter);

  const handleContact = () => {
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <SimWrapper templateId="fotografo" templateTitle="Fotografo" accentColor="#C8968A">
      <div className="fot-site">

        {/* ── LABEL STRIP ── */}
        <div className="fot-label-strip">
          <span>FERRARI STUDIO — PORTFOLIO 2026</span>
          <span>WEDDING · PORTRAIT · EDITORIAL</span>
        </div>

        {/* ── NAV ── */}
        <nav className="fot-nav">
          <div className="fot-nav-logo"><em>Luca Ferrari</em></div>
          <div className="fot-nav-links">
            <a className="fot-nav-link">Portfolio</a>
            <a className="fot-nav-link">About</a>
            <a className="fot-nav-link">Prints</a>
            <a className="fot-nav-link">Contatti</a>
          </div>
          <div className="fot-nav-social">
            <span>IG</span>
            <span>BE</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="fot-hero">
          <div className="fot-hero-photo sim-photo-slot">
            <img src="" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · ritratto / fashion editorial</span>
            <div className="fot-hero-photo-banner">
              <span className="fot-hero-photo-word">LIGHT.</span>
              <span className="fot-hero-photo-sub">L'ambiente, la luce — tutto nella stessa posa.</span>
            </div>
          </div>
          <div className="fot-hero-right">
            <div className="fot-hero-side-text">FERRARI STUDIO</div>
            <div className="fot-hero-main">
              <div className="fot-hero-issue">
                <div className="fot-hero-num">01</div>
                <div className="fot-hero-issue-meta">
                  <p>THE BOOK</p>
                  <p>Racconto per immagini</p>
                  <p>—</p>
                  <p>DAL <strong>2012</strong></p>
                </div>
              </div>
              <div className="fot-hero-text">
                <h1 className="fot-hero-h1">
                  OGNI<br />
                  LUCE<br />
                  <em>dice.</em>
                </h1>
                <div className="fot-hero-rule" />
                <p className="fot-hero-sub">Fotografia di matrimonio, ritratto e editorial. Estetica essenziale, momenti reali.</p>
              </div>
              <div className="fot-hero-bottom">
                <div className="fot-hero-spec">
                  <span>Specializzazioni</span>
                  WEDDING · PORTRAIT · EDITORIAL
                </div>
                <div className="fot-hero-location">Milano<br />Roma<br />+39 02 9876543</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO STRIP ── */}
        <div className="fot-port-strip">
          <span className="fot-port-title">IL PORTFOLIO</span>
          <div className="fot-port-cats">
            {CATS.map(cat => (
              <button
                key={cat}
                className={`fot-cat${catFilter === cat ? ' fot-cat--active' : ''}`}
                onClick={() => setCatFilter(cat)}
              >{cat}</button>
            ))}
          </div>
          <span className="fot-port-count">{filtered.length.toString().padStart(2, '0')} lavori</span>
        </div>

        {/* ── GALLERY ── */}
        <section className="fot-gallery">
          <div className="fot-gallery-side">PORTFOLIO</div>
          <div className="fot-gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`fot-thumb${i === 0 ? ' fot-thumb--tall' : ''}${i === 3 ? ' fot-thumb--wide' : ''} sim-photo-slot`}
                onClick={() => setLightboxItem(item)}
              >
                <img src="" alt={item.label} className="sim-photo-img" />
                <span className="sim-photo-hint">{item.hint}</span>
                {i % 3 === 0 && <div className="fot-pink-accent" />}
                <div className="fot-thumb-overlay">
                  <span className="fot-thumb-label">{item.label}</span>
                  <span className="fot-thumb-num">0{item.id}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BARON SPREAD — big letter + photo ── */}
        <section className="fot-baron">
          <div className="fot-baron-letter" aria-hidden="true" />
          <div className="fot-baron-photo sim-photo-slot">
            <img src="" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">editorial · fashion / studio shoot</span>
            <div className="fot-baron-caption">
              <span className="fot-baron-caption-eyebrow">FERRARI STUDIO · EDITORIAL</span>
              <span className="fot-baron-caption-issue">ISSUE 03 / 2026</span>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="fot-about">
          <div className="fot-about-inner">
            <div className="fot-about-left">
              <p className="fot-eyebrow">IL FOTOGRAFO</p>
              <h2 className="fot-about-h2">Luca<br /><em>Ferrari</em></h2>
              <p className="fot-about-body">
                Fotografo professionista con oltre dodici anni di esperienza nel racconto per immagini.
                Specializzato in wedding, ritrattistica e editorial per riviste internazionali.
              </p>
              <p className="fot-about-body">
                Il mio approccio: luce naturale, momenti autentici, estetica essenziale.
                Ogni progetto è una collaborazione, non una commissione.
              </p>
              <div className="fot-about-stats">
                <div className="fot-stat"><strong>340+</strong><span>matrimoni</span></div>
                <div className="fot-stat"><strong>12</strong><span>anni</span></div>
                <div className="fot-stat"><strong>18</strong><span>paesi</span></div>
              </div>
            </div>
            <div className="fot-about-photo-col">
              <div className="fot-about-photo sim-photo-slot">
                <img src="" alt="" className="sim-photo-img" />
                <span className="sim-photo-hint">fotografo · ritratto about</span>
                <span className="fot-about-tag">MASTER</span>
              </div>
              <div className="fot-about-pink-block" />
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <div className="fot-quote-strip">
          <span className="fot-quote-mark" aria-hidden="true">"</span>
          <p className="fot-quote-text">La fotografia è il silenzio<br /><em>che parla.</em></p>
          <span className="fot-quote-source">— LUCA FERRARI, MASTER PHOTOGRAPHER</span>
        </div>

        {/* ── CONTACT ── */}
        <section className="fot-contact">
          <div className="fot-contact-left">
            <p className="fot-eyebrow fot-eyebrow--light">LAVORIAMO INSIEME</p>
            <h2 className="fot-contact-h2">Hai un<br /><em>progetto?</em></h2>
            <p className="fot-contact-sub">Racconta la tua storia. Rispondo entro 24 ore.</p>
            {contactSent ? (
              <div className="fot-contact-sent">Messaggio inviato — ti rispondo presto.</div>
            ) : (
              <div className="fot-contact-form">
                <input className="fot-contact-input" type="email" placeholder="la tua email" />
                <button className="fot-contact-btn" onClick={handleContact}>Scrivimi →</button>
              </div>
            )}
          </div>
          <div className="fot-contact-right">
            <div className="fot-contact-info">
              <div className="fot-contact-info-item">
                <div className="fot-contact-info-label">Studio</div>
                <div className="fot-contact-info-value">Via Brera 28, Milano</div>
              </div>
              <div className="fot-contact-info-item">
                <div className="fot-contact-info-label">Email</div>
                <div className="fot-contact-info-value">luca@lucaferrari.it</div>
              </div>
              <div className="fot-contact-info-item">
                <div className="fot-contact-info-label">Telefono</div>
                <div className="fot-contact-info-value">+39 02 9876543</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="fot-footer">
          <div className="fot-footer-logo"><em>Luca Ferrari</em></div>
          <div className="fot-footer-center">© 2026 Ferrari Studio · Milano<br />P.IVA 01234567890</div>
          <div className="fot-footer-social">
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
          <div className="fot-lightbox-img sim-photo-slot" onClick={e => e.stopPropagation()}>
            <img src="" alt={lightboxItem.label} className="sim-photo-img" />
            <span className="sim-photo-hint">{lightboxItem.hint}</span>
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
