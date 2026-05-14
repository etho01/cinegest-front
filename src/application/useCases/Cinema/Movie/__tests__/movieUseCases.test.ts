import { addMovie } from '../addMovie'
import { updateMovieSize } from '../updateMovieSize'
import { deleteMovie } from '../deleteMovie'
import { getMovies } from '../getMovies'
import { getMovie } from '../getMovie'
import { getAllActiveMovie } from '../getAllActiveMovie'
import { searchMovie } from '../search'
import { MovieRepository } from '@/src/application/repositories/Cinema/MovieRepository'
import { Movie, MovieSearchResult } from '@/src/domain/Cinema/Movie'

describe('Movie Use Cases', () => {
  let mockRepo: jest.Mocked<MovieRepository>

  beforeEach(() => {
    mockRepo = {
      addMovie: jest.fn(),
      updateMovieSize: jest.fn(),
      deleteMovie: jest.fn(),
      getMovies: jest.fn(),
      getMovie: jest.fn(),
      getAllActiveMovie: jest.fn(),
      search: jest.fn(),
    } as unknown as jest.Mocked<MovieRepository>
  })

  describe('addMovie', () => {
    it('should create movie successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const movie = {
        title: 'Inception',
        director: 'Christopher Nolan',
        duration: 148,
        releaseDate: '2010-07-16',
      }

      const createdMovie = { id: 10, ...movie }
      mockRepo.addMovie.mockResolvedValueOnce(createdMovie as unknown as Movie)

      const result = await addMovie(mockRepo, entityId, cinemaId, movie as unknown as Movie)

      expect(mockRepo.addMovie).toHaveBeenCalledWith(entityId, cinemaId, movie)
      expect(result.id).toBe(10)
      expect(result.title).toBe('Inception')
    })

    it('should handle creation errors', async () => {
      const error = new Error('Movie already exists')
      mockRepo.addMovie.mockRejectedValueOnce(error)

      await expect(addMovie(mockRepo, 1, 5, {} as unknown as Movie)).rejects.toThrow('Movie already exists')
    })
  })

  describe('updateMovieSize', () => {
    it('should update movie size successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const movieId = 10
      const size = 2500

      mockRepo.updateMovieSize.mockResolvedValueOnce({ id: movieId, size } as unknown as Movie)

      const result = await updateMovieSize(mockRepo, entityId, cinemaId, movieId, size)

      expect(mockRepo.updateMovieSize).toHaveBeenCalledWith(entityId, cinemaId, movieId, size)
      expect(result.size).toBe(2500)
    })

    it('should handle update errors', async () => {
      const error = new Error('Movie not found')
      mockRepo.updateMovieSize.mockRejectedValueOnce(error)

      await expect(updateMovieSize(mockRepo, 1, 5, 999, 1000)).rejects.toThrow('Movie not found')
    })
  })

  describe('deleteMovie', () => {
    it('should delete movie successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const movieId = 10

      mockRepo.deleteMovie.mockResolvedValueOnce(undefined)

      await deleteMovie(mockRepo, entityId, cinemaId, movieId)

      expect(mockRepo.deleteMovie).toHaveBeenCalledWith(entityId, cinemaId, movieId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Movie not found')
      mockRepo.deleteMovie.mockRejectedValueOnce(error)

      await expect(deleteMovie(mockRepo, 1, 5, 999)).rejects.toThrow('Movie not found')
    })
  })

  describe('getMovies', () => {
    it('should fetch paginated movies successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, title: 'Inception', duration: 148 },
          { id: 2, title: 'Interstellar', duration: 169 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockRepo.getMovies.mockResolvedValueOnce(mockData as any)

      const result = await getMovies(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getMovies).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('getMovie', () => {
    it('should fetch a single movie successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const movieId = 10
      
      const movie = {
        id: 10,
        title: 'Inception',
        director: 'Christopher Nolan',
        duration: 148,
      }

      mockRepo.getMovie.mockResolvedValueOnce(movie as unknown as Movie)

      const result = await getMovie(mockRepo, entityId, cinemaId, movieId)

      expect(mockRepo.getMovie).toHaveBeenCalledWith(entityId, cinemaId, movieId)
      expect(result.title).toBe('Inception')
    })
  })

  describe('getAllActiveMovie', () => {
    it('should fetch all active movies', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const activeMovies = [
        { id: 1, title: 'Movie 1', isActive: true },
        { id: 2, title: 'Movie 2', isActive: true },
      ]

      mockRepo.getAllActiveByCinema = jest.fn()
      mockRepo.getAllActiveByCinema.mockResolvedValueOnce(activeMovies as unknown as Movie[])

      const result = await getAllActiveMovie(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllActiveByCinema).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(2)
    })
  })

  describe('searchMovie', () => {
    it('should search movies successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const query = 'Inception'
      
      const searchResults = [
        { id: 10, title: 'Inception', director: 'Nolan' },
      ]

      mockRepo.search.mockResolvedValueOnce(searchResults as unknown as MovieSearchResult[])

      const result = await searchMovie(mockRepo, entityId, cinemaId, query)

      expect(mockRepo.search).toHaveBeenCalledWith(entityId, cinemaId, query)
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Inception')
    })

    it('should return empty results when no matches', async () => {
      mockRepo.search.mockResolvedValueOnce([])

      const result = await searchMovie(mockRepo, 1, 5, 'NonExistent')

      expect(result).toEqual([])
    })
  })
})
