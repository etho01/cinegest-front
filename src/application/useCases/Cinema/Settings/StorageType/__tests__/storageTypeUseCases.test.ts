import { addStorageType } from '../addStorageType'
import { getStorageTypes } from '../getStorageTypes'
import { getAllStorageTypes } from '../getAllStorageTypes'
import { updateStorageType } from '../updateStorageType'
import { deleteStorageType } from '../deleteStorageType'
import { StorageTypeRepository } from '@/src/application/repositories/Cinema/Settings/StorageTypeRepository'
import { StorageType } from '@/src/domain/Cinema/Settings/StorageType'

describe('StorageType Use Cases', () => {
  let mockRepo: jest.Mocked<StorageTypeRepository>

  beforeEach(() => {
    mockRepo = {
      addStorageType: jest.fn(),
      getStorageTypes: jest.fn(),
      getAllStorageTypes: jest.fn(),
      updateStorageType: jest.fn(),
      deleteStorageType: jest.fn(),
    } as jest.Mocked<StorageTypeRepository>
  })

  describe('addStorageType', () => {
    it('should create storage type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const storageType = {
        name: 'Film Reels',
        description: 'Physical film storage',
      }

      const createdType = { id: 10, ...storageType }
      mockRepo.addStorageType.mockResolvedValueOnce(createdType)

      const result = await addStorageType(mockRepo, entityId, cinemaId, storageType as unknown as StorageType)

      expect(mockRepo.addStorageType).toHaveBeenCalledWith(entityId, cinemaId, storageType)
      expect(result.id).toBe(10)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Storage type already exists')
      mockRepo.addStorageType.mockRejectedValueOnce(error)

      await expect(addStorageType(mockRepo, 1, 5, {} as unknown as StorageType)).rejects.toThrow('Storage type already exists')
    })
  })

  describe('getStorageTypes', () => {
    it('should fetch storage types successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'Film Reels', description: 'Physical film' },
          { id: 2, name: 'Digital', description: 'Digital storage' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getStorageTypes.mockResolvedValueOnce(mockData)

      const result = await getStorageTypes(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getStorageTypes).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getAllStorageTypes', () => {
    it('should fetch all storage types successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const allTypes = [
        { id: 1, name: 'Film Reels' },
        { id: 2, name: 'Digital' },
        { id: 3, name: 'Hybrid' },
      ]

      mockRepo.getAllStorageTypes.mockResolvedValueOnce(allTypes)

      const result = await getAllStorageTypes(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllStorageTypes).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(3)
    })
  })

  describe('updateStorageType', () => {
    it('should update storage type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const storageType = {
        id: 10,
        name: 'Updated Type',
        description: 'Updated description',
      }

      mockRepo.updateStorageType.mockResolvedValueOnce(storageType)

      const result = await updateStorageType(mockRepo, entityId, cinemaId, storageType)

      expect(mockRepo.updateStorageType).toHaveBeenCalledWith(entityId, cinemaId, storageType)
      expect(result.name).toBe('Updated Type')
    })
  })

  describe('deleteStorageType', () => {
    it('should delete storage type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const typeId = 10

      mockRepo.deleteStorageType.mockResolvedValueOnce(undefined)

      await deleteStorageType(mockRepo, entityId, cinemaId, typeId)

      expect(mockRepo.deleteStorageType).toHaveBeenCalledWith(entityId, cinemaId, typeId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Storage type not found')
      mockRepo.deleteStorageType.mockRejectedValueOnce(error)

      await expect(deleteStorageType(mockRepo, 1, 5, 999)).rejects.toThrow('Storage type not found')
    })
  })
})
