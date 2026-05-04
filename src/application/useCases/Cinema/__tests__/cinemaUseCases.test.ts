import { addCinema } from '../addCinema'
import { updateCinema } from '../updateCinema'
import { deleteCinema } from '../deleteCinema'
import { getCinemas } from '../getCinemas'
import { getAllCinemasByEntity } from '../getAllCinemasByEntity'
import { CinemaRepository } from '@/src/application/repositories/CinemaRepository'
import { Cinema } from '@/src/domain/Cinema'

describe('Cinema Use Cases', () => {
  let mockRepo: jest.Mocked<CinemaRepository>

  beforeEach(() => {
    mockRepo = {
      addCinema: jest.fn(),
      updateCinema: jest.fn(),
      deleteCinema: jest.fn(),
      getCinemas: jest.fn(),
      getAllCinemasByEntity: jest.fn(),
    } as jest.Mocked<CinemaRepository>
  })

  describe('addCinema', () => {
    it('should create a new cinema successfully', async () => {
      const entityId = 1
      const newCinema: Cinema = {
        id: 0,
        name: 'New Cinema',
        address: '123 Main St',
        postal_code: '75001',
        city: 'Paris',
        country: 'France',
      }

      const createdCinema: Cinema = {
        ...newCinema,
        id: 5,
      }

      mockRepo.addCinema.mockResolvedValueOnce(createdCinema)

      const result = await addCinema(mockRepo, entityId, newCinema)

      expect(mockRepo.addCinema).toHaveBeenCalledWith(entityId, newCinema)
      expect(result).toEqual(createdCinema)
      expect(result.id).toBe(5)
    })

    it('should handle creation errors', async () => {
      const entityId = 1
      const newCinema: Cinema = {
        id: 0,
        name: 'Cinema',
        address: '123 St',
        postal_code: '75001',
        city: 'Paris',
        country: 'France',
      }

      const error = new Error('Database error')
      mockRepo.addCinema.mockRejectedValueOnce(error)

      await expect(addCinema(mockRepo, entityId, newCinema)).rejects.toThrow('Database error')
    })
  })

  describe('updateCinema', () => {
    it('should update cinema successfully', async () => {
      const entityId = 1
      const cinema: Cinema = {
        id: 5,
        name: 'Updated Cinema',
        address: '456 New St',
        postal_code: '75002',
        city: 'Paris',
        country: 'France',
      }

      mockRepo.updateCinema.mockResolvedValueOnce(cinema)

      const result = await updateCinema(mockRepo, entityId, cinema)

      expect(mockRepo.updateCinema).toHaveBeenCalledWith(entityId, cinema)
      expect(result).toEqual(cinema)
    })
  })

  describe('deleteCinema', () => {
    it('should delete cinema successfully', async () => {
      const entityId = 1
      const cinemaId = 5

      mockRepo.deleteCinema.mockResolvedValueOnce(undefined)

      await deleteCinema(mockRepo, entityId, cinemaId)

      expect(mockRepo.deleteCinema).toHaveBeenCalledWith(entityId, cinemaId)
    })
  })

  describe('getCinemas', () => {
    it('should fetch cinemas with pagination successfully', async () => {
      const entityId = 1
      const params = { entityId: 1, search: '', page: 1 }
      const mockData = {
        data: [
          { id: 1, name: 'Cinema 1', address: '123 St', postal_code: '75001', city: 'Paris', country: 'France' },
          { id: 2, name: 'Cinema 2', address: '456 St', postal_code: '75002', city: 'Lyon', country: 'France' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getCinemas.mockResolvedValueOnce(mockData)

      const result = await getCinemas(mockRepo, params)

      expect(mockRepo.getCinemas).toHaveBeenCalledWith(entityId, params.search, params.page)
      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
    })
  })

  describe('getAllCinemasByEntity', () => {
    it('should fetch all cinemas for an entity successfully', async () => {
      const entityId = 1
      const mockCinemas: Cinema[] = [
        { id: 1, name: 'Cinema 1', address: '123 St', postal_code: '75001', city: 'Paris', country: 'France' },
        { id: 2, name: 'Cinema 2', address: '456 St', postal_code: '75002', city: 'Lyon', country: 'France' },
        { id: 3, name: 'Cinema 3', address: '789 St', postal_code: '75003', city: 'Marseille', country: 'France' },
      ]

      mockRepo.getAllCinemasByEntity.mockResolvedValueOnce(mockCinemas)

      const result = await getAllCinemasByEntity(mockRepo, entityId)

      expect(mockRepo.getAllCinemasByEntity).toHaveBeenCalledWith(entityId)
      expect(result).toEqual(mockCinemas)
      expect(result).toHaveLength(3)
    })

    it('should return empty array when no cinemas exist', async () => {
      const entityId = 1
      mockRepo.getAllCinemasByEntity.mockResolvedValueOnce([])

      const result = await getAllCinemasByEntity(mockRepo, entityId)

      expect(mockRepo.getAllCinemasByEntity).toHaveBeenCalledWith(entityId)
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle errors from repository', async () => {
      const entityId = 1
      const error = new Error('Database connection failed')
      mockRepo.getAllCinemasByEntity.mockRejectedValueOnce(error)

      await expect(getAllCinemasByEntity(mockRepo, entityId)).rejects.toThrow('Database connection failed')
    })
  })
})
