import { useState, useEffect, useMemo, useCallback } from 'react';
import './CRUDSimulatorPage.css';

const CRUDSimulatorPage = () => {
  // Memory limit in bytes (500KB default)
  const MEMORY_LIMIT = useMemo(() => 500 * 1024, []);
  
  // Initial sample data
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'Laptop Dell XPS 15', 
      category: 'Elettronica',
      quantity: 25,
      warehouse: 'Magazzino A',
      price: 1299.99,
      supplier: 'Dell Italia',
      lastUpdate: new Date().toISOString()
    },
    { 
      id: 2, 
      name: 'Mouse Logitech MX Master', 
      category: 'Periferiche',
      quantity: 150,
      warehouse: 'Magazzino B',
      price: 89.99,
      supplier: 'Logitech',
      lastUpdate: new Date().toISOString()
    },
    { 
      id: 3, 
      name: 'Monitor Samsung 27"', 
      category: 'Elettronica',
      quantity: 45,
      warehouse: 'Magazzino A',
      price: 329.99,
      supplier: 'Samsung',
      lastUpdate: new Date().toISOString()
    },
    { 
      id: 4, 
      name: 'Tastiera Meccanica RGB', 
      category: 'Periferiche',
      quantity: 8,
      warehouse: 'Magazzino C',
      price: 159.99,
      supplier: 'Corsair',
      lastUpdate: new Date().toISOString()
    }
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Elettronica',
    quantity: 0,
    warehouse: 'Magazzino A',
    price: 0,
    supplier: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [memoryWarning, setMemoryWarning] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    warehouse: 'Tutti',
    sortBy: 'id-asc'
  });

  // Get unique warehouses for filter
  const warehouses = useMemo(() => {
    const unique = [...new Set(items.map(item => item.warehouse))];
    return ['Tutti', ...unique];
  }, [items]);

  // Calculate memory usage
  const memoryUsage = useMemo(() => {
    const dataString = JSON.stringify(items);
    const bytes = new Blob([dataString]).size;
    return {
      bytes,
      kb: (bytes / 1024).toFixed(2),
      percentage: ((bytes / MEMORY_LIMIT) * 100).toFixed(1),
      limitKb: (MEMORY_LIMIT / 1024).toFixed(0)
    };
  }, [items, MEMORY_LIMIT]);

  // Reset system function
  const resetSystem = useCallback(() => {
    setItems([]);
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Elettronica',
      quantity: 0,
      warehouse: 'Magazzino A',
      price: 0,
      supplier: ''
    });
    setShowForm(false);
    setMemoryWarning(false);
    showNotification('🔄 Sistema resettato con successo!', 'success');
  }, []);

  // Check memory limit
  useEffect(() => {
    const percentage = parseFloat(memoryUsage.percentage);
    
    if (memoryUsage.bytes >= MEMORY_LIMIT) {
      showNotification('⚠️ Limite memoria raggiunto! Sistema resettato.', 'error');
      setTimeout(() => {
        resetSystem();
      }, 2000);
    } else if (percentage >= 80 && !memoryWarning) {
      setMemoryWarning(true);
      showNotification(`⚠️ Memoria quasi piena! (${percentage}%)`, 'warning');
    } else if (percentage < 80 && memoryWarning) {
      setMemoryWarning(false);
    }
  }, [memoryUsage.bytes, memoryUsage.percentage, MEMORY_LIMIT, memoryWarning, resetSystem]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search filter (minimum 3 characters)
    if (filters.search.length >= 3) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(item => {
        const searchableText = `${item.id} ${item.name} ${item.category} ${item.quantity} ${item.warehouse} ${item.price} ${item.supplier}`.toLowerCase();
        return searchableText.includes(searchLower);
      });
    }

    // Warehouse filter
    if (filters.warehouse !== 'Tutti') {
      result = result.filter(item => item.warehouse === filters.warehouse);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'quantity-asc':
          return a.quantity - b.quantity;
        case 'quantity-desc':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

    return result;
  }, [items, filters]);

  const handleCreate = () => {
    if (!formData.name || formData.quantity < 0) {
      showNotification('⚠️ Compila tutti i campi obbligatori!', 'error');
      return;
    }

    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      ...formData,
      lastUpdate: new Date().toISOString()
    };

    setItems([...items, newItem]);
    setFormData({
      name: '',
      category: 'Elettronica',
      quantity: 0,
      warehouse: 'Magazzino A',
      price: 0,
      supplier: ''
    });
    setShowForm(false);
    showNotification('✓ Prodotto aggiunto al magazzino!', 'success');
  };

  const handleUpdate = () => {
    if (!formData.name || formData.quantity < 0) {
      showNotification('⚠️ Compila tutti i campi obbligatori!', 'error');
      return;
    }

    setItems(items.map(item =>
      item.id === editingId 
        ? { ...item, ...formData, lastUpdate: new Date().toISOString() } 
        : item
    ));
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Elettronica',
      quantity: 0,
      warehouse: 'Magazzino A',
      price: 0,
      supplier: ''
    });
    showNotification('✓ Prodotto aggiornato!', 'success');
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    showNotification('✓ Prodotto rimosso dal magazzino!', 'success');
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      warehouse: item.warehouse,
      price: item.price,
      supplier: item.supplier
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Elettronica',
      quantity: 0,
      warehouse: 'Magazzino A',
      price: 0,
      supplier: ''
    });
    setShowForm(false);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalValue = filteredAndSortedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQuantity = filteredAndSortedItems.reduce((sum, item) => sum + item.quantity, 0);
    const lowStock = filteredAndSortedItems.filter(item => item.quantity < 10).length;
    
    return {
      totalProducts: filteredAndSortedItems.length,
      totalQuantity,
      totalValue: totalValue.toFixed(2),
      lowStock
    };
  }, [filteredAndSortedItems]);

  return (
    <div className="crud-simulator-page">
      <div className="crud-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3 className="filters-title">🔍 FILTRI</h3>
          </div>

          {/* Search */}
          <div className="filter-group">
            <label className="filter-label">Ricerca Globale</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Min 3 caratteri..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            {filters.search.length > 0 && filters.search.length < 3 && (
              <span className="filter-hint">Inserisci almeno 3 caratteri</span>
            )}
          </div>

          {/* Warehouse Filter */}
          <div className="filter-group">
            <label className="filter-label">Magazzino</label>
            <select
              className="filter-select"
              value={filters.warehouse}
              onChange={(e) => setFilters({ ...filters, warehouse: e.target.value })}
            >
              {warehouses.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="filter-group">
            <label className="filter-label">Ordinamento</label>
            <select
              className="filter-select"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <optgroup label="ID">
                <option value="id-asc">ID ↑ Crescente</option>
                <option value="id-desc">ID ↓ Decrescente</option>
              </optgroup>
              <optgroup label="Nome">
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </optgroup>
              <optgroup label="Prezzo">
                <option value="price-asc">Prezzo ↑ Basso-Alto</option>
                <option value="price-desc">Prezzo ↓ Alto-Basso</option>
              </optgroup>
              <optgroup label="Quantità">
                <option value="quantity-asc">Quantità ↑ Crescente</option>
                <option value="quantity-desc">Quantità ↓ Decrescente</option>
              </optgroup>
            </select>
          </div>

          {/* Active Filters Info */}
          <div className="active-filters">
            <div className="active-filter-item">
              <span className="filter-badge">
                {filteredAndSortedItems.length} / {items.length}
              </span>
              <span className="filter-text">Prodotti visualizzati</span>
            </div>
            {(filters.search.length >= 3 || filters.warehouse !== 'Tutti') && (
              <button 
                className="btn-clear-filters"
                onClick={() => setFilters({ search: '', warehouse: 'Tutti', sortBy: filters.sortBy })}
              >
                ✕ Pulisci Filtri
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="crud-wrapper">
          {/* Header */}
          <div className="crud-header">
            <h1 className="crud-title">GESTIONALE LOGISTICO</h1>
            <p className="crud-subtitle">Simulatore Magazzino • Memory Tracking</p>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* Memory Monitor */}
          <div className="memory-monitor">
            <div className="memory-header">
              <span className="memory-label">💾 Memoria Utilizzata</span>
              <span className="memory-value">
                {memoryUsage.kb} KB / {memoryUsage.limitKb} KB
                <span className="memory-percentage"> ({memoryUsage.percentage}%)</span>
              </span>
            </div>
            <div className="memory-bar">
              <div 
                className={`memory-fill ${memoryUsage.percentage >= 80 ? 'warning' : ''} ${memoryUsage.percentage >= 95 ? 'critical' : ''}`}
                style={{ width: `${Math.min(memoryUsage.percentage, 100)}%` }}
              />
            </div>
            <div className="memory-info">
              <span className="memory-detail">📦 {items.length} prodotti in memoria</span>
              <button className="btn-reset" onClick={resetSystem} title="Reset Sistema">
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Actions & Stats */}
          <div className="crud-actions">
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Prodotti</span>
                <span className="stat-value">{stats.totalProducts}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pezzi Totali</span>
                <span className="stat-value">{stats.totalQuantity}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Valore €</span>
                <span className="stat-value">{stats.totalValue}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Scorte Basse</span>
                <span className="stat-value stat-warning">{stats.lowStock}</span>
              </div>
            </div>
            {!showForm && (
              <button className="btn btn-success" onClick={() => setShowForm(true)}>
                + Nuovo Prodotto
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <div className="form-section">
              <h2 className="form-title">
                {editingId ? '✏ Modifica Prodotto' : '+ Nuovo Prodotto'}
              </h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nome Prodotto *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome del prodotto"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Elettronica">Elettronica</option>
                    <option value="Periferiche">Periferiche</option>
                    <option value="Accessori">Accessori</option>
                    <option value="Software">Software</option>
                    <option value="Networking">Networking</option>
                    <option value="Storage">Storage</option>
                    <option value="Audio/Video">Audio/Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Magazzino</label>
                  <select
                    className="form-select"
                    value={formData.warehouse}
                    onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                  >
                    <option value="Magazzino A">Magazzino A</option>
                    <option value="Magazzino B">Magazzino B</option>
                    <option value="Magazzino C">Magazzino C</option>
                    <option value="Deposito Centrale">Deposito Centrale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantità *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Prezzo Unitario €</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fornitore</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="Nome fornitore"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn" onClick={cancelEdit}>
                  Annulla
                </button>
                <button
                  className="btn btn-success"
                  onClick={editingId ? handleUpdate : handleCreate}
                >
                  {editingId ? 'Aggiorna' : 'Crea'}
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="data-table">
            <div className="table-header">
              <div className="table-header-cell">ID</div>
              <div className="table-header-cell">Prodotto</div>
              <div className="table-header-cell">Categoria</div>
              <div className="table-header-cell">Quantità</div>
              <div className="table-header-cell">Magazzino</div>
              <div className="table-header-cell">Prezzo €</div>
              <div className="table-header-cell">Valore Tot €</div>
              <div className="table-header-cell">Azioni</div>
            </div>
            <div className="table-body">
              {filteredAndSortedItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <p className="empty-state-text">
                    {filters.search.length >= 3 || filters.warehouse !== 'Tutti' 
                      ? 'Nessun prodotto trovato con questi filtri' 
                      : 'Nessun prodotto in magazzino'}
                  </p>
                  <p className="empty-state-subtext">
                    {filters.search.length >= 3 || filters.warehouse !== 'Tutti'
                      ? 'Prova a modificare i filtri di ricerca'
                      : 'Aggiungi il primo prodotto per iniziare'}
                  </p>
                </div>
              ) : (
                filteredAndSortedItems.map(item => (
                  <div key={item.id} className="table-row">
                    <div className="table-cell" data-label="ID">
                      <span className="id-badge">#{item.id}</span>
                    </div>
                    <div className="table-cell" data-label="Prodotto">
                      <strong>{item.name}</strong>
                      {item.supplier && (
                        <span className="supplier-tag">{item.supplier}</span>
                      )}
                    </div>
                    <div className="table-cell" data-label="Categoria">
                      {item.category}
                    </div>
                    <div className="table-cell" data-label="Quantità">
                      <span className={`quantity-badge ${item.quantity < 10 ? 'low-stock' : ''}`}>
                        {item.quantity} pz
                      </span>
                    </div>
                    <div className="table-cell" data-label="Magazzino">
                      {item.warehouse}
                    </div>
                    <div className="table-cell" data-label="Prezzo">
                      €{item.price.toFixed(2)}
                    </div>
                    <div className="table-cell" data-label="Valore Totale">
                      <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <div className="table-cell table-actions" data-label="Azioni">
                      <button
                        className="icon-btn"
                        onClick={() => startEdit(item)}
                        title="Modifica"
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => handleDelete(item.id)}
                        title="Elimina"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRUDSimulatorPage;
