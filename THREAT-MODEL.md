# THREAT MODEL — Vihente

Catalogo dei vettori d'attacco rilevanti per **questo** sito (SPA statica +
backend PHP minimale su Hostinger), con stato attuale e contromisura. Aggiornato
giugno 2026.

Legenda stato:
- ✅ **mitigato** = contromisura attiva e verificata da un audit.
- 🟡 **parziale** = mitigato in parte; limiti spiegati.
- 🔵 **fuori scope** = non rilevante per l'architettura attuale.

---

## 1. Codice / app (XSS e DOM injection)

| Vettore | Stato | Contromisura |
|---|---|---|
| XSS riflesso/stored via `innerHTML` | ✅ | Zero `innerHTML` nel codice. L'ex banner SW è stato riscritto con DOM API. Audit: regex `innerHTML\|outerHTML\|dangerouslySetInnerHTML\|insertAdjacentHTML`. |
| `eval` / `new Function` / `document.write` | ✅ | Zero occorrenze. Audit blocca. |
| `dangerouslySetInnerHTML` in React | ✅ | Zero occorrenze. React escapa di default tutto il resto. |
| Handler inline `on*=` in JSX | ✅ | Solo handler come prop React (non stringhe HTML). |
| `<script>` inline | ✅ | CSP `script-src 'self'` blocca qualsiasi inline script (sia nuovo che eventuale injection). |
| `javascript:`/`data:` come `src`/`href` | ✅ | Nessun uso. CSP `default-src 'none'` blocca `data:`/`blob:` come script. `img-src 'self' data:` consente solo `data:` per le SVG inline nei CSS. |
| `src=` dinamici (cambio canzone, ecc.) | 🟡 | Usati per audio (`new Audio('/audio/...')`) con path hardcoded da array statici, no input utente. |
| `setAttribute(cx,cy)` (Navbar pupilla) | ✅ | Solo valori numerici calcolati da angoli del mouse: nessun sink HTML. |

---

## 2. Header HTTP

| Header | Atteso | Stato |
|---|---|---|
| `Content-Security-Policy` | strict, niente unsafe-inline su script | ✅ vedi `public/.htaccess` |
| `Strict-Transport-Security` | max-age≥1y, includeSubDomains, preload | ✅ 2 anni |
| `X-Content-Type-Options` | nosniff | ✅ |
| `X-Frame-Options` | DENY | ✅ |
| `Referrer-Policy` | strict-origin-when-cross-origin (sito) / no-referrer (API) | ✅ |
| `Permissions-Policy` | API potenti disattivate | ✅ |
| `Cross-Origin-Opener-Policy` | same-origin | ✅ |
| `Cross-Origin-Resource-Policy` | same-origin | ✅ |
| `X-XSS-Protection` | 0 (auditor legacy deprecato 2026) | ✅ |
| `X-Powered-By`, `Server` | rimossi | ✅ |

Verifica indipendente: `securityheaders.com`, `csp-evaluator.withgoogle.com`.

---

## 3. CSS exfiltration (font/img/connect attribute-based)

| Vettore | Stato | Contromisura |
|---|---|---|
| Fontleak via `unicode-range` per esfiltrare caratteri di password/CSRF | ✅ | `font-src 'self'` + zero terze parti. Nessuna password in DOM (login solo PHP, lato server). |
| Immagini con URL per leakare valore CSS attribute | ✅ | `img-src 'self' data:`. Niente wildcard di schema. |
| `connect-src` per `fetch` di telemetria | ✅ | `connect-src 'self'`. Unica fetch è `/api/contact.php`. |

---

## 4. Byte-level / encoding (Trojan Source, homoglyph, UTF-8)

