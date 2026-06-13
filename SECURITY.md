# SECURITY — Vihente

Stato baseline: **0 FAIL** su `security-audit.js` (27 PASS) e `integrity-scan.js` (138 file).

## Gate prima di ogni merge

```
node security-audit.js     # → deve uscire con 0
node integrity-scan.js     # → deve uscire con 0
```

Se uno dei due esce diverso da 0, **non si merge**. Punto.

## Cosa proteggiamo

Sito statico (React+Vite) servito da Apache su Hostinger, con un piccolo
backend PHP per il form contatti (`api/contact.php`) e un visualizzatore log
ad accesso riservato (`api/view-logs.php`). Niente database, niente auth utente,
niente sessioni utente lato app.

Dati personali trattati: solo quelli che l'utente scrive nel form contatti
(nome, email, messaggio) e il suo IP, che finiscono in email + `contacts.log`
sul server. Vedi `THREAT-MODEL.md` per i vettori e le contromisure punto-punto.

## Baseline applicata (sintesi)

**Header HTTP** (`public/.htaccess`, l'unica fonte di verità):

- CSP severa: `default-src 'none'`, `script-src 'self'` (zero `unsafe-inline`,
  zero `unsafe-eval`, zero wildcard, zero terze parti), `frame-ancestors 'none'`,
  `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `upgrade-insecure-requests`. Unica eccezione documentata:
  `style-src 'self' 'unsafe-inline'` per i due `<style>` inline (boot splash
  in `index.html` e il blocco dinamico della LandingPage che interpola i
  colori del tema). Nessun sink CSS riceve input utente.
- HSTS: `max-age=63072000; includeSubDomains; preload` (2 anni, eleggibile per
  hstspreload.org).
- `X-Content-Type-Options: nosniff`.
- `X-XSS-Protection: 0` (l'header legacy è deprecato nel 2026 e in alcuni casi
  introduce falle: lo disattiviamo esplicitamente).
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy`: tutte le API potenti spente tranne `autoplay=(self)` e
  `fullscreen=(self)`.
- COOP `same-origin`, CORP `same-origin`.
- `X-Frame-Options: DENY` (ridondante con frame-ancestors, utile per legacy).
- `X-Powered-By` / `Server` rimossi.

**Front-end (`src/`)**:

- Zero `innerHTML`, zero `eval`, zero `new Function`, zero `document.write`,
  zero `dangerouslySetInnerHTML`, zero handler `on*` inline.
- Zero font/script/CSS da terze parti (Google Fonts compreso): tutto self-hostato
  in `/public/fonts`.
- Dipendenze runtime ridotte a 5: `react`, `react-dom`, `react-router-dom`,
  `validator`, `vanilla-cookieconsent`. Allowlist rigida in `security-audit.js`.
- Nessuna dipendenza superflua (rimosse `lucide-react` e `dompurify` perché
  dichiarate e mai usate: superficie supply-chain inutile).

**Backend PHP (`api/`)**:

- `api/test-email.php` rimosso (file di test mai eliminato).
- `api/view-logs.php`: auth fail-closed via hash in variabile d'ambiente
  `VIHENTE_LOGS_HASH` (mai password in chiaro nel codice o nella query string),
  sessione con cookie `HttpOnly+Secure+SameSite=Strict`, CSRF token su tutte
  le POST.
- `api/contact.php`: anti email-header injection (CRLF strippato dai valori
  che finiscono in Subject/Reply-To), anti log injection (CRLF strippato dai
  campi prima di scrivere su file), rate-limit file-based per IP (non più
  aggirabile non mandando il cookie), `phpversion()` non più esposto.
- `api/.htaccess`: whitelist degli endpoint reali, `.log`/`.bak` non
  scaricabili via HTTP, `Cache-Control: no-store` sulle risposte API.

**Byte-level**:

- Tutti i sorgenti sono UTF-8 valido, ASCII-only nei nomi file e nei path.
- Nessun BiDi control, zero-width, non-character, PUA, tag character.
- Nessun confusable (Cirillico/Greco/Armeno/Cherokee/Coptic) negli
  identificatori.

## Non fidarti dell'AI: come verificare TU

Tutto quello che ti dico qui sotto è eseguibile localmente, senza credermi
sulla parola, senza CI, senza tool esterni.

### 1. Diff leggibile, zero offuscamento

Ogni modifica della baseline è arrivata in un commit Git separato e leggibile.
Per vedere esattamente cosa ha toccato l'AI rispetto a un punto noto-buono:

```
git diff <commit-base>..HEAD -- public/.htaccess api/ src/sw-register.js \
    security-audit.js integrity-scan.js package.json index.html
```

Se vedi minificazione, codice generato, base64 grossi, **fermati**: la
baseline impone diff leggibili.

### 2. Zero step di build per gli audit (what-you-read-is-what-runs)

`security-audit.js` e `integrity-scan.js` usano solo i moduli core di Node
(`fs`, `path`). Nessuna `import` esterna, nessun `npm install` richiesto.
Apri i due file e leggili: ~270 righe in tutto, niente regex offuscate,
niente eval. Quello che leggi è esattamente quello che gira.

### 3. Verifica indipendente degli header in produzione

Dopo il deploy, prendi un secondo parere da servizi indipendenti — non da me:

- https://securityheaders.com/?q=https://vihente.it — atteso **A o A+**.
- https://csp-evaluator.withgoogle.com/ — incolla la CSP, atteso 0 high
  severity.
- https://www.ssllabs.com/ssltest/ — atteso **A+** con HSTS preload-eligible.
- https://hstspreload.org/?domain=vihente.it — se vuoi entrare nella
  preload list dei browser.
- https://hardenize.com/ — report completo (DNS, TLS, email, header).
- https://internet.nl/ — secondo parere europeo, copre IPv6 e DNSSEC.
- DMARC/SPF/DKIM: https://www.mail-tester.com/, https://mxtoolbox.com/.

### 4. Verifica indipendente del codice

```
git grep -nE "innerHTML|dangerouslySetInnerHTML|\beval\(|new Function\(|document\.write"
git grep -nE "fonts\.googleapis|fonts\.gstatic"
git grep -n "dompurify\|lucide-react"
```

I primi due devono restituire **zero match nel codice di produzione** (i
match in `security-audit.js` e in questo file sono solo nomi nelle stringhe
di controllo). Il terzo zero match ovunque.

### 5. Prompt injection contro l'AI

Una AI può essere compromessa via prompt injection: contenuto malevolo in
una issue, in un commento di codice, in un README importato, può convincere
l'AI a riaprire un buco (rimuovere un audit, aggiungere `unsafe-inline`,
introdurre una dipendenza non in allowlist).

