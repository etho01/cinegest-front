import { addPrice } from '../addPrice'
import { updatePrice } from '../updatePrice'
import { deletePrice } from '../deletePrice'
import { CinemaApiRepository } from '@/src/application/repositories/CinemaApiRepository'
import { Price } from '@/src/domain/CinemaApi'

describe('CinemaApi Price Use Cases', () => {
  let mockRepo: jest.Mocked<CinemaApiRepository>

  beforeEach(() => {
    mockRepo = {
      addPrice: jest.fn(),
      updatePrice: jest.fn(),
      deletePrice: jest.fn(),
      getCinemaApi: jest.fn(),
      getCinemaApis: jest.fn(),
      createCinemaApi: jest.fn(),
      updateCinemaApi: jest.fn(),
      deleteCinemaApi: jest.fn(),
    } as jest.Mocked<CinemaApiRepository>
  })

  describe('addPrice', () => {
    it('should create price successfully', async () => {
      const entityId = 1
      const cinemaApiId = 5
      const price = {
        name: 'Plein tarif',
        amount: 12.50,
        type: 'adult',
      }

      const createdPrice = { id: 10, ...price }
      mockRepo.addPrice.mockResolvedValueOnce(createdPrice)

      const result = await addPrice(mockRepo, entityId, cinemaApiId, price)

      expect(mockRepo.addPrice).toHaveBeenCalledWith(entityId, cinemaApiId, price)
      expect(result.id).toBe(10)
      expect(result.amount).toBe(12.50)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Price already exists')
      mockRepo.addPrice.mockRejectedValueOnce(error)

      await expect(addPrice(mockRepo, 1, 5, {} as unknown as Price)).rejects.toThrow('Price already exists')
    })
  })

  describe('updatePrice', () => {
    it('should update price successfully', async () => {
      const entityId = 1
      const cinemaApiId = 5
      const price = {
        id: 10,
        name: 'Tarif réduit',
        amount: 9.50,
      }

      mockRepo.updatePrice.mockResolvedValueOnce(price)

      const result = await updatePrice(mockRepo, entityId, cinemaApiId, { ...price, currency: 'EUR' } as Price)

      expect(mockRepo.updatePrice).toHaveBeenCalledWith(entityId, cinemaApiId, price)
      expect(result.amount).toBe(9.50)
    })

    it('should handle update errors', async () => {
      const error = new Error('Price not found')
      mockRepo.updatePrice.mockRejectedValueOnce(error)

      await expect(updatePrice(mockRepo, 1, 5, {} as unknown as Price)).rejects.toThrow('Price not found')
    })
  })

  describe('deletePrice', () => {
    it('should delete price successfully', async () => {
      const entityId = 1
      const cinemaApiId = 5
      const priceId = 10

      mockRepo.deletePrice.mockResolvedValueOnce(undefined)

      await deletePrice(mockRepo, entityId, cinemaApiId, priceId)

      expect(mockRepo.deletePrice).toHaveBeenCalledWith(entityId, cinemaApiId, priceId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Price not found')
      mockRepo.deletePrice.mockRejectedValueOnce(error)

      await expect(deletePrice(mockRepo, 1, 5, 999)).rejects.toThrow('Price not found')
    })
  })
})
