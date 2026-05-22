# 🎬 CineGest - Plateforme de Gestion de 
 application web moderne et scalable pour la gestion intégrée de cinémas, développée avec les dernières technologies du web.

URL https://front.cinegest.nicolasbarbey.fr/app 
Identifiants :
Email : barbeynicolas.basly@gmail.com
Mot de passe : password
(je sais que le mot de passe est très faible et que dans un vrai contexte de production il faudrait un mot de passe plus fort) 

## 🎯 Présentation du Projet

CineGest est une plateforme SaaS complète permettant aux gestionnaires de cinémas de :
- **Gérer plusieurs cinémas** avec une interface centralisée
- **Contrôler les accès** via un système de rôles granulaires (Admin, Superadmin, User)
- **Administrer les utilisateurs** et leurs permissions
- **Authentifier les utilisateurs** de façon sécurisée
- **Accéder à une API RESTful** pour l'intégration tierce

## 🚀 Caractéristiques Techniques

### Architecture & Design Patterns
- **Architecture modulaire** : Séparation claire entre application, domain et infrastructure
- **Clean Architecture** : Interfaces clientes, use cases, et repositories dédiés
- **Type-Safe** : 100% TypeScript pour une robustesse maximale
- **Server Actions** : Utilisation de `next-safe-action` pour des actions côté serveur sécurisées

### Stack Technologique
- **Frontend** : Next.js 15, React 19, TypeScript
- **Styles** : Tailwind CSS + Emotion CSS-in-JS
- **UI Components** : Material-UI v7, HeroUI (Date Picker, Inputs)
- **Formulaires & Validation** : Zod + Native HTML5
- **Internationalisation** : i18n + zod-i18n (support multilingue)
- **Icônes** : FontAwesome 7
- **State Management** : Server-side via Next.js (API routes, Server Actions)

### Infrastructure & Qualité
- **Build** : Turbopack pour des builds ultra-rapides
- **Tests** : Jest + React Testing Library avec couverture de code
- **Linting** : ESLint avec configuration stricte
- **Performance** : Optimisé pour Vercel, lazy loading, code splitting automatique

### Sécurité
- **Authentification** : Session-based avec pages protégées (login, reset-password)
- **API sécurisée** : Routes API avec gestion par entité
- **Validation forte** : Schémas Zod côté client et serveur

## 🏗️ Structure du Projet

```
src/
├── application/          # Cas d'usage et logique métier
│   ├── repositories/    # Interfaces de persistance
│   └── useCases/        # Logique applicative
├── component/           # Composants React réutilisables
│   ├── auth/           # Authentification
│   ├── cinema/         # Gestion des cinémas
│   ├── cinemaApi/      # APIs de cinéma
│   ├── user/           # Gestion utilisateurs
│   ├── role/           # Gestion des rôles
│   ├── ui/             # Composants génériques
│   └── hook/           # React hooks personnalisés
├── domain/              # Entités métier
├── infrastructure/      # Implémentations concrètes
├── controller/          # Logique applicative côté serveur
├── const/              # Constantes (Rôles, etc.)
└── lib/                # Utilitaires (URL, DatePicker, Config, i18n)

app/
├── api/                 # API routes Next.js
│   ├── [entityId]/...  # Routes protégées par entité
│   ├── entity/         # Gestion des entités
│   └── superadmin/     # Routes admin
└── app/                 # Pages applicatives (dashboard)
    ├── admin/          # Zone admin
    ├── entity/         # Gestion des entités
    └── [entityId]/... # Sections spécifiques par entité
```

## 📋 Modules Principaux

- **Authentification** : Login, Reset Password, Gestion de sessions
- **Gestion des Cinémas** : CRUD complet avec validation
- **API Cinéma** : Configuration et gestion d'intégrations
- **Système de Rôles** : Permissions granulaires (Admin, User, Superadmin)
- **Utilisateurs** : Création, modification, gestion des droits
- **Superadmin** : Gestion globale des entités clients

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
npm install
# ou
yarn install
```

### Développement

```bash
npm run dev
```

L'application démarre sur [http://localhost:3000](http://localhost:3000)

### Build & Production

```bash
npm run build
npm start
```

## 🧪 Tests & Qualité

```bash
# Lancer les tests
npm run test

# Mode watch
npm run test:watch

# Couverture de code
npm run test:coverage
```

## 📊 Compétences Démontrées

### Frontend
✅ Next.js 15 (App Router, Server Actions, API Routes)  
✅ React 19 avec Hooks et patterns avancés  
✅ TypeScript pour la cohérence des types  
✅ Tailwind CSS + CSS-in-JS (Emotion)  
✅ Composants réutilisables et maintenables  

### Architecture
✅ Clean Architecture et Design Patterns  
✅ Séparation des responsabilités (Application/Domain/Infrastructure)  
✅ Repository Pattern pour l'accès aux données  
✅ Use Cases pour l'encapsulation logique  

### Qualité & Tests
✅ Jest + React Testing Library  
✅ Tests d'intégration et unitaires  
✅ ESLint pour la cohérence du code  
✅ Coverage analysis  

### Internationalisation
✅ i18n avec support multilingue  
✅ Validation de formulaires multilingues (Zod)  

## 🎨 UX/UI Highlights

- Interface intuitive et responsive
- Navigation claire et ergonomique
- Gestion des erreurs élégante
- Feedback utilisateur immédiat
- Date/Time pickers professionnels
- Select multilingues

## 🔐 Authentification & Sécurité

- Pages protégées avec vérification de session
- Système de rôles granulaires
- CSS-in-JS isolé (Emotion)
- Validation côté client ET serveur
- CSRF protection via Next.js

## 📦 Production-Ready

- ✅ TypeScript strict
- ✅ Tests automatisés
- ✅ Linting configuré
- ✅ Performance optimisée (Turbopack)
- ✅ SEO-friendly
- ✅ Prêt pour déploiement (Vercel compatible)