**La difesa è il gate.** Anche se l'AI provasse a riaprire un buco:

- togliere `unsafe-inline` o aggiungere wildcard alla CSP → `security-audit.js`
  va in FAIL.
- aggiungere una dipendenza fuori allowlist → FAIL.
- reintrodurre `innerHTML`/`eval` → FAIL.
- reintrodurre `test-email.php` → FAIL.
- mettere la password in chiaro nel sorgente → FAIL.
- inserire un BiDi/confusable nei sorgenti → `integrity-scan.js` FAIL.

Tieni questi due audit dentro la CI (anche solo un workflow GitHub Actions di
4 righe che lancia `node security-audit.js && node integrity-scan.js`) e
nessuna PR può unirsi se non passano. La baseline si protegge da sola.

### 6. Variabile d'ambiente per `view-logs.php`

L'auth del log viewer non si attiva finché non imposti
`VIHENTE_LOGS_HASH`. Genera l'hash una volta:

```
php -r "echo password_hash('LA_TUA_PASSWORD_FORTE', PASSWORD_DEFAULT), PHP_EOL;"
```

Mettilo nel pannello Hostinger → Avanzate → Variabili di ambiente. Senza
questa variabile, il viewer risponde 503 (fail-closed). La password non sta
**mai** nel repo.

## Cosa NON copre questa baseline (limiti onesti)

- **Email DKIM/SPF/DMARC**: vanno configurati nel DNS del dominio
  `vihente.it`, non nel repo. Verifica con i tool del paragrafo 3.
- **DNSSEC / CAA**: stessa cosa, è configurazione DNS lato registrar/CDN.
- **WAF/anti-DDoS**: Hostinger ha un WAF base. Se l'esposizione cresce,
  valutare Cloudflare davanti.
- **Vulnerabilità del runtime PHP / mod_php**: pacchetti gestiti
  dall'hosting. Tieni d'occhio le release note di Hostinger.
- **Service Worker** (`public/sw.js`): cacha gli asset statici, quindi un
  asset compromesso resta cached. La CSP severa limita molto i danni di un
  asset compromesso, ma in caso di incident bisogna bumpare `CACHE_VERSION`
  e attendere l'auto-reload.
