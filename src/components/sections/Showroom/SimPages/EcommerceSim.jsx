import { useState, useRef, useCallback } from 'react';
import SimWrapper from './SimWrapper';
import './EcommerceSim.css';

const PRODOTTI = [
  {
    id: 1,
    nome: 'Giacca Oversize',
    src: '/images/lullabies-giacca-oversize.webp',
    cat: 'Outerwear',
    prezzo: 149,
    colore: '#D4C5B0',
    colore2: '#BFB09A',
    desc: 'Taglio maschile rilassato in tessuto misto lana. Spalle cadenti, bavero a lancia, due tasche applicate. Ideale per la mezza stagione.',
    materiale: 'Composizione: 60% Lana, 35% Poliestere, 5% Cashmere',
    taglie: ['XS', 'S', 'M', 'L', 'XL'],
    cura: 'Lavaggio a secco consigliato',
  },
  {
    id: 2,
    nome: 'Abito Drappeggiato',
    src: '/images/lullabies-abito-drappeggiato.webp',
    cat: 'Dresses',
    prezzo: 129,
    colore: '#C4B4A0',
    colore2: '#AFA08C',
    desc: 'Drappeggio asimmetrico sul fianco, lunghezza al ginocchio. Viscosa fluidissima che segue il corpo senza stringerlo. Perfetto per occasioni speciali.',
    materiale: 'Composizione: 100% Viscosa',
    taglie: ['XS', 'S', 'M', 'L'],
    cura: 'Lavaggio a mano, non centrifugare',
  },
  {
    id: 3,
    nome: 'Sneaker Low',
    src: '/images/lullabies-sneaker-low.webp',
    cat: 'Footwear',
    prezzo: 89,
    colore: '#E8E0D8',
    colore2: '#D4CAC0',
    desc: 'Silhouette pulita ispirata alle classiche tennis shoe degli anni Ottanta. Suola vulcanizzata, tomaia in pelle pieno fiore, linguetta imbottita.',
    materiale: 'Tomaia: Pelle pieno fiore · Suola: Gomma naturale',
    taglie: ['36', '37', '38', '39', '40', '41', '42'],
    cura: 'Pulire con panno umido, non immergere',
  },
  {
    id: 4,
    nome: 'Borsa Tote Premium',
    src: '/images/lullabies-borsa-tote.webp',
    cat: 'Accessories',
    prezzo: 199,
    colore: '#A89080',
    colore2: '#957D6D',
    desc: 'Borsa capiente in pelle vacchetta vegetale. Fondo rinforzato, tasca interna con zip, tracolla removibile. Invecchia magnificamente.',
    materiale: 'Pelle vacchetta conciata al vegetale · Made in Italy',
    taglie: ['Unica'],
    cura: 'Nutrire con crema incolore, evitare acqua diretta',
  },
  {
    id: 5,
    nome: 'Maglione Cashmere',
    src: '/images/lullabies-maglione-cashmere.webp',
    cat: 'Knitwear',
    prezzo: 175,
    colore: '#C8B8A8',
    colore2: '#B8A898',
    desc: 'Punto inglese a costa larga in cashmere puro Mongolia. Leggerissimo, morbidissimo, caldo quanto basta. Un classico che dura decenni.',
    materiale: 'Composizione: 100% Cashmere grado A, Mongolia',
    taglie: ['S', 'M', 'L', 'XL'],
    cura: 'Lavaggio a mano con acqua fredda, asciugare in piano',
  },
  {
    id: 6,
    nome: 'Pantaloni Wide-Leg',
    src: '/images/lullabies-pantaloni-wide.webp',
    cat: 'Bottoms',
    prezzo: 98,
    colore: '#D8D0C8',
    colore2: '#C4BEB6',
    desc: 'Gamba larga dal cavallo alto in crêpe di acetato. Cinta elastica nascosta, orlo sfiorato. Portali con mules e blazer o con sneakers.',
    materiale: 'Composizione: 70% Acetato, 30% Poliestere',
    taglie: ['XS', 'S', 'M', 'L', 'XL'],
    cura: 'Lavaggio delicato 30°C, non torcere',
  },
  {
    id: 7,
    nome: 'Camicia Seta',
    src: '/images/lullabies-camicia-seta.webp',
    cat: 'Tops',
    prezzo: 115,
    colore: '#E4D8C8',
    colore2: '#D0C4B4',
    desc: 'Camicia classica in seta di charmeuse. Colletto francese, polsini semplici, taglio straight leggermente ampio. Si porta in o fuori dai pantaloni.',
    materiale: 'Composizione: 100% Seta charmeuse · Como, Italia',
    taglie: ['XS', 'S', 'M', 'L'],
    cura: 'Solo lavaggio a secco',
  },
  {
    id: 8,
    nome: 'Cintura Pelle',
    src: '/images/lullabies-cintura-pelle.webp',
    cat: 'Accessories',
    prezzo: 65,
    colore: '#A09080',
    colore2: '#8D7D6D',
    desc: 'Cintura in cuoio pieno fiore da 3 cm. Fibbia in ottone opaco, cuciture a contrasto a vista. Essenziale, durevole, sempre attuale.',
    materiale: 'Cuoio pieno fiore · Fibbia ottone · Made in Italy',
    taglie: ['S/M', 'L/XL'],
    cura: 'Nutrire periodicamente con cera neutra',
  },
];

