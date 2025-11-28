import { useState, useRef } from 'react';
import './FemosBlackMarketPage.css';

const FemosBlackMarketPage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cvv: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const notificationTimeoutRef = useRef(null);

  const products = [
    {
      id: 1,
      name: 'Neural Implant X-50',
      price: 2499.99,
      description: 'Potenziamento cognitivo di ultima generazione',
      image: '/shop/neural-implant.jpg',
      stock: 5,
      category: 'Cyberware'
    },
    {
      id: 2,
      name: 'Synthetic Plasma',
      price: 899.99,
      description: 'Sangue sintetico di grado militare',
      image: '/shop/plasma.jpg',
      stock: 12,
      category: 'Biotech'
    },
    {
      id: 3,
      name: 'Optical Camo Suit',
      price: 4599.99,
      description: 'Tuta con mimetizzazione ottica avanzata',
      image: '/shop/camo-suit.jpg',
      stock: 3,
      category: 'Equipment'
    },
    {
      id: 4,
      name: 'EMP Grenade Kit',
      price: 1299.99,
      description: 'Set di 5 granate elettromagnetiche',
      image: '/shop/emp-grenade.jpg',
      stock: 8,
      category: 'Weapons'
    },
    {
      id: 5,
      name: 'Hacking Deck Pro',
      price: 3299.99,
      description: 'Cyberdeck professionale con AI integrata',
      image: '/shop/hacking-deck.jpg',
      stock: 4,
      category: 'Tech'
    },
    {
      id: 6,
      name: 'Biometric Spoofer',
      price: 1899.99,
      description: 'Falsifica impronte digitali e scansioni retiniche',
      image: '/shop/biometric.jpg',
      stock: 7,
      category: 'Security'
    },
    {
      id: 7,
      name: 'Nano-Repair Kit',
      price: 699.99,
      description: 'Nanomacchine per riparazioni mediche istantanee',
      image: '/shop/nano-kit.jpg',
      stock: 15,
      category: 'Biotech'
    },
    {
      id: 8,
      name: 'Quantum Comm Device',
      price: 2199.99,
      description: 'Comunicatore quantistico non tracciabile',
      image: '/shop/quantum-comm.jpg',
      stock: 6,
      category: 'Tech'
    },
    {
      id: 9,
      name: 'Cybernetic Arm V3',
      price: 5499.99,
      description: 'Braccio cibernetico con forza potenziata',
      image: '/shop/cyber-arm.jpg',
      stock: 2,
      category: 'Cyberware'
    }
  ];

  const showNotification = (message) => {
    setNotification(message);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        showNotification(`⚠️ Stock massimo raggiunto per ${product.name}`);
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      showNotification(`✅ ${product.name} aggiunto al carrello`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`✅ ${product.name} aggiunto al carrello`);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    setCart(cart.filter(item => item.id !== productId));
    showNotification(`🗑️ ${item.name} rimosso dal carrello`);
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + change));
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address || !formData.cardNumber || !formData.cvv) {
      showNotification('⚠️ Compila tutti i campi obbligatori');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('⚠️ Email non valida');
      return;
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      showNotification('⚠️ Numero carta non valido');
      return;
    }

    if (formData.cvv.length !== 3) {
      showNotification('⚠️ CVV non valido');
      return;
    }

    showNotification('✅ Ordine completato! Riceverai una conferma via email.');
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      cvv: ''
    });
  };

  return (
    <div className="femos-black-market">
      <div className="market-header">
        <h1 className="market-title">
          <span className="glitch-text" data-text="FEMOS BLACK MARKET">FEMOS BLACK MARKET</span>
        </h1>
        <p className="market-subtitle">// Underground Tech & Cyberware Marketplace</p>

        <button
          className="cart-toggle"
          onClick={() => setShowCart(!showCart)}
          aria-label="Apri carrello"
        >
          <span className="cart-icon">🛒</span>
          {getTotalItems() > 0 && (
            <span className="cart-badge">{getTotalItems()}</span>
          )}
        </button>
      </div>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Carrello</h2>
              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
                aria-label="Chiudi carrello"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>🛒 Il tuo carrello è vuoto</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="cart-item-price">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Diminuisci quantità"
                        >
                          −
                        </button>
                        <span className="cart-item-quantity">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Aumenta quantità"
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Rimuovi dal carrello"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <h3>Totale: <span className="total-price">€{getTotalPrice()}</span></h3>
                  <button
                    className="checkout-btn"
                    onClick={() => {
                      setShowCheckout(true);
                      setShowCart(false);
                    }}
                  >
                    Procedi al Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="checkout-overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-panel" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button
                className="close-checkout"
                onClick={() => setShowCheckout(false)}
                aria-label="Chiudi checkout"
              >
                ✕
              </button>
            </div>

            <form className="checkout-form" onSubmit={handleCheckout}>
              <div className="form-group">
                <label htmlFor="name">Nome completo *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Mario Rossi"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="mario@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Indirizzo di spedizione *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Via Roma 123, Milano, 20100"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Numero carta *</label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  id="cvv"
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>

              <div className="checkout-total">
                <h3>Totale da pagare: <span>€{getTotalPrice()}</span></h3>
              </div>

              <button type="submit" className="submit-order-btn">
                Completa Ordine
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-placeholder">
              <div className="category-badge">{product.category}</div>
              <div className="stock-indicator">
                Stock: <span className={product.stock < 5 ? 'low-stock' : ''}>{product.stock}</span>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">€{product.price.toFixed(2)}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Esaurito' : 'Aggiungi'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="market-footer">
        <p className="disclaimer">
          ⚠️ DISCLAIMER: Questo è un marketplace simulato a scopo dimostrativo.
          Nessuna transazione reale viene effettuata.
        </p>
      </div>
    </div>
  );
};

export default FemosBlackMarketPage;
