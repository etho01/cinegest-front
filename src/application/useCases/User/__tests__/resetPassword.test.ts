import { resetPassword } from '../resetPassword'
import { UserRepository } from '@/src/application/repositories/UserRepository'
import { PasswordReset } from '@/src/domain/User'

describe('resetPassword', () => {
  let mockRepo: jest.Mocked<UserRepository>

  beforeEach(() => {
    mockRepo = {
      resetPassword: jest.fn(),
    } as any
  })

  it('should call repository resetPassword method', async () => {
    const passwordReset: PasswordReset = {
      email: 'test@example.com',
      token: 'valid-token',
      password: 'newpassword123',
      passwordConfirmation: 'newpassword123',
    }

    mockRepo.resetPassword.mockResolvedValueOnce(undefined)

    await resetPassword(mockRepo, passwordReset)

    expect(mockRepo.resetPassword).toHaveBeenCalledWith(passwordReset)
    expect(mockRepo.resetPassword).toHaveBeenCalledTimes(1)
  })

  it('should propagate repository errors', async () => {
    const passwordReset: PasswordReset = {
      email: 'test@example.com',
      token: 'invalid-token',
      password: 'newpassword123',
      passwordConfirmation: 'newpassword123',
    }

    const error = new Error('Invalid token')
    mockRepo.resetPassword.mockRejectedValueOnce(error)

    await expect(resetPassword(mockRepo, passwordReset)).rejects.toThrow('Invalid token')
  })
})
