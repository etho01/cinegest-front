import { addOptionType } from '../addOptionType'
import { getOptionsTypes } from '../getOptionsTypes'
import { getAllOptionsTypes } from '../getAllOptionsTypes'
import { updateOptionType } from '../updateOptionType'
import { deleteOptionsType } from '../deleteOptionType'

describe('OptionType Use Cases', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      addOptionType: jest.fn(),
      getOptionsTypes: jest.fn(),
      getAllOptionsTypes: jest.fn(),
      updateOptionType: jest.fn(),
      deleteOptionType: jest.fn(),
    }
  })

  describe('addOptionType', () => {
    it('should create option type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const optionType = {
        name: 'Format',
        description: 'Movie format options',
      }

      const createdType = { id: 10, ...optionType }
      mockRepo.addOptionType.mockResolvedValueOnce(createdType)

      const result = await addOptionType(mockRepo, entityId, cinemaId, optionType)

      expect(mockRepo.addOptionType).toHaveBeenCalledWith(entityId, cinemaId, optionType)
      expect(result.id).toBe(10)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Option type already exists')
      mockRepo.addOptionType.mockRejectedValueOnce(error)

      await expect(addOptionType(mockRepo, 1, 5, {} as any)).rejects.toThrow('Option type already exists')
    })
  })

  describe('getOptionsTypes', () => {
    it('should fetch option types successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'Format', description: 'Movie formats' },
          { id: 2, name: 'Extras', description: 'Additional options' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getOptionsTypes.mockResolvedValueOnce(mockData)

      const result = await getOptionsTypes(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getOptionsTypes).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getAllOptionsTypes', () => {
    it('should fetch all option types successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const allTypes = [
        { id: 1, name: 'Format' },
        { id: 2, name: 'Extras' },
        { id: 3, name: 'Services' },
      ]

      mockRepo.getAllOptionsTypes.mockResolvedValueOnce(allTypes)

      const result = await getAllOptionsTypes(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllOptionsTypes).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(3)
    })
  })

  describe('updateOptionType', () => {
    it('should update option type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const optionType = {
        id: 10,
        name: 'Updated Format',
        description: 'Updated description',
      }

      mockRepo.updateOptionType.mockResolvedValueOnce(optionType)

      const result = await updateOptionType(mockRepo, entityId, cinemaId, optionType)

      expect(mockRepo.updateOptionType).toHaveBeenCalledWith(entityId, cinemaId, optionType)
      expect(result.name).toBe('Updated Format')
    })
  })

  describe('deleteOptionType', () => {
    it('should delete option type successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const typeId = 10

      mockRepo.deleteOptionType.mockResolvedValueOnce(undefined)

      await deleteOptionsType(mockRepo, entityId, cinemaId, typeId)

      expect(mockRepo.deleteOptionType).toHaveBeenCalledWith(entityId, cinemaId, typeId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Option type not found')
      mockRepo.deleteOptionType.mockRejectedValueOnce(error)

      await expect(deleteOptionsType(mockRepo, 1, 5, 999)).rejects.toThrow('Option type not found')
    })
  })
})
