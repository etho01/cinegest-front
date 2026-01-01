import { CinemaSchema, CinemaEmpty } from '../Cinema'
import { EntitySchema, EntityEmpty, EntityNotFound } from '../Entity'
import { CinemaApiSchema, CinemaApiEmpty } from '../CinemaApi'

describe('Domain Models', () => {
  describe('CinemaSchema', () => {
    it('should validate correct cinema data', () => {
      const validCinema = {
        id: 1,
        name: 'Cinema Paradiso',
        address: '123 Main Street',
        address_complement: 'Building A',
        postal_code: '75001',
        city: 'Paris',
        country: 'France',
      }

      const result = CinemaSchema.safeParse(validCinema)
      expect(result.success).toBe(true)
    })

    it('should reject cinema with short name', () => {
      const invalidCinema = {
        id: 1,
        name: 'C',
        address: '123 Main Street',
        postal_code: '75001',
        city: 'Paris',
        country: 'France',
      }

      const result = CinemaSchema.safeParse(invalidCinema)
      expect(result.success).toBe(false)
    })

    it('should accept cinema without address complement', () => {
      const cinema = {
        id: 1,
        name: 'Cinema',
        address: '123 Main Street',
        postal_code: '75001',
        city: 'Paris',
        country: 'France',
      }

      const result = CinemaSchema.safeParse(cinema)
      expect(result.success).toBe(true)
    })

    it('should have correct empty cinema values', () => {
      expect(CinemaEmpty.id).toBe(0)
      expect(CinemaEmpty.name).toBe('')
      expect(CinemaEmpty.address).toBe('')
    })
  })

  describe('EntitySchema', () => {
    it('should validate correct entity data', () => {
      const validEntity = {
        id: 1,
        name: 'Entity Name',
      }

      const result = EntitySchema.safeParse(validEntity)
      expect(result.success).toBe(true)
    })

    it('should reject entity with too long name', () => {
      const invalidEntity = {
        id: 1,
        name: 'a'.repeat(256),
      }

      const result = EntitySchema.safeParse(invalidEntity)
      expect(result.success).toBe(false)
    })

    it('should have correct empty entity values', () => {
      expect(EntityEmpty.id).toBe(0)
      expect(EntityEmpty.name).toBe('')
      expect(EntityEmpty.cinemas).toEqual([])
    })

    it('should create EntityNotFound error with correct message', () => {
      const error = new EntityNotFound()
      expect(error.message).toBe("L'entité n'a pas été trouvée.")
    })
  })

  describe('CinemaApiSchema', () => {
    it('should validate correct cinema API data', () => {
      const validApi = {
        id: 1,
        name: 'API Name',
        cinemaIds: [1, 2, 3],
      }

      const result = CinemaApiSchema.safeParse(validApi)
      expect(result.success).toBe(true)
    })

    it('should reject cinema API without cinemaIds', () => {
      const invalidApi = {
        id: 1,
        name: 'API Name',
      }

      const result = CinemaApiSchema.safeParse(invalidApi)
      expect(result.success).toBe(false)
    })

    it('should have correct empty cinema API values', () => {
      expect(CinemaApiEmpty.id).toBe(0)
      expect(CinemaApiEmpty.name).toBe('')
      expect(CinemaApiEmpty.apiKey).toBe('')
      expect(CinemaApiEmpty.cinemas).toEqual([])
      expect(CinemaApiEmpty.cinemaIds).toEqual([])
    })
  })
})
