import { addSessions } from '../addSessions'
import { getSessions } from '../getSessions'
import { deleteSession } from '../deleteSession'

describe('Session Use Cases', () => {
  let mockRepo: any

  beforeEach(() => {
    mockRepo = {
      addSessions: jest.fn(),
      getSessions: jest.fn(),
      deleteSession: jest.fn(),
    }
  })

  describe('addSessions', () => {
    it('should create sessions successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const sessions = {
        sessions: [
          { movieVersionId: 1, roomId: 1, startAt: new Date('2026-01-15T14:00:00') },
          { movieVersionId: 2, roomId: 2, startAt: new Date('2026-01-15T18:00:00') },
        ],
      }

      mockRepo.addSessions.mockResolvedValueOnce(undefined)

      await addSessions(mockRepo, entityId, cinemaId, sessions)

      expect(mockRepo.addSessions).toHaveBeenCalledWith(entityId, cinemaId, sessions)
    })

    it('should handle creation errors', async () => {
      const error = new Error('Invalid session data')
      mockRepo.addSessions.mockRejectedValueOnce(error)

      await expect(addSessions(mockRepo, 1, 5, { sessions: [] })).rejects.toThrow('Invalid session data')
    })
  })

  describe('getSessions', () => {
    it('should fetch sessions successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const params = { page: 1, per_page: 20 }
      
      const mockData = {
        data: [
          { id: 1, date: '2026-01-15', time: '14:00', roomId: 1 },
          { id: 2, date: '2026-01-15', time: '18:00', roomId: 2 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 2,
        from: 1,
        to: 2,
      }

      mockRepo.getSessions.mockResolvedValueOnce(mockData)

      const result = await getSessions(mockRepo, entityId, cinemaId, params)

      expect(mockRepo.getSessions).toHaveBeenCalledWith(entityId, cinemaId, params)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('deleteSession', () => {
    it('should delete session successfully', async () => {
      const entityId = 1
      const cinemaId = 5
      const sessionId = 10

      mockRepo.deleteSession.mockResolvedValueOnce(undefined)

      await deleteSession(mockRepo, entityId, cinemaId, sessionId)

      expect(mockRepo.deleteSession).toHaveBeenCalledWith(entityId, cinemaId, sessionId)
    })

    it('should handle deletion errors', async () => {
      const error = new Error('Session not found')
      mockRepo.deleteSession.mockRejectedValueOnce(error)

      await expect(deleteSession(mockRepo, 1, 5, 999)).rejects.toThrow('Session not found')
    })
  })
})
