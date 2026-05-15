#!/bin/bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <ROOT_TOKEN> [UNSEAL_KEY]"
  echo "  ROOT_TOKEN  : Token root Vault"
  echo "  UNSEAL_KEY  : Clé de descellement (optionnel si Vault déjà descellé)"
  exit 1
fi

ROOT_TOKEN="$1"
UNSEAL_KEY="${2:-}"
NAMESPACE="cinegest-site"
VAULT_SECRET_PATH="secret/${NAMESPACE}/cinegest-front/app"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Configurer KUBECONFIG pour accéder au cluster K3s
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
KUBECTL="sudo -E kubectl"

echo "🔐 Mise à jour des secrets Vault pour Cinegest Frontend..."

# Tuer les anciens port-forwards
pkill -f "port-forward.*vault" || true
sleep 2

# Port-forward Vault
$KUBECTL -n vault port-forward svc/vault 8200:8200 &
PF_PID=$!
sleep 3

# Desceller Vault si nécessaire
SEALED=$($KUBECTL -n vault exec deploy/vault -- sh -c "env VAULT_ADDR=http://localhost:8200 vault status -format=json 2>/dev/null | jq -r '.sealed'" 2>/dev/null || echo "true")
if [ "$SEALED" = "true" ]; then
  if [ -z "$UNSEAL_KEY" ]; then
    echo "❌ Vault est scellé. Fournissez une clé de descellement en 2ème argument."
    echo "   Usage: $0 <ROOT_TOKEN> <UNSEAL_KEY>"
    kill $PF_PID 2>/dev/null || true
    exit 1
  fi
  echo "🔓 Descellement de Vault..."
  $KUBECTL -n vault exec deploy/vault -- sh -c "env VAULT_ADDR=http://localhost:8200 vault operator unseal $UNSEAL_KEY"
  sleep 2
  echo "✅ Vault descellé"
else
  echo "✅ Vault déjà descellé"
fi

# Helper function to run vault commands in the pod
vault_exec() {
  $KUBECTL -n vault exec deploy/vault -- sh -c "env VAULT_ADDR=http://localhost:8200 VAULT_TOKEN=$ROOT_TOKEN $*"
}

echo ""
echo "📝 Saisie des secrets (laisser vide pour conserver la valeur existante)"
echo "   Chemin Vault : ${VAULT_SECRET_PATH}"
echo ""

# Lire les valeurs existantes
EXISTING=$(vault_exec vault kv get -format=json "$VAULT_SECRET_PATH" 2>/dev/null || echo "{}")

get_existing() {
  echo "$EXISTING" | jq -r ".data.data.${1} // empty" 2>/dev/null || echo ""
}

prompt_secret() {
  local KEY="$1"
  local LABEL="$2"
  local EXISTING_VAL
  EXISTING_VAL=$(get_existing "$KEY")

  if [ -n "$EXISTING_VAL" ]; then
    printf "  %-45s [existant] : " "$LABEL ($KEY)"
  else
    printf "  %-45s : " "$LABEL ($KEY)"
  fi

  read -r INPUT
  if [ -n "$INPUT" ]; then
    echo "$INPUT"
  else
    echo "$EXISTING_VAL"
  fi
}

API_URL=$(prompt_secret "API_URL" "URL du backend API (ex: https://api.cinegest.nicolasbarbey.fr/)")
ENV_REFERER=$(prompt_secret "ENV_REFERER" "Referer interne (optionnel, ex: https://front.cinegest.nicolasbarbey.fr)")

echo ""
echo "💾 Écriture des secrets dans Vault..."

vault_exec vault kv put "$VAULT_SECRET_PATH" \
  "API_URL=${API_URL}" \
  "ENV_REFERER=${ENV_REFERER}"

echo "✅ Secrets mis à jour dans Vault"
echo ""
echo "Vérification :"
vault_exec vault kv get -format=table "$VAULT_SECRET_PATH"
echo ""
echo "Prochaines étapes :"
echo "  - Forcer la synchronisation : $KUBECTL -n ${NAMESPACE} annotate externalsecret cinegest-front-vault force-sync=\$(date +%s) --overwrite"
echo "  - Vérifier le secret K8s    : $KUBECTL -n ${NAMESPACE} get secret cinegest-front-secret"
echo ""

# Arrêter le port-forward
kill $PF_PID 2>/dev/null || true
