import { useState, useRef, useEffect, useCallback } from 'react';
import './FemosBlackMarketPage.css';

// Costanti e database fuori dal componente per evitare problemi di dipendenze
const CART_MAX_ITEMS = 12;

const productsDatabase = [
  // SPECIAL (1 solo tipo, max 1 generabile)
  { id: 1, name: "Void Singularity", price: 9999, rarity: "special", image: "/shop/singularity.jpg", desc: "Un frammento di pura energia del vuoto. Distrugge la realtà stessa.", maxStock: 1, baseStock: 1 },
  
  // ??? (1 solo tipo, max 1 generabile, ultra raro)
  { id: 2, name: "La Chiave", price: 99999, rarity: "mystery", image: "/shop/key.jpg", desc: "Nessuno sa cosa apra. Nessuno sa da dove viene. Ma tutti la vogliono.", maxStock: 1, baseStock: 1 },
  
  // LEGENDARY (4 tipi diversi, max 1 generabile)
  { id: 3, name: "Cyber Blade X1", price: 2999, rarity: "legendary", image: "/shop/blade.jpg", desc: "Forgiata nel nucleo di una stella morente. Taglia firewall e nemici.", maxStock: 1, baseStock: 1 },
  { id: 4, name: "Stealth Cloak Mk.V", price: 3499, rarity: "legendary", image: "/shop/cloak.jpg", desc: "Invisibilità totale. Gli scanner nemici vedono solo il vuoto.", maxStock: 1, baseStock: 1 },
  { id: 5, name: "Quantum Core", price: 4299, rarity: "legendary", image: "/shop/core.jpg", desc: "Alimenta città intere. O le distrugge. Dipende da te.", maxStock: 1, baseStock: 1 },
  { id: 6, name: "Neural Override System", price: 3799, rarity: "legendary", image: "/shop/override.jpg", desc: "Controllo mentale diretto. Etica? Quella è per i deboli.", maxStock: 1, baseStock: 1 },
  
  // EPIC (6 tipi diversi, max 2 generabili)
  { id: 7, name: "Neural Chip Pro", price: 1499, rarity: "epic", image: "/shop/chip.jpg", desc: "Potenzia le sinapsi del 400%. Effetti collaterali? Chi se ne importa.", maxStock: 2, baseStock: 2 },
  { id: 8, name: "Plasma Gun Delta", price: 1899, rarity: "epic", image: "/shop/gun.jpg", desc: "Ionizza i nemici. Letteralmente. Niente più tracce.", maxStock: 2, baseStock: 2 },
  { id: 9, name: "Holographic Suit", price: 1699, rarity: "epic", image: "/shop/suit.jpg", desc: "Proietta false realtà. I nemici combattono fantasmi.", maxStock: 2, baseStock: 2 },
  { id: 10, name: "Cyber Katana Elite", price: 2199, rarity: "epic", image: "/shop/katana.jpg", desc: "Eleganza letale. Ogni taglio è una danza mortale.", maxStock: 2, baseStock: 2 },
  { id: 11, name: "Graviton Manipulator", price: 1799, rarity: "epic", image: "/shop/graviton.jpg", desc: "Piega la gravità alla tua volontà. Vola, schiaccia, domina.", maxStock: 2, baseStock: 2 },
  { id: 12, name: "Phase Shifter", price: 1599, rarity: "epic", image: "/shop/phase.jpg", desc: "Attraversa pareti e proiettili. La materia è solo un suggerimento.", maxStock: 2, baseStock: 2 },
  
  // RARE (8 tipi diversi, max 3 generabili)
  { id: 13, name: "Data Shard Alpha", price: 599, rarity: "rare", image: "/shop/shard.jpg", desc: "Segreti del sistema. Password, backdoor, vulnerabilità.", maxStock: 3, baseStock: 3 },
  { id: 14, name: "Nano Serum", price: 799, rarity: "rare", image: "/shop/serum.jpg", desc: "Rigenera tessuti danneggiati. HP al massimo in 10 secondi.", maxStock: 3, baseStock: 3 },
  { id: 15, name: "Energy Shield Portable", price: 1099, rarity: "rare", image: "/shop/shield.jpg", desc: "Barriera energetica. Resiste a proiettili, laser, esplosioni.", maxStock: 3, baseStock: 3 },
  { id: 16, name: "Turbo Booster X", price: 899, rarity: "rare", image: "/shop/booster.jpg", desc: "Velocità x7 per 45 secondi. Il mondo rallenta, tu acceleri.", maxStock: 3, baseStock: 3 },
  { id: 17, name: "Optical Camouflage Unit", price: 949, rarity: "rare", image: "/shop/optical.jpg", desc: "Invisibilità ottica. Non perfetta, ma abbastanza buona.", maxStock: 3, baseStock: 3 },
  { id: 18, name: "Cyber Deck Pro", price: 1199, rarity: "rare", image: "/shop/deck.jpg", desc: "Hacking avanzato. Penetra sistemi di classe B con facilità.", maxStock: 3, baseStock: 3 },
  { id: 19, name: "Thermal Vision Implant", price: 749, rarity: "rare", image: "/shop/thermal.jpg", desc: "Vedi attraverso muri e nebbia. Il calore non mente mai.", maxStock: 3, baseStock: 3 },
  { id: 20, name: "Adrenaline Injector", price: 699, rarity: "rare", image: "/shop/adrenaline.jpg", desc: "Riflessi aumentati del 300%. Dura 60 secondi di pura furia.", maxStock: 3, baseStock: 3 },
  
  // COMMON (15 tipi diversi, stock abbondante)
  { id: 21, name: "Hack Tool v3.2", price: 299, rarity: "common", image: "/shop/hacktool.jpg", desc: "Sblocca porte digitali di bassa sicurezza. Utile sempre.", maxStock: 8, baseStock: 8 },
  { id: 22, name: "Bio Scanner Basic", price: 199, rarity: "common", image: "/shop/scanner.jpg", desc: "Rileva forme di vita in 50m. Essenziale per esplorare.", maxStock: 8, baseStock: 8 },
  { id: 23, name: "EMP Grenade", price: 349, rarity: "common", image: "/shop/emp.jpg", desc: "Disattiva elettronica nemica. Economico ed efficace.", maxStock: 8, baseStock: 8 },
  { id: 24, name: "Power Cell Standard", price: 149, rarity: "common", image: "/shop/cell.jpg", desc: "Energia per 2 ore. Comprane diverse, serviranno.", maxStock: 8, baseStock: 8 },
  { id: 25, name: "Medkit Base", price: 249, rarity: "common", image: "/shop/medkit.jpg", desc: "Bende, disinfettante, stimolanti. Sopravvivenza 101.", maxStock: 8, baseStock: 8 },
  { id: 26, name: "Combat Knife", price: 179, rarity: "common", image: "/shop/knife.jpg", desc: "Lama in titanio. Affidabile, silenziosa, mortale.", maxStock: 8, baseStock: 8 },
  { id: 27, name: "Flashbang", price: 229, rarity: "common", image: "/shop/flashbang.jpg", desc: "Acceca e stordisce. Perfetto per fughe rapide.", maxStock: 8, baseStock: 8 },
  { id: 28, name: "Comm Link", price: 189, rarity: "common", image: "/shop/comm.jpg", desc: "Comunicazioni criptate base. Mantiene il contatto col team.", maxStock: 8, baseStock: 8 },
  { id: 29, name: "Night Vision Goggles", price: 399, rarity: "common", image: "/shop/nightvision.jpg", desc: "Vedi al buio. Modello base ma funzionale.", maxStock: 8, baseStock: 8 },
  { id: 30, name: "Grappling Hook", price: 279, rarity: "common", image: "/shop/grapple.jpg", desc: "Scala edifici rapidamente. Utile per infiltrazioni.", maxStock: 8, baseStock: 8 },
  { id: 31, name: "Smoke Grenade", price: 199, rarity: "common", image: "/shop/smoke.jpg", desc: "Copertura istantanea. Essenziale per ritirate tattiche.", maxStock: 8, baseStock: 8 },
  { id: 32, name: "Lockpick Set", price: 159, rarity: "common", image: "/shop/lockpick.jpg", desc: "Apre serrature meccaniche standard. Vecchia scuola funziona.", maxStock: 8, baseStock: 8 },
  { id: 33, name: "Armor Vest Light", price: 449, rarity: "common", image: "/shop/vest.jpg", desc: "Protezione base contro armi da fuoco. Meglio di niente.", maxStock: 8, baseStock: 8 },
  { id: 34, name: "Stim Pack", price: 299, rarity: "common", image: "/shop/stim.jpg", desc: "Recupero energia rapido. Ti tiene in piedi più a lungo.", maxStock: 8, baseStock: 8 },
  { id: 35, name: "Recon Drone Mini", price: 549, rarity: "common", image: "/shop/drone.jpg", desc: "Ricognizione aerea base. Vedi cosa ti aspetta prima di entrare.", maxStock: 8, baseStock: 8 }
];

