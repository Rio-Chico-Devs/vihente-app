# SYNC TO MAIN — istruzioni

Questo pacchetto contiene **i 34 file che servono per portare `main` allo
stesso livello del branch `claude/ecstatic-clarke-A1Fqv`** senza fare il
merge git.

Il branch di lavoro è 7 commit avanti rispetto a `main`. Senza queste
modifiche **non deployare**: `main` contiene ancora la password
amministrativa hardcoded in chiaro, `test-email.php`, CSP debole con
`unsafe-inline` e font Google esterni.

---

## Cosa fare (manuale, 2 passi)

### 1. Sostituire i 34 file

Copia l'intero contenuto di questo pacchetto **sopra** la root del repo
`main` (le cartelle dentro lo zip rispecchiano i path reali del progetto:
`api/`, `public/`, `src/...`, più i file di root).

I file con lo stesso nome vanno **sovrascritti**. Le cartelle nuove
(`src/styles/`) vanno create.

### 2. Cancellare 1 file

Su `main` esiste ancora un file che il branch di lavoro ha rimosso per
sicurezza (info disclosure: espone la versione di PHP e permette di
mandare email arbitrarie):

```
api/test-email.php   <-- ELIMINARE
```

---

## Script opzionale

Dentro questo pacchetto c'è `apply.sh` che fa entrambi i passi
automaticamente. Si lancia dalla **root del repo `main`** (NON da dentro lo
zip scompattato):

```bash
# Esempio: lo zip è stato scompattato in ~/Downloads/vihente-sync-to-main/
cd /percorso/del/repo/vihente-app
bash ~/Downloads/vihente-sync-to-main/apply.sh
```

Lo script:
1. Verifica di essere in un repo git con un `package.json` di Vihente
2. Copia i 34 file
3. Cancella `api/test-email.php`
4. Stampa la nuova lista di file modificati per `git status`

NON esegue `git add`, `git commit` o `git push`: quelli li fai tu quando sei
soddisfatto del diff.

---

## Dopo aver applicato

```bash
# Gate richiesti dal progetto (zero dipendenze, devono uscire con 0 FAIL)
node security-audit.js
node integrity-scan.js

# Installa le dipendenze allineate (rimuove dompurify ormai non usato)
npm install

# Build di produzione
npm run build
```

Poi committa su `main` e procedi col deploy su Hostinger come descritto in
`DEPLOY-CHECKLIST.md` (incluso in questo pacchetto).

---

## Promemoria deploy (Hostinger)

1. Variabile d'ambiente **`VIHENTE_LOGS_HASH`** con una password **nuova**.
   La vecchia (`Vihente2024Secure`) resta nella history git pubblica:
   considerala bruciata. Genera il nuovo hash con:
   ```
   php -r "echo password_hash('LA_TUA_NUOVA_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
   ```
2. Datacenter Hostinger **in UE** (la Privacy Policy ora lo dichiara).
3. **SPF + DKIM** configurati per `vihente.it` nel pannello email Hostinger,
   altrimenti `noreply@vihente.it` finisce in spam.
4. Upload di `dist/` nella webroot, cartella `api/` accanto col suo
   `.htaccess`.
5. Smoke test post-deploy:
   - form contatti (invia + ricevi + cooldown 60s + 429 al secondo invio)
   - `/api/view-logs.php` (login con la nuova password)
   - refresh duro su una route profonda tipo `/showroom/barbiere`
     (deve servire la SPA, non un 404)
   - un `.webp` e un `.ogg` dalla cartella `public/` (MIME corretti)
