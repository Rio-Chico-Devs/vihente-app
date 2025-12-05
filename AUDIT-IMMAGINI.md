# 📸 AUDIT IMMAGINI - VIHENTE APP

**Data:** 5 Dicembre 2025
**Progetto:** Vihente Portfolio (React + Vite)
**Tema:** Cyberpunk/Tech Dark/Light Mode
**Branch:** `claude/missing-images-audit-01ETzu4uTBU5ZNsFGna6gomC`

---

## 🎯 RIEPILOGO ESECUTIVO

**Totale immagini mancanti:** 22 file
**Priorità critica:** 1 bug da fixare subito
**Priorità alta:** 4 immagini portfolio
**Priorità media:** 18 immagini e-commerce (opzionale - ha fallback)

---

## 🚨 PRIORITÀ CRITICA - DA FIXARE SUBITO

### Bug Twitter Meta Tag
**File:** `index.html` linea 36
**Problema:** Il meta tag Twitter punta a `/og-image.jpg` ma il file si chiama `/og-image.png`

**Fix richiesto:**
```html
<!-- PRIMA (❌ ERRATO) -->
<meta property="twitter:image" content="https://rio-chico-devs.github.io/vihente-app/og-image.jpg" />

<!-- DOPO (✅ CORRETTO) -->
<meta property="twitter:image" content="https://rio-chico-devs.github.io/vihente-app/og-image.png" />
```

**Impatto:** Condivisione Twitter non mostra l'anteprima corretta.

---

## 📂 STRUTTURA CARTELLE - BEST PRACTICES

### ✅ Struttura Attuale
Il progetto usa **Vite** (non Next.js), quindi la struttura corretta è:

```
/home/user/vihente-app/
├── public/              ← TUTTE le immagini vanno qui
│   ├── favicon.svg      ✓ Esistente
│   ├── og-image.png     ✓ Esistente
│   ├── vite.svg         ✓ Esistente (inutilizzato)
│   │
│   ├── screenshots/     ✓ Creata (DA POPOLARE)
│   │   ├── rcs.jpg
│   │   ├── portfolio-fotografo.jpg
│   │   └── saas-landing.jpg
│   │
│   ├── logos/           ✓ Creata (DA POPOLARE)
│   │   └── rcs-logo.png
│   │
│   └── shop/            ✓ Esiste (DA POPOLARE)
│       ├── singularity.jpg
│       ├── anomaly.jpg
│       └── ... (altre 16 immagini)
```

### 🎯 Perché `/public/` ?
- **Vite** serve i file da `/public/` alla root del dominio
- Un file in `/public/image.jpg` diventa accessibile come `/image.jpg` nel browser
- **NON** importare immagini come moduli (`import img from './img.jpg'`) - il progetto usa path assoluti

### 📝 Convenzioni di Naming
- **Minuscole:** `rcs.jpg` (non `RCS.jpg`)
- **Separatori:** `portfolio-fotografo.jpg` (non `portfolio_fotografo.jpg`)
- **Descrittivi:** `hero-cyberpunk.jpg` (non `img1.jpg`)

---

## 🖼️ IMMAGINI MANCANTI - DETTAGLIO COMPLETO

---

### 1️⃣ PRIORITÀ ALTA - Portfolio Siti Web

**Componente:** `src/components/sections/Portfolio/SitiWebShowcase/SitiWebShowcase.jsx`
**Uso:** Showcase progetti realizzati per clienti
**Visibilità:** Alta - pagina portfolio principale

---

#### 📸 Immagine #1: Screenshot RCS Materiali Compositi

```
Path attuale:     /placeholder-rcs.jpg (linea 13)
Path corretto:    /screenshots/rcs.jpg
File fisico:      /home/user/vihente-app/public/screenshots/rcs.jpg
```

**Specifiche Tecniche:**
- **Dimensioni:** 1200x800px (ratio 3:2)
- **Formato:** JPG
- **Qualità:** 85% (buon compromesso qualità/peso)
- **Peso target:** < 150 KB
- **DPI:** 72 DPI (standard web)
- **Ottimizzazione:** Compressione web-friendly

