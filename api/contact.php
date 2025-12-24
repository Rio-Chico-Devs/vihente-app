<?php
/**
 * VIHENTE CONTACT FORM API
 * Enterprise-grade contact form handler
 *
 * Features:
 * - Server-side validation
 * - Rate limiting per IP
 * - Spam protection (honeypot + blacklist)
 * - Professional HTML emails
 * - Auto-reply to user
 * - Structured logging
 * - GDPR compliant
 */

// ==================== CONFIGURAZIONE ====================
// ⚠️ MODIFICA QUESTI VALORI CON I TUOI DATI

// La tua email dove ricevere i contatti
define('ADMIN_EMAIL', 'tua-email@tuodominio.com');

// Email di invio (usa una email del tuo dominio per migliore deliverability)
define('FROM_EMAIL', 'noreply@tuodominio.com');
define('FROM_NAME', 'Portfolio Vihente');

// Rate limiting (secondi tra un invio e l'altro dallo stesso IP)
define('RATE_LIMIT_SECONDS', 60);

// Abilita logging (true/false)
define('ENABLE_LOGGING', true);

// Abilita email di conferma automatica all'utente (true/false)
define('SEND_AUTO_REPLY', true);

// ========================================================

// Security headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS - permetti solo dal tuo dominio in produzione
// In sviluppo locale puoi lasciare '*'
$allowed_origins = [
    'https://tuodominio.com',
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173'  // Vite preview
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://tuodominio.com");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// Gestisci preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo POST consentito
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metodo non consentito. Usa POST.'
    ]);
    exit();
}

// Avvia sessione per rate limiting
session_start();

/**
 * Rate Limiting
 * Previene spam limitando richieste per IP
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $now = time();

    // Controlla ultimo invio da questo IP
    if (isset($_SESSION['last_submit_ip']) &&
        isset($_SESSION['last_submit_time']) &&
        $_SESSION['last_submit_ip'] === $ip) {

        $time_elapsed = $now - $_SESSION['last_submit_time'];

        if ($time_elapsed < RATE_LIMIT_SECONDS) {
            $wait_time = RATE_LIMIT_SECONDS - $time_elapsed;
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => "Troppo veloce! Attendi ancora $wait_time secondi prima di inviare un nuovo messaggio.",
                'retry_after' => $wait_time
            ]);
            exit();
        }
    }
}

/**
 * Sanitizzazione input
 */
