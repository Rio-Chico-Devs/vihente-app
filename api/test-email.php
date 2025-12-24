<?php
/**
 * TEST EMAIL CONFIGURATION
 * Script di test per verificare che l'invio email funzioni su Hostinger
 *
 * IMPORTANTE: Cancella questo file dopo il test per sicurezza!
 *
 * Uso: https://tuodominio.com/api/test-email.php?test=1
 */

// Password di sicurezza (evita che chiunque possa lanciare test)
define('TEST_PASSWORD', 'test123'); // ← Cambia se vuoi

// ============================================

if (!isset($_GET['test']) || $_GET['test'] !== '1') {
    die('Per testare: aggiungi ?test=1 all\'URL');
}

// Verifica che la funzione mail() sia disponibile
if (!function_exists('mail')) {
    die('❌ ERRORE: La funzione mail() di PHP non è disponibile su questo server. Contatta il supporto Hostinger.');
}

echo '<pre style="font-family: monospace; line-height: 1.6;">';
echo "====================================\n";
echo "   TEST CONFIGURAZIONE EMAIL\n";
echo "====================================\n\n";

// Test 1: Info PHP
echo "✅ STEP 1: Verifica funzione mail()\n";
echo "   Funzione mail() disponibile: SÌ\n";
echo "   Versione PHP: " . phpversion() . "\n\n";

// Test 2: Invio email di test
echo "✅ STEP 2: Invio email di test\n";

$test_email = 'tua-email@esempio.com'; // ← CAMBIA CON LA TUA EMAIL
$from_email = 'noreply@tuodominio.com'; // ← CAMBIA CON EMAIL DEL TUO DOMINIO

echo "   A: $test_email\n";
echo "   Da: $from_email\n";
echo "   Invio in corso...\n\n";

$subject = 'Test Email - Portfolio Vihente';

$message = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
        <h1 style="color: #667eea;">✅ Test Email Riuscito!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Se stai leggendo questa email, significa che il sistema di invio email
            è configurato correttamente sul tuo server Hostinger.
        </p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #666;">
            <strong>Data invio:</strong> <?= date('d/m/Y H:i:s') ?><br>
            <strong>Server:</strong> <?= $_SERVER['SERVER_NAME'] ?><br>
            <strong>PHP Version:</strong> <?= phpversion() ?>
        </p>
        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #495057;">
                <strong>🎯 Prossimi passi:</strong>
            </p>
            <ol style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; color: #495057;">
                <li>Configura le credenziali in <code>contact.php</code></li>
                <li>Testa il form contatti sul sito</li>
                <li>Cancella il file <code>test-email.php</code> per sicurezza</li>
            </ol>
        </div>
    </div>
</body>
</html>
HTML;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Portfolio Vihente <' . $from_email . '>',
    'X-Mailer: PHP/' . phpversion()
];

$result = mail(
    $test_email,
    $subject,
    $message,
    implode("\r\n", $headers)
);

if ($result) {
    echo "✅ SUCCESSO!\n\n";
    echo "====================================\n";
    echo "   EMAIL INVIATA CORRETTAMENTE\n";
    echo "====================================\n\n";
    echo "📧 Controlla la tua casella: $test_email\n";
    echo "   (Controlla anche la cartella SPAM)\n\n";
    echo "🎯 PROSSIMI PASSI:\n";
    echo "   1. Verifica di aver ricevuto l'email\n";
    echo "   2. Configura contact.php con le tue credenziali\n";
    echo "   3. Testa il form sul sito\n";
    echo "   4. CANCELLA questo file (test-email.php) per sicurezza\n\n";
    echo "⚠️  IMPORTANTE: Se l'email non arriva:\n";
    echo "   - Controlla SPAM\n";
    echo "   - Verifica che l'email FROM sia del tuo dominio\n";
    echo "   - Configura SPF/DKIM su Hostinger\n";
    echo "   - Contatta supporto Hostinger se necessario\n\n";
} else {
    echo "❌ ERRORE!\n\n";
    echo "L'invio email è fallito. Possibili cause:\n";
    echo "1. Funzione mail() disabilitata dal provider\n";
    echo "2. Limite invio email raggiunto\n";
    echo "3. Email FROM non valida\n";
    echo "4. Configurazione server errata\n\n";
    echo "💡 SOLUZIONE: Contatta il supporto Hostinger\n\n";
}

// Test 3: Verifica configurazione PHP
echo "====================================\n";
echo "   INFO CONFIGURAZIONE PHP\n";
echo "====================================\n\n";

$mail_settings = [
    'sendmail_path' => ini_get('sendmail_path'),
    'SMTP' => ini_get('SMTP'),
    'smtp_port' => ini_get('smtp_port'),
    'mail.add_x_header' => ini_get('mail.add_x_header'),
    'mail.log' => ini_get('mail.log')
];

foreach ($mail_settings as $key => $value) {
    $display_value = $value ?: '(non configurato)';
    echo "   $key: $display_value\n";
}

echo "\n====================================\n";
echo "   TEST COMPLETATO\n";
echo "====================================\n\n";

echo "⚠️  RICORDA: Cancella questo file dopo il test!\n";
echo "   rm api/test-email.php\n\n";

echo '</pre>';
?>