**Cosa fotografare:**
- Screenshot homepage sito RCS Materiali Compositi (https://rcsmaterialicompositi.com)
- Desktop view (non mobile)
- Cattura "above the fold" (parte visibile senza scroll)
- Assicurati che logo e branding siano visibili

**Strumenti consigliati:**
- Screenshot browser: Chrome DevTools (1200x800 viewport)
- Online: [Screely.com](https://screely.com) per mockup professionali
- Design tool: Figma con mockup browser

---

#### 🏢 Logo #1: RCS Logo

```
Path attuale:     /rcs-logo.png (linea 14)
Path corretto:    /logos/rcs-logo.png
File fisico:      /home/user/vihente-app/public/logos/rcs-logo.png
```

**Specifiche Tecniche:**
- **Dimensioni:** 400x400px (quadrato)
- **Formato:** PNG con trasparenza
- **Qualità:** Massima (lossless)
- **Peso target:** < 50 KB
- **DPI:** 144 DPI (2x per display retina)
- **Trasparenza:** SÌ (sfondo trasparente obbligatorio)

**Cosa fornire:**
- Logo ufficiale cliente RCS
- Richiedi logo vettoriale (SVG/AI) e esporta come PNG
- Sfondo trasparente obbligatorio
- Centro logo nel canvas 400x400px
- Logo non deve toccare i bordi (lascia 40px padding)

---

#### 📸 Immagine #2: Screenshot Portfolio Fotografo

```
Path attuale:     /placeholder-portfolio.jpg (linea 22)
Path corretto:    /screenshots/portfolio-fotografo.jpg
File fisico:      /home/user/vihente-app/public/screenshots/portfolio-fotografo.jpg
```

**Specifiche Tecniche:**
- **Dimensioni:** 1200x800px (ratio 3:2)
- **Formato:** JPG
- **Qualità:** 85%
- **Peso target:** < 150 KB
- **DPI:** 72 DPI

**Cosa creare:**
- Screenshot portfolio fotografo elegante
- Può essere un mockup/placeholder stilizzato
- Stile: Minimal, galleria immagini, tipografia elegante
- Colori: Neutri (bianco/nero/grigio)

**Alternative se non hai progetto reale:**
- Crea mockup in Figma con design portfolio fotografo
- Usa template portfolio e fai screenshot
- Usa servizi come [Shots.so](https://shots.so) per mockup browser

---

#### 📸 Immagine #3: Screenshot Landing SaaS

```
Path attuale:     /placeholder-saas.jpg (linea 31)
Path corretto:    /screenshots/saas-landing.jpg
File fisico:      /home/user/vihente-app/public/screenshots/saas-landing.jpg
```

**Specifiche Tecniche:**
- **Dimensioni:** 1200x800px (ratio 3:2)
- **Formato:** JPG
- **Qualità:** 85%
- **Peso target:** < 150 KB
- **DPI:** 72 DPI

**Cosa creare:**
- Landing page moderna per prodotto SaaS
- Elementi tipici: Hero section, pricing, CTA
- Stile: Tech, moderno, gradients, card UI
- Colori: Vivaci (blu, viola, gradients)

**Suggerimenti:**
- Cerca "saas landing page" su Dribbble/Behance per ispirazione
- Crea mockup veloce in Figma
- Usa template HTML landing page e screenshot

---

### 2️⃣ PRIORITÀ MEDIA - Black Market E-commerce

**Componente:** `src/components/sections/Portfolio/ComponentShowcase/FemosBlackMarketPage/FemosBlackMarketPage.jsx`
**Uso:** Demo e-commerce cyberpunk (componente showcase)
**Visibilità:** Media - pagina demo componenti
**Nota:** Il sito usa fallback emoji 📦 quando manca immagine (funziona comunque)

**Totale:** 18 immagini prodotti cyberpunk

---

#### 📦 Specifiche Comuni per Tutti i Prodotti

**Specifiche Tecniche:**
- **Dimensioni:** 600x600px (quadrato, 1:1)
- **Formato:** JPG
- **Qualità:** 80% (peso ridotto per 18 immagini)
- **Peso target:** < 80 KB ciascuna
- **DPI:** 72 DPI
- **Stile:** Cyberpunk, neon, tech, futuristico
- **Palette:** Ciano (#00FFFF), Magenta (#FF00FF), Nero, Viola elettrico

**Workflow Consigliato:**
1. Crea template base in Figma/Photoshop (600x600px, sfondo scuro)
2. Usa AI generative (Midjourney, DALL-E, Leonardo.ai) per oggetti cyberpunk
3. Applica effetti neon/glow uniformi
4. Esporta batch tutte le immagini

---

#### 🎨 Lista Completa Prodotti da Creare

##### Categoria: SPECIAL/LEGENDARY (5 immagini - linee 43-51)

```
1. /shop/singularity.jpg  → "Void Singularity"
   Descrizione: Energia oscura, buco nero, particelle viola/cyan

2. /shop/anomaly.jpg      → "Quantum Anomaly"
   Descrizione: Particelle quantiche, effetto glitch, esiste/non esiste

3. /shop/blade.jpg        → "Cyber Blade X1"
   Descrizione: Spada futuristica, lama neon cyan luminosa

4. /shop/cloak.jpg        → "Stealth Cloak Mk.V"
   Descrizione: Mantello olografico semi-trasparente, invisibilità

5. /shop/core.jpg         → "Quantum Core"
   Descrizione: Nucleo energetico, raggi di luce, reattore
```

**Mood:** Epico, raro, potente, effetti drammatici, glow intenso

---

##### Categoria: EPIC (4 immagini - linee 53-59)

```
6. /shop/chip.jpg         → "Neural Chip Pro"
   Descrizione: Chip cerebrale, circuiti luminosi, microprocessore

7. /shop/gun.jpg          → "Plasma Gun Delta"
   Descrizione: Pistola futuristica, canna plasma luminosa

8. /shop/suit.jpg         → "Holographic Suit"
   Descrizione: Tuta olografica, wireframe, proiezioni false

9. /shop/katana.jpg       → "Cyber Katana Elite"
   Descrizione: Katana tech elegante, lama neon, manico carbon fiber
```

**Mood:** Tech avanzato, professionale, glow medio, colori vivaci

---

##### Categoria: RARE (4 immagini - linee 61-67)

```
10. /shop/shard.jpg       → "Data Shard Alpha"
    Descrizione: Cristallo dati trasparente, codice binario visibile

11. /shop/serum.jpg       → "Nano Serum"
    Descrizione: Fiala con liquido luminoso verde/cyan

12. /shop/shield.jpg      → "Energy Shield Portable"
    Descrizione: Scudo energetico trasparente, barriera luminosa

13. /shop/booster.jpg     → "Turbo Booster X"
    Descrizione: Booster velocità, fiamme neon, acceleratore
```

**Mood:** Consumabili, design clean, glow leggero

---

##### Categoria: COMMON (5 immagini - linee 69-77)

```
14. /shop/hacktool.jpg    → "Hack Tool v3.2"
    Descrizione: Multitool tech, schermi LED, dispositivo portatile

15. /shop/scanner.jpg     → "Bio Scanner Basic"
    Descrizione: Scanner portatile, schermo radar, rilevatore

16. /shop/emp.jpg         → "EMP Grenade"
    Descrizione: Granata tech, anello elettrico blu

17. /shop/cell.jpg        → "Power Cell Standard"
    Descrizione: Batteria cilindrica, barre energia luminose

18. /shop/medkit.jpg      → "Medkit Base"
    Descrizione: Kit medico futuristico, croce neon, valigetta
```

**Mood:** Oggetti comuni, design semplice, minimal glow, pratico

---

## 🎨 GUIDA PRODUZIONE IMMAGINI

### Strumenti Raccomandati

#### A) Screenshot Siti (Portfolio)

1. **Chrome DevTools** (Gratis)
   - F12 → Toggle device toolbar → Imposta 1200x800px → Screenshot

2. **Screely** (Gratis) - https://screely.com
   - Upload screenshot → Aggiunge mockup browser professionale

3. **Shots.so** (Gratis) - https://shots.so
   - Mockup browser con sfondi gradient

---

#### B) Design Prodotti Cyberpunk (Shop)

1. **Leonardo.ai** (Gratis/Premium) - https://leonardo.ai
   - Prompt: "cyberpunk [oggetto], neon glow, futuristic tech, product shot, black background"
   - Modello: PhotoReal o DreamShaper

2. **Midjourney** (A pagamento) - https://midjourney.com
   - Prompt: "[oggetto] cyberpunk style, neon lights, tech, product photography, dark background --ar 1:1 --v 6"

3. **DALL-E 3** (Via ChatGPT Plus)
   - Prompt: "A [oggetto] in cyberpunk style, glowing neon effects, futuristic technology, centered on black background"

4. **Figma + Unsplash** (Gratis)
   - Cerca foto tech su Unsplash
   - Applica effetti glow/neon in Figma
   - Esporta 600x600px JPG 80%

---

#### C) Loghi Clienti

1. **Richiedi al cliente** formato vettoriale (SVG, AI, EPS)
2. **Esporta in Figma/Illustrator:**
   - Canvas 400x400px
   - Centra logo
   - Esporta PNG 2x (144 DPI)
   - Sfondo trasparente

---

### Batch Processing & Ottimizzazione

#### Ottimizzazione Automatica
```bash
# Installa ImageMagick (se non presente)
brew install imagemagick  # macOS
apt install imagemagick   # Linux

# Batch resize + compress (nella cartella shop)
cd /home/user/vihente-app/public/shop
mogrify -resize 600x600 -quality 80 *.jpg

# Verifica peso file
ls -lh *.jpg
```

#### Strumenti Online
- **TinyPNG** - https://tinypng.com (compressione lossless)
- **Squoosh** - https://squoosh.app (compressione avanzata)
- **Bulk Resize Photos** - https://bulkresizephotos.com

---

## 🎯 PROMPT AI SUGGERITI

### Template Base (Leonardo.ai/Midjourney)

```
A [OGGETTO] in cyberpunk style, neon glow effect, futuristic technology,
product photography, centered composition, black background with subtle
grid pattern, professional lighting, 8K quality, highly detailed
```

---

### Esempi Specifici

**Void Singularity:**
```
A black hole singularity with purple and cyan energy swirls,
cosmic void, quantum particles, dramatic lighting, cyberpunk style,
product shot, black background --ar 1:1
```

**Neural Chip:**
```
A futuristic neural chip implant with glowing cyan circuits,
microprocessor details, holographic data streams, tech product
photography, black background --ar 1:1
```

**Cyber Katana:**
```
A sleek cyber katana with neon cyan edge glow, carbon fiber handle,
holographic patterns, japanese tech fusion, product shot, dramatic
lighting, black background --ar 1:1
```

**Plasma Gun:**
```
A futuristic plasma gun with glowing barrel, energy core visible,
tech details, cyberpunk military weapon, product photography,
black background --ar 1:1
```

**Data Shard:**
```
A transparent data crystal shard with glowing binary code inside,
holographic information streams, futuristic storage device,
cyberpunk style, black background --ar 1:1
```

**Medkit:**
```
A futuristic medical kit with neon cross symbol, tech components,
emergency supplies, cyberpunk healthcare, product shot,
black background --ar 1:1
```

---

## 📋 CHECKLIST PRODUZIONE

### Fase 1: Setup Iniziale
- [x] Creare `/public/screenshots/`
- [x] Creare `/public/logos/`
- [x] Verificare `/public/shop/` esiste

### Fase 2: Priorità Critica (2 minuti)
- [ ] Fixare bug `twitter:image` in `index.html:36` (`.jpg` → `.png`)

### Fase 3: Immagini Portfolio (Priorità Alta - 1 ora)
- [ ] Screenshot RCS (1200x800px JPG 85%)
- [ ] Screenshot Portfolio Fotografo (1200x800px JPG 85%)
- [ ] Screenshot Landing SaaS (1200x800px JPG 85%)
- [ ] Logo RCS (400x400px PNG trasparente)

### Fase 4: Aggiornare Codice Portfolio (5 minuti)
- [ ] `SitiWebShowcase.jsx` linea 13: `/placeholder-rcs.jpg` → `/screenshots/rcs.jpg`
- [ ] `SitiWebShowcase.jsx` linea 14: `/rcs-logo.png` → `/logos/rcs-logo.png`
- [ ] `SitiWebShowcase.jsx` linea 22: `/placeholder-portfolio.jpg` → `/screenshots/portfolio-fotografo.jpg`
- [ ] `SitiWebShowcase.jsx` linea 31: `/placeholder-saas.jpg` → `/screenshots/saas-landing.jpg`

### Fase 5: Immagini Shop (Opzionale - Priorità Media - 2-3 ore)
- [ ] 5 prodotti SPECIAL/LEGENDARY (600x600px JPG 80%)
- [ ] 4 prodotti EPIC (600x600px JPG 80%)
- [ ] 4 prodotti RARE (600x600px JPG 80%)
- [ ] 5 prodotti COMMON (600x600px JPG 80%)

### Fase 6: Ottimizzazione (15 minuti)
- [ ] Batch compression con ImageMagick o TinyPNG
- [ ] Verifica peso totale pagina < 2MB

### Fase 7: Test Finale
- [ ] Controllare tutte le immagini si caricano
- [ ] Testare su mobile (responsive)
- [ ] Test condivisione social (Twitter/Facebook)
- [ ] Verifica og-image.png funziona correttamente

### Fase 8: Cleanup (Opzionale)
- [ ] Rimuovere `/public/vite.svg` (inutilizzato)
- [ ] Rimuovere `/src/assets/react.svg` (inutilizzato)
- [ ] Aggiornare `/public/shop/readme.txt` (obsoleto)

---

## 📊 BUDGET TEMPO STIMATO

| Attività | Tempo | Difficoltà |
|----------|-------|------------|
| Fix bug Twitter | 2 min | ⭐ Triviale |
| Screenshot RCS reale | 5 min | ⭐ Facile |
| Mockup 2 portfolio | 30 min | ⭐⭐ Media |
| Logo RCS (richiedere) | 10 min | ⭐ Facile |
| Aggiornare codice JSX | 5 min | ⭐ Facile |
| 18 prodotti AI (batch) | 2-3 ore | ⭐⭐⭐ Media-Alta |
| Ottimizzazione batch | 15 min | ⭐⭐ Media |
| Test + deployment | 15 min | ⭐ Facile |

**Totale minimo (senza shop):** ~1 ora
**Totale completo (con shop):** ~4 ore

---

## 🚀 PROSSIMI PASSI

### Immediate (Ora)
1. **Fix bug critico:** Correggi `index.html:36` (twitter:image .jpg → .png)
2. **Struttura già pronta:** Cartelle create ✓

### Short-term (Questa settimana)
3. **Screenshot RCS:** Cattura homepage reale (https://rcsmaterialicompositi.com)
4. **Mockup portfolio:** Crea 2 screenshot fittizi professionali
5. **Logo RCS:** Richiedi al cliente o usa placeholder temporaneo
6. **Aggiorna codice:** Cambia path in `SitiWebShowcase.jsx`

### Long-term (Quando hai tempo)
7. **Shop cyberpunk:** Genera 18 immagini con AI (2-3 ore)
8. **Ottimizzazione:** Batch compress tutte le immagini
9. **Cleanup:** Rimuovi asset inutilizzati

---

## ❓ FAQ

**Q: Posso usare WebP invece di JPG?**
A: Sì! WebP offre -30% peso con stessa qualità. Cambia estensioni nel codice.

**Q: Devo aggiornare anche il file shop/readme.txt?**
A: Opzionale - è obsoleto ma non impatta funzionalità.

**Q: Posso tenere gli emoji 📦 nello shop?**
A: Sì! Il fallback funziona bene. Immagini shop sono opzionali.

**Q: Dove trovo ispirazione per design cyberpunk?**
A: Dribbble, Behance, Pinterest (cerca "cyberpunk ui", "neon products")

**Q: Serve compressione speciale per Retina?**
A: No - 72 DPI va bene. I pixel sono sufficienti (1200px/600px).

**Q: Come testo se le immagini funzionano?**
A: `npm run dev` → Apri browser → Naviga su sezione Portfolio → Siti Web

---

## 📝 MODIFICHE CODICE NECESSARIE

### File: `src/components/sections/Portfolio/SitiWebShowcase/SitiWebShowcase.jsx`

**Modifiche da fare:**

```diff
  const websites = [
    {
      id: 1,
      title: 'RCS Materiali Compositi',
      description: 'Sito vetrina aziendale con CMS personalizzato...',
-     image: '/placeholder-rcs.jpg',
+     image: '/screenshots/rcs.jpg',
-     logo: '/rcs-logo.png',
+     logo: '/logos/rcs-logo.png',
      url: 'https://rcsmaterialicompositi.com',
      technologies: ['WordPress', 'PHP', 'Custom Code', 'JS']
    },
    {
      id: 2,
      title: 'Portfolio Fotografo',
      description: 'Sito portfolio elegante...',
-     image: '/placeholder-portfolio.jpg',
+     image: '/screenshots/portfolio-fotografo.jpg',
      logo: null,
      url: 'https://example.com',
      technologies: ['React', 'Next.js', 'Tailwind']
    },
    {
      id: 3,
      title: 'Landing Page SaaS',
      description: 'Landing page moderna...',
-     image: '/placeholder-saas.jpg',
+     image: '/screenshots/saas-landing.jpg',
      logo: null,
      url: 'https://example.com',
      technologies: ['React', 'Vite', 'Framer Motion']
    }
  ];
```

---

**Fine Documento**
Ultimo aggiornamento: 5 Dicembre 2025
Versione: 2.0 (Analisi completa aggiornata)
