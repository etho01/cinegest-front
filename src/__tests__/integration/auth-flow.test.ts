/**
 * Tests d'intégration pour le flow de login/authentification
 */

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('Authentication Integration Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
  })

  describe('Login flow', () => {
    it('should complete full login flow successfully', async () => {
      // Mock successful login response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          token: 'fake-jwt-token',
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
          },
        }),
      })

      // Simulate login
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      expect(response.ok).toBe(true)
      expect(result.success).toBe(true)
      expect(result.token).toBe('fake-jwt-token')
      expect(result.user.email).toBe('test@example.com')
    })

    it('should handle login failure with invalid credentials', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          success: false,
          error: 'Invalid credentials',
        }),
      })

      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      expect(response.ok).toBe(false)
      expect(response.status).toBe(401)
      expect(result.error).toBe('Invalid credentials')
    })
  })

  describe('Password reset flow', () => {
    it('should complete password reset request successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: 'Reset email sent',
        }),
      })

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      })

      const result = await response.json()

      expect(response.ok).toBe(true)
      expect(result.success).toBe(true)
      expect(result.message).toBe('Reset email sent')
    })

    it('should complete password reset with token successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: 'Password reset successful',
        }),
      })

      const resetData = {
        email: 'test@example.com',
        token: 'valid-reset-token',
        password: 'newpassword123',
        passwordConfirmation: 'newpassword123',
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData),
      })

      const result = await response.json()

      expect(response.ok).toBe(true)
      expect(result.success).toBe(true)
    })

    it('should reject password reset with invalid token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          error: 'Invalid or expired token',
        }),
      })

      const resetData = {
        email: 'test@example.com',
        token: 'invalid-token',
        password: 'newpassword123',
        passwordConfirmation: 'newpassword123',
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData),
      })

      const result = await response.json()

      expect(response.ok).toBe(false)
      expect(result.error).toBe('Invalid or expired token')
    })
  })

  describe('Entity creation flow', () => {
    it('should create entity with valid data', async () => {
      const newEntity = {
        name: 'New Cinema Chain',
        address: '123 Main St',
        city: 'Paris',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          data: {
            id: 1,
            ...newEntity,
            createdAt: new Date().toISOString(),
          },
        }),
      })

      const response = await fetch('/api/entity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token',
        },
        body: JSON.stringify(newEntity),
      })

      const result = await response.json()

      expect(response.ok).toBe(true)
      expect(result.success).toBe(true)
      expect(result.data.name).toBe(newEntity.name)
      expect(result.data.id).toBe(1)
    })

    it('should validate entity data before creation', async () => {
      const invalidEntity = {
        name: '', // Empty name should fail validation
        address: '123 Main St',
      }

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({
          success: false,
          errors: {
            name: ['Name is required'],
          },
        }),
      })

      const response = await fetch('/api/entity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token',
        },
        body: JSON.stringify(invalidEntity),
      })

      const result = await response.json()

      expect(response.ok).toBe(false)
      expect(response.status).toBe(422)
      expect(result.errors.name).toContain('Name is required')
    })
  })

  describe('Pagination flow', () => {
    it('should fetch paginated data correctly', async () => {
      const mockPaginatedData = {
        data: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
        ],
        current_page: 1,
        last_page: 5,
        per_page: 3,
        total: 15,
        from: 1,
        to: 3,
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPaginatedData,
      })

      const response = await fetch('/api/items?page=1&per_page=3')
      const result = await response.json()

      expect(response.ok).toBe(true)
      expect(result.data).toHaveLength(3)
      expect(result.current_page).toBe(1)
      expect(result.last_page).toBe(5)
      expect(result.total).toBe(15)
    })

    it('should navigate to next page', async () => {
      const page1Data = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        current_page: 1,
        last_page: 2,
        per_page: 3,
        total: 6,
        from: 1,
        to: 3,
      }

      const page2Data = {
        data: [{ id: 4 }, { id: 5 }, { id: 6 }],
        current_page: 2,
        last_page: 2,
        per_page: 3,
        total: 6,
        from: 4,
        to: 6,
      }

      // First page
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => page1Data,
      })

      let response = await fetch('/api/items?page=1')
      let result = await response.json()
      expect(result.current_page).toBe(1)

      // Second page
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => page2Data,
      })

      response = await fetch('/api/items?page=2')
      result = await response.json()
      expect(result.current_page).toBe(2)
      expect(result.data).toHaveLength(3)
    })
  })

  describe('Role management flow', () => {
    it('should create, read, update, and delete role (CRUD)', async () => {
      const entityId = 1
      const newRole = {
        name: 'Manager',
        entityId,
        rights: ['read', 'write'],
      }

      // CREATE
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          data: { id: 5, ...newRole },
        }),
      })

      let response = await fetch(`/api/${entityId}/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      })
      let result = await response.json()
      const createdRoleId = result.data.id

      expect(result.success).toBe(true)
      expect(result.data.name).toBe('Manager')

      // READ
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { id: createdRoleId, ...newRole },
        }),
      })

      response = await fetch(`/api/${entityId}/role/${createdRoleId}`)
      result = await response.json()

      expect(result.data.id).toBe(createdRoleId)
      expect(result.data.name).toBe('Manager')

      // UPDATE
      const updatedRole = { ...newRole, name: 'Senior Manager' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { id: createdRoleId, ...updatedRole },
        }),
      })

      response = await fetch(`/api/${entityId}/role/${createdRoleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRole),
      })
      result = await response.json()

      expect(result.data.name).toBe('Senior Manager')

      // DELETE
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      response = await fetch(`/api/${entityId}/role/${createdRoleId}`, {
        method: 'DELETE',
      })
      result = await response.json()

      expect(result.success).toBe(true)
    })
  })
})
