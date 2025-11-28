import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CRUDSimulatorPage.css';

const CRUDSimulatorPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'User Alpha', email: 'alpha@cyber.net', status: 'active' },
    { id: 2, name: 'User Beta', email: 'beta@tech.io', status: 'active' },
    { id: 3, name: 'User Gamma', email: 'gamma@digital.com', status: 'inactive' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'active' });
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = () => {
    if (!formData.name || !formData.email) {
      showNotification('Compila tutti i campi!', 'error');
      return;
    }
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      ...formData
    };
    setItems([...items, newItem]);
    setFormData({ name: '', email: '', status: 'active' });
    setShowForm(false);
    showNotification('✓ Elemento creato con successo!');
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.email) {
      showNotification('Compila tutti i campi!', 'error');
      return;
    }
    setItems(items.map(item =>
      item.id === editingId ? { ...item, ...formData } : item
    ));
    setEditingId(null);
    setFormData({ name: '', email: '', status: 'active' });
    showNotification('✓ Elemento aggiornato!');
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    showNotification('✓ Elemento eliminato!');
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, email: item.email, status: item.status });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', status: 'active' });
    setShowForm(false);
  };

  return (
    <div className="crud-simulator-page">
      {/* Back button */}
      <button className="back-to-showcase" onClick={() => navigate('/portfolio/componenti')}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span>Torna alla Showcase</span>
      </button>

      <div className="crud-container">
        <div className="crud-wrapper">
          {/* Header */}
          <div className="crud-header">
            <h1 className="crud-title">CRUD OPERATIONS</h1>
            <p className="crud-subtitle">Create • Read • Update • Delete</p>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* Actions & Stats */}
          <div className="crud-actions">
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Total Records</span>
                <span className="stat-value">{items.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active</span>
                <span className="stat-value">
                  {items.filter(i => i.status === 'active').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Inactive</span>
                <span className="stat-value">
                  {items.filter(i => i.status === 'inactive').length}
                </span>
              </div>
            </div>
            {!showForm && (
              <button className="btn btn-success" onClick={() => setShowForm(true)}>
                + Nuovo Record
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <div className="form-section">
              <h2 className="form-title">
                {editingId ? '✏ Modifica Record' : '+ Nuovo Record'}
              </h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Inserisci nome..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Inserisci email..."
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
              <div className="table-header-cell">Nome</div>
              <div className="table-header-cell">Email</div>
              <div className="table-header-cell">Status</div>
              <div className="table-header-cell">Azioni</div>
            </div>
            <div className="table-body">
              {items.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <p className="empty-state-text">Nessun record presente</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="table-row">
                    <div className="table-cell" data-label="ID">
                      #{item.id}
                    </div>
                    <div className="table-cell" data-label="Nome">
                      {item.name}
                    </div>
                    <div className="table-cell" data-label="Email">
                      {item.email}
                    </div>
                    <div className="table-cell" data-label="Status">
                      <span className={`status-badge status-${item.status}`}>
                        {item.status}
                      </span>
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
