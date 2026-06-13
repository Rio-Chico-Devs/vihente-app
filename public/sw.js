// VIHENTE APP - Service Worker
// Gestisce cache degli asset e supporto offline

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `vihente-app-${CACHE_VERSION}`;

// Asset critici da cachare immediatamente all'installazione
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Pattern per identificare asset da cachare
const CACHE_PATTERNS = {
  // JS, CSS, font, immagini
  static: /\.(js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/,
  // Endpoint API: MAI cachare. Le risposte possono contenere dati personali
  // (view-logs.php e' autenticato, contact.php e' POST ma le GET di errore
  // non devono finire in Cache Storage che ignora Cache-Control: no-store).
  api: /\/api\//
};

// ==========================================
// INSTALLAZIONE SERVICE WORKER
// ==========================================
// Viene eseguito quando il SW viene installato per la prima volta
// o quando c'è una nuova versione
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cacha gli asset critici
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        // Forza il nuovo SW ad attivarsi immediatamente
        return self.skipWaiting();
      })
      .catch(() => {})
  );
});

// ==========================================
// ATTIVAZIONE SERVICE WORKER
// ==========================================
// Viene eseguito quando il SW diventa attivo
// Qui puliamo le cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Trova tutte le cache vecchie
        const oldCaches = cacheNames.filter((name) => {
          return name.startsWith('vihente-app-') && name !== CACHE_NAME;
        });

        // Elimina le cache vecchie
        return Promise.all(
          oldCaches.map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        // Prendi il controllo di tutte le pagine immediatamente
        return self.clients.claim();
      })
      .catch(() => {})
  );
});

// ==========================================
// INTERCETTAZIONE RICHIESTE (FETCH)
// ==========================================
// Questo è il cuore del SW: intercetta TUTTE le richieste di rete
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET (POST, PUT, DELETE)
  if (request.method !== 'GET') {
    return;
  }

  // Ignora richieste a domini esterni: i font sono self-hostati,
  // non serve nessuna eccezione.
  if (url.origin !== location.origin) {
    return;
  }

  // Mai cachare le API: fail-through al network senza toccare la cache.
  if (CACHE_PATTERNS.api.test(url.pathname)) {
    return;
  }

  // ==========================================
  // STRATEGIA: Cache First, Network Fallback
  // ==========================================
  // Cerca prima nella cache, se non trova scarica dalla rete
  // Perfetto per: JS, CSS, immagini, font (asset statici)

  if (CACHE_PATTERNS.static.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Non in cache: scarica dalla rete
          return fetch(request)
            .then((networkResponse) => {
              // Salva in cache per il prossimo utilizzo
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                  });
              }
              return networkResponse;
            })
            .catch(() => {
              // Asset statico mancante e offline: NON tornare /index.html
              // (creerebbe un MIME mismatch quando il browser si aspetta JS/CSS
              // e riceve HTML). Meglio un 503 vuoto: l'app gestisce il fallimento.
              return new Response('', { status: 503, statusText: 'Offline' });
            });
        })
    );
    return;
  }

  // ==========================================
  // STRATEGIA: Network First, Cache Fallback
  // ==========================================
  // Prova prima dalla rete, se fallisce usa la cache
  // Perfetto per: HTML, dati dinamici

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Aggiorna cache con la nuova versione
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
        }
        return networkResponse;
      })
      .catch(() => {
        // Rete non disponibile: usa cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback finale: pagina offline
            return caches.match('/index.html');
          });
      })
  );
});

// ==========================================
// MESSAGGI DAL CLIENT
// ==========================================
// Permette alla pagina di comunicare con il SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // Risposta con info cache
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((keys) => {
        event.ports[0].postMessage({
          cacheSize: keys.length,
          cacheName: CACHE_NAME
        });
      });
    });
  }

  // Pulisci cache su richiesta
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});
