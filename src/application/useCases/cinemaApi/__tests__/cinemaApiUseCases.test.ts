import { addCinemaApi } from '../addCinemaApi'
import { updateCinemaApi } from '../updateCinemaApi'
import { deleteCinemaApi } from '../deleteCinemaApi'
import { getCinemaApis } from '../getCinemaApis'
import { CinemaApiRepository } from '@/src/application/repositories/CinemaApiRepository'
import { CinemaApi } from '@/src/domain/CinemaApi'

describe('CinemaApi Use Cases', () => {
  let mockRepo: jest.Mocked<CinemaApiRepository>

  beforeEach(() => {
    mockRepo = {
      createCinemaApi: jest.fn(),
      updateCinemaApi: jest.fn(),
      deleteCinemaApi: jest.fn(),
      getCinemaApis: jest.fn(),
      getCinemaApi: jest.fn(),
      addPrice: jest.fn(),
      updatePrice: jest.fn(),
      deletePrice: jest.fn(),
    } as jest.Mocked<CinemaApiRepository>
  })

  describe('addCinemaApi', () => {
    it('should create a new cinema API successfully', async () => {
      const entityId = 1
      const newApi = {
        id: 0,
        name: 'Allocine API',
        url: 'https://api.allocine.fr',
        cinema_id: 5,
      } as unknown as CinemaApi

      const createdApi = {
        ...newApi,
        id: 15,
      } as unknown as CinemaApi

      mockRepo.createCinemaApi.mockResolvedValueOnce(createdApi)

      const result = await addCinemaApi(mockRepo, entityId, newApi)

      expect(mockRepo.createCinemaApi).toHaveBeenCalledWith(entityId, newApi)
      expect(result).toEqual(createdApi)
      expect(result.id).toBe(15)
    })

    it('should handle creation errors', async () => {
      const newApi = {
        id: 0,
        name: 'Test API',
        url: 'https://api.test.com',
        cinema_id: 5,
      } as unknown as CinemaApi

      const error = new Error('API creation failed')
      mockRepo.createCinemaApi.mockRejectedValueOnce(error)

      await expect(addCinemaApi(mockRepo, 1, newApi)).rejects.toThrow('API creation failed')
    })
  })

  describe('updateCinemaApi', () => {
    it('should update cinema API successfully', async () => {
      const entityId = 1
      const api = {
        id: 15,
        name: 'Updated API',
        url: 'https://api.updated.com',
        cinema_id: 5,
      } as unknown as CinemaApi

      mockRepo.updateCinemaApi.mockResolvedValueOnce(api)

      const result = await updateCinemaApi(mockRepo, entityId, api)

      expect(mockRepo.updateCinemaApi).toHaveBeenCalledWith(entityId, api)
      expect(result).toEqual(api)
    })

    it('should handle update errors', async () => {
      const api = {
        id: 15,
        name: 'API',
        url: 'https://api.test.com',
        cinema_id: 5,
      } as unknown as CinemaApi

      const error = new Error('Update failed')
      mockRepo.updateCinemaApi.mockRejectedValueOnce(error)

      await expect(updateCinemaApi(mockRepo, 1, api)).rejects.toThrow('Update failed')
    })
  })

  describe('deleteCinemaApi', () => {
    it('should delete cinema API successfully', async () => {
      const entityId = 1
      const apiId = 15

      mockRepo.deleteCinemaApi.mockResolvedValueOnce(undefined)

      await deleteCinemaApi(mockRepo, entityId, apiId)

      expect(mockRepo.deleteCinemaApi).toHaveBeenCalledWith(entityId, apiId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Cannot delete API')
      mockRepo.deleteCinemaApi.mockRejectedValueOnce(error)

      await expect(deleteCinemaApi(mockRepo, 1, 15)).rejects.toThrow('Cannot delete API')
    })
  })

  describe('getCinemaApis', () => {
    it('should fetch all cinema APIs successfully', async () => {
      const entityId = 1
      const props = { page: 1, per_page: 10 }
      const mockData = {
        data: [
          { id: 15, name: 'API 1', url: 'https://api1.com', cinema_id: 5 },
          { id: 16, name: 'API 2', url: 'https://api2.com', cinema_id: 5 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockRepo.getCinemaApis.mockResolvedValueOnce(mockData as any)

      const result = await getCinemaApis(mockRepo, entityId, props)

      expect(mockRepo.getCinemaApis).toHaveBeenCalledWith(entityId, props)
      expect(result.data).toHaveLength(2)
    })

    it('should return empty data when no APIs', async () => {
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
      
      mockRepo.getCinemaApis.mockResolvedValueOnce(emptyData)

      const result = await getCinemaApis(mockRepo, 1, props)

      expect(result.data).toEqual([])
    })
  })
})
