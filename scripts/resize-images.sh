#!/usr/bin/env bash
# resize-images.sh — ridimensiona le immagini sovradimensionate individuate
# dall'audit performance (decode RGBA fino a 19x piu' pesante del necessario).
#
# Da eseguire IN LOCALE (richiede cwebp, oppure ImageMagick >= 7).
#   brew install webp   |   sudo apt install webp
#
# Uso, dalla root del repo:
#   bash scripts/resize-images.sh          # dry-run: mostra cosa farebbe
#   bash scripts/resize-images.sh --apply  # esegue davvero
#
# Le immagini vengono ridimensionate IN PLACE (fai commit prima, cosi'
# puoi sempre tornare indietro con git checkout).

set -euo pipefail
cd "$(dirname "$0")/.."

APPLY=0
[ "${1:-}" = "--apply" ] && APPLY=1

if command -v cwebp >/dev/null; then
  TOOL=cwebp
elif command -v magick >/dev/null; then
  TOOL=magick
else
  echo "ERRORE: serve cwebp (pacchetto 'webp') o ImageMagick 7 ('magick')."
  exit 1
fi

# resize <file> <lato-lungo-max> <qualita>
resize() {
  local f="$1" size="$2" q="$3"
  if [ ! -f "$f" ]; then
    echo "  SKIP (non esiste): $f"
    return
  fi
  local before
  before=$(du -k "$f" | cut -f1)
  if [ "$APPLY" = "0" ]; then
    echo "  DRY: $f -> max ${size}px q${q} (ora ${before}KB)"
    return
  fi
  local tmp="${f}.tmp.webp"
  if [ "$TOOL" = "cwebp" ]; then
    # cwebp -resize mantiene l'aspect ratio se una dimensione e' 0
    cwebp -quiet -q "$q" -resize "$size" 0 "$f" -o "$tmp"
  else
    magick "$f" -resize "${size}x${size}>" -quality "$q" "$tmp"
  fi
  local after
  after=$(du -k "$tmp" | cut -f1)
  mv "$tmp" "$f"
  echo "  OK: $f ${before}KB -> ${after}KB"
}

echo "== Shop (26 file 2048x2048 mostrati in card da 200px -> 800px) =="
for f in public/shop/*.webp; do
  # Ridimensiona solo i 2048: gli 800 esistenti restano intatti.
  # Con python leggiamo la larghezza dall'header webp.
  w=$(python3 - "$f" << 'EOF'
import struct, sys
f = sys.argv[1]
with open(f, 'rb') as fp:
    data = fp.read(40)
w = 0
if data[12:16] == b'VP8 ':
    w = struct.unpack('<H', data[26:28])[0] & 0x3fff
elif data[12:16] == b'VP8L':
    b = data[21:25]
    w = ((b[1] & 0x3f) << 8 | b[0]) + 1
elif data[12:16] == b'VP8X':
    w = (data[24] | data[25] << 8 | data[26] << 16) + 1
print(w)
EOF
)
  if [ "$w" -gt 800 ]; then
    resize "$f" 800 82
  fi
done

echo "== Ritratti sim mostrati piccoli =="
resize "public/images/avvocati-socio-gf.webp" 384 82
resize "public/images/avvocati-socio-lb.webp" 384 82
resize "public/images/avvocati-socio-mr.webp" 384 82
resize "public/images/salone-team-andrea.webp" 768 82
resize "public/images/salone-team-giulia.webp" 768 82
resize "public/images/salone-team-sofia.webp" 768 82
resize "public/images/campagna-candidato.webp" 1024 82

echo "== Altrove: ricompressione dei file >150KB (griglia ~400px) =="
resize "public/images/altrove-peru-2.webp" 1200 78
resize "public/images/altrove-portogallo-2.webp" 1200 78
resize "public/images/altrove-giappone-2.webp" 1200 78
resize "public/images/altrove-peru-1.webp" 1200 78
resize "public/images/altrove-islanda-2.webp" 1200 78
resize "public/images/altrove-maldive-2.webp" 1200 78
resize "public/images/altrove-marocco-1.webp" 1200 78

echo "== Hero avvocati (LCP della sim, 289KB) =="
resize "public/images/avvocati-hero.webp" 1920 80

echo "== Screenshot ImageChecker: PNG 496KB -> webp lossless =="
if [ -f "public/screenshots/VIejcO5.png" ] && [ "$APPLY" = "1" ]; then
  if [ "$TOOL" = "cwebp" ]; then
    cwebp -quiet -lossless "public/screenshots/VIejcO5.png" -o "public/screenshots/VIejcO5.webp"
  else
    magick "public/screenshots/VIejcO5.png" -define webp:lossless=true "public/screenshots/VIejcO5.webp"
  fi
  echo "  Creato public/screenshots/VIejcO5.webp"
  echo "  -> aggiorna il path in ImageCheckerPage.jsx a '/screenshots/VIejcO5.webp'"
  echo "  -> poi puoi cancellare il .png"
fi

echo ""
echo "== NB: lullabies-*.webp NON toccate =="
echo "   Il 2048 serve al ProductMagnifier del modal e-commerce (zoom 2.8x)."
echo "   Per la griglia servirebbero varianti -thumb da 520px: generale con"
echo "   questo tool quando produci le immagini definitive."
echo ""
[ "$APPLY" = "0" ] && echo "Dry-run completato. Rilancia con --apply per eseguire."
