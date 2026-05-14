import { addRole } from '../addRole'
import { RoleRepository } from '@/src/application/repositories/RoleRepository'
import { Role } from '@/src/domain/User'

describe('addRole', () => {
  let mockRepo: jest.Mocked<RoleRepository>

  beforeEach(() => {
    mockRepo = {
      addRole: jest.fn(),
    } as unknown as jest.Mocked<RoleRepository>
  })

  it('should create a new role successfully', async () => {
    const entityId = 1
    const newRole: Role = {
      id: 0,
      name: 'Manager',
      cinemaId: null,
      entityId: 1,
      rights: ['read', 'write'],
    }

    const createdRole: Role = {
      ...newRole,
      id: 5,
    }

    mockRepo.addRole.mockResolvedValueOnce(createdRole)

    const result = await addRole(mockRepo, entityId, newRole)

    expect(mockRepo.addRole).toHaveBeenCalledWith(entityId, newRole)
    expect(result).toEqual(createdRole)
    expect(result.id).toBe(5)
  })

  it('should handle repository errors', async () => {
    const entityId = 1
    const newRole: Role = {
      id: 0,
      name: 'Manager',
      cinemaId: null,
      entityId: 1,
    }

    const error = new Error('Database error')
    mockRepo.addRole.mockRejectedValueOnce(error)

    await expect(addRole(mockRepo, entityId, newRole)).rejects.toThrow('Database error')
  })

  it('should create role with cinema association', async () => {
    const entityId = 1
    const newRole: Role = {
      id: 0,
      name: 'Cinema Admin',
      cinemaId: 10,
      entityId: 1,
      rights: ['cinema:manage'],
    }

    const createdRole: Role = {
      ...newRole,
      id: 6,
    }

    mockRepo.addRole.mockResolvedValueOnce(createdRole)

    const result = await addRole(mockRepo, entityId, newRole)

    expect(result.cinemaId).toBe(10)
    expect(result.name).toBe('Cinema Admin')
  })
})
