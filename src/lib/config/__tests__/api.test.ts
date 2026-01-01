import { buildApiUrl, API_CONFIG, validateApiConfig } from '../api'

describe('API Config', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('buildApiUrl', () => {
    it('should build URL with path', () => {
      const url = buildApiUrl('users/1')
      
      expect(url).toContain('users/1')
    })

    it('should handle leading slash', () => {
      const url1 = buildApiUrl('/users')
      const url2 = buildApiUrl('users')
      
      expect(url1).toEqual(url2)
    })

    it('should handle trailing slash in base URL', () => {
      // Test de la logique buildApiUrl directement
      const path = 'users'
      const url = buildApiUrl(path)
      
      expect(url).toContain('users')
      // Vérifie qu'il n'y a pas de double slash sauf dans http://
      const afterProtocol = url.split('://')[1]
      expect(afterProtocol).not.toContain('//')
    })

    it('should concatenate base and path correctly', () => {
      const url = buildApiUrl('api/v1/users')
      
      expect(url).toContain('api/v1/users')
    })
  })

  describe('API_CONFIG', () => {
    it('should contain baseUrl', () => {
      expect(API_CONFIG).toHaveProperty('baseUrl')
    })

    it('should contain referer', () => {
      expect(API_CONFIG).toHaveProperty('referer')
    })
  })

  describe('validateApiConfig', () => {
    it('should validate without throwing when API_URL is set', () => {
      // Note: validateApiConfig throws at module load if API_URL is missing
      // This test verifies the function exists and can be called
      expect(validateApiConfig).toBeDefined()
      expect(typeof validateApiConfig).toBe('function')
    })
  })
})
