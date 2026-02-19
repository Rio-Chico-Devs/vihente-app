<?php
/**
 * VIHENTE - Log Viewer
 * Accesso: https://vihente.it/api/view-logs.php?pass=Vihente2024Secure
 */

define('LOG_PASSWORD', 'Vihente2024Secure');

$pass = isset($_GET['pass']) ? $_GET['pass'] : '';
if ($pass !== LOG_PASSWORD) {
    http_response_code(403);
    die('403 Forbidden');
}

$action = isset($_GET['action']) ? $_GET['action'] : 'view';
$log_file = __DIR__ . '/contacts.log';

if ($action === 'download') {
    if (file_exists($log_file)) {
        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="contacts-' . date('Y-m-d') . '.log"');
        readfile($log_file);
    }
    exit;
}

if ($action === 'clear' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($log_file)) {
        $backup = $log_file . '.bak';
        copy($log_file, $backup);
        file_put_contents($log_file, '');
    }
    header('Location: ?pass=' . LOG_PASSWORD);
    exit;
}

$lines = [];
$stats = ['total' => 0, 'success' => 0, 'spam' => 0, 'error' => 0];

if (file_exists($log_file)) {
    $log_content = file_get_contents($log_file);
    $lines = array_filter(explode("\n", $log_content));
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
<title>Contatti Log - Vihente</title>
<style>
  body { font-family: monospace; background: #0a0a0a; color: #00ff88; padding: 20px; margin: 0; }
  h1 { color: #00ffff; border-bottom: 1px solid #333; padding-bottom: 10px; }
  .stats { display: flex; gap: 20px; margin: 20px 0; }
  .stat { background: #111; border: 1px solid #333; padding: 15px 20px; border-radius: 6px; text-align: center; }
  .stat .num { font-size: 2em; font-weight: bold; }
  .stat.success .num { color: #00ff88; }
  .stat.spam .num { color: #ff8800; }
  .stat.error .num { color: #ff4444; }
  .stat.total .num { color: #00ffff; }
  .actions { margin: 20px 0; display: flex; gap: 10px; }
  a.btn { background: #1a1a2e; color: #00ffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; border: 1px solid #00ffff; }
  form button { background: #2a0000; color: #ff4444; padding: 8px 16px; border: 1px solid #ff4444; border-radius: 4px; cursor: pointer; }
  .log-container { background: #0d0d0d; border: 1px solid #333; border-radius: 6px; padding: 15px; max-height: 600px; overflow-y: auto; }
  .log-line { padding: 4px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; }
  .log-line.success { color: #00ff88; }
  .log-line.spam { color: #ff8800; }
  .log-line.error { color: #ff4444; }
  .empty { color: #555; text-align: center; padding: 40px; }
</style>
</head>
<body>
<h1>Vihente - Contatti Ricevuti</h1>

<div class="stats">
  <div class="stat total"><div class="num"><?= $stats['total'] ?></div><div>TOTALE</div></div>
  <div class="stat success"><div class="num"><?= $stats['success'] ?></div><div>SUCCESSO</div></div>
  <div class="stat spam"><div class="num"><?= $stats['spam'] ?></div><div>SPAM</div></div>
  <div class="stat error"><div class="num"><?= $stats['error'] ?></div><div>ERRORI</div></div>
</div>

<div class="actions">
  <a class="btn" href="?pass=<?= LOG_PASSWORD ?>&action=download">Scarica Log</a>
  <form method="POST" action="?pass=<?= LOG_PASSWORD ?>&action=clear" onsubmit="return confirm('Svuotare il log? Verra creato un backup .bak')">
    <button type="submit">Svuota Log</button>
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
    <div class="<?= $class ?>"><?= htmlspecialchars($line) ?></div>
  <?php endforeach; ?>
<?php endif; ?>
</div>

</body>
</html>
