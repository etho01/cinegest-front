import { addMovieVersion } from '../addMovieVersion'
import { updateMovieVersion } from '../updateMovieVersion'
import { deleteMovieVersion } from '../deleteMovieVersion'
import { searchMovieVersion } from '../searchMovieVersion'

describe('MovieVersion Use Cases', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      addMovieVersion: jest.fn(),
      updateMovieVersion: jest.fn(),
      deleteMovieVersion: jest.fn(),
      searchMovieVersion: jest.fn(),
    }
  })

  describe('addMovieVersion', () => {
    it('should create movie version successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const version = {
        language: 'FR',
        format: '3D',
        subtitles: 'EN',
      }

      const createdVersion = { id: 20, ...version }
      mockRepo.addMovieVersion.mockResolvedValueOnce(createdVersion)

      const result = await addMovieVersion(mockRepo, entityId, cinemaId, version as any)

      expect(mockRepo.addMovieVersion).toHaveBeenCalledWith(entityId, cinemaId, version)
      expect(result.id).toBe(20)
      expect(result.language).toBe('FR')
    })

    it('should handle creation errors', async () => {
      const error = new Error('Version already exists')
      mockRepo.addMovieVersion.mockRejectedValueOnce(error)

      await expect(addMovieVersion(mockRepo, 1, 5, {} as any)).rejects.toThrow('Version already exists')
    })
  })

  describe('updateMovieVersion', () => {
    it('should update movie version successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const version = {
        id: 20,
        language: 'EN',
        format: 'IMAX',
      }

      mockRepo.updateMovieVersion.mockResolvedValueOnce(version)

      const result = await updateMovieVersion(mockRepo, entityId, cinemaId, version as any)

      expect(mockRepo.updateMovieVersion).toHaveBeenCalledWith(entityId, cinemaId, version)
      expect(result.format).toBe('IMAX')
    })

    it('should handle update errors', async () => {
      const error = new Error('Version not found')
      mockRepo.updateMovieVersion.mockRejectedValueOnce(error)

      await expect(updateMovieVersion(mockRepo, 1, 5, {} as any)).rejects.toThrow('Version not found')
    })
  })

  describe('deleteMovieVersion', () => {
    it('should delete movie version successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const movieId = 10
      const versionId = 20

      mockRepo.deleteMovieVersion.mockResolvedValueOnce(undefined)

      await deleteMovieVersion(mockRepo, entityId, cinemaId, movieId, versionId)

      expect(mockRepo.deleteMovieVersion).toHaveBeenCalledWith(entityId, cinemaId, movieId, versionId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Version not found')
      mockRepo.deleteMovieVersion.mockRejectedValueOnce(error)

      await expect(deleteMovieVersion(mockRepo, 1, 5, 10, 999)).rejects.toThrow('Version not found')
    })
  })

  describe('searchMovieVersion', () => {
    it('should search movie versions successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const query = '3D'
      
      const searchResults = [
        { id: 20, language: 'FR', format: '3D' },
        { id: 21, language: 'EN', format: '3D' },
      ]

      mockRepo.searchMovieVersion.mockResolvedValueOnce(searchResults)

      const result = await searchMovieVersion(mockRepo, entityId, cinemaId, query)

      expect(mockRepo.searchMovieVersion).toHaveBeenCalledWith(entityId, cinemaId, query)
      expect(result).toHaveLength(2)
    })

    it('should return empty array when no matches', async () => {
      mockRepo.searchMovieVersion.mockResolvedValueOnce([])

      const result = await searchMovieVersion(mockRepo, 1, 5, 'NonExistent')

      expect(result).toEqual([])
    })
  })
})
