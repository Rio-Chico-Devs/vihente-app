import '@fontsource/share-tech-mono/400.css';
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/orbitron/900.css';

// vanilla-cookieconsent CSS è già importato dentro CookieConsent.jsx (lazy chunk).
// Toglierlo da qui evita di trascinarlo nel main bundle.

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

//gestire 
registerServiceWorker()