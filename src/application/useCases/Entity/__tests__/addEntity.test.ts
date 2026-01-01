import { addEntity } from '../addEntity'
import { EntityRepository } from '@/src/application/repositories/EntityRepository'
import { Entity } from '@/src/domain/Entity'

describe('addEntity', () => {
  let mockRepo: jest.Mocked<EntityRepository>

  beforeEach(() => {
    mockRepo = {
      addEntity: jest.fn(),
    } as any
  })

  it('should create a new entity successfully', async () => {
    const newEntity: Entity = {
      id: 0,
      name: 'New Cinema Chain',
    }

    const createdEntity: Entity = {
      id: 1,
      name: 'New Cinema Chain',
    }

    mockRepo.addEntity.mockResolvedValueOnce(createdEntity)

    const result = await addEntity(mockRepo, newEntity)

    expect(mockRepo.addEntity).toHaveBeenCalledWith(newEntity)
    expect(result).toEqual(createdEntity)
    expect(result.id).toBe(1)
  })

  it('should propagate repository errors', async () => {
    const newEntity: Entity = {
      id: 0,
      name: 'Test Entity',
    }

    const error = new Error('Database error')
    mockRepo.addEntity.mockRejectedValueOnce(error)

    await expect(addEntity(mockRepo, newEntity)).rejects.toThrow('Database error')
  })
})