const mascotPhrases = {
  mystery: ["...Cosa? Come hai trovato QUELLA?", "La Chiave. Non dovrebbe essere qui. Non dovrebbe esistere.", "Se la compri... non so cosa succederà. Ma sarà irreversibile."],
  special: ["ATTENZIONE: Artefatto di classe SPECIAL. Pericolo estremo.", "Questo... non dovrebbe esistere. Ma eccolo qui.", "Solo per i più folli. O i più coraggiosi. Forse entrambi."],
  legendary: ["RARO. Molto raro. Forse troppo per te?", "Pezzo unico. Una volta venduto, sparisce per sempre.", "Potere leggendario. Gestiscilo con rispetto."],
  epic: ["Qualità superiore. Per operatori esperti.", "Stock limitato. Non ricapita spesso.", "Ottima scelta. Sopravviverai più a lungo."],
  rare: ["Solido. Affidabile. Sopra la media.", "Ne ho pochi. Meglio prenderlo ora.", "Buon compromesso tra prezzo e prestazioni."],
  common: ["L'essenziale. Ogni runner ne ha bisogno.", "Economico. Funzionale. Semplice.", "Stock pieno. Ne ho quanti ne vuoi."],
  cart: ["Il tuo arsenale cresce... interessante.", "Buon occhio per gli affari.", "Stai pianificando qualcosa di grosso?"],
  cartFull: ["HEY. Hai già troppa roba. Sgombera il carrello.", "STOP. Il carrello è pieno. Compra prima.", "Non puoi portare altro. Limiti fisici, capisci?"],
  noStock: ["Esaurito. Finito. Venduto. Puff.", "Ne avevo uno. HAD. Past tense.", "Troppo tardi. Qualcun altro è stato più veloce."],
  purchase: ["Transazione completata. Materiale in consegna.", "Piacere fare affari. Ci vediamo presto.", "Vendita confermata. Il mercato nero non dimentica."],
  randomize: ["Nuovo shipment. Controlla l'inventario.", "Ho rifornito. Potrebbero esserci sorprese.", "Merce fresca dal mercato nero."]
};

