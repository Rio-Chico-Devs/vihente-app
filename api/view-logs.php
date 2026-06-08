<?php
/**
 * VIHENTE - Log Viewer (accesso riservato)
 *
 * SICUREZZA:
 * - Nessuna password in chiaro nel codice e MAI nella query string (GET).
 * - L'hash della password si imposta come variabile d'ambiente VIHENTE_LOGS_HASH
 *   (pannello Hostinger -> Avanzate -> Variabili, oppure SetEnv in .htaccess
 *   fuori dalla webroot). Generala una volta con:
 *       php -r "echo password_hash('LA_TUA_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
 * - Se la variabile non e' impostata l'accesso e' NEGATO (fail-closed).
 * - Login via POST, sessione con cookie HttpOnly+Secure+SameSite=Strict.
 * - Azioni di stato (clear) protette da token CSRF.
 */

declare(strict_types=1);

// ---- Header anti-cache / anti-embedding (anche per la pagina admin) ----
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");

// ---- Sessione con cookie indurito ----
$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/api/',
    'httponly' => true,
    'secure'   => $secure,
    'samesite' => 'Strict',
]);
session_start();

$PASSWORD_HASH = getenv('VIHENTE_LOGS_HASH') ?: '';
$LOG_FILE      = __DIR__ . '/contacts.log';

function csrf_token(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}
function csrf_ok(): bool {
    return isset($_POST['csrf'], $_SESSION['csrf'])
        && is_string($_POST['csrf'])
        && hash_equals($_SESSION['csrf'], $_POST['csrf']);
}
function is_authed(): bool {
    return !empty($_SESSION['logs_authed']);
}
function deny(int $code, string $msg): void {
    http_response_code($code);
    echo '<!DOCTYPE html><meta charset="UTF-8"><title>Accesso negato</title>';
    echo '<body style="font-family:monospace;background:#0a0a0a;color:#ff4444;padding:40px">';
    echo htmlspecialchars($msg, ENT_QUOTES, 'UTF-8');
    echo '</body>';
    exit;
}

