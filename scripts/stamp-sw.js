#!/usr/bin/env node
/*
 * stamp-sw.js — timbra dist/sw.js con una versione univoca a fine build.
 *
 * Zero dipendenze (solo node:fs/node:path, ESM perche' il package.json ha
 * "type": "module"), coerente con la regola del progetto "gli script di
 * supporto girano con node puro".
 *
 * Perche' serve: public/sw.js viene copiato verbatim nella build. Se i suoi
 * byte non cambiano tra un deploy e l'altro, il browser considera il SW
 * identico: il nuovo SW non viene mai installato, l'evento 'activate' non
 * gira e la cache col nome vecchio non viene mai ripulita, accumulando gli
 * asset hashati di ogni deploy precedente per sempre.
 *
 * Uso (agganciato a npm run build): vite build && node scripts/stamp-sw.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SW_PATH = path.join(__dirname, '..', 'dist', 'sw.js');
const PLACEHOLDER = '__SW_VERSION__';

if (!fs.existsSync(SW_PATH)) {
  console.error(`[stamp-sw] ${SW_PATH} non trovato: eseguire prima "vite build".`);
  process.exit(1);
}

const source = fs.readFileSync(SW_PATH, 'utf8');

if (!source.includes(PLACEHOLDER)) {
  console.warn("[stamp-sw] placeholder gia' sostituito o assente: nessuna modifica.");
  process.exit(0);
}

// Timestamp compatto in base36: univoco per build, leggibile nei DevTools.
const version = `v${Date.now().toString(36)}`;

fs.writeFileSync(SW_PATH, source.replaceAll(PLACEHOLDER, version));
console.log(`[stamp-sw] dist/sw.js timbrato con CACHE_VERSION=${version}`);
