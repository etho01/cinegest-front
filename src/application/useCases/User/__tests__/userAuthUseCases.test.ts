import { connect } from '../connect';
import { logout } from '../logout';
import { requestPasswordReset } from '../requestPasswordReset';
import { updateMePassword } from '../updateMePassword';
import { updateUserRights } from '../updateUserRights';
import { updateUserRole, rolesCinemaListType } from '../updateUserRole';
import { UserRepository } from '@/src/application/repositories/UserRepository';
import { UserLog, PasswordResetRequest, User } from '@/src/domain/User';
import { CustomError } from '@/src/domain/global';

describe('User Authentication Use Cases', () => {
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      connect: jest.fn(),
      logout: jest.fn(),
      requestPasswordReset: jest.fn(),
      updateMePassword: jest.fn(),
      updateUserRights: jest.fn(),
      updateUserRoles: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
  });

  describe('connect', () => {
    it('should return token on successful connection', async () => {
      const userLog: UserLog = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockToken = 'mock-jwt-token';
      mockRepo.connect.mockResolvedValue(mockToken);

      const result = await connect(mockRepo, userLog);

      expect(mockRepo.connect).toHaveBeenCalledWith(userLog);
      expect(result).toBe(mockToken);
    });

    it('should throw CustomError when credentials are invalid', async () => {
      const userLog: UserLog = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      mockRepo.connect.mockResolvedValue(null as unknown as string);

      await expect(connect(mockRepo, userLog)).rejects.toThrow(CustomError);
      await expect(connect(mockRepo, userLog)).rejects.toThrow('Les informations de connexion sont invalides');
    });

    it('should throw error when repository fails', async () => {
      const userLog: UserLog = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockRepo.connect.mockRejectedValue(new Error('Database error'));

      await expect(connect(mockRepo, userLog)).rejects.toThrow('Database error');
    });
  });

  describe('logout', () => {
    it('should call repository logout method', async () => {
      await logout(mockRepo);

      expect(mockRepo.logout).toHaveBeenCalled();
    });

    it('should not throw error even if repository fails', async () => {
      mockRepo.logout.mockImplementation(() => {
        throw new Error('Logout error');
      });

      await expect(logout(mockRepo)).rejects.toThrow('Logout error');
    });
  });

  describe('requestPasswordReset', () => {
    it('should call repository with password reset request', async () => {
      const request: PasswordResetRequest = {
        email: 'test@example.com',
      };
      mockRepo.requestPasswordReset.mockResolvedValue(undefined);

      await requestPasswordReset(mockRepo, request);

      expect(mockRepo.requestPasswordReset).toHaveBeenCalledWith(request);
    });

    it('should handle errors from repository', async () => {
      const request: PasswordResetRequest = {
        email: 'test@example.com',
      };
      mockRepo.requestPasswordReset.mockRejectedValue(new Error('Email not found'));

      await expect(requestPasswordReset(mockRepo, request)).rejects.toThrow('Email not found');
    });
  });

  describe('updateMePassword', () => {
    it('should call repository with password update props', async () => {
      const props = {
        actualPassword: 'oldPassword123',
        newPassword: 'newPassword456',
        newPasswordConfirmation: 'newPassword456',
      };

      await updateMePassword(mockRepo, props);

      expect(mockRepo.updateMePassword).toHaveBeenCalledWith(props);
    });

    it('should handle errors from repository', async () => {
      const props = {
        actualPassword: 'wrongPassword',
        newPassword: 'newPassword456',
        newPasswordConfirmation: 'newPassword456',
      };
      mockRepo.updateMePassword.mockImplementation(() => {
        throw new Error('Current password is incorrect');
      });

      await expect(updateMePassword(mockRepo, props)).rejects.toThrow('Current password is incorrect');
    });
  });

  describe('updateUserRights', () => {
    it('should update user rights successfully', async () => {
      const entityId = 1;
      const userId = 123;
      const rights = ['read', 'write', 'delete'];
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        rights,
      };
      mockRepo.updateUserRights.mockResolvedValue(mockUpdatedUser as unknown as User);

      const result = await updateUserRights(mockRepo, entityId, userId, rights);

      expect(mockRepo.updateUserRights).toHaveBeenCalledWith(entityId, userId, rights);
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should handle empty rights array', async () => {
      const entityId = 1;
      const userId = 123;
      const rights: string[] = [];
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        rights: [],
      };
      mockRepo.updateUserRights.mockResolvedValue(mockUpdatedUser as unknown as User);

      const result = await updateUserRights(mockRepo, entityId, userId, rights);

      expect(mockRepo.updateUserRights).toHaveBeenCalledWith(entityId, userId, rights);
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should handle errors from repository', async () => {
      const entityId = 1;
      const userId = 123;
      const rights = ['read', 'write'];
      mockRepo.updateUserRights.mockRejectedValue(new Error('User not found'));

      await expect(updateUserRights(mockRepo, entityId, userId, rights)).rejects.toThrow('User not found');
    });
  });

  describe('updateUserRole', () => {
    it('should update user roles successfully', async () => {
      const entityId = 1;
      const userId = 123;
      const rolesUser: rolesCinemaListType[] = [
        { cinemas: [1, 2], roles: [10, 20] },
        { cinemas: [3], roles: [30] },
      ];
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        roles: rolesUser,
      };
      mockRepo.updateUserRoles.mockResolvedValue(mockUpdatedUser as unknown as User);

      const result = await updateUserRole(mockRepo, entityId, userId, rolesUser);

      expect(mockRepo.updateUserRoles).toHaveBeenCalledWith(entityId, userId, rolesUser);
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should handle empty roles array', async () => {
      const entityId = 1;
      const userId = 123;
      const rolesUser: rolesCinemaListType[] = [];
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        roles: [],
      };
      mockRepo.updateUserRoles.mockResolvedValue(mockUpdatedUser as unknown as User);

      const result = await updateUserRole(mockRepo, entityId, userId, rolesUser);

      expect(mockRepo.updateUserRoles).toHaveBeenCalledWith(entityId, userId, rolesUser);
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should handle errors from repository', async () => {
      const entityId = 1;
      const userId = 123;
      const rolesUser: rolesCinemaListType[] = [
        { cinemas: [1], roles: [10] },
      ];
      mockRepo.updateUserRoles.mockRejectedValue(new Error('Invalid role assignment'));

      await expect(updateUserRole(mockRepo, entityId, userId, rolesUser)).rejects.toThrow('Invalid role assignment');
    });

    it('should handle complex role structures', async () => {
      const entityId = 1;
      const userId = 123;
      const rolesUser: rolesCinemaListType[] = [
        { cinemas: [1, 2, 3, 4, 5], roles: [10, 20, 30] },
        { cinemas: [6, 7], roles: [40] },
        { cinemas: [8], roles: [50, 60, 70] },
      ];
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        roles: rolesUser,
      };
      mockRepo.updateUserRoles.mockResolvedValue(mockUpdatedUser as unknown as User);

      const result = await updateUserRole(mockRepo, entityId, userId, rolesUser);

      expect(mockRepo.updateUserRoles).toHaveBeenCalledWith(entityId, userId, rolesUser);
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
