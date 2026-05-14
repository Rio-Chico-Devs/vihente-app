import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuide } from '../../../contexts/GuideContext';

const SIM_ROUTES = {
  psicologo: '/showroom/psicologo',
  avvocati:  '/showroom/avvocati',
  campagna:  '/showroom/campagna',
  ecommerce: '/showroom/ecommerce',
  salone:    '/showroom/salone',
  fotografo: '/showroom/fotografo',
};
import './Showroom.css';

const templates = [
  {
    id: 'psicologo',
    sector: 'SALUTE MENTALE',
    title: 'Studio Psicologo',
    description: 'Struttura ottimizzata per la fiducia: hero empatico, specializzazioni, bio autentica e booking diretto.',
    tags: ['Empatico', 'Caldo', 'Professionale'],
    guide: 'Template per psicologi. Palette earth-tone, serif typography, booking integrato e struttura che costruisce fiducia passo per passo.',
  },
  {
    id: 'avvocati',
    sector: 'STUDIO LEGALE',
    title: 'Avvocati',
    description: 'Architettura di autorevolezza: aree di pratica, profili dei soci, case history di successo e contatto diretto.',
    tags: ['Autorevole', 'Preciso', 'Affidabile'],
    guide: 'Template per studi legali. Navy profondo + gold serif, layout editoriale, autorevolezza visiva immediata.',
  },
  {
    id: 'campagna',
    sector: 'COMUNICAZIONE',
    title: 'Campagna Politica',
    description: 'Landing ad alto impatto: missione, valori chiave, agenda eventi e call-to-action urgente per donazioni.',
    tags: ['Ispirante', 'Diretto', 'Urgente'],
    guide: 'Template per campagne politiche. Bold condensed typography, palette forte, CTA donation e volontariato ottimizzati per la conversione.',
  },
  {
    id: 'ecommerce',
    sector: 'VENDITA ONLINE',
    title: 'E-commerce',
    description: "Percorso d'acquisto senza friction: hero editoriale, grid prodotti, schede dettaglio e checkout fluido.",
    tags: ['Pulito', 'Convertente', 'Aspirazionale'],
    guide: 'Template e-commerce boutique. Design minimal che mette il prodotto al centro, conversione massimizzata.',
  },
  {
    id: 'salone',
    sector: 'BELLEZZA & CURA',
    title: 'Salone di Bellezza',
    description: 'Vetrina raffinata: servizi con dettaglio prezzi, team, galleria lavori e prenotazione online in primo piano.',
    tags: ['Elegante', 'Raffinato', 'Accogliente'],
    guide: 'Template per saloni di bellezza e spa. Palette cream-gold, eleganza visiva, booking call-to-action prominente.',
  },
  {
    id: 'fotografo',
    sector: 'PORTFOLIO VISIVO',
    title: 'Fotografo',
    description: 'Portfolio visivo puro: fullscreen hero, gallery masonry, approccio minimalista e contatto essenziale.',
    tags: ['Visuale', 'Minimale', 'Impatto'],
    guide: 'Template fotografo. Full-dark, gallery-first, tipografia minimal uppercase — la fotografia è protagonista assoluta.',
  },
];

/* ─── Mini Preview Components ─────────────────────────────────────────────── */

const PsicologoPreview = () => (
  <div className="sr-preview sr-psicologo">
    <nav className="sr-p-nav">
      <span className="sr-p-logo">Dr.ssa Mancini</span>
      <div className="sr-p-nav-links"><i /><i /><i /></div>
    </nav>
    <div className="sr-p-hero">
      <div className="sr-p-hero-text">
        <div className="sr-p-h1" />
        <div className="sr-p-h1 sr-p-h1--short" />
        <div className="sr-p-body" />
        <div className="sr-p-cta">Prenota una sessione</div>
      </div>
      <div className="sr-p-photo">
        <svg viewBox="0 0 50 70" width="34" height="48">
          <circle cx="25" cy="17" r="11" fill="#8FAF8A" opacity="0.55" />
          <path d="M4 70 Q4 42 25 42 Q46 42 46 70" fill="#8FAF8A" opacity="0.35" />
        </svg>
      </div>
    </div>
    <div className="sr-p-specs">
      <div className="sr-p-spec">Ansia</div>
      <div className="sr-p-spec">Relazioni</div>
      <div className="sr-p-spec">Trauma</div>
    </div>
  </div>
);

