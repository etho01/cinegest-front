import { addSuperadmin } from '../addSuperadmin'
import { updateSuperadmin } from '../updateSuperadmin'
import { deleteSuperadmin } from '../deleteSuperadmin'
import { fetchSuperadmins } from '../fetchSuperadmins'
import { SuperadminRepository } from '@/src/application/repositories/SuperadminRepository'
import { Superadmin } from '@/src/domain/superadmin'

describe('Superadmin Use Cases', () => {
  let mockRepo: jest.Mocked<SuperadminRepository>

  beforeEach(() => {
    mockRepo = {
      addSuperadmin: jest.fn(),
      updateSuperadmin: jest.fn(),
      deleteSuperadmin: jest.fn(),
      fetchAdmins: jest.fn(),
    } as jest.Mocked<SuperadminRepository>
  })

  describe('addSuperadmin', () => {
    it('should create a new superadmin successfully', async () => {
      const newSuperadmin = {
        firstname: 'Admin',
        lastname: 'Super',
        email: 'admin@cinegest.com',
        password: 'SecurePass123!',
      }

      const createdSuperadmin: Superadmin = {
        id: 1,
        firstname: 'Admin',
        lastname: 'Super',
        email: 'admin@cinegest.com',
      }

      mockRepo.addSuperadmin.mockResolvedValueOnce(createdSuperadmin)

      const result = await addSuperadmin(mockRepo, newSuperadmin)

      expect(mockRepo.addSuperadmin).toHaveBeenCalledWith(newSuperadmin)
      expect(result).toEqual(createdSuperadmin)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Email already exists')
      mockRepo.addSuperadmin.mockRejectedValueOnce(error)

      await expect(addSuperadmin(mockRepo, {} as unknown as Superadmin)).rejects.toThrow('Email already exists')
    })
  })

  describe('updateSuperadmin', () => {
    it('should update superadmin successfully', async () => {
      const superadmin: Superadmin = {
        id: 1,
        firstname: 'Updated',
        lastname: 'Admin',
        email: 'updated@cinegest.com',
      }

      mockRepo.updateSuperadmin.mockResolvedValueOnce(superadmin)

      const result = await updateSuperadmin(mockRepo, superadmin)

      expect(mockRepo.updateSuperadmin).toHaveBeenCalledWith(superadmin)
      expect(result).toEqual(superadmin)
    })

    it('should handle update errors', async () => {
      const error = new Error('Superadmin not found')
      mockRepo.updateSuperadmin.mockRejectedValueOnce(error)

      await expect(updateSuperadmin(mockRepo, {} as unknown as Superadmin)).rejects.toThrow('Superadmin not found')
    })
  })

  describe('deleteSuperadmin', () => {
    it('should delete superadmin successfully', async () => {
      mockRepo.deleteSuperadmin.mockResolvedValueOnce(undefined)

      await deleteSuperadmin(mockRepo, 1)

      expect(mockRepo.deleteSuperadmin).toHaveBeenCalledWith(1)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Cannot delete superadmin')
      mockRepo.deleteSuperadmin.mockRejectedValueOnce(error)

      await expect(deleteSuperadmin(mockRepo, 999)).rejects.toThrow('Cannot delete superadmin')
    })
  })

  describe('fetchSuperadmins', () => {
    it('should fetch paginated superadmins successfully', async () => {
      const params = { page: 1, per_page: 10 }
      const mockData = {
        data: [
          { id: 1, firstname: 'Admin', lastname: 'One', email: 'admin1@test.com' },
          { id: 2, firstname: 'Admin', lastname: 'Two', email: 'admin2@test.com' },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.fetchAdmins.mockResolvedValueOnce(mockData)

      const result = await fetchSuperadmins(mockRepo, params)

      expect(mockRepo.fetchAdmins).toHaveBeenCalledWith(params)
      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
    })

    it('should handle empty results', async () => {
      const params = { page: 1, per_page: 10 }
      const emptyData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0,
      }

      mockRepo.fetchAdmins.mockResolvedValueOnce(emptyData)

      const result = await fetchSuperadmins(mockRepo, params)

      expect(result.data).toEqual([])
      expect(result.total).toBe(0)
    })
  })
})
