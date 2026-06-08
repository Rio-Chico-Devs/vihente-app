# DEPLOY CHECKLIST — Vihente

Da spuntare **prima** di ogni messa in produzione su `vihente.it`
(Hostinger / Apache). Non saltare nessun punto.

---

## 1. Gate di sicurezza (locale)

```
node security-audit.js     # deve uscire con 0 FAIL
node integrity-scan.js     # deve uscire con 0 FAIL
```

Se uno dei due esce ≠ 0 → **non deployare**, sistema prima.

---

## 2. Build

```
npm install                # allinea node_modules alla allowlist
npm run build              # genera dist/
npm run preview            # verifica veloce in locale
```

---

## 3. Variabile d'ambiente PHP — OBBLIGATORIA

Il visualizzatore log (`api/view-logs.php`) è **fail-closed**: senza la
variabile d'ambiente impostata, risponde **503** e non si entra. Per attivarlo:

### 3a. Genera l'hash della tua password

In un terminale qualsiasi con PHP installato (anche locale, anche WSL):

```
php -r "echo password_hash('LA_TUA_PASSWORD_FORTE', PASSWORD_DEFAULT), PHP_EOL;"
```

Output esempio (l'hash inizia sempre con `$2y$...` o `$argon2id$...`):

```
$2y$10$KIXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Importante:** sostituisci `LA_TUA_PASSWORD_FORTE` con una password vera
(min. 16 caratteri, mix maiuscole/minuscole/numeri/simboli). Non committarla
nel repo. Non incollarla in chat. Salvala nel tuo password manager.

### 3b. Imposta la variabile su Hostinger

Pannello Hostinger → **Avanzate** → **Variabili di ambiente PHP** (o
`hPanel → Website → PHP Configuration → PHP variables`).

Aggiungi:

| Nome                  | Valore                                |
|-----------------------|---------------------------------------|
| `VIHENTE_LOGS_HASH`   | (incolla qui l'hash generato sopra)   |

Se l'interfaccia non ti permette di aggiungere env vars, in alternativa
si può usare `SetEnv VIHENTE_LOGS_HASH "$2y$10$..."` in un `.htaccess`
**fuori dalla webroot** (es. nella cartella sopra `public_html/`). Mai
nel repo.

### 3c. Verifica

Dopo il deploy, apri `https://vihente.it/api/view-logs.php`:

- Se vedi la **form di login** → env var impostata correttamente. Entra
  con la password che hai scelto.
- Se vedi **"Log viewer non configurato"** (503) → env var assente o nome
  sbagliato. Torna allo step 3b.

---

## 4. Upload

Carica il contenuto di `dist/` nella root pubblica Hostinger
(`public_html/`) e la cartella `api/` come `public_html/api/`.

I file con estensione `.htaccess`, gli `.woff2`, le immagini in `images/`
devono essere caricati come sono (binari per i woff2).

---

## 5. Verifica indipendente post-deploy

**Non fidarti di me**, usa servizi terzi:

- [securityheaders.com](https://securityheaders.com/?q=https://vihente.it) → atteso **A** o **A+**
- [csp-evaluator.withgoogle.com](https://csp-evaluator.withgoogle.com/) → incolla la CSP, atteso **0 high severity**
- [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/analyze.html?d=vihente.it) → atteso **A+** con HSTS preload-ready
- [hstspreload.org](https://hstspreload.org/?domain=vihente.it) → se vuoi entrare nella preload list dei browser
- [hardenize.com](https://www.hardenize.com/report/vihente.it) → report completo (DNS, TLS, email, header)
- [internet.nl](https://internet.nl/) → secondo parere europeo, IPv6 e DNSSEC

---

## 6. Test funzionali al volo

- [ ] Home (`https://vihente.it/`) si apre, splash sparisce dopo il bundle
- [ ] L'occhio della Navbar segue il mouse (no lag)
- [ ] Apri uno Showroom (es. Fotografo, Immobiliare) → font corretti
- [ ] Form contatti: invia un test, controlla la mail su `vihenteweb@proton.me`
- [ ] `https://vihente.it/api/view-logs.php` chiede password → entra → vedi il test sopra
- [ ] DevTools → Network: nessuna richiesta a `fonts.googleapis.com` / `fonts.gstatic.com`
- [ ] DevTools → Console: nessun errore CSP

## 6-bis. Test di sicurezza CRITICI (emersi dal red-team)

La protezione dei dati personali nei log dipende dal fatto che Apache applichi
il `.htaccess`. **Verifica esplicitamente** che i file sensibili NON siano
scaricabili (atteso **403**, non 200):

```bash
curl -I https://vihente.it/api/contacts.log      # atteso: 403 Forbidden
curl -I https://vihente.it/api/.htaccess         # atteso: 403
curl -I https://vihente.it/api/contacts.log.bak  # atteso: 403
```

Se uno di questi risponde **200**, i contatti dei tuoi visitatori sono
pubblici (leak GDPR): l'hosting non sta applicando `.htaccess`
(`AllowOverride None`). In quel caso, apri ticket Hostinger o sposta
`contacts.log` fuori dalla webroot.

Altri controlli rapidi (devono fallire):

```bash
# La vecchia password in GET non deve dare accesso ai log
curl -s "https://vihente.it/api/view-logs.php?pass=qualsiasi" | grep -i "TOTALE\|SUCCESS"  # atteso: vuoto (mostra solo il login)
# Il file di test non deve esistere
curl -I https://vihente.it/api/test-email.php    # atteso: 403/404
```

---

## 7. Se qualcosa va male

- **CSP errors in console**: leggi quale direttiva blocca cosa.
  - Se è un `<style>` legittimo → la CSP già consente `style-src 'unsafe-inline'`.
  - Se è uno script → **NON** aggiungere `'unsafe-inline'`. Riscrivi il
    codice senza inline. Vedi `CLAUDE.md`.
- **Form contatti dà 500**: probabilmente `mail()` non configurata su
  Hostinger. Controlla `hPanel → Email`.
- **view-logs.php dà 503**: env var `VIHENTE_LOGS_HASH` non impostata o
  scope sbagliato. Vedi step 3b.

---

Per la baseline di sicurezza completa vedi `SECURITY.md`.
Per il catalogo vettori vedi `THREAT-MODEL.md`.
Per le regole AI vedi `CLAUDE.md`.
