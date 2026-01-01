# Tests d'intégration

Ce dossier contient les tests d'intégration qui testent des flows complets de l'application.

## Tests actuels

### auth-flow.test.ts
Tests des flows d'authentification et CRUD :
- Login/logout
- Reset de mot de passe
- Création d'entités
- CRUD de rôles
- Pagination

### validation.test.ts
Tests de validation des schémas Zod :
- UserLogSchema
- PasswordResetSchema
- PasswordResetRequestSchema
- Cas limites et edge cases

## Ajouter un nouveau test d'intégration

```typescript
import { render, screen, waitFor } from '@testing-library/react'

describe('My Integration Flow', () => {
  it('should complete the full flow', async () => {
    // Setup
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })

    // Execute flow
    // ...

    // Verify
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })
})
```

## Différence avec tests unitaires

- **Tests unitaires** : Testent une fonction/composant isolé
- **Tests d'intégration** : Testent plusieurs composants ensemble
- **Tests E2E** : Testent l'application complète (pas encore implémentés)

## Coverage

Les tests d'intégration contribuent à la couverture globale mais se concentrent sur les interactions entre composants plutôt que sur la couverture ligne par ligne.
