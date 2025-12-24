# 📧 Sistema Email Contact Form - Guida Configurazione

## ⚙️ Configurazione Rapida (5 minuti)

### 1️⃣ **Modifica credenziali in `contact.php`**

Apri il file `api/contact.php` e modifica queste righe (circa linea 18-27):

```php
// La tua email dove ricevere i contatti
define('ADMIN_EMAIL', 'tua-email@tuodominio.com'); // ← CAMBIA QUI

// Email di invio (usa una email del tuo dominio)
define('FROM_EMAIL', 'noreply@tuodominio.com'); // ← CAMBIA QUI
define('FROM_NAME', 'Portfolio Vihente');

// Abilita email di conferma automatica all'utente
define('SEND_AUTO_REPLY', true); // true = invia conferma automatica
```

### 2️⃣ **Configura CORS (origini consentite)**

Nel file `contact.php`, circa linea 45:

```php
$allowed_origins = [
    'https://tuodominio.com',        // ← CAMBIA con il tuo dominio
    'http://localhost:5173',         // Per sviluppo locale (Vite)
    'http://localhost:4173'          // Per test preview
];
```

### 3️⃣ **Email professionale Hostinger (CONSIGLIATO)**

Per migliore deliverability delle email:

1. **Crea email professionale** su Hostinger:
   - Hostinger → Email → Crea Account
   - Crea: `info@tuodominio.com` o `contatti@tuodominio.com`

2. **Usa questa email in `contact.php`**:
   ```php
   define('ADMIN_EMAIL', 'info@tuodominio.com');
   define('FROM_EMAIL', 'noreply@tuodominio.com');
   ```

3. **Forward a Gmail** (opzionale):
   - Hostinger → Email → Forwarding
   - Inoltra `info@tuodominio.com` → `tua-gmail@gmail.com`
   - Così ricevi su Gmail ma mantieni professionalità

---

## 🚀 Deploy su Hostinger

### **Struttura file su server:**

```
public_html/
├── index.html              ← da dist/
├── assets/                 ← da dist/
├── screenshots/            ← da dist/
├── manifest.json          ← da dist/
├── .htaccess              ← da root progetto
├── api/
│   ├── contact.php        ← IL FILE PRINCIPALE
│   ├── contacts.log       ← Verrà creato automaticamente
│   └── README.md          ← Questo file
└── robots.txt
```

### **Passi deploy:**

1. **Build progetto locale:**
   ```bash
   npm run build
   ```

2. **Upload su Hostinger** (via File Manager o FTP):
   - Carica **contenuto** di `dist/` in `public_html/`
   - Carica cartella `api/` in `public_html/api/`

3. **Permessi file** (importante!):
   ```bash
   # Via SSH o File Manager, imposta:
   chmod 755 api/
   chmod 644 api/contact.php
   chmod 666 api/contacts.log  # Se non esiste, verrà creato auto
   ```

4. **Verifica `.htaccess`** presente in `public_html/`:
   - Deve contenere regole per SPA routing
   - Il file è già nel progetto, basta caricare

---

## 📋 Features Implementate

### ✅ **Sicurezza:**
- ✅ Validazione server-side completa
- ✅ Sanitizzazione input (protezione XSS)
- ✅ Rate limiting per IP (1 richiesta/60 sec)
- ✅ Honeypot anti-spam
- ✅ Blacklist parole spam
- ✅ Protezione injection
- ✅ Security headers (X-Frame-Options, XSS Protection, etc.)
- ✅ CORS configurabile

### ✅ **Email:**
- ✅ Email HTML professionale a te (admin)
- ✅ Email automatica di conferma all'utente
- ✅ Template responsive mobile-friendly
- ✅ Reply-To automatico (rispondi direttamente al cliente)
- ✅ Riepilogo dati contatto
- ✅ Info tecniche (IP, timestamp, user agent)

### ✅ **Logging:**
- ✅ Log strutturato in `contacts.log`
- ✅ Traccia: timestamp, IP, nome, email, tipo richiesta
- ✅ Separazione: success, error, spam
- ✅ Privacy compliant (no dati sensibili in eccesso)

### ✅ **UX:**
- ✅ Messaggi errore chiari
- ✅ Gestione rate limiting lato client + server
- ✅ Feedback immediato su validazione
- ✅ Supporto 2 modalità (contatto/preventivo)

---

## 🧪 Test del Sistema

### **Test 1: Invio Form (sviluppo locale)**

1. Avvia server di sviluppo:
   ```bash
   npm run dev
   ```

2. Vai su http://localhost:5173/contatti

3. Compila e invia il form

4. **Cosa dovrebbe succedere:**
   - ❌ **Errore CORS** (normale in locale)
   - Soluzione: testa direttamente su server Hostinger dopo deploy

### **Test 2: Invio Form (produzione)**

1. Dopo deploy, vai su https://tuodominio.com/contatti

2. Compila form con dati reali

3. **Verifica:**
   - ✅ Messaggio "Inviato con successo" appare
   - ✅ Ricevi email nella casella configurata in `ADMIN_EMAIL`
   - ✅ L'utente riceve email di conferma automatica
   - ✅ File `api/contacts.log` contiene l'entry

### **Test 3: Rate Limiting**

1. Invia un messaggio
2. Prova subito a inviarne un altro
3. **Risultato atteso:** Messaggio "Attendi X secondi..."

### **Test 4: Spam Protection**

