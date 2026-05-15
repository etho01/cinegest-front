# Déploiement Kubernetes - Cinegest Frontend

Configuration Kubernetes pour le frontend Next.js de Cinegest.

## Configuration

- **Namespace**: `cinegest-site`
- **URL**: `front.cinegest.nicolasbarbey.fr`
- **Port**: 3000 (Next.js)
- **Image**: `ghcr.io/etho01/cinegest-site:latest`

## Variables d'environnement

Le frontend nécessite les variables suivantes (gérées via Vault):

- `NEXT_PUBLIC_API_URL`: URL de l'API backend (ex: https://api.front.cinegest.nicolasbarbey.fr)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clé publique Stripe (pk_test_... ou pk_live_...)

## Prérequis

1. Cluster Kubernetes configuré avec:
   - Traefik comme Ingress Controller
   - cert-manager pour les certificats SSL
   - External Secrets Operator
   - Vault pour la gestion des secrets

2. Namespace créé:
   ```bash
   kubectl apply -f namespace.yaml
   ```

## Déploiement

### 1. Configuration de Vault

D'abord, configurez l'authentification Vault pour Kubernetes:

```bash
cd k8s/vault
./configure-vault.sh <VAULT_ROOT_TOKEN>
```

Cela va:
- Activer le secret engine KV v2
- Créer la policy `cinegest-site-app`
- Configurer l'authentification Kubernetes
- Créer le ServiceAccount et les RBAC nécessaires

### 2. Configuration des secrets

Utilisez le script interactif pour configurer les secrets:

```bash
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>
```

Le script vous demandera:
- L'URL de l'API backend
- La clé publique Stripe

Les secrets seront stockés dans Vault sous `secret/cinegest-site/app`.

### 3. Déploiement des ressources Kubernetes

Appliquez les manifestes dans l'ordre:

```bash
# 1. Namespace
kubectl apply -f namespace.yaml

# 2. ServiceAccount et RBAC Vault
kubectl apply -f vault/serviceaccount.yaml
kubectl apply -f vault/rbac.yaml

# 3. SecretStore et ExternalSecret
kubectl apply -f secretstore.yaml
kubectl apply -f externalsecret.yaml

# 4. Application
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml

# 5. Middlewares Traefik
kubectl apply -f middleware.yaml

# 6. Ingress
kubectl apply -f ingress.yaml

# 7. HorizontalPodAutoscaler
kubectl apply -f hpa.yaml
```

Ou appliquez tout d'un coup:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f vault/
kubectl apply -f .
```

### 4. Vérification

Vérifiez que tout fonctionne:

```bash
# Vérifier les secrets
kubectl -n cinegest-site get externalsecret
kubectl -n cinegest-site describe externalsecret cinegest-site-vault
kubectl -n cinegest-site get secret cinegest-site-secret

# Vérifier le déploiement
kubectl -n cinegest-site get deployments
kubectl -n cinegest-site get pods
kubectl -n cinegest-site logs -l app=cinegest-site

# Vérifier l'ingress
kubectl -n cinegest-site get ingress
kubectl -n cinegest-site describe ingress cinegest-site

# Vérifier le certificat SSL
kubectl -n cinegest-site get certificate
```

### 5. Accès à l'application

Une fois déployée, l'application sera accessible sur:
- https://front.cinegest.nicolasbarbey.fr

Le certificat SSL sera automatiquement généré par cert-manager via Let's Encrypt.

## Mise à jour des secrets

Pour mettre à jour les secrets après le déploiement initial:

```bash
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>
```

Puis forcez la resynchronisation:

```bash
kubectl -n cinegest-site rollout restart deployment/cinegest-site
```

## Scaling

Le HPA (Horizontal Pod Autoscaler) est configuré pour:
- **Min replicas**: 2
- **Max replicas**: 10
- **Seuils**:
  - CPU: 70%
  - Mémoire: 80%

Pour modifier manuellement le nombre de replicas:

```bash
kubectl -n cinegest-site scale deployment/cinegest-site --replicas=3
```

## Ressources

Chaque pod du frontend a:
- **Requests**: 100m CPU, 256Mi RAM
- **Limits**: 500m CPU, 512Mi RAM

## Sécurité

- Les pods s'exécutent avec l'utilisateur non-root (UID 1000)
- Toutes les capabilities sont supprimées
- Privilège escalation désactivé
- CSP (Content Security Policy) configurée dans les middlewares
- Rate limiting activé (100 req/min en moyenne, burst de 50)
- Headers de sécurité configurés (X-Content-Type-Options, X-Frame-Options, etc.)

## Troubleshooting

### Les secrets ne se synchronisent pas

```bash
# Vérifier l'ExternalSecret
kubectl -n cinegest-site describe externalsecret cinegest-site-vault

# Vérifier les logs de l'external-secrets-operator
kubectl -n external-secrets-system logs -l app.kubernetes.io/name=external-secrets

# Vérifier l'accès à Vault
kubectl -n cinegest-site exec deployment/cinegest-site -- env | grep NEXT_PUBLIC
```

### Les pods ne démarrent pas

```bash
# Vérifier les logs
kubectl -n cinegest-site logs -l app=cinegest-site

# Vérifier les événements
kubectl -n cinegest-site get events --sort-by='.lastTimestamp'

# Vérifier la configuration
kubectl -n cinegest-site describe pod -l app=cinegest-site
```

### Problèmes de certificat SSL

```bash
# Vérifier cert-manager
kubectl get certificaterequest -n cinegest-site
kubectl describe certificate cinegest-site-tls -n cinegest-site

# Vérifier les logs de cert-manager
kubectl -n cert-manager logs -l app=cert-manager
```

## Fichiers

- `namespace.yaml`: Définition du namespace
- `deployment.yaml`: Déploiement de l'application Next.js
- `service.yaml`: Service ClusterIP
- `ingress.yaml`: Configuration Traefik avec SSL
- `secretstore.yaml`: Configuration du SecretStore Vault
- `externalsecret.yaml`: Synchronisation des secrets depuis Vault
- `middleware.yaml`: Middlewares Traefik (rate limiting, security headers)
- `hpa.yaml`: Autoscaling configuration
- `migrate-job.yaml`: Non utilisé pour le frontend (spécifique backend)
- `vault/`: Configuration Vault et RBAC
- `update-vault-secrets.sh`: Script de mise à jour des secrets

## Notes

- Le fichier `migrate-job.yaml` n'est pas nécessaire pour le frontend et peut être ignoré
- Les migrations de base de données sont gérées par le backend
- Le frontend est stateless et peut être scalé horizontalement sans problème
