import { getAllRooms } from '../getAllRooms'
import { RoomRepository } from '@/src/application/repositories/Cinema/Settings/RoomRepository'
import { Room } from '@/src/domain/Cinema/Settings/Room'

describe('Room getAllRooms Use Case', () => {
  let mockRepo: jest.Mocked<RoomRepository>

  beforeEach(() => {
    mockRepo = {
      getAllRooms: jest.fn(),
    } as unknown as jest.Mocked<RoomRepository>
  })

  describe('getAllRooms', () => {
    it('should fetch all rooms successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      
      const allRooms = [
        { id: 1, name: 'Salle 1', capacity: 150 },
        { id: 2, name: 'Salle 2', capacity: 100 },
        { id: 3, name: 'Salle VIP', capacity: 50 },
      ]

      mockRepo.getAllRooms.mockResolvedValueOnce(allRooms as unknown as Room[])

      const result = await getAllRooms(mockRepo, entityId, cinemaId)

      expect(mockRepo.getAllRooms).toHaveBeenCalledWith(entityId, cinemaId)
      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('Salle 1')
    })

    it('should return empty array when no rooms', async () => {
      mockRepo.getAllRooms.mockResolvedValueOnce([])

      const result = await getAllRooms(mockRepo, 1, 5)

      expect(result).toEqual([])
    })

    it('should handle fetch errors', async () => {
      const error = new Error('Cinema not found')
      mockRepo.getAllRooms.mockRejectedValueOnce(error)

      await expect(getAllRooms(mockRepo, 1, 999)).rejects.toThrow('Cinema not found')
    })
  })
})
