# 🏢 Gestion Entreprises Backend

Module NestJS standalone pour la gestion des entreprises et exercices comptables.

## 📋 Description

API REST pour gérer :
- **Entreprises** : CRUD complet avec informations légales (SIRET, TVA, etc.)
- **Exercices** : Gestion des exercices comptables par entreprise

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
npm install
```

### Configuration

Créer un fichier `.env` :

```bash
cp .env.example .env
```

Configurer les variables d'environnement :

```env
NODE_ENV=development
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=gestion_entreprises
```

### Base de données

Créer la base PostgreSQL :

```bash
psql -U postgres
CREATE DATABASE gestion_entreprises;
\q
```

Les tables seront créées automatiquement au démarrage (synchronize: true en dev).

### Lancer le serveur

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Le serveur démarre sur `http://localhost:3001`

## 📡 API Endpoints

### Entreprises

```
GET    /api/entreprises           # Toutes les entreprises
GET    /api/entreprises/active    # Entreprises actives
GET    /api/entreprises/:id       # Une entreprise
POST   /api/entreprises           # Créer
PATCH  /api/entreprises/:id       # Modifier
DELETE /api/entreprises/:id       # Supprimer
PATCH  /api/entreprises/:id/soft-delete  # Désactiver
```

### Exercices

```
GET    /api/exercices                      # Tous les exercices
GET    /api/exercices/entreprise/:id      # Par entreprise
GET    /api/exercices/open                # Exercices ouverts
GET    /api/exercices/:id                 # Un exercice
POST   /api/exercices                     # Créer
PATCH  /api/exercices/:id                 # Modifier
DELETE /api/exercices/:id                 # Supprimer
PATCH  /api/exercices/:id/close           # Clôturer
PATCH  /api/exercices/:id/reopen          # Réouvrir
```

## 📦 Modèles de données

### Entreprise

```typescript
{
  id: number;
  raison_sociale: string;
  siret?: string;
  forme_juridique?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  telephone?: string;
  email?: string;
  capital_social?: number;
  numero_tva_intra?: string;
  code_naf?: string;
  regime_fiscal?: string;
  notes?: string;
  actif: boolean;
  date_creation: Date;
  date_modification: Date;
}
```

### Exercice

```typescript
{
  id: number;
  entreprise_id: number;
  annee: number;
  date_debut: Date;
  date_fin: Date;
  cloture: boolean;
  date_creation: Date;
}
```

## 🚢 Déploiement sur Railway

### 1. Créer le projet

```bash
railway login
railway init
railway link
```

### 2. Ajouter PostgreSQL

```bash
railway add postgresql
```

### 3. Variables d'environnement

Railway configure automatiquement :
- `DATABASE_URL`
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`

Ajouter manuellement :
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
```

### 4. Déployer

```bash
railway up
```

### 5. URL de production

```
https://gestion-entreprises-backend.up.railway.app/api
```

## 🧪 Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 🛠️ Technologies

- **NestJS** - Framework backend
- **TypeORM** - ORM
- **PostgreSQL** - Base de données
- **class-validator** - Validation
- **class-transformer** - Transformation

## 📝 Structure du projet

```
src/
├── entreprises/
│   ├── dto/
│   │   ├── create-entreprise.dto.ts
│   │   └── update-entreprise.dto.ts
│   ├── entreprise.entity.ts
│   ├── entreprises.controller.ts
│   ├── entreprises.module.ts
│   └── entreprises.service.ts
├── exercices/
│   ├── dto/
│   │   ├── create-exercice.dto.ts
│   │   └── update-exercice.dto.ts
│   ├── exercice.entity.ts
│   ├── exercices.controller.ts
│   ├── exercices.module.ts
│   └── exercices.service.ts
├── app.module.ts
└── main.ts
```

## 🔒 Sécurité

- Validation automatique des entrées (class-validator)
- CORS activé
- Variables d'environnement pour les secrets
- Pas de synchronize en production

## 📄 Licence

UNLICENSED - Usage privé uniquement
