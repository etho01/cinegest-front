import { updateEntity } from '../updateEntity'
import { deleteEntity } from '../deleteEntity'
import { fetchEntities } from '../fetchEntities'
import { EntityRepository } from '@/src/application/repositories/EntityRepository'
import { Entity } from '@/src/domain/Entity'

describe('Entity Use Cases', () => {
  let mockRepo: jest.Mocked<EntityRepository>

  beforeEach(() => {
    mockRepo = {
      updateEntity: jest.fn(),
      delete: jest.fn(),
      fetchEntities: jest.fn(),
    } as jest.Mocked<EntityRepository>
  })

  describe('updateEntity', () => {
    it('should update entity successfully', async () => {
      const entity: Entity = {
        id: 1,
        name: 'Updated Name',
      }

      mockRepo.updateEntity.mockResolvedValueOnce(entity)

      const result = await updateEntity(mockRepo, entity)

      expect(mockRepo.updateEntity).toHaveBeenCalledWith(entity)
      expect(result).toEqual(entity)
    })

    it('should handle update errors', async () => {
      const entity: Entity = { id: 1, name: 'Test' }
      const error = new Error('Update failed')
      mockRepo.updateEntity.mockRejectedValueOnce(error)

      await expect(updateEntity(mockRepo, entity)).rejects.toThrow('Update failed')
    })
  })

  describe('deleteEntity', () => {
    it('should delete entity successfully', async () => {
      const entityId = 1

      mockRepo.delete.mockResolvedValueOnce(undefined)

      await deleteEntity(mockRepo, entityId)

      expect(mockRepo.delete).toHaveBeenCalledWith(entityId)
    })

    it('should handle delete errors', async () => {
      const error = new Error('Delete failed')
      mockRepo.delete.mockRejectedValueOnce(error)

      await expect(deleteEntity(mockRepo, 1)).rejects.toThrow('Delete failed')
    })
  })

  describe('fetchEntities', () => {
    it('should fetch all entities successfully', async () => {
      const props = { page: 1, per_page: 10 }
      const paginatedData = {
        data: [
          { id: 1, name: 'Entity 1' },
          { id: 2, name: 'Entity 2' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.fetchEntities.mockResolvedValueOnce(paginatedData)

      const result = await fetchEntities(mockRepo, props)

      expect(mockRepo.fetchEntities).toHaveBeenCalledWith(props)
      expect(result.data).toEqual(paginatedData.data)
      expect(result.total).toBe(2)
    })

    it('should return empty data when no entities', async () => {
      const props = { page: 1, per_page: 10 }
      const emptyData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0,
      }
      
      mockRepo.fetchEntities.mockResolvedValueOnce(emptyData)

      const result = await fetchEntities(mockRepo, props)

      expect(result.data).toEqual([])
      expect(result.total).toBe(0)
    })
  })
})