const FemosBlackMarketPage = () => {
  const [simulationActive, setSimulationActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('shop');
  const [cart, setCart] = useState([]);
  const [mascotMessage, setMascotMessage] = useState("Il mercato nero ti dà il benvenuto...");
  const [pupilPosition, setPupilPosition] = useState({ x: 500, y: 500 });
  const [checkoutData, setCheckoutData] = useState({
    name: '', email: '', address: '', city: '', zip: '', wallet: ''
  });
  const [pageTransition, setPageTransition] = useState(false);

  const eyeRef = useRef(null);
  const targetPositionRef = useRef({ x: 500, y: 500 });
  const currentPositionRef = useRef({ x: 500, y: 500 });
  const interpolationFrameRef = useRef(null);

  const [productStock, setProductStock] = useState(() => {
    const initialStock = {};
    productsDatabase.forEach(product => {
      initialStock[product.id] = product.baseStock;
    });
    return initialStock;
  });

  const [currentProducts, setCurrentProducts] = useState([]);

  const generateShopInventory = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const maxProducts = isMobile ? 4 : 10;
    
    // Pesi di rarità: mystery è ancora più raro di special
    const rarityWeights = { 
      mystery: 0.1,    // 0.1% - ultra raro
      special: 0.5,    // 0.5% - molto raro
      legendary: 4,    // 4%
      epic: 10,        // 10%
      rare: 25,        // 25%
      common: 60.4     // 60.4% - resto
    };
    
    // Limiti massimi per rarità nello shop
    const rarityLimits = {
      mystery: 1,
      special: 1,
      legendary: 1,
      epic: 2,
      rare: 3
      // common: nessun limite
    };
    
    const availableProducts = productsDatabase.filter(p => productStock[p.id] > 0);
    const selectedProducts = [];
    const usedIds = new Set();
    const rarityCounts = { mystery: 0, special: 0, legendary: 0, epic: 0, rare: 0, common: 0 };

    while (selectedProducts.length < maxProducts && availableProducts.length > 0) {
      const rand = Math.random() * 100;
      let cumulativeProbability = 0;
      let selectedRarity = 'common';

      for (const [rarity, weight] of Object.entries(rarityWeights)) {
        cumulativeProbability += weight;
        if (rand <= cumulativeProbability) {
          selectedRarity = rarity;
          break;
        }
      }
      
      // Controlla se la rarità ha raggiunto il limite
      if (rarityLimits[selectedRarity] && rarityCounts[selectedRarity] >= rarityLimits[selectedRarity]) {
        // Se il limite è raggiunto, riparte il ciclo per selezionare un'altra rarità
        continue;
      }

      const rarityProducts = availableProducts.filter(p => p.rarity === selectedRarity && !usedIds.has(p.id));
      if (rarityProducts.length > 0) {
        const randomProduct = rarityProducts[Math.floor(Math.random() * rarityProducts.length)];
        selectedProducts.push(randomProduct);
        usedIds.add(randomProduct.id);
        rarityCounts[selectedRarity]++;
      }
    }

    // Riempi gli slot rimanenti con prodotti comuni o rare se non si raggiunge il maxProducts
    while (selectedProducts.length < maxProducts && availableProducts.length > selectedProducts.length) {
      const remainingProducts = availableProducts.filter(p => {
        if (usedIds.has(p.id)) return false;
        
        // Controlla i limiti
        if (rarityLimits[p.rarity] && rarityCounts[p.rarity] >= rarityLimits[p.rarity]) {
          return false;
        }
        
        return true;
      });
      
      if (remainingProducts.length === 0) break;
      const randomProduct = remainingProducts[Math.floor(Math.random() * remainingProducts.length)];
      selectedProducts.push(randomProduct);
      usedIds.add(randomProduct.id);
      rarityCounts[randomProduct.rarity]++;
    }

    setCurrentProducts(selectedProducts);
  }, [productStock]);

  useEffect(() => {
    if (simulationActive && currentProducts.length === 0) {
      generateShopInventory();
    }
  }, [simulationActive, currentProducts.length, generateShopInventory]);

  useEffect(() => {
    if (!simulationActive) return;

    const smoothness = 0.15;
    function interpolate() {
      const current = currentPositionRef.current;
      const target = targetPositionRef.current;
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        current.x = target.x;
        current.y = target.y;
      } else {
        current.x += dx * smoothness;
        current.y += dy * smoothness;
      }

      setPupilPosition({ x: current.x, y: current.y });
      interpolationFrameRef.current = requestAnimationFrame(interpolate);
    }

    interpolate();
    return () => {
      if (interpolationFrameRef.current) cancelAnimationFrame(interpolationFrameRef.current);
    };
  }, [simulationActive]);

  useEffect(() => {
    if (!simulationActive) return;

    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - eyeRect.left) / eyeRect.width;
      const relativeY = (e.clientY - eyeRect.top) / eyeRect.height;

      const svgWidth = 1000, svgHeight = 1000;
      let newX = relativeX * svgWidth;
      let newY = relativeY * svgHeight;

      const centerX = 500, centerY = 500;
      const maxRadiusX = 95, maxRadiusY = 65;
      const deltaFromCenterX = newX - centerX;
      const deltaFromCenterY = newY - centerY;

      const normalizedDistance = Math.sqrt(
        (deltaFromCenterX * deltaFromCenterX) / (maxRadiusX * maxRadiusX) +
        (deltaFromCenterY * deltaFromCenterY) / (maxRadiusY * maxRadiusY)
      );

      if (normalizedDistance > 1) {
        const angle = Math.atan2(deltaFromCenterY, deltaFromCenterX);
        newX = centerX + Math.cos(angle) * maxRadiusX;
        newY = centerY + Math.sin(angle) * maxRadiusY;
      }

      targetPositionRef.current = { x: newX, y: newY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [simulationActive]);

  const startSimulation = () => {
    setSimulationActive(true);
    setMascotMessage("Benvenuto, runner. Scegli con saggezza.");
  };

  const exitSimulation = () => {
    setSimulationActive(false);
    setCart([]);
    setCurrentPage('shop');
    setMascotMessage("Il mercato nero ti dà il benvenuto...");
    setCheckoutData({ name: '', email: '', address: '', city: '', zip: '', wallet: '' });
    setCurrentProducts([]);
    const resetStock = {};
    productsDatabase.forEach(product => { resetStock[product.id] = product.baseStock; });
    setProductStock(resetStock);
  };

  const randomizeShop = () => {
    generateShopInventory();
    const randomPhrase = mascotPhrases.randomize[Math.floor(Math.random() * mascotPhrases.randomize.length)];
    setMascotMessage(randomPhrase);
  };

  const navigateToPage = (page) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransition(false);
    }, 300);
  };

  const addToCart = (product) => {
    if (productStock[product.id] <= 0) {
      const randomPhrase = mascotPhrases.noStock[Math.floor(Math.random() * mascotPhrases.noStock.length)];
      setMascotMessage(randomPhrase);
      return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems >= CART_MAX_ITEMS) {
      const randomPhrase = mascotPhrases.cartFull[Math.floor(Math.random() * mascotPhrases.cartFull.length)];
      setMascotMessage(randomPhrase);
      return;
    }

    const existing = cart.find(item => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;

    if (currentQty >= productStock[product.id]) {
      const randomPhrase = mascotPhrases.noStock[Math.floor(Math.random() * mascotPhrases.noStock.length)];
      setMascotMessage(randomPhrase);
      return;
    }

    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    const randomPhrase = mascotPhrases.cart[Math.floor(Math.random() * mascotPhrases.cart.length)];
    setMascotMessage(randomPhrase);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    setMascotMessage("Rimosso. Cambiato idea?");
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + change;
        if (newQty > productStock[productId]) {
          setMascotMessage("Stock insufficiente.");
          return item;
        }
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const sanitizeInput = (input) => input.replace(/[<>]/g, '').replace(/javascript:/gi, '').replace(/on\w+=/gi, '').trim().slice(0, 200);
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validateWallet = (wallet) => /^0x[a-fA-F0-9]{40}$/.test(wallet);

  const handleCheckout = (e) => {
    e.preventDefault();

    const sanitizedData = {
      name: sanitizeInput(checkoutData.name),
      email: sanitizeInput(checkoutData.email),
      address: sanitizeInput(checkoutData.address),
      city: sanitizeInput(checkoutData.city),
      zip: sanitizeInput(checkoutData.zip),
      wallet: sanitizeInput(checkoutData.wallet)
    };

    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      setMascotMessage("Nome non valido. Minimo 2 caratteri.");
      return;
    }
    if (!validateEmail(sanitizedData.email)) {
      setMascotMessage("Email non valida. Formato corretto richiesto.");
      return;
    }
    if (!sanitizedData.address || sanitizedData.address.length < 5) {
      setMascotMessage("Indirizzo non valido. Minimo 5 caratteri.");
      return;
    }
    if (!sanitizedData.city || sanitizedData.city.length < 2) {
      setMascotMessage("Città non valida. Minimo 2 caratteri.");
      return;
    }
    if (!/^\d{5}$/.test(sanitizedData.zip)) {
      setMascotMessage("CAP non valido. 5 cifre richieste.");
      return;
    }
    if (!validateWallet(sanitizedData.wallet)) {
      setMascotMessage("Wallet ID non valido. Formato: 0x + 40 caratteri hex.");
      return;
    }

    const newStock = { ...productStock };
    cart.forEach(item => { newStock[item.id] = Math.max(0, newStock[item.id] - item.quantity); });
    setProductStock(newStock);

    const randomPhrase = mascotPhrases.purchase[Math.floor(Math.random() * mascotPhrases.purchase.length)];
    setMascotMessage(randomPhrase);

    setTimeout(() => exitSimulation(), 2000);
  };

  const handleInputChange = (field, value) => {
    setCheckoutData({ ...checkoutData, [field]: value });
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'mystery': return 'rgba(138, 43, 226, 1)'; // Viola scuro/nero con sfumature
      case 'special': return 'rgba(255, 20, 147, 1)';
      case 'legendary': return 'rgba(255, 215, 0, 0.9)';
      case 'epic': return 'rgba(163, 53, 238, 0.9)';
      case 'rare': return 'rgba(0, 149, 255, 0.9)';
      case 'common': return 'rgba(0, 255, 255, 0.7)';
      default: return 'rgba(0, 255, 255, 0.6)';
    }
  };

  const getRarityLabel = (rarity) => {
    const labels = { mystery: '???', special: 'SPECIAL', legendary: 'LEGENDARY', epic: 'EPIC', rare: 'RARE', common: 'COMMON' };
    return labels[rarity] || rarity.toUpperCase();
  };

  if (!simulationActive) {
    return (
      <div className="start-screen">
        <div className="start-content">
          <h1 className="market-title persona-title">FEMO'S<br/>BLACK MARKET</h1>
          <p className="market-subtitle">// DOVE I RUNNER TROVANO IL LORO EQUIPAGGIAMENTO //</p>
          <button className="start-btn persona-btn" onClick={startSimulation}>
            <span className="btn-glitch" data-text="► INIZIA SIMULAZIONE">► INIZIA SIMULAZIONE</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="black-market">
      <div className={`market-content ${pageTransition ? 'page-transition' : ''}`}>
        <div className="market-header persona-header">
          <h1 className="header-title persona-title-small">FEMO'S BLACK MARKET</h1>
          <div className="header-actions">
            {currentPage === 'shop' && (
              <>
                <button className="btn persona-btn" onClick={randomizeShop}>🎲 RANDOMIZZA</button>
                <button className="btn cart-btn persona-btn" onClick={() => navigateToPage('cart')}>
                  🛒 CARRELLO
                  {cart.length > 0 && <span className="cart-count persona-cart-badge">{cart.length}</span>}
                </button>
              </>
            )}
            {currentPage === 'cart' && <button className="btn persona-btn" onClick={() => navigateToPage('shop')}>← SHOP</button>}
            {currentPage === 'checkout' && <button className="btn persona-btn" onClick={() => navigateToPage('cart')}>← CARRELLO</button>}
            <button className="btn btn-danger persona-btn" onClick={exitSimulation}>✕ ESCI</button>
          </div>
        </div>

        {currentPage === 'shop' && (
          <div className="products-section">
            <div className="section-header">
              <h2 className="section-title persona-section-title">// INVENTARIO //</h2>
            </div>
            <div className="products-grid">
              {currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card persona-card"
                  data-rarity={product.rarity}
                  style={{ 
                    color: getRarityColor(product.rarity),
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => {
                    const phrases = mascotPhrases[product.rarity];
                    setMascotMessage(phrases[Math.floor(Math.random() * phrases.length)]);
                  }}
                >
                  <span className="rarity-badge persona-badge" style={{ backgroundColor: getRarityColor(product.rarity), color: '#000', borderColor: getRarityColor(product.rarity) }}>
                    {getRarityLabel(product.rarity)}
                  </span>
                  <div className="stock-badge" style={{ border: `1px solid ${getRarityColor(product.rarity)}`, color: getRarityColor(product.rarity) }}>
                    STOCK: {productStock[product.id]}/{product.maxStock}
                  </div>
                  <div className="product-image">📦</div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.desc}</p>
                    <div className="product-price persona-price">₿{product.price}</div>
                  </div>
                  <button className="add-to-cart-btn persona-btn" onClick={() => addToCart(product)} disabled={productStock[product.id] <= 0}>
                    {productStock[product.id] <= 0 ? '✕ ESAURITO' : '+ AGGIUNGI'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'cart' && (
          <div className="cart-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="section-title persona-section-title">// INVENTARIO RUNNER //</h2>
              <div style={{ color: getTotalItems() >= CART_MAX_ITEMS ? '#ff0055' : '#0ff', fontSize: '1.1rem', fontWeight: '700' }}>
                {getTotalItems()}/{CART_MAX_ITEMS} ITEMS
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">📭</div>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>INVENTARIO VUOTO</p>
                <p style={{ fontSize: '0.9rem' }}>Il runner viaggia leggero...</p>
                <button className="btn persona-btn" style={{ marginTop: '2rem' }} onClick={() => navigateToPage('shop')}>
                  → TORNA AL MERCATO
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={item.id} className="cart-item persona-card" style={{ animationDelay: `${index * 0.05}s` }}>
                      <div className="cart-item-image">
                        📦
                        <div style={{
                          position: 'absolute', bottom: '-5px', right: '-5px', width: '20px', height: '20px',
                          background: getRarityColor(item.rarity), borderRadius: '50%', border: '2px solid #000'
                        }}></div>
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₿{item.price} × {item.quantity}</div>
                        <div style={{ fontSize: '0.75rem', color: getRarityColor(item.rarity), marginTop: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>
                          {getRarityLabel(item.rarity)} • MAX: {item.maxStock}
                        </div>
                      </div>
                      <div className="quantity-controls">
                        <button className="qty-btn persona-btn-small" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn persona-btn-small" onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= productStock[item.id]}>+</button>
                      </div>
                      <button className="remove-btn persona-btn-small" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary persona-summary">
                  <div className="summary-row"><span>SUBTOTALE:</span><span style={{ color: '#0ff' }}>₿{getTotalPrice()}</span></div>
                  <div className="summary-row"><span>TASSA MERCATO NERO:</span><span style={{ color: '#0ff' }}>₿0</span></div>
                  <div className="summary-row"><span>ITEMS TOTALI:</span><span style={{ color: '#0ff' }}>{getTotalItems()}</span></div>
                  <div className="summary-row summary-total"><span>TOTALE:</span><span>₿{getTotalPrice()}</span></div>
                </div>

                <button className="btn persona-btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={() => navigateToPage('checkout')}>
                  → PROCEDI AL TRASFERIMENTO
                </button>
              </>
            )}
          </div>
        )}

        {currentPage === 'checkout' && (
          <div className="cart-section">
            <h2 className="section-title persona-section-title" style={{ marginBottom: '2rem' }}>// PROTOCOLLO TRASFERIMENTO //</h2>

            <form className="checkout-form persona-form" onSubmit={handleCheckout}>
              <div style={{
                background: 'rgba(255, 0, 85, 0.1)', border: '1px solid rgba(255, 0, 85, 0.3)', borderRadius: '4px',
                padding: '1rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)'
              }}>
                ⚠️ ATTENZIONE: Tutti i dati vengono validati. Formato wallet: 0x + 40 caratteri hex.
              </div>

              <div className="form-group">
                <label className="form-label">IDENTITÀ RUNNER</label>
                <input type="text" className="form-input persona-input" value={checkoutData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Nome completo (min. 2 caratteri)" maxLength="200" required />
              </div>

              <div className="form-group">
                <label className="form-label">CANALE COMUNICAZIONE</label>
                <input type="email" className="form-input persona-input" value={checkoutData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="email@domain.com" maxLength="200" required />
              </div>

              <div className="form-group">
                <label className="form-label">COORDINATE DROP-POINT</label>
                <input type="text" className="form-input persona-input" value={checkoutData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Via, numero civico (min. 5 caratteri)" maxLength="200" required />
              </div>

              <div className="form-group">
                <label className="form-label">ZONA OPERATIVA</label>
                <input type="text" className="form-input persona-input" value={checkoutData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="Città (min. 2 caratteri)" maxLength="200" required />
              </div>

              <div className="form-group">
                <label className="form-label">CODICE POSTALE</label>
                <input type="text" className="form-input persona-input" value={checkoutData.zip} onChange={(e) => handleInputChange('zip', e.target.value)} placeholder="12345 (5 cifre)" maxLength="5" pattern="[0-9]{5}" required />
              </div>

              <div className="form-group">
                <label className="form-label">CRYPTO WALLET ID</label>
                <input type="text" className="form-input persona-input" value={checkoutData.wallet} onChange={(e) => handleInputChange('wallet', e.target.value)} placeholder="0x1234567890abcdef1234567890abcdef12345678" maxLength="42" pattern="0x[a-fA-F0-9]{40}" required />
                <div style={{ fontSize: '0.75rem', color: 'rgba(0, 255, 255, 0.6)', marginTop: '0.5rem' }}>
                  Formato: 0x seguito da 40 caratteri esadecimali
                </div>
              </div>

              <div className="cart-summary persona-summary" style={{ marginTop: '2rem' }}>
                <div className="summary-row"><span>ITEMS:</span><span style={{ color: '#0ff' }}>{getTotalItems()}</span></div>
                <div className="summary-row summary-total"><span>TRASFERIMENTO RICHIESTO:</span><span>₿{getTotalPrice()}</span></div>
              </div>

              <button type="submit" className="submit-btn persona-btn">🔒 AUTORIZZA TRANSAZIONE</button>
            </form>
          </div>
        )}

        <div className="mascot-container">
          <div className="mascot-bubble persona-bubble">
            <p className="mascot-text">{mascotMessage}</p>
          </div>
          <div ref={eyeRef}>
            <svg className="mascot-eye" viewBox="0 0 1000 1000" width="120" height="120">
              <defs>
                <filter id="mascotGlow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <clipPath id="mascotClip">
                  <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"/>
                </clipPath>
              </defs>
              <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z" fill="none" stroke="rgba(0, 255, 255, 0.95)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" filter="url(#mascotGlow)"/>
              <g clipPath="url(#mascotClip)">
                <circle cx={pupilPosition.x} cy={pupilPosition.y} r="80" fill="none" stroke="rgba(0, 255, 255, 0.95)" strokeWidth="10" filter="url(#mascotGlow)"/>
                <circle cx={pupilPosition.x} cy={pupilPosition.y} r="35" fill="none" stroke="rgba(0, 255, 255, 0.95)" strokeWidth="8" filter="url(#mascotGlow)"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FemosBlackMarketPage;