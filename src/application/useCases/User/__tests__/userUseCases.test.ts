import { addUser } from '../addUser'
import { updateUser } from '../updateUser'
import getUser from '../getUser'
import { getUsers } from '../getUsers'
import { updateMe } from '../updateMe'
import { me } from '../me'
import { UserRepository } from '@/src/application/repositories/UserRepository'
import { User } from '@/src/domain/User'

describe('User Use Cases', () => {
  let mockRepo: jest.Mocked<UserRepository>

  beforeEach(() => {
    mockRepo = {
      addUser: jest.fn(),
      updateUser: jest.fn(),
      getUser: jest.fn(),
      getUsers: jest.fn(),
      updateMe: jest.fn(),
      me: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>
  })

  describe('addUser', () => {
    it('should create a new user successfully', async () => {
      const entityId = 1
      const newUser = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'SecurePass123!',
        role_id: 2,
      }

      const createdUser = {
        id: 10,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        role_id: 2,
        entity_id: entityId,
      } as unknown as User

      mockRepo.addUser.mockResolvedValueOnce(createdUser)

      const result = await addUser(mockRepo, entityId, newUser as unknown as Parameters<typeof addUser>[2])

      expect(mockRepo.addUser).toHaveBeenCalledWith(entityId, newUser)
      expect(result).toEqual(createdUser)
      expect(result.id).toBe(10)
    })

    it('should handle duplicate email error', async () => {
      const newUser = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'existing@example.com',
        password: 'Pass123!',
        role_id: 2,
      }

      const error = new Error('Email already exists')
      mockRepo.addUser.mockRejectedValueOnce(error)

      await expect(addUser(mockRepo, 1, newUser as unknown as Parameters<typeof addUser>[2])).rejects.toThrow('Email already exists')
    })
  })

  describe('updateUser', () => {
    it('should update user successfully', () => {
      const entityId = 1
      const updatedUser = {
        id: 10,
        firstname: 'John Updated',
        lastname: 'Doe',
        email: 'john.updated@example.com',
        role_id: 2,
        entity_id: entityId,
      } as unknown as User

      mockRepo.updateUser.mockResolvedValueOnce(updatedUser)

      const result = updateUser(mockRepo, entityId, updatedUser)

      expect(mockRepo.updateUser).toHaveBeenCalledWith(entityId, updatedUser)
      expect(result).resolves.toEqual(updatedUser)
    })
  })

  describe('getUser', () => {
    it('should fetch single user successfully', async () => {
      const entityId = 1
      const userId = 10
      const user = {
        id: userId,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        role_id: 2,
        entity_id: entityId,
      } as unknown as User

      mockRepo.getUser.mockResolvedValueOnce(user)

      const result = await getUser(mockRepo, entityId, userId)

      expect(mockRepo.getUser).toHaveBeenCalledWith(entityId, userId)
      expect(result).toEqual(user)
    })

    it('should handle user not found', async () => {
      const error = new Error('User not found')
      mockRepo.getUser.mockRejectedValueOnce(error)

      await expect(getUser(mockRepo, 1, 999)).rejects.toThrow('User not found')
    })
  })

  describe('getUsers', () => {
    it('should fetch paginated users successfully', async () => {
      const entityId = 1
      const params = { page: 1, per_page: 10 }
      const mockData = {
        data: [
          { id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', role_id: 2, entity_id: 1 },
          { id: 2, firstname: 'Jane', lastname: 'Smith', email: 'jane@example.com', role_id: 3, entity_id: 1 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockRepo.getUsers.mockResolvedValueOnce(mockData as any)

      const result = await getUsers(mockRepo, entityId, params)

      expect(mockRepo.getUsers).toHaveBeenCalledWith(entityId, params)
      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
    })
  })

  describe('updateMe', () => {
    it('should update current user profile successfully', async () => {
      const updateData = {
        firstname: 'John Updated',
        lastname: 'Doe',
        email: 'john.new@example.com',
      }

      const updatedUser = {
        id: 5,
        firstname: 'John Updated',
        lastname: 'Doe',
        email: 'john.new@example.com',
        role_id: 2,
        entity_id: 1,
      } as unknown as User

      mockRepo.updateMe.mockResolvedValueOnce(updatedUser)

      const result = await updateMe(mockRepo, updateData as unknown as Parameters<typeof updateMe>[1])

      expect(mockRepo.updateMe).toHaveBeenCalledWith(updateData)
      expect(result).toEqual(updatedUser)
    })
  })

  describe('me', () => {
    it('should fetch current user profile successfully', async () => {
      const currentUser = {
        id: 5,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        role_id: 2,
        entity_id: 1,
      } as unknown as User

      mockRepo.me.mockResolvedValueOnce(currentUser)

      const result = await me(mockRepo)

      expect(mockRepo.me).toHaveBeenCalled()
      expect(result).toEqual(currentUser)
      expect(result.id).toBe(5)
    })

    it('should handle unauthorized error', async () => {
      const error = new Error('Unauthorized')
      mockRepo.me.mockRejectedValueOnce(error)

      await expect(me(mockRepo)).rejects.toThrow('Unauthorized')
    })
  })
})
