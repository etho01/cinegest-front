import { getCinemaApi } from '../getCinemaApi'

describe('CinemaApi getCinemaApi Use Case', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      getCinemaApi: jest.fn(),
    }
  })

  describe('getCinemaApi', () => {
    it('should fetch a single cinema API successfully', async () => {
      const entityId = 1
      const cinemaApiId = 5
      
      const cinemaApi = {
        id: 5,
        name: 'API Principale',
        url: 'https://api.cinema.com',
        apiKey: 'key-12345',
        cinemaIds: [1, 2, 3],
      }

      mockRepo.getCinemaApi.mockResolvedValueOnce(cinemaApi)

      const result = await getCinemaApi(mockRepo, entityId, cinemaApiId)

      expect(mockRepo.getCinemaApi).toHaveBeenCalledWith(entityId, cinemaApiId)
      expect(result.id).toBe(5)
      expect(result.name).toBe('API Principale')
      expect(result.cinemaIds).toHaveLength(3)
    })

    it('should handle fetch errors', async () => {
      const error = new Error('Cinema API not found')
      mockRepo.getCinemaApi.mockRejectedValueOnce(error)

      await expect(getCinemaApi(mockRepo, 1, 999)).rejects.toThrow('Cinema API not found')
    })

    it('should return cinema API with empty cinema list', async () => {
      const cinemaApi = {
        id: 5,
        name: 'New API',
        url: 'https://new-api.com',
        cinemaIds: [],
      }

      mockRepo.getCinemaApi.mockResolvedValueOnce(cinemaApi)

      const result = await getCinemaApi(mockRepo, 1, 5)

      expect(result.cinemaIds).toEqual([])
    })
  })
})