const AvvocatiPreview = () => (
  <div className="sr-preview sr-avvocati">
    <nav className="sr-a-nav">
      <span className="sr-a-logo">STUDIO LEGALE ROSSI</span>
      <div className="sr-a-nav-links"><i /><i /><i /></div>
    </nav>
    <div className="sr-a-hero">
      <div className="sr-a-divider" />
      <div className="sr-a-h1" />
      <div className="sr-a-h1 sr-a-h1--sub" />
      <div className="sr-a-divider" />
      <div className="sr-a-cta">Consulenza Gratuita</div>
    </div>
    <div className="sr-a-areas">
      <div className="sr-a-area">Civile</div>
      <div className="sr-a-area">Penale</div>
      <div className="sr-a-area">Lavoro</div>
    </div>
  </div>
);

const CampagnaPreview = () => (
  <div className="sr-preview sr-campagna">
    <nav className="sr-c-nav">
      <span className="sr-c-logo">MARIO ROSSI</span>
      <div className="sr-c-join">Unisciti</div>
    </nav>
    <div className="sr-c-hero">
      <div className="sr-c-photo" />
      <div className="sr-c-hero-text">
        <div className="sr-c-h1" />
        <div className="sr-c-h1 sr-c-h1--2" />
        <div className="sr-c-h1 sr-c-h1--3" />
        <div className="sr-c-donate">SOSTIENICI</div>
      </div>
    </div>
    <div className="sr-c-values">
      <div className="sr-c-val">Lavoro</div>
      <div className="sr-c-val">Sanità</div>
      <div className="sr-c-val">Futuro</div>
    </div>
  </div>
);

