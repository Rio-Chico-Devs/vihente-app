<?php
/**
 * VIHENTE CONTACT FORM API
 * Sistema email enterprise-grade per Hostinger
 */

// ==================== CONFIGURA QUI LE TUE EMAIL ====================

// Email dove RICEVERE i contatti (può essere Gmail, Outlook, etc.)
define('ADMIN_EMAIL', 'TUA-EMAIL@ESEMPIO.COM');  // <- CAMBIA QUESTA

// Email di INVIO (meglio se del tuo dominio per deliverability)
define('FROM_EMAIL', 'noreply@TUODOMINIO.COM');   // <- CAMBIA QUESTA
define('FROM_NAME', 'Portfolio Vihente');

// Domini consentiti (CORS)
$allowed_origins = [
    'https://TUODOMINIO.COM',     // <- CAMBIA con il tuo dominio reale
    'http://localhost:5173',      // Per sviluppo locale Vite
    'http://localhost:4173'       // Per test preview
];

// ========================================================================

// Configurazioni avanzate (puoi lasciare cosi)
define('RATE_LIMIT_SECONDS', 60);    // Tempo minimo tra invii (60 sec)
define('ENABLE_LOGGING', true);       // Abilita log in contacts.log
define('SEND_AUTO_REPLY', true);      // Invia email conferma all'utente

// Security headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: " . $allowed_origins[0]);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo POST consentito
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    exit();
}

session_start();

// Rate Limiting
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $now = time();

    if (isset($_SESSION['last_submit_ip']) &&
        isset($_SESSION['last_submit_time']) &&
        $_SESSION['last_submit_ip'] === $ip) {

        $time_elapsed = $now - $_SESSION['last_submit_time'];

        if ($time_elapsed < RATE_LIMIT_SECONDS) {
            $wait_time = RATE_LIMIT_SECONDS - $time_elapsed;
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => "Attendi ancora $wait_time secondi prima di inviare un nuovo messaggio.",
                'retry_after' => $wait_time
            ]);
            exit();
        }
    }
}

