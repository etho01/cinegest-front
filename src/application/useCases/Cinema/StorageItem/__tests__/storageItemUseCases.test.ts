import { addStorageItems } from '../addStorageItems'
import { getStorageItems } from '../getStorageItems'
import { deleteStorageItem } from '../deleteStorageItem'

describe('StorageItem Use Cases', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      addStorageItems: jest.fn(),
      getStorageItems: jest.fn(),
      deleteStorageItem: jest.fn(),
    }
  })

  describe('addStorageItems', () => {
    it('should create storage items successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = {
        roomId: 1,
        storageId: 2,
        movieVersions: [1, 2, null],
      }

      const createdItems = { success: true, created: 3 }
      mockRepo.addStorageItems.mockResolvedValueOnce(createdItems)

      const result = await addStorageItems(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.addStorageItems).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.success).toBe(true)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Storage not found')
      mockRepo.addStorageItems.mockRejectedValueOnce(error)

      await expect(addStorageItems(mockRepo, 1, 5, {} as any)).rejects.toThrow('Storage not found')
    })
  })

  describe('getStorageItems', () => {
    it('should fetch storage items successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'Popcorn', quantity: 100 },
          { id: 2, name: 'Soda', quantity: 50 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getStorageItems.mockResolvedValueOnce(mockData)

      const result = await getStorageItems(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getStorageItems).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('deleteStorageItem', () => {
    it('should delete storage item successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const itemId = 10

      mockRepo.deleteStorageItem.mockResolvedValueOnce(undefined)

      await deleteStorageItem(mockRepo, entityId, cinemaId, itemId)

      expect(mockRepo.deleteStorageItem).toHaveBeenCalledWith(entityId, cinemaId, itemId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Item not found')
      mockRepo.deleteStorageItem.mockRejectedValueOnce(error)

      await expect(deleteStorageItem(mockRepo, 1, 5, 999)).rejects.toThrow('Item not found')
    })
  })
})