const EcommercePreview = () => (
  <div className="sr-preview sr-ecommerce">
    <nav className="sr-e-nav">
      <span className="sr-e-logo">BRAND</span>
      <div className="sr-e-nav-right">
        <i /><i />
        <span className="sr-e-cart">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#111" strokeWidth="2.2" strokeLinejoin="round" />
            <line x1="3" y1="6" x2="21" y2="6" stroke="#111" strokeWidth="2.2" />
          </svg>
        </span>
      </div>
    </nav>
    <div className="sr-e-hero">
      <div className="sr-e-hero-label">NUOVA COLLEZIONE</div>
      <div className="sr-e-hero-sub" />
    </div>
    <div className="sr-e-grid">
      {[49, 79, 39, 89].map((price, i) => (
        <div key={i} className="sr-e-product">
          <div className="sr-e-img" />
          <div className="sr-e-info">
            <div className="sr-e-name" />
            <span className="sr-e-price">€{price}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SalonePreview = () => (
  <div className="sr-preview sr-salone">
    <nav className="sr-s-nav">
      <span className="sr-s-logo">ATELIER ARIA</span>
      <div className="sr-s-hamburger">≡</div>
    </nav>
    <div className="sr-s-hero">
      <div className="sr-s-eyebrow">Salone di Bellezza · Milano</div>
      <div className="sr-s-h1" />
      <div className="sr-s-h1 sr-s-h1--2" />
      <div className="sr-s-cta">Prenota ora</div>
    </div>
    <div className="sr-s-services">
      {['Taglio', 'Colore', 'Piega', 'Spa'].map(s => (
        <div key={s} className="sr-s-service">
          <div className="sr-s-svc-dot" />
          <span>{s}</span>
        </div>
      ))}
    </div>
  </div>
);

const FotografoPreview = () => (
  <div className="sr-preview sr-fotografo">
    <nav className="sr-f-nav">
      <span className="sr-f-logo">LUCA FERRARI</span>
      <div className="sr-f-nav-links"><i /><i /><i /></div>
    </nav>
    <div className="sr-f-hero">
      <div className="sr-f-caption">WEDDING · PORTRAITS · EDITORIAL</div>
    </div>
    <div className="sr-f-gallery">
      <div className="sr-f-thumb sr-f-thumb--tall" />
      <div className="sr-f-col">
        <div className="sr-f-thumb" />
        <div className="sr-f-thumb sr-f-thumb--wide" />
      </div>
      <div className="sr-f-thumb" />
    </div>
  </div>
);

const PREVIEWS = {
  psicologo: PsicologoPreview,
  avvocati: AvvocatiPreview,
  campagna: CampagnaPreview,
  ecommerce: EcommercePreview,
  salone: SalonePreview,
  fotografo: FotografoPreview,
};

/* ─── Main Component ──────────────────────────────────────────────────────── */

const Showroom = () => {
  const navigate = useNavigate();
  const { setGuide, clearGuide } = useGuide();

  useEffect(() => {
    const snippets = [
      'const palette = { primary: "#5C7A6B" }',
      'font-family: "Playfair Display", serif',
      'display: grid; grid-template-columns: 1fr 1fr',
      'background: linear-gradient(160deg, #FAF7F2, #F2ECE4)',
      '<Section id="hero" layout="split" />',
      'const theme = { mode: "warm", accent: "#C9A96E" }',
      '@media (max-width: 768px) { grid-cols: 1 }',
      'color: #0F1F3D; border: 1px solid #B8922B',
    ];
    const timeouts = [];

    function spawnLine() {
      const text = snippets[Math.floor(Math.random() * snippets.length)];
      const x = Math.random() * (window.innerWidth - 320);
      const y = Math.random() * (window.innerHeight - 30);
      const el = document.createElement('div');
      el.className = 'code-line';
      el.textContent = text;
      el.style.cssText = `left:${x}px;top:${y}px`;
      const bg = document.getElementById('srCodeBg');
      if (bg) bg.appendChild(el);
      const t = setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 6000);
      timeouts.push(t);
    }

    const interval = setInterval(spawnLine, 5500);
    const t0 = setTimeout(spawnLine, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(t0);
      timeouts.forEach(clearTimeout);
      const bg = document.getElementById('srCodeBg');
      if (bg) while (bg.firstChild) bg.removeChild(bg.firstChild);
    };
  }, []);

  const handleChoose = (e, id) => {
    e.stopPropagation();
    navigate(`/contatti?template=${id}`);
  };

  return (
    <div className="style-room">
      <div className="code-background" id="srCodeBg" />

      <div className="sr-content">
        <header className="sr-header">
          <p className="sr-header__eyebrow">VIHENTE / TEMPLATE CATALOG</p>
          <h1 className="sr-header__title">Showroom</h1>
          <p className="sr-header__subtitle">
            Scegli il modello per la tua attività. Lo perfezioniamo insieme e lo consegniamo in tempi record.
          </p>
        </header>

        <div className="sr-grid">
          {templates.map(tpl => {
            const Preview = PREVIEWS[tpl.id];
            return (
              <article
                key={tpl.id}
                className="sr-template-card"
                onMouseEnter={() => setGuide(tpl.guide)}
                onMouseLeave={clearGuide}
              >
                <div
                  className="sr-preview-wrap sr-preview-wrap--clickable"
                  onClick={() => navigate(SIM_ROUTES[tpl.id])}
                  role="button"
                  tabIndex={0}
                  aria-label={`Anteprima interattiva: ${tpl.title}`}
                  onKeyDown={e => e.key === 'Enter' && navigate(SIM_ROUTES[tpl.id])}
                >
                  <Preview />
                  <div className="sr-preview-badge">Anteprima interattiva →</div>
                </div>
                <div className="sr-card-body">
                  <span className="sr-sector">{tpl.sector}</span>
                  <h2 className="sr-card-title">{tpl.title}</h2>
                  <div className="sr-tags">
                    {tpl.tags.map(tag => (
                      <span key={tag} className="sr-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="sr-card-desc">{tpl.description}</p>
                  <div className="sr-card-actions">
                    <button
                      className="sr-preview-btn"
                      onClick={() => navigate(SIM_ROUTES[tpl.id])}
                    >
                      Anteprima →
                    </button>
                    <button
                      className="sr-cta-btn"
                      onClick={e => handleChoose(e, tpl.id)}
                    >
                      Scegli modello
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Showroom;
