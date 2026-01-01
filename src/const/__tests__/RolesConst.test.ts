import { ROLES } from '../RolesConst'

describe('RolesConst', () => {
  describe('ROLES structure', () => {
    it('should have global and cinema categories', () => {
      expect(ROLES).toHaveProperty('global')
      expect(ROLES).toHaveProperty('cinema')
    })

    it('should be an object with two main categories', () => {
      expect(typeof ROLES).toBe('object')
      expect(Object.keys(ROLES)).toContain('global')
      expect(Object.keys(ROLES)).toContain('cinema')
    })
  })

  describe('Global Roles', () => {
    it('should have user management permissions', () => {
      expect(ROLES.global).toHaveProperty('viewUsers')
      expect(ROLES.global).toHaveProperty('editUser')
      expect(ROLES.global).toHaveProperty('addUser')
      expect(ROLES.global).toHaveProperty('deleteUser')
    })

    it('should have cinema management permissions', () => {
      expect(ROLES.global).toHaveProperty('viewCinemas')
      expect(ROLES.global).toHaveProperty('addCinema')
      expect(ROLES.global).toHaveProperty('editCinema')
      expect(ROLES.global).toHaveProperty('deleteCinema')
    })

    it('should have role management permissions', () => {
      expect(ROLES.global).toHaveProperty('viewRoles')
    })

    it('should have name and description for each permission', () => {
      Object.values(ROLES.global).forEach(permission => {
        expect(permission).toHaveProperty('name')
        expect(permission).toHaveProperty('description')
        expect(typeof permission.name).toBe('string')
        expect(typeof permission.description).toBe('string')
        expect(permission.name.length).toBeGreaterThan(0)
        expect(permission.description.length).toBeGreaterThan(0)
      })
    })

    it('should have French descriptions', () => {
      expect(ROLES.global.viewUsers.name).toContain('utilisateurs')
      expect(ROLES.global.viewCinemas.name).toContain('cinémas')
    })
  })

  describe('Cinema Roles', () => {
    it('should be an object', () => {
      expect(typeof ROLES.cinema).toBe('object')
    })

    it('should have cinema-specific permissions with name and description', () => {
      Object.values(ROLES.cinema).forEach(permission => {
        expect(permission).toHaveProperty('name')
        expect(permission).toHaveProperty('description')
        expect(typeof permission.name).toBe('string')
        expect(typeof permission.description).toBe('string')
      })
    })
  })

  describe('Permission Structure Consistency', () => {
    it('all global permissions should have consistent structure', () => {
      const globalKeys = Object.keys(ROLES.global)
      expect(globalKeys.length).toBeGreaterThan(0)
      
      globalKeys.forEach(key => {
        const permission = ROLES.global[key]
        expect(permission).toMatchObject({
          name: expect.any(String),
          description: expect.any(String),
        })
      })
    })

    it('all cinema permissions should have consistent structure', () => {
      const cinemaKeys = Object.keys(ROLES.cinema)
      
      cinemaKeys.forEach(key => {
        const permission = ROLES.cinema[key]
        expect(permission).toMatchObject({
          name: expect.any(String),
          description: expect.any(String),
        })
      })
    })
  })
})
