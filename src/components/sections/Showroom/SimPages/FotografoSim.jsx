import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './FotografoSim.css';

const STORIES = [
  {
    id: 1, vol: '01', label: 'WEDDING',
    hint: 'wedding · cerimonia / coppia',
    tags: 'Cerimonia · Dettaglio · Ritratto',
    type: 'landscape',
    title: 'Wedding Photography',
  },
  {
    id: 2, vol: '02', label: 'RITRATTO',
    hint: 'ritratto · donna / luce naturale',
    tags: 'Studio · Location · Reportage',
    type: 'portrait',
    title: 'Ritratto & Luce',
  },
  {
    id: 3, vol: '02b', label: 'EDITORIAL',
    hint: 'editorial · fashion / studio',
    type: 'portrait',
  },
  {
    id: 4, vol: '02c', label: 'RITRATTO',
    hint: 'ritratto · uomo / bianco nero',
    type: 'portrait',
  },
  {
    id: 5, vol: '03', label: 'EDITORIAL',
    hint: 'editorial · campagna / outdoor — sinistra',
    type: 'split-left',
    tags: 'Studio · Campagna · Cover',
    title: 'Editorial & Fashion',
  },
  {
    id: 6, vol: '03b', label: 'RITRATTO',
    hint: 'ritratto · close-up — destra',
    type: 'split-right',
  },
];

const CATS = ['TUTTI', 'WEDDING', 'RITRATTO', 'EDITORIAL'];

