import { Link } from 'react-router-dom';
import './NotFound.css';

/*
 * Pagina 404 per la route catch-all. Prima qualunque URL sbagliato
 * restituiva 200 con un <main> vuoto (soft-404): pessimo per gli utenti
 * e per i crawler. Il noindex arriva da RouteMeta (path sconosciuto).
 */
const NotFound = () => (
  <section className="notfound-section">
    <div className="notfound-box">
      <p className="notfound-code" aria-hidden="true">404</p>
      <h1 className="notfound-title">Pagina non trovata</h1>
      <p className="notfound-text">
        L'indirizzo che hai digitato non esiste, oppure la pagina è stata spostata.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="notfound-link">← Torna alla home</Link>
        <Link to="/portfolio" className="notfound-link notfound-link--ghost">Guarda il portfolio</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