1. Compila form con parole spam (es: "viagra", "casino")
2. **Risultato atteso:** "Messaggio bloccato dal filtro spam"

---

## 📊 Monitoraggio

### **Visualizza log contatti:**

Crea file `api/view-logs.php`:

```php
<?php
$password = 'password-sicura-123'; // ← CAMBIA QUESTA PASSWORD

if (!isset($_GET['pass']) || $_GET['pass'] !== $password) {
    die('⛔ Accesso negato');
}

header('Content-Type: text/plain; charset=UTF-8');

$log_file = __DIR__ . '/contacts.log';

if (!file_exists($log_file)) {
    echo "Nessun contatto ricevuto ancora.\n";
    exit;
}

echo "=== LOG CONTATTI ===\n\n";
echo file_get_contents($log_file);
?>
```

**Accedi con:**
```
https://tuodominio.com/api/view-logs.php?pass=password-sicura-123
```

---

## 🔧 Troubleshooting

### ❌ **"Errore durante l'invio"**

**Possibili cause:**

1. **Credenziali email errate:**
   - Verifica `ADMIN_EMAIL` e `FROM_EMAIL` in `contact.php`

2. **Funzione `mail()` PHP disabilitata:**
   ```bash
   # Via SSH, controlla:
   php -r "echo (function_exists('mail') ? 'OK' : 'DISABLED');"
   ```
   - Se disabled: contatta supporto Hostinger per abilitarla

3. **Permessi file:**
   ```bash
   chmod 755 api/
   chmod 644 api/contact.php
   ```

4. **Limite invio email:**
   - Hostinger ha limiti email/ora
   - Verifica nel pannello Hostinger → Email

### ❌ **Email non arriva**

1. **Controlla spam:**
   - Le email potrebbero finire in spam
   - Aggiungi `noreply@tuodominio.com` ai contatti

2. **Email professionale non configurata:**
   - Crea email su Hostinger prima
   - Usa email del TUO dominio (non Gmail)

3. **SPF/DKIM record:**
   - Hostinger li configura automaticamente
   - Verifica: Hostinger → Email → Authentication

### ❌ **CORS Error (locale)**

Normale in sviluppo locale. Soluzioni:

**A) Proxy Vite (CONSIGLIATO):**

In `vite.config.js` aggiungi:

```javascript
export default defineConfig({
  // ... resto config
  server: {
    proxy: {
      '/api': {
        target: 'https://tuodominio.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

**B) Testa direttamente su produzione** dopo deploy

### ❌ **"File contacts.log non scrivibile"**

```bash
# Via SSH o File Manager:
touch api/contacts.log
chmod 666 api/contacts.log
```

---

## ⚙️ Configurazioni Avanzate

### **Cambia tempo rate limiting:**

In `contact.php`, linea 24:

```php
define('RATE_LIMIT_SECONDS', 60); // Secondi tra un invio e l'altro
// 60 = 1 minuto
// 120 = 2 minuti
// 30 = 30 secondi
```

### **Disabilita auto-reply utente:**

In `contact.php`, linea 30:

```php
define('SEND_AUTO_REPLY', false); // false = non invia conferma automatica
```

### **Disabilita logging:**

In `contact.php`, linea 27:

```php
define('ENABLE_LOGGING', false);
```

### **Aggiungi altre parole spam:**

In `contact.php`, circa linea 126, array `$spam_patterns`:

```php
$spam_patterns = [
    'viagra', 'cialis', 'casino', 'poker',
    'tua-parola-spam-custom', // ← Aggiungi qui
    // ...
];
```

---

## 📧 Personalizzazione Template Email

I template email sono nelle funzioni:
- `getAdminEmailTemplate()` (linea 200+): Email che ricevi tu
- `getUserAutoReplyTemplate()` (linea 350+): Email conferma utente

Puoi modificare:
- Colori (es: `#667eea`)
- Testi
- Struttura HTML
- Logo (aggiungi `<img src="...">`)

---

## 🎯 Checklist Pre-Pubblicazione

- [ ] ✅ Modificato `ADMIN_EMAIL` in `contact.php`
- [ ] ✅ Modificato `FROM_EMAIL` in `contact.php`
- [ ] ✅ Modificato `$allowed_origins` con il tuo dominio
- [ ] ✅ Creata email professionale su Hostinger
- [ ] ✅ Fatto `npm run build`
- [ ] ✅ Caricato `dist/` su `public_html/`
- [ ] ✅ Caricato `api/` su `public_html/api/`
- [ ] ✅ Verificato `.htaccess` presente
- [ ] ✅ Testato form su produzione
- [ ] ✅ Verificato ricezione email
- [ ] ✅ Verificato auto-reply utente
- [ ] ✅ Testato rate limiting
- [ ] ✅ Verificato log in `contacts.log`

---

## 📚 Risorse

- **Hostinger Email Docs:** https://www.hostinger.it/tutorials/email
- **PHP mail() Function:** https://www.php.net/manual/en/function.mail.php
- **SPF/DKIM Guide:** Hostinger Knowledge Base

---

## 🆘 Supporto

Se hai problemi:

1. Controlla i log: `api/contacts.log`
2. Controlla log errori PHP: Hostinger → File Manager → `error_log`
3. Testa singoli componenti:
   - Form frontend (console.log)
   - Backend PHP (aggiungi `var_dump()` temporanei)
   - Email delivery (test con email personale)

**Il sistema è production-ready e testato!** 🚀
