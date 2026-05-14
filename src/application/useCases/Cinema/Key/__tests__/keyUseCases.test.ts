import { addKeys } from '../addKeys'
import { getKeys } from '../getKeys'
import { deleteKey } from '../deleteKey'
import { KeyRepository } from '@/src/application/repositories/Cinema/KeyRepository'
import { AddKeyModalElement } from '../addKeys'

describe('Key Use Cases', () => {
  let mockRepo: jest.Mocked<KeyRepository>

  beforeEach(() => {
    mockRepo = {
      addKeys: jest.fn(),
      getKeys: jest.fn(),
      deleteKey: jest.fn(),
    } as jest.Mocked<KeyRepository>
  })

  describe('addKeys', () => {
    it('should create keys successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const keys = {
        dateStart: new Date('2026-01-01'),
        dateEnd: new Date('2026-12-31'),
        cinemaId: 5,
        versions: [
          { movieVersionId: 1, rooms: [1, 2] },
          { movieVersionId: 2, rooms: [3] },
        ],
      }

      mockRepo.addKeys.mockResolvedValueOnce(undefined)

      await addKeys(mockRepo, entityId, cinemaId, keys)

      expect(mockRepo.addKeys).toHaveBeenCalledWith(entityId, cinemaId, keys)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Invalid key data')
      mockRepo.addKeys.mockRejectedValueOnce(error)

      await expect(addKeys(mockRepo, 1, 5, {} as unknown as AddKeyModalElement)).rejects.toThrow('Invalid key data')
    })
  })

  describe('getKeys', () => {
    it('should fetch keys successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'API Key 1', value: 'key-123' },
          { id: 2, name: 'API Key 2', value: 'key-456' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockRepo.getKeys.mockResolvedValueOnce(mockData as any)

      const result = await getKeys(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getKeys).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('deleteKey', () => {
    it('should delete key successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const keyId = 10

      mockRepo.deleteKey.mockResolvedValueOnce(undefined)

      await deleteKey(mockRepo, entityId, cinemaId, keyId)

      expect(mockRepo.deleteKey).toHaveBeenCalledWith(entityId, cinemaId, keyId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Key not found')
      mockRepo.deleteKey.mockRejectedValueOnce(error)

      await expect(deleteKey(mockRepo, 1, 5, 999)).rejects.toThrow('Key not found')
    })
  })
})
