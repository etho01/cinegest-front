import { addOption } from '../addOption'
import { getOptions } from '../getOptions'
import { getAllOptions } from '../getAllOptions'
import { updateOption } from '../updateOption'
import { deleteOption } from '../deleteOption'

describe('Option Use Cases', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      addOption: jest.fn(),
      getOptions: jest.fn(),
      getAllOptions: jest.fn(),
      updateOption: jest.fn(),
      deleteOption: jest.fn(),
    }
  })

  describe('addOption', () => {
    it('should create option successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const option = {
        name: '3D',
        optionTypeId: 1,
        price: 3.5,
      }

      const createdOption = { id: 10, ...option }
      mockRepo.addOption.mockResolvedValueOnce(createdOption)

      const result = await addOption(mockRepo, entityId, cinemaId, option)

      expect(mockRepo.addOption).toHaveBeenCalledWith(entityId, cinemaId, option)
      expect(result.id).toBe(10)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Option type not found')
      mockRepo.addOption.mockRejectedValueOnce(error)

      await expect(addOption(mockRepo, 1, 5, {} as any)).rejects.toThrow('Option type not found')
    })
  })

  describe('getOptions', () => {
    it('should fetch options successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: '3D', price: 3.5 },
          { id: 2, name: 'IMAX', price: 5.0 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getOptions.mockResolvedValueOnce(mockData)

      const result = await getOptions(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getOptions).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getAllOptions', () => {
    it('should fetch all options successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const allOptions = [
        { id: 1, name: '3D', price: 3.5 },
        { id: 2, name: 'IMAX', price: 5.0 },
        { id: 3, name: 'VIP', price: 8.0 },
      ]

      mockRepo.getAllOptions.mockResolvedValueOnce(allOptions)

      const result = await getAllOptions(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllOptions).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(3)
    })
  })

  describe('updateOption', () => {
    it('should update option successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const option = {
        id: 10,
        name: '4DX',
        price: 6.5,
      }

      mockRepo.updateOption.mockResolvedValueOnce(option)

      const result = await updateOption(mockRepo, entityId, cinemaId, option)

      expect(mockRepo.updateOption).toHaveBeenCalledWith(entityId, cinemaId, option)
      expect(result.name).toBe('4DX')
    })
  })

  describe('deleteOption', () => {
    it('should delete option successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const optionId = 10

      mockRepo.deleteOption.mockResolvedValueOnce(undefined)

      await deleteOption(mockRepo, entityId, cinemaId, optionId)

      expect(mockRepo.deleteOption).toHaveBeenCalledWith(entityId, cinemaId, optionId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Option not found')
      mockRepo.deleteOption.mockRejectedValueOnce(error)

      await expect(deleteOption(mockRepo, 1, 5, 999)).rejects.toThrow('Option not found')
    })
  })
})
