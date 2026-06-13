#!/usr/bin/env node
/*
 * security-audit.js - Audit di CONFIGURAZIONE della baseline di sicurezza.
 *
 * Zero dipendenze: usa solo i moduli core di Node (fs, path).
 * Nessuno step di build: what-you-read-is-what-runs.
 *
 * Uso:
 *     node security-audit.js
 *
 * Esce con codice 1 se almeno un controllo e' [FAIL]. I [WARN] non bloccano
 * ma vanno letti. Questo file e' un GATE da eseguire prima di ogni merge e
 * protegge la baseline anche da modifiche introdotte da un'AI (prompt
 * injection): se qualcuno riapre un buco, qui diventa rosso.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = import.meta.dirname;
let fails = 0, warns = 0, passes = 0;

function read(rel) {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
  catch { return null; }
}
function exists(rel) {
  try { fs.accessSync(path.join(ROOT, rel)); return true; }
  catch { return false; }
}
function pass(m) { passes++; console.log('  [PASS] ' + m); }
function warn(m) { warns++; console.log('  [WARN] ' + m); }
function fail(m) { fails++; console.log('  [FAIL] ' + m); }
function section(t) { console.log('\n=== ' + t + ' ==='); }

// ---------------------------------------------------------------------------
section('Header di sicurezza (public/.htaccess)');

const ht = read('public/.htaccess');
if (!ht) {
  fail('public/.htaccess mancante: nessun header di sicurezza servito.');
} else {
  const cspMatch = ht.match(/Content-Security-Policy"?\s+"([^"]+)"/i);
  if (!cspMatch) {
    fail('CSP assente in public/.htaccess.');
  } else {
    const csp = cspMatch[1];
    const has = (d) => csp.includes(d);

    has("default-src 'none'") ? pass("CSP: default-src 'none'.")
      : fail("CSP: manca default-src 'none' (base deny-all).");

    // script-src senza unsafe-inline / unsafe-eval / wildcard
    const script = (csp.match(/script-src ([^;]+)/) || [, ''])[1];
    if (!script.includes("'self'")) fail("CSP: script-src deve includere 'self'.");
    else if (/unsafe-inline|unsafe-eval|\*|https?:(?!\/)/.test(script))
      fail('CSP: script-src contiene unsafe-inline/unsafe-eval/wildcard: ' + script.trim());
    else pass('CSP: script-src sicuro (' + script.trim() + ').');

    has("object-src 'none'") ? pass("CSP: object-src 'none'.")
      : fail("CSP: manca object-src 'none'.");
    has("frame-ancestors 'none'") ? pass("CSP: frame-ancestors 'none'.")
      : fail("CSP: manca frame-ancestors 'none'.");
    has("base-uri 'self'") || has("base-uri 'none'") ? pass('CSP: base-uri bloccato.')
      : fail('CSP: manca base-uri.');
    has("form-action 'self'") || has("form-action 'none'") ? pass('CSP: form-action bloccato.')
      : fail('CSP: manca form-action.');

    // nessuna terza parte
    /googleapis|gstatic|http:\/\/|\bhttps:(\s|;)/.test(csp)
      ? fail('CSP: riferimenti a terze parti / wildcard di schema presenti.')
      : pass('CSP: nessuna terza parte (tutto self).');

    // img-src senza wildcard https:
    const img = (csp.match(/img-src ([^;]+)/) || [, ''])[1];
    /\bhttps:(\s|$)|\*/.test(img)
      ? fail('CSP: img-src troppo permissivo (' + img.trim() + ').')
      : pass('CSP: img-src ristretto (' + (img.trim() || 'n/d') + ').');
  }

  // HSTS
  const hsts = ht.match(/Strict-Transport-Security"?\s+"([^"]+)"/i);
  if (!hsts) fail('HSTS assente.');
  else {
    const v = hsts[1];
    const age = (v.match(/max-age=(\d+)/) || [, '0'])[1] * 1;
    (age >= 31536000 && /includeSubDomains/i.test(v) && /preload/i.test(v))
      ? pass('HSTS: max-age>=1y + includeSubDomains + preload.')
      : fail('HSTS debole: ' + v);
  }

  /X-Content-Type-Options"?\s+"nosniff"/i.test(ht)
    ? pass('X-Content-Type-Options: nosniff.') : fail('Manca X-Content-Type-Options nosniff.');

  // X-XSS-Protection deve essere 0 (deprecato) e MAI "1; mode=block"
  if (/X-XSS-Protection"?\s+"1/i.test(ht)) fail('X-XSS-Protection legacy "1; mode=block" presente (deprecato/dannoso).');
  else if (/X-XSS-Protection"?\s+"0"/i.test(ht)) pass('X-XSS-Protection: 0 (auditor legacy disattivato).');
  else warn('X-XSS-Protection non impostato (accettabile, ma 0 e\' la prassi 2026).');

  /Referrer-Policy/i.test(ht) ? pass('Referrer-Policy presente.') : fail('Manca Referrer-Policy.');
  /Permissions-Policy/i.test(ht) ? pass('Permissions-Policy presente.') : fail('Manca Permissions-Policy.');
  /Cross-Origin-Opener-Policy"?\s+"same-origin"/i.test(ht)
    ? pass('COOP: same-origin.') : warn('COOP same-origin non impostato.');
  /Cross-Origin-Resource-Policy/i.test(ht) ? pass('CORP presente.') : warn('CORP non impostato.');
  /X-Frame-Options"?\s+"DENY"/i.test(ht) ? pass('X-Frame-Options: DENY.') : warn('X-Frame-Options non DENY.');
}

// ---------------------------------------------------------------------------
section('index.html');

const html = read('index.html');
if (html) {
  /http-equiv=["'](Content-Security-Policy|X-Frame-Options|Permissions-Policy|Strict-Transport-Security)/i.test(html)
    ? fail('index.html: header di sicurezza messi come <meta http-equiv> (ignorati dai browser).')
    : pass('index.html: nessun header di sicurezza fasullo via <meta>.');
}

// ---------------------------------------------------------------------------
section('Dipendenze runtime (supply-chain / slopsquatting)');

const pkg = JSON.parse(read('package.json') || '{}');
const allow = new Set(['react', 'react-dom', 'react-router-dom', 'validator', 'vanilla-cookieconsent']);
const deps = Object.keys(pkg.dependencies || {});
const extra = deps.filter((d) => !allow.has(d));
if (extra.length) fail('Dipendenze runtime fuori allowlist: ' + extra.join(', '));
else pass('Dipendenze runtime nella allowlist (' + deps.length + ': ' + deps.join(', ') + ').');

// ---------------------------------------------------------------------------
section('Backend PHP (api/)');

exists('api/test-email.php')
  ? fail('api/test-email.php presente: file di test va rimosso.')
  : pass('api/test-email.php assente.');

const viewLogs = read('api/view-logs.php');
if (viewLogs) {
  /\$_GET\[['"]pass['"]\]/.test(viewLogs)
    ? fail('view-logs.php: password letta dalla query string (GET).')
    : pass('view-logs.php: nessuna password in GET.');
  /define\(\s*['"]LOG_PASSWORD['"]/.test(viewLogs) || /Vihente2024Secure/.test(viewLogs)
    ? fail('view-logs.php: password in chiaro nel sorgente.')
    : pass('view-logs.php: nessuna password in chiaro.');
  /password_verify\s*\(/.test(viewLogs)
    ? pass('view-logs.php: auth via password_verify (hash).')
    : warn('view-logs.php: password_verify non trovato.');
} else {
  warn('api/view-logs.php non trovato (ok se rimosso del tutto).');
}

const contact = read('api/contact.php');
if (contact) {
  /function\s+sanitizeHeader/.test(contact)
    ? pass('contact.php: sanitizeHeader presente (anti email-header injection).')
    : fail('contact.php: manca la sanitizzazione anti CRLF degli header email.');
  /X-Mailer:\s*PHP\/'\s*\.\s*phpversion/.test(contact)
    ? fail('contact.php: espone la versione PHP via X-Mailer.')
    : pass('contact.php: non espone la versione PHP.');
}

const apiHt = read('api/.htaccess');
if (apiHt) {
  /X-XSS-Protection"?\s+"1/i.test(apiHt)
    ? fail('api/.htaccess: X-XSS-Protection legacy presente.')
    : pass('api/.htaccess: nessun X-XSS-Protection legacy.');
}

// ---------------------------------------------------------------------------
section('Sink XSS e font di terze parti (src/)');

function walk(dir, acc) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (/node_modules|\.git|dist|build/.test(rel)) continue;
      walk(rel, acc);
    } else acc.push(rel);
  }
  return acc;
}
const srcFiles = walk('src', []);

const sinkRe = /\binnerHTML\b|\bouterHTML\b|dangerouslySetInnerHTML|\beval\s*\(|new\s+Function\s*\(|document\.write\s*\(|insertAdjacentHTML/;
const sinkHits = srcFiles.filter((f) => {
  const c = read(f) || '';
  // ignora i commenti che NOMINANO i sink (la nostra documentazione)
  const code = c.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  return sinkRe.test(code);
});
sinkHits.length ? fail('Sink XSS nel codice: ' + sinkHits.join(', ')) : pass('Nessun sink XSS (innerHTML/eval/document.write/...) nel codice.');

const cssGoogle = srcFiles.filter((f) => f.endsWith('.css') && /fonts\.googleapis|fonts\.gstatic/.test(read(f) || ''));
cssGoogle.length ? fail('@import Google Fonts ancora presente in: ' + cssGoogle.join(', ')) : pass('Nessun font di terze parti nei CSS (tutto self-hostato).');

// ---------------------------------------------------------------------------
console.log('\n--------------------------------------------------');
console.log(`Risultato: ${passes} PASS, ${warns} WARN, ${fails} FAIL`);
console.log('--------------------------------------------------');
process.exit(fails > 0 ? 1 : 0);
