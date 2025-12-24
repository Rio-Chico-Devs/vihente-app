<?php
/**
 * VISUALIZZATORE LOG CONTATTI
 * Protetto da password per visualizzare i log dei contatti ricevuti
 *
 * Accesso: https://tuodominio.com/api/view-logs.php?pass=tua-password
 */

// ⚠️ CAMBIA QUESTA PASSWORD CON UNA SICURA!
define('LOG_PASSWORD', 'Vihente2024!Secure');

// ============================================

header('Content-Type: text/html; charset=UTF-8');
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');

// Verifica password
if (!isset($_GET['pass']) || $_GET['pass'] !== LOG_PASSWORD) {
    http_response_code(403);
    ?>
    <!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accesso Negato</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
            }
            .error-box {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
            }
            h1 { color: #dc3545; margin: 0 0 20px 0; }
            p { color: #666; line-height: 1.6; }
            code {
                background: #f8f9fa;
                padding: 4px 8px;
                border-radius: 4px;
                font-family: monospace;
                color: #e83e8c;
            }
        </style>
    </head>
    <body>
        <div class="error-box">
            <h1>⛔ Accesso Negato</h1>
            <p>Password non valida o mancante.</p>
            <p style="font-size: 14px; margin-top: 20px;">
                Usa: <code>?pass=tua-password</code>
            </p>
        </div>
    </body>
    </html>
    <?php
    exit;
}

$log_file = __DIR__ . '/contacts.log';
$log_exists = file_exists($log_file);
$log_content = $log_exists ? file_get_contents($log_file) : '';
$log_lines = $log_exists ? file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [];
$total_contacts = count($log_lines);

// Statistiche
$stats = [
    'success' => 0,
    'error' => 0,
    'spam' => 0,
    'quote' => 0,
    'contact' => 0
];

foreach ($log_lines as $line) {
    if (strpos($line, '[SUCCESS]') !== false) $stats['success']++;
    if (strpos($line, '[ERROR]') !== false) $stats['error']++;
    if (strpos($line, '[SPAM]') !== false) $stats['spam']++;
    if (strpos($line, 'QUOTE') !== false) $stats['quote']++;
    if (strpos($line, 'CONTACT') !== false) $stats['contact']++;
}

// Azione: Cancella log
if (isset($_GET['action']) && $_GET['action'] === 'clear' && isset($_GET['confirm'])) {
    if (file_exists($log_file)) {
        // Backup prima di cancellare
        $backup_file = __DIR__ . '/contacts_backup_' . date('Y-m-d_His') . '.log';
        copy($log_file, $backup_file);

        // Cancella log
        file_put_contents($log_file, '');

        header("Location: view-logs.php?pass=" . urlencode($_GET['pass']) . "&cleared=1");
        exit;
    }
}

// Azione: Download log
if (isset($_GET['action']) && $_GET['action'] === 'download') {
    if ($log_exists) {
        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="contacts_' . date('Y-m-d') . '.log"');
        echo $log_content;
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log Contatti - Portfolio Vihente</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .header p {
            opacity: 0.9;
            font-size: 16px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-number {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 13px;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
        }

        .stat-success .stat-number { color: #28a745; }
        .stat-quote .stat-number { color: #ffc107; }
        .stat-contact .stat-number { color: #17a2b8; }
        .stat-error .stat-number { color: #dc3545; }
        .stat-spam .stat-number { color: #6c757d; }

        .actions {
            padding: 20px 30px;
            background: white;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(102,126,234,0.3);
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }

        .btn-danger:hover {
            background: #c82333;
        }

        .btn-success {
            background: #28a745;
            color: white;
        }

        .btn-success:hover {
            background: #218838;
        }

        .log-container {
            padding: 30px;
            max-height: 600px;
            overflow-y: auto;
        }

        .log-content {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.8;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .log-line {
            margin-bottom: 8px;
            padding: 6px 10px;
            border-radius: 4px;
        }

        .log-line:hover {
            background: rgba(255,255,255,0.05);
        }

        .log-success { color: #4ec9b0; }
        .log-error { color: #f48771; }
        .log-spam { color: #ce9178; }
        .log-timestamp { color: #569cd6; }
        .log-ip { color: #dcdcaa; }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }

        .empty-state svg {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
            opacity: 0.3;
        }

        .alert {
            padding: 15px 20px;
            margin: 20px 30px;
            border-radius: 6px;
            font-size: 14px;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        @media (max-width: 768px) {
            .stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Log Contatti Portfolio</h1>
            <p>Visualizza e gestisci i contatti ricevuti dal form</p>
        </div>

        <?php if (isset($_GET['cleared'])): ?>
        <div class="alert alert-success">
            ✅ Log cancellato con successo! Un backup è stato creato.
        </div>
        <?php endif; ?>

        <div class="stats">
            <div class="stat-card stat-success">
                <div class="stat-number"><?= $stats['success'] ?></div>
                <div class="stat-label">✅ Successo</div>
            </div>
            <div class="stat-card stat-quote">
                <div class="stat-number"><?= $stats['quote'] ?></div>
                <div class="stat-label">💰 Preventivi</div>
            </div>
            <div class="stat-card stat-contact">
                <div class="stat-number"><?= $stats['contact'] ?></div>
                <div class="stat-label">📧 Contatti</div>
            </div>
            <div class="stat-card stat-error">
                <div class="stat-number"><?= $stats['error'] ?></div>
                <div class="stat-label">❌ Errori</div>
            </div>
            <div class="stat-card stat-spam">
                <div class="stat-number"><?= $stats['spam'] ?></div>
                <div class="stat-label">🚫 Spam</div>
            </div>
        </div>

        <div class="actions">
            <a href="?pass=<?= urlencode($_GET['pass']) ?>" class="btn btn-primary">
                🔄 Ricarica
            </a>
            <?php if ($log_exists && $total_contacts > 0): ?>
            <a href="?pass=<?= urlencode($_GET['pass']) ?>&action=download" class="btn btn-success">
                💾 Scarica Log
            </a>
            <button onclick="confirmClear()" class="btn btn-danger">
                🗑️ Cancella Log
            </button>
            <?php endif; ?>
        </div>

        <div class="log-container">
            <?php if (!$log_exists || $total_contacts === 0): ?>
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <h3>Nessun contatto ricevuto</h3>
                    <p style="margin-top: 10px;">I contatti ricevuti appariranno qui.</p>
                </div>
            <?php else: ?>
                <div class="log-content">
<?php
foreach ($log_lines as $line) {
    $class = '';
    if (strpos($line, '[SUCCESS]') !== false) $class = 'log-success';
    elseif (strpos($line, '[ERROR]') !== false) $class = 'log-error';
    elseif (strpos($line, '[SPAM]') !== false) $class = 'log-spam';

    echo '<div class="log-line ' . $class . '">' . htmlspecialchars($line) . '</div>';
}
?>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <script>
        function confirmClear() {
            if (confirm('⚠️ Sei sicuro di voler cancellare tutto il log?\n\nVerrà creato un backup automatico prima della cancellazione.')) {
                window.location.href = '?pass=<?= urlencode($_GET['pass']) ?>&action=clear&confirm=1';
            }
        }

        // Auto-refresh ogni 60 secondi (opzionale)
        // setTimeout(() => location.reload(), 60000);
    </script>
</body>
</html>