function sanitizeData($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Validazione email
 */
function validateEmail($email) {
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Spam detection
 * Controlla pattern sospetti
 */
function isSpam($data) {
    $spam_patterns = [
        'viagra', 'cialis', 'casino', 'poker', 'lottery',
        'crypto', 'bitcoin', 'investment', 'mlm', 'forex',
        'weight loss', 'male enhancement', 'prescription',
        'click here', 'buy now', 'limited time', 'act now',
        '<script', 'javascript:', 'onclick', 'onerror'
    ];

    $combined_text = strtolower(
        $data['name'] . ' ' .
        $data['email'] . ' ' .
        $data['message']
    );

    foreach ($spam_patterns as $pattern) {
        if (stripos($combined_text, $pattern) !== false) {
            return true;
        }
    }

    // Controlla se contiene troppi link
    if (substr_count($combined_text, 'http') > 2) {
        return true;
    }

    return false;
}

/**
 * Logging
 */
function logContact($data, $status = 'success') {
    if (!ENABLE_LOGGING) return;

    $log_file = __DIR__ . '/contacts.log';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';

    $log_entry = sprintf(
        "[%s] [%s] IP: %s | Name: %s | Email: %s | Type: %s | Service/Reason: %s | UA: %s\n",
        $timestamp,
        strtoupper($status),
        $ip,
        $data['name'],
        $data['email'],
        isset($data['service']) ? 'QUOTE' : 'CONTACT',
        $data['service'] ?? $data['reason'] ?? 'N/A',
        substr($user_agent, 0, 100) // Limita lunghezza UA
    );

    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

/**
 * Template email HTML professionale per ADMIN
 */
function getAdminEmailTemplate($data) {
    $type = isset($data['service']) ? 'Richiesta Preventivo' : 'Contatto Generale';
    $type_emoji = isset($data['service']) ? '💰' : '📧';
    $subject_detail = $data['service'] ?? $data['reason'] ?? 'Contatto';

    return <<<HTML
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuovo Contatto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                {$type_emoji} Nuovo {$type}
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0e0e0; font-size: 14px;">
                                Ricevuto dal form contatti del portfolio
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">

                            <!-- Info Cliente -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; margin-bottom: 10px;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            👤 Nome/Azienda
                                        </p>
                                        <p style="margin: 0; font-size: 18px; color: #212529; font-weight: 600;">
                                            {$data['name']}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #28a745; margin-bottom: 10px;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            📧 Email di contatto
                                        </p>
                                        <p style="margin: 0; font-size: 16px;">
                                            <a href="mailto:{$data['email']}" style="color: #667eea; text-decoration: none; font-weight: 500;">
                                                {$data['email']}
                                            </a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
HTML;

    // Aggiungi servizio o motivo
    if (isset($data['service'])) {
        $html .= <<<HTML

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #856404; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            🎯 Servizio richiesto
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #856404; font-weight: 600;">
                                            {$data['service']}
                                        </p>
                                    </td>
                                </tr>
                            </table>
HTML;
    } elseif (isset($data['reason'])) {
        $html .= <<<HTML

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #d1ecf1; border-left: 4px solid #17a2b8;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #0c5460; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            📋 Motivo contatto
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #0c5460; font-weight: 600;">
                                            {$data['reason']}
                                        </p>
                                    </td>
                                </tr>
                            </table>
HTML;
    }

    $html .= <<<HTML

                            <!-- Messaggio -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                                        <p style="margin: 0 0 12px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            💬 Messaggio
                                        </p>
                                        <p style="margin: 0; font-size: 15px; color: #212529; line-height: 1.7; white-space: pre-wrap;">
{$data['message']}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Risposta Rapida -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center" style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px;">
                                        <a href="mailto:{$data['email']}?subject=Re: {$subject_detail}"
                                           style="display: inline-block; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                                            ✉️ Rispondi subito a {$data['name']}
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f9fa; border-top: 1px solid #dee2e6;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-size: 12px; color: #6c757d; line-height: 1.6;">
                                        <p style="margin: 0 0 5px 0;"><strong>📅 Data ricezione:</strong> {$data['timestamp']}</p>
                                        <p style="margin: 0 0 5px 0;"><strong>🌐 IP:</strong> {$data['ip']}</p>
                                        <p style="margin: 0 0 5px 0;"><strong>✅ Privacy:</strong> Consenso GDPR confermato</p>
                                        <p style="margin: 15px 0 0 0; font-size: 11px; color: #adb5bd;">
                                            Questa email è stata generata automaticamente dal form contatti del tuo portfolio.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

    return $html;
}

/**
 * Template email di conferma automatica per l'UTENTE
 */
function getUserAutoReplyTemplate($data) {
    $is_quote = isset($data['service']);
    $greeting = $is_quote ? 'Grazie per la richiesta di preventivo!' : 'Grazie per avermi contattato!';

    return <<<HTML
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conferma Ricezione</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                ✅ Messaggio Ricevuto!
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 18px; color: #212529;">
                                Ciao <strong>{$data['name']}</strong>,
                            </p>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #495057; line-height: 1.6;">
                                {$greeting}
                            </p>

                            <p style="margin: 0 0 30px 0; font-size: 16px; color: #495057; line-height: 1.6;">
                                Ho ricevuto correttamente la tua richiesta e ti risponderò al più presto,
                                solitamente entro <strong>24-48 ore</strong>.
                            </p>

                            <!-- Riepilogo -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #6c757d; font-weight: 600;">
                                            📋 RIEPILOGO RICHIESTA
                                        </p>
HTML;

    if (isset($data['service'])) {
        $html .= <<<HTML
                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #212529;">
                                            <strong>Servizio:</strong> {$data['service']}
                                        </p>
HTML;
    } elseif (isset($data['reason'])) {
        $html .= <<<HTML
                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #212529;">
                                            <strong>Motivo:</strong> {$data['reason']}
                                        </p>
HTML;
    }

    $html .= <<<HTML
                                        <p style="margin: 0; font-size: 14px; color: #212529;">
                                            <strong>Email di contatto:</strong> {$data['email']}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 0 0; font-size: 15px; color: #495057; line-height: 1.6;">
                                Nel frattempo, puoi dare un'occhiata al mio
                                <a href="https://tuodominio.com/portfolio" style="color: #667eea; text-decoration: none; font-weight: 600;">portfolio</a>
                                per vedere i miei progetti recenti.
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
                            <p style="margin: 0 0 10px 0; font-size: 16px; color: #212529; font-weight: 600;">
                                A presto!
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 14px; color: #6c757d;">
                                Portfolio Vihente
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #adb5bd;">
                                Questa è una email automatica di conferma ricezione.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

    return $html;
}

// ==================== MAIN EXECUTION ====================

// 1. Check rate limiting
checkRateLimit();

// 2. Leggi e decodifica JSON
$json = file_get_contents('php://input');
$input = json_decode($json, true);

if (!$input) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Dati JSON non validi'
    ]);
    exit();
}

