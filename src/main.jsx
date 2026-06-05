// Font self-hosted (Orbitron, Share Tech Mono + tutti i font delle SimPages).
// I .woff2 vivono in /public/fonts/. Nessun fetch a Google/CDN esterne.
import './styles/fonts.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerServiceWorker } from './sw-register.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Rimuove il boot splash dell'index.html una volta che React ha montato l'app:
// lo spinner resta visibile per tutto il download/parse del bundle, poi sfuma.
requestAnimationFrame(() => {
  const splash = document.getElementById('boot-splash');
  if (!splash) return;
  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 300);
});

//gestire
registerServiceWorker()