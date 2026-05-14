import { addStorage } from '../addStorage'
import { getStorages } from '../getStorages'
import { getAllStorages } from '../getAllStorage'
import { updateStorage } from '../updateStorage'
import { deleteStorage } from '../deleteStorage'
import { StorageRepository } from '@/src/application/repositories/Cinema/Settings/StorageRepository'
import { Storage } from '@/src/domain/Cinema/Settings/Storage'

describe('Storage Use Cases', () => {
  let mockRepo: jest.Mocked<StorageRepository>

  beforeEach(() => {
    mockRepo = {
      addStorage: jest.fn(),
      getStorages: jest.fn(),
      getAllStorage: jest.fn(),
      updateStorage: jest.fn(),
      deleteStorage: jest.fn(),
    } as unknown as jest.Mocked<StorageRepository>
  })

  describe('addStorage', () => {
    it('should create storage successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const storage = {
        name: 'Main Storage',
        storageTypeId: 1,
        capacity: 1000,
      }

      const createdStorage = { id: 10, ...storage }
      mockRepo.addStorage.mockResolvedValueOnce(createdStorage)

      const result = await addStorage(mockRepo, entityId, cinemaId, storage as unknown as Storage)

      expect(mockRepo.addStorage).toHaveBeenCalledWith(entityId, cinemaId, storage)
      expect(result.id).toBe(10)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Storage type not found')
      mockRepo.addStorage.mockRejectedValueOnce(error)

      await expect(addStorage(mockRepo, 1, 5, {} as unknown as Storage)).rejects.toThrow('Storage type not found')
    })
  })

  describe('getStorages', () => {
    it('should fetch storages successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'Main Storage', capacity: 1000 },
          { id: 2, name: 'Secondary Storage', capacity: 500 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getStorages.mockResolvedValueOnce(mockData)

      const result = await getStorages(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getStorages).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getAllStorages', () => {
    it('should fetch all storages successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const allStorages = [
        { id: 1, name: 'Main Storage' },
        { id: 2, name: 'Secondary Storage' },
        { id: 3, name: 'Backup Storage' },
      ]

      mockRepo.getAllStorages = jest.fn()
      mockRepo.getAllStorages.mockResolvedValueOnce(allStorages as unknown as Storage[])

      const result = await getAllStorages(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllStorages).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(3)
    })
  })

  describe('updateStorage', () => {
    it('should update storage successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const storage = {
        id: 10,
        name: 'Updated Storage',
        capacity: 1500,
      }

      mockRepo.updateStorage.mockResolvedValueOnce(storage)

      const result = await updateStorage(mockRepo, entityId, cinemaId, storage)

      expect(mockRepo.updateStorage).toHaveBeenCalledWith(entityId, cinemaId, storage)
      expect(result.name).toBe('Updated Storage')
    })
  })

  describe('deleteStorage', () => {
    it('should delete storage successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const storageId = 10

      mockRepo.deleteStorage.mockResolvedValueOnce(undefined)

      await deleteStorage(mockRepo, entityId, cinemaId, storageId)

      expect(mockRepo.deleteStorage).toHaveBeenCalledWith(entityId, cinemaId, storageId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Storage not found')
      mockRepo.deleteStorage.mockRejectedValueOnce(error)

      await expect(deleteStorage(mockRepo, 1, 5, 999)).rejects.toThrow('Storage not found')
    })
  })
})
