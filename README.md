# Vihente

Sito React + Vite servito da Apache su Hostinger, dominio `vihente.it`.

---

## ⚠️ PRIMA DI ANDARE IN PRODUZIONE — LEGGERE

Apri **[`DEPLOY-CHECKLIST.md`](./DEPLOY-CHECKLIST.md)** e seguila punto per punto.

In particolare: il visualizzatore log (`api/view-logs.php`) è **fail-closed**
e non funziona finché non imposti la variabile d'ambiente `VIHENTE_LOGS_HASH`
nel pannello Hostinger. Per generare l'hash:

```bash
php -r "echo password_hash('LA_TUA_PASSWORD_FORTE', PASSWORD_DEFAULT), PHP_EOL;"
```

Dettagli in `DEPLOY-CHECKLIST.md` §3.

---

## Sviluppo locale

```bash
npm install
npm run dev
```

## Gate di sicurezza (prima di ogni merge)

```bash
node security-audit.js     # deve uscire con 0 FAIL
node integrity-scan.js     # deve uscire con 0 FAIL
```

## Documentazione

- [`DEPLOY-CHECKLIST.md`](./DEPLOY-CHECKLIST.md) — checklist messa in produzione
- [`SECURITY.md`](./SECURITY.md) — baseline di sicurezza + verifica indipendente
- [`THREAT-MODEL.md`](./THREAT-MODEL.md) — catalogo vettori e contromisure
- [`CLAUDE.md`](./CLAUDE.md) — regole non negoziabili per sessioni AI
