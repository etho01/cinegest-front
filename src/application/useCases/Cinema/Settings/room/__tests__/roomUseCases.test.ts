import { addRoom } from '../addRoom'
import { getRooms } from '../getRooms'
import { deleteRoom } from '../deleteRoom'
import { updateRoom } from '../updateRoom'
import { RoomRepository } from '@/src/application/repositories/Cinema/Settings/RoomRepository'
import { Room } from '@/src/domain/Cinema/Settings/Room'

describe('Room Use Cases', () => {
  let mockRepo: jest.Mocked<RoomRepository>

  beforeEach(() => {
    mockRepo = {
      addRoom: jest.fn(),
      getRooms: jest.fn(),
      deleteRoom: jest.fn(),
      updateRoom: jest.fn(),
    } as unknown as jest.Mocked<RoomRepository>
  })

  describe('addRoom', () => {
    it('should create room successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const room = {
        name: 'Salle 1',
        capacity: 150,
        type: 'IMAX',
      }

      const createdRoom = { id: 10, ...room }
      mockRepo.addRoom.mockResolvedValueOnce(createdRoom as unknown as Room)

      const result = await addRoom(mockRepo, entityId, cinemaId, room as unknown as Room)

      expect(mockRepo.addRoom).toHaveBeenCalledWith(entityId, cinemaId, room)
      expect(result.id).toBe(10)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Room already exists')
      mockRepo.addRoom.mockRejectedValueOnce(error)

      await expect(addRoom(mockRepo, 1, 5, {} as unknown as Room)).rejects.toThrow('Room already exists')
    })
  })

  describe('getRooms', () => {
    it('should fetch rooms successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 10 }
      
      const mockData = {
        data: [
          { id: 1, name: 'Salle 1', capacity: 150 },
          { id: 2, name: 'Salle 2', capacity: 100 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockRepo.getRooms.mockResolvedValueOnce(mockData as any)

      const result = await getRooms(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getRooms).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('updateRoom', () => {
    it('should update room successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const room = {
        id: 10,
        name: 'Salle VIP',
        capacity: 50,
      }

      mockRepo.updateRoom.mockResolvedValueOnce(room as unknown as Room)

      const result = await updateRoom(mockRepo, entityId, cinemaId, room as unknown as Room)

      expect(mockRepo.updateRoom).toHaveBeenCalledWith(entityId, cinemaId, room)
      expect(result.name).toBe('Salle VIP')
    })
  })

  describe('deleteRoom', () => {
    it('should delete room successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const roomId = 10

      mockRepo.deleteRoom.mockResolvedValueOnce(undefined)

      await deleteRoom(mockRepo, entityId, cinemaId, roomId)

      expect(mockRepo.deleteRoom).toHaveBeenCalledWith(entityId, cinemaId, roomId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Room not found')
      mockRepo.deleteRoom.mockRejectedValueOnce(error)

      await expect(deleteRoom(mockRepo, 1, 5, 999)).rejects.toThrow('Room not found')
    })
  })
})