| Vettore | Stato | Contromisura |
|---|---|---|
| Trojan Source / BiDi override CVE-2021-42574 (U+202A-E, U+2066-9, U+200E/F, U+061C) | ✅ | `integrity-scan.js` blocca tutti i 14 code point BiDi. |
| Zero-width (U+200B/C/D, U+2060-3, U+FEFF) | ✅ | Bloccati. |
| Non-characters (U+FDD0-EF, *FFFE/*FFFF) | ✅ | Bloccati. |
| Private Use Area (E000-F8FF, F0000-10FFFD) | ✅ | Bloccati. |
| Confusable Cirillico/Greco/Armeno/Cherokee/Coptic in identificatori | ✅ | Bloccati. Trovato e corretto una lettera greca alpha (U+03B1) in `shaders.js`. |
| Tag characters (E0000-E007F) — smuggling | ✅ | Bloccati. |
| UTF-8 non valido / overlong / surrogati | ✅ | Tutti i file decodificati con `TextDecoder({ fatal: true })`. |
| Nomi file non-ASCII | ✅ | `integrity-scan.js` rifiuta path non-ASCII. |
| Entità XML/SVG malformate | 🟡 | Tutte le SVG nel codice sono inline e statiche, lette dai sorgenti React. Nessuna SVG accettata da input utente. |

---

## 5. Risorse esterne (supply-chain / slopsquatting)

| Vettore | Stato | Contromisura |
|---|---|---|
| Dipendenza npm compromessa o typosquat | 🟡 | Solo 5 dipendenze runtime, tutte in allowlist hard-coded nell'audit. Aggiunte fuori allowlist → FAIL. |
| Dipendenza dichiarata ma inutile (superficie inutile) | ✅ | Rimosse `lucide-react` e `dompurify`. |
| Font/CSS/script da CDN esterna | ✅ | Zero. Tutto self-hostato (Google Fonts rimossa dalle 4 SimPages). |
| Subresource Integrity (SRI) | 🔵 | Non applicabile: zero asset esterni. Se ne aggiungessimo uno, è obbligatorio `integrity=` + `crossorigin=`. |

---

## 6. Immagini

| Vettore | Stato | Contromisura |
|---|---|---|
| SVG-XSS da upload utente | 🔵 | Il form contatti non accetta upload. Tutte le SVG sono inline nei JSX o `data:image/svg+xml` statiche nei CSS. |
| EXIF leak (GPS, seriale fotocamera) nelle foto del Showroom | 🟡 | Sono foto demo prive di EXIF sensibile. Quando carichi nuove foto reali: `exiftool -all= file.webp` prima del commit. |
| libwebp CVE-2023-4863 (heap-overflow nei decoder WebP) | 🟡 | Vulnerabilità del browser, non del nostro sito. Mantieni il browser aggiornato — noi non possiamo mitigare lato server. |
| Solo formati raster (no SVG esterno) | ✅ | Tutte le immagini in `public/images` sono `.webp`. |

---

## 7. Rete / trasporto / crypto

| Vettore | Stato | Contromisura |
|---|---|---|
| Downgrade HTTPS→HTTP | ✅ | HSTS 2 anni + `upgrade-insecure-requests` nella CSP. |
| TLS 1.3, cipher moderne | 🔵 | Gestito da Hostinger. Verifica con SSL Labs. |
| Post-quantum (Harvest-Now-Decrypt-Later) | 🟡 | Niente PFS post-quantum disponibile nel piano shared; il sito non gestisce segreti a lungo termine (no auth utente, no token persistenti). Rischio basso. |
| BGP/RPKI, DNSSEC, CAA | 🔵 | Configurazione DNS lato registrar. Vedi `SECURITY.md` §3. |
| Email spoofing (SPF/DKIM/DMARC) | 🟡 | Vanno configurati nel DNS di `vihente.it`. SPF `-all`, DMARC `p=reject`. |

---

## 8. Privacy visitatore / fingerprinting

| Vettore | Stato | Contromisura |
|---|---|---|
| Tracking di terze parti (Google Analytics, Meta Pixel, ecc.) | ✅ | Zero script di terze parti. CSP blocca a prescindere. |
| Leak IP a CDN font esterne | ✅ | Font self-hostati. |
| Cookie traccianti | ✅ | Solo cookie tecnico di sessione PHP (HttpOnly+Secure+SameSite=Strict), solo se l'utente apre `view-logs.php`. |
| Referrer leak verso link esterni | ✅ | `Referrer-Policy: strict-origin-when-cross-origin`. Le pagine API: `no-referrer`. |

---

## 9. "Natura madre" (runtime/parser)

| Vettore | Stato | Contromisura |
|---|---|---|
| libwebp CVE-2023-4863 | 🟡 | Vedi §6. Lato browser. |
| Parser XML / charset sniffing | ✅ | Nessun XML utente parsato. `X-Content-Type-Options: nosniff` lato server. |
| Normalizzazione Unicode (NFC vs NFD) in confronti | ✅ | Nessun confronto stringhe security-sensitive (no password compare in JS). |

---

## 10. Backend PHP (vettori specifici)

| Vettore | Stato | Contromisura |
|---|---|---|
| **Backscatter / spam cannon** (POST con email vittima -> auto-reply usa il dominio per spam) | ✅ | Auto-reply DISATTIVATO (`SEND_AUTO_REPLY=false`). Resta solo la mail all'admin. Vedi anche SPF/DMARC in §7. |
| **Abuso automatizzato del form** (bot, CORS non blocca la POST) | ✅ | Honeypot reale nel form + token temporale (submit <2s o >1h scartati in silenzio) + rate-limit file-based per IP. Contro bot sofisticati: valutare Turnstile (terza parte, allenta CSP). |
| **Email-header injection** via newline in Subject/From/Reply-To | ✅ | `sanitizeHeader()` strippa CR/LF/TAB/controlli. Verificato con payload reali. |
| **Log injection** (righe falsificate in `contacts.log`) | ✅ | `sanitizeLogField()` strippa CR/LF/`\|`. Verificato. |
| **Consenso privacy aggirato** (inviato solo dal front) | ✅ | `contact.php` rifiuta se `privacyConsent !== true` (verifica server-side, GDPR). |
| **Messaggio gigante** (mail enorme entro post_max_size) | ✅ | Cap 100 char nome / 5000 char messaggio lato server. |
| **Info disclosure** (path/stack trace su errore PHP) | ✅ | `display_errors=0` forzato in tutti i PHP. |
| **Password in URL** (query string finisce in log, history, referrer) | ✅ | `view-logs.php` riscritto: solo POST, password mai in GET. |
| **Password in chiaro nel sorgente** | ✅ | Hash in `VIHENTE_LOGS_HASH` (env var, con fallback `$_SERVER`/`$_ENV` per Hostinger). Fail-closed se assente. |
| **Brute force su login** | ✅ | `usleep(300000)` + lockout file-based: max 5 tentativi falliti per IP / 15 min. |
| **CSRF su POST sensibili** (logout, clear log) | ✅ | Token per-sessione, `hash_equals`. |
| **Session fixation** | ✅ | `session_regenerate_id(true)` dopo login. |
| **Rate-limit aggirabile non mandando il cookie** | ✅ | Rate-limit ora file-based su SHA-256(IP). |
| **Esposizione versione PHP** via `X-Mailer` | ✅ | Header `X-Mailer` rimosso. |
| **File di test in produzione** (`test-email.php`) | ✅ | Rimosso. |
| **Accesso diretto a `.log`/`.bak`** | ✅ | `api/.htaccess` nega. |
| **Path traversal in upload** | 🔵 | Nessun endpoint di upload. |
| **SQL injection** | 🔵 | Nessun database. |
| **SSRF** (Server-Side Request Forgery) | 🔵 | `contact.php` non fa fetch outbound (solo `mail()`). |
