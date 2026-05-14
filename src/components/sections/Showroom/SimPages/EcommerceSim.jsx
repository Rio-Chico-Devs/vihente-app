import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './EcommerceSim.css';

const PRODOTTI = [
  { id: 1, nome: 'Giacca Oversize', cat: 'Outerwear', prezzo: 149, colore: '#D4C5B0' },
  { id: 2, nome: 'Abito Drappeggiato', cat: 'Dresses', prezzo: 129, colore: '#C4B4A0' },
  { id: 3, nome: 'Sneaker Low', cat: 'Footwear', prezzo: 89, colore: '#E8E0D8' },
  { id: 4, nome: 'Borsa Tote Premium', cat: 'Accessories', prezzo: 199, colore: '#A89080' },
  { id: 5, nome: 'Maglione Cashmere', cat: 'Knitwear', prezzo: 175, colore: '#C8B8A8' },
  { id: 6, nome: 'Pantaloni Wide-Leg', cat: 'Bottoms', prezzo: 98, colore: '#D8D0C8' },
  { id: 7, nome: 'Camicia Seta', cat: 'Tops', prezzo: 115, colore: '#E4D8C8' },
  { id: 8, nome: 'Cintura Pelle', cat: 'Accessories', prezzo: 65, colore: '#A09080' },
];

const CATEGORIE = ['Tutti', 'Outerwear', 'Dresses', 'Footwear', 'Accessories', 'Knitwear'];

const EcommerceSim = () => {
  const [cart, setCart] = useState([]);
  const [catFilter, setCatFilter] = useState('Tutti');
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const filtered = catFilter === 'Tutti' ? PRODOTTI : PRODOTTI.filter(p => p.cat === catFilter);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 900);
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
          <div className="eco-nav-logo">LUMIÈRE</div>
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
                  <div className="eco-product-img" style={{ background: `linear-gradient(145deg, ${p.colore}, ${p.colore}CC)` }}>
                    <div className="eco-product-overlay">
                      <button
                        className={`eco-add-btn${addedId === p.id ? ' eco-add-btn--done' : ''}`}
                        onClick={() => addToCart(p)}
                      >
                        {addedId === p.id ? '+ Aggiunto ✓' : '+ Aggiungi al carrello'}
                      </button>
                    </div>
                  </div>
                  <div className="eco-product-info">
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
          <div className="eco-footer-logo">LUMIÈRE</div>
          <p className="eco-footer-sub">Via della Moda 12, Milano · info@lumiere.it · +39 02 5551234</p>
          <p className="eco-footer-legal">© 2026 Lumière S.r.l. — P.IVA 09876543210</p>
        </footer>

      </div>

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
                      style={{ background: `linear-gradient(145deg, ${item.colore}, ${item.colore}BB)` }}
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
