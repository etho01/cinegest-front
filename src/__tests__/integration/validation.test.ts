/**
 * Tests d'intégration pour les validations Zod
 */
import { UserLogSchema, PasswordResetSchema, PasswordResetRequestSchema } from '@/src/domain/User'

describe('Validation Schemas Integration', () => {
  describe('UserLogSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = UserLogSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
      }

      const result = UserLogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject password longer than 255 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'a'.repeat(256),
      }

      const result = UserLogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('PasswordResetRequestSchema', () => {
    it('should validate correct email', () => {
      const validData = {
        email: 'test@example.com',
      }

      const result = PasswordResetRequestSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
      }

      const result = PasswordResetRequestSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('email valide')
      }
    })

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
      }

      const result = PasswordResetRequestSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('PasswordResetSchema', () => {
    it('should validate correct password reset data', () => {
      const validData = {
        email: 'test@example.com',
        token: 'valid-token-123',
        password: 'newpassword123',
        passwordConfirmation: 'newpassword123',
      }

      const result = PasswordResetSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject password shorter than 8 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        token: 'valid-token',
        password: 'short',
        passwordConfirmation: 'short',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('8 caractères')
      }
    })

    it('should reject when passwords do not match', () => {
      const invalidData = {
        email: 'test@example.com',
        token: 'valid-token',
        password: 'password123',
        passwordConfirmation: 'different123',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('ne correspondent pas')
      }
    })

    it('should reject empty token', () => {
      const invalidData = {
        email: 'test@example.com',
        token: '',
        password: 'password123',
        passwordConfirmation: 'password123',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('token')
      }
    })

    it('should reject invalid email in reset', () => {
      const invalidData = {
        email: 'not-valid-email',
        token: 'token-123',
        password: 'password123',
        passwordConfirmation: 'password123',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should provide specific error for password confirmation path', () => {
      const invalidData = {
        email: 'test@example.com',
        token: 'valid-token',
        password: 'password123',
        passwordConfirmation: 'mismatch',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const confirmationError = result.error.issues.find(
          (issue) => issue.path[0] === 'passwordConfirmation'
        )
        expect(confirmationError).toBeDefined()
      }
    })
  })

  describe('Complex validation scenarios', () => {
    it('should handle multiple validation errors', () => {
      const invalidData = {
        email: 'invalid',
        token: '',
        password: 'short',
        passwordConfirmation: 'different',
      }

      const result = PasswordResetSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })

    it('should validate edge case emails', () => {
      const edgeCases = [
        'test+tag@example.com',
        'user.name@example.co.uk',
        'user_name@example-domain.com',
      ]

      edgeCases.forEach((email) => {
        const data = {
          email,
          password: 'password123',
        }
        const result = UserLogSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('should validate password with special characters', () => {
      const data = {
        email: 'test@example.com',
        token: 'token-123',
        password: 'P@ssw0rd!#$%',
        passwordConfirmation: 'P@ssw0rd!#$%',
      }

      const result = PasswordResetSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })
})