// Fail-closed: senza hash configurato non si entra.
if ($PASSWORD_HASH === '') {
    deny(503, 'Log viewer non configurato. Imposta la variabile ambiente VIHENTE_LOGS_HASH.');
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ---- Logout ----
if ($method === 'POST' && isset($_POST['logout']) && csrf_ok()) {
    $_SESSION = [];
    session_destroy();
    header('Location: view-logs.php');
    exit;
}

// ---- Login ----
if (!is_authed()) {
    $error = '';
    if ($method === 'POST' && isset($_POST['password'])) {
        // Piccolo ritardo costante per attenuare il brute force.
        usleep(300000);
        if (csrf_ok() && is_string($_POST['password'])
            && password_verify($_POST['password'], $PASSWORD_HASH)) {
            session_regenerate_id(true);
            $_SESSION['logs_authed'] = true;
            header('Location: view-logs.php');
            exit;
        }
        $error = 'Password errata.';
    }
    $token = csrf_token();
    ?>
<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Accesso Log - Vihente</title>
<style>
  body { font-family: monospace; background:#0a0a0a; color:#00ff88; display:flex;
         min-height:100vh; align-items:center; justify-content:center; margin:0; }
  form { background:#111; border:1px solid #333; border-radius:8px; padding:32px; width:300px; }
  h1 { color:#00ffff; font-size:1.1rem; margin:0 0 20px; }
  input { width:100%; box-sizing:border-box; background:#0d0d0d; border:1px solid #333;
          color:#00ff88; padding:10px; border-radius:4px; font-family:monospace; }
  button { width:100%; margin-top:14px; background:#1a1a2e; color:#00ffff; border:1px solid #00ffff;
           padding:10px; border-radius:4px; cursor:pointer; font-family:monospace; }
  .err { color:#ff4444; font-size:.85rem; margin-top:12px; }
</style></head>
<body>
  <form method="POST" action="view-logs.php">
    <h1>Area riservata</h1>
    <input type="hidden" name="csrf" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
    <input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus>
    <button type="submit">Entra</button>
    <?php if ($error !== ''): ?><div class="err"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
  </form>
</body></html>
    <?php
    exit;
}

// ===================== DA QUI: UTENTE AUTENTICATO =====================

$token  = csrf_token();
$action = isset($_GET['action']) && is_string($_GET['action']) ? $_GET['action'] : 'view';

// ---- Download (solo autenticati) ----
if ($action === 'download') {
    if (is_file($LOG_FILE)) {
        header('Content-Type: text/plain; charset=UTF-8');
        header('Content-Disposition: attachment; filename="contacts-' . date('Y-m-d') . '.log"');
        readfile($LOG_FILE);
    }
    exit;
}

// ---- Clear (POST + CSRF) ----
if ($method === 'POST' && isset($_POST['clear'])) {
    if (!csrf_ok()) {
        deny(403, 'Token CSRF non valido.');
    }
    if (is_file($LOG_FILE)) {
        copy($LOG_FILE, $LOG_FILE . '.bak');
        file_put_contents($LOG_FILE, '');
    }
    header('Location: view-logs.php');
    exit;
}

// ---- Vista ----
$lines = [];
$stats = ['total' => 0, 'success' => 0, 'spam' => 0, 'error' => 0];

if (is_file($LOG_FILE)) {
    $log_content = (string) file_get_contents($LOG_FILE);
    $lines = array_filter(explode("\n", $log_content), static fn($l) => $l !== '');
    $stats['total'] = count($lines);
    foreach ($lines as $line) {
        if (strpos($line, '[SUCCESS]') !== false) $stats['success']++;
        elseif (strpos($line, '[SPAM]') !== false) $stats['spam']++;
        elseif (strpos($line, '[ERROR]') !== false) $stats['error']++;
    }
    $lines = array_reverse($lines);
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contatti Log - Vihente</title>
<style>
  body { font-family: monospace; background: #0a0a0a; color: #00ff88; padding: 20px; margin: 0; }
  h1 { color: #00ffff; border-bottom: 1px solid #333; padding-bottom: 10px; }
  .topbar { display:flex; justify-content:space-between; align-items:center; }
  .stats { display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap; }
  .stat { background: #111; border: 1px solid #333; padding: 15px 20px; border-radius: 6px; text-align: center; }
  .stat .num { font-size: 2em; font-weight: bold; }
  .stat.success .num { color: #00ff88; }
  .stat.spam .num { color: #ff8800; }
  .stat.error .num { color: #ff4444; }
  .stat.total .num { color: #00ffff; }
  .actions { margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; }
  a.btn { background: #1a1a2e; color: #00ffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; border: 1px solid #00ffff; }
  form { display:inline; }
  form button { background: #2a0000; color: #ff4444; padding: 8px 16px; border: 1px solid #ff4444; border-radius: 4px; cursor: pointer; font-family: monospace; }
  form.logout button { background:#111; color:#888; border-color:#444; }
  .log-container { background: #0d0d0d; border: 1px solid #333; border-radius: 6px; padding: 15px; max-height: 600px; overflow-y: auto; }
  .log-line { padding: 4px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; }
  .log-line.success { color: #00ff88; }
  .log-line.spam { color: #ff8800; }
  .log-line.error { color: #ff4444; }
  .empty { color: #555; text-align: center; padding: 40px; }
</style>
</head>
<body>
<div class="topbar">
  <h1>Vihente - Contatti Ricevuti</h1>
  <form class="logout" method="POST" action="view-logs.php">
    <input type="hidden" name="csrf" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
    <button type="submit" name="logout" value="1">Esci</button>
  </form>
</div>

<div class="stats">
  <div class="stat total"><div class="num"><?= (int) $stats['total'] ?></div><div>TOTALE</div></div>
  <div class="stat success"><div class="num"><?= (int) $stats['success'] ?></div><div>SUCCESSO</div></div>
  <div class="stat spam"><div class="num"><?= (int) $stats['spam'] ?></div><div>SPAM</div></div>
  <div class="stat error"><div class="num"><?= (int) $stats['error'] ?></div><div>ERRORI</div></div>
</div>

<div class="actions">
  <a class="btn" href="view-logs.php?action=download">Scarica Log</a>
  <form method="POST" action="view-logs.php" onsubmit="return confirm('Svuotare il log? Verra creato un backup .bak')">
    <input type="hidden" name="csrf" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
    <button type="submit" name="clear" value="1">Svuota Log</button>
  </form>
</div>

<div class="log-container">
<?php if (empty($lines)): ?>
  <div class="empty">Nessun log trovato.</div>
<?php else: ?>
  <?php foreach ($lines as $line): ?>
    <?php
      $class = 'log-line';
      if (strpos($line, '[SUCCESS]') !== false) $class .= ' success';
      elseif (strpos($line, '[SPAM]') !== false) $class .= ' spam';
      elseif (strpos($line, '[ERROR]') !== false) $class .= ' error';
    ?>
    <div class="<?= $class ?>"><?= htmlspecialchars($line, ENT_QUOTES, 'UTF-8') ?></div>
  <?php endforeach; ?>
<?php endif; ?>
</div>

</body>
</html>
