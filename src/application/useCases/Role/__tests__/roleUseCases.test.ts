import { updateRole } from '../updateRole'
import { deleteRole } from '../deleteRole'
import { getRole } from '../getRole'
import { getRoles } from '../getRoles'
import { getAllRoleByEntity } from '../getAllRoleByEntity'
import { RoleRepository } from '@/src/application/repositories/RoleRepository'
import { Role } from '@/src/domain/User'

describe('Role Use Cases', () => {
  let mockRepo: jest.Mocked<RoleRepository>

  beforeEach(() => {
    mockRepo = {
      updateRole: jest.fn(),
      deleteRole: jest.fn(),
      getRole: jest.fn(),
      getRoles: jest.fn(),
      getAllRoleByEntity: jest.fn(),
    } as any
  })

  describe('updateRole', () => {
    it('should update role successfully', async () => {
      const entityId = 1
      const role: Role = {
        id: 5,
        name: 'Updated Manager',
        cinemaId: null,
        entityId: 1,
        rights: ['read', 'write', 'delete'],
      }

      mockRepo.updateRole.mockResolvedValueOnce(role)

      const result = await updateRole(mockRepo, entityId, role)

      expect(mockRepo.updateRole).toHaveBeenCalledWith(entityId, role)
      expect(result).toEqual(role)
      expect(result.name).toBe('Updated Manager')
    })

    it('should handle update errors', async () => {
      const role: Role = {
        id: 5,
        name: 'Manager',
        cinemaId: null,
        entityId: 1,
      }
      const error = new Error('Update failed')
      mockRepo.updateRole.mockRejectedValueOnce(error)

      await expect(updateRole(mockRepo, 1, role)).rejects.toThrow('Update failed')
    })
  })

  describe('deleteRole', () => {
    it('should delete role successfully', async () => {
      const entityId = 1
      const roleId = 5

      mockRepo.deleteRole.mockResolvedValueOnce(undefined)

      await deleteRole(mockRepo, entityId, roleId)

      expect(mockRepo.deleteRole).toHaveBeenCalledWith(entityId, roleId)
    })

    it('should handle delete errors', async () => {
      const error = new Error('Cannot delete role in use')
      mockRepo.deleteRole.mockRejectedValueOnce(error)

      await expect(deleteRole(mockRepo, 1, 5)).rejects.toThrow('Cannot delete role in use')
    })
  })

  describe('getRole', () => {
    it('should fetch single role successfully', async () => {
      const entityId = 1
      const roleId = 5
      const role: Role = {
        id: 5,
        name: 'Manager',
        cinemaId: null,
        entityId: 1,
        rights: ['read', 'write'],
      }

      mockRepo.getRole.mockResolvedValueOnce(role)

      const result = await getRole(mockRepo, entityId, roleId)

      expect(mockRepo.getRole).toHaveBeenCalledWith(entityId, roleId)
      expect(result).toEqual(role)
      expect(result.id).toBe(roleId)
    })

    it('should handle not found error', async () => {
      const error = new Error('Role not found')
      mockRepo.getRole.mockRejectedValueOnce(error)

      await expect(getRole(mockRepo, 1, 999)).rejects.toThrow('Role not found')
    })
  })

  describe('getRoles', () => {
    it('should fetch paginated roles successfully', async () => {
      const entityId = 1
      const params = { page: 1, per_page: 10 }
      const mockData = {
        data: [
          { id: 1, name: 'Admin', cinemaId: null, entityId: 1 },
          { id: 2, name: 'Manager', cinemaId: null, entityId: 1 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getRoles.mockResolvedValueOnce(mockData)

      const result = await getRoles(mockRepo, entityId, params)

      expect(mockRepo.getRoles).toHaveBeenCalledWith(entityId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getAllRoleByEntity', () => {
    it('should fetch all roles for entity successfully', async () => {
      const entityId = 1
      const roles: Role[] = [
        { id: 1, name: 'Admin', cinemaId: null, entityId: 1 },
        { id: 2, name: 'Manager', cinemaId: null, entityId: 1 },
        { id: 3, name: 'User', cinemaId: null, entityId: 1 },
      ]

      mockRepo.getAllRoleByEntity.mockResolvedValueOnce(roles)

      const result = await getAllRoleByEntity(mockRepo, entityId)

      expect(mockRepo.getAllRoleByEntity).toHaveBeenCalledWith(entityId)
      expect(result).toEqual(roles)
      expect(result).toHaveLength(3)
    })

    it('should return empty array when no roles', async () => {
      mockRepo.getAllRoleByEntity.mockResolvedValueOnce([])

      const result = await getAllRoleByEntity(mockRepo, 1)

      expect(result).toEqual([])
    })
  })
})
