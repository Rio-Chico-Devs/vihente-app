# AGGIORNAMENTO — fix audit performance + qualita' (6 round)

Pacchetto con TUTTI i fix dell'audit tecnico. Copia il contenuto sopra la
root del repo `main` sovrascrivendo (le cartelle rispecchiano i path reali).

## File da ELIMINARE a mano su main (dopo la copia)

```
api/test-email.php                                      (info disclosure)
public/images/Chef.webp                                 (orfano, 100KB)
public/images/Screenshot 2026-05-19 095916_converted.webp  (orfano, 106KB)
public/images/websitesimage.webp                        (orfano, 39KB)
public/site.webmanifest                                 (boilerplate "MyWebSite")
public/web-app-manifest-192x192.png                     (usato solo dal webmanifest orfano)
public/web-app-manifest-512x512.png                     (idem)
```

NB: i tuoi file di appunti su main (ISTRUZIONI.txt ecc.) NON vanno toccati.

## Cosa contiene (sintesi per round)

1. FIX FUNZIONALI — GraficheShowcase: il modal del 10o trofeo non si
   apriva mai (off-by-one nei selettori CSS del radio-hack); ora il modal
   e' un dialog React vero: tastiera, ESC, focus gestito, aria-modal,
   zoom rotella senza scroll della pagina dietro. MultimediaPage: gli
   slot immagine vuoti mostrano un placeholder, non l'icona broken-image.

2. RUNTIME — I 3 canvas di /portfolio si fermano fuori viewport/tab
   nascosta; Cubo3D non accumula piu' catene rAF immortali dopo il drag;
   Black Market e Iris aggiornano le pupille via ref (zero re-render a
   60fps); ScrollingHeader si ferma in pausa e non legge piu' il layout a
   ogni frame; LandingPage non fa girare loop inutili in modalita' 3D;
   GuideContext diviso (un hover non ri-renderizza piu' tutta la pagina);
   CRUD senza 8 backdrop-filter simultanei.

3. SEO — Nuovo RouteMeta: title/description/canonical/robots per tutte le
   35 route + JSON-LD ProfessionalService sulla home. Nuova pagina 404
   con route catch-all (prima: 200 con pagina vuota). h1 aggiunti su
   /services e /portfolio, doppi h1 corretti in 2 sim, /portfolio/sitiweb
   (COMING SOON) tolto dalla sitemap.

4. SERVICE WORKER + BUNDLE — CACHE_VERSION iniettata a build-time
   (scripts/stamp-sw.js, agganciato a npm run build: senza, la cache SW
   cresceva per sempre attraverso i deploy); audio escluso dal SW (prima
   duplicava fino a 26MB in Cache Storage); banner AGGIORNA funzionante
   (niente piu' reload forzato a meta' sessione); validator ridotto da
   ~100KB a ~3KB con deep import; CookieConsent senza doppio round-trip.

5. ASSET — 294KB di file orfani rimossi; font Inter fantasma tolto da
   AvvocatiSim; path fragile di ImageChecker corretto. NUOVO
   scripts/resize-images.sh: da lanciare IN LOCALE (serve cwebp o
   ImageMagick) per ridimensionare le ~35 immagini sovradimensionate
   trovate dall'audit (-4MB circa): prima dry-run, poi --apply.

6. ACCESSIBILITA' — Music player con aria-label e volume da tastiera;
   esito del form contatti annunciato agli screen reader; nuovo toggle
   "Cursore di sistema" in /impostazioni per chi usa cursori ingranditi.

## Dopo la copia

```
node security-audit.js    # 0 FAIL atteso
node integrity-scan.js    # 0 FAIL atteso
npm install               # (validator deep-import non richiede pacchetti nuovi)
npm run build             # ora include lo stamp del service worker
bash scripts/resize-images.sh          # dry-run immagini
bash scripts/resize-images.sh --apply  # resize vero (fai commit prima!)
```
