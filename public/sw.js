// VIHENTE APP - Service Worker
// Gestisce cache degli asset e supporto offline

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `vihente-app-${CACHE_VERSION}`;

// Asset critici da cachare immediatamente all'installazione
const CRITICAL_ASSETS = [
  '/vihente-app/',
  '/vihente-app/index.html',
  '/vihente-app/manifest.json'
];

// Pattern per identificare asset da cachare
const CACHE_PATTERNS = {
  // JS, CSS, font, immagini
  static: /\.(js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/,
  // API calls (se necessario)
  api: /\/api\//
};

// ==========================================
// INSTALLAZIONE SERVICE WORKER
// ==========================================
// Viene eseguito quando il SW viene installato per la prima volta
// o quando c'è una nuova versione
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...', CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        // Cacha gli asset critici
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        // Forza il nuovo SW ad attivarsi immediatamente
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// ==========================================
// ATTIVAZIONE SERVICE WORKER
// ==========================================
// Viene eseguito quando il SW diventa attivo
// Qui puliamo le cache vecchie
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...', CACHE_VERSION);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Trova tutte le cache vecchie
        const oldCaches = cacheNames.filter((name) => {
          return name.startsWith('vihente-app-') && name !== CACHE_NAME;
        });

        // Elimina le cache vecchie
        console.log('[SW] Deleting old caches:', oldCaches);
        return Promise.all(
          oldCaches.map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        // Prendi il controllo di tutte le pagine immediatamente
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Activation failed:', error);
      })
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

  // Ignora richieste a domini esterni (tranne font CDN)
  if (url.origin !== location.origin && !url.hostname.includes('fonts')) {
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
            console.log('[SW] Cache HIT:', url.pathname);
            return cachedResponse;
          }

          // Non in cache: scarica dalla rete
          console.log('[SW] Cache MISS, fetching:', url.pathname);
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
            .catch((error) => {
              console.error('[SW] Fetch failed:', error);
              // Ritorna una risposta offline di fallback se disponibile
              return caches.match('/vihente-app/index.html');
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
        console.log('[SW] Network failed, using cache:', url.pathname);
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback finale: pagina offline
            return caches.match('/vihente-app/index.html');
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
