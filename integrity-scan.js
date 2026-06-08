#!/usr/bin/env node
/*
 * integrity-scan.js - Scanner byte-level dei file sorgente.
 *
 * Zero dipendenze (solo fs, path, util.TextDecoder). Nessuno step di build.
 *
 * Difende da attacchi che vivono nei BYTE, non nella logica:
 *   - Trojan Source / BiDi override (CVE-2021-42574): codice che si legge in
 *     un modo e si esegue in un altro.
 *   - Caratteri invisibili / zero-width (nascondono payload o spezzano i token).
 *   - Non-characters e Private Use Area (parser/rendering imprevedibili).
 *   - Script confusable / homoglyph (Cirillico, Greco, Armeno, Cherokee, Coptic)
 *     che imitano l'ASCII Latino in identificatori, URL, import.
 *   - UTF-8 non valido (overlong, surrogati, troncamenti).
 *   - Nomi file non-ASCII (il mandato impone ASCII in nomi/path/identificatori).
 *
 * Il testo Latino accentato (italiano: a-grave, e-acuta, ...), la punteggiatura
 * tipografica (trattini, virgolette, ellissi, punto medio) e le emoji NON sono
 * vettori per gli identificatori e sono consentiti.
 *
 * Uso:
 *     node integrity-scan.js
 * Esce con codice 1 se almeno un file e' [FAIL]. Gate prima di ogni merge.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = import.meta.dirname;
const SKIP_DIRS = /^(node_modules|\.git|dist|build|coverage)$/;
const BINARY_EXT = /\.(woff2?|ttf|otf|eot|mp3|ogg|opus|wav|m4a|webp|png|jpe?g|gif|ico|avif|pdf|zip|gz|mp4|webm)$/i;

let fails = 0, scanned = 0;
const problems = [];

// ---- Classificazione dei code point pericolosi ------------------------------
function classify(cp) {
  // BiDi controls / Trojan Source
  if (cp === 0x061C || cp === 0x200E || cp === 0x200F ||
      (cp >= 0x202A && cp <= 0x202E) || (cp >= 0x2066 && cp <= 0x2069)) return 'BIDI';
  // Zero-width / invisibili / join controls / BOM
  if (cp === 0x200B || cp === 0x200C || cp === 0x200D ||
      cp === 0x2060 || cp === 0x2061 || cp === 0x2062 || cp === 0x2063 ||
      cp === 0xFEFF) return 'ZERO_WIDTH';
  // Non-characters
  if ((cp >= 0xFDD0 && cp <= 0xFDEF) || (cp & 0xFFFE) === 0xFFFE) return 'NONCHAR';
  // Private Use Area (BMP + supplementari)
  if ((cp >= 0xE000 && cp <= 0xF8FF) ||
      (cp >= 0xF0000 && cp <= 0xFFFFD) || (cp >= 0x100000 && cp <= 0x10FFFD)) return 'PUA';
  // Script confusable con l'ASCII Latino
  if ((cp >= 0x0400 && cp <= 0x052F) ||   // Cirillico (+ supplemento)
      (cp >= 0x0370 && cp <= 0x03FF) ||   // Greco/Copto
      (cp >= 0x0530 && cp <= 0x058F) ||   // Armeno
      (cp >= 0x2C80 && cp <= 0x2CFF) ||   // Coptic
      (cp >= 0x13A0 && cp <= 0x13FF)) return 'CONFUSABLE';
  // Tag characters (usati per smuggling, deprecati)
  if (cp >= 0xE0000 && cp <= 0xE007F) return 'TAG';
  return null;
}

function isAsciiPath(p) {
  for (let i = 0; i < p.length; i++) {
    const c = p.charCodeAt(i);
    if (c < 0x20 || c > 0x7E) return false;
  }
  return true;
}

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.test(e.name)) continue;
      walk(abs, acc);
    } else {
      acc.push(abs);
    }
  }
  return acc;
}

const decoder = new TextDecoder('utf-8', { fatal: true });

for (const abs of walk(ROOT, [])) {
  const rel = path.relative(ROOT, abs);

  // 1) Nome file / path: solo ASCII
  if (!isAsciiPath(rel)) {
    problems.push('[FAIL] Nome file non-ASCII: ' + JSON.stringify(rel));
    fails++;
  }

  // I binari non si scansionano nel contenuto (ma il nome si').
  if (BINARY_EXT.test(rel)) continue;

  scanned++;
  const buf = fs.readFileSync(abs);

  // 2) UTF-8 strict
  let text;
  try {
    text = decoder.decode(buf);
  } catch {
    problems.push('[FAIL] UTF-8 non valido: ' + rel);
    fails++;
    continue;
  }

  // 3) Code point pericolosi
  const found = {};
  let line = 1;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp === 0x0A) line++;
    const kind = classify(cp);
    if (kind) {
      const key = kind + ' U+' + cp.toString(16).toUpperCase().padStart(4, '0');
      if (!found[key]) found[key] = line;
    }
  }
  const keys = Object.keys(found);
  if (keys.length) {
    for (const k of keys) {
      problems.push('[FAIL] ' + rel + ' (riga ~' + found[k] + '): ' + k);
      fails++;
    }
  }
}

console.log('=== integrity-scan: scansione byte-level ===');
if (problems.length) {
  for (const p of problems) console.log('  ' + p);
} else {
  console.log('  Nessun carattere pericoloso rilevato.');
}
console.log('--------------------------------------------------');
console.log(`File di contenuto scansionati: ${scanned} | FAIL: ${fails}`);
console.log('--------------------------------------------------');
process.exit(fails > 0 ? 1 : 0);