const CATEGORIE = ['Tutti', 'Outerwear', 'Dresses', 'Footwear', 'Accessories', 'Knitwear'];

/* ─── Product Magnifier ─────────────────────────────────────── */

const MAG_ZOOM = 2.8;
const MAG_LENS_SIZE = 150;

const ProductMagnifier = ({ src, nome }) => {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [lens, setLens] = useState({ x: 0, y: 0, bgX: 0, bgY: 0, w: 0, h: 0, visible: false });

  const handleMouseMove = useCallback((e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Replicate the `object-fit: cover` geometry of the base <img> so the
    // magnified view lines up exactly with the crop shown underneath.
    const img = imgRef.current;
    const nw = img?.naturalWidth || rect.width;
    const nh = img?.naturalHeight || rect.height;
    const scale = Math.max(rect.width / nw, rect.height / nh);
    const dispW = nw * scale;
    const dispH = nh * scale;
    const offX = (dispW - rect.width) / 2;
    const offY = (dispH - rect.height) / 2;

    setLens({
      x,
      y,
      w: dispW * MAG_ZOOM,
      h: dispH * MAG_ZOOM,
      bgX: MAG_LENS_SIZE / 2 - (offX + x) * MAG_ZOOM,
      bgY: MAG_LENS_SIZE / 2 - (offY + y) * MAG_ZOOM,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setLens(l => ({ ...l, visible: false }));
  }, []);

  const lensStyle = lens.visible ? {
    display: 'block',
    left: lens.x,
    top: lens.y,
    backgroundImage: `url("${src}")`,
    backgroundSize: `${lens.w}px ${lens.h}px`,
    backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
    backgroundRepeat: 'no-repeat',
  } : { display: 'none' };

  return (
    <div
      className="eco-magnify-wrap"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={nome} className="sim-photo-img" ref={imgRef} />
      <div className="eco-magnify-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="11" y1="8" x2="11" y2="14" />
        </svg>
        <span>Passa il cursore per ingrandire</span>
      </div>
      <div className="eco-magnifier-lens" style={lensStyle} />
    </div>
  );
};

/* ─── Product Detail Modal ──────────────────────────────────── */

const ProductModal = ({ prodotto, onClose, onAddToCart, addedId }) => {
  const [taglia, setTaglia] = useState('');

  const handleAdd = () => {
    onAddToCart(prodotto);
  };

  return (
    <div className="eco-pmodal-overlay" onClick={onClose}>
      <div className="eco-pmodal" onClick={e => e.stopPropagation()}>
        <button className="eco-pmodal-close" onClick={onClose}>✕</button>

        <div className="eco-pmodal-layout">
          {/* Left: image with magnifier */}
          <div className="eco-pmodal-img-col">
            <ProductMagnifier src={prodotto.src} nome={prodotto.nome} />
          </div>

          {/* Right: product details */}
          <div className="eco-pmodal-info-col">
            <p className="eco-pmodal-cat">{prodotto.cat}</p>
            <h2 className="eco-pmodal-nome">{prodotto.nome}</h2>
            <p className="eco-pmodal-prezzo">€ {prodotto.prezzo}</p>

            <p className="eco-pmodal-desc">{prodotto.desc}</p>

            <div className="eco-pmodal-material">
              <span className="eco-pmodal-detail-label">COMPOSIZIONE</span>
              <span>{prodotto.materiale}</span>
            </div>

            <div className="eco-pmodal-material">
              <span className="eco-pmodal-detail-label">CURA</span>
              <span>{prodotto.cura}</span>
            </div>

            {prodotto.taglie.length > 1 && (
              <div className="eco-pmodal-taglie">
                <span className="eco-pmodal-detail-label">TAGLIA</span>
                <div className="eco-pmodal-taglia-grid">
                  {prodotto.taglie.map(t => (
                    <button
                      key={t}
                      className={`eco-taglia-btn${taglia === t ? ' eco-taglia-btn--sel' : ''}`}
                      onClick={() => setTaglia(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className={`eco-pmodal-add${addedId === prodotto.id ? ' eco-pmodal-add--done' : ''}`}
              onClick={handleAdd}
            >
              {addedId === prodotto.id ? '✓ Aggiunto al carrello' : '+ Aggiungi al carrello'}
            </button>

            <p className="eco-pmodal-ship">Spedizione gratuita · Reso entro 30 giorni</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────── */

const EcommerceSim = () => {
  const [cart, setCart] = useState([]);
  const [catFilter, setCatFilter] = useState('Tutti');
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [detailProd, setDetailProd] = useState(null);

  const filtered = catFilter === 'Tutti' ? PRODOTTI : PRODOTTI.filter(p => p.cat === catFilter);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.prezzo * i.qty, 0);

  return (
    <SimWrapper templateId="ecommerce" templateTitle="E-commerce" accentColor="#111111">
      <div className="eco-site">

        {/* ── NAV ── */}
        <nav className="eco-nav">
          <div className="eco-nav-left">
            <button className="eco-hamburger">☰</button>
          </div>
          <div className="eco-nav-logo">LULLABIES</div>
          <div className="eco-nav-right">
            <button className="eco-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#111" strokeWidth="1.8" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button className="eco-cart-btn" onClick={() => setCartOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#111" strokeWidth="1.8" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="#111" strokeWidth="1.8" />
              </svg>
              {totalQty > 0 && <span className="eco-cart-badge">{totalQty}</span>}
            </button>
          </div>
        </nav>

        {/* ── HERO BANNER ── */}
        <section className="eco-hero">
          <div className="eco-hero-bg">
            <img src="/images/lullabies-hero.webp" alt="" className="sim-photo-img" />
            <span className="sim-photo-hint">hero · moda / collezione</span>
            <div className="eco-hero-overlay" />
          </div>
          <div className="eco-hero-content">
            <p className="eco-hero-eyebrow">PRIMAVERA · ESTATE 2026</p>
            <h1 className="eco-hero-h1">NUOVA<br />COLLEZIONE</h1>
            <p className="eco-hero-sub">L'eleganza che non segue la moda. La crea.</p>
            <button className="eco-hero-btn">Scopri la collezione</button>
          </div>
        </section>

        {/* ── CATEGORIE ── */}
        <div className="eco-cats">
          {CATEGORIE.map(c => (
            <button
              key={c}
              className={`eco-cat${catFilter === c ? ' eco-cat--active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── PRODOTTI ── */}
        <section className="eco-products">
          <div className="eco-products-inner">
            <div className="eco-products-grid">
              {filtered.map(p => (
                <div key={p.id} className="eco-product">
                  <div
                    className="eco-product-img"
                    style={{ background: `linear-gradient(145deg, ${p.colore}, ${p.colore2})` }}
                    onClick={() => setDetailProd(p)}
                  >
                    <img src={p.src} alt={p.nome} loading="lazy" decoding="async" className="sim-photo-img" />
                    <span className="sim-photo-hint">{p.nome}</span>
                    <div className="eco-product-overlay">
                      <button className="eco-zoom-btn" onClick={e => { e.stopPropagation(); setDetailProd(p); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="16.5" y1="16.5" x2="21" y2="21" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                        </svg>
                        Dettaglio
                      </button>
                      <button
                        className={`eco-add-btn${addedId === p.id ? ' eco-add-btn--done' : ''}`}
                        onClick={e => { e.stopPropagation(); addToCart(p); }}
                      >
                        {addedId === p.id ? '✓ Aggiunto' : '+ Carrello'}
                      </button>
                    </div>
                  </div>
                  <div className="eco-product-info" onClick={() => setDetailProd(p)}>
                    <div className="eco-product-cat">{p.cat}</div>
                    <div className="eco-product-nome">{p.nome}</div>
                    <div className="eco-product-prezzo">€ {p.prezzo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BANNER ── */}
        <section className="eco-banner">
          <p className="eco-banner-eyebrow">SERVIZIO PREMIUM</p>
          <h2 className="eco-banner-h2">Spedizione gratuita sopra € 120</h2>
          <div className="eco-banner-pills">
            <span>Reso gratuito 30 giorni</span>
            <span>Pagamento sicuro</span>
            <span>Assistenza 7/7</span>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="eco-footer">
          <div className="eco-footer-logo">LULLABIES</div>
          <p className="eco-footer-sub">Via della Moda 12, Milano · info@lullabies.it · +39 02 5551234</p>
          <p className="eco-footer-legal">© 2026 Lumière S.r.l. — P.IVA 09876543210</p>
        </footer>

      </div>

      {/* ── PRODUCT DETAIL MODAL ── */}
      {detailProd && (
        <ProductModal
          prodotto={detailProd}
          onClose={() => setDetailProd(null)}
          onAddToCart={addToCart}
          addedId={addedId}
        />
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="eco-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="eco-drawer" onClick={e => e.stopPropagation()}>
            <div className="eco-drawer-header">
              <h3 className="eco-drawer-title">Carrello ({totalQty})</h3>
              <button className="eco-drawer-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="eco-drawer-items">
              {cart.length === 0 ? (
                <p className="eco-drawer-empty">Il carrello è vuoto.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="eco-drawer-item">
                    <div
                      className="eco-drawer-thumb"
                      style={{ background: `linear-gradient(145deg, ${item.colore}, ${item.colore2})` }}
                    />
                    <div className="eco-drawer-item-info">
                      <div className="eco-drawer-item-nome">{item.nome}</div>
                      <div className="eco-drawer-item-prezzo">€ {item.prezzo} × {item.qty}</div>
                    </div>
                    <button className="eco-drawer-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="eco-drawer-footer">
                <div className="eco-drawer-total">
                  <span>Totale</span>
                  <strong>€ {totalPrice}</strong>
                </div>
                <button className="eco-checkout-btn">Procedi all'acquisto →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </SimWrapper>
  );
};

export default EcommerceSim;