const FotografoSim = () => {
  const [catFilter,   setCatFilter]   = useState('TUTTI');
  const [contactSent, setContactSent] = useState(false);

  const handleContact = () => {
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <SimWrapper templateId="fotografo" templateTitle="Fotografo" accentColor="#C4A882">
      <div className="fot-site">

        {/* ── NAV ── */}
        <nav className="fot-nav">
          <div className="fot-nav-left">
            <a className="fot-nav-link">Portfolio</a>
            <a className="fot-nav-link">Servizi</a>
            <a className="fot-nav-link">About</a>
          </div>
          <a className="fot-nav-logo">Bruno Vizienti</a>
          <div className="fot-nav-right">
            <a className="fot-nav-link">IG</a>
            <a className="fot-nav-link">BE</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="fot-hero">
          <div className="fot-hero-photo sim-photo-slot">
            <img src="/images/fotografo-hero.webp" alt="" className="sim-photo-img fot-bw" />
            <span className="sim-photo-hint">hero · ritratto / fashion editorial</span>
          </div>
          <div className="fot-hero-text">
            <div className="fot-hero-text-top">
              <span className="fot-label">Vizienti Studio · Est. 2012</span>
            </div>
            <div className="fot-hero-name">
              <span className="fot-hero-first">Bruno</span>
              <span className="fot-hero-last">Vizienti</span>
              <span className="fot-hero-rule" />
              <p className="fot-hero-sub">Fotografia di matrimonio, ritratto e editorial.</p>
            </div>
            <div className="fot-hero-text-bottom">
              <span className="fot-label">Milano · Roma · +39 02 9876543</span>
            </div>
          </div>
        </section>

        {/* ── FILTER STRIP ── */}
        <div className="fot-filter-strip">
          <span className="fot-label">Portfolio</span>
          <div className="fot-filter-tabs">
            {CATS.map((cat, i) => (
              <>
                {i > 0 && <span key={`sep-${cat}`} className="fot-filter-sep">·</span>}
                <button
                  key={cat}
                  className={`fot-filter-tab${catFilter === cat ? ' fot-filter-tab--active' : ''}`}
                  onClick={() => setCatFilter(cat)}
                >{cat}</button>
              </>
            ))}
          </div>
          <span className="fot-filter-count">08 Lavori</span>
        </div>

        {/* ── GALLERY STORY 1 — full-width landscape ── */}
        <section className="fot-story1">
          <div className="fot-story1-photo sim-photo-slot">
            <img src="/images/fotografo-wedding-cerimonia.webp" alt="Wedding ceremony" className="sim-photo-img fot-bw" />
            <span className="sim-photo-hint">wedding · cerimonia / coppia</span>
          </div>
          <div className="fot-story1-caption">
            <span className="fot-caption-vol">Vol. 01</span>
            <span className="fot-caption-title">Wedding Photography</span>
            <span className="fot-caption-tags">Cerimonia · Dettaglio · Ritratto</span>
          </div>
        </section>

        {/* ── GALLERY STORY 2 — 3 col portrait ── */}
        <section className="fot-story2">
          <div className="fot-story2-grid">
            <div className="fot-story2-item">
              <div className="fot-story2-photo sim-photo-slot">
                <img src="/images/fotografo-wedding-sposa.webp" alt="Ritratto sposa" className="sim-photo-img fot-bw" />
                <span className="sim-photo-hint">wedding · ritratto / sposa</span>
              </div>
              <div className="fot-story2-caption"><strong>Ritratto</strong> / Bridal portrait, Milano 2025</div>
            </div>
            <div className="fot-story2-item">
              <div className="fot-story2-photo sim-photo-slot">
                <img src="/images/fotografo-editorial-studio.webp" alt="Fashion studio" className="sim-photo-img fot-bw" />
                <span className="sim-photo-hint">editorial · fashion / studio</span>
              </div>
              <div className="fot-story2-caption"><strong>Editorial</strong> / Studio session, Roma 2025</div>
            </div>
            <div className="fot-story2-item">
              <div className="fot-story2-photo sim-photo-slot">
                <img src="/images/fotografo-editorial-campagna.webp" alt="Editorial portrait" className="sim-photo-img fot-bw" />
                <span className="sim-photo-hint">editorial · campagna / outdoor</span>
              </div>
              <div className="fot-story2-caption"><strong>Editorial</strong> / Cover shoot, Venezia 2024</div>
            </div>
          </div>
        </section>

        {/* ── GALLERY STORY 3 — split 58/42 ── */}
        <section className="fot-story3">
          <div className="fot-story3-left sim-photo-slot">
            <img src="/images/fotografo-ritratto-luce.webp" alt="Photography light" className="sim-photo-img fot-bw" />
            <span className="sim-photo-hint">editorial · luce / campagna</span>
          </div>
          <div className="fot-story3-right sim-photo-slot">
            <img src="/images/fotografo-ritratto-closeup.webp" alt="Portrait close-up" className="sim-photo-img fot-bw" />
            <span className="sim-photo-hint">ritratto · close-up / luce naturale</span>
          </div>
        </section>
        <div className="fot-story3-caption">
          <span className="fot-caption-vol">Vol. 02</span>
          <span className="fot-caption-title">Ritratto &amp; Luce</span>
          <span className="fot-caption-tags">Studio · Location · Reportage</span>
        </div>

        {/* ── FEATURE SPREAD ── */}
        <section className="fot-feature">
          <div className="fot-feature-text">
            <span className="fot-label">Il Fotografo</span>
            <div className="fot-feature-name">
              <span className="fot-feature-first">Bruno</span>
              <span className="fot-feature-last">Vizienti</span>
            </div>
            <p className="fot-feature-body">
              Con oltre dodici anni di esperienza nell'arte della fotografia, Bruno Vizienti ha costruito
              un linguaggio visivo capace di fermare il tempo senza soffocare l'emozione.
              Ogni scatto è un dialogo tra luce e silenzio.
            </p>
            <p className="fot-feature-body">
              Basato tra Milano e Roma, lavora con coppie, brand editoriali e riviste internazionali.
              Il suo approccio è sempre lo stesso: sottrazione, non aggiunta.
            </p>
            <div className="fot-feature-stats">
              <div className="fot-stat">
                <span className="fot-stat-num">340+</span>
                <span className="fot-stat-lbl">Matrimoni</span>
              </div>
              <span className="fot-stat-sep">·</span>
              <div className="fot-stat">
                <span className="fot-stat-num">12</span>
                <span className="fot-stat-lbl">Anni</span>
              </div>
              <span className="fot-stat-sep">·</span>
              <div className="fot-stat">
                <span className="fot-stat-num">18</span>
                <span className="fot-stat-lbl">Paesi</span>
              </div>
            </div>
          </div>
          <div className="fot-feature-photo sim-photo-slot">
            <img src="/images/fotografo-ritratto-studio.webp" alt="Ritratto del fotografo" className="sim-photo-img fot-bw" />
            <span className="sim-photo-hint">fotografo · ritratto / studio</span>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="fot-quote">
          <p className="fot-quote-text">
            La fotografia è il silenzio<br />
            <em className="fot-quote-accent">che parla.</em>
          </p>
          <span className="fot-quote-rule" />
          <span className="fot-quote-attr">— Bruno Vizienti</span>
        </section>

        {/* ── CONTACT ── */}
        <section className="fot-contact">
          <div className="fot-contact-left">
            <span className="fot-label">Contatti</span>
            <h2 className="fot-contact-h2">Hai un<br /><em>progetto?</em></h2>
            <p className="fot-contact-sub">Raccontami la tua storia. Rispondo entro 24 ore per pianificare insieme la vostra giornata speciale.</p>
            {contactSent ? (
              <div className="fot-contact-sent">Messaggio inviato — ti rispondo presto.</div>
            ) : (
              <div className="fot-contact-form">
                <input className="fot-contact-input" type="email" placeholder="La tua email" />
                <button className="fot-contact-btn" onClick={handleContact}>Scrivimi</button>
              </div>
            )}
          </div>
          <div className="fot-contact-right">
            <div className="fot-contact-info">
              <div className="fot-contact-item">
                <span className="fot-label">Studio</span>
                <span className="fot-contact-val">Via Brera 12, Milano</span>
              </div>
              <div className="fot-contact-item">
                <span className="fot-label">Email</span>
                <span className="fot-contact-val">bruno@vizienti.it</span>
              </div>
              <div className="fot-contact-item">
                <span className="fot-label">Telefono</span>
                <span className="fot-contact-val">+39 02 9876543</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="fot-footer">
          <span className="fot-footer-logo">Bruno Vizienti</span>
          <span className="fot-footer-copy">© 2026 Vizienti Studio · Milano</span>
          <div className="fot-footer-links">
            <a className="fot-footer-link">Instagram</a>
            <a className="fot-footer-link">Behance</a>
            <a className="fot-footer-link">Vimeo</a>
          </div>
        </footer>

      </div>
    </SimWrapper>
  );
};

export default FotografoSim;