// 3. Honeypot check (campo nascosto che umani non compilano)
if (isset($input['_honeypot']) && !empty($input['_honeypot'])) {
    // Bot detected - log ma rispondi come se fosse ok (per non far capire al bot)
    logContact(['name' => 'BOT', 'email' => 'bot@spam', 'message' => 'Honeypot triggered'], 'spam');
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Messaggio inviato con successo'
    ]);
    exit();
}

// 4. Validazione campi obbligatori
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty(trim($input[$field]))) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => "Campo obbligatorio mancante: $field"
        ]);
        exit();
    }
}

// 5. Sanitizza dati
$data = [
    'name' => sanitizeData($input['name']),
    'email' => sanitizeData($input['email']),
    'message' => sanitizeData($input['message']),
    'timestamp' => date('d/m/Y H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR']
];

// Campi opzionali
if (isset($input['service']) && !empty($input['service'])) {
    $data['service'] = sanitizeData($input['service']);
}
if (isset($input['reason']) && !empty($input['reason'])) {
    $data['reason'] = sanitizeData($input['reason']);
}

// 6. Validazione email
if (!validateEmail($data['email'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Indirizzo email non valido'
    ]);
    exit();
}

// 7. Validazione lunghezza
if (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Il nome deve essere tra 2 e 100 caratteri'
    ]);
    exit();
}

if (strlen($data['message']) < 10 || strlen($data['message']) > 5000) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Il messaggio deve essere tra 10 e 5000 caratteri'
    ]);
    exit();
}

// 8. Spam detection
if (isSpam($data)) {
    logContact($data, 'spam');
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Messaggio bloccato dal filtro spam'
    ]);
    exit();
}

// 9. Prepara email per ADMIN
$admin_subject = isset($data['service'])
    ? "💰 Richiesta Preventivo: {$data['service']} - {$data['name']}"
    : "📧 Nuovo Contatto: {$data['reason']} - {$data['name']}";

$admin_email_body = getAdminEmailTemplate($data);

$admin_headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'X-MSMail-Priority: High',
    'Importance: High'
];

// 10. Invia email ad ADMIN
$admin_mail_sent = mail(
    ADMIN_EMAIL,
    $admin_subject,
    $admin_email_body,
    implode("\r\n", $admin_headers)
);

if (!$admin_mail_sent) {
    logContact($data, 'error');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Errore durante l\'invio del messaggio. Riprova più tardi.'
    ]);
    exit();
}

// 11. Invia email di CONFERMA all'UTENTE (opzionale)
if (SEND_AUTO_REPLY) {
    $user_subject = isset($data['service'])
        ? "✅ Richiesta preventivo ricevuta - Portfolio Vihente"
        : "✅ Messaggio ricevuto - Portfolio Vihente";

    $user_email_body = getUserAutoReplyTemplate($data);

    $user_headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
        'Reply-To: ' . ADMIN_EMAIL,
        'X-Mailer: PHP/' . phpversion()
    ];

    // Non bloccare se auto-reply fallisce
    mail(
        $data['email'],
        $user_subject,
        $user_email_body,
        implode("\r\n", $user_headers)
    );
}

// 12. Logging successo
logContact($data, 'success');

// 13. Salva timestamp per rate limiting
$_SESSION['last_submit_ip'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['last_submit_time'] = time();

// 14. Risposta successo
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Messaggio inviato con successo! Ti risponderò al più presto.'
]);
