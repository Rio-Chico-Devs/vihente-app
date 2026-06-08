// VIHENTE APP - Service Worker Registration
// Registra e gestisce il ciclo di vita del Service Worker

/**
 * Registra il Service Worker
 * Chiamare questa funzione all'avvio dell'app
 */
export function registerServiceWorker() {
  // Verifica se il browser supporta Service Workers
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker non supportato in questo browser');
    return;
  }

  // Registra il SW solo in produzione
  if (import.meta.env.DEV) {
    console.log('[SW] Service Worker disabilitato in development');
    return;
  }

  // Aspetta che la pagina sia completamente caricata
  window.addEventListener('load', () => {
    const swPath = `${import.meta.env.BASE_URL}sw.js`;

    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log('[SW] ✅ Service Worker registrato con successo:', registration.scope);

        // Controlla aggiornamenti ogni ora
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Gestisci aggiornamenti del SW
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[SW] 🔄 Nuova versione trovata, installazione in corso...');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nuovo SW installato ma quello vecchio è ancora attivo
              console.log('[SW] ✨ Nuova versione disponibile! Ricarica la pagina per aggiornare.');

              // Mostra notifica all'utente (opzionale)
              showUpdateNotification(registration);
            }
          });
        });
      })
      .catch((error) => {
        console.error('[SW] ❌ Registrazione fallita:', error);
      });

    // Ascolta messaggi dal SW
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] 📨 Messaggio ricevuto dal Service Worker:', event.data);
    });

    // Gestisci il controller change (nuovo SW attivo)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] 🔄 Service Worker aggiornato, ricarico la pagina...');
      // Ricarica automaticamente quando il nuovo SW prende il controllo
      window.location.reload();
    });
  });
}

/**
 * Mostra una notifica all'utente quando c'è un aggiornamento disponibile
 */
function showUpdateNotification(registration) {
  // Costruito interamente con DOM API + proprieta' .style (coperte dalla CSP
  // senza 'unsafe-inline') e Web Animations API: nessun innerHTML, nessun
  // tag <style> iniettato, nessun handler on* inline. ASCII puro.
  const banner = document.createElement('div');
  Object.assign(banner.style, {
    position: 'fixed', bottom: '20px', right: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white', padding: '16px 24px', borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', zIndex: '10000',
    fontFamily: "'Share Tech Mono', monospace",
    display: 'flex', gap: '12px', alignItems: 'center',
  });

  const label = document.createElement('span');
  label.textContent = 'Nuova versione disponibile';

  const updateBtn = document.createElement('button');
  updateBtn.type = 'button';
  updateBtn.textContent = 'AGGIORNA';
  Object.assign(updateBtn.style, {
    background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
    fontFamily: "'Share Tech Mono', monospace", fontWeight: 'bold',
  });

  const dismissBtn = document.createElement('button');
  dismissBtn.type = 'button';
  dismissBtn.setAttribute('aria-label', 'Chiudi');
  dismissBtn.textContent = 'X';
  Object.assign(dismissBtn.style, {
    background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.7)',
    padding: '8px', cursor: 'pointer', fontSize: '18px',
  });

  banner.append(label, updateBtn, dismissBtn);
  document.body.appendChild(banner);

  const slide = [
    { transform: 'translateX(400px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ];
  banner.animate(slide, { duration: 300, easing: 'ease-out' });

  updateBtn.addEventListener('click', () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  });

  dismissBtn.addEventListener('click', () => {
    const out = banner.animate(slide, { duration: 300, easing: 'ease-out', direction: 'reverse' });
    out.onfinish = () => banner.remove();
  });
}

/**
 * Disregistra il Service Worker (per debug)
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[SW] Service Worker disregistrato');
      })
      .catch((error) => {
        console.error('[SW] Errore durante la disregistrazione:', error);
      });
  }
}

/**
 * Ottieni informazioni sulla cache
 */
export async function getCacheInfo() {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  const registration = await navigator.serviceWorker.ready;

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      resolve(event.data);
    };

    registration.active?.postMessage(
      { type: 'GET_CACHE_INFO' },
      [messageChannel.port2]
    );
  });
}

/**
 * Pulisci tutta la cache
 */
export async function clearCache() {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      resolve(event.data.success);
    };

    registration.active?.postMessage(
      { type: 'CLEAR_CACHE' },
      [messageChannel.port2]
    );
  });
}