function sanitizeData($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isSpam($data) {
    $spam_patterns = [
        'viagra', 'cialis', 'casino', 'poker', 'lottery',
        'crypto', 'bitcoin', 'investment', 'mlm', 'forex',
        'weight loss', 'prescription', 'click here', 'buy now',
        '<script', 'javascript:', 'onclick', 'onerror'
    ];

    $combined_text = strtolower($data['name'] . ' ' . $data['email'] . ' ' . $data['message']);

    foreach ($spam_patterns as $pattern) {
        if (stripos($combined_text, $pattern) !== false) {
            return true;
        }
    }

    if (substr_count($combined_text, 'http') > 2) {
        return true;
    }

    return false;
}

function logContact($data, $status = 'success') {
    if (!ENABLE_LOGGING) return;

    $log_file = __DIR__ . '/contacts.log';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];

    $log_entry = sprintf(
        "[%s] [%s] %s | %s | %s\n",
        $timestamp,
        strtoupper($status),
        $data['name'],
        $data['email'],
        $data['service'] ?? $data['reason'] ?? 'N/A'
    );

    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

function getAdminEmailTemplate($data) {
    $type = isset($data['service']) ? 'Richiesta Preventivo' : 'Contatto Generale';
    
    $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>';
    $html .= '<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">';
    $html .= '<div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">';
    
    // Header
    $html .= '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">';
    $html .= "<h1 style='margin: 0; color: white; font-size: 28px;'>Nuovo {$type}</h1>";
    $html .= '<p style="margin: 10px 0 0 0; color: #e0e0e0;">Ricevuto dal form contatti</p>';
    $html .= '</div>';
    
    // Content
    $html .= '<div style="padding: 30px;">';
    
    // Nome
    $html .= '<div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea;">';
    $html .= '<p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Nome/Azienda</p>';
    $html .= "<p style='margin: 0; font-size: 18px; font-weight: 600;'>{$data['name']}</p>";
    $html .= '</div>';
    
    // Email
    $html .= '<div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #28a745;">';
    $html .= '<p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Email</p>';
    $html .= "<p style='margin: 0; font-size: 16px;'><a href='mailto:{$data['email']}' style='color: #667eea; text-decoration: none;'>{$data['email']}</a></p>";
    $html .= '</div>';
    
    // Servizio o Motivo
    if (isset($data['service'])) {
        $html .= '<div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107;">';
        $html .= '<p style="margin: 0 0 5px 0; font-size: 12px; color: #856404; text-transform: uppercase;">Servizio richiesto</p>';
        $html .= "<p style='margin: 0; font-size: 16px; color: #856404; font-weight: 600;'>{$data['service']}</p>";
        $html .= '</div>';
    } elseif (isset($data['reason'])) {
        $html .= '<div style="margin-bottom: 20px; padding: 15px; background: #d1ecf1; border-left: 4px solid #17a2b8;">';
        $html .= '<p style="margin: 0 0 5px 0; font-size: 12px; color: #0c5460; text-transform: uppercase;">Motivo contatto</p>';
        $html .= "<p style='margin: 0; font-size: 16px; color: #0c5460; font-weight: 600;'>{$data['reason']}</p>";
        $html .= '</div>';
    }
    
    // Messaggio
    $html .= '<div style="margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 6px;">';
    $html .= '<p style="margin: 0 0 10px 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Messaggio</p>';
    $html .= "<p style='margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;'>{$data['message']}</p>";
    $html .= '</div>';
    
    // CTA
    $html .= '<div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px;">';
    $html .= "<a href='mailto:{$data['email']}' style='color: white; text-decoration: none; font-size: 16px; font-weight: 600;'>Rispondi a {$data['name']}</a>";
    $html .= '</div>';
    
    $html .= '</div>';
    
    // Footer
    $html .= '<div style="padding: 20px; background: #f8f9fa; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">';
    $html .= "<p style='margin: 5px 0;'><strong>Data:</strong> {$data['timestamp']}</p>";
    $html .= "<p style='margin: 5px 0;'><strong>IP:</strong> {$data['ip']}</p>";
    $html .= "<p style='margin: 5px 0;'><strong>Privacy:</strong> Consenso GDPR confermato</p>";
    $html .= '</div>';
    
    $html .= '</div></body></html>';
    
    return $html;
}

function getUserAutoReplyTemplate($data) {
    $greeting = isset($data['service']) ? 'Grazie per la richiesta di preventivo!' : 'Grazie per avermi contattato!';
    
    $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>';
    $html .= '<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">';
    $html .= '<div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">';
    
    $html .= '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">';
    $html .= '<h1 style="margin: 0; color: white; font-size: 28px;">Messaggio Ricevuto</h1>';
    $html .= '</div>';
    
    $html .= '<div style="padding: 40px;">';
    $html .= "<p style='margin: 0 0 20px 0; font-size: 18px;'>Ciao <strong>{$data['name']}</strong>,</p>";
    $html .= "<p style='margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;'>{$greeting}</p>";
    $html .= "<p style='margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;'>Ho ricevuto correttamente la tua richiesta e ti rispondero entro <strong>24-48 ore</strong>.</p>";
    
    $html .= '<div style="padding: 20px; background: #f8f9fa; border-radius: 6px; margin: 20px 0;">';
    $html .= '<p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">RIEPILOGO RICHIESTA</p>';
    if (isset($data['service'])) {
        $html .= "<p style='margin: 5px 0; font-size: 14px;'><strong>Servizio:</strong> {$data['service']}</p>";
    } elseif (isset($data['reason'])) {
        $html .= "<p style='margin: 5px 0; font-size: 14px;'><strong>Motivo:</strong> {$data['reason']}</p>";
    }
    $html .= "<p style='margin: 5px 0; font-size: 14px;'><strong>Email:</strong> {$data['email']}</p>";
    $html .= '</div>';
    
    $html .= '</div>';
    
    $html .= '<div style="padding: 30px; background: #f8f9fa; text-align: center; border-top: 1px solid #dee2e6;">';
    $html .= '<p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">A presto!</p>';
    $html .= '<p style="margin: 0 0 5px 0; font-size: 14px;">Portfolio Vihente</p>';
    $html .= '<p style="margin: 0; font-size: 12px; color: #6c757d;">Email automatica di conferma</p>';
    $html .= '</div>';
    
    $html .= '</div></body></html>';
    
    return $html;
}

// ==================== MAIN EXECUTION ====================

checkRateLimit();

$json = file_get_contents('php://input');
$input = json_decode($json, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dati non validi']);
    exit();
}

// Honeypot
if (isset($input['_honeypot']) && !empty($input['_honeypot'])) {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit();
}

// Validazione campi
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty(trim($input[$field]))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Campo mancante: $field"]);
        exit();
    }
}

// Sanitizza
$data = [
    'name' => sanitizeData($input['name']),
    'email' => sanitizeData($input['email']),
    'message' => sanitizeData($input['message']),
    'timestamp' => date('d/m/Y H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR']
];

if (isset($input['service']) && !empty($input['service'])) {
    $data['service'] = sanitizeData($input['service']);
}
if (isset($input['reason']) && !empty($input['reason'])) {
    $data['reason'] = sanitizeData($input['reason']);
}

// Validazioni
if (!validateEmail($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email non valida']);
    exit();
}

if (strlen($data['name']) < 2 || strlen($data['message']) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dati troppo corti']);
    exit();
}

if (isSpam($data)) {
    logContact($data, 'spam');
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Messaggio bloccato']);
    exit();
}

// Invia email ADMIN
$admin_subject = isset($data['service']) 
    ? "Preventivo: {$data['service']} - {$data['name']}"
    : "Contatto: {$data['name']}";

$admin_body = getAdminEmailTemplate($data);

$admin_headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $data['email'],
    'X-Mailer: PHP/' . phpversion()
];

$admin_sent = mail(ADMIN_EMAIL, $admin_subject, $admin_body, implode("\r\n", $admin_headers));

if (!$admin_sent) {
    logContact($data, 'error');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore invio']);
    exit();
}

// Auto-reply utente
if (SEND_AUTO_REPLY) {
    $user_subject = 'Messaggio ricevuto - Portfolio Vihente';
    $user_body = getUserAutoReplyTemplate($data);
    $user_headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    mail($data['email'], $user_subject, $user_body, implode("\r\n", $user_headers));
}

logContact($data, 'success');

$_SESSION['last_submit_ip'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['last_submit_time'] = time();

http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Messaggio inviato!']);
?>
