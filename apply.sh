#!/usr/bin/env bash
# apply.sh — copia i file del pacchetto sopra la root del repo Vihente
#            e cancella api/test-email.php.
#
# Uso: dalla ROOT del repo (dove c'è package.json):
#      bash /percorso/dello/zip/scompattato/apply.sh
#
# NON tocca git: il diff lo controlli tu con `git status` dopo.

set -euo pipefail

# Directory dove si trova questo script (= radice dello zip scompattato)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Sanity check: siamo nella root del repo Vihente?
if [ ! -f "package.json" ] || ! grep -q '"name": "vihente-app"' package.json; then
  echo "ERRORE: questo script va lanciato dalla root del repo Vihente"
  echo "        (deve esserci un package.json con \"name\": \"vihente-app\")."
  echo "        Posizione attuale: $(pwd)"
  exit 1
fi

if [ ! -d ".git" ]; then
  echo "ERRORE: la directory corrente non è un repo git."
  exit 1
fi

# Lista dei file del pacchetto da copiare (esclusi i file di servizio dello zip)
mapfile -t FILES < <(
  cd "$SCRIPT_DIR" && \
  find . -type f \
    ! -name 'SYNC-INSTRUCTIONS.md' \
    ! -name 'apply.sh' \
    | sed 's|^\./||' \
    | sort
)

echo "Pacchetto: $SCRIPT_DIR"
echo "Repo:      $(pwd)"
echo ""
echo "Verranno copiati ${#FILES[@]} file."
echo "Verrà eliminato 1 file: api/test-email.php (se presente)"
echo ""
read -r -p "Procedere? [s/N] " ans
case "$ans" in
  s|S|si|Si|SI|y|Y|yes|Yes|YES) ;;
  *) echo "Annullato."; exit 0 ;;
esac

# Copia (preserva i path: SCRIPT_DIR/api/.htaccess -> ./api/.htaccess)
for f in "${FILES[@]}"; do
  mkdir -p "$(dirname "$f")"
  cp -f "$SCRIPT_DIR/$f" "$f"
  echo "  copiato  $f"
done

# Cancellazione
if [ -f "api/test-email.php" ]; then
  rm -f "api/test-email.php"
  echo "  rimosso  api/test-email.php"
fi

echo ""
echo "Fatto. Stato git ora:"
echo "------------------------------------"
git status --short
echo "------------------------------------"
echo ""
echo "Prossimi passi consigliati:"
echo "  node security-audit.js    # deve dire 0 FAIL"
echo "  node integrity-scan.js    # deve dire 0 FAIL"
echo "  npm install               # allinea node_modules (rimuove dompurify)"
echo "  npm run build             # build di produzione"
